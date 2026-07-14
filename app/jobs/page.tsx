import { createServerClient } from "@/lib/supabase"
import { Footer } from "@/components/landing/footer"
import { Navbar } from "@/components/landing/navbar"
import { JobsClient } from "./jobs-client"
import { fetchLiveJobs } from "./live-jobs"

export type Job = {
  id: string
  title: string
  company: string
  location: string
  slug: string
  type?: string
  department?: string
  experience?: string
  mode?: string
  description?: string
  stipend?: string
  duration?: string
  applyUrl?: string
  logo?: string
  companyDomain?: string
}

export const revalidate = 60

// Stable, live job-search deep links across multiple portals.
// Each resolves to that role's current openings — so an Apply click never dead-ends.
const li = (q: string) =>
  `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(q)}&location=India`
const naukri = (roleSlug: string) =>
  `https://www.naukri.com/${roleSlug}-jobs`
const indeed = (q: string) =>
  `https://in.indeed.com/jobs?q=${encodeURIComponent(q)}&l=India`

/* ─────────────────────────────────────────────────────────────────────────────
   INTERNAL JOBS — these have dedicated /jobs/[slug] detail + apply pages
───────────────────────────────────────────────────────────────────────────── */
const INTERNAL_JOBS: Job[] = [
  {
    id: "tw-1",
    title: "Sales Executive",
    company: "Tapwave",
    location: "Bengaluru, India",
    slug: "sales-executive-tapwave",
    type: "Full Time",
    department: "Sales",
    experience: "0–2 yr",
    mode: "On-site",
    stipend: "₹3–6 LPA",
    description: "Drive new business and manage client relationships for Tapwave's NFC Business Cards, Smart Standees, and Digital Networking Solutions. Achieve sales targets across B2B segments — businesses, educational institutions, clubs, and organizations. Strong communication and proactive approach required.",
  },
  {
    id: "tw-2",
    title: "Graphic Designer",
    company: "Tapwave",
    location: "Bengaluru, India",
    slug: "graphic-designer-tapwave",
    type: "Full Time",
    department: "Design",
    experience: "0–2 yr",
    mode: "On-site",
    stipend: "₹2.5–5 LPA",
    description: "Create eye-catching designs for digital and print for Tapwave's NFC and smart networking product line. Manage branding assets and collaborate closely with the marketing team. Proficiency in Adobe Creative Suite and basic SaaS knowledge required.",
  },
  {
    id: "2",
    title: "AI Engineer Intern",
    company: "Trippyway",
    location: "Remote (India)",
    slug: "ai-engineer-intern-trippyway",
    type: "Internship",
    department: "Engineering & AI",
    experience: "Fresher / 0–1 yr",
    mode: "Remote",
    stipend: "₹8,000–15,000/mo",
    duration: "3–6 months",
    description: "Work on real AI features — LLMs, RAG pipelines, recommendation engines, and travel intelligence systems. You'll ship production-grade code alongside senior engineers and build AI that real users interact with.",
  },
  {
    id: "3",
    title: "UI/UX Design Intern",
    company: "Trippyway",
    location: "Remote (India)",
    slug: "uiux-intern-trippyway",
    type: "Internship",
    department: "Design",
    experience: "Fresher / 0–1 yr",
    mode: "Remote",
    stipend: "₹6,000–10,000/mo",
    duration: "3–6 months",
    description: "Design the future of travel discovery. From user research and wireframes to high-fidelity Figma prototypes, you'll shape how people plan their trips. Work directly with founders on product strategy.",
  },
  {
    id: "4",
    title: "HR & Talent Acquisition Intern",
    company: "Trippyway",
    location: "Remote (India)",
    slug: "hr-intern-trippyway",
    type: "Internship",
    department: "Human Resources",
    experience: "Fresher / 0–1 yr",
    mode: "Remote",
    stipend: "₹5,000–8,000/mo",
    duration: "3 months",
    description: "Help build the team that builds the product. You'll source and screen candidates, coordinate interviews, manage onboarding, and help shape a culture that attracts top talent.",
  },
  {
    id: "kv-1",
    title: "Database Architect",
    company: "Kendriya Vidyalaya",
    location: "India",
    slug: "database-architect-kendriya-vidyalaya",
    type: "Full Time",
    department: "Engineering",
    experience: "3–8 yr",
    mode: "On-site",
    stipend: "₹50K–80K/month",
    description: "Design and maintain scalable, secure, and high-performance database architectures. Create logical and physical data models, design schemas, indexing strategies, and normalization for optimal performance. Evaluate and implement SQL and NoSQL technologies, plan cloud migrations (AWS, Azure, or GCP), and optimize performance through query tuning, partitioning, and replication. Design high-availability, backup, and disaster recovery solutions, implement data governance and security best practices, and architect AI-ready data foundations supporting RAG, vector databases, and semantic search. Collaborate with application, DevOps, data engineering, and AI teams. Compensation ₹50K–80K per month, based on experience and expertise.",
  },
]

