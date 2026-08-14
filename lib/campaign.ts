/* ─────────────────────────────────────────────────────────────
   Azaadi campaign — 80th Independence Day (15 Aug 2026).

   ONE date gate for every piece of seasonal theming on the site.
   Everything behind `isAzaadiLive()` reverts to the normal navy
   design system on its own when the window closes — no cleanup
   PR, no forgotten saffron banner in September.
   ───────────────────────────────────────────────────────────── */

/** 14 Aug 16:30 IST → 18 Aug 00:30 IST = exactly 80 hours.
 *  Move AZAADI_START and the whole campaign moves with it — just keep the
 *  gap at AZAADI_HOURS so the countdown and the promise stay honest. */
export const AZAADI_START = new Date("2026-08-14T16:30:00+05:30")
export const AZAADI_END = new Date("2026-08-18T00:30:00+05:30")

/** Which Independence Day this is — 15 Aug 1947 was the 1st, so 2026 is the
 *  80th. Drives the "80" everywhere, including the length of the pass. */
export const AZAADI_NUMBER = 2026 - 1946

/** Hours in the pass — deliberately the same number. That's the whole idea. */
export const AZAADI_HOURS = AZAADI_NUMBER

/** Tricolor accents. Navy stays the brand — these are accents only. */
export const TIRANGA = {
  saffron: "#ff9933",
  white: "#ffffff",
  green: "#138808",
  chakra: "#1d3a8f", // already our brand navy — that's the whole trick
} as const

export const TRICOLOR_GRADIENT =
  `linear-gradient(90deg, ${TIRANGA.saffron} 0%, ${TIRANGA.saffron} 33%, ${TIRANGA.white} 33%, ${TIRANGA.white} 66%, ${TIRANGA.green} 66%, ${TIRANGA.green} 100%)`

/** Thin-line variant. The flag's white band vanishes on a white page and the
 *  line reads as two disconnected dashes, so the middle third gets a light
 *  neutral instead — it still scans as the tiranga, but as ONE line. */
export const TRICOLOR_LINE =
  `linear-gradient(90deg, ${TIRANGA.saffron} 0%, ${TIRANGA.saffron} 33%, #dfe6f3 33%, #dfe6f3 66%, ${TIRANGA.green} 66%, ${TIRANGA.green} 100%)`

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
 *  so the pill counts down 80 → 0 the way the campaign promises. */
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
  // Ordinal, never a year count: 2026 is the 80th Independence Day, but only
  // 79 years have actually elapsed since 1947. "80 years free" would be wrong.
  headline: `India's ${AZAADI_NUMBER}th. Now get yours.`,
  sub: "Freedom from 500 cold applications. Freedom from “we’ll get back to you.”",
  passName: `${AZAADI_HOURS}-Hour Freedom Pass`,
  passLine: `India's ${AZAADI_NUMBER}th Independence Day — so, ${AZAADI_HOURS} hours of JobEngine auto-apply, free.`,
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
