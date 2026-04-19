"use client"

import { useState } from "react"
import Link from "next/link"
import { Footer } from "@/components/landing/footer"
import { Navbar } from "@/components/landing/navbar"

/* ─── Step Data ────────────────────────────────────── */

type Step = {
  id: number
  chip: string
  chipColor: string
  chipBg: string
  label: string
  title: string
  sub: string
  type: "single" | "multi" | "multi-grid" | "scale" | "text" | "info"
  opts?: { l: string; d?: string }[]
  min?: number
  max?: number
  scaleLabels?: [string, string]
  placeholder?: string
}

const STEPS: Step[] = [
  {
    id: 0, chip: "Let\u2019s start", chipColor: "#1d3a8f", chipBg: "#eef1fd",
    label: "Before we begin",
    title: "Tell us a bit about yourself",
    sub: "This helps us understand who you are. Your details stay private.",
    type: "info",
  },
  {
    id: 1, chip: "About you", chipColor: "#1d3a8f", chipBg: "#eef1fd",
    label: "Question 1 of 7",
    title: "What\u2019s your current situation?",
    sub: "This helps us understand exactly where you are in your career journey.",
    type: "single",
    opts: [
      { l: "1st or 2nd year \u2014 still exploring", d: "Figuring out what career suits me and what skills matter." },
      { l: "3rd year \u2014 building toward placement", d: "Actively working on skills and projects before final year." },
      { l: "Final year \u2014 in placement mode", d: "Applying to companies, attending drives, and preparing hard." },
      { l: "Recent graduate \u2014 still searching", d: "Passed out but haven\u2019t landed the right job yet." },
      { l: "Working professional \u2014 looking to switch", d: "Employed but targeting better roles or companies." },
    ],
  },
  {
    id: 2, chip: "Career funnel", chipColor: "#0f766e", chipBg: "#ecfdf5",
    label: "Question 2 of 7",
    title: "Where does your journey feel most stuck right now?",
    sub: "Pick the one that feels most true today \u2014 be honest with yourself.",
    type: "single",
    opts: [
      { l: "No idea what career or role to aim for", d: "Too many options, or nothing feels like a clear fit." },
      { l: "Know my goal but lack real skills or projects", d: "The gap between where I am and what companies want is huge." },
      { l: "Have skills, but my applications get ignored", d: "Sending resumes everywhere and hearing nothing back." },
      { l: "Getting interviews, but not converting them to offers", d: "Making it to rounds but losing out at the end." },
      { l: "Can\u2019t even find the right opportunities to apply to", d: "Jobs are scattered, hidden, or just don\u2019t match my profile." },
    ],
  },
  {
    id: 3, chip: "Resume & ATS", chipColor: "#b45309", chipBg: "#fffbeb",
    label: "Question 3 of 7",
    title: "What\u2019s your biggest frustration when making your resume?",
    sub: "Select all that feel true \u2014 this directly shapes our AI Resume Builder.",
    type: "multi",
    opts: [
      { l: "I don\u2019t know what to write \u2014 I have no real projects or experience", d: "My resume feels empty even after 2\u20133 years of college." },
      { l: "I apply with the same resume everywhere and never get shortlisted", d: "No idea how to tailor it to each job description." },
      { l: "I suspect ATS is filtering me before any human sees my profile", d: "Keywords, formatting, and structure feel like a black box." },
      { l: "I get told my resume looks good, but still no callbacks", d: "Surface feedback that doesn\u2019t explain why it\u2019s failing." },
      { l: "I spend hours updating it for each role \u2014 it\u2019s exhausting", d: "Manual tailoring is a full-time job in itself." },
    ],
  },
  {
    id: 4, chip: "Job search", chipColor: "#1d3a8f", chipBg: "#eef1fd",
    label: "Question 4 of 7",
    title: "How do you currently hunt for jobs and internships?",
    sub: "Select every platform or method you\u2019re using \u2014 even if it\u2019s not working.",
    type: "multi-grid",
    opts: [
      { l: "LinkedIn" }, { l: "Naukri / Internshala" },
      { l: "College placement cell" }, { l: "Referrals from seniors" },
      { l: "Company career pages directly" }, { l: "Foundit / Indeed / others" },
      { l: "Hackathons & open source" }, { l: "Haven\u2019t started yet" },
    ],
  },
  {
    id: 5, chip: "Interview prep", chipColor: "#b45309", chipBg: "#fffbeb",
    label: "Question 5 of 7",
    title: "How confident are you walking into a job interview right now?",
    sub: "Rate honestly from 1 (completely unprepared) to 5 (fully confident).",
    type: "scale", min: 1, max: 5,
    scaleLabels: ["Totally unprepared", "Fully confident"],
  },
  {
    id: 6, chip: "Skill building", chipColor: "#0f766e", chipBg: "#ecfdf5",
    label: "Question 6 of 7",
    title: "What\u2019s stopping you from building the skills companies want?",
    sub: "Select everything that\u2019s getting in the way.",
    type: "multi",
    opts: [
      { l: "I don\u2019t know which skills are actually in demand for my target role", d: "Too much advice online \u2014 no clear signal on what to learn." },
      { l: "I learn theory but have no real project to show for it", d: "Certifications pile up, portfolio stays empty." },
      { l: "My college syllabus is years behind the industry", d: "Classes still teaching things companies stopped using." },
      { l: "I start learning but lose motivation and quit midway", d: "No structure, no accountability, no community." },
      { l: "Good learning resources cost money I don\u2019t have", d: "Quality bootcamps and courses are out of reach." },
      { l: "I have skills but can\u2019t communicate them to recruiters", d: "My LinkedIn, resume, and interviews don\u2019t reflect what I can do." },
    ],
  },
  {
    id: 7, chip: "Your voice", chipColor: "#dc2626", chipBg: "#fef2f2",
    label: "Question 7 of 7",
    title: "In your own words \u2014 what\u2019s the one thing that would change everything for you?",
    sub: "Forget categories. What\u2019s the real problem? Specific answers help us build things that actually matter.",
    type: "text",
    placeholder: "e.g. I\u2019ve done 4 courses on AI but have zero projects to show. Every internship wants 1 year of experience. I apply on 5 platforms every day and hear nothing. I don\u2019t even know if my resume is being read...",
  },
]