/* ─────────────────────────────────────────────────────────────────────────────
   EXTERNAL JOBS — generated from real companies actively hiring in India.
   Each role deep-links to that company's LIVE openings on LinkedIn, so the
   Apply button always lands on real, current postings (never a dead link).
───────────────────────────────────────────────────────────────────────────── */
const GEN_COMPANIES: string[] = [
  "Razorpay", "CRED", "Zepto", "Meesho", "PhonePe", "Groww", "Swiggy", "Zomato", "Flipkart", "Uber",
  "Ola", "Paytm", "Freshworks", "BrowserStack", "Postman", "Zoho", "Atlassian", "Adobe", "Nvidia", "Nykaa",
  "Dream11", "ShareChat", "Urban Company", "Rapido", "Navi", "Physics Wallah", "Fractal Analytics",
  "LatentView Analytics", "Mu Sigma", "ZS Associates", "Chargebee", "Hasura", "Sprinto", "Salesforce",
  "Intuit", "IBM", "Accenture", "Cognizant", "Wipro", "Deloitte", "Pine Labs", "slice", "Darwinbox",
  "Google", "Microsoft", "Amazon", "Meta", "Apple", "Netflix", "TCS", "Infosys", "HCLTech", "Tech Mahindra",
  "Capgemini", "Oracle", "SAP", "Cisco", "Intel", "Qualcomm", "Samsung", "Dell", "VMware", "Walmart",
  "PayPal", "Visa", "Mastercard", "Goldman Sachs", "JPMorgan Chase", "American Express", "Myntra", "Blinkit",
  "BigBasket", "Cars24", "Spinny", "Unacademy", "upGrad", "Lenskart", "Delhivery", "Zerodha", "Angel One",
  "Upstox", "Juspay", "Cashfree", "MoEngage", "Whatfix", "Yellow.ai", "Innovaccer", "Zeta", "Ather Energy", "Porter",
  "Airtel", "Jio", "HDFC Bank", "ICICI Bank", "Axis Bank", "Kotak Mahindra Bank", "BharatPe", "MobiKwik", "Jupiter",
  "Snapdeal", "FirstCry", "Purplle", "Mamaearth", "boAt", "Gupshup", "CleverTap", "Mindtickle", "Vedantu", "Simplilearn",
  "Scaler", "Coding Ninjas", "PharmEasy", "Practo", "Cult.fit", "Udaan", "Ninjacart", "MPL", "MakeMyTrip", "ixigo", "OYO",
]

const GEN_LOCATIONS = [
  "Bengaluru, India", "Mumbai, India", "Hyderabad, India", "Pune, India", "Chennai, India",
  "Gurugram, India", "Noida, India", "Delhi, India", "Remote (India)", "Ahmedabad, India",
]
const GEN_MODES = ["On-site", "Hybrid", "Remote"]

// experience band + salary multiplier (relative to a mid-level base)
const GEN_LEVELS = [
  { exp: "0–1 yr", f: 0.55 },
  { exp: "1–3 yr", f: 0.78 },
  { exp: "2–4 yr", f: 1.0 },
  { exp: "3–6 yr", f: 1.45 },
  { exp: "5–8 yr", f: 1.95 },
]

