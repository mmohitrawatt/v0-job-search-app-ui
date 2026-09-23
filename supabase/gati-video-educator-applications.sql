-- Apply before accepting applications for the Gati Shiksha AI Trainer listing.
create table if not exists public.gati_video_educator_applications (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  preferred_tracks text[] not null,
  sample_video_url text,
  resume_url text not null,
  created_at timestamptz not null default now()
);

alter table public.gati_video_educator_applications enable row level security;
-- Safe to run again if the table was created before the video became optional.
alter table public.gati_video_educator_applications alter column sample_video_url drop not null;
-- Applications are inserted by the server with the service role key.
