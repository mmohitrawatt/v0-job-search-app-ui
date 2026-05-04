"use client"

import { useState } from "react"
import Link from "next/link"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"

type Status           = "Final Year Student" | "Recent Graduate" | "Working Professional"
type ReachedInterview = "Yes" | "Yes, multiple rounds" | "Not selected after interview"
type InterviewExp     = "Excellent" | "Good" | "Average" | "Challenging"
type JobingenSupport  = "Extremely helpful" | "Helpful" | "Somewhat helpful" | "Neutral"

/* ─── SVG Icons ──────────────────────────────────────── */
const Ic = {
  user:     <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  college:  <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>,
  bag:      <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-4 0v2"/></svg>,
  star:     <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  chat:     <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  rocket:   <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>,
  quote:    <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/></svg>,
  shield:   <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  lock:     <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  linkedin: <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>,
  check:    <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>,
  info:     <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4m0-4h.01"/></svg>,
  sparkles: <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>,
  send:     <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2 11 13"/><path d="M22 2 15 22 11 13 2 9l20-7z"/></svg>,
  arrow:    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>,
  thumbUp:  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>,
  neutral:  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  smile:    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 15s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>,
  zap:      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  person:   <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M6 20v-2a6 6 0 0 1 12 0v2"/></svg>,
}

