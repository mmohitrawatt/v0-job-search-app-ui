-- ============================================================================
-- Jobingen · JobEngine schema — Layer 1 (crawler)
-- Run ONCE in Supabase dashboard → SQL Editor → New query → paste all → Run.
-- Safe to run again; existing rows are preserved.
--
-- Everything is namespaced `jobengine_*` and does NOT touch the existing
-- `jobs` table — that one is Adzuna-owned and /api/ingest deletes every row
-- whose source is not 'adzuna' on each run, which would wipe our ATS rows.
--
-- Layers 2-6 add their own tables in later migration files.
-- ============================================================================

-- ── Company boards we crawl ────────────────────────────────────────────────
create table if not exists public.jobengine_company_tokens (
  id         uuid primary key default gen_random_uuid(),
  ats        text not null check (ats in ('greenhouse', 'lever')),
  token      text not null,
  company    text not null,
  active     boolean not null default true,
  last_ok_at timestamptz,
  last_error text,
  created_at timestamptz not null default now()
);

create unique index if not exists jobengine_company_tokens_ats_token_idx
  on public.jobengine_company_tokens (ats, token);

-- ── Normalized jobs pulled from company career pages ───────────────────────
-- id is `{source}:{source_id}` — text pk, matching the existing jobs table.
create table if not exists public.jobengine_jobs (
  id          text primary key,
  source      text not null,
  source_id   text not null,
  company     text not null,
  title       text not null,
  location    text,
  description text,
  apply_url   text not null,
  posted_at   timestamptz,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create unique index if not exists jobengine_jobs_source_sourceid_idx
  on public.jobengine_jobs (source, source_id);
create index if not exists jobengine_jobs_posted_at_idx
  on public.jobengine_jobs (posted_at desc nulls last);
create index if not exists jobengine_jobs_company_idx
  on public.jobengine_jobs (company);

-- Full-text search over title + company — same pattern as public.jobs.
alter table public.jobengine_jobs
  add column if not exists search tsvector
  generated always as (
    to_tsvector('simple', coalesce(title, '') || ' ' || coalesce(company, ''))
  ) stored;
create index if not exists jobengine_jobs_search_idx
  on public.jobengine_jobs using gin (search);

-- ── RLS: public READ on jobs, writes only via service-role (server) ────────
alter table public.jobengine_jobs enable row level security;
drop policy if exists "jobengine jobs are publicly readable" on public.jobengine_jobs;
create policy "jobengine jobs are publicly readable"
  on public.jobengine_jobs for select using (true);

-- Tokens are server-only — RLS on with no policy means anon sees nothing.
alter table public.jobengine_company_tokens enable row level security;

-- ── Seed boards ────────────────────────────────────────────────────────────
-- Every token below was verified live against the ATS API on 2026-07-19; the
-- comment is the posting count at that time. Boards that later 404 are
-- reported by the crawl endpoint and auto-deactivated.
insert into public.jobengine_company_tokens (ats, token, company) values
  -- Greenhouse · India
  ('greenhouse', 'razorpaysoftwareprivatelimited', 'Razorpay'),   --  69
  ('greenhouse', 'postman',      'Postman'),                      -- 113
  ('greenhouse', 'phonepe',      'PhonePe'),                      --  51
  ('greenhouse', 'groww',        'Groww'),                        --  12
  -- Greenhouse · global (most hire into India / remote)
  ('greenhouse', 'anthropic',    'Anthropic'),                    -- 411
  ('greenhouse', 'databricks',   'Databricks'),                   -- 300+
  ('greenhouse', 'stripe',       'Stripe'),                       -- 200+
  ('greenhouse', 'coinbase',     'Coinbase'),                     -- 200+
  ('greenhouse', 'reddit',       'Reddit'),                       -- 100+
  ('greenhouse', 'samsara',      'Samsara'),                      -- 337
  ('greenhouse', 'brex',         'Brex'),                         -- 250
  ('greenhouse', 'airbnb',       'Airbnb'),                       -- 195
  ('greenhouse', 'pinterest',    'Pinterest'),                    -- 195
  ('greenhouse', 'scaleai',      'Scale AI'),                     -- 191
  ('greenhouse', 'affirm',       'Affirm'),                       -- 171
  ('greenhouse', 'figma',        'Figma'),                        -- 169
  ('greenhouse', 'lyft',         'Lyft'),                         -- 154
  ('greenhouse', 'asana',        'Asana'),                        -- 140
  ('greenhouse', 'twilio',       'Twilio'),                       -- 332
  ('greenhouse', 'gitlab',       'GitLab'),                       -- 334
  ('greenhouse', 'dropbox',      'Dropbox'),                      -- 396
  ('greenhouse', 'discord',      'Discord'),                      -- 153
  ('greenhouse', 'instacart',    'Instacart'),                    -- 126
  ('greenhouse', 'robinhood',    'Robinhood'),                    -- 111
  ('greenhouse', 'gusto',        'Gusto'),                        --  74
  ('greenhouse', 'duolingo',     'Duolingo'),                     --  63
  -- Lever
  ('lever',      'palantir',     'Palantir'),                     -- 181
  ('lever',      'meesho',       'Meesho'),                       --  44
  ('lever',      'cred',         'CRED')                          --   4
on conflict (ats, token) do nothing;
