# Jobingen — Jobs Platform Roadmap 🚀

Goal: turn the current **good-looking-but-mostly-mock** jobs experience into a **real, reliable, production-grade** job platform.

Legend: 🔴 critical · 🟡 high · 🟢 nice-to-have · ✅ done · ⏳ in progress · ⬜ todo

---

## 📊 Honest audit — what's REAL vs MOCK today

| Area | Today | Verdict |
|---|---|---|
| Job listings | ~5,000 **generated** (mock) + ~400 **real live** (Arbeitnow/Remotive/Muse APIs, fetched per request) | ⚠️ Mostly mock |
| Apply links | Real portal searches (LinkedIn/Naukri/Indeed) + real API URLs | ✅ Work, but generated ones are searches not exact postings |
| Company logos | Known 120 companies (domain map) + guessed domains for scraped | ⚠️ Many misses |
| Resume match | Client-side keyword scoring | ✅ Works, basic |
| Saved jobs / bookmarks | Local component state only | ❌ Lost on refresh |
| Auth / accounts | None | ❌ |
| Search / filter | Client-side over all jobs + pagination | ⚠️ OK now, won't scale to 50k+ |
| Data freshness | Live APIs cached 1h; generated is static | ⚠️ |
| Database | Supabase referenced, not really used | ❌ Not wired |

**North star:** every job = real + current + has a real apply URL + a real logo, backed by a DB, searchable at scale, personalized by resume.

---

## Phase 0 — Foundation & safety 🔴  ⬜
*Do this before anything else. Small, fast, prevents lost work.*

- [ ] `git init` state check + commit current working state
- [ ] Branch strategy: `main` stable, feature branches per phase
- [ ] Commit after every working milestone (editor kept reverting files — git = safety net)
- [ ] `.env.local` audit — document all keys needed (Supabase, Adzuna, Anthropic, logo API)
- [ ] Fix the “multiple `next dev` instances” footgun — document: only ONE `pnpm dev`

**Acceptance:** clean git history, one command to run, no lost work risk.
**Effort:** 30 min.

---

## Phase 1 — Real data pipeline 🔴  ⬜
*The biggest upgrade: replace mock jobs with real, DB-backed, auto-refreshing data.*

### 1a. Supabase schema
- [ ] `jobs` table: id, title, company, company_domain, logo_url, location, city, remote, type, department, experience, salary_min/max/text, description, apply_url, source, source_id, posted_at, created_at
- [ ] Indexes: `posted_at`, `city`, `type`, `department`, full-text on `title`+`company`
- [ ] Unique constraint on `(source, source_id)` for dedup

### 1b. Ingestion (real Indian jobs)
- [ ] **Adzuna India API** (free key) — primary source, real ₹ salaries + apply URLs
- [ ] Keep Arbeitnow / Remotive / The Muse as secondary (remote/global)
- [ ] Normalizer: map each source → our `jobs` schema
- [ ] Dedup by title+company / source id

### 1c. Scheduled refresh
- [ ] **Vercel Cron** (or Supabase Edge Function) runs ingestion daily/hourly
- [ ] Upsert into Supabase (insert new, update existing, expire old)

### 1d. Serve from DB
- [ ] `/jobs` reads from Supabase (paged), not live-fetching APIs per request
- [ ] Retire the generated mock jobs (or keep tiny seed as fallback)

**Acceptance:** 100% of listed jobs are real, from DB, refreshed automatically, fast page loads.
**Effort:** 1–2 days. **Needs from you:** free Adzuna app_id + key.

---

## Phase 2 — Real logos 🟡  ⬜
- [ ] **logo.dev** or **Clearbit autocomplete** — company *name* → real logo/domain
- [ ] Resolve domain at ingestion time, store `company_domain` + `logo_url` in DB (cache — don't call per render)
- [ ] Favicon (DDG/Google) as fallback, coloured letter as last resort

**Acceptance:** the large majority of cards show a real brand logo.
**Effort:** half day. **Needs:** logo.dev token (free tier) — optional.

---

## Phase 3 — AI resume matching 🟡  ⬜
*Upgrade keyword match → real semantic understanding.*

- [ ] Server route `/api/match` using **Claude API** (model: `claude-sonnet-5` or `claude-haiku-4-5`)
- [ ] Parse resume → structured profile (skills, roles, seniority, locations, domains)
- [ ] Score jobs semantically + generate **“why you match”** + **missing skills** per top job
- [ ] Keep client-side keyword scoring as instant fallback (works offline / no key)
- [ ] Support **DOCX** (add `mammoth`) alongside PDF
- [ ] Cache parsed profile (localStorage / DB if logged in)

**Acceptance:** upload resume → genuinely relevant ranking + human-readable reasons.
**Effort:** 1 day. **Needs:** Anthropic API key.

---

## Phase 4 — Auth & user features 🟢  ⬜
- [ ] **Supabase Auth** (email + Google) — login/signup
- [ ] **Saved jobs** persisted per user (replace local-only bookmark state)
- [ ] **Application tracker** — mark applied / interviewing / offer (pipeline already exists in-app)
- [ ] **Job alerts** — save a search, email when new matches arrive (Resend/Supabase)
- [ ] Store uploaded resume + parsed profile per user

**Acceptance:** logged-in users keep saved jobs, get alerts, track applications.
**Effort:** 2–3 days.

---

## Phase 5 — Scale & performance 🟢  ⬜
- [ ] **Server-side search / filter / pagination** (DB queries) — handles 50k+ jobs
- [ ] Full-text search (Postgres `tsvector`) → later **semantic search (pgvector)** on embeddings
- [ ] **Virtualize** the results list (`react-window`) — render only visible cards
- [ ] Lazy-load logos (IntersectionObserver), `next/image` where possible
- [ ] Cache headers / ISR tuning

**Acceptance:** instant search over 50k+ jobs, buttery scroll, low memory.
**Effort:** 1–2 days.

---

## Phase 6 — Code health & polish 🟢  ⬜
- [ ] Break the giant `jobs-client.tsx` into components (`JobCard`, `FilterBar`, `ResumePanel`, `JobGrid`)
- [ ] Move heavy inline styles → Tailwind / CSS modules
- [ ] Loading skeletons, error boundaries, empty states everywhere
- [ ] Basic tests (matching logic, normalizers) + typecheck in CI
- [ ] SEO (per-job pages, metadata, sitemap), analytics, error monitoring (Sentry)
- [ ] Accessibility pass (keyboard, aria, contrast)

**Acceptance:** maintainable, tested, fast, indexed, accessible.
**Effort:** ongoing.

---

## 🎯 Suggested execution order
1. **Phase 0** (safety) — now, 30 min
2. **Phase 1** (real data + DB) — biggest impact, kills the “mock” problem
3. **Phase 2** (logos) — quick visual win on top of real data
4. **Phase 3** (AI matching) — the standout feature
5. **Phase 4** (auth + saved/alerts) — makes it a real product
6. **Phase 5 & 6** (scale + polish) — as it grows

## 🔑 Keys / accounts you'll need to grab (free tiers)
- Supabase project (URL + anon + service key) — likely already have
- **Adzuna** developer app_id + key → https://developer.adzuna.com
- **Anthropic** API key (for AI matching) → console.anthropic.com
- **logo.dev** token (optional, for logos)
- **Resend** key (optional, for alert emails)

---

*Last updated: 2026-07-14. Tick boxes as we ship each piece.*
