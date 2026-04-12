"use client"

import { useState } from "react"
import Link from "next/link"
import { JobingenLogo } from "@/components/jobingen-logo"

/* ─── Step config ───────────────────────────────────── */

type Step = {
  id: number
  chip: string
  chipColor: string
  chipBg: string
  label: string
  title: string
  sub: string
  type: "single" | "multi" | "multi-grid" | "scale" | "text" | "combo" | "pricing"
  opts?: { l: string; d?: string }[]
  fields?: { key: string; label: string; placeholder: string; required?: boolean; type?: "dropdown" | "number"; opts?: string[] }[]
  placeholder?: string
  maxLen?: number
}

const TOTAL = 11

const STEPS: Step[] = [
  {
    id: 0, chip: "Basic Info", chipColor: "#1d3a8f", chipBg: "#eef1fd",
    label: `Step 1 of ${TOTAL}`,
    title: "Let\u2019s start with who you are",
    sub: "Your basic details help us create your profile on Jobingen.",
    type: "combo",
    fields: [
      { key: "full_name", label: "Full Name", placeholder: "e.g. Priya Sharma", required: true },
      { key: "email", label: "Email Address", placeholder: "you@email.com" },
      { key: "phone", label: "Phone Number", placeholder: "e.g. +91 98765 43210", required: true },
      { key: "location", label: "City / Location", placeholder: "e.g. Bangalore, Delhi, Remote" },
    ],
  },
  {
    id: 1, chip: "Expertise", chipColor: "#7c3aed", chipBg: "#f5f3ff",
    label: `Step 2 of ${TOTAL}`,
    title: "What\u2019s your domain of expertise?",
    sub: "Select the area where you can offer the most valuable guidance.",
    type: "single",
    opts: [
      { l: "Software Development", d: "Web, mobile, backend, DevOps, cloud" },
      { l: "Data Science", d: "ML, AI, analytics, data engineering" },
      { l: "Product Management", d: "Product strategy, roadmaps, user research" },
      { l: "Finance", d: "Banking, fintech, CA, investment" },
      { l: "Marketing", d: "Digital marketing, SEO, growth, branding" },
      { l: "HR & People Ops", d: "Talent acquisition, culture, org design" },
      { l: "Government Exams", d: "UPSC, SSC, banking exams, state PSC" },
      { l: "Design / UI UX", d: "Product design, visual design, research" },
      { l: "Consulting", d: "Strategy, management, operations consulting" },
    ],
  },
  {
    id: 2, chip: "Role Info", chipColor: "#0f766e", chipBg: "#ecfdf5",
    label: `Step 3 of ${TOTAL}`,
    title: "Tell us about your professional background",
    sub: "This helps students understand your credibility and experience level.",
    type: "combo",
    fields: [
      { key: "job_title", label: "Current Role / Job Title", placeholder: "e.g. Senior Software Engineer at Google" },
      { key: "experience", label: "Years of Experience", placeholder: "Select...", type: "dropdown", opts: ["0\u20132 years", "3\u20135 years", "5\u201310 years", "10+ years"] },
      { key: "linkedin", label: "LinkedIn Profile URL", placeholder: "https://linkedin.com/in/your-profile" },
    ],
  },
  {
    id: 3, chip: "Introduction", chipColor: "#b45309", chipBg: "#fffbeb",
    label: `Step 4 of ${TOTAL}`,
    title: "Write a short introduction about yourself",
    sub: "This will appear on your profile card. Keep it concise and impactful (2\u20133 lines).",
    type: "text",
    placeholder: "e.g. I\u2019m a Senior Product Manager at Razorpay with 6+ years in fintech. I\u2019ve mentored 50+ students on transitioning into PM roles and love helping people crack product interviews.",
    maxLen: 500,
  },
  {
    id: 4, chip: "Bio", chipColor: "#1d3a8f", chipBg: "#eef1fd",
    label: `Step 5 of ${TOTAL}`,
    title: "Write your professional bio",
    sub: "Share your career journey, achievements, and what makes you great at guiding others.",
    type: "text",
    placeholder: "e.g.\n\u2022 Started as an intern at a Series-A startup, now leading product at a unicorn\n\u2022 Helped 3 companies launch products from 0 to 1\n\u2022 Regular speaker at product conferences\n\u2022 Passionate about helping freshers break into product management\n\u2022 I believe in practical, no-BS mentoring",
    maxLen: 1500,
  },
  {
    id: 5, chip: "Topics", chipColor: "#dc2626", chipBg: "#fef2f2",
    label: `Step 6 of ${TOTAL}`,
    title: "What areas can you help with?",
    sub: "Select all the topics where you can provide valuable guidance.",
    type: "multi-grid",
    opts: [
      { l: "Resume Review" },
      { l: "Interview Preparation" },
      { l: "Career Guidance" },
      { l: "Portfolio Review" },
      { l: "Skill Roadmap" },
      { l: "Job Switching Strategy" },
      { l: "Mock Interviews" },
      { l: "LinkedIn Optimization" },
      { l: "Salary Negotiation" },
    ],
  },
  {
    id: 6, chip: "Pricing", chipColor: "#0f766e", chipBg: "#ecfdf5",
    label: `Step 7 of ${TOTAL}`,
    title: "Session pricing & duration",
    sub: "Base rate is \u20B9149 for 30 min. Adjust the slider to set your preferred session length. You can also share your own pricing expectation.",
    type: "pricing",
  },
  {
    id: 7, chip: "Format", chipColor: "#7c3aed", chipBg: "#f5f3ff",
    label: `Step 8 of ${TOTAL}`,
    title: "How do you prefer to conduct sessions?",
    sub: "Select all formats you\u2019re comfortable with.",
    type: "multi",
    opts: [
      { l: "1:1 Video Session", d: "Personal mentoring via Google Meet / Zoom" },
      { l: "Group Session", d: "Guide multiple students together in a live session" },
      { l: "Chat-based Mentorship", d: "Async guidance over text \u2014 flexible and low-commitment" },
    ],
  },
  {
    id: 8, chip: "Availability", chipColor: "#0891b2", chipBg: "#ecfeff",
    label: `Step 9 of ${TOTAL}`,
    title: "When are you mostly available?",
    sub: "Select the days you\u2019re typically free for sessions. This helps us match you with the right mentees.",
    type: "multi-grid",
    opts: [
      { l: "Monday" }, { l: "Tuesday" }, { l: "Wednesday" }, { l: "Thursday" },
      { l: "Friday" }, { l: "Saturday" }, { l: "Sunday" },
    ],
  },
  {
    id: 9, chip: "Motivation", chipColor: "#b45309", chipBg: "#fffbeb",
    label: `Step 10 of ${TOTAL}`,
    title: "Why do you want to mentor?",
    sub: "This helps us understand your philosophy and match you with the right students.",
    type: "text",
    placeholder: "e.g.\nI struggled a lot during my own placement season and had no guidance. I want to make sure the next generation doesn\u2019t face the same confusion. I\u2019ve helped juniors at my company land offers at top companies, and I want to scale that impact through Jobingen.",
    maxLen: 1000,
  },
  {
    id: 10, chip: "Almost done!", chipColor: "#16a34a", chipBg: "#f0fdf4",
    label: `Step 11 of ${TOTAL}`,
    title: "Anything else you\u2019d like us to know?",
    sub: "Optional \u2014 share your portfolio link, personal website, or any other details.",
    type: "combo",
    fields: [
      { key: "portfolio_url", label: "Portfolio / Website (optional)", placeholder: "https://your-portfolio.com" },
      { key: "additional_note", label: "Additional Note (optional)", placeholder: "Any other details you want to share..." },
    ],
  },
]

