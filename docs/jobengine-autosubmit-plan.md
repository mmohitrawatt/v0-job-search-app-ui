# JobEngine — True Auto-Submit: Honest Build Plan

**Goal:** the real Tsenta experience — JobEngine fills the application, attaches the
resume, answers screeners, and submits, with the user approving before the final send.

This is a **multi-week engineering project**, not a one-session feature. This doc is the
honest architecture, phases, effort, and hard parts so you can decide: build in-house,
hire, or phase it.

---

## Why it can't be "just a web app"

A website **cannot** touch a form on another domain (browser same-origin security). And
submitting from **our server's IP** gets flagged by Greenhouse/Lever bot-detection and
fails silently at scale. So true automation MUST run **in the user's own browser, on their
own IP**. That's exactly why Tsenta ships a desktop app + Chrome extension — not a website.

**Delivery vehicle:** a **Chrome Extension (Manifest V3)** is the right v1. It runs on the
real apply page, uses the user's session/IP, and — critically — **can attach files** (via
the `DataTransfer` API) and click through the form. A desktop app (Electron + Playwright)
is the heavier Tsenta path; defer it.

---

## Architecture

```
JobEngine web app (done)          Chrome Extension (to build)
─────────────────────             ────────────────────────────
/api/jobengine/profile   ──────▶  background.js (fetch profile + tailored resume + PDF)
/api/jobengine/tailor    ──────▶  content.js: per-ATS adapter
/api/jobengine/answer(new)──────▶     ├─ fill text fields            ✅ have
                                       ├─ attach resume file (DataTransfer)  ← real, buildable
                                       ├─ answer screeners via LLM    ← new /api/jobengine/answer
                                       ├─ dropdowns / EEO / y-o-e      ← per-widget mapping
                                       ├─ multi-page "Next" handling   ← navigation state
                                       └─ review panel → user hits Submit
```

Key idea: **one adapter per ATS**. Greenhouse and Lever first (uniform, documented).
Workday/Ashby/iCIMS are each a separate, harder adapter (iframes, logins, dynamic steps).

---

## Phased plan (realistic)

### Phase 1 — Assisted auto-fill + resume attach  ·  ~1–2 weeks
- Extension fills name/email/phone/LinkedIn/GitHub/location on Greenhouse + Lever.  ✅ mostly built
- **Auto-attach the tailored resume** to the file input via `DataTransfer` (genuinely works in Chrome).
- Review panel: highlight what was filled; **user clicks the site's real Submit**.
- Outcome: ~80% of the typing gone. Real, shippable, low-risk.

### Phase 2 — Screener answers + full form  ·  ~2–3 weeks
- New route `POST /api/jobengine/answer`: given a question + the user's resume/profile,
  return a truthful answer in their voice (LLM). Cached per user.
- Handle dropdowns, "years of experience", work-authorization, EEO/voluntary fields.
- Multi-page forms: detect **Next** vs **Submit**, wait for loads, surface validation errors.
- Optional **auto-click Submit** after an explicit user confirm (human-in-the-loop, like Tsenta).

### Phase 3 — More ATSes  ·  ~1–2 months
- Workday, Ashby, iCIMS adapters. Each is hard: iframes, account creation, session handling.
- This is the real 6–12-month moat if you chase full coverage (Tsenta = 19 ATSes).

### Phase 4 — Hardening  ·  ongoing
- Adapter monitoring (ATS DOMs change → adapters break), a submission queue, notifications,
  a per-application **receipt** of exactly what was sent.

---

## The genuinely hard parts (no sugar-coating)

1. **Per-ATS adapters + maintenance.** The work isn't writing one; it's keeping N working as
   their HTML changes. This is the ongoing cost most people underestimate.
2. **Screener questions.** Free-text + widgets, mapped correctly, answered truthfully. Error-prone.
3. **File uploads that aren't a plain `<input type=file>`** (drag-only, S3 presigned) need custom code.
4. **Workday/iCIMS** — logins, multi-page, iframes. A different tier of difficulty from Greenhouse/Lever.
5. **Trust + safety.** Never submit without review; never fabricate screener answers.

## What is NOT hard (already solved here)
- Discovery, matching, tailoring, IIT resume + cover letter, tracking — all built and working.
- Anti-bot: running in the user's own browser (extension) largely defeats it. That's the point.

---

## Effort & cost (aligns with the Master Build Doc)

| Scope | Effort | Notes |
|---|---|---|
| Phase 1 (fill + attach + review-submit) | 1–2 wks | Real "auto-apply, you click submit" |
| Phase 2 (screeners + full form + auto-submit) | +2–3 wks | The satisfying part |
| Phase 3 (Workday/Ashby/iCIMS) | +1–2 mo | Optional, coverage play |
| Maintenance | ongoing | Adapters break; budget for it |

- **Freelancer:** ₹500–1,500/hr; Phase 1–2 ≈ ₹60k–1.5L one-time (per the Master Build Doc's ₹50k–1.2L range).
- **Runtime cost:** near-zero — submission runs on the user's device; only cheap LLM calls for screener answers.

---

## Recommended next step

**Build Phase 1 now** (it's real and mostly done): auto-fill + **auto-attach the resume file** +
a review panel, on Greenhouse & Lever. That alone removes ~80% of the pain and is honestly
demo-able. Then decide on Phase 2 once you've felt Phase 1 work on a real apply page.
