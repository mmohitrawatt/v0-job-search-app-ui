/**
 * JobEngine · Layer 3 tailoring.
 *
 * Given a candidate's resume text and a specific job, produce a STRUCTURED
 * tailored resume (so we can render a real, well-formatted document and export
 * it to PDF) plus a cover letter — truthfully re-emphasising existing
 * experience, never inventing anything. Also returns an explicit change list
 * for the Layer 4 diff view.
 */
import { chatJSON } from "./llm"
import type { CandidateJob } from "./matching"

export type TailorChange = { before: string; after: string; why: string }

export type ResumeExperience = { role: string; company: string; period: string; bullets: string[] }
export type ResumeProject = { name: string; detail: string }
export type ResumeEducation = { degree: string; institution: string; cgpa: string; year: string }

export type StructuredResume = {
  name: string
  headline: string
  contact: { email: string; phone: string; location: string; links: string[] }
  summary: string
  skills: string[]
  experience: ResumeExperience[]
  projects: ResumeProject[]
  education: ResumeEducation[]
  positions: string[] // Positions of Responsibility (classic IIT-resume section)
  achievements: string[]
}

export type TailorResult = {
  structured: StructuredResume
  tailored: string // plain-text version (ATS copy-paste), derived from structured
  changes: TailorChange[]
  summary: string
  coverLetter: string
}

/** Flatten a structured resume to clean ATS-friendly plain text. */
export function structuredToText(r: StructuredResume): string {
  const lines: string[] = []
  if (r.name) lines.push(r.name.toUpperCase())
  if (r.headline) lines.push(r.headline)
  const c = r.contact || ({} as StructuredResume["contact"])
  const contactLine = [c.email, c.phone, c.location, ...(c.links || [])].filter(Boolean).join("  |  ")
  if (contactLine) lines.push(contactLine)
  if (r.summary) lines.push("", "SUMMARY", r.summary)
  if (r.skills?.length) lines.push("", "SKILLS", r.skills.join(", "))
  if (r.experience?.length) {
    lines.push("", "EXPERIENCE")
    for (const e of r.experience) {
      lines.push(`${e.role}${e.company ? " — " + e.company : ""}${e.period ? "  (" + e.period + ")" : ""}`)
      for (const b of e.bullets || []) lines.push(`  • ${b}`)
    }
  }
  if (r.projects?.length) {
    lines.push("", "PROJECTS")
    for (const p of r.projects) lines.push(`${p.name}${p.detail ? " — " + p.detail : ""}`)
  }
  if (r.education?.length) {
    lines.push("", "EDUCATION")
    for (const ed of r.education) lines.push(`${ed.degree}${ed.institution ? ", " + ed.institution : ""}${ed.cgpa ? "  — " + ed.cgpa : ""}${ed.year ? "  (" + ed.year + ")" : ""}`)
  }
  if (r.positions?.length) {
    lines.push("", "POSITIONS OF RESPONSIBILITY")
    for (const p of r.positions) lines.push(`  • ${p}`)
  }
  if (r.achievements?.length) {
    lines.push("", "ACHIEVEMENTS")
    for (const a of r.achievements) lines.push(`  • ${a}`)
  }
  return lines.join("\n").slice(0, 20000)
}

function normalizeStructured(raw: any): StructuredResume {
  const s = raw || {}
  const contact = s.contact || {}
  return {
    name: String(s.name || "").slice(0, 120),
    headline: String(s.headline || "").slice(0, 160),
    contact: {
      email: String(contact.email || "").slice(0, 120),
      phone: String(contact.phone || "").slice(0, 60),
      location: String(contact.location || "").slice(0, 120),
      links: Array.isArray(contact.links) ? contact.links.filter(Boolean).map((x: any) => String(x).slice(0, 160)).slice(0, 4) : [],
    },
    summary: String(s.summary || "").slice(0, 800),
    skills: Array.isArray(s.skills) ? s.skills.filter(Boolean).map((x: any) => String(x).slice(0, 60)).slice(0, 30) : [],
    experience: Array.isArray(s.experience)
      ? s.experience.slice(0, 8).map((e: any) => ({
          role: String(e?.role || "").slice(0, 140),
          company: String(e?.company || "").slice(0, 140),
          period: String(e?.period || "").slice(0, 60),
          bullets: Array.isArray(e?.bullets) ? e.bullets.filter(Boolean).map((b: any) => String(b).slice(0, 400)).slice(0, 8) : [],
        }))
      : [],
    projects: Array.isArray(s.projects)
      ? s.projects.slice(0, 6).map((p: any) => ({ name: String(p?.name || "").slice(0, 140), detail: String(p?.detail || "").slice(0, 400) }))
      : [],
    education: Array.isArray(s.education)
      ? s.education.slice(0, 5).map((ed: any) => ({ degree: String(ed?.degree || "").slice(0, 160), institution: String(ed?.institution || "").slice(0, 160), cgpa: String(ed?.cgpa || "").slice(0, 40), year: String(ed?.year || "").slice(0, 40) }))
      : [],
    positions: Array.isArray(s.positions) ? s.positions.filter(Boolean).map((x: any) => String(x).slice(0, 300)).slice(0, 6) : [],
    achievements: Array.isArray(s.achievements) ? s.achievements.filter(Boolean).map((x: any) => String(x).slice(0, 300)).slice(0, 6) : [],
  }
}

