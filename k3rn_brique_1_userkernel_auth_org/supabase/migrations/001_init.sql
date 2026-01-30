create extension if not exists "pgcrypto";

create table if not exists public.organisations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now()
);

create type if not exists public.membership_role as enum ('owner', 'editor', 'viewer');

create table if not exists public.memberships (
  id uuid primary key default gen_random_uuid(),
  organisation_id uuid not null references public.organisations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.membership_role not null default 'viewer',
  created_at timestamptz not null default now(),
  unique (organisation_id, user_id)
);

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  first_name text not null,
  last_name text not null,
  company_type text not null,
  industry text not null,
  employee_count_range text not null,
  budget_range text not null,
  technical_level int not null default 0,
  speed_vs_quality int not null default 5,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  organisation_id uuid not null references public.organisations(id) on delete cascade,
  name text not null,
  created_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_profiles_updated_at on public.profiles;
create trigger trg_profiles_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

alter table public.organisations enable row level security;
alter table public.memberships enable row level security;
alter table public.profiles enable row level security;
alter table public.projects enable row level security;

create or replace function public.is_member_of_org(org_id uuid)
returns boolean language sql stable as $$
  select exists(select 1 from public.memberships m where m.organisation_id = org_id and m.user_id = auth.uid());
$$;

create or replace function public.has_org_role(org_id uuid, roles public.membership_role[])
returns boolean language sql stable as $$
  select exists(
    select 1 from public.memberships m
    where m.organisation_id = org_id and m.user_id = auth.uid() and m.role = any(roles)
  );
$$;

drop policy if exists "org_select_member" on public.organisations;
create policy "org_select_member" on public.organisations for select using (public.is_member_of_org(id));

drop policy if exists "org_insert_authenticated" on public.organisations;
create policy "org_insert_authenticated" on public.organisations for insert to authenticated with check (true);

drop policy if exists "org_update_owner" on public.organisations;
create policy "org_update_owner" on public.organisations for update using (public.has_org_role(id, array['owner']::public.membership_role[]));

drop policy if exists "membership_select_self_org" on public.memberships;
create policy "membership_select_self_org" on public.memberships for select using (public.is_member_of_org(organisation_id));

drop policy if exists "membership_insert_owner_only" on public.memberships;
create policy "membership_insert_owner_only" on public.memberships for insert
with check (public.has_org_role(organisation_id, array['owner']::public.membership_role[]));

drop policy if exists "membership_update_owner_only" on public.memberships;
create policy "membership_update_owner_only" on public.memberships for update
using (public.has_org_role(organisation_id, array['owner']::public.membership_role[]));

drop policy if exists "membership_delete_owner_only" on public.memberships;
create policy "membership_delete_owner_only" on public.memberships for delete
using (public.has_org_role(organisation_id, array['owner']::public.membership_role[]));

drop policy if exists "profiles_select_self" on public.profiles;
create policy "profiles_select_self" on public.profiles for select using (id = auth.uid());

drop policy if exists "profiles_insert_self" on public.profiles;
create policy "profiles_insert_self" on public.profiles for insert with check (id = auth.uid());

drop policy if exists "profiles_update_self" on public.profiles;
create policy "profiles_update_self" on public.profiles for update using (id = auth.uid());

drop policy if exists "projects_select_member" on public.projects;
create policy "projects_select_member" on public.projects for select using (public.is_member_of_org(organisation_id));

drop policy if exists "projects_insert_editor_owner" on public.projects for insert
with check (public.has_org_role(organisation_id, array['owner','editor']::public.membership_role[]));

drop policy if exists "projects_update_editor_owner" on public.projects for update
using (public.has_org_role(organisation_id, array['owner','editor']::public.membership_role[]));

drop policy if exists "projects_delete_owner" on public.projects for delete
using (public.has_org_role(organisation_id, array['owner']::public.membership_role[]));
