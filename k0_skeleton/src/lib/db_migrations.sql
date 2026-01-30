-- Brique 2 — Migrations additionnelles (à appliquer dans Supabase)

-- Collaboration projet (multi-user)
create table if not exists project_members (
  id uuid primary key,
  project_id uuid references projects(id) on delete cascade,
  user_id uuid references users(id) on delete cascade,
  role text check (role in ('owner','collaborator','viewer')),
  created_at timestamp default now(),
  unique(project_id, user_id)
);

-- Sessions k0 (optionnel V1 mais utile pour logs)
create table if not exists k0_sessions (
  id uuid primary key,
  project_id uuid references projects(id) on delete cascade,
  started_by uuid references users(id),
  created_at timestamp default now(),
  closed_at timestamp
);

-- Ingestions brutes (inputs user + fichiers + LLM brut)
create table if not exists k0_ingestions (
  id uuid primary key,
  project_id uuid references projects(id) on delete cascade,
  session_id uuid references k0_sessions(id) on delete set null,
  source text check (source in ('user_text','file','llm_raw')),
  payload jsonb,
  created_by uuid references users(id),
  created_at timestamp default now()
);

-- Scoring k0 (persisté)
create table if not exists k0_scores (
  id uuid primary key,
  project_id uuid references projects(id) on delete cascade,
  session_id uuid references k0_sessions(id) on delete set null,
  score int check (score >= 0 and score <= 100),
  breakdown jsonb,
  created_by uuid references users(id),
  created_at timestamp default now()
);

-- Validation k0
create table if not exists k0_validations (
  id uuid primary key,
  project_id uuid references projects(id) on delete cascade,
  session_id uuid references k0_sessions(id) on delete set null,
  validated_by uuid references users(id),
  created_at timestamp default now()
);
