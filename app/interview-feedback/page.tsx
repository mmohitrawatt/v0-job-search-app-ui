"use client"

import { useState } from "react"
import Link from "next/link"
import { Footer } from "@/components/landing/footer"
import { Navbar } from "@/components/landing/navbar"

/* ─── Step config ───────────────────────────────────── */

type Step = {
  id: number
  chip: string
  chipColor: string
  chipBg: string
  label: string
  title: string
  sub: string
  type: "single" | "multi" | "multi-grid" | "scale" | "text" | "dropdown" | "input" | "combo"
  opts?: { l: string; d?: string }[]
  fields?: { key: string; label: string; placeholder: string; required?: boolean; type?: "dropdown"; opts?: string[] }[]
  min?: number
  max?: number
  scaleLabels?: [string, string]
  placeholder?: string
  maxLen?: number
}

const STEPS: Step[] = [
  {
    id: 0, chip: "About You", chipColor: "#1d3a8f", chipBg: "#eef1fd",
    label: "Step 1 of 10",
    title: "Who are you?",
    sub: "This helps us understand your perspective and categorize your experience.",
    type: "single",
    opts: [
      { l: "Candidate", d: "I interviewed for a role at a company." },
      { l: "Professional / Employee", d: "I work at a company and can share my interview experience." },
      { l: "Recruiter / Interviewer", d: "I conduct interviews and want to share insights." },
    ],
  },
  {
    id: 1, chip: "Domain", chipColor: "#0f766e", chipBg: "#ecfdf5",
    label: "Step 2 of 10",
    title: "What domain was the interview for?",
    sub: "Select the industry or function area of the role.",
    type: "single",
    opts: [
      { l: "Software / IT" }, { l: "Data Science" }, { l: "Product Management" },
      { l: "Finance" }, { l: "Marketing" }, { l: "Government Jobs" },
      { l: "Consulting" }, { l: "Design / UI UX" }, { l: "Sales" }, { l: "Other" },
    ],
  },
  {
    id: 2, chip: "Role Info", chipColor: "#b45309", chipBg: "#fffbeb",
    label: "Step 3 of 10",
    title: "Tell us about the role and company",
    sub: "This helps candidates find relevant experiences.",
    type: "combo",
    fields: [
      { key: "role_position", label: "Role / Position", placeholder: "e.g. Backend Engineer, Product Manager, Data Analyst", required: true },
      { key: "company_type", label: "Company Type", placeholder: "Select...", required: true, type: "dropdown", opts: ["Startup", "MNC", "Mid-size Company", "Government Organization"] },
      { key: "company_name", label: "Company Name (optional)", placeholder: "e.g. Google, TCS, Razorpay" },
    ],
  },
  {
    id: 3, chip: "Interview Type", chipColor: "#1d3a8f", chipBg: "#eef1fd",
    label: "Step 4 of 10",
    title: "What types of interviews did you face?",
    sub: "Select all rounds that were part of your interview process.",
    type: "multi-grid",
    opts: [
      { l: "HR Interview" }, { l: "Technical Interview" }, { l: "Coding Round" },
      { l: "System Design" }, { l: "Case Study" }, { l: "Group Discussion" },
      { l: "Panel Interview" }, { l: "Aptitude Test" }, { l: "Take-home Assignment" },
    ],
  },
  {
    id: 4, chip: "Difficulty", chipColor: "#dc2626", chipBg: "#fef2f2",
    label: "Step 5 of 10",
    title: "How difficult was the overall interview?",
    sub: "Rate from 1 (very easy) to 5 (very hard) based on your experience.",
    type: "scale", min: 1, max: 5,
    scaleLabels: ["Very Easy", "Very Hard"],
  },
  {
    id: 5, chip: "Questions", chipColor: "#7c3aed", chipBg: "#f5f3ff",
    label: "Step 6 of 10",
    title: "What questions were asked in the interview?",
    sub: "Share the actual questions — this is the most valuable part for other candidates.",
    type: "text",
    placeholder: "e.g.\n• Design a URL shortener system\n• Explain REST vs GraphQL\n• Tell me about a time you handled conflict\n• Write a function to reverse a linked list\n• What's your approach to debugging production issues?",
    maxLen: 2000,
  },
  {
    id: 6, chip: "Process", chipColor: "#0f766e", chipBg: "#ecfdf5",
    label: "Step 7 of 10",
    title: "Describe the full interview process",
    sub: "Walk us through each round — what happened, how long, what format.",
    type: "text",
    placeholder: "e.g.\n• Round 1: Online coding test (2 DSA questions, 60 min)\n• Round 2: Technical interview (system design + CS fundamentals)\n• Round 3: Behavioral / HR discussion (salary, culture fit)\n• Got the result in 5 days via email",
    maxLen: 2000,
  },
  {
    id: 7, chip: "Advice", chipColor: "#b45309", chipBg: "#fffbeb",
    label: "Step 8 of 10",
    title: "What advice would you give to future candidates?",
    sub: "Your tips could make the difference for someone preparing for this interview.",
    type: "text",
    placeholder: "e.g.\n• Focus on system design — they asked very open-ended questions\n• Practice behavioral questions using the STAR method\n• Review the company's recent product launches\n• LeetCode medium-level problems are enough for the coding round",
    maxLen: 1500,
  },
  {
    id: 8, chip: "Location", chipColor: "#1d3a8f", chipBg: "#eef1fd",
    label: "Step 9 of 10",
    title: "Where was the interview conducted?",
    sub: "This is optional but helps candidates know what to expect.",
    type: "single",
    opts: [
      { l: "Remote", d: "Video call / online from home" },
      { l: "Onsite", d: "In-person at the company office" },
      { l: "Hybrid", d: "Some rounds remote, some onsite" },
    ],
  },
  {
    id: 9, chip: "Almost done!", chipColor: "#16a34a", chipBg: "#f0fdf4",
    label: "Step 10 of 10",
    title: "Last step — tell us your name",
    sub: "So we can credit your contribution. Email is optional.",
    type: "combo",
    fields: [
      { key: "user_name", label: "Your Name", placeholder: "e.g. Rahul Sharma", required: true },
      { key: "user_email", label: "Email (optional)", placeholder: "you@email.com" },
    ],
  },
]

