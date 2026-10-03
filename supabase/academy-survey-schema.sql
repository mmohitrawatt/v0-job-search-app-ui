-- Jobingen Academy — "What do you want to learn about AI?" survey
create table if not exists academy_survey_responses (
  id                 uuid primary key default gen_random_uuid(),
  name               text,
  email              text,
  college            text not null,
  specialization     text not null,
  ai_topics          text[] not null default '{}',
  ai_topics_other    text,
  biggest_challenge  text not null,
  session_type       text not null,
  build_goal         text not null,
  specific_topic     text,
  created_at         timestamptz not null default now()
);

alter table academy_survey_responses enable row level security;

create policy "Service role can manage academy survey responses"
  on academy_survey_responses
  for all
  using (true)
  with check (true);

create index if not exists academy_survey_responses_created_at_idx
  on academy_survey_responses (created_at desc);
