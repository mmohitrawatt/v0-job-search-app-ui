/* ─────────────────────────────────────────────────────────────────────────────
   ADZUNA — fetch REAL Indian jobs and normalize them to our `jobs` DB schema.
───────────────────────────────────────────────────────────────────────────── */

const BASE = "https://api.adzuna.com/v1/api/jobs/in/search"

// A spread of categories so the board has variety.
const TERMS = [
  "software engineer", "frontend developer", "backend developer", "full stack developer",
  "data analyst", "data scientist", "machine learning", "product manager",
  "ui ux designer", "digital marketing", "sales executive", "business analyst",
  "devops engineer", "human resources", "accountant", "content writer",
]
const PAGES_PER_TERM = 2
const PER_PAGE = 50

export type JobRow = {
  title: string
  company: string
  company_domain: string | null
  logo_url: string | null
  location: string
  city: string | null
  remote: boolean
  type: string
  department: string | null
  experience: string | null
  salary_min: number | null
  salary_max: number | null
  salary_text: string | null
  description: string | null
  apply_url: string | null
  source: string
  source_id: string
  posted_at: string | null
}

function salaryToLPA(min?: number, max?: number) {
  if (!min && !max) return { salary_min: null, salary_max: null, salary_text: null }
  const lo = min ? Math.round(min / 100000) : null
  const hi = max ? Math.round(max / 100000) : null
  let text: string | null = null
  if (lo && hi) text = lo === hi ? `₹${lo} LPA` : `₹${lo}–${hi} LPA`
  else if (lo) text = `₹${lo}+ LPA`
  else if (hi) text = `₹${hi} LPA`
  return { salary_min: min ?? null, salary_max: max ?? null, salary_text: text }
}

function mapType(contractTime: string | undefined, title: string) {
  const t = title.toLowerCase()
  if (t.includes("intern")) return "Internship"
  if (contractTime === "part_time") return "Contractual"
  return "Full Time"
}

function inferExperience(title: string): string | null {
  const t = title.toLowerCase()
  if (/\b(senior|sr\.?|lead|principal|head|manager|architect)\b/.test(t)) return "Senior"
  if (/\b(intern|fresher|trainee|graduate|junior|entry)\b/.test(t)) return "Entry / Fresher"
  return null
}

function normalize(r: any): JobRow | null {
  if (!r?.id || !r?.title) return null
  const title: string = r.title
  const location: string = r.location?.display_name || "India"
  const area: string[] = r.location?.area || []
  const remote = /\b(remote|work from home|wfh|anywhere)\b/i.test(`${title} ${location}`)
  const dept = (r.category?.label || "").replace(/\s*jobs?$/i, "").trim() || null
  return {
    title,
    company: r.company?.display_name || "Confidential",
    company_domain: null,
    logo_url: null,
    location,
    city: area.length ? area[area.length - 1] : null,
    remote,
    type: mapType(r.contract_time, title),
    department: dept,
    experience: inferExperience(title),
    ...salaryToLPA(r.salary_min, r.salary_max),
    description: r.description ? String(r.description).slice(0, 700) : "",
    apply_url: r.redirect_url || null,
    source: "adzuna",
    source_id: String(r.id),
    posted_at: r.created || null,
  }
}

async function fetchPage(term: string, page: number): Promise<any[]> {
  const id = process.env.ADZUNA_APP_ID, key = process.env.ADZUNA_APP_KEY
  if (!id || !key) return []
  const url = `${BASE}/${page}?app_id=${id}&app_key=${key}&results_per_page=${PER_PAGE}&what=${encodeURIComponent(term)}`
  try {
    const res = await fetch(url, { cache: "no-store" })
    if (!res.ok) return []
    const j = await res.json()
    return j?.results || []
  } catch {
    return []
  }
}

/* ── Logo resolution ─────────────────────────────────────────────────────────
   Resolve a real domain per company (Clearbit autocomplete, free) with a
   name-match check + concatenated-name fallback, then store a favicon URL.
──────────────────────────────────────────────────────────────────────────── */
function guessDomainSrv(name: string): string | null {
  const words = name.toLowerCase()
    .replace(/&/g, " and ")
    .replace(/\b(inc|llc|ltd|limited|corp|corporation|gmbh|pvt|private|technologies|technology|solutions|systems|labs|group|holdings|the|co|company|india|hiring|careers)\b/g, " ")
    .split(/[^a-z0-9]+/).filter(Boolean)
  if (!words.length) return null
  // A single distinctive first word is usually the brand's domain.
  if (words[0].length >= 4) return `${words[0]}.com`
  const concat = words.join("")
  return concat.length >= 2 ? `${concat}.com` : null
}

async function resolveDomain(company: string): Promise<string | null> {
  try {
    const res = await fetch(`https://autocomplete.clearbit.com/v1/companies/suggest?query=${encodeURIComponent(company)}`)
    if (res.ok) {
      const arr = await res.json()
      const d: string | undefined = arr?.[0]?.domain
      // Trust Clearbit's top match — it's name→domain and usually correct.
      if (d) return d
    }
  } catch { /* ignore */ }
  // Only guess when Clearbit has nothing.
  return guessDomainSrv(company)
}

/* Re-resolve logos for a list of companies (no Adzuna calls). */
export async function resolveCompanyDomains(companies: string[]): Promise<Map<string, string | null>> {
  const map = new Map<string, string | null>()
  const CONC = 8
  const uniq = [...new Set(companies.filter(Boolean))]
  for (let i = 0; i < uniq.length; i += CONC) {
    const batch = uniq.slice(i, i + CONC)
    const doms = await Promise.all(batch.map((c) => resolveDomain(c)))
    batch.forEach((c, j) => map.set(c, doms[j]))
  }
  return map
}

export async function enrichLogos(rows: JobRow[]): Promise<void> {
  const companies = [...new Set(rows.map((r) => r.company).filter(Boolean))]
  const map = new Map<string, string | null>()
  const CONC = 8
  for (let i = 0; i < companies.length; i += CONC) {
    const batch = companies.slice(i, i + CONC)
    const doms = await Promise.all(batch.map((c) => resolveDomain(c)))
    batch.forEach((c, j) => map.set(c, doms[j]))
  }
  for (const r of rows) {
    const d = map.get(r.company)
    if (d) {
      r.company_domain = d
      r.logo_url = `https://icons.duckduckgo.com/ip3/${d}.ico`
    }
  }
}

/* Fetch across all terms + pages (limited concurrency), normalize, de-dupe */
export async function fetchAllAdzuna(): Promise<JobRow[]> {
  const tasks: Array<() => Promise<any[]>> = []
  for (const term of TERMS) {
    for (let p = 1; p <= PAGES_PER_TERM; p++) tasks.push(() => fetchPage(term, p))
  }

  const CONCURRENCY = 4
  const results: any[] = []
  for (let i = 0; i < tasks.length; i += CONCURRENCY) {
    const batch = await Promise.all(tasks.slice(i, i + CONCURRENCY).map((fn) => fn()))
    for (const arr of batch) results.push(...arr)
  }

  const seen = new Set<string>()
  const out: JobRow[] = []
  for (const r of results) {
    const row = normalize(r)
    if (!row || seen.has(row.source_id)) continue
    seen.add(row.source_id)
    out.push(row)
  }
  return out
}