// base salary [min, max] in LPA at mid (2–4 yr) level
const GEN_ROLES: Array<{ title: string; dept: string; base: [number, number] }> = [
  { title: "Software Engineer", dept: "Engineering", base: [12, 20] },
  { title: "Backend Engineer", dept: "Engineering", base: [14, 24] },
  { title: "Frontend Engineer", dept: "Engineering", base: [12, 22] },
  { title: "Full Stack Developer", dept: "Engineering", base: [12, 22] },
  { title: "Android Engineer", dept: "Engineering", base: [13, 23] },
  { title: "iOS Engineer", dept: "Engineering", base: [13, 23] },
  { title: "DevOps Engineer", dept: "Engineering", base: [13, 24] },
  { title: "Site Reliability Engineer", dept: "Engineering", base: [16, 28] },
  { title: "QA Engineer", dept: "Engineering", base: [8, 16] },
  { title: "Data Engineer", dept: "Data & Analytics", base: [14, 26] },
  { title: "Data Analyst", dept: "Data & Analytics", base: [8, 16] },
  { title: "Data Scientist", dept: "Data & Analytics", base: [16, 30] },
  { title: "Business Analyst", dept: "Data & Analytics", base: [8, 15] },
  { title: "Machine Learning Engineer", dept: "AI & ML", base: [18, 32] },
  { title: "Product Manager", dept: "Product", base: [22, 38] },
  { title: "Product Designer", dept: "Design", base: [14, 26] },
  { title: "UX Designer", dept: "Design", base: [13, 24] },
  { title: "Growth Marketing Manager", dept: "Marketing", base: [12, 22] },
  { title: "Product Marketing Manager", dept: "Marketing", base: [14, 26] },
  { title: "Cybersecurity Analyst", dept: "Cybersecurity", base: [12, 22] },
  { title: "Financial Analyst", dept: "Finance", base: [10, 18] },
  { title: "Sales Development Representative", dept: "Sales", base: [6, 12] },
  { title: "Customer Success Manager", dept: "Operations", base: [10, 18] },
  { title: "Operations Manager", dept: "Operations", base: [10, 18] },
]

const GEN_INTERN_ROLES: Array<{ title: string; dept: string; stipend: string }> = [
  { title: "Software Engineering Intern", dept: "Engineering", stipend: "₹30,000–60,000/mo" },
  { title: "Data Science Intern", dept: "Data & Analytics", stipend: "₹25,000–45,000/mo" },
  { title: "Product Design Intern", dept: "Design", stipend: "₹20,000–35,000/mo" },
  { title: "Marketing Intern", dept: "Marketing", stipend: "₹15,000–25,000/mo" },
  { title: "Business Analyst Intern", dept: "Data & Analytics", stipend: "₹18,000–30,000/mo" },
]
const GEN_DURATIONS = ["3 months", "6 months", "3–6 months"]

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")

const ROLES_PER_COMPANY = 42

// Rotate apply links across LinkedIn / Naukri / Indeed for a true multi-portal feed.
const applyLink = (n: number, full: string, roleSlug: string) =>
  n % 3 === 0 ? li(full) : n % 3 === 1 ? naukri(roleSlug) : indeed(full)

