"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { formatDistanceToNow } from "date-fns"
import { parseResume } from "@/app/jobs/resume-match"

/* ─────────────────────────────────────────────────────────────────────────────
   JobEngine — the full engine (Layers 1-6): discover → match → tailor →
   diff & approve → assisted apply → track. Product-grade UI in the Jobingen
   theme (white, navy #1d3a8f, ink #0c1a35, Inter), inside the shared
   Navbar/Footer shell. Design cues from Tsenta (transparent, flat, match-first)
   rendered strictly in Jobingen's palette.
───────────────────────────────────────────────────────────────────────────── */

const NAVY = "#1d3a8f"
const INK = "#0c1a35"

type Match = {
  id: string
  company: string
  title: string
  location: string | null
  applyUrl: string | null
  score: number
  reason: string
}
type Profile = { role?: string; seniority?: string | null; skills?: string[] }
type TailorChange = { before: string; after: string; why: string }
type StructuredResume = {
  name: string
  headline: string
  contact: { email: string; phone: string; location: string; links: string[] }
  summary: string
  skills: string[]
  experience: { role: string; company: string; period: string; bullets: string[] }[]
  projects: { name: string; detail: string }[]
  education: { degree: string; institution: string; cgpa: string; year: string }[]
  positions: string[]
  achievements: string[]
}
type TailorData = {
  job: { id: string; company: string; title: string; location: string | null; applyUrl: string | null }
  match: { score: number; reason: string } | null
  original: string
  structured: StructuredResume | null
  tailored: string
  changes: TailorChange[]
  summary: string
  coverLetter: string
}
type Application = {
  jobId: string
  status: "opened" | "submitted" | "replied"
  matchScore: number | null
  matchReason: string | null
  tailorSummary: string | null
  tailoredResume: string | null
  coverLetter: string | null
  company: string
  title: string
  location: string | null
  applyUrl: string | null
  openedAt: string | null
  submittedAt: string | null
  repliedAt: string | null
  updatedAt: string
}
type Stats = { jobs: number; companies: number; lastCrawl: string | null; companyNames?: string[] }
type Prefs = { role: string; location: string; workType: string }
const WORK_TYPES = ["Any", "Full-time", "Internship", "Remote"]

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const STATUS_ORDER = ["opened", "submitted", "replied"] as const

function scoreColor(score: number): { fg: string; bg: string; ring: string } {
  if (score >= 85) return { fg: "#047857", bg: "#ecfdf5", ring: "#10b981" }
  if (score >= 70) return { fg: NAVY, bg: "#eef2ff", ring: NAVY }
  if (score >= 50) return { fg: "#b45309", bg: "#fffbeb", ring: "#f59e0b" }
  return { fg: "#64748b", bg: "#f1f5f9", ring: "#94a3b8" }
}
function monogram(company: string): string {
  const p = company.trim().split(/\s+/)
  return (p[0]?.[0] || "?").toUpperCase() + (p[1]?.[0] || "").toUpperCase()
}
function ago(iso: string | null): string {
  if (!iso) return ""
  try { return formatDistanceToNow(new Date(iso), { addSuffix: true }) } catch { return "" }
}
const STATUS_META: Record<Application["status"], { label: string; fg: string; bg: string }> = {
  opened: { label: "Applying", fg: "#b45309", bg: "#fffbeb" },
  submitted: { label: "Submitted", fg: NAVY, bg: "#eef2ff" },
  replied: { label: "Replied", fg: "#047857", bg: "#ecfdf5" },
}

/* Ring score badge — the match number is the hero of every card. */
function ScoreRing({ score, size = 54 }: { score: number; size?: number }) {
  const sc = scoreColor(score)
  const stroke = 4
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const dash = (score / 100) * c
  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#eef1f7" strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={sc.ring} strokeWidth={stroke}
          strokeDasharray={`${dash} ${c}`} strokeLinecap="round" />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: size * 0.32, fontWeight: 900, color: sc.fg, letterSpacing: "-0.03em", lineHeight: 1 }}>{score}</span>
      </div>
    </div>
  )
}

