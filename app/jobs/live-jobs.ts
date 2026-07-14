import type { Job } from "./page"

/* ─────────────────────────────────────────────────────────────────────────────
   LIVE JOBS — fetched at request time (cached ~1h) from free public job-board
   APIs. These are REAL, current postings with real apply URLs. If any source is
   down the others still return, and the page falls back to generated listings.
───────────────────────────────────────────────────────────────────────────── */

const UA = "Mozilla/5.0 (compatible; JobingenBot/1.0)"
const REVALIDATE = 3600 // seconds

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 80)

// Keep locations short so cards never overflow (real data can be very long)
const clampLoc = (s?: string) => {
  const v = (s || "").split(",")[0].trim()
  return v.length > 34 ? v.slice(0, 34) + "…" : (v || "Remote")
}

function mapType(s?: string): string {
  const t = (s || "").toLowerCase()
  if (t.includes("intern")) return "Internship"
  if (t.includes("contract") || t.includes("freelance") || t.includes("temporary")) return "Contractual"
  return "Full Time"
}

async function getJson(url: string): Promise<any | null> {
  try {
    const res = await fetch(url, { headers: { "User-Agent": UA }, next: { revalidate: REVALIDATE } })
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}

/* Arbeitnow — 100 real jobs per page */
async function fromArbeitnow(pages = 3): Promise<Job[]> {
  const out: Job[] = []
  for (let p = 1; p <= pages; p++) {
    const j = await getJson(`https://www.arbeitnow.com/api/job-board-api?page=${p}`)
    const rows = j?.data || []
    if (!rows.length) break
    for (const it of rows) {
      if (!it?.title || !it?.company_name) continue
      out.push({
        id: `an-${it.slug}`,
        title: it.title,
        company: it.company_name,
        location: clampLoc(it.location),
        slug: it.slug || slugify(`${it.title}-${it.company_name}`),
        type: mapType((it.job_types || [])[0]),
        department: (it.tags || [])[0],
        mode: it.remote ? "Remote" : "On-site",
        applyUrl: it.url,
      })
    }
  }
  return out
}

/* Remotive — real remote jobs, includes company logos */
async function fromRemotive(): Promise<Job[]> {
  const j = await getJson("https://remotive.com/api/remote-jobs")
  const rows = j?.jobs || []
  return rows
    .filter((it: any) => it?.title && it?.company_name)
    .map((it: any) => ({
      id: `rmt-${it.id}`,
      title: it.title,
      company: it.company_name,
      location: (it.candidate_required_location || "Remote").split(",")[0].trim(),
      slug: slugify(`${it.title}-${it.id}`),
      type: mapType(it.job_type),
      department: it.category,
      mode: "Remote",
      stipend: it.salary && it.salary.length <= 24 ? it.salary : undefined,
      logo: it.company_logo_url || undefined,
      applyUrl: it.url,
    }))
}

/* The Muse — real jobs across companies + locations */
async function fromMuse(pages = 3): Promise<Job[]> {
  const out: Job[] = []
  for (let p = 1; p <= pages; p++) {
    const j = await getJson(`https://www.themuse.com/api/public/jobs?page=${p}`)
    const rows = j?.results || []
    if (!rows.length) break
    for (const it of rows) {
      if (!it?.name || !it?.company?.name) continue
      const loc = clampLoc((it.locations || [])[0]?.name || "Flexible")
      out.push({
        id: `muse-${it.id}`,
        title: it.name,
        company: it.company.name,
        location: loc,
        slug: slugify(`${it.name}-${it.id}`),
        type: mapType(it.type),
        department: (it.categories || [])[0]?.name,
        experience: (it.levels || [])[0]?.name,
        mode: /remote|flexible|anywhere/i.test(loc) ? "Remote" : "On-site",
        applyUrl: it.refs?.landing_page,
      })
    }
  }
  return out
}

export async function fetchLiveJobs(): Promise<Job[]> {
  const results = await Promise.allSettled([fromArbeitnow(3), fromRemotive(), fromMuse(4)])
  const all = results.flatMap((r) => (r.status === "fulfilled" ? r.value : []))

  // de-dupe by title + company
  const seen = new Set<string>()
  const out: Job[] = []
  for (const j of all) {
    const key = `${j.title}|${j.company}`.toLowerCase()
    if (seen.has(key)) continue
    seen.add(key)
    out.push(j)
  }
  return out
}