export async function tailorResume(resumeText: string, job: CandidateJob): Promise<TailorResult> {
  const system =
    "You are an expert resume writer for Indian students and early-career professionals. " +
    "You restructure a candidate's EXISTING resume into a clean IIT-placement format tailored to ONE job, and draft a short cover letter. Return STRUCTURED JSON.\n" +
    "CRITICAL FAITHFULNESS RULES — follow exactly:\n" +
    "1. PRESERVE EVERYTHING. Include EVERY education entry (school AND college — never drop Class X/XII), EVERY job/internship, EVERY project, and ALL skills that appear in the original. Do not omit, merge, or summarise away any real entry.\n" +
    "2. NEVER FABRICATE. Do not invent skills, employers, metrics, dates, positions, or achievements. Do not add skills that are not in the original (e.g. never add 'Cloud-native technologies' if the resume doesn't say it).\n" +
    "3. NEVER INFLATE SENIORITY. The headline must reflect the candidate's actual level. Do NOT add 'Senior', 'Staff', 'Lead', or 'Principal' unless those exact words are in the original. For a student/intern, use their real target role (e.g. 'Backend Engineer' or 'Software Engineer').\n" +
    "4. You MAY re-order, re-word for impact, and re-emphasise what is already there, and mirror the job's terminology where it honestly applies.\n" +
    "5. Copy contact details, CGPA/percentages, dates, and institute names VERBATIM from the original.\n" +
    "The cover letter must be 120-180 words, first-person, warm but professional, referencing the specific company and role, using only facts from the resume.\n" +
    "Return ONLY JSON of this exact shape:\n" +
    '{"resume":{"name":"","headline":"","contact":{"email":"","phone":"","location":"","links":[]},"summary":"",' +
    '"skills":[],"experience":[{"role":"","company":"","period":"","bullets":[]}],"projects":[{"name":"","detail":""}],' +
    '"education":[{"degree":"","institution":"","cgpa":"","year":""}],"positions":[],"achievements":[]},' +
    '"changes":[{"before":"","after":"","why":""}],"summary":"<=16 words on what changed","coverLetter":""}. ' +
    "education must contain ALL rows from the original (college + school); cgpa is the CGPA/percentage verbatim. " +
    "positions and achievements: include every one present in the original; empty array only if the original truly has none. " +
    "Include 3-6 meaningful edits in changes — each a real edit reflected in the tailored resume."

  const user =
    `TARGET JOB\nTitle: ${job.title}\nCompany: ${job.company}\nLocation: ${job.location ?? "n/a"}\n` +
    `Description:\n${(job.description || "").slice(0, 2500)}\n\n` +
    `CURRENT RESUME (verbatim)\n${resumeText.slice(0, 7000)}`

  // Generous budget so a full 1-2 page resume + cover + changes never truncates
  // (truncation was silently dropping later education/skills entries).
  const parsed = await chatJSON<any>({ system, user, maxTokens: 6000 })

  const structured = normalizeStructured(parsed?.resume)
  if (!structured.name && structured.experience.length === 0 && !structured.summary) {
    throw new Error("Tailoring produced no usable resume")
  }

  const changes: TailorChange[] = Array.isArray(parsed?.changes)
    ? parsed.changes
        .filter((c: any) => c && (c.before || c.after))
        .slice(0, 8)
        .map((c: any) => ({
          before: String(c.before || "").slice(0, 400),
          after: String(c.after || "").slice(0, 400),
          why: String(c.why || "").slice(0, 160),
        }))
    : []

  return {
    structured,
    tailored: structuredToText(structured),
    changes,
    summary: String(parsed?.summary || "Resume tailored to this role.").slice(0, 200),
    coverLetter: String(parsed?.coverLetter || "").trim().slice(0, 4000),
  }
}