/* ─── Page ──────────────────────────────────────────── */

export default function InterviewFeedbackPage() {
  const [cur, setCur] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number | number[] | string>>(() => {
    const init: Record<number, number | number[] | string> = {}
    STEPS.forEach(s => {
      if (s.type === "single" || s.type === "scale") init[s.id] = -1
      else if (s.type === "multi" || s.type === "multi-grid") init[s.id] = []
      else init[s.id] = ""
    })
    return init
  })
  const [comboFields, setComboFields] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const step = STEPS[cur]
  const totalSteps = STEPS.length
  const pct = ((cur + 1) / totalSteps) * 100

  function isValid(): boolean {
    const a = answers[step.id]
    if (step.type === "single" || step.type === "scale") return a !== -1
    if (step.type === "multi" || step.type === "multi-grid") return (a as number[]).length > 0
    if (step.type === "text") return (a as string).trim().length >= 15
    if (step.type === "combo") {
      return (step.fields || []).filter(f => f.required).every(f => (comboFields[f.key] || "").trim().length > 0)
    }
    return true
  }

  function pickSingle(i: number) {
    setAnswers(p => ({ ...p, [step.id]: i }))
  }

  function toggleMulti(i: number) {
    setAnswers(p => {
      const arr = [...(p[step.id] as number[])]
      const idx = arr.indexOf(i)
      if (idx === -1) arr.push(i); else arr.splice(idx, 1)
      return { ...p, [step.id]: arr }
    })
  }

  function setText(v: string) {
    const max = step.maxLen || 2000
    if (v.length <= max) setAnswers(p => ({ ...p, [step.id]: v }))
  }

  function goBack() {
    if (cur > 0) { setCur(cur - 1); window.scrollTo({ top: 0, behavior: "smooth" }) }
  }

  async function goNext() {
    if (!isValid()) return
    if (cur < totalSteps - 1) {
      setCur(cur + 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      // Submit
      setLoading(true)
      try {
        await fetch("/api/interview-feedback", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: comboFields.user_name?.trim() || "",
            email: comboFields.user_email?.trim() || null,
            user_type: STEPS[0].opts?.[answers[0] as number]?.l || "",
            domain: STEPS[1].opts?.[answers[1] as number]?.l || "",
            role_position: comboFields.role_position || "",
            company_type: comboFields.company_type || "",
            company_name: comboFields.company_name || null,
            interview_types: (answers[3] as number[]).map(i => STEPS[3].opts?.[i]?.l || "").filter(Boolean),
            difficulty_level: answers[4] as number,
            questions_asked: (answers[5] as string).trim(),
            interview_process: (answers[6] as string).trim(),
            advice: (answers[7] as string).trim() || null,
            interview_location: STEPS[8].opts?.[answers[8] as number]?.l || null,
          }),
        })
        setDone(true)
        window.scrollTo({ top: 0, behavior: "smooth" })
      } catch {
        alert("Something went wrong. Please try again.")
      } finally {
        setLoading(false)
      }
    }
  }

  /* ─── Done ────────────────────────────────── */
  if (done) {
    return (
      <div className="min-h-screen bg-[#fafbff] flex items-center justify-center px-5">
        <div className="max-w-[440px] w-full text-center">
          <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg" style={{ background: "linear-gradient(135deg, #1d3a8f, #3b5bdb)" }}>
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <h1 className="text-[24px] font-extrabold text-slate-900 tracking-[-0.03em] mb-3">
            Thank you for sharing!
          </h1>
          <p className="text-[15px] text-slate-500 leading-relaxed mb-3 max-w-[380px] mx-auto">
            Your interview experience has been submitted successfully. You&apos;re helping thousands of candidates prepare better.
          </p>
          <p className="text-[13px] text-slate-400 mb-8">
            Thank you for helping the Jobingen community!
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[14px] font-bold text-white px-6 py-3 rounded-xl shadow-[0_2px_8px_rgba(29,58,143,0.3)]"
              style={{ background: "linear-gradient(135deg, #1d3a8f, #3b5bdb)" }}
            >
              Back to Home
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <button
              onClick={() => { setDone(false); setCur(0); setAnswers({}); setComboFields({}); const init: Record<number, number | number[] | string> = {}; STEPS.forEach(s => { if (s.type === "single" || s.type === "scale") init[s.id] = -1; else if (s.type === "multi" || s.type === "multi-grid") init[s.id] = []; else init[s.id] = "" }); setAnswers(init) }}
              className="inline-flex items-center gap-2 text-[14px] font-bold text-[#1d3a8f] bg-white border border-slate-200 px-6 py-3 rounded-xl cursor-pointer font-[inherit] hover:bg-slate-50 transition-colors"
            >
              Submit Another
            </button>
          </div>
        </div>
      </div>
    )
  }

  /* ─── Wizard ──────────────────────────────── */
  return (
    <div className="min-h-screen bg-[#fafbff] font-sans">
      <Navbar />

      {/* Card */}
      <div className="max-w-[680px] mx-auto px-5 pt-[108px] pb-8 sm:pb-12">
        <div className="bg-white rounded-2xl border border-slate-200/60 shadow-[0_2px_12px_rgba(0,0,0,0.04)] overflow-hidden">

          {/* Progress bar */}
          <div className="h-1 bg-slate-100">
            <div
              className="h-full rounded-r-full transition-all duration-500 ease-out"
              style={{ width: `${pct}%`, background: "linear-gradient(90deg, #1d3a8f, #3b5bdb)" }}
            />
          </div>

          <div className="p-6 sm:p-8">
            {/* Chip + label */}
            <div className="flex items-center justify-between mb-4">
              <span
                className="inline-flex items-center gap-1.5 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider"
                style={{ background: step.chipBg, color: step.chipColor }}
              >
                {step.chip}
              </span>
              <span className="text-[11px] font-bold text-slate-400 bg-slate-50 px-3 py-1 rounded-full">
                {Math.round(pct)}% complete
              </span>
            </div>

            <p className="text-[12px] text-slate-400 font-medium mb-2 tracking-wide">{step.label}</p>
            <h2 className="text-[20px] sm:text-[22px] font-extrabold text-slate-900 tracking-[-0.02em] leading-[1.3] mb-1.5">
              {step.title}
            </h2>
            <p className="text-[13px] text-slate-500 leading-[1.6] mb-6">{step.sub}</p>

            {/* ── Single Select ─────────────── */}
            {step.type === "single" && (
              <div className="flex flex-col gap-2.5">
                {step.opts?.map((o, i) => {
                  const sel = answers[step.id] === i
                  return (
                    <button key={i} onClick={() => pickSingle(i)} className={`flex items-start gap-3 text-left p-3.5 rounded-xl border transition-all duration-200 ${sel ? "border-[#1d3a8f] bg-indigo-50/50" : "border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/50"}`}>
                      <div className={`w-[18px] h-[18px] rounded-full border-2 mt-0.5 shrink-0 flex items-center justify-center transition-all ${sel ? "border-[#1d3a8f] bg-[#1d3a8f]" : "border-slate-300"}`}>
                        {sel && <div className="w-[7px] h-[7px] rounded-full bg-white" />}
                      </div>
                      <div>
                        <div className={`text-[14px] font-semibold leading-tight ${sel ? "text-[#1d3a8f]" : "text-slate-800"}`}>{o.l}</div>
                        {o.d && <div className="text-[12px] text-slate-400 mt-1 leading-relaxed">{o.d}</div>}
                      </div>
                    </button>
                  )
                })}
              </div>
            )}

            {/* ── Multi Select / Grid ──────── */}
            {(step.type === "multi" || step.type === "multi-grid") && (
              <div className={step.type === "multi-grid" ? "grid grid-cols-1 sm:grid-cols-2 gap-2.5" : "flex flex-col gap-2.5"}>
                {step.opts?.map((o, i) => {
                  const sel = (answers[step.id] as number[]).includes(i)
                  return (
                    <button key={i} onClick={() => toggleMulti(i)} className={`flex items-start gap-3 text-left p-3.5 rounded-xl border transition-all duration-200 ${sel ? "border-[#1d3a8f] bg-indigo-50/50" : "border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/50"}`}>
                      <div className={`w-[18px] h-[18px] rounded-[5px] border-2 mt-0.5 shrink-0 flex items-center justify-center transition-all ${sel ? "border-[#1d3a8f] bg-[#1d3a8f]" : "border-slate-300"}`}>
                        {sel && <svg width="10" height="10" fill="none" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                      </div>
                      <div className={`text-[14px] font-semibold leading-tight ${sel ? "text-[#1d3a8f]" : "text-slate-800"}`}>{o.l}</div>
                    </button>
                  )
                })}
              </div>
            )}

            {/* ── Scale ────────────────────── */}
            {step.type === "scale" && (
              <div>
                <div className="flex gap-2.5">
                  {Array.from({ length: 5 }, (_, i) => i + 1).map(v => {
                    const sel = answers[step.id] === v
                    const colors = ["", "#22c55e", "#84cc16", "#f59e0b", "#f97316", "#ef4444"]
                    return (
                      <button key={v} onClick={() => pickSingle(v)} className={`flex-1 py-5 rounded-xl border text-center transition-all duration-200 ${sel ? "shadow-sm" : "border-slate-200/80 hover:border-slate-300 text-slate-500"}`}
                        style={sel ? { borderColor: colors[v], background: `${colors[v]}12`, color: colors[v] } : undefined}
                      >
                        <div className={`text-[20px] font-extrabold ${sel ? "" : "text-slate-500"}`} style={sel ? { color: colors[v] } : undefined}>{v}</div>
                        <div className={`text-[10px] font-semibold mt-1 ${sel ? "" : "text-slate-400"}`} style={sel ? { color: colors[v] } : undefined}>
                          {["", "Very Easy", "Easy", "Moderate", "Hard", "Very Hard"][v]}
                        </div>
                      </button>
                    )
                  })}
                </div>
                {step.scaleLabels && (
                  <div className="flex justify-between mt-2 px-1">
                    <span className="text-[11px] text-slate-400">{step.scaleLabels[0]}</span>
                    <span className="text-[11px] text-slate-400">{step.scaleLabels[1]}</span>
                  </div>
                )}
              </div>
            )}

            {/* ── Text ─────────────────────── */}
            {step.type === "text" && (
              <div>
                <textarea
                  value={answers[step.id] as string}
                  onChange={e => setText(e.target.value)}
                  placeholder={step.placeholder}
                  rows={6}
                  className="w-full p-4 rounded-xl border border-slate-200 text-[14px] text-slate-800 outline-none transition-all focus:border-[#1d3a8f] focus:ring-2 focus:ring-[#1d3a8f]/10 placeholder:text-slate-400 font-[inherit] resize-y leading-[1.7]"
                />
                <div className="flex justify-between mt-2 px-1">
                  <span className="text-[11px] text-slate-400">
                    {(answers[step.id] as string).trim().length < 15 && (answers[step.id] as string).length > 0
                      ? "Keep going — share a bit more detail"
                      : "\u00A0"
                    }
                  </span>
                  <span className={`text-[11px] font-semibold ${(answers[step.id] as string).length > (step.maxLen || 2000) * 0.9 ? "text-amber-500" : "text-slate-300"}`}>
                    {(answers[step.id] as string).length}/{step.maxLen || 2000}
                  </span>
                </div>
              </div>
            )}

            {/* ── Combo (multiple fields) ──── */}
            {step.type === "combo" && (
              <div className="flex flex-col gap-4">
                {step.fields?.map(f => (
                  <div key={f.key}>
                    <label className="text-[13px] font-semibold text-slate-700 mb-1.5 block">
                      {f.label} {f.required && <span className="text-red-400">*</span>}
                    </label>
                    {f.type === "dropdown" ? (
                      <select
                        value={comboFields[f.key] || ""}
                        onChange={e => setComboFields(p => ({ ...p, [f.key]: e.target.value }))}
                        className="w-full p-3.5 rounded-xl border border-slate-200 text-[14px] text-slate-800 outline-none transition-all focus:border-[#1d3a8f] focus:ring-2 focus:ring-[#1d3a8f]/10 font-[inherit] bg-white appearance-none cursor-pointer"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' viewBox='0 0 24 24'%3E%3Cpath d='m6 9 6 6 6-6' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "right 14px center",
                          paddingRight: "36px",
                        }}
                      >
                        <option value="">{f.placeholder}</option>
                        {f.opts?.map(o => <option key={o} value={o}>{o}</option>)}
                      </select>
                    ) : (
                      <input
                        type="text"
                        value={comboFields[f.key] || ""}
                        onChange={e => setComboFields(p => ({ ...p, [f.key]: e.target.value }))}
                        placeholder={f.placeholder}
                        className="w-full p-3.5 rounded-xl border border-slate-200 text-[14px] text-slate-800 outline-none transition-all focus:border-[#1d3a8f] focus:ring-2 focus:ring-[#1d3a8f]/10 placeholder:text-slate-400 font-[inherit]"
                      />
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* ── Navigation ───────────────── */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100">
              <button
                onClick={goBack}
                disabled={cur === 0}
                className={`inline-flex items-center gap-2 text-[13px] font-bold px-5 py-2.5 rounded-xl border transition-all font-[inherit] ${cur === 0 ? "text-slate-300 border-slate-100 cursor-not-allowed" : "text-slate-600 border-slate-200 hover:bg-slate-50 cursor-pointer"}`}
              >
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Back
              </button>

              <button
                onClick={goNext}
                disabled={!isValid() || loading}
                className={`inline-flex items-center gap-2 text-[14px] font-bold px-7 py-3 rounded-xl transition-all font-[inherit] border-none ${isValid() && !loading ? "text-white cursor-pointer shadow-[0_2px_8px_rgba(29,58,143,0.25)]" : "text-white/60 cursor-not-allowed"}`}
                style={{ background: isValid() && !loading ? "linear-gradient(135deg, #1d3a8f, #3b5bdb)" : "#c7d2fe" }}
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full inline-block" style={{ animation: "ifspin .6s linear infinite" }} />
                    Submitting...
                  </>
                ) : cur === totalSteps - 1 ? (
                  <>
                    Submit
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </>
                ) : (
                  <>
                    Continue
                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Step indicators */}
        <div className="flex justify-center gap-1.5 mt-6">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className="h-1 rounded-full transition-all duration-300"
              style={{
                width: i === cur ? 24 : 8,
                background: i < cur ? "#1d3a8f" : i === cur ? "#3b5bdb" : "#e2e8f0",
              }}
            />
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `@keyframes ifspin{to{transform:rotate(360deg)}}` }} />
      <Footer />
    </div>
  )
}