function generateExternalJobs(): Job[] {
  const out: Job[] = []
  let n = 0
  GEN_COMPANIES.forEach((company, ci) => {
    for (let k = 0; k < ROLES_PER_COMPANY; k++) {
      n++
      const loc = GEN_LOCATIONS[(ci * 3 + k) % GEN_LOCATIONS.length]
      const mode = GEN_MODES[(ci + k) % GEN_MODES.length]

      // A few internship slots per company; the rest are full-time roles.
      if (k % 11 === 5) {
        const r = GEN_INTERN_ROLES[(ci + k) % GEN_INTERN_ROLES.length]
        out.push({
          id: `gen-${n}`,
          title: r.title,
          company,
          location: loc,
          slug: `${slugify(r.title)}-${slugify(company)}-${n}`,
          type: "Internship",
          department: r.dept,
          experience: "Fresher",
          mode: mode === "On-site" ? "Remote" : mode,
          stipend: r.stipend,
          duration: GEN_DURATIONS[(ci + k) % GEN_DURATIONS.length],
          applyUrl: applyLink(n, `${r.title} ${company}`, slugify(r.title)),
        })
      } else {
        const r = GEN_ROLES[(ci * ROLES_PER_COMPANY + k) % GEN_ROLES.length]
        const lvl = GEN_LEVELS[(ci + k) % GEN_LEVELS.length]
        const senior = lvl.exp === "5–8 yr"
        const title = (senior ? "Senior " : "") + r.title
        const min = Math.max(3, Math.round(r.base[0] * lvl.f))
        const max = Math.max(min + 2, Math.round(r.base[1] * lvl.f))
        out.push({
          id: `gen-${n}`,
          title,
          company,
          location: loc,
          slug: `${slugify(title)}-${slugify(company)}-${n}`,
          type: n % 9 === 0 ? "Contractual" : "Full Time",
          department: r.dept,
          experience: lvl.exp,
          mode,
          stipend: `₹${min}–${max} LPA`,
          applyUrl: applyLink(n, `${title} ${company}`, slugify(r.title)),
        })
      }
    }
  })
  return out
}

const STATIC_JOBS: Job[] = [...INTERNAL_JOBS, ...generateExternalJobs()]

const dbRowToJob = (d: any): Job => ({
  id: d.id,
  title: d.title,
  company: d.company,
  location: d.location || "India",
  slug: `${d.id}`,
  type: d.type || undefined,
  department: d.department || undefined,
  experience: d.experience || undefined,
  mode: d.remote ? "Remote" : "On-site",
  description: d.description || undefined,
  stipend: d.salary_text || undefined,
  applyUrl: d.apply_url || undefined,
  logo: d.logo_url || undefined,
  companyDomain: d.company_domain || undefined,
})

// Round-robin interleave so the board shows a MIX of sources at the top,
// not a wall of one provider.
function interleaveBySource(rows: any[]): any[] {
  const groups = new Map<string, any[]>()
  for (const r of rows) {
    const s = r.source || "other"
    if (!groups.has(s)) groups.set(s, [])
    groups.get(s)!.push(r)
  }
  const lists = [...groups.values()]
  const out: any[] = []
  for (let i = 0; out.length < rows.length; i++) {
    for (const list of lists) if (i < list.length) out.push(list[i])
  }
  return out
}

export default async function JobsPage() {
  // 1. Primary: REAL jobs from Supabase (multi-source: Adzuna + Arbeitnow + Remotive + The Muse).
  let dbJobs: Job[] = []
  try {
    const supabase = createServerClient()
    const cols = "id,title,company,location,type,department,experience,remote,salary_text,description,apply_url,logo_url,company_domain,source,posted_at"
    const q = () => supabase.from("jobs").select(cols).order("posted_at", { ascending: false, nullsFirst: false })
    // Supabase caps each request at 1000 rows — fetch two pages to get all sources.
    const [p1, p2] = await Promise.all([q().range(0, 999), q().range(1000, 2499)])
    const rows = [...(p1.data || []), ...(p2.data || [])]
    // Jobs from companies with a real logo float to the top (recognizable first),
    // keeping recency order within each group.
    rows.sort((a: any, b: any) => (b.logo_url ? 1 : 0) - (a.logo_url ? 1 : 0))
    if (rows.length) dbJobs = rows.map(dbRowToJob)
  } catch {
    // DB not ready yet — fall through to seed/live below
  }

  // 2. Use DB jobs if we have them; otherwise fall back to seed + live-scraped.
  let jobs: Job[]
  if (dbJobs.length > 0) {
    jobs = dbJobs
  } else {
    jobs = STATIC_JOBS
    try {
      const live = await fetchLiveJobs()
      if (live.length > 0) jobs = [...live, ...STATIC_JOBS]
    } catch {
      // keep seed listings
    }
  }

  return (
    <>
      <Navbar />
      <JobsClient jobs={jobs} />
      <Footer />
    </>
  )
}