/* ─── Pricing config ────────────────────────────────── */

const MIN_DURATION = 15
const MAX_DURATION = 120
const MIN_PRICE = 49
const MAX_PRICE = 2000

/* ─── Page ──────────────────────────────────────────── */

export default function BecomeMentorPage() {
  const [cur, setCur] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number | number[] | string>>(() => {
    const init: Record<number, number | number[] | string> = {}
    STEPS.forEach(s => {
      if (s.type === "single" || s.type === "scale") init[s.id] = -1
      else if (s.type === "multi" || s.type === "multi-grid") init[s.id] = []
      else if (s.type === "pricing") init[s.id] = 30
      else init[s.id] = ""
    })
    return init
  })
  const [comboFields, setComboFields] = useState<Record<string, string>>({})
  const [pricingExpectation, setPricingExpectation] = useState("")
  const [mentorPrice, setMentorPrice] = useState(149)
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const step = STEPS[cur]
  const totalSteps = STEPS.length
  const pct = ((cur + 1) / totalSteps) * 100

  function isValid(): boolean {
    // Only Name and Phone are required (step 0 combo fields marked required)
    // All other steps are optional — always valid
    if (step.type === "combo") {
      const hasRequired = (step.fields || []).some(f => f.required)
      if (!hasRequired) return true
      return (step.fields || []).filter(f => f.required).every(f => (comboFields[f.key] || "").trim().length > 0)
    }
    // All non-combo steps are optional
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
      setLoading(true)
      const sliderMin = answers[6] as number
      try {
        await fetch("/api/become-mentor", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            full_name: comboFields.full_name?.trim() || "",
            email: comboFields.email?.trim() || "",
            phone: comboFields.phone?.trim() || "",
            location: comboFields.location?.trim() || null,
            domain: STEPS[1].opts?.[answers[1] as number]?.l || "",
            job_title: comboFields.job_title?.trim() || "",
            experience: comboFields.experience || "",
            linkedin: comboFields.linkedin?.trim() || null,
            short_intro: (answers[3] as string).trim(),
            professional_bio: (answers[4] as string).trim(),
            mentorship_topics: (answers[5] as number[]).map(i => STEPS[5].opts?.[i]?.l || "").filter(Boolean),
            session_price: mentorPrice,
            session_duration: `${sliderMin} min`,
            pricing_expectation: pricingExpectation.trim() || null,
            mentorship_format: (answers[7] as number[]).map(i => STEPS[7].opts?.[i]?.l || "").filter(Boolean),
            available_days: (answers[8] as number[]).map(i => STEPS[8].opts?.[i]?.l || "").filter(Boolean),
            motivation: (answers[9] as string).trim(),
            portfolio_url: comboFields.portfolio_url?.trim() || null,
            additional_note: comboFields.additional_note?.trim() || null,
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
        <div className="max-w-[460px] w-full text-center">
          <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg" style={{ background: "linear-gradient(135deg, #7c3aed, #3b5bdb)" }}>
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <h1 className="text-[24px] font-extrabold text-slate-900 tracking-[-0.03em] mb-3">
            Application Submitted!
          </h1>
          <p className="text-[15px] text-slate-500 leading-relaxed mb-3 max-w-[400px] mx-auto">
            Thank you for applying to become a mentor on Jobingen. Our team will review your profile and get back to you soon.
          </p>
          <p className="text-[14px] text-[#7c3aed] font-bold mb-8">
            One mentor. Many lives changed.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[14px] font-bold text-white px-6 py-3 rounded-xl shadow-[0_2px_8px_rgba(124,58,237,0.3)]"
            style={{ background: "linear-gradient(135deg, #7c3aed, #3b5bdb)" }}
          >
            Back to Home
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    )
  }

  /* ─── Wizard ──────────────────────────────── */
  const sliderMin = (answers[6] as number) || 30

  return (
    <div className="min-h-screen bg-[#fafbff] font-sans">
      {/* Navbar */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200/60 sticky top-0 z-50">
        <div className="max-w-[680px] mx-auto px-5 h-[60px] flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <JobingenLogo height={70} />
          </Link>
          <span className="text-[11px] font-bold text-[#7c3aed] bg-purple-50 px-3 py-1 rounded-full border border-purple-200/40 uppercase tracking-wider">
            Become a Mentor
          </span>
        </div>
      </header>

      {/* Card */}
      <div className="max-w-[680px] mx-auto px-5 py-8 sm:py-12">
        {/* Hero — only on first step */}
        {cur === 0 && (
          <div className="mb-8 rounded-2xl overflow-hidden border border-slate-200/60 shadow-[0_4px_24px_rgba(124,58,237,0.08)]">
            {/* Top gradient banner */}
            <div className="relative px-6 sm:px-8 pt-8 pb-6" style={{ background: "linear-gradient(135deg, #1e1b4b, #312e81, #4c1d95)" }}>
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #7c3aed 0%, transparent 50%), radial-gradient(circle at 80% 50%, #3b82f6 0%, transparent 50%)" }} />
              <div className="relative">
                <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-3 py-1 mb-4">
                  <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /></svg>
                  <span className="text-[11px] font-bold text-white/80 uppercase tracking-wider">Mentor Program</span>
                </div>
                <h1 className="text-[22px] sm:text-[26px] font-black text-white tracking-[-0.03em] leading-[1.2] mb-2">
                  Your Time Has Value.<br />Your Journey Can Change Someone&rsquo;s Direction.
                </h1>
                <p className="text-[13px] text-white/60 leading-[1.6] max-w-[440px]">
                  You&rsquo;ve been where students are today — confused, searching, figuring it out alone. Now you can change that.
                </p>
              </div>
            </div>

            {/* Feature points */}
            <div className="px-6 sm:px-8 py-5 bg-white">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">As a Mentor, you</p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                {[
                  { icon: "M12 2L2 7l10 5 10-5-10-5Z", text: "Share real-world experience & career roadmap" },
                  { icon: "M22 11.08V12a10 10 0 1 1-5.93-9.14", text: "Guide students toward right opportunities" },
                  { icon: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z", text: "Answer questions no classroom ever does" },
                  { icon: "M22 2L11 13M22 2l-7 20-4-9-9-4 20-7Z", text: "Give direction — on your own terms" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ background: "linear-gradient(135deg, #f5f3ff, #eef1fd)" }}>
                      <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={item.icon} /></svg>
                    </div>
                    <span className="text-[12px] font-medium text-slate-600 leading-snug">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom CTA strip */}
            <div className="px-6 sm:px-8 py-3.5 border-t border-slate-100" style={{ background: "linear-gradient(90deg, #faf5ff, #eef1fd)" }}>
              <p className="text-[13px] text-center">
                <span className="font-bold text-[#7c3aed]">Your experience is their shortcut.</span>
                <span className="text-slate-400 mx-1.5">|</span>
                <span className="font-medium text-slate-500">Fill the form below to get started</span>
              </p>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl border border-slate-200/60 shadow-[0_2px_12px_rgba(0,0,0,0.04)] overflow-hidden">

          {/* Progress bar */}
          <div className="h-1 bg-slate-100">
            <div
              className="h-full rounded-r-full transition-all duration-500 ease-out"
              style={{ width: `${pct}%`, background: "linear-gradient(90deg, #7c3aed, #3b5bdb)" }}
            />
          </div>

          <div className="p-6 sm:p-8">
            {/* Chip + progress */}
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
                    <button key={i} onClick={() => pickSingle(i)} className={`flex items-start gap-3 text-left p-3.5 rounded-xl border transition-all duration-200 ${sel ? "border-[#7c3aed] bg-purple-50/50" : "border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/50"}`}>
                      <div className={`w-[18px] h-[18px] rounded-full border-2 mt-0.5 shrink-0 flex items-center justify-center transition-all ${sel ? "border-[#7c3aed] bg-[#7c3aed]" : "border-slate-300"}`}>
                        {sel && <div className="w-[7px] h-[7px] rounded-full bg-white" />}
                      </div>
                      <div>
                        <div className={`text-[14px] font-semibold leading-tight ${sel ? "text-[#7c3aed]" : "text-slate-800"}`}>{o.l}</div>
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
                    <button key={i} onClick={() => toggleMulti(i)} className={`flex items-start gap-3 text-left p-3.5 rounded-xl border transition-all duration-200 ${sel ? "border-[#7c3aed] bg-purple-50/50" : "border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/50"}`}>
                      <div className={`w-[18px] h-[18px] rounded-[5px] border-2 mt-0.5 shrink-0 flex items-center justify-center transition-all ${sel ? "border-[#7c3aed] bg-[#7c3aed]" : "border-slate-300"}`}>
                        {sel && <svg width="10" height="10" fill="none" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                      </div>
                      <div>
                        <div className={`text-[14px] font-semibold leading-tight ${sel ? "text-[#7c3aed]" : "text-slate-800"}`}>{o.l}</div>
                        {o.d && <div className="text-[12px] text-slate-400 mt-1 leading-relaxed">{o.d}</div>}
                      </div>
                    </button>
                  )
                })}
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
                  className="w-full p-4 rounded-xl border border-slate-200 text-[14px] text-slate-800 outline-none transition-all focus:border-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed]/10 placeholder:text-slate-400 font-[inherit] resize-y leading-[1.7]"
                />
                <div className="flex justify-between mt-2 px-1">
                  <span className="text-[11px] text-slate-400">
                    {(answers[step.id] as string).length === 0
                      ? "Optional \u2014 you can skip this step"
                      : "\u00A0"
                    }
                  </span>
                  <span className={`text-[11px] font-semibold ${(answers[step.id] as string).length > (step.maxLen || 2000) * 0.9 ? "text-amber-500" : "text-slate-300"}`}>
                    {(answers[step.id] as string).length}/{step.maxLen || 2000}
                  </span>
                </div>
              </div>
            )}

            {/* ── Pricing (custom step) ────── */}
            {step.type === "pricing" && (
              <div>
                {/* Duration slider */}
                <div className="mb-7">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-[13px] font-semibold text-slate-700">Session Duration</label>
                    <span className="text-[20px] font-black text-[#7c3aed]">{sliderMin} <span className="text-[12px] font-bold text-slate-400">min</span></span>
                  </div>
                  <input
                    type="range"
                    min={MIN_DURATION}
                    max={MAX_DURATION}
                    step={5}
                    value={sliderMin}
                    onChange={e => setAnswers(p => ({ ...p, [step.id]: Number(e.target.value) }))}
                    className="w-full h-2 rounded-full appearance-none cursor-pointer"
                    style={{ accentColor: "#7c3aed", background: `linear-gradient(to right, #7c3aed ${((sliderMin - MIN_DURATION) / (MAX_DURATION - MIN_DURATION)) * 100}%, #e2e8f0 0%)` }}
                  />
                  <div className="flex justify-between mt-1.5 px-0.5">
                    <span className="text-[11px] text-slate-400 font-medium">{MIN_DURATION} min</span>
                    <span className="text-[11px] text-slate-400 font-medium">{MAX_DURATION} min</span>
                  </div>
                  {/* Quick presets */}
                  <div className="flex gap-2 mt-3">
                    {[15, 30, 45, 60, 90, 120].map(m => (
                      <button
                        key={m}
                        onClick={() => setAnswers(p => ({ ...p, [step.id]: m }))}
                        className={`flex-1 py-1.5 rounded-lg border text-center transition-all text-[11px] font-bold font-[inherit] cursor-pointer ${sliderMin === m ? "border-[#7c3aed] bg-purple-50 text-[#7c3aed]" : "border-slate-200 text-slate-400 hover:border-slate-300"}`}
                      >
                        {m}m
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price slider */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-[13px] font-semibold text-slate-700">Your Price</label>
                    <span className="text-[20px] font-black text-[#16a34a]">{"\u20B9"}{mentorPrice}</span>
                  </div>
                  <input
                    type="range"
                    min={MIN_PRICE}
                    max={MAX_PRICE}
                    step={10}
                    value={mentorPrice}
                    onChange={e => setMentorPrice(Number(e.target.value))}
                    className="w-full h-2 rounded-full appearance-none cursor-pointer"
                    style={{ accentColor: "#16a34a", background: `linear-gradient(to right, #16a34a ${((mentorPrice - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100}%, #e2e8f0 0%)` }}
                  />
                  <div className="flex justify-between mt-1.5 px-0.5">
                    <span className="text-[11px] text-slate-400 font-medium">{"\u20B9"}{MIN_PRICE}</span>
                    <span className="text-[11px] text-slate-400 font-medium">{"\u20B9"}{MAX_PRICE}</span>
                  </div>
                  {/* Quick presets */}
                  <div className="flex gap-2 mt-3">
                    {[99, 149, 299, 499, 999, 1499].map(p => (
                      <button
                        key={p}
                        onClick={() => setMentorPrice(p)}
                        className={`flex-1 py-1.5 rounded-lg border text-center transition-all text-[11px] font-bold font-[inherit] cursor-pointer ${mentorPrice === p ? "border-[#16a34a] bg-green-50 text-[#16a34a]" : "border-slate-200 text-slate-400 hover:border-slate-300"}`}
                      >
                        {"\u20B9"}{p}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Summary card */}
                <div className="bg-gradient-to-r from-purple-50 to-green-50 rounded-xl p-5 mb-6 border border-purple-100/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <div className="text-[28px] font-black text-[#7c3aed] leading-none">{sliderMin}</div>
                      <div className="text-[13px] font-bold text-slate-400">min session</div>
                    </div>
                    <div className="text-[11px] font-bold text-slate-300">for</div>
                    <div className="flex items-baseline gap-1">
                      <div className="text-[28px] font-black text-[#16a34a] leading-none">{"\u20B9"}{mentorPrice}</div>
                    </div>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-2 text-center">
                    That&apos;s {"\u20B9"}{Math.round(mentorPrice / sliderMin * 10) / 10}/min &middot; You can always adjust later
                  </div>
                </div>

                {/* Expectation box */}
                <div>
                  <label className="text-[13px] font-semibold text-slate-700 mb-1.5 block">
                    What&apos;s your expectation for the session charges?
                    <span className="text-slate-400 font-normal"> (optional)</span>
                  </label>
                  <textarea
                    value={pricingExpectation}
                    onChange={e => { if (e.target.value.length <= 500) setPricingExpectation(e.target.value) }}
                    placeholder="e.g. I think ₹299 for a 30-min session would be fair given my 8+ years of experience. Open to discussion based on session type (1:1 vs group)."
                    rows={3}
                    className="w-full p-3.5 rounded-xl border border-slate-200 text-[14px] text-slate-800 outline-none transition-all focus:border-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed]/10 placeholder:text-slate-400 font-[inherit] resize-y leading-[1.7]"
                  />
                  <div className="flex justify-end mt-1 px-1">
                    <span className={`text-[11px] font-semibold ${pricingExpectation.length > 450 ? "text-amber-500" : "text-slate-300"}`}>
                      {pricingExpectation.length}/500
                    </span>
                  </div>
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
                        className="w-full p-3.5 rounded-xl border border-slate-200 text-[14px] text-slate-800 outline-none transition-all focus:border-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed]/10 font-[inherit] bg-white appearance-none cursor-pointer"
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
                    ) : f.type === "number" ? (
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[14px] text-slate-400 font-semibold">{"\u20B9"}</span>
                        <input
                          type="number"
                          value={comboFields[f.key] || ""}
                          onChange={e => setComboFields(p => ({ ...p, [f.key]: e.target.value }))}
                          placeholder={f.placeholder}
                          className="w-full p-3.5 pl-8 rounded-xl border border-slate-200 text-[14px] text-slate-800 outline-none transition-all focus:border-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed]/10 placeholder:text-slate-400 font-[inherit]"
                        />
                      </div>
                    ) : (
                      <input
                        type="text"
                        value={comboFields[f.key] || ""}
                        onChange={e => setComboFields(p => ({ ...p, [f.key]: e.target.value }))}
                        placeholder={f.placeholder}
                        className="w-full p-3.5 rounded-xl border border-slate-200 text-[14px] text-slate-800 outline-none transition-all focus:border-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed]/10 placeholder:text-slate-400 font-[inherit]"
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
                className={`inline-flex items-center gap-2 text-[14px] font-bold px-7 py-3 rounded-xl transition-all font-[inherit] border-none ${isValid() && !loading ? "text-white cursor-pointer shadow-[0_2px_8px_rgba(124,58,237,0.25)]" : "text-white/60 cursor-not-allowed"}`}
                style={{ background: isValid() && !loading ? "linear-gradient(135deg, #7c3aed, #3b5bdb)" : "#c7d2fe" }}
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full inline-block" style={{ animation: "mfspin .6s linear infinite" }} />
                    Submitting...
                  </>
                ) : cur === totalSteps - 1 ? (
                  <>
                    Apply as Mentor
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
                background: i < cur ? "#7c3aed" : i === cur ? "#3b5bdb" : "#e2e8f0",
              }}
            />
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `@keyframes mfspin{to{transform:rotate(360deg)}}` }} />
    </div>
  )
}