/* ─── Page ─────────────────────────────────────────── */

export default function StudentInsightsPage() {
  const [cur, setCur] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number | number[] | string>>(() => {
    const init: Record<number, number | number[] | string> = {}
    STEPS.forEach((s) => {
      if (s.type === "single" || s.type === "scale") init[s.id] = -1
      else if (s.type === "multi" || s.type === "multi-grid") init[s.id] = []
      else init[s.id] = ""
    })
    return init
  })
  const [userName, setUserName] = useState("")
  const [userCollege, setUserCollege] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [otherTexts, setOtherTexts] = useState<Record<number, string>>({})
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const step = STEPS[cur]
  const pct = (cur / STEPS.length) * 100

  function isValid() {
    if (step.type === "info") return userName.trim().length > 1 && userCollege.trim().length > 1
    const a = answers[step.id]
    if (step.type === "single" || step.type === "scale") return a !== -1
    if (step.type === "multi" || step.type === "multi-grid") return (a as number[]).length > 0
    if (step.type === "text") return (a as string).trim().length > 8
    return false
  }

  function pickSingle(i: number) {
    setAnswers((p) => ({ ...p, [step.id]: i }))
  }

  function toggleMulti(i: number) {
    setAnswers((p) => {
      const arr = [...(p[step.id] as number[])]
      const idx = arr.indexOf(i)
      if (idx === -1) arr.push(i); else arr.splice(idx, 1)
      return { ...p, [step.id]: arr }
    })
  }

  function setText(v: string) {
    setAnswers((p) => ({ ...p, [step.id]: v }))
  }

  async function goNext() {
    if (!isValid()) return
    if (cur < STEPS.length - 1) {
      setCur(cur + 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      // Submit
      setLoading(true)
      try {
        const mapped = STEPS.map((s) => {
          const a = answers[s.id]
          if (s.type === "single") return { question: s.title, answer: s.opts?.[a as number]?.l || "" }
          if (s.type === "multi" || s.type === "multi-grid") return { question: s.title, answer: (a as number[]).map((i) => s.opts?.[i]?.l || "").join(", ") }
          if (s.type === "scale") return { question: s.title, answer: `${a}/5` }
          return { question: s.title, answer: a as string }
        })

        await fetch("/api/student-insights", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: userName.trim(),
            college: userCollege.trim(),
            email: userEmail.trim() || null,
            current_situation: STEPS[1].opts?.[answers[1] as number]?.l || "",
            career_stuck_at: STEPS[2].opts?.[answers[2] as number]?.l || "",
            resume_frustrations: (answers[3] as number[]).map(i => STEPS[3].opts?.[i]?.l || "").filter(Boolean),
            job_search_methods: (answers[4] as number[]).map(i => STEPS[4].opts?.[i]?.l || "").filter(Boolean),
            interview_confidence: answers[5] !== -1 ? answers[5] : null,
            skill_blockers: (answers[6] as number[]).map(i => STEPS[6].opts?.[i]?.l || "").filter(Boolean),
            open_answer: (answers[7] as string).trim() || null,
            problem_categories: mapped.map((m) => m.answer).filter(Boolean),
            skill_rating: answers[5] !== -1 ? answers[5] : null,
            resume_problem: STEPS[3].opts?.[(answers[3] as number[])?.[0]]?.l || "",
            student_insight_text: (answers[7] as string) || mapped.map((m) => `${m.question}: ${m.answer}`).join(" | "),
          }),
        })
        setDone(true)
      } catch {
        // silent
      } finally {
        setLoading(false)
      }
    }
  }

  /* ─── Done screen ──────────────────────────── */
  if (done) {
    return (
      <div className="min-h-screen bg-[#fafbff] flex items-center justify-center px-5">
        <div className="max-w-[440px] w-full text-center">
          <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg" style={{ background: "linear-gradient(135deg, #1d3a8f, #3b5bdb)" }}>
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <h1 className="text-[24px] font-extrabold text-slate-900 tracking-[-0.03em] mb-3">Your insights are submitted</h1>
          <p className="text-[15px] text-slate-500 leading-relaxed mb-8 max-w-[360px] mx-auto">
            Thanks for sharing — every detail helps us build the right tools. We&apos;re using this to make Jobingen work better for students like you.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[14px] font-bold text-white px-6 py-3 rounded-xl shadow-[0_2px_8px_rgba(29,58,143,0.3)]"
            style={{ background: "linear-gradient(135deg, #1d3a8f, #3b5bdb)" }}
          >
            Explore Jobingen
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    )
  }

  /* ─── Survey wizard ────────────────────────── */
  return (
    <div className="min-h-screen bg-[#fafbff] font-sans">
      <Navbar />

      {/* Card */}
      <div className="max-w-[680px] mx-auto px-5 pt-[108px] pb-8 sm:pb-12">
        <div className="bg-white rounded-2xl border border-slate-200/60 shadow-[0_2px_12px_rgba(0,0,0,0.04)] overflow-hidden">
          {/* Progress bar */}
          <div className="h-1 bg-slate-100">
            <div className="h-full rounded-r-full transition-all duration-500 ease-out" style={{ width: `${pct}%`, background: "linear-gradient(90deg, #1d3a8f, #3b5bdb)" }} />
          </div>

          <div className="p-6 sm:p-8">
            {/* Chip + label */}
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider" style={{ background: step.chipBg, color: step.chipColor }}>
              {step.chip}
            </span>
            <p className="text-[12px] text-slate-400 font-medium mb-2 tracking-wide">{step.label}</p>

            {/* Question */}
            <h2 className="text-[20px] sm:text-[22px] font-extrabold text-slate-900 tracking-[-0.02em] leading-[1.3] mb-1.5">{step.title}</h2>
            <p className="text-[13px] text-slate-500 leading-[1.6] mb-6">{step.sub}</p>

            {/* ── Info (name + college) ──── */}
            {step.type === "info" && (
              <div className="flex flex-col gap-4">
                <div>
                  <label className="text-[13px] font-semibold text-slate-700 mb-1.5 block">Your Name <span className="text-red-400">*</span></label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full p-3.5 rounded-xl border border-slate-200 text-[14px] text-slate-800 outline-none transition-all focus:border-[#1d3a8f] focus:ring-2 focus:ring-[#1d3a8f]/10 placeholder:text-slate-400 font-[inherit]"
                  />
                </div>
                <div>
                  <label className="text-[13px] font-semibold text-slate-700 mb-1.5 block">College / Company <span className="text-red-400">*</span></label>
                  <input
                    type="text"
                    value={userCollege}
                    onChange={(e) => setUserCollege(e.target.value)}
                    placeholder="e.g. IIT Delhi, TCS, etc."
                    className="w-full p-3.5 rounded-xl border border-slate-200 text-[14px] text-slate-800 outline-none transition-all focus:border-[#1d3a8f] focus:ring-2 focus:ring-[#1d3a8f]/10 placeholder:text-slate-400 font-[inherit]"
                  />
                </div>
                <div>
                  <label className="text-[13px] font-semibold text-slate-700 mb-1.5 block">Email <span className="text-slate-400 font-normal">(optional)</span></label>
                  <input
                    type="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    placeholder="you@email.com"
                    className="w-full p-3.5 rounded-xl border border-slate-200 text-[14px] text-slate-800 outline-none transition-all focus:border-[#1d3a8f] focus:ring-2 focus:ring-[#1d3a8f]/10 placeholder:text-slate-400 font-[inherit]"
                  />
                </div>
              </div>
            )}

            {/* ── Single select ──────────── */}
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

            {/* ── Multi select ──────────── */}
            {(step.type === "multi" || step.type === "multi-grid") && (
              <div>
                <div className={step.type === "multi-grid" ? "grid grid-cols-1 sm:grid-cols-2 gap-2.5" : "flex flex-col gap-2.5"}>
                  {step.opts?.map((o, i) => {
                    const sel = (answers[step.id] as number[]).includes(i)
                    return (
                      <button key={i} onClick={() => toggleMulti(i)} className={`flex items-start gap-3 text-left p-3.5 rounded-xl border transition-all duration-200 ${sel ? "border-[#1d3a8f] bg-indigo-50/50" : "border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/50"}`}>
                        <div className={`w-[18px] h-[18px] rounded-[5px] border-2 mt-0.5 shrink-0 flex items-center justify-center transition-all ${sel ? "border-[#1d3a8f] bg-[#1d3a8f]" : "border-slate-300"}`}>
                          {sel && <svg width="10" height="10" fill="none" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                        </div>
                        <div>
                          <div className={`text-[14px] font-semibold leading-tight ${sel ? "text-[#1d3a8f]" : "text-slate-800"}`}>{o.l}</div>
                          {o.d && <div className="text-[12px] text-slate-400 mt-1 leading-relaxed">{o.d}</div>}
                        </div>
                      </button>
                    )
                  })}
                </div>
                {/* Other option */}
                <div className="mt-2.5">
                  <button
                    onClick={() => toggleMulti(99)}
                    className={`w-full flex items-start gap-3 text-left p-3.5 rounded-xl border transition-all duration-200 ${(answers[step.id] as number[]).includes(99) ? "border-[#1d3a8f] bg-indigo-50/50" : "border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/50"}`}
                  >
                    <div className={`w-[18px] h-[18px] rounded-[5px] border-2 mt-0.5 shrink-0 flex items-center justify-center transition-all ${(answers[step.id] as number[]).includes(99) ? "border-[#1d3a8f] bg-[#1d3a8f]" : "border-slate-300"}`}>
                      {(answers[step.id] as number[]).includes(99) && <svg width="10" height="10" fill="none" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                    </div>
                    <div className={`text-[14px] font-semibold leading-tight ${(answers[step.id] as number[]).includes(99) ? "text-[#1d3a8f]" : "text-slate-800"}`}>Other</div>
                  </button>
                  {(answers[step.id] as number[]).includes(99) && (
                    <input
                      type="text"
                      value={otherTexts[step.id] || ""}
                      onChange={(e) => setOtherTexts((p) => ({ ...p, [step.id]: e.target.value }))}
                      placeholder="Type your answer..."
                      className="w-full mt-2 p-3 rounded-xl border border-slate-200 text-[14px] text-slate-800 outline-none transition-all focus:border-[#1d3a8f] focus:ring-2 focus:ring-[#1d3a8f]/10 placeholder:text-slate-400 font-[inherit]"
                    />
                  )}
                </div>
              </div>
            )}

            {/* ── Scale ──────────────────── */}
            {step.type === "scale" && (
              <div>
                <div className="flex gap-2.5">
                  {Array.from({ length: (step.max || 5) - (step.min || 1) + 1 }, (_, i) => i + (step.min || 1)).map((v) => {
                    const sel = answers[step.id] === v
                    return (
                      <button key={v} onClick={() => pickSingle(v)} className={`flex-1 py-4 rounded-xl border text-center transition-all duration-200 ${sel ? "border-[#1d3a8f] bg-[#1d3a8f] text-white shadow-sm" : "border-slate-200/80 hover:border-slate-300 text-slate-500"}`}>
                        <div className={`text-[18px] font-extrabold ${sel ? "text-white" : "text-slate-600"}`}>{v}</div>
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

            {/* ── Text ───────────────────── */}
            {step.type === "text" && (
              <div>
                <textarea
                  value={answers[step.id] as string}
                  onChange={(e) => setText(e.target.value)}
                  placeholder={step.placeholder}
                  maxLength={800}
                  rows={5}
                  className="w-full p-4 rounded-xl border border-slate-200 text-[14px] text-slate-800 leading-[1.7] resize-none outline-none transition-all focus:border-[#1d3a8f] focus:ring-2 focus:ring-[#1d3a8f]/10 placeholder:text-slate-400 font-[inherit]"
                />
                <div className="text-right mt-1.5 text-[11px] text-slate-400">{(answers[step.id] as string).length} / 800</div>
              </div>
            )}

            {/* ── Navigation ─────────────── */}
            <div className="flex items-center justify-between mt-8">
              {cur > 0 ? (
                <button onClick={() => { setCur(cur - 1); window.scrollTo({ top: 0, behavior: "smooth" }) }} className="text-[13px] font-medium text-slate-500 hover:text-slate-800 transition-colors">
                  &larr; Back
                </button>
              ) : <span />}
              <button
                onClick={goNext}
                disabled={!isValid() || loading}
                className="text-[14px] font-semibold text-white px-6 py-2.5 rounded-xl transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 shadow-[0_2px_8px_rgba(29,58,143,0.25)]"
                style={{ background: "linear-gradient(135deg, #1d3a8f, #3b5bdb)" }}
              >
                {loading ? "Submitting..." : cur === STEPS.length - 1 ? "Submit \u2192" : "Continue \u2192"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
