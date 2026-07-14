/* ──────────────────────────────────────────────────────────────
   Center-screen promo popup (auto-opens on page load, auto-closes).

   👉 ADMIN: Whatever you set here pops up in the middle of the
   screen when someone opens the site, and closes on its own after
   `autoCloseSeconds`. Change the image / link / text any time.

   To turn it OFF: set `enabled: false`.
   ────────────────────────────────────────────────────────────── */

export interface PromoPopup {
  enabled: boolean
  image: string // put the poster in /public and reference it, e.g. "/promos/campus-ambassador.png"
  alt: string
  href?: string // where the poster links to (optional)
  autoCloseSeconds: number // e.g. 20
  oncePerSession: boolean // true = show only once per browser session (recommended)
}

export const PROMO_POPUP: PromoPopup = {
  // default OFF — the real config is managed from /admin/content (Supabase).
  // This only acts as a fallback if the DB is unreachable.
  enabled: false,
  image: "/promos/campus-ambassador.png",
  alt: "Become a Jobingen Campus Ambassador",
  href: "/campus-ambassador-program",
  autoCloseSeconds: 20,
  oncePerSession: true,
}
