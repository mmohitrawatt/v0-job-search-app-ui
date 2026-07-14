/* ──────────────────────────────────────────────────────────────
   Jobingen Daily — WhatsApp-status-style updates.

   👉 ADMIN: To post a new status, add an object to the TOP of the
   STATUS_UPDATES array below. That's it. The newest one shows first.
   Old ones can be deleted or kept as an archive.

   Tips:
   - `date` is shown as a relative label ("Today", "Yesterday"...).
     Just use an ISO string like "2026-07-15".
   - `image` is optional. Leave it out for a text-only card.
   - `gradient` sets the card background (pick one of the presets).
   - `cta` is an optional button ("Apply now", "Read more"...).
   ────────────────────────────────────────────────────────────── */

export type StatusGradient = "blue" | "sunset" | "violet" | "teal" | "dark"

export interface StatusUpdate {
  id: string
  date: string // ISO date, e.g. "2026-07-15"
  tag: string // small pill label, e.g. "New Jobs", "Tip", "Event"
  title: string
  body: string
  image?: string // optional image URL
  gradient: StatusGradient
  cta?: { label: string; href: string }
}

export const STATUS_GRADIENTS: Record<StatusGradient, string> = {
  blue: "linear-gradient(150deg,#1d3a8f 0%,#3b5bdb 55%,#4668f5 100%)",
  sunset: "linear-gradient(150deg,#7a1f3d 0%,#c0392b 55%,#e2593a 100%)",
  violet: "linear-gradient(150deg,#3a1c71 0%,#5b2a86 55%,#7b3fe4 100%)",
  teal: "linear-gradient(150deg,#0f3d3e 0%,#0e7c7b 55%,#14b8a6 100%)",
  dark: "linear-gradient(150deg,#0b1220 0%,#111a30 55%,#1d2b4a 100%)",
}

/* ── Admin posts go here (newest first) ── */
export const STATUS_UPDATES: StatusUpdate[] = [
  {
    id: "2026-07-15-fresh-jobs",
    date: "2026-07-15",
    tag: "New Jobs",
    title: "5,000+ fresh roles live today",
    body: "We just scraped and verified thousands of new openings across product, design, data & engineering. Filter by your resume match in one tap.",
    gradient: "blue",
    cta: { label: "Browse jobs", href: "/jobs" },
  },
  {
    id: "2026-07-15-mentor-slots",
    date: "2026-07-15",
    tag: "Mentors",
    title: "Weekend mentor slots open",
    body: "Book a 1:1 with mentors from Google, Razorpay & Zomato. Limited slots this weekend — get your resume & interview reviewed.",
    gradient: "violet",
    cta: { label: "Meet mentors", href: "/mentors" },
  },
  {
    id: "2026-07-14-tip",
    date: "2026-07-14",
    tag: "Tip of the day",
    title: "Tailor before you apply",
    body: "Applicants who tailor their resume to the job description get 3× more callbacks. Paste any JD and let Vibe rewrite your resume in seconds.",
    gradient: "teal",
  },
]

/* Relative date label — safe without live Date in build scripts */
export function statusDateLabel(iso: string, today = new Date()): string {
  const d = new Date(iso + "T00:00:00")
  const t = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  const diff = Math.round((t.getTime() - d.getTime()) / 86_400_000)
  if (diff <= 0) return "Today"
  if (diff === 1) return "Yesterday"
  if (diff < 7) return `${diff} days ago`
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short" })
}
