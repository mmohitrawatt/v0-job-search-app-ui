/* ─────────────────────────────────────────────────────────────
   Azaadi campaign — Independence Day 2026 (79 years of freedom).

   ONE date gate for every piece of seasonal theming on the site.
   Everything behind `isAzaadiLive()` reverts to the normal navy
   design system on its own when the window closes — no cleanup
   PR, no forgotten saffron banner in September.
   ───────────────────────────────────────────────────────────── */

/** 14 Aug 16:30 IST → 17 Aug 23:30 IST = exactly 79 hours.
 *  Launched early on 14 Aug so the pass runs a full 79 hours from go-live
 *  rather than from midnight — the countdown and the promise stay honest. */
export const AZAADI_START = new Date("2026-08-14T16:30:00+05:30")
export const AZAADI_END = new Date("2026-08-17T23:30:00+05:30")

/** Years of independence — drives the "79" everywhere. Keep them tied. */
export const FREEDOM_YEARS = 2026 - 1947

/** Tricolor accents. Navy stays the brand — these are accents only. */
export const TIRANGA = {
  saffron: "#ff9933",
  white: "#ffffff",
  green: "#138808",
  chakra: "#1d3a8f", // already our brand navy — that's the whole trick
} as const

export const TRICOLOR_GRADIENT =
  `linear-gradient(90deg, ${TIRANGA.saffron} 0%, ${TIRANGA.saffron} 33%, ${TIRANGA.white} 33%, ${TIRANGA.white} 66%, ${TIRANGA.green} 66%, ${TIRANGA.green} 100%)`

/** Soft tricolor wash for large fills — the hard-edged flag reads as costume. */
export const TRICOLOR_SOFT =
  `linear-gradient(90deg, rgba(255,153,51,0.85), rgba(255,255,255,0.9) 50%, rgba(19,136,8,0.85))`

export function isAzaadiLive(now: Date = new Date()): boolean {
  return now >= AZAADI_START && now < AZAADI_END
}

/** Milliseconds left in the pass. 0 once it's over (never negative). */
export function azaadiRemainingMs(now: Date = new Date()): number {
  return Math.max(0, AZAADI_END.getTime() - now.getTime())
}

/** `{ h, m, s }` split of the remaining window — hours are NOT wrapped at 24,
 *  so the pill counts down 79 → 0 the way the campaign promises. */
export function azaadiCountdown(now: Date = new Date()) {
  const total = Math.floor(azaadiRemainingMs(now) / 1000)
  return {
    h: Math.floor(total / 3600),
    m: Math.floor((total % 3600) / 60),
    s: total % 60,
    over: total <= 0,
  }
}

export const pad2 = (n: number) => String(n).padStart(2, "0")

/* ─── Campaign copy — single source so every surface says the same thing ─── */
export const AZAADI_COPY = {
  eyebrow: "Independence Week",
  headline: `${FREEDOM_YEARS} years of freedom. Now get yours.`,
  sub: "Freedom from 500 cold applications. Freedom from “we’ll get back to you.”",
  passName: `${FREEDOM_YEARS}-Hour Freedom Pass`,
  passLine: `${FREEDOM_YEARS} years of independence — so, ${FREEDOM_YEARS} hours of JobEngine auto-apply, free.`,
  cta: "Claim the Freedom Pass",
  ctaHref: "https://ai.jobingen.com/login",
  wallHref: "/azaadi",
  wallPrompt: "What are you breaking free from?",
  /** Hero typewriter swaps to these for the window. Kept short on purpose —
   *  the headline sets them at clamp(…, 14vw, 66px) with no wrapping, so a
   *  long word would run straight off a phone screen. */
  typewriter: ["ghosting.", "cold applies.", "rejections.", "the wait."],
  typewriterShort: ["ghosting.", "cold DMs.", "the wait.", "no reply."],
  typewriterPrefix: "Freedom from",
} as const
