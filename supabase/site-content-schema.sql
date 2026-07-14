-- ─────────────────────────────────────────────────────────────
-- Site content managed from the admin panel (/admin/content):
--   • the center-screen promo popup
--   • the WhatsApp-style daily status updates
--
-- Run this once in the Supabase SQL editor.
-- Also create a PUBLIC storage bucket named "site-content"
-- (Storage → New bucket → name: site-content → Public: ON)
-- so admin-uploaded posters/images get a public URL.
-- ─────────────────────────────────────────────────────────────

create table if not exists site_content (
  id         text primary key default 'main',
  popup      jsonb not null default '{}'::jsonb,
  statuses   jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);

-- seed the single row
insert into site_content (id) values ('main')
on conflict (id) do nothing;
