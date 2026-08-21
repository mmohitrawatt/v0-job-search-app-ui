/**
 * JobEngine · Layer 2 matching — the cost-aware two-step scorer.
 *
 * Step 1 (this file, free): a keyword/heuristic prefilter narrows the full job
 *   set to the top ~20 candidates. Never sends every job to an LLM.
 * Step 2 (this file, one LLM call): those ~20 are batch-scored 0-100 with a
 *   one-line reason via lib/jobengine/llm.ts.
 *
 * The resume profile is built with the existing, battle-tested buildProfile()
 * from app/jobs/resume-match.ts — no duplicate parsing logic.
 */
import { buildProfile, type ResumeProfile } from "@/app/jobs/resume-match"
import { chatJSON, activeModel } from "./llm"

export { buildProfile }
export type { ResumeProfile }

/** A jobengine_jobs row, trimmed to what matching needs. */
export type CandidateJob = {
  id: string
  company: string
  title: string
  location: string | null
  description: string | null
  apply_url: string
}

const STOP = new Set(["and", "the", "for", "with", "from", "that", "this", "have", "your", "you", "are", "will", "work", "team", "role", "job"])
const tokenize = (s: string) =>
  (s.toLowerCase().match(/[a-z0-9+#.]+/g) || []).filter((t) => t.length > 2 && !STOP.has(t))

/**
 * Build a Postgres websearch tsquery (OR of the profile's strongest terms) so
 * the DB returns a few hundred plausible rows via the existing GIN index,
 * instead of us pulling all 5k jobs into memory on every match.
 */
export function buildFtsQuery(p: ResumeProfile): string {
  const terms = [...new Set([...p.roleKeys, ...p.skills])]
    .map((t) => t.replace(/[^a-z0-9 ]/gi, " ").trim().split(/\s+/)[0]) // tsquery-safe single words
    .filter((t) => t.length > 1)
    .slice(0, 14)
  return terms.join(" OR ")
}

/**
 * Cheap heuristic score for the prefilter. Reads title + description + location
 * (the DB FTS column only covers title+company, so this adds description signal
 * before we spend an LLM call). Returns a rough 0-100 used only for ranking.
 */
export function prefilterScore(job: CandidateJob, p: ResumeProfile): number {
  const title = job.title.toLowerCase()
  const desc = (job.description || "").toLowerCase()
  const loc = (job.location || "").toLowerCase()
  let s = 0

  if (p.roleKeys.some((k) => title.includes(k))) s += 30
  else if (p.roleKeys.some((k) => desc.includes(k))) s += 14

  if (title.includes(p.role.toLowerCase().split(" ")[0])) s += 10

  let sk = 0
  for (const skill of p.skills) if (title.includes(skill) || desc.includes(skill)) sk++
  s += Math.min(sk, 6) * 7

  let ov = 0
  for (const t of tokenize(job.title)) if (p.tokens.has(t)) ov++
  s += Math.min(ov, 4) * 5

  if (p.locations.some((l) => loc.includes(l))) s += 8
  // Remote / India signal — most users here want India-based or remote roles.
  if (/india|bengaluru|bangalore|mumbai|delhi|hyderabad|pune|remote/.test(loc)) s += 4

  return s
}

/**
 * Step 1: rank candidates by the cheap heuristic and keep the top N.
 * ATS boards list the same role across several locations as distinct postings;
 * we collapse those (same company + same title) so the shortlist — and the LLM
 * call it feeds — isn't wasted on duplicates.
 */
export function prefilter(jobs: CandidateJob[], p: ResumeProfile, topN = 20): CandidateJob[] {
  const ranked = jobs
    .map((j) => ({ j, s: prefilterScore(j, p) }))
    .sort((a, b) => b.s - a.s)

  const seen = new Set<string>()
  const out: CandidateJob[] = []
  for (const { j } of ranked) {
    const key = `${j.company.toLowerCase()}|${j.title.toLowerCase().replace(/\s+/g, " ").trim()}`
    if (seen.has(key)) continue
    seen.add(key)
    out.push(j)
    if (out.length >= topN) break
  }
  return out
}

export type ScoredMatch = { id: string; score: number; reason: string }

/** What the candidate explicitly wants — overrides/augments the resume heuristic. */
export type MatchPreferences = {
  role?: string
  location?: string
  workType?: string // e.g. "Remote", "Full-time", "Internship"
}

function profileSummary(p: ResumeProfile, prefs?: MatchPreferences): string {
  const lines = [
    // Heuristic label — deliberately hedged so the model weighs the actual
    // resume + skills over a possibly-wrong single-role guess.
    `Likely role (rough heuristic, may be wrong): ${p.role}`,
    `Seniority: ${p.seniority ?? "unknown"}`,
    `Detected skills: ${p.skills.join(", ") || "n/a"}`,
    `Preferred locations: ${p.locations.join(", ") || "any"}`,
  ]
  if (prefs && (prefs.role || prefs.location || prefs.workType)) {
    lines.push(
      "STATED PREFERENCES (weigh these heavily — the candidate typed them):",
      `  Desired role: ${prefs.role || "any"}`,
      `  Desired location: ${prefs.location || "any"}`,
      `  Work type: ${prefs.workType || "any"}`,
    )
  }
  return lines.join("\n")
}

/**
 * Step 2: one LLM call scores the prefiltered shortlist. Returns 0-100 + a
 * one-line reason per job. Defensive about count/shape — the caller falls back
 * to the heuristic score for anything the model drops.
 */
export async function scoreShortlist(
  resumeText: string,
  profile: ResumeProfile,
  shortlist: CandidateJob[],
  prefs?: MatchPreferences,
): Promise<ScoredMatch[]> {
  if (shortlist.length === 0) return []

  const jobsBlock = shortlist
    .map(
      (j, i) =>
        `[${i}] id=${j.id}\nTitle: ${j.title}\nCompany: ${j.company}\nLocation: ${j.location ?? "n/a"}\nDescription: ${(j.description || "").slice(0, 700)}`,
    )
    .join("\n\n")

  const system =
    "You are a precise technical recruiter for Indian students and early-career professionals. " +
    "Judge fit primarily from the RESUME text and detected skills — the 'likely role' line is a rough hint and is often wrong, so do not penalise a job merely for mismatching that label. " +
    "Score how well each job fits the candidate from 0 to 100, where 100 is a perfect fit. " +
    "Be discriminating: reserve 85+ for genuinely strong matches on skills and seniority. " +
    'Return ONLY a JSON object of the form {"matches":[{"id":"<job id>","score":<int 0-100>,"reason":"<max 14 words>"}]} ' +
    "with one entry per job. The reason must be specific (name the matching or missing skill), not generic."

  const user =
    `CANDIDATE PROFILE\n${profileSummary(profile, prefs)}\n\n` +
    `RESUME (excerpt)\n${resumeText.slice(0, 2500)}\n\n` +
    `JOBS TO SCORE (${shortlist.length})\n${jobsBlock}`

  const parsed = await chatJSON<{ matches?: ScoredMatch[] }>({
    system,
    user,
    maxTokens: 1800,
  })

  const byId = new Map<string, ScoredMatch>()
  for (const m of parsed.matches ?? []) {
    if (!m || typeof m.id !== "string") continue
    const score = Math.max(0, Math.min(100, Math.round(Number(m.score) || 0)))
    byId.set(m.id, { id: m.id, score, reason: String(m.reason || "").slice(0, 140) })
  }

  // Fill any gaps with the heuristic so the shortlist is always fully scored.
  return shortlist.map((j) => {
    const hit = byId.get(j.id)
    if (hit) return hit
    return { id: j.id, score: Math.min(84, prefilterScore(j, profile)), reason: "Keyword match (LLM skipped this row)." }
  })
}

export { activeModel }
