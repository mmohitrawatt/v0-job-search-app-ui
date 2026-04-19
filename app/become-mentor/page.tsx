"use client"

import { useState, useRef, ChangeEvent } from "react"
import Link from "next/link"
import { JobingenLogo } from "@/components/jobingen-logo"
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

/* ─── Field icon map ────────────────────────────────── */

const FIELD_ICONS: Record<string, string> = {
  full_name: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z",
  email: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2ZM22 6l-10 7L2 6",
  phone: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z",
  location: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0ZM12 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z",
  job_title: "M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16M4 10h16a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2Z",
  linkedin: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6ZM2 9h4v12H2ZM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z",
  portfolio_url: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",
  additional_note: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8ZM14 2v6h6M16 13H8M16 17H8M10 9H8",
}

/* ─── Domain emoji map ──────────────────────────────── */
const DOMAIN_EMOJI: Record<string, string> = {
  "Software Development": "💻",
  "Data Science": "📊",
  "Product Management": "🗂️",
  "Finance": "💹",
  "Marketing": "📣",
  "HR & People Ops": "🤝",
  "Government Exams": "📝",
  "Design / UI UX": "🎨",
  "Consulting": "🏛️",
}

/* ─── Topic emoji map ───────────────────────────────── */
const TOPIC_EMOJI: Record<string, string> = {
  "Resume Review": "📄",
  "Interview Preparation": "🎯",
  "Career Guidance": "🧭",
  "Portfolio Review": "🖼️",
  "Skill Roadmap": "🗺️",
  "Job Switching Strategy": "🔄",
  "Mock Interviews": "🎤",
  "LinkedIn Optimization": "🔗",
  "Salary Negotiation": "💰",
}

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
  const [photo, setPhoto] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState("")
  const [photoError, setPhotoError] = useState("")
  const photoRef = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const step = STEPS[cur]
  const totalSteps = STEPS.length
  const pct = ((cur + 1) / totalSteps) * 100

  function handlePhoto(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setPhoto(file)
    setPhotoPreview(URL.createObjectURL(file))
    setPhotoError("")
  }

  function isValid(): boolean {
    if (step.type === "combo") {
      const hasRequired = (step.fields || []).some(f => f.required)
      if (!hasRequired) return true
      const fieldsOk = (step.fields || []).filter(f => f.required).every(f => (comboFields[f.key] || "").trim().length > 0)
      // On step 0, photo is also required
      if (step.id === 0) return fieldsOk && !!photo
      return fieldsOk
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
      setLoading(true)
      const sliderMin = answers[6] as number
      try {
        const fd = new FormData()
        fd.append("data", JSON.stringify({
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
        }))
        if (photo) fd.append("photo", photo)
        await fetch("/api/become-mentor", { method: "POST", body: fd })
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
    const mentorName = comboFields.full_name?.trim().split(" ")[0] || ""
    return (
      <div className="min-h-screen flex items-center justify-center px-5" style={{ background: "linear-gradient(135deg, #faf5ff 0%, #f0f4ff 100%)" }}>
        <div className="max-w-[480px] w-full text-center">
          {/* Animated check circle */}
          <div className="relative w-24 h-24 mx-auto mb-8">
            <div className="absolute inset-0 rounded-full opacity-20 animate-ping" style={{ background: "linear-gradient(135deg, #7c3aed, #3b5bdb)" }} />
            <div className="relative w-24 h-24 rounded-full flex items-center justify-center shadow-[0_8px_32px_rgba(124,58,237,0.3)]" style={{ background: "linear-gradient(135deg, #7c3aed, #3b5bdb)" }}>
              <svg width="38" height="38" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
          </div>

          <h1 className="text-[28px] font-black text-slate-900 tracking-[-0.03em] mb-3 leading-tight">
            {mentorName ? `You're all set, ${mentorName}!` : "Application Submitted!"}
          </h1>
          <p className="text-[15px] text-slate-500 leading-relaxed mb-3 max-w-[400px] mx-auto">
            Thank you for applying to become a mentor on Jobingen. Our team will review your profile and get back to you within 2-3 business days.
          </p>
          <p className="text-[14px] font-bold mb-10" style={{ color: "#7c3aed" }}>
            One mentor. Many lives changed.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[14px] font-bold text-white px-7 py-3.5 rounded-xl shadow-[0_4px_16px_rgba(124,58,237,0.3)] transition-all hover:shadow-[0_6px_20px_rgba(124,58,237,0.4)] hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg, #7c3aed, #3b5bdb)" }}
            >
              Back to Home
              <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/mentors"
              className="inline-flex items-center gap-2 text-[14px] font-bold text-slate-700 px-7 py-3.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-all"
            >
              View Mentors
              <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  /* ─── Wizard ──────────────────────────────── */
  const sliderMin = (answers[6] as number) || 30

  return (
    <div className="min-h-screen font-sans" style={{ background: "linear-gradient(135deg, #faf5ff 0%, #f0f4ff 60%, #f8faff 100%)" }}>
      <Navbar />

      {/* ── Two-column layout on desktop ── */}
      <div className="flex min-h-screen pt-[108px]">

        {/* ── LEFT SIDEBAR (desktop only) ── */}
        <aside className="hidden md:flex flex-col w-72 shrink-0 sticky top-0 h-screen overflow-y-auto border-r border-slate-200/60 bg-white/70 backdrop-blur-xl px-5 py-6">

          {/* Logo + tagline */}
          <div className="mb-6">
            <Link href="/" className="inline-flex items-center mb-2">
              <JobingenLogo height={68} />
            </Link>
            <p className="text-[12px] text-slate-400 font-medium leading-snug mt-1">
              Share your experience.<br />Shape someone&apos;s career.
            </p>
          </div>

          {/* Step list */}
          <div className="flex flex-col gap-0.5 mb-6 flex-1">
            {STEPS.map((s, i) => {
              const isCompleted = i < cur
              const isCurrent = i === cur
              const isUpcoming = i > cur
              return (
                <div
                  key={s.id}
                  className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all ${
                    isCurrent ? "bg-purple-50 border border-purple-100" : "border border-transparent"
                  }`}
                >
                  {/* Step number / check */}
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-[10px] font-black transition-all ${
                    isCompleted
                      ? "bg-[#7c3aed]"
                      : isCurrent
                      ? "bg-[#7c3aed] shadow-[0_0_0_3px_rgba(124,58,237,0.15)]"
                      : "bg-slate-100"
                  }`}>
                    {isCompleted ? (
                      <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    ) : (
                      <span className={isCurrent ? "text-white" : "text-slate-400"}>{i + 1}</span>
                    )}
                  </div>

                  {/* Label */}
                  <span className={`text-[12px] leading-tight transition-all ${
                    isCompleted
                      ? "text-slate-400 line-through"
                      : isCurrent
                      ? "text-[#7c3aed] font-bold"
                      : isUpcoming
                      ? "text-slate-400 font-medium"
                      : ""
                  }`}>
                    {s.chip}
                  </span>

                  {isCurrent && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#7c3aed]" />
                  )}
                </div>
              )
            })}
          </div>

          {/* Testimonial card */}
          <div className="rounded-2xl border border-purple-100 bg-gradient-to-br from-purple-50 to-indigo-50 p-4">
            <div className="text-[22px] leading-none mb-2 text-[#7c3aed] opacity-60">&ldquo;</div>
            <p className="text-[12px] text-slate-600 leading-relaxed italic mb-3">
              The platform gave me a way to give back. First session changed a student&apos;s direction completely.
            </p>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-300 to-indigo-400 flex items-center justify-center text-[10px] font-black text-white">
                SP
              </div>
              <div>
                <div className="text-[11px] font-bold text-slate-700">Sonic Payeng</div>
                <div className="text-[10px] text-slate-400">Dell Technologies</div>
              </div>
            </div>
          </div>
        </aside>

        {/* ── RIGHT FORM AREA ── */}
        <main className="flex-1 flex flex-col items-center px-4 md:px-8 py-6 md:py-10">
          <div className="w-full max-w-[540px]">

            {/* Desktop header — logo hidden (in sidebar), show "Become a Mentor" badge */}
            <div className="hidden md:flex items-center justify-between mb-6">
              <div>
                <span className="text-[11px] font-bold text-[#7c3aed] bg-purple-50 px-3 py-1 rounded-full border border-purple-200/50 uppercase tracking-wider">
                  Mentor Program
                </span>
              </div>
              <span className="text-[12px] font-semibold text-slate-400">
                Step {cur + 1} of {TOTAL} &mdash; {Math.round(pct)}% complete
              </span>
            </div>

            {/* Form card */}
            <div
              className="bg-white rounded-2xl border border-slate-100 overflow-hidden"
              style={{ boxShadow: "0 4px 32px rgba(124,58,237,0.06), 0 1px 4px rgba(0,0,0,0.04)" }}
            >

              {/* Progress bar (inside card, top) */}
              <div className="h-[3px] bg-slate-100">
                <div
                  className="h-full rounded-r-full transition-all duration-500 ease-out"
                  style={{ width: `${pct}%`, background: "linear-gradient(90deg, #7c3aed, #3b5bdb)" }}
                />
              </div>

              <div className="p-6 md:p-8">

                {/* Step header */}
                <div className="mb-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="inline-flex items-center text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider"
                      style={{ background: step.chipBg, color: step.chipColor }}
                    >
                      {step.chip}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">
                      {step.label}
                    </span>
                  </div>
                  <h2 className="text-[22px] md:text-[24px] font-black text-slate-900 tracking-[-0.03em] leading-[1.25] mb-1.5">
                    {step.title}
                  </h2>
                  <p className="text-[13px] text-slate-500 leading-[1.65]">{step.sub}</p>
                </div>

                {/* ── Single Select ─────────────────────── */}
                {step.type === "single" && (
                  <div className="flex flex-col gap-2">
                    {step.opts?.map((o, i) => {
                      const sel = answers[step.id] === i
                      return (
                        <button
                          key={i}
                          onClick={() => pickSingle(i)}
                          className={`flex items-center gap-3 text-left px-4 py-3.5 rounded-xl border-2 transition-all duration-200 cursor-pointer font-[inherit] ${
                            sel
                              ? "border-[#7c3aed] bg-purple-50/60"
                              : "border-slate-100 hover:border-slate-200 hover:bg-slate-50/50 bg-slate-50/30"
                          }`}
                          style={sel ? { borderLeftWidth: "4px" } : {}}
                        >
                          {/* Emoji prefix */}
                          <span className="text-[18px] w-7 text-center shrink-0">
                            {DOMAIN_EMOJI[o.l] || "•"}
                          </span>
                          <div className="flex-1">
                            <div className={`text-[13px] font-semibold leading-tight ${sel ? "text-[#7c3aed]" : "text-slate-800"}`}>{o.l}</div>
                            {o.d && <div className="text-[11px] text-slate-400 mt-0.5 leading-snug">{o.d}</div>}
                          </div>
                          <div className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center transition-all ${sel ? "border-[#7c3aed] bg-[#7c3aed]" : "border-slate-300"}`}>
                            {sel && <div className="w-[5px] h-[5px] rounded-full bg-white" />}
                          </div>
                        </button>
                      )
                    })}
                  </div>
                )}

                {/* ── Multi Select / Grid ──────────────── */}
                {(step.type === "multi" || step.type === "multi-grid") && (
                  <div className={step.type === "multi-grid" ? "grid grid-cols-1 sm:grid-cols-2 gap-2" : "flex flex-col gap-2"}>
                    {step.opts?.map((o, i) => {
                      const sel = (answers[step.id] as number[]).includes(i)
                      const emoji = TOPIC_EMOJI[o.l]
                      return (
                        <button
                          key={i}
                          onClick={() => toggleMulti(i)}
                          className={`flex items-center gap-3 text-left px-4 py-3.5 rounded-xl border-2 transition-all duration-200 cursor-pointer font-[inherit] ${
                            sel
                              ? "border-[#7c3aed] bg-purple-50/60"
                              : "border-slate-100 hover:border-slate-200 hover:bg-slate-50/50 bg-slate-50/30"
                          }`}
                          style={sel ? { borderLeftWidth: "4px" } : {}}
                        >
                          {emoji && (
                            <span className="text-[16px] w-6 text-center shrink-0">{emoji}</span>
                          )}
                          <div className="flex-1">
                            <div className={`text-[13px] font-semibold leading-tight ${sel ? "text-[#7c3aed]" : "text-slate-800"}`}>{o.l}</div>
                            {o.d && <div className="text-[11px] text-slate-400 mt-0.5 leading-snug">{o.d}</div>}
                          </div>
                          <div className={`w-[18px] h-[18px] rounded-[5px] border-2 shrink-0 flex items-center justify-center transition-all ${sel ? "border-[#7c3aed] bg-[#7c3aed]" : "border-slate-300"}`}>
                            {sel && (
                              <svg width="10" height="10" fill="none" viewBox="0 0 24 24">
                                <path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            )}
                          </div>
                        </button>
                      )
                    })}
                  </div>
                )}

                {/* ── Text ─────────────────────────────── */}
                {step.type === "text" && (
                  <div>
                    <textarea
                      value={answers[step.id] as string}
                      onChange={e => setText(e.target.value)}
                      placeholder={step.placeholder}
                      rows={6}
                      className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 text-[14px] text-slate-800 outline-none transition-all focus:bg-white focus:border-[#7c3aed] focus:ring-2 placeholder:text-slate-400 font-[inherit] resize-y leading-[1.7]"
                      style={{ "--tw-ring-color": "rgba(124,58,237,0.1)" } as React.CSSProperties}
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

                {/* ── Pricing (custom step) ──────────── */}
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
                      <label className="text-[12px] font-semibold text-slate-600 mb-1.5 block uppercase tracking-wide">
                        Pricing Expectation
                        <span className="text-slate-400 font-normal normal-case tracking-normal"> (optional)</span>
                      </label>
                      <textarea
                        value={pricingExpectation}
                        onChange={e => { if (e.target.value.length <= 500) setPricingExpectation(e.target.value) }}
                        placeholder="e.g. I think ₹299 for a 30-min session would be fair given my 8+ years of experience. Open to discussion based on session type (1:1 vs group)."
                        rows={3}
                        className="w-full p-3.5 rounded-xl border border-slate-200 bg-slate-50 text-[14px] text-slate-800 outline-none transition-all focus:bg-white focus:border-[#7c3aed] focus:ring-2 placeholder:text-slate-400 font-[inherit] resize-y leading-[1.7]"
                        style={{ "--tw-ring-color": "rgba(124,58,237,0.1)" } as React.CSSProperties}
                      />
                      <div className="flex justify-end mt-1 px-1">
                        <span className={`text-[11px] font-semibold ${pricingExpectation.length > 450 ? "text-amber-500" : "text-slate-300"}`}>
                          {pricingExpectation.length}/500
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── Combo (multiple fields) ──────────── */}
                {step.type === "combo" && (
                  <div className="flex flex-col gap-4">
                    {/* Photo upload — step 0 only, shown BEFORE fields */}
                    {step.id === 0 && (
                      <div className="flex flex-col items-center py-2">
                        <input ref={photoRef} type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
                        <button
                          type="button"
                          onClick={() => photoRef.current?.click()}
                          className="relative group cursor-pointer mb-3"
                        >
                          {photoPreview ? (
                            <div className={`w-24 h-24 rounded-full overflow-hidden border-4 shadow-lg transition-all ${photo ? "border-green-400" : "border-[#7c3aed]/40"}`}>
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                              {/* Hover overlay */}
                              <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                                  <circle cx="12" cy="13" r="4" />
                                </svg>
                              </div>
                            </div>
                          ) : (
                            <div className={`w-24 h-24 rounded-full border-2 border-dashed flex flex-col items-center justify-center transition-all group-hover:border-[#7c3aed] group-hover:bg-purple-50/40 ${photoError ? "border-red-300 bg-red-50/30" : "border-slate-300 bg-slate-50"}`}>
                              <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke={photoError ? "#f87171" : "#94a3b8"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:[&>*]:stroke-[#7c3aed] transition-all">
                                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                                <circle cx="12" cy="13" r="4" />
                              </svg>
                            </div>
                          )}
                        </button>

                        <p className="text-[12px] font-semibold text-slate-600 mb-0.5">
                          {photoPreview ? "Change Photo" : "Upload Photo"}
                          <span className="text-red-400 ml-0.5">*</span>
                        </p>
                        <p className="text-[11px] text-slate-400">PNG or JPG — shown on your mentor card</p>
                        {photoError && <p className="text-[11px] text-red-400 font-semibold mt-1">{photoError}</p>}
                      </div>
                    )}

                    {/* Form fields with icon prefix */}
                    {step.fields?.map(f => (
                      <div key={f.key}>
                        <label className="text-[12px] font-semibold text-slate-600 mb-1.5 block uppercase tracking-wide">
                          {f.label} {f.required && <span className="text-red-400">*</span>}
                        </label>
                        {f.type === "dropdown" ? (
                          <div className="relative">
                            {FIELD_ICONS[f.key] && (
                              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                                <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="#94a3b8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                  <path d={FIELD_ICONS[f.key]} />
                                </svg>
                              </div>
                            )}
                            <select
                              value={comboFields[f.key] || ""}
                              onChange={e => setComboFields(p => ({ ...p, [f.key]: e.target.value }))}
                              className="w-full p-3.5 pl-10 rounded-xl border border-slate-200 bg-slate-50 text-[14px] text-slate-800 outline-none transition-all focus:bg-white focus:border-[#7c3aed] focus:ring-2 font-[inherit] appearance-none cursor-pointer"
                              style={{
                                "--tw-ring-color": "rgba(124,58,237,0.1)",
                                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' viewBox='0 0 24 24'%3E%3Cpath d='m6 9 6 6 6-6' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "right 14px center",
                                paddingRight: "36px",
                              } as React.CSSProperties}
                            >
                              <option value="">{f.placeholder}</option>
                              {f.opts?.map(o => <option key={o} value={o}>{o}</option>)}
                            </select>
                          </div>
                        ) : f.type === "number" ? (
                          <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[14px] text-slate-400 font-semibold">{"\u20B9"}</span>
                            <input
                              type="number"
                              value={comboFields[f.key] || ""}
                              onChange={e => setComboFields(p => ({ ...p, [f.key]: e.target.value }))}
                              placeholder={f.placeholder}
                              className="w-full p-3.5 pl-8 rounded-xl border border-slate-200 bg-slate-50 text-[14px] text-slate-800 outline-none transition-all focus:bg-white focus:border-[#7c3aed] focus:ring-2 placeholder:text-slate-400 font-[inherit]"
                              style={{ "--tw-ring-color": "rgba(124,58,237,0.1)" } as React.CSSProperties}
                            />
                          </div>
                        ) : (
                          <div className="relative">
                            {FIELD_ICONS[f.key] && (
                              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                                <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="#94a3b8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                  <path d={FIELD_ICONS[f.key]} />
                                </svg>
                              </div>
                            )}
                            <input
                              type="text"
                              value={comboFields[f.key] || ""}
                              onChange={e => setComboFields(p => ({ ...p, [f.key]: e.target.value }))}
                              placeholder={f.placeholder}
                              className={`w-full p-3.5 rounded-xl border border-slate-200 bg-slate-50 text-[14px] text-slate-800 outline-none transition-all focus:bg-white focus:border-[#7c3aed] focus:ring-2 placeholder:text-slate-400 font-[inherit] ${FIELD_ICONS[f.key] ? "pl-10" : ""}`}
                              style={{ "--tw-ring-color": "rgba(124,58,237,0.1)" } as React.CSSProperties}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* ── Navigation ──────────────────────── */}
                <div className="flex items-center justify-between mt-8 pt-5 border-t border-slate-100">
                  <button
                    onClick={goBack}
                    disabled={cur === 0}
                    className={`inline-flex items-center gap-1.5 text-[13px] font-bold px-4 py-2 rounded-xl border transition-all font-[inherit] ${cur === 0 ? "text-slate-300 border-slate-100 cursor-not-allowed" : "text-slate-500 border-slate-200 hover:bg-slate-50 hover:text-slate-700 cursor-pointer"}`}
                  >
                    <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    Back
                  </button>

                  <button
                    onClick={goNext}
                    disabled={!isValid() || loading}
                    className={`inline-flex items-center gap-2 text-[14px] font-bold px-7 py-3.5 rounded-xl transition-all font-[inherit] border-none ${isValid() && !loading ? "text-white cursor-pointer" : "text-white/60 cursor-not-allowed"}`}
                    style={{
                      background: isValid() && !loading
                        ? cur === totalSteps - 1
                          ? "linear-gradient(135deg, #7c3aed, #1d4ed8)"
                          : "linear-gradient(135deg, #7c3aed, #3b5bdb)"
                        : "#c7d2fe",
                      boxShadow: isValid() && !loading ? "0 4px 14px rgba(124,58,237,0.3)" : "none",
                    }}
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

            {/* Mobile: step text below card */}
            <div className="md:hidden flex justify-center mt-4">
              <span className="text-[12px] font-semibold text-slate-400">
                Step {cur + 1} of {TOTAL}
              </span>
            </div>

          </div>
        </main>

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes mfspin { to { transform: rotate(360deg) } }
        .focus\\:ring-2:focus { box-shadow: 0 0 0 3px rgba(124,58,237,0.12); }
      ` }} />
      <Footer />
    </div>
  )
}
