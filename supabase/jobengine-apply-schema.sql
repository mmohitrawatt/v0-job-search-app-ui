-- ============================================================================
-- Jobingen · JobEngine schema — Layers 5-6 (assisted apply + tracking)
-- Run ONCE in Supabase dashboard → SQL Editor → New query → paste all → Run.
-- Safe to run again. Depends on Layers 1-2 being applied.
-- ============================================================================

-- ── Applications: one row per job a user chooses to apply to ───────────────
-- Status lifecycle: opened → submitted → replied. We never auto-submit from
-- the server (bot detection); the user submits on the real site themselves.
create table if not exists public.jobengine_applications (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references public.jobengine_users(id) on delete cascade,
  job_id          text not null references public.jobengine_jobs(id) on delete cascade,
  status          text not null default 'opened'
                    check (status in ('opened', 'submitted', 'replied')),
  match_score     integer check (match_score between 0 and 100),
  match_reason    text,
  tailored_resume text,          -- the approved, tailored resume text
  cover_letter    text,          -- the approved cover letter (candidate's voice)
  tailor_summary  text,          -- one-line summary of what was changed
  opened_at       timestamptz not null default now(),
  submitted_at    timestamptz,
  replied_at      timestamptz,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- One application per user per job.
create unique index if not exists jobengine_applications_user_job_idx
  on public.jobengine_applications (user_id, job_id);
create index if not exists jobengine_applications_user_idx
  on public.jobengine_applications (user_id, updated_at desc);

-- If the table already existed from an earlier run, add the newer columns.
alter table public.jobengine_applications add column if not exists cover_letter text;

alter table public.jobengine_applications enable row level security;

-- Force PostgREST to refresh its schema cache so the new table is queryable
-- immediately (otherwise the API can return PGRST205 "not in schema cache").
notify pgrst, 'reload schema';
