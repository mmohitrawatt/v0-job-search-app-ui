-- ============================================================================
-- Jobingen · jobs table migration (idempotent, non-destructive)
-- Run ONCE in Supabase dashboard → SQL Editor → New query → paste all → Run.
-- Safe to run again; existing rows are preserved.
-- ============================================================================

-- Create the table if it doesn't exist yet (fresh projects).
create table if not exists public.jobs (
  id text primary key,
  title text,
  company text,
  location text
);

-- Add every column the ingest pipeline needs (skips ones that already exist).
alter table public.jobs add column if not exists company_domain text;
alter table public.jobs add column if not exists logo_url       text;
alter table public.jobs add column if not exists city           text;
alter table public.jobs add column if not exists remote         boolean default false;
alter table public.jobs add column if not exists type           text;
alter table public.jobs add column if not exists department     text;
alter table public.jobs add column if not exists experience     text;
alter table public.jobs add column if not exists salary_min     numeric;
alter table public.jobs add column if not exists salary_max     numeric;
alter table public.jobs add column if not exists salary_text    text;
alter table public.jobs add column if not exists description    text;
alter table public.jobs add column if not exists apply_url      text;
alter table public.jobs add column if not exists source         text;
alter table public.jobs add column if not exists source_id      text;
alter table public.jobs add column if not exists posted_at      timestamptz;
alter table public.jobs add column if not exists created_at     timestamptz default now();
alter table public.jobs add column if not exists updated_at     timestamptz default now();

-- Legacy columns (from the old table) must be optional so inserts don't fail.
do $$ begin
  if exists (select 1 from information_schema.columns where table_name='jobs' and column_name='slug') then
    alter table public.jobs alter column slug drop not null;
  end if;
  if exists (select 1 from information_schema.columns where table_name='jobs' and column_name='apply_type') then
    alter table public.jobs alter column apply_type drop not null;
  end if;
end $$;

-- Dedup constraint for upsert-by-source.
create unique index if not exists jobs_source_sourceid_idx on public.jobs (source, source_id);

-- Filter / sort indexes.
create index if not exists jobs_posted_at_idx on public.jobs (posted_at desc nulls last);
create index if not exists jobs_city_idx      on public.jobs (city);
create index if not exists jobs_type_idx       on public.jobs (type);
create index if not exists jobs_department_idx on public.jobs (department);

-- Full-text search over title + company + department.
alter table public.jobs
  add column if not exists search tsvector
  generated always as (
    to_tsvector('simple',
      coalesce(title,'') || ' ' || coalesce(company,'') || ' ' || coalesce(department,''))
  ) stored;
create index if not exists jobs_search_idx on public.jobs using gin (search);

-- Public READ, writes only via service-role (server).
alter table public.jobs enable row level security;
drop policy if exists "jobs are publicly readable" on public.jobs;
create policy "jobs are publicly readable" on public.jobs for select using (true);
