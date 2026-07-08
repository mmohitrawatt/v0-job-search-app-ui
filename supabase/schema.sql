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


-- ─── Table: campus_ambassadors ───────────────────────────────────────────────
-- Backs the Campus Ambassador Application Portal at /campus-ambassador-program
CREATE TABLE IF NOT EXISTS campus_ambassadors (
  id                     UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Personal Information
  full_name              TEXT NOT NULL,
  email                  TEXT NOT NULL,
  phone                  TEXT NOT NULL,
  gender                 TEXT,
  city                   TEXT,
  state                  TEXT,
  linkedin               TEXT,
  instagram              TEXT,

  -- Academic Information
  college                TEXT NOT NULL,
  university             TEXT,
  degree                 TEXT,
  branch                 TEXT,
  year                   TEXT NOT NULL,
  graduation_year        TEXT,

  -- Campus Information
  clubs                  TEXT[] NOT NULL DEFAULT '{}',
  leadership_experience  TEXT,

  -- Social Presence
  instagram_followers    TEXT,
  linkedin_followers     TEXT,
  content_creator        TEXT NOT NULL,

  -- Outreach Potential
  student_reach          TEXT NOT NULL,

  -- Motivation
  motivation             TEXT NOT NULL,

  -- Availability
  availability           TEXT NOT NULL,
  communication          TEXT NOT NULL,

  -- Agreement
  agreed_performance_based BOOLEAN NOT NULL DEFAULT FALSE,
  agreed_communication     BOOLEAN NOT NULL DEFAULT FALSE,

  -- Admin
  status                 TEXT NOT NULL DEFAULT 'Pending',
  submitted_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at              TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- RLS: allow inserts from anon (public form submissions)
ALTER TABLE campus_ambassadors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert" ON campus_ambassadors
  FOR INSERT TO anon WITH CHECK (true);

-- Admins can read/update all rows (service role bypasses RLS automatically)


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


-- ─── Table: jobs ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS jobs (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title       TEXT NOT NULL,
  company     TEXT NOT NULL,
  location    TEXT NOT NULL,
  slug        TEXT NOT NULL,
  description TEXT NOT NULL,
  apply_type  TEXT NOT NULL DEFAULT 'direct',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS jobs_slug_idx ON jobs (slug);

-- RLS: allow public read (job listings are public)
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read" ON jobs
  FOR SELECT TO anon USING (true);


-- ─── Table: job_applications ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS job_applications (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT NOT NULL,
  email      TEXT NOT NULL,
  phone      TEXT NOT NULL,
  linkedin   TEXT,
  resume_url TEXT,
  job_slug   TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- RLS: allow public insert
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert" ON job_applications
  FOR INSERT TO anon WITH CHECK (true);


-- ─── Storage bucket: resumes ─────────────────────────────────────────────────
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'resumes',
  'resumes',
  true,
  10485760,  -- 10MB limit
  ARRAY[
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ]
)
ON CONFLICT (id) DO NOTHING;

-- Storage policy: allow public uploads
CREATE POLICY "Allow public resume uploads" ON storage.objects
  FOR INSERT TO anon
  WITH CHECK (bucket_id = 'resumes');

-- Storage policy: allow public reads
CREATE POLICY "Allow public resume reads" ON storage.objects
  FOR SELECT TO anon
  USING (bucket_id = 'resumes');


-- ─── Sample job data ─────────────────────────────────────────────────────────
-- Remove or comment out after seeding
INSERT INTO jobs (title, company, location, slug, description, apply_type) VALUES
(
  'Frontend Engineer',
  'Jobingen',
  'Remote / Bangalore',
  'frontend-engineer',
  'Build beautiful, fast user interfaces using React and Next.js
Work closely with product and design to ship features
Write clean, maintainable TypeScript code
Optimize performance and accessibility across devices
Collaborate in code reviews and technical discussions',
  'direct'
),
(
  'Growth Marketing Intern',
  'Jobingen',
  'Remote',
  'growth-marketing-intern',
  'Drive user acquisition and engagement campaigns
Create compelling content for social media platforms
Analyze campaign performance and prepare reports
Assist in email marketing and SEO strategies
Work directly with the founding team',
  'direct'
),
(
  'Full Stack Developer',
  'Jobingen',
  'Hyderabad / Remote',
  'full-stack-developer',
  'Develop and maintain full-stack features using Next.js and Supabase
Design and implement scalable REST APIs
Work on database schema design and query optimization
Integrate third-party services and payment gateways
Participate in architecture discussions and planning',
  'direct'
)
ON CONFLICT (slug) DO NOTHING;

-- ─── Additional job listing ───────────────────────────────────────────────────
INSERT INTO jobs (title, company, location, slug, description, apply_type) VALUES
(
  'Technology Transfer & IP Manager',
  'IIT Kanpur (IITK)',
  'Kanpur, Uttar Pradesh',
  'ip-manager-iitk',
  'Handle the end-to-end process of intellectual property management generated at IITK.
Coordinate technology transfer activities, including valuation, licensing negotiations, and partnership building.
Develop marketing strategies for technologies through briefs, social media, website updates, and participation in expos/fairs.
Organize and deliver capacity-building programs, workshops, and presentations on IP management and technology transfer.
Act as a liaison between researchers, faculty, startups, and industry stakeholders to enable collaborative projects.
Conduct techno-commercial feasibility studies, market assessments, and due diligence reports for new technologies.
Support branding initiatives with corporate decks, outreach material, mailers, and event participation.
Assist in managing IP filings, patent portfolios, and legal compliance for licensed technologies.
Supervise a small team or coordinate with external consultants for valuation and legal vetting as needed.',
  'direct'
)
ON CONFLICT (slug) DO NOTHING;
