-- ─────────────────────────────────────────────────────────────────────────────
-- Jobingen — Supabase Schema
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ─────────────────────────────────────────────────────────────────────────────

-- Enable UUID extension (already enabled by default in Supabase)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";


-- ─── Table: early_access ─────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS early_access (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT NOT NULL,
  email      TEXT NOT NULL,
  phone      TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Migration: add phone column if table already exists
ALTER TABLE early_access ADD COLUMN IF NOT EXISTS phone TEXT NOT NULL DEFAULT '';

-- Unique constraint to prevent duplicate signups
CREATE UNIQUE INDEX IF NOT EXISTS early_access_email_idx ON early_access (LOWER(email));

-- RLS: allow inserts from anon (public form submissions)
ALTER TABLE early_access ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert" ON early_access
  FOR INSERT TO anon WITH CHECK (true);

-- Admins can read all rows (service role bypasses RLS automatically)


-- ─── Table: hackathon_registrations ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS hackathon_registrations (
  id                     UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name                   TEXT NOT NULL,
  email                  TEXT NOT NULL,
  phone                  TEXT NOT NULL,
  college                TEXT NOT NULL,
  team_name              TEXT NOT NULL,
  upi_transaction_id     TEXT NOT NULL,
  payment_screenshot_url TEXT,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- RLS: allow inserts from anon (public form submissions)
ALTER TABLE hackathon_registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert" ON hackathon_registrations
  FOR INSERT TO anon WITH CHECK (true);

-- Admins can read all rows (service role bypasses RLS automatically)


-- ─── Table: campus_ambassador_applications ──────────────────────────────────
CREATE TABLE IF NOT EXISTS campus_ambassador_applications (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name            TEXT NOT NULL,
  college         TEXT NOT NULL,
  course_year     TEXT NOT NULL,
  email           TEXT NOT NULL,
  phone           TEXT NOT NULL,
  linkedin        TEXT,
  instagram       TEXT,
  why_ambassador  TEXT NOT NULL,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- RLS: allow inserts from anon (public form submissions)
ALTER TABLE campus_ambassador_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert" ON campus_ambassador_applications
  FOR INSERT TO anon WITH CHECK (true);

-- Admins can read all rows (service role bypasses RLS automatically)


-- ─── Storage bucket: hackathon-screenshots ───────────────────────────────────
-- Run this separately in Supabase Dashboard → Storage → New bucket
-- OR execute via SQL:

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'hackathon-screenshots',
  'hackathon-screenshots',
  true,
  5242880,  -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO NOTHING;

-- Storage policy: allow public uploads
CREATE POLICY "Allow public uploads" ON storage.objects
  FOR INSERT TO anon
  WITH CHECK (bucket_id = 'hackathon-screenshots');

-- Storage policy: allow public reads (for screenshot URL access)
CREATE POLICY "Allow public reads" ON storage.objects
  FOR SELECT TO anon
  USING (bucket_id = 'hackathon-screenshots');
