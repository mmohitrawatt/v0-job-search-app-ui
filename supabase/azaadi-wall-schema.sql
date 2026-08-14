-- ============================================================================
-- Jobingen · Azaadi Freedom Wall (Independence Week 2026)
-- Run ONCE in Supabase dashboard → SQL Editor → New query → paste all → Run.
-- Safe to run again; existing rows are preserved.
--
-- One question, one line per person: "What are you breaking free from?"
-- Public-read, server-write. Anonymous by design — we store a salted IP hash
-- only to rate-limit, never a raw IP.
-- ============================================================================

create table if not exists public.azaadi_wall (
  id         uuid primary key default gen_random_uuid(),
  text       text not null check (char_length(trim(text)) between 3 and 140),
  name       text,                                   -- optional first name
  city       text,                                   -- optional
  ip_hash    text,                                   -- salted, for rate limiting only
  hidden     boolean not null default false,         -- admin moderation switch
  created_at timestamptz not null default now()
);

-- wall reads are always "newest visible first"
create index if not exists azaadi_wall_visible_idx
  on public.azaadi_wall (created_at desc)
  where hidden = false;

-- rate-limit lookups: recent posts by the same hash
create index if not exists azaadi_wall_ip_recent_idx
  on public.azaadi_wall (ip_hash, created_at desc);

-- ── RLS: anon may read visible rows; all writes go through the service role ──
alter table public.azaadi_wall enable row level security;

drop policy if exists azaadi_wall_public_read on public.azaadi_wall;
create policy azaadi_wall_public_read
  on public.azaadi_wall for select
  using (hidden = false);