export function JobEngineClient() {
  const [email, setEmail] = useState("")
  const [emailLocked, setEmailLocked] = useState(false)
  const [busy, setBusy] = useState<null | "parsing" | "matching" | "loading">(null)
  const [error, setError] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)

  const [tab, setTab] = useState<"matches" | "tracker">("matches")
  const [matches, setMatches] = useState<Match[]>([])
  const [profile, setProfile] = useState<Profile | null>(null)
  const [applications, setApplications] = useState<Application[]>([])
  const [stats, setStats] = useState<Stats | null>(null)

  const [prefs, setPrefs] = useState<Prefs>({ role: "", location: "", workType: "Any" })
  const [tailor, setTailor] = useState<TailorData | null>(null)
  const [tailorBusy, setTailorBusy] = useState(false)
  const [approving, setApproving] = useState(false)
  const [docTab, setDocTab] = useState<"changes" | "resume" | "cover">("resume")
  const [receipt, setReceipt] = useState<Application | null>(null)

  const fileRef = useRef<HTMLInputElement>(null)
  const emailValid = emailRe.test(email.trim())
  const inApp = emailLocked && (matches.length > 0 || applications.length > 0)
  const appliedIds = new Set(applications.map((a) => a.jobId))

  useEffect(() => {
    fetch("/api/jobengine/stats").then((r) => r.json()).then((d) => { if (d.ok) setStats(d) }).catch(() => {})
  }, [])

  const loadExisting = useCallback(async (mail: string) => {
    setBusy("loading"); setError(null)
    try {
      const [mRes, aRes] = await Promise.all([
        fetch(`/api/jobengine/matches?email=${encodeURIComponent(mail)}`),
        fetch(`/api/jobengine/applications?email=${encodeURIComponent(mail)}`),
      ])
      const m = await mRes.json(); const a = await aRes.json()
      if (m.ok) { setMatches(m.matches || []); setProfile(m.profile || null) }
      if (a.ok) setApplications(a.applications || [])
      if ((m.matches || []).length === 0 && (a.applications || []).length === 0) {
        setError("No saved JobEngine data for that email yet. Upload a resume to start.")
      } else {
        setEmailLocked(true)
      }
    } catch { setError("Couldn't load your data. Please try again.") }
    finally { setBusy(null) }
  }, [])

  const refreshApplications = useCallback(async (mail: string) => {
    const r = await fetch(`/api/jobengine/applications?email=${encodeURIComponent(mail)}`)
    const d = await r.json()
    if (d.ok) setApplications(d.applications || [])
  }, [])

  async function handleFile(file: File) {
    setError(null)
    if (!emailValid) { setError("Please enter a valid email first."); return }
    setFileName(file.name); setBusy("parsing")
    try {
      const text = await parseResume(file)
      if (!text || text.trim().length < 80) {
        setError("Couldn't read enough text. Try a text-based PDF (not a scan)."); setBusy(null); return
      }
      setBusy("matching")
      const res = await fetch("/api/jobengine/match", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(), resumeText: text, filename: file.name,
          preferences: {
            role: prefs.role.trim(),
            location: prefs.location.trim(),
            workType: prefs.workType === "Any" ? "" : prefs.workType,
          },
        }),
      })
      const data = await res.json()
      if (!res.ok || !data.ok) { setError(data.error || "Matching failed."); setBusy(null); return }
      setMatches(data.matches || []); setProfile(data.profile || null)
      setEmailLocked(true); setTab("matches")
      await refreshApplications(email.trim())
    } catch (err) { console.error(err); setError("Something went wrong reading your resume.") }
    finally { setBusy(null) }
  }

  async function openTailor(m: Match) {
    setTailor(null); setDocTab("resume"); setTailorBusy(true); setError(null)
    try {
      const res = await fetch("/api/jobengine/tailor", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), jobId: m.id }),
      })
      const data = await res.json()
      if (!res.ok || !data.ok) { setError(data.error || "Tailoring failed."); setTailorBusy(false); return }
      setTailor(data)
    } catch { setError("Something went wrong while tailoring.") }
    finally { setTailorBusy(false) }
  }

  async function approveAndApply() {
    if (!tailor) return
    const t = tailor
    setApproving(true)
    // Do the window actions synchronously inside the click gesture (avoids the
    // browser blocking window.open after an await).
    if (t.structured) printDoc(resumeHtml(t.structured)) // → user saves the tailored resume PDF
    if (t.job.applyUrl) window.open(t.job.applyUrl, "_blank", "noopener,noreferrer") // → real company form
    try {
      await fetch("/api/jobengine/apply", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(), jobId: t.job.id, status: "opened",
          tailoredResume: t.tailored, coverLetter: t.coverLetter,
          tailorSummary: t.summary,
          matchScore: t.match?.score, matchReason: t.match?.reason,
        }),
      })
      await refreshApplications(email.trim())
      setTailor(null); setTab("tracker")
    } finally { setApproving(false) }
  }

  async function advance(app: Application, status: Application["status"]) {
    setApplications((prev) => prev.map((a) => (a.jobId === app.jobId ? { ...a, status } : a)))
    await fetch("/api/jobengine/apply", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.trim(), jobId: app.jobId, status }),
    })
    await refreshApplications(email.trim())
  }

  const funnel = {
    matched: matches.length,
    applying: applications.length,
    submitted: applications.filter((a) => a.status === "submitted" || a.status === "replied").length,
    replied: applications.filter((a) => a.status === "replied").length,
  }

  useEffect(() => {
    if (!tailor && !tailorBusy) return
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape" && !approving) { setTailor(null); setTailorBusy(false) } }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [tailor, tailorBusy, approving])

  const nf = (n: number) => n.toLocaleString("en-IN")

  return (
    <div className="je-root">
      <style>{styles}</style>

      <div className="je-wrap">
        {/* ═══════════ Landing ═══════════ */}
        {!inApp && (
          <>
            <div className="je-hero">
              <span className="je-eyebrow">JobEngine · by Jobingen</span>
              <h1 className="je-h1">Be first to apply to every job that fits you.</h1>
              <p className="je-sub">
                JobEngine watches company career pages directly, scores every opening against your
                resume with AI, tailors your resume per role, and tracks each application — you stay
                in control at the moment of submission.
              </p>

              {stats && stats.jobs > 0 && (
                <div className="je-livebar">
                  <span className="je-live-dot" />
                  <span><b>{nf(stats.jobs)}</b> live roles</span>
                  <span className="je-live-sep">·</span>
                  <span><b>{stats.companies}</b> company career pages</span>
                  {stats.lastCrawl && (<><span className="je-live-sep">·</span><span>refreshed {ago(stats.lastCrawl)}</span></>)}
                </div>
              )}

              {stats?.companyNames && stats.companyNames.length > 0 && (
                <ScanTicker names={stats.companyNames} />
              )}
            </div>

            {/* Pipeline — the 4 stages */}
            <div className="je-pipeline">
              {[
                ["01", "Discover", "Live jobs pulled straight from Greenhouse & Lever career pages — no aggregators, no lag."],
                ["02", "Match", "A cheap filter narrows thousands of jobs, then AI scores your top 20 with a reason."],
                ["03", "Tailor & apply", "Your resume rewritten per job — you approve every change before anything opens."],
                ["04", "Track", "Every application logged: applying → submitted → replied. Nothing assumed."],
              ].map(([n, t, d]) => (
                <div className="je-stage" key={n}>
                  <div className="je-stage-n">{n} <span className="je-stage-dot">·</span> <span className="je-stage-t">{t}</span></div>
                  <div className="je-stage-d">{d}</div>
                </div>
              ))}
            </div>

            {/* Upload card */}
            <div className="je-card je-upload">
              <div className="je-upload-head">
                <h2 className="je-card-title">Start with your resume</h2>
                <p className="je-card-sub">We score it against every live role and show your best matches in seconds.</p>
              </div>

              <label className="je-label" htmlFor="je-email">Your email</label>
              <div className="je-email-row">
                <input id="je-email" className="je-input" type="email" placeholder="you@example.com"
                  value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
                <button className="je-btn-ghost" disabled={!emailValid || busy !== null}
                  onClick={() => loadExisting(email.trim())} title="Load your saved matches & applications">
                  I've used this before
                </button>
              </div>

              <div className="je-prefs">
                <div className="je-prefs-label">What are you looking for? <span>optional — sharpens your matches</span></div>
                <div className="je-prefs-row">
                  <input className="je-input je-input-sm" placeholder="Role — e.g. Backend Engineer"
                    value={prefs.role} onChange={(e) => setPrefs((p) => ({ ...p, role: e.target.value }))} />
                  <input className="je-input je-input-sm" placeholder="Location — e.g. Bengaluru"
                    value={prefs.location} onChange={(e) => setPrefs((p) => ({ ...p, location: e.target.value }))} />
                  <select className="je-input je-input-sm je-select" value={prefs.workType}
                    onChange={(e) => setPrefs((p) => ({ ...p, workType: e.target.value }))}>
                    {WORK_TYPES.map((w) => <option key={w} value={w}>{w}</option>)}
                  </select>
                </div>
              </div>

              <div className="je-drop" data-disabled={!emailValid || busy !== null}
                onClick={() => emailValid && busy === null && fileRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files?.[0]; if (f) handleFile(f) }}>
                <div className="je-drop-icon">↑</div>
                <div className="je-drop-title">Drop your resume or click to upload</div>
                <div className="je-drop-hint">PDF or TXT · text-based, not a scan</div>
              </div>
              <input ref={fileRef} type="file" accept=".pdf,.txt,application/pdf,text/plain"
                style={{ display: "none" }} onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f) }} />

              {busy && (
                <div className="je-status">
                  <div className="je-spin" />
                  <div className="je-status-text">
                    {busy === "parsing" ? `Reading ${fileName || "your resume"}…`
                      : busy === "matching" ? "Scoring your top matches with AI…" : "Loading your JobEngine…"}
                  </div>
                </div>
              )}
              {error && <div className="je-err">{error}</div>}

              <div className="je-trust">
                <span>🔒 Your resume stays private.</span>
                <span>You submit on the company site — JobEngine never submits for you.</span>
              </div>
            </div>
          </>
        )}

        {/* ═══════════ App ═══════════ */}
        {inApp && (
          <>
            <div className="je-app-head">
              <div>
                <span className="je-eyebrow">JobEngine</span>
                <h1 className="je-h1 je-h1-sm">Your matches</h1>
                <div className="je-app-mail">{email}</div>
              </div>
              {profile && (
                <div className="je-profile">
                  {profile.role && <span className="je-chip je-chip-strong">{profile.role}</span>}
                  {profile.seniority && <span className="je-chip">{profile.seniority}</span>}
                  {profile.skills?.slice(0, 4).map((s) => <span key={s} className="je-chip">{s}</span>)}
                </div>
              )}
            </div>

            <div className="je-funnel">
              {[["Matches", funnel.matched], ["Applying", funnel.applying], ["Submitted", funnel.submitted], ["Replied", funnel.replied]].map(([label, n], i) => (
                <div className="je-funnel-item" key={label as string}>
                  {i > 0 && <span className="je-funnel-arrow">→</span>}
                  <div className="je-funnel-cell"><b>{n as number}</b><span>{label as string}</span></div>
                </div>
              ))}
            </div>

            <div className="je-tabs">
              <button className={`je-tab ${tab === "matches" ? "on" : ""}`} onClick={() => setTab("matches")}>
                Matches <span className="je-tab-count">{matches.length}</span>
              </button>
              <button className={`je-tab ${tab === "tracker" ? "on" : ""}`} onClick={() => setTab("tracker")}>
                Tracker <span className="je-tab-count">{applications.length}</span>
              </button>
              <button className="je-tab-new" onClick={() => { setEmailLocked(false); setError(null) }}>+ New resume</button>
            </div>

            {error && <div className="je-err">{error}</div>}

            {tab === "matches" && (
              <div className="je-list">
                {matches.length === 0 && <div className="je-empty">No matches yet. Upload a resume to get scored.</div>}
                {matches.map((m) => {
                  const applied = appliedIds.has(m.id)
                  return (
                    <div key={m.id} className="je-job">
                      <ScoreRing score={m.score} />
                      <div className="je-job-main">
                        <div className="je-job-title">{m.title}</div>
                        <div className="je-job-co"><span className="je-co-mono">{monogram(m.company)}</span>{m.company}{m.location ? ` · ${m.location}` : ""}</div>
                        {m.reason && <div className="je-reason">{m.reason}</div>}
                      </div>
                      <div className="je-job-right">
                        {applied ? <span className="je-applied">In tracker ✓</span>
                          : <button className="je-apply" onClick={() => openTailor(m)}>Tailor &amp; apply →</button>}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {tab === "tracker" && (
              <div className="je-list">
                {applications.length === 0 && <div className="je-empty">No applications yet. Tailor &amp; apply to a match to start tracking.</div>}
                {applications.map((a) => {
                  const sm = STATUS_META[a.status]
                  const stepIdx = STATUS_ORDER.indexOf(a.status)
                  return (
                    <div key={a.jobId} className="je-job">
                      <div className="je-logo">{monogram(a.company)}</div>
                      <div className="je-job-main">
                        <div className="je-job-title">{a.title}</div>
                        <div className="je-job-co">{a.company}{a.location ? ` · ${a.location}` : ""} · {ago(a.updatedAt)}</div>
                        {a.tailorSummary && <div className="je-reason">{a.tailorSummary}</div>}
                        <div className="je-stepper">
                          {STATUS_ORDER.map((s, i) => (
                            <div key={s} className="je-step-wrap">
                              <span className={`je-step-dot ${i <= stepIdx ? "done" : ""}`} />
                              <span className={`je-step-label ${i <= stepIdx ? "done" : ""}`}>{STATUS_META[s].label}</span>
                              {i < STATUS_ORDER.length - 1 && <span className={`je-step-line ${i < stepIdx ? "done" : ""}`} />}
                            </div>
                          ))}
                        </div>
                        <div className="je-track-actions">
                          {a.status === "opened" && <button className="je-mini" onClick={() => advance(a, "submitted")}>Mark submitted</button>}
                          {a.status === "submitted" && <button className="je-mini" onClick={() => advance(a, "replied")}>Mark replied</button>}
                          <button className="je-mini je-mini-ghost" onClick={() => setReceipt(a)}>View receipt</button>
                          {a.applyUrl && <a className="je-mini je-mini-ghost" href={a.applyUrl} target="_blank" rel="noopener noreferrer">Open apply page</a>}
                        </div>
                      </div>
                      <div className="je-job-right">
                        {typeof a.matchScore === "number" && <ScoreRing score={a.matchScore} size={44} />}
                        <span className="je-status-pill" style={{ color: sm.fg, background: sm.bg }}>{sm.label}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </>
        )}
      </div>

      {/* ═══════════ Tailor / diff / approval modal ═══════════ */}
      {(tailorBusy || tailor) && (
        <div className="je-modal-bg" onClick={() => { if (!approving) { setTailor(null); setTailorBusy(false) } }}>
          <div className="je-modal" onClick={(e) => e.stopPropagation()}>
            {tailorBusy && !tailor && (
              <div className="je-modal-loading">
                <div className="je-spin" />
                <div className="je-status-text">Tailoring your resume for this role…</div>
                <div className="je-status-sub">Reading the job description and matching it to your experience</div>
              </div>
            )}
            {tailor && (
              <>
                <div className="je-modal-head">
                  <div>
                    <div className="je-modal-eyebrow">Review before you apply</div>
                    <div className="je-modal-title">{tailor.job.title}</div>
                    <div className="je-job-co">{tailor.job.company}{tailor.job.location ? ` · ${tailor.job.location}` : ""}</div>
                  </div>
                  <button className="je-x" onClick={() => setTailor(null)} disabled={approving}>✕</button>
                </div>

                {tailor.match && (
                  <div className="je-why">
                    <ScoreRing score={tailor.match.score} size={46} />
                    <div>
                      <span className="je-why-label">Why you match</span>
                      <div className="je-why-text">{tailor.match.reason}</div>
                    </div>
                  </div>
                )}

                <div className="je-changes-head">
                  <span className="je-changes-count">{tailor.changes.length} change{tailor.changes.length === 1 ? "" : "s"} · cover letter ready</span>
                  <span className="je-nothing">· nothing sent yet</span>
                </div>
                <div className="je-summary">{tailor.summary}</div>

                <div className="je-doctabs">
                  <button className={`je-doctab ${docTab === "changes" ? "on" : ""}`} onClick={() => setDocTab("changes")}>Changes</button>
                  <button className={`je-doctab ${docTab === "resume" ? "on" : ""}`} onClick={() => setDocTab("resume")}>Tailored resume</button>
                  <button className={`je-doctab ${docTab === "cover" ? "on" : ""}`} onClick={() => setDocTab("cover")}>Cover letter</button>
                </div>

                {docTab === "changes" && (
                  <div className="je-changes">
                    {tailor.changes.length === 0 && <div className="je-empty">Your resume already fits well — no changes suggested.</div>}
                    {tailor.changes.map((c, i) => (
                      <div className="je-change" key={i}>
                        {c.before && <div className="je-before"><span className="je-tag je-tag-r">−</span>{c.before}</div>}
                        {c.after && <div className="je-after"><span className="je-tag je-tag-g">+</span>{c.after}</div>}
                        {c.why && <div className="je-change-why">{c.why}</div>}
                      </div>
                    ))}
                  </div>
                )}
                {docTab === "resume" && (
                  <div>
                    <div className="je-doc-actions">
                      <button className="je-mini" onClick={() => tailor.structured && printDoc(resumeHtml(tailor.structured))}>⤓ Download PDF</button>
                      <button className="je-mini je-mini-ghost" onClick={() => navigator.clipboard?.writeText(tailor.tailored)}>Copy text</button>
                    </div>
                    {tailor.structured
                      ? <ResumeDoc r={tailor.structured} />
                      : <div className="je-full"><pre>{tailor.tailored}</pre></div>}
                  </div>
                )}
                {docTab === "cover" && (
                  <div>
                    {tailor.coverLetter ? (
                      <>
                        <div className="je-doc-actions">
                          <button className="je-mini" onClick={() => printDoc(coverHtml(tailor.structured?.name || "", tailor.job.company, tailor.job.title, tailor.coverLetter))}>⤓ Download PDF</button>
                          <button className="je-mini je-mini-ghost" onClick={() => navigator.clipboard?.writeText(tailor.coverLetter)}>Copy text</button>
                        </div>
                        <div className="je-cover"><p>{tailor.coverLetter}</p></div>
                      </>
                    ) : <div className="je-empty">No cover letter generated for this role.</div>}
                  </div>
                )}

                <div className="je-modal-foot">
                  <div className="je-safe">Download your tailored resume &amp; cover letter above, then attach them on the company site. JobEngine never submits for you.</div>
                  <div className="je-modal-btns">
                    <button className="je-btn-ghost" onClick={() => setTailor(null)} disabled={approving}>Cancel</button>
                    <button className="je-btn-primary" onClick={approveAndApply} disabled={approving}>
                      {approving ? "Opening…" : "Download resume & open application →"}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ═══════════ Application receipt ═══════════ */}
      {receipt && (
        <div className="je-modal-bg" onClick={() => setReceipt(null)}>
          <div className="je-modal" onClick={(e) => e.stopPropagation()}>
            <div className="je-modal-head">
              <div>
                <div className="je-modal-eyebrow">Application receipt</div>
                <div className="je-modal-title">{receipt.title}</div>
                <div className="je-job-co">{receipt.company}{receipt.location ? ` · ${receipt.location}` : ""}</div>
              </div>
              <button className="je-x" onClick={() => setReceipt(null)}>✕</button>
            </div>

            <div className="je-receipt-meta">
              {typeof receipt.matchScore === "number" && (() => { const sc = scoreColor(receipt.matchScore); return <span className="je-status-pill" style={{ color: sc.fg, background: sc.bg }}>{receipt.matchScore} match</span> })()}
              <span className="je-status-pill" style={{ color: STATUS_META[receipt.status].fg, background: STATUS_META[receipt.status].bg }}>{STATUS_META[receipt.status].label}</span>
              <span className="je-receipt-time">Updated {ago(receipt.updatedAt)}</span>
            </div>

            {receipt.matchReason && (
              <div className="je-why" style={{ marginTop: 16 }}>
                <div>
                  <span className="je-why-label">Why you matched</span>
                  <div className="je-why-text">{receipt.matchReason}</div>
                </div>
              </div>
            )}

            <div className="je-receipt-timeline">
              {STATUS_ORDER.map((s) => {
                const t = s === "opened" ? receipt.openedAt : s === "submitted" ? receipt.submittedAt : receipt.repliedAt
                return (
                  <div key={s} className={`je-tl-row ${t ? "done" : ""}`}>
                    <span className="je-tl-dot" />
                    <span className="je-tl-label">{STATUS_META[s].label}</span>
                    <span className="je-tl-time">{t ? ago(t) : "—"}</span>
                  </div>
                )
              })}
            </div>

            {receipt.tailoredResume && (
              <div className="je-receipt-doc">
                <div className="je-receipt-doc-head">Tailored resume
                  <span className="je-doc-actions">
                    <button className="je-mini" onClick={() => printDoc(plainDocHtml(`${receipt.title} — ${receipt.company}`, receipt.tailoredResume || ""))}>⤓ PDF</button>
                    <button className="je-mini je-mini-ghost" onClick={() => navigator.clipboard?.writeText(receipt.tailoredResume || "")}>Copy</button>
                  </span>
                </div>
                <div className="je-full"><pre>{receipt.tailoredResume}</pre></div>
              </div>
            )}
            {receipt.coverLetter && (
              <div className="je-receipt-doc">
                <div className="je-receipt-doc-head">Cover letter
                  <span className="je-doc-actions">
                    <button className="je-mini" onClick={() => printDoc(coverHtml("", receipt.company, receipt.title, receipt.coverLetter || ""))}>⤓ PDF</button>
                    <button className="je-mini je-mini-ghost" onClick={() => navigator.clipboard?.writeText(receipt.coverLetter || "")}>Copy</button>
                  </span>
                </div>
                <div className="je-cover"><p>{receipt.coverLetter}</p></div>
              </div>
            )}

            <div className="je-modal-foot">
              <div className="je-safe">This is exactly what's ready to submit — nothing was sent automatically.</div>
              <div className="je-modal-btns">
                {receipt.applyUrl && <a className="je-btn-primary" href={receipt.applyUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>Open apply page →</a>}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const esc = (s: string) =>
  String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")

/* Build a print-ready resume in the classic IIT placement format (single page,
   centered name, education table, ruled section headers, serif LaTeX look). */
function resumeHtml(r: StructuredResume): string {
  const c = r.contact || { email: "", phone: "", location: "", links: [] }
  const contact = [c.email, c.phone, c.location, ...(c.links || [])].filter(Boolean).map(esc).join("&nbsp;&nbsp;|&nbsp;&nbsp;")
  const sec = (title: string, body: string) => (body ? `<h2>${esc(title)}</h2>${body}` : "")
  const eduRows = (r.education || []).map((e) => `<tr><td>${esc(e.degree)}</td><td>${esc(e.institution)}</td><td class="ct">${esc(e.cgpa)}</td><td class="ct">${esc(e.year)}</td></tr>`).join("")
  const eduTable = eduRows
    ? `<table class="edu"><thead><tr><th>Degree / Exam</th><th>Institute / Board</th><th>CGPA / %</th><th>Year</th></tr></thead><tbody>${eduRows}</tbody></table>`
    : ""
  const exp = (r.experience || []).map((e) => `
    <div class="item">
      <div class="ih"><span class="role">${esc(e.role)}${e.company ? `, <span class="org">${esc(e.company)}</span>` : ""}</span>${e.period ? `<span class="period">${esc(e.period)}</span>` : ""}</div>
      ${e.bullets?.length ? `<ul>${e.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>` : ""}
    </div>`).join("")
  const proj = (r.projects || []).map((p) => `<div class="item"><span class="role">${esc(p.name)}</span>${p.detail ? ` — ${esc(p.detail)}` : ""}</div>`).join("")
  const bullets = (arr: string[]) => (arr?.length ? `<ul>${arr.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>` : "")
  return `<!doctype html><html><head><meta charset="utf-8"><title>${esc(r.name || "Resume")}</title>
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { font-family:'Georgia','Times New Roman',serif; color:#111; line-height:1.4; padding:40px 52px; max-width:820px; margin:0 auto; font-size:12.5px; }
    header { text-align:center; border-bottom:1.5px solid #111; padding-bottom:10px; margin-bottom:6px; }
    h1 { font-size:23px; font-weight:700; letter-spacing:.06em; text-transform:uppercase; }
    .headline { font-size:12.5px; font-style:italic; color:#333; margin-top:3px; }
    .contact { font-size:11px; color:#222; margin-top:7px; }
    h2 { font-size:12px; font-weight:700; letter-spacing:.05em; text-transform:uppercase; margin:15px 0 7px; padding-bottom:2px; border-bottom:1px solid #111; }
    .summary { font-size:12px; text-align:justify; }
    table.edu { width:100%; border-collapse:collapse; font-size:11.5px; }
    table.edu th, table.edu td { border:1px solid #333; padding:4px 8px; text-align:left; }
    table.edu th { background:#f0f0f0; font-weight:700; }
    table.edu td.ct { text-align:center; white-space:nowrap; }
    .item { margin-bottom:8px; }
    .ih { display:flex; justify-content:space-between; align-items:baseline; gap:12px; }
    .role { font-weight:700; }
    .org { font-weight:400; font-style:italic; }
    .period { font-size:11px; font-style:italic; color:#333; white-space:nowrap; }
    .skills-line { font-size:12px; }
    ul { margin:4px 0 0 20px; }
    li { font-size:11.5px; margin-bottom:2px; text-align:justify; }
    @media print { body { padding:22mm 18mm; } @page { margin:0; size:A4; } }
  </style></head><body>
    <header><h1>${esc(r.name || "")}</h1>${r.headline ? `<div class="headline">${esc(r.headline)}</div>` : ""}${contact ? `<div class="contact">${contact}</div>` : ""}</header>
    ${sec("Education", eduTable)}
    ${sec("Summary", r.summary ? `<p class="summary">${esc(r.summary)}</p>` : "")}
    ${sec("Experience", exp)}
    ${sec("Projects", proj)}
    ${sec("Technical Skills", r.skills?.length ? `<div class="skills-line">${r.skills.map(esc).join(" &nbsp;•&nbsp; ")}</div>` : "")}
    ${sec("Positions of Responsibility", bullets(r.positions))}
    ${sec("Achievements", bullets(r.achievements))}
  </body></html>`
}

function coverHtml(name: string, company: string, title: string, body: string): string {
  return `<!doctype html><html><head><meta charset="utf-8"><title>Cover Letter — ${esc(company)}</title>
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { font-family:'Inter',-apple-system,Segoe UI,Roboto,sans-serif; color:#1a2233; line-height:1.7; padding:56px 60px; max-width:760px; margin:0 auto; font-size:13.5px; }
    .head { border-bottom:3px solid #1d3a8f; padding-bottom:14px; margin-bottom:26px; }
    .name { font-size:20px; font-weight:800; color:#0c1a35; }
    .to { font-size:12px; color:#566175; margin-top:4px; }
    p { margin-bottom:14px; white-space:pre-wrap; color:#33415a; }
    @media print { body { padding:34px 40px; } @page { margin:16mm; } }
  </style></head><body>
    <div class="head"><div class="name">${esc(name || "")}</div><div class="to">Application for ${esc(title)} — ${esc(company)}</div></div>
    <p>${esc(body)}</p>
  </body></html>`
}

/* Simple print doc for plain-text content (receipt re-download). */
function plainDocHtml(title: string, text: string): string {
  return `<!doctype html><html><head><meta charset="utf-8"><title>${esc(title)}</title>
  <style>
    body { font-family:'Inter',-apple-system,Segoe UI,sans-serif; color:#1a2233; padding:44px 52px; max-width:800px; margin:0 auto; }
    pre { white-space:pre-wrap; word-break:break-word; font-family:inherit; font-size:13px; line-height:1.6; }
    @media print { body { padding:28px 36px; } @page { margin:14mm; } }
  </style></head><body><pre>${esc(text)}</pre></body></html>`
}

/* Open a print window (user saves as PDF) — zero-dependency, cross-browser. */
function printDoc(html: string) {
  const w = window.open("", "_blank", "width=860,height=1000")
  if (!w) return
  w.document.open(); w.document.write(html); w.document.close(); w.focus()
  setTimeout(() => { try { w.print() } catch {} }, 500)
}

/* IIT-placement-format resume preview inside the modal — mirrors the PDF. */
function ResumeDoc({ r }: { r: StructuredResume }) {
  const c = r.contact || { email: "", phone: "", location: "", links: [] }
  const contact = [c.email, c.phone, c.location, ...(c.links || [])].filter(Boolean).join("  |  ")
  return (
    <div className="je-rdoc">
      <div className="je-rdoc-head">
        <div className="je-rdoc-name">{r.name}</div>
        {r.headline && <div className="je-rdoc-headline">{r.headline}</div>}
        {contact && <div className="je-rdoc-contact">{contact}</div>}
      </div>
      {r.education?.length > 0 && (
        <div className="je-rdoc-sec"><h4>Education</h4>
          <table className="je-rdoc-edu">
            <thead><tr><th>Degree / Exam</th><th>Institute / Board</th><th>CGPA / %</th><th>Year</th></tr></thead>
            <tbody>{r.education.map((e, i) => (
              <tr key={i}><td>{e.degree}</td><td>{e.institution}</td><td className="ct">{e.cgpa}</td><td className="ct">{e.year}</td></tr>
            ))}</tbody>
          </table>
        </div>
      )}
      {r.summary && <div className="je-rdoc-sec"><h4>Summary</h4><p>{r.summary}</p></div>}
      {r.experience?.length > 0 && (
        <div className="je-rdoc-sec"><h4>Experience</h4>
          {r.experience.map((e, i) => (
            <div className="je-rdoc-item" key={i}>
              <div className="je-rdoc-itemhead"><span className="je-rdoc-role">{e.role}{e.company && <span className="je-rdoc-org">, {e.company}</span>}</span>{e.period && <span className="je-rdoc-period">{e.period}</span>}</div>
              {e.bullets?.length > 0 && <ul>{e.bullets.map((b, j) => <li key={j}>{b}</li>)}</ul>}
            </div>
          ))}
        </div>
      )}
      {r.projects?.length > 0 && (
        <div className="je-rdoc-sec"><h4>Projects</h4>
          {r.projects.map((p, i) => <div className="je-rdoc-item" key={i}><span className="je-rdoc-role">{p.name}</span>{p.detail && <span className="je-rdoc-detail"> — {p.detail}</span>}</div>)}
        </div>
      )}
      {r.skills?.length > 0 && <div className="je-rdoc-sec"><h4>Technical Skills</h4><div className="je-rdoc-skillsline">{r.skills.join("  •  ")}</div></div>}
      {r.positions?.length > 0 && <div className="je-rdoc-sec"><h4>Positions of Responsibility</h4><ul className="je-rdoc-ul">{r.positions.map((p, i) => <li key={i}>{p}</li>)}</ul></div>}
      {r.achievements?.length > 0 && <div className="je-rdoc-sec"><h4>Achievements</h4><ul className="je-rdoc-ul">{r.achievements.map((a, i) => <li key={i}>{a}</li>)}</ul></div>}
    </div>
  )
}

/* Live scanning ticker — cycles company names to convey "watching career pages". */
function ScanTicker({ names }: { names: string[] }) {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % names.length), 1600)
    return () => clearInterval(t)
  }, [names.length])
  return (
    <div className="je-scan">
      <span className="je-scan-eye">◉</span>
      <span className="je-scan-text">scanning <b>{names[i]}</b> careers…</span>
      <span className="je-scan-count">{names.length} pages watched</span>
    </div>
  )
}

const styles = `
  .je-root { background:#fff; min-height:100vh; font-family:var(--font-inter),Inter,system-ui,sans-serif; color:${INK}; }
  .je-wrap { max-width:1000px; margin:0 auto; padding:104px 24px 96px; }
  @media (min-width:768px){ .je-wrap { padding:150px 24px 112px; } }

  .je-hero { max-width:720px; }
  .je-eyebrow { display:inline-block; font-size:11px; font-weight:800; letter-spacing:.14em; text-transform:uppercase; color:${NAVY}; background:#eef2ff; border:1.5px solid #dde5ff; border-radius:999px; padding:6px 16px; }
  .je-h1 { font-size:clamp(32px,6.5vw,52px); font-weight:900; letter-spacing:-.045em; line-height:1.02; color:${INK}; margin:22px 0 0; }
  .je-h1-sm { font-size:clamp(26px,5vw,36px); }
  .je-sub { font-size:16.5px; line-height:1.6; font-weight:500; color:#566175; margin:18px 0 0; max-width:640px; }

  .je-livebar { display:flex; align-items:center; gap:10px; flex-wrap:wrap; margin-top:24px; font-size:13.5px; font-weight:500; color:#566175; }
  .je-livebar b { color:${INK}; font-weight:800; }
  .je-live-sep { color:#c3cbe0; }
  .je-live-dot { width:8px; height:8px; border-radius:50%; background:#10b981; box-shadow:0 0 0 4px rgba(16,185,129,.15); animation:je-pulse 2s infinite; }
  @keyframes je-pulse { 0%,100%{opacity:1} 50%{opacity:.4} }

  .je-pipeline { display:grid; grid-template-columns:1fr; gap:12px; margin-top:44px; }
  @media (min-width:640px){ .je-pipeline { grid-template-columns:repeat(2,1fr); } }
  @media (min-width:900px){ .je-pipeline { grid-template-columns:repeat(4,1fr); } }
  .je-stage { border:1.5px solid #eaecf4; border-radius:16px; padding:20px 18px; background:#fafbff; transition:border-color .15s, box-shadow .15s; }
  .je-stage:hover { border-color:#dde5ff; box-shadow:0 4px 16px rgba(29,58,143,.06); }
  .je-stage-n { font-size:12px; font-weight:900; color:${NAVY}; letter-spacing:.06em; display:flex; align-items:center; gap:6px; flex-wrap:wrap; }
  .je-stage-dot { color:#c3cbe0; }
  .je-stage-t { font-size:15px; font-weight:800; color:${INK}; letter-spacing:-.01em; }
  .je-stage-d { font-size:13px; font-weight:500; color:#64748b; margin-top:10px; line-height:1.5; }

  .je-card { background:#fff; border:1.5px solid #eaecf4; border-radius:22px; box-shadow:0 2px 14px rgba(0,0,0,.04); padding:30px; margin-top:32px; }
  .je-upload-head { margin-bottom:20px; }
  .je-card-title { font-size:20px; font-weight:800; color:${INK}; letter-spacing:-.02em; }
  .je-card-sub { font-size:14px; font-weight:500; color:#64748b; margin-top:4px; line-height:1.5; }
  .je-label { display:block; font-size:13px; font-weight:700; color:${INK}; margin-bottom:8px; }
  .je-email-row { display:flex; gap:10px; flex-wrap:wrap; }
  .je-input { flex:1; min-width:200px; padding:14px 16px; border:1.5px solid #e2e6f0; border-radius:12px; font-size:15px; font-weight:500; color:${INK}; outline:none; transition:border-color .15s; }
  .je-input:focus { border-color:${NAVY}; box-shadow:0 0 0 3px rgba(29,58,143,.08); }

  .je-drop { margin-top:18px; border:2px dashed #d3daec; border-radius:16px; padding:36px 24px; text-align:center; cursor:pointer; transition:all .15s; background:#fafbff; }
  .je-drop:hover { border-color:${NAVY}; background:#f4f7ff; }
  .je-drop[data-disabled="true"] { opacity:.5; cursor:not-allowed; pointer-events:none; }
  .je-drop-icon { width:46px; height:46px; margin:0 auto 12px; border-radius:14px; background:${NAVY}; display:flex; align-items:center; justify-content:center; color:#fff; font-size:21px; font-weight:700; }
  .je-drop-title { font-size:15px; font-weight:700; color:${INK}; }
  .je-drop-hint { font-size:13px; font-weight:500; color:#8a93a6; margin-top:4px; }

  .je-err { margin-top:16px; background:#fef2f2; border:1.5px solid #fecaca; color:#b91c1c; font-size:13.5px; font-weight:600; padding:12px 16px; border-radius:12px; }
  .je-empty { padding:32px; text-align:center; font-size:14px; font-weight:500; color:#8a93a6; border:1.5px dashed #e2e6f0; border-radius:16px; }

  .je-status { margin-top:20px; display:flex; align-items:center; gap:14px; }
  .je-spin { width:22px; height:22px; border:3px solid #dde5ff; border-top-color:${NAVY}; border-radius:50%; animation:je-rot .7s linear infinite; flex-shrink:0; }
  @keyframes je-rot { to { transform:rotate(360deg); } }
  .je-status-text { font-size:15px; font-weight:600; color:${INK}; }
  .je-status-sub { font-size:13px; font-weight:500; color:#8a93a6; margin-top:4px; text-align:center; }

  .je-trust { margin-top:22px; padding-top:18px; border-top:1px solid #f0f2f8; display:flex; flex-direction:column; gap:6px; font-size:12.5px; font-weight:500; color:#8a93a6; }

  .je-app-head { display:flex; justify-content:space-between; align-items:flex-start; gap:20px; flex-wrap:wrap; }
  .je-app-mail { font-size:13px; font-weight:600; color:#8a93a6; margin-top:6px; }
  .je-profile { display:flex; flex-wrap:wrap; gap:8px; max-width:440px; justify-content:flex-end; }
  .je-chip { font-size:12px; font-weight:600; color:${NAVY}; background:#eef2ff; border:1px solid #dde5ff; border-radius:999px; padding:5px 12px; }
  .je-chip-strong { background:${NAVY}; color:#fff; border-color:${NAVY}; }

  .je-funnel { display:flex; align-items:center; gap:4px; margin-top:26px; padding:18px 22px; border:1.5px solid #eaecf4; border-radius:18px; background:#fafbff; overflow-x:auto; }
  .je-funnel-item { display:flex; align-items:center; gap:4px; }
  .je-funnel-cell { display:flex; flex-direction:column; align-items:center; min-width:74px; padding:0 8px; }
  .je-funnel-cell b { font-size:24px; font-weight:900; color:${INK}; letter-spacing:-.03em; }
  .je-funnel-cell span { font-size:11px; font-weight:700; color:#8a93a6; text-transform:uppercase; letter-spacing:.06em; margin-top:2px; }
  .je-funnel-arrow { color:#c3cbe0; font-weight:700; font-size:15px; }

  .je-tabs { display:flex; gap:6px; margin-top:30px; border-bottom:1.5px solid #eaecf4; align-items:center; }
  .je-tab { background:none; border:none; padding:12px 16px; font-size:14px; font-weight:700; color:#8a93a6; cursor:pointer; border-bottom:2.5px solid transparent; margin-bottom:-1.5px; display:flex; align-items:center; gap:8px; }
  .je-tab.on { color:${NAVY}; border-bottom-color:${NAVY}; }
  .je-tab-count { font-size:11px; font-weight:800; background:#eef2ff; color:${NAVY}; border-radius:999px; padding:2px 8px; }
  .je-tab-new { margin-left:auto; background:none; border:none; font-size:13px; font-weight:700; color:${NAVY}; cursor:pointer; padding:8px 4px; }

  .je-list { margin-top:20px; display:flex; flex-direction:column; gap:12px; }
  .je-job { display:flex; gap:16px; align-items:flex-start; background:#fff; border:1.5px solid #eaecf4; border-radius:18px; padding:20px; transition:box-shadow .15s, border-color .15s, transform .15s; }
  .je-job:hover { box-shadow:0 6px 22px rgba(29,58,143,.08); border-color:#dde5ff; }
  .je-logo { width:46px; height:46px; border-radius:12px; flex-shrink:0; display:flex; align-items:center; justify-content:center; font-size:15px; font-weight:800; color:#fff; background:${NAVY}; }
  .je-job-main { flex:1; min-width:0; }
  .je-job-title { font-size:15.5px; font-weight:800; color:${INK}; line-height:1.3; letter-spacing:-.01em; }
  .je-job-co { font-size:13px; font-weight:600; color:#566175; margin-top:4px; display:flex; align-items:center; gap:7px; flex-wrap:wrap; }
  .je-co-mono { font-size:9px; font-weight:800; background:#eef2ff; color:${NAVY}; padding:2px 5px; border-radius:5px; }
  .je-reason { font-size:13px; font-weight:500; color:#475569; margin-top:9px; background:#f8faff; border-left:3px solid ${NAVY}; padding:8px 12px; border-radius:0 8px 8px 0; }
  .je-job-right { display:flex; flex-direction:column; align-items:flex-end; gap:10px; flex-shrink:0; }
  .je-apply { font-size:12.5px; font-weight:700; color:#fff; background:${NAVY}; padding:10px 15px; border-radius:10px; border:none; cursor:pointer; white-space:nowrap; transition:opacity .15s, transform .1s; }
  .je-apply:hover { opacity:.92; }
  .je-apply:active { transform:scale(.96); }
  .je-applied { font-size:12px; font-weight:700; color:#047857; background:#ecfdf5; padding:8px 12px; border-radius:10px; white-space:nowrap; }

  .je-stepper { display:flex; align-items:center; margin-top:12px; }
  .je-step-wrap { display:flex; align-items:center; }
  .je-step-dot { width:9px; height:9px; border-radius:50%; background:#dde3ee; flex-shrink:0; }
  .je-step-dot.done { background:${NAVY}; }
  .je-step-label { font-size:11px; font-weight:700; color:#a3adc2; margin-left:6px; }
  .je-step-label.done { color:${NAVY}; }
  .je-step-line { width:26px; height:2px; background:#dde3ee; margin:0 8px; }
  .je-step-line.done { background:${NAVY}; }

  .je-track-actions { display:flex; gap:8px; margin-top:12px; flex-wrap:wrap; }
  .je-mini { font-size:12px; font-weight:700; color:#fff; background:${NAVY}; padding:8px 13px; border-radius:9px; border:none; cursor:pointer; text-decoration:none; }
  .je-mini-ghost { color:${NAVY}; background:#fff; border:1.5px solid #dde5ff; }
  .je-status-pill { font-size:12px; font-weight:800; padding:6px 12px; border-radius:999px; white-space:nowrap; }

  .je-btn-ghost { font-size:13px; font-weight:700; color:${NAVY}; background:#fff; border:1.5px solid #dde5ff; padding:12px 16px; border-radius:12px; cursor:pointer; white-space:nowrap; }
  .je-btn-ghost:disabled { opacity:.5; cursor:not-allowed; }
  .je-btn-primary { font-size:14px; font-weight:800; color:#fff; background:${NAVY}; padding:13px 22px; border-radius:12px; border:none; cursor:pointer; transition:opacity .15s; }
  .je-btn-primary:hover { opacity:.92; }
  .je-btn-primary:disabled { opacity:.6; cursor:not-allowed; }

  .je-modal-bg { position:fixed; inset:0; background:rgba(12,26,53,.55); backdrop-filter:blur(4px); display:flex; align-items:center; justify-content:center; padding:20px; z-index:100; animation:je-fade .15s ease-out; }
  @keyframes je-fade { from{opacity:0} to{opacity:1} }
  .je-modal { background:#fff; border-radius:24px; max-width:660px; width:100%; max-height:88vh; overflow-y:auto; padding:28px; box-shadow:0 24px 64px rgba(0,0,0,.3); }
  .je-modal-loading { display:flex; flex-direction:column; align-items:center; gap:14px; padding:52px 0; }
  .je-modal-head { display:flex; justify-content:space-between; align-items:flex-start; gap:16px; }
  .je-modal-eyebrow { font-size:11px; font-weight:800; letter-spacing:.1em; text-transform:uppercase; color:${NAVY}; }
  .je-modal-title { font-size:20px; font-weight:800; color:${INK}; letter-spacing:-.02em; line-height:1.25; margin-top:6px; }
  .je-x { background:#f1f5f9; border:none; width:34px; height:34px; border-radius:10px; font-size:14px; cursor:pointer; color:#64748b; flex-shrink:0; }
  .je-x:disabled { opacity:.5; }

  .je-why { display:flex; align-items:center; gap:14px; margin-top:20px; background:#f0fdf4; border:1.5px solid #bbf7d0; border-radius:14px; padding:14px 16px; }
  .je-why-label { font-size:11px; font-weight:800; letter-spacing:.08em; text-transform:uppercase; color:#047857; }
  .je-why-text { font-size:14px; font-weight:600; color:#166534; margin-top:2px; }

  .je-changes-head { display:flex; align-items:baseline; gap:8px; margin-top:24px; }
  .je-changes-count { font-size:14px; font-weight:800; color:${INK}; }
  .je-nothing { font-size:13px; font-weight:600; color:#b45309; }
  .je-summary { font-size:14px; font-weight:500; color:#64748b; margin-top:6px; line-height:1.5; }

  .je-changes { margin-top:16px; display:flex; flex-direction:column; gap:12px; }
  .je-change { border:1.5px solid #eaecf4; border-radius:14px; padding:14px; }
  .je-before, .je-after { font-size:13.5px; font-weight:500; line-height:1.5; padding:9px 12px; border-radius:9px; display:flex; gap:9px; align-items:flex-start; }
  .je-before { background:#fef2f2; color:#7f1d1d; }
  .je-after { background:#f0fdf4; color:#14532d; margin-top:6px; }
  .je-tag { font-size:13px; font-weight:900; flex-shrink:0; line-height:1.4; }
  .je-tag-r { color:#dc2626; }
  .je-tag-g { color:#16a34a; }
  .je-change-why { font-size:12px; font-weight:600; color:#8a93a6; margin-top:9px; padding-left:2px; }

  .je-toggle { margin-top:18px; font-size:13px; font-weight:700; color:${NAVY}; background:none; border:none; cursor:pointer; padding:0; }
  .je-full { margin-top:12px; background:#f8faff; border:1.5px solid #eaecf4; border-radius:12px; padding:16px; }
  .je-full pre { white-space:pre-wrap; word-break:break-word; font-family:inherit; font-size:12.5px; line-height:1.65; color:#334155; margin:0 0 12px; }

  .je-modal-foot { margin-top:24px; padding-top:18px; border-top:1.5px solid #eaecf4; display:flex; justify-content:space-between; align-items:center; gap:16px; flex-wrap:wrap; }
  .je-safe { font-size:12px; font-weight:500; color:#8a93a6; max-width:250px; line-height:1.45; }
  .je-modal-btns { display:flex; gap:10px; }

  /* Scanning ticker */
  .je-scan { display:inline-flex; align-items:center; gap:10px; margin-top:18px; padding:9px 16px; border:1.5px solid #eaecf4; border-radius:999px; background:#fafbff; font-size:13px; font-weight:500; color:#566175; }
  .je-scan-eye { color:#10b981; font-size:11px; animation:je-pulse 1.4s infinite; }
  .je-scan-text b { color:${INK}; font-weight:800; }
  .je-scan-count { color:#a3adc2; font-weight:600; border-left:1px solid #e2e6f0; padding-left:10px; }

  /* Preferences */
  .je-prefs { margin-top:20px; }
  .je-prefs-label { font-size:13px; font-weight:700; color:${INK}; margin-bottom:10px; }
  .je-prefs-label span { font-size:12px; font-weight:500; color:#a3adc2; }
  .je-prefs-row { display:grid; grid-template-columns:1fr; gap:10px; }
  @media (min-width:640px){ .je-prefs-row { grid-template-columns:1fr 1fr 140px; } }
  .je-input-sm { padding:12px 14px; font-size:14px; min-width:0; }
  .je-select { cursor:pointer; background:#fff; }

  /* Doc tabs in modal */
  .je-doctabs { display:flex; gap:6px; margin-top:18px; background:#f1f5f9; padding:4px; border-radius:12px; }
  .je-doctab { flex:1; background:none; border:none; padding:9px 12px; font-size:13px; font-weight:700; color:#8a93a6; cursor:pointer; border-radius:9px; transition:all .12s; }
  .je-doctab.on { background:#fff; color:${NAVY}; box-shadow:0 1px 4px rgba(0,0,0,.06); }
  .je-changes { margin-top:14px; display:flex; flex-direction:column; gap:12px; }

  /* Receipt */
  .je-receipt-meta { display:flex; align-items:center; gap:10px; margin-top:16px; flex-wrap:wrap; }
  .je-receipt-time { font-size:12.5px; font-weight:500; color:#a3adc2; }
  .je-receipt-timeline { margin-top:18px; border:1.5px solid #eaecf4; border-radius:14px; padding:16px 18px; display:flex; flex-direction:column; gap:12px; }
  .je-tl-row { display:flex; align-items:center; gap:12px; opacity:.45; }
  .je-tl-row.done { opacity:1; }
  .je-tl-dot { width:9px; height:9px; border-radius:50%; background:#dde3ee; }
  .je-tl-row.done .je-tl-dot { background:${NAVY}; }
  .je-tl-label { font-size:13.5px; font-weight:700; color:${INK}; flex:1; }
  .je-tl-time { font-size:12.5px; font-weight:500; color:#8a93a6; }
  .je-receipt-doc { margin-top:18px; }
  .je-receipt-doc-head { display:flex; justify-content:space-between; align-items:center; font-size:13px; font-weight:800; color:${INK}; }

  /* Doc actions + cover letter */
  .je-doc-actions { display:flex; gap:8px; margin:14px 0; }
  .je-cover { margin-top:14px; background:#fff; border:1.5px solid #eaecf4; border-radius:14px; padding:22px 24px; }
  .je-cover p { font-size:13.5px; line-height:1.75; color:#33415a; white-space:pre-wrap; margin:0; }

  /* IIT-format resume preview (mirrors the PDF) */
  .je-rdoc { background:#fff; border:1.5px solid #eaecf4; border-radius:14px; padding:30px 32px; font-family:'Georgia','Times New Roman',serif; color:#111; }
  .je-rdoc-head { text-align:center; border-bottom:1.5px solid #111; padding-bottom:10px; margin-bottom:4px; }
  .je-rdoc-name { font-size:21px; font-weight:700; letter-spacing:.06em; text-transform:uppercase; color:#111; }
  .je-rdoc-headline { font-size:12.5px; font-style:italic; color:#333; margin-top:3px; }
  .je-rdoc-contact { font-size:11px; color:#222; margin-top:7px; }
  .je-rdoc-sec { margin-top:14px; }
  .je-rdoc-sec h4 { font-size:11.5px; font-weight:700; letter-spacing:.05em; text-transform:uppercase; color:#111; border-bottom:1px solid #111; padding-bottom:2px; margin-bottom:7px; }
  .je-rdoc-sec p { font-size:12px; color:#222; line-height:1.5; text-align:justify; }
  .je-rdoc-edu { width:100%; border-collapse:collapse; font-size:11.5px; }
  .je-rdoc-edu th, .je-rdoc-edu td { border:1px solid #444; padding:4px 8px; text-align:left; color:#111; }
  .je-rdoc-edu th { background:#f0f0f0; font-weight:700; }
  .je-rdoc-edu td.ct { text-align:center; white-space:nowrap; }
  .je-rdoc-skillsline { font-size:12px; color:#222; line-height:1.5; }
  .je-rdoc-item { margin-bottom:8px; }
  .je-rdoc-itemhead { display:flex; justify-content:space-between; align-items:baseline; gap:12px; }
  .je-rdoc-role { font-size:12.5px; font-weight:700; color:#111; }
  .je-rdoc-org { font-weight:400; font-style:italic; }
  .je-rdoc-detail { font-size:12px; color:#333; }
  .je-rdoc-period { font-size:11px; font-style:italic; color:#333; white-space:nowrap; }
  .je-rdoc-item ul, .je-rdoc-ul { margin:4px 0 0 20px; }
  .je-rdoc-item li, .je-rdoc-ul li { font-size:11.5px; color:#222; margin-bottom:2px; line-height:1.45; text-align:justify; }
`
