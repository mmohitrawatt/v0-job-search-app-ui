import type { Job } from "./page"

/* ─────────────────────────────────────────────────────────────────────────────
   RESUME MATCH — client-side. Extracts text from an uploaded resume, builds a
   lightweight profile (skills / role / seniority / locations), and scores jobs.
───────────────────────────────────────────────────────────────────────────── */

export type ResumeProfile = {
  role: string
  skills: string[]
  roleKeys: string[]
  tokens: Set<string>
  seniority: "Senior" | "Mid" | "Fresher" | null
  locations: string[]
}

/* Extract plain text from a PDF (via pdf.js) or a text file */
export async function parseResume(file: File): Promise<string> {
  const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")
  if (isPdf) {
    const pdfjs: any = await import("pdfjs-dist")
    pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`
    const data = await file.arrayBuffer()
    const pdf = await pdfjs.getDocument({ data }).promise
    let text = ""
    for (let p = 1; p <= pdf.numPages; p++) {
      const page = await pdf.getPage(p)
      const content = await page.getTextContent()
      text += " " + content.items.map((it: any) => it.str || "").join(" ")
    }
    return text
  }
  return await file.text()
}

const SKILLS = [
  "javascript", "typescript", "react", "react native", "angular", "vue", "next.js", "node", "express",
  "python", "django", "flask", "fastapi", "java", "spring", "kotlin", "swift", "ios", "android", "flutter",
  "c++", "c#", ".net", "go", "golang", "rust", "ruby", "rails", "php", "laravel",
  "sql", "mysql", "postgresql", "mongodb", "redis", "graphql", "rest", "api", "microservices",
  "aws", "azure", "gcp", "docker", "kubernetes", "terraform", "ci/cd", "jenkins", "git", "linux",
  "html", "css", "tailwind", "sass", "redux", "webpack", "kafka", "spark", "hadoop", "etl", "airflow",
  "snowflake", "tableau", "power bi", "excel", "pandas", "numpy", "tensorflow", "pytorch",
  "machine learning", "deep learning", "nlp", "computer vision", "data science", "data analysis", "statistics",
  "figma", "sketch", "adobe", "photoshop", "illustrator", "ui", "ux", "wireframe", "prototype", "design system",
  "product management", "roadmap", "agile", "scrum", "jira", "a/b testing", "analytics",
  "seo", "sem", "google ads", "content", "social media", "email marketing", "growth", "hubspot", "salesforce", "crm", "copywriting", "brand",
  "b2b", "b2c", "lead generation", "pipeline", "negotiation", "account management",
  "financial modeling", "valuation", "accounting", "audit", "gst", "sap", "tally",
  "project management", "leadership", "cybersecurity", "devops", "qa", "testing", "selenium", "automation",
]

const ROLE_MAP: Array<{ role: string; keys: string[] }> = [
  { role: "Frontend Engineer", keys: ["react", "angular", "vue", "frontend", "javascript", "typescript", "tailwind", "redux", "next.js"] },
  { role: "Backend Engineer", keys: ["node", "backend", "api", "django", "flask", "spring", "express", "microservices", "golang", "rust", "java"] },
  { role: "Full Stack Developer", keys: ["full stack", "fullstack", "mern", "mean", "full-stack"] },
  { role: "Mobile Engineer", keys: ["android", "ios", "flutter", "kotlin", "swift", "react native"] },
  { role: "Data Scientist", keys: ["machine learning", "deep learning", "tensorflow", "pytorch", "nlp", "data science", "pandas", "numpy"] },
  { role: "Data Analyst", keys: ["sql", "tableau", "power bi", "excel", "data analysis", "analytics", "statistics"] },
  { role: "DevOps Engineer", keys: ["devops", "docker", "kubernetes", "aws", "terraform", "ci/cd", "jenkins"] },
  { role: "Product Designer", keys: ["figma", "sketch", "ux", "ui", "wireframe", "prototype", "design system"] },
  { role: "Product Manager", keys: ["product management", "roadmap", "agile", "scrum", "stakeholder", "product manager"] },
  { role: "Marketing", keys: ["seo", "marketing", "growth", "social media", "content", "google ads", "brand", "hubspot"] },
  { role: "Sales", keys: ["sales", "b2b", "lead generation", "account management", "crm", "pipeline"] },
  { role: "Finance", keys: ["finance", "accounting", "financial modeling", "audit", "gst", "valuation"] },
]

const CITIES = [
  "bengaluru", "bangalore", "mumbai", "delhi", "gurugram", "gurgaon", "noida", "hyderabad",
  "pune", "chennai", "kolkata", "ahmedabad", "remote",
]

const STOP = new Set(["and", "the", "for", "with", "from", "that", "this", "have", "your", "you", "are", "was", "will", "work", "team", "using", "used", "role", "job"])

const tokenize = (s: string) =>
  (s.toLowerCase().match(/[a-z0-9+#.]+/g) || []).filter((t) => t.length > 2 && !STOP.has(t))

export function buildProfile(text: string): ResumeProfile {
  const lower = text.toLowerCase()

  const skills = SKILLS.filter((sk) => lower.includes(sk))

  // detect role by which category has the most keyword hits
  let best = ROLE_MAP[0], bestHits = -1
  for (const cat of ROLE_MAP) {
    const hits = cat.keys.filter((k) => lower.includes(k)).length
    if (hits > bestHits) { bestHits = hits; best = cat }
  }

  // seniority
  let seniority: ResumeProfile["seniority"] = "Mid"
  const yrs = lower.match(/(\d{1,2})\s*\+?\s*(?:years|yrs|year)/)
  const y = yrs ? parseInt(yrs[1], 10) : null
  if (/\b(intern|fresher|graduate|trainee)\b/.test(lower) || (y !== null && y < 1)) seniority = "Fresher"
  else if (/\b(senior|lead|principal|head|manager|architect)\b/.test(lower) || (y !== null && y >= 5)) seniority = "Senior"

  const locations = CITIES.filter((c) => lower.includes(c))

  const tokens = new Set([...tokenize(text)])

  return { role: best.role, skills: skills.slice(0, 12), roleKeys: best.keys, tokens, seniority, locations }
}

export function scoreJob(job: Job, p: ResumeProfile): number {
  const hay = `${job.title} ${job.department || ""} ${job.type || ""} ${job.mode || ""}`.toLowerCase()
  let s = 8

  if (p.roleKeys.some((k) => hay.includes(k))) s += 34
  if (hay.includes(p.role.toLowerCase().split(" ")[0])) s += 10

  let sk = 0
  for (const skill of p.skills) if (hay.includes(skill)) sk++
  s += Math.min(sk, 4) * 9

  let ov = 0
  for (const t of tokenize(job.title)) if (p.tokens.has(t)) ov++
  s += Math.min(ov, 4) * 7

  if (p.locations.some((l) => job.location.toLowerCase().includes(l))) s += 8

  const exp = (job.experience || "").toLowerCase()
  if (p.seniority === "Senior" && /(5|6|7|8|9|senior|lead)/.test(exp)) s += 6
  if (p.seniority === "Fresher" && /(fresher|intern|0|1)/.test(exp)) s += 6

  return Math.max(38, Math.min(99, s))
}
