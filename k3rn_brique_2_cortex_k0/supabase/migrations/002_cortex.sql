-- 002_cortex.sql — Cortex V1 + Decision Ledger + Lab sessions
-- Dépend de 001_init.sql (organisations, memberships, profiles, projects)

create type if not exists public.artefact_kind as enum ('text', 'file', 'link', 'image', 'audio', 'zip', 'other');
create type if not exists public.cortex_layer as enum ('raw', 'clean', 'structured', 'validated');
create type if not exists public.decision_scope as enum ('global', 'project', 'lab');

create table if not exists public.project_cortex (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null unique references public.projects(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.artefacts (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  kind public.artefact_kind not null,
  source_name text,
  storage_path text,
  raw_text text,
  meta jsonb not null default '{}'::jsonb,
  created_by uuid not null references auth.users(id) on delete restrict,
  created_at timestamptz not null default now()
);

create table if not exists public.artefact_layers (
  id uuid primary key default gen_random_uuid(),
  artefact_id uuid not null references public.artefacts(id) on delete cascade,
  layer public.cortex_layer not null,
  content jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  unique (artefact_id, layer)
);

create table if not exists public.decisions (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  scope public.decision_scope not null default 'project',
  lab_code text,
  question text not null,
  options jsonb not null default '[]'::jsonb,
  selection jsonb not null default '{}'::jsonb,
  rationale text,
  created_by uuid not null references auth.users(id) on delete restrict,
  created_at timestamptz not null default now()
);

create table if not exists public.lab_sessions (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  lab_code text not null,
  state jsonb not null default '{}'::jsonb,
  started_by uuid not null references auth.users(id) on delete restrict,
  started_at timestamptz not null default now(),
  ended_at timestamptz
);

-- Helpers : membership by project
create or replace function public.is_member_of_project(pid uuid)
returns boolean
language sql
stable
as $$
  select exists(
    select 1
    from public.projects p
    join public.memberships m on m.organisation_id = p.organisation_id
    where p.id = pid and m.user_id = auth.uid()
  );
$$;

create or replace function public.has_project_role(pid uuid, roles public.membership_role[])
returns boolean
language sql
stable
as $$
  select exists(
    select 1
    from public.projects p
    join public.memberships m on m.organisation_id = p.organisation_id
    where p.id = pid and m.user_id = auth.uid() and m.role = any(roles)
  );
$$;

-- Enable RLS
alter table public.project_cortex enable row level security;
alter table public.artefacts enable row level security;
alter table public.artefact_layers enable row level security;
alter table public.decisions enable row level security;
alter table public.lab_sessions enable row level security;

-- Policies: project_cortex
drop policy if exists "cortex_select_member" on public.project_cortex;
create policy "cortex_select_member"
on public.project_cortex for select
using (public.is_member_of_project(project_id));

drop policy if exists "cortex_insert_editor_owner" on public.project_cortex;
create policy "cortex_insert_editor_owner"
on public.project_cortex for insert
with check (public.has_project_role(project_id, array['owner','editor']::public.membership_role[]));

-- Policies: artefacts
drop policy if exists "artefacts_select_member" on public.artefacts;
create policy "artefacts_select_member"
on public.artefacts for select
using (public.is_member_of_project(project_id));

drop policy if exists "artefacts_insert_editor_owner" on public.artefacts;
create policy "artefacts_insert_editor_owner"
on public.artefacts for insert
with check (public.has_project_role(project_id, array['owner','editor']::public.membership_role[]));

drop policy if exists "artefacts_update_editor_owner" on public.artefacts;
create policy "artefacts_update_editor_owner"
on public.artefacts for update
using (public.has_project_role(project_id, array['owner','editor']::public.membership_role[]));

drop policy if exists "artefacts_delete_owner" on public.artefacts;
create policy "artefacts_delete_owner"
on public.artefacts for delete
using (public.has_project_role(project_id, array['owner']::public.membership_role[]));

-- Policies: artefact_layers (inherits via artefact)
drop policy if exists "layers_select_member" on public.artefact_layers;
create policy "layers_select_member"
on public.artefact_layers for select
using (
  exists(select 1 from public.artefacts a where a.id = artefact_id and public.is_member_of_project(a.project_id))
);

drop policy if exists "layers_insert_editor_owner" on public.artefact_layers;
create policy "layers_insert_editor_owner"
on public.artefact_layers for insert
with check (
  exists(select 1 from public.artefacts a where a.id = artefact_id and public.has_project_role(a.project_id, array['owner','editor']::public.membership_role[]))
);

drop policy if exists "layers_update_editor_owner" on public.artefact_layers;
create policy "layers_update_editor_owner"
on public.artefact_layers for update
using (
  exists(select 1 from public.artefacts a where a.id = artefact_id and public.has_project_role(a.project_id, array['owner','editor']::public.membership_role[]))
);

-- Policies: decisions
drop policy if exists "decisions_select_member" on public.decisions;
create policy "decisions_select_member"
on public.decisions for select
using (public.is_member_of_project(project_id));

drop policy if exists "decisions_insert_editor_owner" on public.decisions;
create policy "decisions_insert_editor_owner"
on public.decisions for insert
with check (public.has_project_role(project_id, array['owner','editor']::public.membership_role[]));

-- Policies: lab_sessions
drop policy if exists "lab_sessions_select_member" on public.lab_sessions;
create policy "lab_sessions_select_member"
on public.lab_sessions for select
using (public.is_member_of_project(project_id));

drop policy if exists "lab_sessions_insert_editor_owner" on public.lab_sessions;
create policy "lab_sessions_insert_editor_owner"
on public.lab_sessions for insert
with check (public.has_project_role(project_id, array['owner','editor']::public.membership_role[]));

drop policy if exists "lab_sessions_update_editor_owner" on public.lab_sessions;
create policy "lab_sessions_update_editor_owner"
on public.lab_sessions for update
using (public.has_project_role(project_id, array['owner','editor']::public.membership_role[]));

-- Convenience: ensure cortex exists when a project is created (optional, safe)
create or replace function public.ensure_project_cortex()
returns trigger
language plpgsql
as $$
begin
  insert into public.project_cortex(project_id)
  values (new.id)
  on conflict (project_id) do nothing;
  return new;
end;
$$;

drop trigger if exists trg_projects_ensure_cortex on public.projects;
create trigger trg_projects_ensure_cortex
after insert on public.projects
for each row execute function public.ensure_project_cortex();
