"use client"

import { useState } from "react"
import Link from "next/link"
import { JobingenLogo } from "@/components/jobingen-logo"

type Status = "Final Year Student" | "Recent Graduate" | "Working Professional"
type ReachedInterview = "Yes" | "Yes, multiple rounds" | "Not selected after interview"
type InterviewExp = "Excellent" | "Good" | "Average" | "Challenging"
type JobingenSupport = "Extremely helpful" | "Helpful" | "Somewhat helpful" | "Neutral"

/* ─── SVG Icons ─────────────────────────────────────────── */

const Icons = {
  user: (
    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  building: (
    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  ),
  briefcase: (
    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-4 0v2"/>
    </svg>
  ),
  check: (
    <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L9 17l-5-5"/>
    </svg>
  ),
  star: (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
  thumbUp: (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
    </svg>
  ),
  minus: (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  ),
  zap: (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  rocket: (
    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
    </svg>
  ),
  sparkles: (
    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>
    </svg>
  ),
  send: (
    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 2 11 13"/><path d="M22 2 15 22 11 13 2 9l20-7z"/>
    </svg>
  ),
  linkedin: (
    <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
    </svg>
  ),
  interview: (
    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  ),
  shield: (
    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  quote: (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/>
    </svg>
  ),
  lock: (
    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  ),
  info: (
    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="10"/><path d="M12 16v-4m0-4h.01"/>
    </svg>
  ),
  arrowRight: (
    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
  ),
}

/* ─── Reusable Components ───────────────────────────────── */

function SectionCard({ n, icon, title, subtitle, children }: {
  n: number; icon: React.ReactNode; title: string; subtitle?: string; children: React.ReactNode
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_1px_8px_rgba(0,0,0,0.05)] overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#4f46e5] to-[#7c3aed] flex items-center justify-center text-white flex-shrink-0 shadow-sm">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black text-[#4f46e5] bg-[#eef2ff] px-2 py-0.5 rounded-full uppercase tracking-wider">Step {n}</span>
            <h3 className="text-[14px] font-bold text-slate-900 leading-tight truncate">{title}</h3>
          </div>
          {subtitle && <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">{subtitle}</p>}
        </div>
      </div>
      <div className="p-6">{children}</div>
    </div>
  )
}

function FieldLabel({ children, required, hint }: { children: React.ReactNode; required?: boolean; hint?: string }) {
  return (
    <div className="mb-2">
      <label className="block text-[12px] font-bold text-slate-600 uppercase tracking-wider">
        {children} {required && <span className="text-red-400 normal-case font-normal tracking-normal">*</span>}
      </label>
      {hint && <p className="text-[11px] text-slate-400 mt-0.5">{hint}</p>}
    </div>
  )
}

function InputField({ value, onChange, placeholder, icon }: {
  value: string; onChange: (v: string) => void; placeholder?: string; icon?: React.ReactNode
}) {
  return (
    <div className="relative">
      {icon && (
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
          {icon}
        </div>
      )}
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full py-3 pr-4 rounded-xl border border-slate-200 bg-slate-50/80 text-[14px] text-slate-800 outline-none transition-all focus:bg-white focus:border-[#4f46e5] focus:ring-2 focus:ring-[#4f46e5]/10 placeholder:text-slate-400 ${icon ? "pl-10" : "pl-4"}`}
      />
    </div>
  )
}

function RadioCard({ selected, onClick, label, desc, icon, color = "#4f46e5", bg = "#eef2ff" }: {
  selected: boolean; onClick: () => void; label: string; desc?: string
  icon?: React.ReactNode; color?: string; bg?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex items-center gap-3.5 w-full text-left px-4 py-3.5 rounded-xl border-2 transition-all cursor-pointer font-[inherit]"
      style={{ borderColor: selected ? color : "#e8ecf0", background: selected ? bg : "#fafbff" }}
    >
      {icon && (
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all"
          style={{ background: selected ? `${color}18` : "#f1f5f9", color: selected ? color : "#94a3b8" }}
        >
          {icon}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="text-[13px] font-semibold leading-tight" style={{ color: selected ? color : "#374151" }}>{label}</div>
        {desc && <div className="text-[11px] text-slate-400 mt-0.5">{desc}</div>}
      </div>
      <div
        className="w-4.5 h-4.5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ml-1"
        style={{
          width: 18, height: 18,
          borderColor: selected ? color : "#cbd5e1",
          background: selected ? color : "transparent",
        }}
      >
        {selected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
      </div>
    </button>
  )
}

function RatingCard({ val, label, desc, icon, color, bg, selected, onClick }: {
  val: string; label: string; desc: string; icon: React.ReactNode
  color: string; bg: string; selected: boolean; onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col items-center gap-2.5 px-3 py-4 rounded-xl border-2 transition-all cursor-pointer font-[inherit] text-center group relative overflow-hidden"
      style={{ borderColor: selected ? color : "#e8ecf0", background: selected ? bg : "#fafbff" }}
    >
      {selected && <div className="absolute top-2 right-2"><div className="w-4 h-4 rounded-full flex items-center justify-center" style={{ background: color }}><svg width="8" height="8" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="3" strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg></div></div>}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center transition-all"
        style={{ background: selected ? `${color}18` : "#f1f5f9", color: selected ? color : "#94a3b8" }}
      >
        {icon}
      </div>
      <div>
        <div className="text-[12px] font-bold leading-tight" style={{ color: selected ? color : "#374151" }}>{label}</div>
        <div className="text-[10px] text-slate-400 mt-0.5">{desc}</div>
      </div>
    </button>
  )
}

/* ─── Page ─────────────────────────────────────────────── */

export default function PatentAnalystFeedbackPage() {
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const [fullName, setFullName]         = useState("")
  const [college, setCollege]           = useState("")
  const [status, setStatus]             = useState<Status | "">("")
  const [reached, setReached]           = useState<ReachedInterview | "">("")
  const [expRating, setExpRating]       = useState<InterviewExp | "">("")
  const [insights, setInsights]         = useState("")
  const [support, setSupport]           = useState<JobingenSupport | "">("")
  const [quote, setQuote]               = useState("")
  const [allowPublish, setAllowPublish] = useState(false)

  const filled = [fullName, college, status, reached, expRating].filter(Boolean).length
  const total = 5
  const pct = Math.round((filled / total) * 100)

  const canSubmit = fullName.trim() && college.trim() && status && reached && expRating

  async function handleSubmit() {
    if (!canSubmit) { setError("Please fill all required fields marked with *."); return }
    setLoading(true); setError("")
    try {
      const res = await fetch("/api/patent-analyst-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: fullName, college, current_status: status,
          reached_interview: reached, interview_experience: expRating,
          interview_insights: insights, jobingen_support: support,
          candidate_quote: quote, allow_publish: allowPublish,
        }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || "Submission failed."); return }
      setDone(true)
      window.scrollTo({ top: 0, behavior: "smooth" })
    } catch { setError("Network error. Please try again.") }
    finally { setLoading(false) }
  }

  /* ── Success Screen ── */
  if (done) return (
    <div className="min-h-screen bg-[#fafbff] flex items-center justify-center px-5">
      <div className="max-w-[500px] w-full">
        {/* Check animation */}
        <div className="text-center mb-8">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full bg-[#4f46e5]/15 animate-ping" />
            <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-[#4f46e5] to-[#7c3aed] flex items-center justify-center shadow-[0_8px_32px_rgba(79,70,229,0.35)]">
              <svg width="34" height="34" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
            </div>
          </div>
          <h1 className="text-[26px] font-black text-slate-900 tracking-[-0.03em] mb-2">Feedback Submitted!</h1>
          <p className="text-[14px] text-slate-500 leading-relaxed max-w-[380px] mx-auto">
            Thank you for sharing your experience. Your feedback helps other candidates learn and grow.
          </p>
        </div>

        {/* LinkedIn preview */}
        {allowPublish && quote && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 mb-6">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
              <div className="w-7 h-7 rounded-lg bg-[#0077b5] flex items-center justify-center text-white">
                {Icons.linkedin}
              </div>
              <span className="text-[12px] font-bold text-[#0077b5]">LinkedIn Post Preview</span>
              <span className="ml-auto text-[10px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">Draft</span>
            </div>
            <div className="flex items-start gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4f46e5] to-[#7c3aed] flex items-center justify-center text-white text-[11px] font-black flex-shrink-0">
                {fullName.charAt(0)}
              </div>
              <div>
                <div className="text-[12px] font-bold text-slate-800">{fullName}</div>
                <div className="text-[10px] text-slate-400">{college}</div>
              </div>
            </div>
            <p className="text-[13px] text-slate-700 leading-relaxed italic border-l-2 border-[#4f46e5]/30 pl-3 mb-3">
              &ldquo;{quote}&rdquo;
            </p>
            <div className="flex items-center gap-1.5 flex-wrap">
              {["#JobSearch", "#PatentAnalyst", "#Jobingen", "#CareerGrowth"].map(tag => (
                <span key={tag} className="text-[10px] font-semibold text-[#0077b5]">{tag}</span>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-3">
          <Link href="/" className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-[13px] font-bold text-white bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] shadow-[0_4px_14px_rgba(79,70,229,0.3)] hover:-translate-y-0.5 transition-all">
            Back to Home {Icons.arrowRight}
          </Link>
          <Link href="/mentors" className="px-5 py-3 rounded-xl text-[13px] font-bold text-slate-600 border border-slate-200 bg-white hover:bg-slate-50 transition-colors">
            View Mentors
          </Link>
        </div>
      </div>
    </div>
  )

  /* ── Form ── */
  return (
    <div className="min-h-screen bg-[#fafbff]">

      {/* Sticky header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200/60 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
        <div className="max-w-[700px] mx-auto px-5 h-14 flex items-center justify-between gap-4">
          <Link href="/"><JobingenLogo height={42} /></Link>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-24 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] transition-all duration-500" style={{ width: `${pct}%` }} />
              </div>
              <span className="text-[11px] font-semibold text-slate-400">{pct}%</span>
            </div>
            <span className="text-[10px] font-bold text-[#4f46e5] bg-[#eef2ff] border border-[#c7d2fe] px-2.5 py-1 rounded-full uppercase tracking-wider whitespace-nowrap">
              Patent Analyst · Feedback
            </span>
          </div>
        </div>
      </header>

      <div className="max-w-[700px] mx-auto px-4 sm:px-6 py-10 pb-24">

        {/* Hero */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4f46e5] to-[#7c3aed] flex items-center justify-center text-white shadow-md">
              {Icons.interview}
            </div>
            <div>
              <div className="text-[10px] font-black text-[#4f46e5] uppercase tracking-widest">Candidate Experience</div>
              <div className="text-[11px] text-slate-400">Patent Analyst Role · Jobingen</div>
            </div>
          </div>

          <h1 className="text-[clamp(22px,4vw,32px)] font-black text-slate-900 tracking-[-0.03em] leading-[1.15] mb-3">
            Share Your Patent Analyst<br className="hidden sm:block" /> Interview Experience
          </h1>
          <p className="text-[14px] text-slate-500 leading-relaxed max-w-[560px]">
            Help us improve and inspire others by sharing your experience of the Patent Analyst interview process through Jobingen. Your feedback motivates other candidates preparing for similar opportunities.
          </p>

          {/* Stats row */}
          <div className="flex items-center gap-4 mt-5 pt-5 border-t border-slate-100">
            {[
              { icon: Icons.user, label: "Anonymous-safe", desc: "We protect your identity" },
              { icon: Icons.lock, label: "Secure", desc: "Encrypted & stored safely" },
              { icon: Icons.linkedin, label: "LinkedIn-ready", desc: "Testimonials featured publicly" },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 flex-shrink-0">{s.icon}</div>
                <div className="hidden sm:block">
                  <div className="text-[11px] font-bold text-slate-700">{s.label}</div>
                  <div className="text-[10px] text-slate-400">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">

          {/* ── Section 1: Candidate Info ── */}
          <SectionCard n={1} icon={Icons.user} title="Candidate Information" subtitle="Basic details about you">
            <div className="flex flex-col gap-4">
              <div>
                <FieldLabel required>Full Name</FieldLabel>
                <InputField value={fullName} onChange={setFullName} placeholder="e.g. Priya Sharma" icon={Icons.user} />
              </div>
              <div>
                <FieldLabel required>College / University</FieldLabel>
                <InputField value={college} onChange={setCollege} placeholder="e.g. NIT Allahabad, Delhi University" icon={Icons.building} />
              </div>
              <div>
                <FieldLabel required hint="Select the option that best describes you">Current Role or Status</FieldLabel>
                <div className="flex flex-col gap-2">
                  {(["Final Year Student", "Recent Graduate", "Working Professional"] as Status[]).map((s, i) => (
                    <RadioCard key={s} selected={status === s} onClick={() => setStatus(s)} label={s}
                      icon={[
                        <svg key="g" width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>,
                        <svg key="h" width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="8" r="4"/><path d="M6 20v-2a6 6 0 0 1 12 0v2"/></svg>,
                        Icons.briefcase,
                      ][i]}
                    />
                  ))}
                </div>
              </div>
            </div>
          </SectionCard>

          {/* ── Section 2: Interview Stage ── */}
          <SectionCard n={2} icon={Icons.briefcase} title="Interview Experience" subtitle="Did you reach the interview stage through Jobingen?">
            <div className="flex flex-col gap-2">
              {([
                { val: "Yes", desc: "Successfully reached the interview stage", color: "#16a34a", bg: "#f0fdf4" },
                { val: "Yes, multiple rounds", desc: "Went through more than one interview round", color: "#2563eb", bg: "#eff6ff" },
                { val: "Not selected after interview", desc: "Completed interviews but wasn't selected", color: "#9333ea", bg: "#faf5ff" },
              ] as { val: ReachedInterview; desc: string; color: string; bg: string }[]).map(o => (
                <RadioCard key={o.val} selected={reached === o.val} onClick={() => setReached(o.val)}
                  label={o.val} desc={o.desc} color={o.color} bg={o.bg}
                  icon={
                    <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      {o.val === "Yes" ? <path d="M20 6L9 17l-5-5"/> : o.val === "Yes, multiple rounds" ? <path d="M17 1l4 4-4 4M3 11V9a4 4 0 0 1 4-4h14M7 23l-4-4 4-4M21 13v2a4 4 0 0 1-4 4H3"/> : <path d="M18 6 6 18M6 6l12 12"/>}
                    </svg>
                  }
                />
              ))}
            </div>
          </SectionCard>

          {/* ── Section 3: Rating ── */}
          <SectionCard n={3} icon={Icons.star} title="Interview Process" subtitle="How was your overall interview experience?">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {([
                { val: "Excellent" as InterviewExp, label: "Excellent", desc: "Smooth & impressive", color: "#16a34a", bg: "#f0fdf4",
                  icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> },
                { val: "Good" as InterviewExp, label: "Good", desc: "Positive experience", color: "#2563eb", bg: "#eff6ff",
                  icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg> },
                { val: "Average" as InterviewExp, label: "Average", desc: "Could be better", color: "#d97706", bg: "#fffbeb",
                  icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><line x1="5" y1="8" x2="19" y2="8"/><line x1="5" y1="16" x2="13" y2="16"/></svg> },
                { val: "Challenging" as InterviewExp, label: "Challenging", desc: "Tough but learning", color: "#dc2626", bg: "#fef2f2",
                  icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> },
              ]).map(o => (
                <RatingCard key={o.val} {...o} selected={expRating === o.val} onClick={() => setExpRating(o.val)} />
              ))}
            </div>
          </SectionCard>

          {/* ── Section 4: Insights ── */}
          <SectionCard n={4} icon={Icons.interview} title="Interview Insights" subtitle="Help future candidates know what to expect">
            <FieldLabel hint="Topics discussed, technical questions, conversation style — anything helpful">
              What type of questions or discussions happened?
            </FieldLabel>
            <textarea
              value={insights}
              onChange={e => { if (e.target.value.length <= 1500) setInsights(e.target.value) }}
              placeholder="You can mention topics discussed, technical questions, or the type of conversation during the interview. E.g. 'The interviewer focused on patent law basics, analytical reasoning, and asked me to explain a technical concept in simple terms...'"
              rows={5}
              className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50/80 text-[14px] text-slate-800 outline-none transition-all focus:bg-white focus:border-[#4f46e5] focus:ring-2 focus:ring-[#4f46e5]/10 placeholder:text-slate-400 resize-none leading-[1.75] font-[inherit]"
            />
            <div className="flex items-center justify-between mt-2">
              <span className="text-[11px] text-slate-400 flex items-center gap-1">{Icons.info} Optional but very helpful for others</span>
              <span className={`text-[11px] font-semibold ${insights.length > 1350 ? "text-amber-500" : "text-slate-300"}`}>{insights.length}/1500</span>
            </div>
          </SectionCard>

          {/* ── Section 5: Jobingen Support ── */}
          <SectionCard n={5} icon={Icons.rocket} title="Jobingen Support" subtitle="Rate how Jobingen helped you prepare">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {([
                { val: "Extremely helpful" as JobingenSupport, desc: "Made a big difference", color: "#16a34a", bg: "#f0fdf4",
                  icon: <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg> },
                { val: "Helpful" as JobingenSupport, desc: "Supported my preparation", color: "#2563eb", bg: "#eff6ff",
                  icon: Icons.thumbUp },
                { val: "Somewhat helpful" as JobingenSupport, desc: "Partially useful", color: "#d97706", bg: "#fffbeb",
                  icon: <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M8 15s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg> },
                { val: "Neutral" as JobingenSupport, desc: "No strong impact", color: "#6b7280", bg: "#f9fafb",
                  icon: Icons.minus },
              ]).map(o => (
                <RadioCard key={o.val} selected={support === o.val} onClick={() => setSupport(o.val)}
                  label={o.val} desc={o.desc} color={o.color} bg={o.bg} icon={o.icon} />
              ))}
            </div>
          </SectionCard>

          {/* ── Section 6: Quote ── */}
          <SectionCard n={6} icon={Icons.quote} title="Your Testimonial" subtitle="This may be featured on Jobingen's LinkedIn">
            <div className="flex items-start gap-3 bg-gradient-to-r from-[#eef2ff] to-[#f5f3ff] rounded-xl border border-[#c7d2fe]/60 p-4 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#4f46e5]/10 flex items-center justify-center text-[#4f46e5] flex-shrink-0 mt-0.5">
                {Icons.sparkles}
              </div>
              <div>
                <p className="text-[12px] font-bold text-[#3730a3] mb-1">LinkedIn-Ready Testimonial</p>
                <p className="text-[12px] text-[#4338ca] leading-relaxed">
                  Write a short, genuine message about your experience. We&apos;ll turn this into an inspiring LinkedIn post that helps future candidates.
                </p>
              </div>
            </div>
            <textarea
              value={quote}
              onChange={e => { if (e.target.value.length <= 600) setQuote(e.target.value) }}
              placeholder={`"My experience with Jobingen was extremely valuable. The guidance and preparation helped me confidently reach the interview stage for the Patent Analyst role."`}
              rows={4}
              className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50/80 text-[14px] text-slate-700 outline-none transition-all focus:bg-white focus:border-[#4f46e5] focus:ring-2 focus:ring-[#4f46e5]/10 placeholder:text-slate-400 resize-none leading-[1.75] font-[inherit] italic"
            />
            <div className="flex items-center justify-between mt-2">
              <span className="text-[11px] text-slate-400 flex items-center gap-1">{Icons.info} Optional — but helps inspire others</span>
              <span className={`text-[11px] font-semibold ${quote.length > 540 ? "text-amber-500" : "text-slate-300"}`}>{quote.length}/600</span>
            </div>
          </SectionCard>

          {/* ── Section 7: Permission ── */}
          <SectionCard n={7} icon={Icons.shield} title="Permission to Publish">
            <label
              className="flex items-start gap-4 cursor-pointer group"
              onClick={() => setAllowPublish(p => !p)}
            >
              <div
                className="w-5 h-5 rounded-md border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-all"
                style={{ borderColor: allowPublish ? "#4f46e5" : "#cbd5e1", background: allowPublish ? "#4f46e5" : "white" }}
              >
                {allowPublish && (
                  <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="3.5" strokeLinecap="round">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                )}
              </div>
              <div>
                <p className="text-[14px] font-semibold text-slate-800 leading-snug mb-1 group-hover:text-[#4f46e5] transition-colors">
                  I allow Jobingen to use my feedback or testimonial in social media posts or promotional content.
                </p>
                <p className="text-[12px] text-slate-400 leading-relaxed">
                  Your name and college may be mentioned. You can withdraw permission anytime by contacting our team.
                </p>
                {allowPublish && (
                  <div className="flex items-center gap-1.5 mt-2 text-[11px] font-semibold text-[#16a34a]">
                    <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg>
                    Permission granted — thank you!
                  </div>
                )}
              </div>
            </label>
          </SectionCard>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3.5">
              <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0">
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#ef4444" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01"/></svg>
              </div>
              <p className="text-[13px] text-red-600 font-medium">{error}</p>
            </div>
          )}

          {/* Submit */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!canSubmit || loading}
            className="w-full py-4 rounded-2xl text-[15px] font-bold text-white flex items-center justify-center gap-2.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed border-none cursor-pointer font-[inherit]"
            style={{
              background: canSubmit && !loading ? "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)" : "#a5b4fc",
              boxShadow: canSubmit && !loading ? "0 6px 24px rgba(79,70,229,0.35), 0 1px 2px rgba(0,0,0,0.05)" : "none",
            }}
          >
            {loading ? (
              <><span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full" style={{ animation: "spin .6s linear infinite" }} />Submitting...</>
            ) : (
              <>{Icons.send} Submit My Experience</>
            )}
          </button>

          <p className="text-center text-[11px] text-slate-400 leading-relaxed">
            By submitting, you agree to our{" "}
            <Link href="/privacy" className="text-[#4f46e5] underline underline-offset-2 hover:text-[#3730a3]">Privacy Policy</Link>.
            {" "}Your data is encrypted and stored securely.
          </p>

        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `@keyframes spin { to { transform: rotate(360deg) } }` }} />
    </div>
  )
}
