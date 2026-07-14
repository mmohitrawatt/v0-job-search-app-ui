# Jobingen — Jobs Page Roadmap 🚀

> **Scope: the `/jobs` page ONLY.** Make it a real, reliable, production-grade job board.
> Out of scope (for now): auth, landing page, in-app product, alerts. See bottom.

Goal: turn the current **good-looking-but-mostly-mock** `/jobs` page into **real, fresh, fast, personalized** listings.

Legend: 🔴 critical · 🟡 high · 🟢 nice-to-have · ✅ done · ⏳ in progress · ⬜ todo

---

## 📊 Honest audit — `/jobs` today

| Area | Today | Verdict |
|---|---|---|
| Listings | ~5,000 **generated** (mock) + ~400 **real live** (Arbeitnow/Remotive/Muse) | ⚠️ Mostly mock |
| Apply links | Real portal searches + real API URLs | ✅ Work (generated = searches, not exact postings) |
| Logos | 120 known + guessed domains for scraped | ⚠️ Many misses |
| Resume match | Client-side keyword scoring + match % | ✅ Works, basic |
| Search / filter | Client-side over all jobs + pagination | ⚠️ OK now, won't scale to 50k+ |
| Freshness | Live APIs cached 1h; generated is static | ⚠️ |
| DB | Not wired | ❌ |

**North star for `/jobs`:** every card = real job + current + real apply URL + real logo, backed by a DB, searchable at scale, ranked by your resume.

---

## Phase 0 — Git safety ✅ DONE
- [x] Commit current working state (`4e8609b`)
- [ ] Keep committing after each phase (editor was reverting files — git = safety net)
- [ ] Only ONE `pnpm dev` running at a time (two servers = broken `/jobs`)

---

## Phase 1 — Real data pipeline 🔴  ⬜
*Biggest upgrade: replace mock listings with real, DB-backed, auto-refreshing jobs.*

### 1a. Supabase `jobs` schema
- [ ] Columns: id, title, company, company_domain, logo_url, location, city, remote, type, department, experience, salary_min/max/text, description, apply_url, source, source_id, posted_at, created_at
- [ ] Indexes: posted_at, city, type, department; full-text on title+company
- [ ] Unique `(source, source_id)` for dedup

### 1b. Ingestion (real Indian jobs)
- [ ] **Adzuna India API** (free key) — primary, real ₹ salaries + apply URLs
- [ ] Keep Arbeitnow / Remotive / The Muse as secondary (remote/global)
- [ ] Normalizer per source → our schema; dedup

### 1c. Scheduled refresh
- [ ] **Vercel Cron** (or Supabase Edge Function) runs ingestion daily
- [ ] Upsert into Supabase; expire stale postings

### 1d. Serve `/jobs` from DB
- [ ] Page reads paged data from Supabase (not live API per request)
- [ ] Retire mock generator (keep tiny seed fallback)

**Acceptance:** every job on `/jobs` is real, from DB, auto-refreshed, page loads fast.
**Effort:** 1–2 days. **Need from you:** free Adzuna `app_id` + `key`, Supabase keys.

---

## Phase 2 — Real logos 🟡  ⬜
- [ ] **logo.dev** or **Clearbit autocomplete** — company *name* → real logo/domain
- [ ] Resolve at ingestion, store `logo_url`+`company_domain` in DB (cache, not per-render)
- [ ] Favicon fallback → coloured letter last resort

**Acceptance:** large majority of cards show a real brand logo.
**Effort:** half day. **Need:** logo.dev token (free) — optional.

---

## Phase 3 — AI resume matching 🟡  ⬜
*Upgrade keyword match → real semantic understanding.*

- [ ] Server route `/api/match` using **Claude API** (`claude-haiku-4-5` for speed/cost)
- [ ] Resume → structured profile (skills, roles, seniority, locations)
- [ ] Semantic score + **“why you match”** + **missing skills** on top jobs
- [ ] Keep client-side keyword scoring as instant/offline fallback
- [ ] Add **DOCX** support (`mammoth`) alongside PDF

**Acceptance:** upload resume → genuinely relevant ranking + readable reasons.
**Effort:** 1 day. **Need:** Anthropic API key.

---

## Phase 4 — Scale & performance 🟢  ⬜
- [ ] **Server-side search / filter / pagination** (DB queries) — 50k+ jobs
- [ ] Full-text (Postgres `tsvector`) → later semantic (pgvector) search
- [ ] **Virtualize** results list (`react-window`) — render only visible cards
- [ ] Lazy-load logos (IntersectionObserver)

**Acceptance:** instant search over 50k+ jobs, smooth scroll, low memory.
**Effort:** 1–2 days.

---

## Phase 5 — Polish 🟢  ⬜
- [ ] Split giant `jobs-client.tsx` → `JobCard`, `FilterBar`, `ResumePanel`, `JobGrid`
- [ ] Loading skeletons + better empty states
- [ ] Per-job SEO pages + metadata + sitemap (for the real DB jobs)
- [ ] Accessibility pass (keyboard, aria, contrast)

**Effort:** ongoing.

---

## 🎯 Execution order
1. **Phase 0** ✅ done
2. **Phase 1** — real data + DB (kills the “mock” problem) ← **start here**
3. **Phase 2** — logos
4. **Phase 3** — AI matching
5. **Phase 4 & 5** — scale + polish

## 🔑 Keys to grab (free tiers)
- **Adzuna** app_id + key → https://developer.adzuna.com
- **Supabase** URL + anon + service key
- **Anthropic** API key (Phase 3) → console.anthropic.com
- **logo.dev** token (Phase 2, optional)

---

## 🚫 Out of scope (not doing — jobs page only)
- Auth / login, saved-jobs persistence, job alerts / emails
- Landing page, in-app product screens, application tracker
- (Bookmark button on cards stays visual-only until/unless auth is added later)

*Last updated: 2026-07-14.*