/* ─── Field component ─────────────────────────────────── */
function Field({ label, required, value, onChange, placeholder, hint }: {
  label: string; required?: boolean; value: string; onChange: (v: string) => void
  placeholder?: string; hint?: string
}) {
  return (
    <div>
      <label className="block text-[12px] font-semibold text-slate-600 uppercase tracking-wide mb-1.5">
        {label}{required && <span className="text-red-400 ml-0.5 normal-case font-normal tracking-normal">*</span>}
      </label>
      {hint && <p className="text-[11px] text-slate-400 mb-1.5 leading-snug normal-case tracking-normal font-normal">{hint}</p>}
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-[14px] text-slate-800 outline-none transition-all focus:bg-white focus:border-[#1d3a8f] focus:ring-2 focus:ring-[#1d3a8f]/10 placeholder:text-slate-400 font-[inherit]"
      />
    </div>
  )
}

/* ─── Pick (radio card) ───────────────────────────────── */
function Pick({ selected, onClick, label, desc, icon, accent = "#1d3a8f" }: {
  selected: boolean; onClick: () => void; label: string; desc?: string
  icon?: React.ReactNode; accent?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl border-2 transition-all cursor-pointer font-[inherit]"
      style={{ borderColor: selected ? accent : "#e2e8f0", background: selected ? `${accent}09` : "#fafbff" }}
    >
      {icon && (
        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all"
          style={{ background: selected ? `${accent}15` : "#f1f5f9", color: selected ? accent : "#94a3b8" }}>
          {icon}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="text-[13px] font-semibold leading-tight" style={{ color: selected ? accent : "#374151" }}>{label}</div>
        {desc && <div className="text-[11.5px] text-slate-400 mt-0.5">{desc}</div>}
      </div>
      <div className="w-[18px] h-[18px] rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all flex-shrink-0"
        style={{ borderColor: selected ? accent : "#cbd5e1", background: selected ? accent : "transparent" }}>
        {selected && <div className="w-[6px] h-[6px] rounded-full bg-white" />}
      </div>
    </button>
  )
}

/* ─── Rating tile ─────────────────────────────────────── */
function RatingTile({ label, desc, icon, accent, bg, selected, onClick }: {
  label: string; desc: string; icon: React.ReactNode
  accent: string; bg: string; selected: boolean; onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col items-center gap-2 px-2 py-4 rounded-xl border-2 transition-all cursor-pointer font-[inherit] text-center relative"
      style={{ borderColor: selected ? accent : "#e2e8f0", background: selected ? bg : "#fafbff" }}
    >
      {selected && (
        <div className="absolute top-2 right-2 w-4 h-4 rounded-full flex items-center justify-center" style={{ background: accent }}>
          {Ic.check}
        </div>
      )}
      <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-all"
        style={{ background: selected ? `${accent}20` : "#f1f5f9", color: selected ? accent : "#94a3b8" }}>
        {icon}
      </div>
      <div>
        <div className="text-[12px] font-bold" style={{ color: selected ? accent : "#374151" }}>{label}</div>
        <div className="text-[10px] text-slate-400 mt-0.5">{desc}</div>
      </div>
    </button>
  )
}

/* ─── Section card ────────────────────────────────────── */
function Section({ n, icon, title, subtitle, children }: {
  n: number; icon: React.ReactNode; title: string; subtitle?: string; children: React.ReactNode
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/70 shadow-sm overflow-hidden">
      <div className="flex items-center gap-3 px-4 sm:px-6 py-3.5 border-b border-slate-100 bg-slate-50/60">
        <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white flex-shrink-0 text-[11px] font-black shadow-sm"
          style={{ background: "linear-gradient(135deg, #1d3a8f 0%, #3b5bdb 100%)" }}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black text-[#1d3a8f] bg-[#eef1fd] px-2 py-0.5 rounded-full uppercase tracking-widest whitespace-nowrap">
              {String(n).padStart(2, "0")}
            </span>
            <span className="text-[14px] font-bold text-slate-900 leading-tight">{title}</span>
          </div>
          {subtitle && <p className="text-[11.5px] text-slate-400 mt-0.5">{subtitle}</p>}
        </div>
      </div>
      <div className="p-4 sm:p-6">{children}</div>
    </div>
  )
}

/* ─── Page ────────────────────────────────────────────── */
export default function PatentAnalystFeedbackPage() {
  const [done,    setDone]    = useState(false)
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState("")

  const [fullName,     setFullName]     = useState("")
  const [college,      setCollege]      = useState("")
  const [status,       setStatus]       = useState<Status | "">("")
  const [reached,      setReached]      = useState<ReachedInterview | "">("")
  const [expRating,    setExpRating]    = useState<InterviewExp | "">("")
  const [insights,     setInsights]     = useState("")
  const [support,      setSupport]      = useState<JobingenSupport | "">("")
  const [quote,        setQuote]        = useState("")
  const [allowPublish, setAllowPublish] = useState(false)

  const required  = [fullName, college, status, reached, expRating]
  const filled    = required.filter(Boolean).length
  const pct       = Math.round((filled / required.length) * 100)
  const canSubmit = required.every(Boolean)

  async function handleSubmit() {
    if (!canSubmit) { setError("Please fill all required fields marked *."); return }
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

  /* ── Success ── */
  if (done) return (
    <div className="min-h-screen bg-[#f8faff]">
      <Navbar />
      <div className="max-w-[520px] mx-auto px-5 pt-24 sm:pt-32 pb-20 text-center">
        <div className="relative w-20 h-20 mx-auto mb-6">
          <div className="absolute inset-0 rounded-2xl bg-[#1d3a8f]/12 animate-ping" style={{ animationDuration: "1.5s" }} />
          <div className="relative w-20 h-20 rounded-2xl flex items-center justify-center shadow-[0_8px_32px_rgba(29,58,143,0.25)]"
            style={{ background: "linear-gradient(135deg,#1d3a8f,#3b5bdb)" }}>
            <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
          </div>
        </div>

        <h1 className="text-[28px] font-black text-slate-900 tracking-[-0.03em] mb-2">Thank you!</h1>
        <p className="text-[15px] text-slate-500 leading-relaxed mb-8">
          Your experience has been recorded. It helps future Patent Analyst candidates prepare with confidence.
        </p>

        {allowPublish && quote && (
          <div className="bg-white rounded-2xl border border-slate-200/70 shadow-sm p-5 mb-8 text-left">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
              <div className="w-7 h-7 rounded-lg bg-[#0077b5] flex items-center justify-center text-white">{Ic.linkedin}</div>
              <span className="text-[12px] font-bold text-[#0077b5]">LinkedIn Post Preview</span>
              <span className="ml-auto text-[10px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">Draft</span>
            </div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-[13px] font-black"
                style={{ background: "linear-gradient(135deg,#1d3a8f,#3b5bdb)" }}>
                {fullName.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="text-[12px] font-bold text-slate-800">{fullName}</div>
                <div className="text-[11px] text-slate-400">{college}</div>
              </div>
            </div>
            <blockquote className="text-[13px] text-slate-700 leading-relaxed italic border-l-2 border-[#1d3a8f]/30 pl-3.5 mb-3">
              &ldquo;{quote}&rdquo;
            </blockquote>
            <div className="flex gap-1.5 flex-wrap">
              {["#PatentAnalyst", "#Jobingen", "#CareerGrowth", "#JobSearch"].map(t => (
                <span key={t} className="text-[10px] font-semibold text-[#0077b5]">{t}</span>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-3">
          <Link href="/"
            className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-[13px] font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(29,58,143,0.3)]"
            style={{ background: "linear-gradient(135deg,#1d3a8f,#3b5bdb)", boxShadow: "0 4px_16px rgba(29,58,143,0.25)" }}>
            Back to Home {Ic.arrow}
          </Link>
          <Link href="/mentors"
            className="px-5 py-3 rounded-xl text-[13px] font-bold text-slate-600 border border-slate-200 bg-white hover:bg-slate-50 transition-colors">
            View Mentors
          </Link>
        </div>
      </div>
      <Footer />
      <style dangerouslySetInnerHTML={{ __html: `@keyframes spin{to{transform:rotate(360deg)}}` }} />
    </div>
  )

  /* ── Form ── */
  return (
    <div style={{ minHeight: "100vh", background: "#f8faff" }}>
      <Navbar />

      {/* ── Hero ── */}
      <section className="fb-hero" style={{ background: "linear-gradient(180deg,#f0f4ff 0%,#e8edff 60%,#f8faff 100%)", padding: "172px 24px 56px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        {/* background blobs */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div style={{ position: "absolute", top: "-10%", right: "5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle,rgba(29,58,143,0.07) 0%,transparent 70%)" }} />
          <div style={{ position: "absolute", bottom: "-5%", left: "3%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle,rgba(59,91,219,0.05) 0%,transparent 70%)" }} />
        </div>

        <div style={{ position: "relative", maxWidth: 680, margin: "0 auto" }}>
          {/* Badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "6px 18px", background: "white", border: "1.5px solid #dde5ff", borderRadius: 99, marginBottom: 28, boxShadow: "0 2px 12px rgba(29,58,143,0.08)" }}>
            <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="#1d3a8f" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            <span style={{ fontSize: 11, fontWeight: 800, color: "#1d3a8f", letterSpacing: ".06em", textTransform: "uppercase" }}>Patent Analyst · Candidate Feedback</span>
          </div>

          <h1 style={{ fontSize: "clamp(22px,3vw,34px)", fontWeight: 900, color: "#0f172a", letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 16 }}>
            Share your{" "}
            <span style={{ background: "linear-gradient(135deg,#1d3a8f,#3b5bdb)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              interview experience
            </span>
            {" "}and help others succeed.
          </h1>

          <p style={{ fontSize: 16, color: "#475569", lineHeight: 1.75, maxWidth: 520, margin: "0 auto 40px" }}>
            Your honest feedback helps future candidates prepare for the Patent Analyst role through Jobingen. Takes under 2 minutes.
          </p>

          {/* Stats row */}
          <div className="fb-stats" style={{ display: "inline-grid", gridTemplateColumns: "repeat(4,1fr)", background: "white", border: "1.5px solid #e0e7ff", borderRadius: 16, overflow: "hidden", boxShadow: "0 4px 20px rgba(29,58,143,0.08)" }}>
            {[
              { val: "2 min",  label: "To complete"       },
              { val: "100%",   label: "Anonymous-safe"    },
              { val: "Secure", label: "Data encrypted"    },
              { val: "Live",   label: "LinkedIn-featured" },
            ].map((s, i) => (
              <div key={s.label} className="fb-stat-cell" style={{ padding: "16px 22px", textAlign: "center", borderRight: i < 3 ? "1px solid #f1f5f9" : "none" }}>
                <div style={{ fontSize: 18, fontWeight: 900, color: "#1d3a8f", letterSpacing: "-0.02em", lineHeight: 1 }}>{s.val}</div>
                <div style={{ fontSize: 11, fontWeight: 600, color: "#94a3b8", marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Progress bar */}
      <div style={{ width: "100%", height: 3, background: "#eef1fd", position: "sticky", top: 0, zIndex: 40 }}>
        <div style={{ height: "100%", transition: "width .5s", background: "linear-gradient(90deg,#1d3a8f,#3b5bdb)", width: `${pct}%` }} />
      </div>

      <div className="max-w-[700px] mx-auto px-4 sm:px-6 pt-10 pb-24">

        {/* ── Sections ── */}
        <div className="flex flex-col gap-4">

          {/* 1 · Candidate Info */}
          <Section n={1} icon={Ic.user} title="Candidate Information" subtitle="Basic details about yourself">
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Full Name" required value={fullName} onChange={setFullName} placeholder="e.g. Priya Sharma" />
                <Field label="College / University" required value={college} onChange={setCollege} placeholder="e.g. NIT Allahabad" />
              </div>
              <div>
                <label className="block text-[12px] font-semibold text-slate-600 uppercase tracking-wide mb-2">
                  Current Status <span className="text-red-400 normal-case font-normal tracking-normal">*</span>
                </label>
                <div className="flex flex-col gap-2">
                  {([
                    { val: "Final Year Student"  as Status, desc: "Currently pursuing your degree",     icon: Ic.college },
                    { val: "Recent Graduate"      as Status, desc: "Graduated within the past 2 years", icon: Ic.person  },
                    { val: "Working Professional" as Status, desc: "Currently employed",                icon: Ic.bag     },
                  ]).map(o => (
                    <Pick key={o.val} selected={status === o.val} onClick={() => setStatus(o.val)}
                      label={o.val} desc={o.desc} icon={o.icon} />
                  ))}
                </div>
              </div>
            </div>
          </Section>

          {/* 2 · Interview Stage */}
          <Section n={2} icon={Ic.bag} title="Interview Stage" subtitle="Did you reach the interview through Jobingen?">
            <label className="block text-[12px] font-semibold text-slate-600 uppercase tracking-wide mb-2">
              How far did you go? <span className="text-red-400 normal-case font-normal tracking-normal">*</span>
            </label>
            <div className="flex flex-col gap-2">
              {([
                { val: "Yes"                          as ReachedInterview, desc: "Successfully reached the interview stage",    accent: "#16a34a" },
                { val: "Yes, multiple rounds"         as ReachedInterview, desc: "Went through more than one interview round", accent: "#2563eb" },
                { val: "Not selected after interview" as ReachedInterview, desc: "Completed interviews but wasn't selected",   accent: "#9333ea" },
              ]).map(o => (
                <Pick key={o.val} selected={reached === o.val} onClick={() => setReached(o.val)}
                  label={o.val} desc={o.desc} accent={o.accent}
                  icon={
                    <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      {o.val === "Yes" ? <path d="M20 6L9 17l-5-5"/> :
                       o.val === "Yes, multiple rounds" ? <><path d="M17 1l4 4-4 4M3 11V9a4 4 0 0 1 4-4h14M7 23l-4-4 4-4M21 13v2a4 4 0 0 1-4 4H3"/></> :
                       <path d="M18 6 6 18M6 6l12 12"/>}
                    </svg>
                  }
                />
              ))}
            </div>
          </Section>

          {/* 3 · Rating */}
          <Section n={3} icon={Ic.star} title="Interview Rating" subtitle="Rate your overall interview experience">
            <label className="block text-[12px] font-semibold text-slate-600 uppercase tracking-wide mb-3">
              Overall experience <span className="text-red-400 normal-case font-normal tracking-normal">*</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {([
                { val: "Excellent"   as InterviewExp, label: "Excellent",   desc: "Smooth & impressive",  accent: "#16a34a", bg: "#f0fdf4", icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> },
                { val: "Good"        as InterviewExp, label: "Good",        desc: "Positive experience",  accent: "#2563eb", bg: "#eff6ff", icon: Ic.thumbUp  },
                { val: "Average"     as InterviewExp, label: "Average",     desc: "Could be better",      accent: "#d97706", bg: "#fffbeb", icon: Ic.smile    },
                { val: "Challenging" as InterviewExp, label: "Challenging", desc: "Tough but learning",   accent: "#dc2626", bg: "#fef2f2", icon: Ic.zap      },
              ]).map(o => (
                <RatingTile key={o.val} {...o} selected={expRating === o.val} onClick={() => setExpRating(o.val)} />
              ))}
            </div>
          </Section>

          {/* 4 · Insights */}
          <Section n={4} icon={Ic.chat} title="Interview Insights" subtitle="What should future candidates know?">
            <label className="block text-[12px] font-semibold text-slate-600 uppercase tracking-wide mb-1.5">
              Describe your experience
            </label>
            <p className="text-[11.5px] text-slate-400 mb-2">Topics covered, question types, difficulty level — anything helpful for others.</p>
            <textarea
              value={insights}
              onChange={e => { if (e.target.value.length <= 1500) setInsights(e.target.value) }}
              placeholder="E.g. The interviewer focused on patent law basics, analytical reasoning, and asked me to explain a technical concept in simple terms. The process was structured and took about 45 minutes..."
              rows={5}
              className="w-full px-3.5 py-3 rounded-xl border border-slate-200 bg-slate-50 text-[14px] text-slate-800 outline-none transition-all focus:bg-white focus:border-[#1d3a8f] focus:ring-2 focus:ring-[#1d3a8f]/10 placeholder:text-slate-400 resize-none leading-[1.75] font-[inherit]"
            />
            <div className="flex items-center justify-between mt-1.5">
              <span className="text-[11px] text-slate-400 flex items-center gap-1">{Ic.info} Optional — very helpful for others</span>
              <span className={`text-[11px] font-semibold tabular-nums ${insights.length > 1350 ? "text-amber-500" : "text-slate-300"}`}>{insights.length}/1500</span>
            </div>
          </Section>

          {/* 5 · Jobingen Support */}
          <Section n={5} icon={Ic.rocket} title="Jobingen Support" subtitle="How helpful was Jobingen in your preparation?">
            <label className="block text-[12px] font-semibold text-slate-600 uppercase tracking-wide mb-2">Rate our support</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {([
                { val: "Extremely helpful" as JobingenSupport, desc: "Made a significant difference",   icon: Ic.sparkles, accent: "#16a34a" },
                { val: "Helpful"           as JobingenSupport, desc: "Supported my preparation",        icon: Ic.thumbUp,  accent: "#1d3a8f" },
                { val: "Somewhat helpful"  as JobingenSupport, desc: "Partially useful",               icon: Ic.smile,    accent: "#d97706" },
                { val: "Neutral"           as JobingenSupport, desc: "No strong impact",               icon: Ic.neutral,  accent: "#6b7280" },
              ]).map(o => (
                <Pick key={o.val} selected={support === o.val} onClick={() => setSupport(o.val)}
                  label={o.val} desc={o.desc} icon={o.icon} accent={o.accent} />
              ))}
            </div>
          </Section>

          {/* 6 · Testimonial */}
          <Section n={6} icon={Ic.quote} title="Your Testimonial" subtitle="May be featured on Jobingen's LinkedIn page">
            <div className="flex items-start gap-3 bg-[#f0f5ff] border border-[#c7d2fe]/50 rounded-xl p-4 mb-4">
              <div className="w-7 h-7 rounded-lg bg-[#1d3a8f]/10 flex items-center justify-center text-[#1d3a8f] flex-shrink-0 mt-0.5">
                {Ic.sparkles}
              </div>
              <div>
                <p className="text-[12px] font-bold text-[#1d3a8f] mb-0.5">LinkedIn-Ready Testimonial</p>
                <p className="text-[12px] text-[#1d3a8f]/70 leading-relaxed">
                  Write a short, genuine sentence about your experience. We may turn this into an inspiring LinkedIn post.
                </p>
              </div>
            </div>
            <textarea
              value={quote}
              onChange={e => { if (e.target.value.length <= 600) setQuote(e.target.value) }}
              placeholder={`"Jobingen helped me reach the Patent Analyst interview with solid guidance and preparation support."`}
              rows={3}
              className="w-full px-3.5 py-3 rounded-xl border border-slate-200 bg-slate-50 text-[14px] text-slate-700 outline-none transition-all focus:bg-white focus:border-[#1d3a8f] focus:ring-2 focus:ring-[#1d3a8f]/10 placeholder:text-slate-400 resize-none leading-[1.75] font-[inherit] italic"
            />
            <div className="flex items-center justify-between mt-1.5">
              <span className="text-[11px] text-slate-400 flex items-center gap-1">{Ic.info} Optional — inspires future candidates</span>
              <span className={`text-[11px] font-semibold tabular-nums ${quote.length > 540 ? "text-amber-500" : "text-slate-300"}`}>{quote.length}/600</span>
            </div>
          </Section>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3.5">
              <div className="w-7 h-7 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0">
                <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="#ef4444" strokeWidth="2.2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01"/></svg>
              </div>
              <p className="text-[13px] text-red-600 font-medium">{error}</p>
            </div>
          )}

          {/* Submit */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!canSubmit || loading}
            className="w-full py-4 rounded-2xl text-[15px] font-bold text-white flex items-center justify-center gap-2.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed border-none cursor-pointer font-[inherit] hover:-translate-y-0.5"
            style={{
              background:  canSubmit && !loading ? "linear-gradient(135deg,#1d3a8f 0%,#3b5bdb 100%)" : "#93a5d4",
              boxShadow:   canSubmit && !loading ? "0 4px 20px rgba(29,58,143,0.3), 0 1px 3px rgba(0,0,0,0.05)" : "none",
              transition:  "all .2s",
            }}
          >
            {loading
              ? <><span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full" style={{ animation: "spin .6s linear infinite" }} /> Submitting…</>
              : <>{Ic.send} Submit My Experience</>
            }
          </button>

          <p className="text-center text-[11px] text-slate-400 leading-relaxed">
            By submitting you agree to our{" "}
            <Link href="/privacy" className="text-[#1d3a8f] underline underline-offset-2 hover:text-[#3b5bdb]">Privacy Policy</Link>.
            {" "}Your data is encrypted and stored securely.
          </p>

        </div>
      </div>

      <Footer />
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin{to{transform:rotate(360deg)}}
        @media(max-width:640px){
          .fb-nav-spacer{height:72px!important}
          .fb-hero{padding:44px 16px 40px!important}
          .fb-stats{
            grid-template-columns:repeat(2,1fr)!important;
            width:calc(100% - 32px)!important;
            display:grid!important;
          }
          .fb-stat-cell:nth-child(1){border-bottom:1px solid #f1f5f9}
          .fb-stat-cell:nth-child(2){border-right:none!important;border-bottom:1px solid #f1f5f9}
          .fb-stat-cell:nth-child(3){border-right:none!important}
          .fb-stat-cell{padding:12px 14px!important}
        }
      ` }} />
    </div>
  )
}
