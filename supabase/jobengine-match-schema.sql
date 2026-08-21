-- ============================================================================
-- Jobingen · JobEngine schema — Layer 2 (matching)
-- Run ONCE in Supabase dashboard → SQL Editor → New query → paste all → Run.
-- Safe to run again. Depends on jobengine-schema.sql (Layer 1) being applied.
-- ============================================================================

-- ── Lightweight email identity ─────────────────────────────────────────────
-- No Supabase Auth in this repo; a user is just a verified email string, same
-- anonymous-form convention the rest of the app uses.
create table if not exists public.jobengine_users (
  id         uuid primary key default gen_random_uuid(),
  email      text not null unique,
  created_at timestamptz not null default now()
);

-- ── Stored resume + derived profile ────────────────────────────────────────
create table if not exists public.jobengine_resumes (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references public.jobengine_users(id) on delete cascade,
  filename    text,
  resume_text text not null,
  profile     jsonb,              -- { role, skills[], seniority, locations[] }
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
-- One current resume per user — matching always scores against the latest.
create unique index if not exists jobengine_resumes_user_idx
  on public.jobengine_resumes (user_id);

-- ── Match results (top ~20 LLM-scored jobs per user) ───────────────────────
create table if not exists public.jobengine_matches (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references public.jobengine_users(id) on delete cascade,
  job_id     text not null references public.jobengine_jobs(id) on delete cascade,
  score      integer not null check (score between 0 and 100),
  reason     text,
  model      text,               -- which provider/model produced the score
  created_at timestamptz not null default now()
);
create unique index if not exists jobengine_matches_user_job_idx
  on public.jobengine_matches (user_id, job_id);
create index if not exists jobengine_matches_user_score_idx
  on public.jobengine_matches (user_id, score desc);

-- ── RLS: everything server-only (writes + reads go through service-role) ────
-- These tables hold user data, so no public policy — anon sees nothing.
alter table public.jobengine_users   enable row level security;
alter table public.jobengine_resumes enable row level security;
alter table public.jobengine_matches enable row level security;
