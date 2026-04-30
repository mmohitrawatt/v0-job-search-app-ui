"use client"

import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { Footer } from "@/components/landing/footer"
import { useWaitlist } from "@/components/waitlist-modal"
import { Navbar } from "@/components/landing/navbar"

/* ─── Tools Data ───────────────────────────────────────────────────────────── */

const TOOLS = [
  {
    id: "resume-builder",
    title: "AI Resume Builder",
    tagline: "From JD to resume in seconds",
    desc: "Paste any job description and get a fully tailored, ATS-optimized resume. Our AI understands what recruiters look for — keywords, formatting, structure — and generates a resume that gets you past the screening round.",
    color: "#1d3a8f",
    colorLight: "#3b5bdb",
    bg: "#eef1fd",
    gradient: "linear-gradient(135deg, #1d3a8f 0%, #2548c5 60%, #3b5bdb 100%)",
    stat: { value: "92%", label: "Avg ATS Score" },
    features: ["Smart JD Parsing", "ATS Optimization", "Multiple Templates", "Export PDF/DOCX"],
    badge: "Most Popular",
  },
  {
    id: "mock-interview",
    title: "AI Mock Interview",
    tagline: "Practice before the real thing",
    desc: "Our AI interviewer adapts to your target role — SDE, Data Science, Product, or HR rounds. Get real-time scoring on answer quality, communication clarity, and confidence.",
    color: "#0f766e",
    colorLight: "#14b8a6",
    bg: "#ecfdf5",
    gradient: "linear-gradient(135deg, #0f766e 0%, #0d9488 60%, #14b8a6 100%)",
    stat: { value: "5x", label: "Better Prepared" },
    features: ["Role-Specific Questions", "Real-Time AI Feedback", "Confidence Analysis", "Performance Report"],
    badge: null,
  },
  {
    id: "career-copilot",
    title: "AI Career Copilot",
    tagline: "Your 24/7 career advisor",
    desc: "Ask anything — skill gaps, career switches, what to learn next, salary benchmarks. Vibe gives you personalized, no-fluff career advice backed by real market data.",
    color: "#7c3aed",
    colorLight: "#8b5cf6",
    bg: "#f5f3ff",
    gradient: "linear-gradient(135deg, #6d28d9 0%, #7c3aed 60%, #8b5cf6 100%)",
    stat: { value: "24/7", label: "Always On" },
    features: ["Skill-Gap Analysis", "Career Roadmaps", "Salary Intelligence", "Smart Matching"],
    badge: "New",
  },
  {
    id: "auto-apply",
    title: "AI Auto Apply",
    tagline: "Apply to 100+ jobs while you sleep",
    desc: "Set your preferences once and let our AI apply to matching jobs across all major portals automatically. Every application is personalized with a tailored cover letter.",
    color: "#dc2626",
    colorLight: "#ef4444",
    bg: "#fef2f2",
    gradient: "linear-gradient(135deg, #b91c1c 0%, #dc2626 60%, #ef4444 100%)",
    stat: { value: "100+", label: "Jobs/Day" },
    features: ["Multi-Portal Reach", "Personalized Applications", "Smart Filters", "Application Tracker"],
    badge: null,
  },
  {
    id: "salary-intel",
    title: "Salary Intelligence",
    tagline: "Know your worth before you negotiate",
    desc: "Real salary data from verified offers — not guesswork. Compare packages across roles, companies, locations, and experience levels.",
    color: "#b45309",
    colorLight: "#f59e0b",
    bg: "#fffbeb",
    gradient: "linear-gradient(135deg, #92400e 0%, #b45309 60%, #d97706 100%)",
    stat: { value: "500+", label: "Companies" },
    features: ["Role-Based Data", "Company Benchmarks", "Location Insights", "Negotiation Tips"],
    badge: null,
  },
  {
    id: "linkedin-optimizer",
    title: "LinkedIn Optimizer",
    tagline: "Get found by recruiters",
    desc: "AI analyzes your LinkedIn profile and gives you specific, actionable improvements — headline, summary, experience bullets, skills ordering, and keyword density.",
    color: "#0369a1",
    colorLight: "#0ea5e9",
    bg: "#e0f2fe",
    gradient: "linear-gradient(135deg, #075985 0%, #0369a1 60%, #0284c7 100%)",
    stat: { value: "3x", label: "More Views" },
    features: ["Headline Optimization", "Summary Rewrite", "Experience Bullets", "Keyword Density"],
    badge: null,
  },
  {
    id: "job-aggregator",
    title: "Universal Job Feed",
    tagline: "Every job portal. One place.",
    desc: "Stop switching between Naukri, LinkedIn, Internshala, Indeed, and AngelList. Jobingen pulls live job listings from every major portal and surfaces the best matches for your profile — deduplicated, ranked by fit, and ready to apply.",
    color: "#059669",
    colorLight: "#10b981",
    bg: "#ecfdf5",
    gradient: "linear-gradient(135deg, #047857 0%, #059669 60%, #10b981 100%)",
    stat: { value: "10+", label: "Portals" },
    features: ["Naukri · LinkedIn · Internshala", "Smart Deduplication", "Relevance Ranking", "One-Click Apply"],
    badge: "New",
  },
]

/* ─── Fake UI Mockups ──────────────────────────────────────────────────────── */

function MockupResumeBuilder() {
  return (
    <div className="flex flex-col gap-3 w-full">
      {/* ATS badge */}
      <div className="flex justify-end mb-1">
        <div
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-black"
          style={{ background: "rgba(255,255,255,0.18)", color: "white" }}
        >
          <svg width="9" height="9" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
          ATS Score: 92
        </div>
      </div>
      {/* Name / title block */}
      <div className="rounded-xl p-3" style={{ background: "rgba(255,255,255,0.12)" }}>
        <div className="h-3 rounded-full mb-2" style={{ background: "rgba(255,255,255,0.7)", width: "65%" }} />
        <div className="h-2 rounded-full" style={{ background: "rgba(255,255,255,0.35)", width: "42%" }} />
      </div>
      {/* Body lines */}
      <div className="flex flex-col gap-2 px-1">
        {[78, 90, 55, 70].map((w, i) => (
          <div key={i} className="h-2 rounded-full" style={{ background: "rgba(255,255,255,0.22)", width: `${w}%` }} />
        ))}
      </div>
      {/* Keyword chips */}
      <div className="flex flex-wrap gap-1.5 mt-1">
        {["React", "Node.js", "System Design"].map(k => (
          <span key={k} className="text-[10px] font-bold px-2.5 py-1 rounded-full" style={{ background: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.9)" }}>
            {k}
          </span>
        ))}
      </div>
    </div>
  )
}

function MockupMockInterview() {
  return (
    <div className="flex flex-col gap-2.5 w-full">
      {/* Score badge */}
      <div className="flex justify-end mb-0.5">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-black" style={{ background: "rgba(255,255,255,0.18)", color: "white" }}>
          Score: 87/100
        </div>
      </div>
      {/* AI question bubble */}
      <div className="flex items-start gap-2">
        <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-[9px] font-black" style={{ background: "rgba(255,255,255,0.2)", color: "white" }}>AI</div>
        <div className="rounded-2xl rounded-tl-sm px-3 py-2 max-w-[78%]" style={{ background: "rgba(255,255,255,0.16)" }}>
          <div className="h-1.5 rounded-full mb-1.5" style={{ background: "rgba(255,255,255,0.6)", width: "90%" }} />
          <div className="h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.35)", width: "65%" }} />
        </div>
      </div>
      {/* User answer bubble */}
      <div className="flex items-start gap-2 justify-end">
        <div className="rounded-2xl rounded-tr-sm px-3 py-2 max-w-[72%]" style={{ background: "rgba(255,255,255,0.28)" }}>
          <div className="h-1.5 rounded-full mb-1.5" style={{ background: "rgba(255,255,255,0.7)", width: "80%" }} />
          <div className="h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.45)", width: "55%" }} />
        </div>
        <div className="w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-[9px] font-black" style={{ background: "rgba(255,255,255,0.25)", color: "white" }}>U</div>
      </div>
      {/* Feedback tag */}
      <div className="flex items-center gap-1.5 mt-1 px-1">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-300" />
        <div className="h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.4)", width: "55%" }} />
      </div>
    </div>
  )
}

function MockupCareerCopilot() {
  return (
    <div className="flex flex-col gap-0 w-full">
      {["Month 1", "Month 3", "Month 6"].map((m, i) => (
        <div key={i} className="flex items-start gap-3">
          <div className="flex flex-col items-center">
            <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0" style={{ borderColor: "rgba(255,255,255,0.5)", background: i === 0 ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.1)" }}>
              {i === 0 && <div className="w-2 h-2 rounded-full bg-white" />}
            </div>
            {i < 2 && <div className="w-0.5 h-7 mt-0.5" style={{ background: "rgba(255,255,255,0.2)" }} />}
          </div>
          <div className="pb-4 flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-black text-white">{m}</span>
              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.8)" }}>
                {["Learn DSA", "Build Projects", "Apply + Interview"][i]}
              </span>
            </div>
            <div className="h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.2)", width: ["70%", "55%", "80%"][i] }} />
          </div>
        </div>
      ))}
    </div>
  )
}

function MockupAutoApply() {
  const jobs = [
    { company: "Razorpay", role: "Frontend Engineer" },
    { company: "CRED", role: "Product Manager" },
    { company: "Zepto", role: "Backend SDE II" },
  ]
  return (
    <div className="flex flex-col gap-2.5 w-full">
      <div className="flex items-center justify-between mb-1">
        <span className="text-[11px] font-bold text-white/70">Today&apos;s Applications</span>
        <span className="text-[11px] font-black text-white">24 sent</span>
      </div>
      {jobs.map((j, i) => (
        <div key={i} className="flex items-center justify-between rounded-xl px-3 py-2.5" style={{ background: "rgba(255,255,255,0.13)" }}>
          <div>
            <div className="text-[11px] font-black text-white mb-0.5">{j.company}</div>
            <div className="text-[10px] text-white/55">{j.role}</div>
          </div>
          <span className="text-[10px] font-black px-2.5 py-1 rounded-full flex items-center gap-1" style={{ background: "rgba(74,222,128,0.2)", color: "#86efac" }}>
            <svg width="8" height="8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
            Applied
          </span>
        </div>
      ))}
    </div>
  )
}

function MockupSalaryIntel() {
  const bars = [
    { label: "Fresher", h: 35 },
    { label: "1-3 yr", h: 55 },
    { label: "3-5 yr", h: 72 },
    { label: "5-8 yr", h: 88 },
    { label: "8+ yr", h: 100 },
  ]
  return (
    <div className="flex flex-col gap-2.5 w-full">
      <div className="flex items-end justify-between mb-1">
        <span className="text-[11px] font-bold text-white/70">Salary by Experience</span>
        <span className="text-[11px] font-black text-white">₹ LPA</span>
      </div>
      <div className="flex items-end gap-2 h-20">
        {bars.map((b, i) => (
          <div key={i} className="flex flex-col items-center gap-1 flex-1">
            <div
              className="w-full rounded-t-lg"
              style={{
                height: `${b.h}%`,
                background: `rgba(255,255,255,${0.15 + i * 0.06})`,
                minHeight: 8,
              }}
            />
          </div>
        ))}
      </div>
      <div className="flex items-end gap-2">
        {bars.map((b, i) => (
          <div key={i} className="flex-1 text-center">
            <span className="text-[9px] text-white/45">{b.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function MockupLinkedInOptimizer() {
  return (
    <div className="flex flex-col gap-3 w-full">
      {/* Profile card */}
      <div className="flex items-center gap-3 rounded-xl px-3 py-2.5" style={{ background: "rgba(255,255,255,0.13)" }}>
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-black shrink-0" style={{ background: "rgba(255,255,255,0.25)", color: "white" }}>AR</div>
        <div className="flex-1">
          <div className="h-2 rounded-full mb-1.5" style={{ background: "rgba(255,255,255,0.6)", width: "60%" }} />
          <div className="h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.3)", width: "45%" }} />
        </div>
      </div>
      {/* Score bar */}
      <div className="px-1">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] font-bold text-white/70">Profile Score</span>
          <span className="text-[11px] font-black text-white">94</span>
        </div>
        <div className="h-2 rounded-full w-full" style={{ background: "rgba(255,255,255,0.15)" }}>
          <div className="h-full rounded-full" style={{ width: "94%", background: "rgba(255,255,255,0.65)" }} />
        </div>
      </div>
      {/* Suggestions */}
      {["Headline", "Keywords", "Summary"].map((s, i) => (
        <div key={i} className="flex items-center gap-2 px-1">
          <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="rgba(134,239,172,1)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
          <div className="h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.25)", width: `${[70, 55, 80][i]}%` }} />
        </div>
      ))}
    </div>
  )
}

function MockupJobAggregator() {
  const portals = [
    { name: "Naukri", jobs: 142 },
    { name: "LinkedIn", jobs: 89 },
    { name: "Internshala", jobs: 63 },
    { name: "Indeed", jobs: 47 },
  ]
  return (
    <div className="flex flex-col gap-2.5 w-full">
      <div className="flex items-center justify-between mb-0.5">
        <span className="text-[11px] font-bold text-white/70">Live Sources</span>
        <span className="text-[11px] font-black text-white">341 jobs synced</span>
      </div>
      {portals.map((p, i) => (
        <div key={i} className="flex items-center justify-between rounded-xl px-3 py-2" style={{ background: "rgba(255,255,255,0.12)" }}>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-300" />
            <span className="text-[11px] font-black text-white">{p.name}</span>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.85)" }}>
            {p.jobs} jobs
          </span>
        </div>
      ))}
      <div className="flex items-center gap-1.5 mt-1 rounded-xl px-3 py-2" style={{ background: "rgba(74,222,128,0.18)" }}>
        <svg width="9" height="9" fill="none" viewBox="0 0 24 24" stroke="#86efac" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
        <span className="text-[10px] font-black" style={{ color: "#86efac" }}>Deduplicated & ranked for you</span>
      </div>
    </div>
  )
}

const MOCKUPS = [
  MockupResumeBuilder,
  MockupMockInterview,
  MockupCareerCopilot,
  MockupAutoApply,
  MockupSalaryIntel,
  MockupLinkedInOptimizer,
  MockupJobAggregator,
]

/* ─── Tool Section ─────────────────────────────────────────────────────────── */

function ToolSection({ tool, index, onEarlyAccess }: { tool: typeof TOOLS[0]; index: number; onEarlyAccess: () => void }) {
  const isEven = index % 2 === 0
  const MockupComponent = MOCKUPS[index]

  const contentSide = (
    <div className="flex flex-col justify-center py-4 lg:py-0">
      {/* Chip */}
      <div className="inline-flex items-center gap-2 self-start mb-5">
        <span
          className="text-[12px] font-black px-3 py-1.5 rounded-full uppercase tracking-wide"
          style={{ background: tool.bg, color: tool.color }}
        >
          {tool.title}
        </span>
        {tool.badge && (
          <span
            className="text-[10px] font-black px-2.5 py-1 rounded-full border uppercase tracking-wide"
            style={{
              background: tool.bg,
              color: tool.color,
              borderColor: `${tool.color}30`,
            }}
          >
            {tool.badge}
          </span>
        )}
      </div>

      {/* Headline */}
      <h2
        className="font-black text-slate-900 tracking-[-0.03em] leading-[1.1] mb-2"
        style={{ fontSize: "clamp(26px, 3.5vw, 38px)" }}
      >
        {tool.title}
      </h2>

      {/* Tagline */}
      <p className="text-[15px] font-semibold mb-4" style={{ color: tool.color }}>
        {tool.tagline}
      </p>

      {/* Divider */}
      <div className="w-12 h-0.5 rounded-full mb-5" style={{ background: tool.color }} />

      {/* Description */}
      <p className="text-[15px] text-slate-500 leading-[1.75] mb-7 max-w-[500px]">
        {tool.desc}
      </p>

      {/* Features grid */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-3 mb-8">
        {tool.features.map((f) => (
          <div key={f} className="flex items-center gap-2.5">
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
              style={{ background: tool.bg }}
            >
              <svg width="9" height="9" fill="none" viewBox="0 0 24 24" stroke={tool.color} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <span className="text-[13px] font-semibold text-slate-600">{f}</span>
          </div>
        ))}
      </div>

      {/* Stat + CTA row */}
      <div className="flex items-center gap-6">
        <div>
          <div
            className="font-black leading-none tracking-[-0.04em]"
            style={{ fontSize: 52, color: tool.color }}
          >
            {tool.stat.value}
          </div>
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-1">
            {tool.stat.label}
          </div>
        </div>
        <button
          onClick={onEarlyAccess}
          className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-[13px] font-bold text-white transition-all hover:-translate-y-0.5"
          style={{
            background: tool.gradient,
            boxShadow: `0 8px 24px -6px ${tool.color}55`,
          }}
        >
          Get Early Access
          <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )

  const visualSide = (
    <div className="flex items-center justify-center">
      <div
        className="w-full rounded-3xl p-7 flex flex-col justify-between"
        style={{
          background: tool.gradient,
          boxShadow: "0 32px 80px -12px rgba(0,0,0,0.25)",
          minHeight: 320,
        }}
      >
        {/* Tool label */}
        <div className="flex items-center justify-between mb-5">
          <span className="text-[11px] font-black text-white/60 uppercase tracking-widest">{tool.title}</span>
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.15)" }}
          >
            <div className="w-2 h-2 rounded-full bg-white/80" />
          </div>
        </div>
        <MockupComponent />
      </div>
    </div>
  )

  return (
    <section
      id={tool.id}
      style={{ scrollMarginTop: 100, paddingTop: "5rem", paddingBottom: "5rem" }}
    >
      <div className="max-w-[1140px] mx-auto px-5 sm:px-8">
        <div className="reveal grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
        >
          {/* Mobile: visual first, then content */}
          <div className="lg:hidden">{visualSide}</div>
          <div className="lg:hidden">{contentSide}</div>

          {/* Desktop: alternate */}
          {isEven ? (
            <>
              <div className="hidden lg:block">{visualSide}</div>
              <div className="hidden lg:block">{contentSide}</div>
            </>
          ) : (
            <>
              <div className="hidden lg:block">{contentSide}</div>
              <div className="hidden lg:block">{visualSide}</div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

/* ─── Page ─────────────────────────────────────────────────────────────────── */

export default function AIToolsPage() {
  const [activeTab, setActiveTab] = useState(TOOLS[0].id)
  const { open: openWaitlist } = useWaitlist()
  const selectorRef = useRef<HTMLDivElement>(null)

  /* IntersectionObserver — active tab sync */
  useEffect(() => {
    const observers: IntersectionObserver[] = []
    TOOLS.forEach((tool) => {
      const el = document.getElementById(tool.id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveTab(tool.id) },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  /* IntersectionObserver — scroll reveal */
  useEffect(() => {
    const els = document.querySelectorAll(".reveal")
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible") }),
      { threshold: 0, rootMargin: "0px 0px -60px 0px" }
    )
    els.forEach(el => {
      const rect = el.getBoundingClientRect()
      if (rect.top < window.innerHeight) {
        el.classList.add("visible")
      } else {
        obs.observe(el)
      }
    })
    return () => obs.disconnect()
  }, [])

  const scrollToTool = (id: string) => {
    setActiveTab(id)
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <>
      <style>{`
        /* ── Scrollbar ── */
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }

/* ── Aurora background blobs ── */
        @keyframes aurora1 {
          0%,100% { transform: translate(0%,0%) scale(1); }
          33%      { transform: translate(6%,-8%) scale(1.12); }
          66%      { transform: translate(-4%,5%) scale(0.94); }
        }
        @keyframes aurora2 {
          0%,100% { transform: translate(0%,0%) scale(1); }
          40%      { transform: translate(-7%,5%) scale(1.18); }
          75%      { transform: translate(5%,-4%) scale(0.9); }
        }
        @keyframes aurora3 {
          0%,100% { transform: translate(0%,0%) scale(1.05); }
          50%      { transform: translate(4%,7%) scale(0.88); }
        }
        .aurora-1 { animation: aurora1 14s ease-in-out infinite; }
        .aurora-2 { animation: aurora2 18s ease-in-out infinite; }
        .aurora-3 { animation: aurora3 11s ease-in-out infinite; }

        /* ── Hero staggered reveal ── */
        @keyframes fadeSlideUp {
          from { opacity:0; transform:translateY(28px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .h1 { animation: fadeSlideUp .55s cubic-bezier(.16,1,.3,1) .05s both; }
        .h2 { animation: fadeSlideUp .6s  cubic-bezier(.16,1,.3,1) .18s both; }
        .h3 { animation: fadeSlideUp .6s  cubic-bezier(.16,1,.3,1) .30s both; }
        .h4 { animation: fadeSlideUp .6s  cubic-bezier(.16,1,.3,1) .42s both; }
        .h5 { animation: fadeSlideUp .6s  cubic-bezier(.16,1,.3,1) .54s both; }
        .h6 { animation: fadeSlideUp .7s  cubic-bezier(.16,1,.3,1) .68s both; }

        /* ── Scroll dot in hero ── */
        @keyframes scrollBounce {
          0%,100% { transform:translateY(0); opacity:.8; }
          50%      { transform:translateY(6px); opacity:.3; }
        }
        .scroll-dot { animation: scrollBounce 1.8s ease-in-out infinite; }

        /* ── Marquee ── */
        @keyframes marquee { from { transform:translateX(0); } to { transform:translateX(-50%); } }
        .marquee-track { animation: marquee 28s linear infinite; }
        .marquee-track:hover { animation-play-state: paused; }

        /* ── Pulse dot ── */
        @keyframes pulseDot { 0%,100%{opacity:1;} 50%{opacity:.25;} }
        .pulse-dot { animation: pulseDot 2s ease-in-out infinite; }

        /* ── Float (mockup cards) ── */
        @keyframes floatA { 0%,100%{transform:translateY(0) rotate(-4deg);} 50%{transform:translateY(-12px) rotate(-4deg);} }
        @keyframes floatB { 0%,100%{transform:translateY(0) rotate(3deg);}  50%{transform:translateY(-16px) rotate(3deg);}  }
        @keyframes floatC { 0%,100%{transform:translateY(0) rotate(-2deg);} 50%{transform:translateY(-8px)  rotate(-2deg);} }
        .float-a { animation: floatA 4.2s ease-in-out infinite; }
        .float-b { animation: floatB 5.8s ease-in-out infinite; }
        .float-c { animation: floatC 3.6s ease-in-out infinite; }

        /* ── Scroll reveal (sections) ── */
        .reveal {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity .65s cubic-bezier(.16,1,.3,1), transform .65s cubic-bezier(.16,1,.3,1);
        }
        .reveal.visible { opacity:1; transform:translateY(0); }

        /* ── Gradient text shimmer (stat numbers) ── */
        @keyframes shimmerText {
          0%   { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        .stat-num {
          background: linear-gradient(90deg, currentColor 0%, #fff 40%, currentColor 80%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmerText 3s linear infinite;
        }

        /* ── CTA button glow pulse ── */
        @keyframes glowPulse {
          0%,100% { box-shadow: 0 4px 24px rgba(255,255,255,.14); }
          50%      { box-shadow: 0 4px 40px rgba(255,255,255,.30); }
        }
        .cta-glow { animation: glowPulse 3s ease-in-out infinite; }
      `}</style>

      <div
        className="min-h-screen"
        style={{
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', sans-serif",
          background: "#f9fafb",
        }}
      >
        <Navbar />

        {/* ══ HERO ══ */}
        <section className="relative overflow-hidden pt-[108px]" style={{ background:"#060c1f" }}>

          {/* bg glow */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="aurora-1 absolute rounded-full"
              style={{ width:700, height:360, top:"-10%", left:"50%", transform:"translateX(-50%)",
                background:"radial-gradient(ellipse,#1e3a8a 0%,transparent 70%)", opacity:.6, filter:"blur(70px)" }} />
            <div className="aurora-2 absolute rounded-full"
              style={{ width:300, height:300, top:"20%", left:"-5%",
                background:"radial-gradient(circle,#3730a3 0%,transparent 70%)", opacity:.22, filter:"blur(60px)" }} />
            <div className="aurora-3 absolute rounded-full"
              style={{ width:260, height:260, top:"10%", right:"-4%",
                background:"radial-gradient(circle,#1d4ed8 0%,transparent 70%)", opacity:.18, filter:"blur(55px)" }} />
          </div>

          {/* dot grid */}
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage:"radial-gradient(rgba(255,255,255,0.06) 1px,transparent 1px)",
            backgroundSize:"32px 32px",
          }} />

          <div className="relative max-w-[1140px] mx-auto px-5 sm:px-8 py-14 sm:py-20 flex flex-col items-center text-center">

            {/* Badge */}
            <div className="h1 inline-flex items-center gap-2 rounded-full px-3.5 py-1 mb-6 border"
              style={{ background:"rgba(59,130,246,0.1)", borderColor:"rgba(59,130,246,0.2)" }}>
              <div className="w-1.5 h-1.5 rounded-full pulse-dot" style={{ background:"#60a5fa" }} />
              <span className="text-[11px] font-bold uppercase tracking-[0.12em]" style={{ color:"#93c5fd" }}>
                India&apos;s Job Search Engine
              </span>
            </div>

            {/* H1 */}
            <h1 className="h2 font-black text-white leading-[1.05] tracking-[-0.04em] mb-4"
              style={{ fontSize:"clamp(30px,5.5vw,64px)", maxWidth:780 }}>
              Stop applying blindly.{" "}
              <span style={{
                background:"linear-gradient(90deg,#93c5fd,#3b82f6)",
                WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
              }}>
                Start getting hired.
              </span>
            </h1>

            {/* Sub */}
            <p className="h3 mb-8 leading-[1.75]"
              style={{ fontSize:"clamp(14px,1.6vw,16px)", maxWidth:480, color:"rgba(255,255,255,0.45)" }}>
              Resume builder, mock interviews, auto-apply, salary intel — everything in one engine, built for India.
            </p>

            {/* CTAs */}
            <div className="h4 flex flex-wrap items-center justify-center gap-3 mb-8">
              <button
                onClick={() => scrollToTool(TOOLS[0].id)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-[14px] font-bold text-white transition-all hover:-translate-y-0.5"
                style={{ background:"linear-gradient(135deg,#1d3a8f,#2548c5)", boxShadow:"0 6px 20px -4px rgba(29,58,143,0.55)" }}
              >
                Explore All Tools
                <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
              <button
                onClick={openWaitlist}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-[14px] font-semibold border transition-all hover:bg-white/[0.06] hover:-translate-y-0.5"
                style={{ borderColor:"rgba(255,255,255,0.15)", color:"rgba(255,255,255,0.65)" }}
              >
                Get Early Access
              </button>
            </div>

            {/* Social proof */}
            <div className="h5 flex items-center justify-center gap-3">
              <div className="flex -space-x-2">
                {[{i:"AK",c:"#1d3a8f"},{i:"SR",c:"#0d9488"},{i:"PV",c:"#7c3aed"},{i:"NJ",c:"#dc2626"},{i:"RS",c:"#b45309"}].map(a=>(
                  <div key={a.i} className="w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-black text-white border-2 shrink-0"
                    style={{ background:a.c, borderColor:"#060c1f" }}>{a.i}</div>
                ))}
              </div>
              <p className="text-[12px]" style={{ color:"rgba(255,255,255,0.35)" }}>
                <span className="font-bold" style={{ color:"rgba(255,255,255,0.65)" }}>12,000+</span> on waitlist
              </p>
            </div>

          </div>

          {/* thin bottom border fade */}
          <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background:"rgba(255,255,255,0.06)" }} />
        </section>

        {/* ── Sticky Tool Selector ── */}
        <div
          ref={selectorRef}
          className="sticky z-40 border-b border-slate-100 bg-white"
          style={{ top: 108 }}
        >
          <div className="max-w-[1140px] mx-auto px-4 sm:px-8">
            <div className="flex items-center gap-0 overflow-x-auto scrollbar-none">
              {TOOLS.map((tool) => {
                const isActive = activeTab === tool.id
                return (
                  <button
                    key={tool.id}
                    onClick={() => scrollToTool(tool.id)}
                    className="flex items-center gap-2 px-4 py-4 shrink-0 relative transition-colors"
                    style={{
                      color: isActive ? tool.color : "#64748b",
                    }}
                  >
                    <div
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ background: tool.color, opacity: isActive ? 1 : 0.35 }}
                    />
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: isActive ? 700 : 600,
                        letterSpacing: "-0.01em",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {tool.title}
                    </span>
                    {/* Active underline */}
                    {isActive && (
                      <div
                        className="absolute bottom-0 left-0 right-0 h-0.5 rounded-t-full"
                        style={{ background: tool.color }}
                      />
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* ── Tool Feature Sections ── */}
        <div style={{ background: "#f9fafb" }}>
          {TOOLS.map((tool, i) => (
            <div key={tool.id}>
              <ToolSection tool={tool} index={i} onEarlyAccess={() => openWaitlist()} />
              {i < TOOLS.length - 1 && (
                <div className="max-w-[1140px] mx-auto px-5 sm:px-8">
                  <div className="border-t border-slate-100" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ── Overview Strip ── */}
        <div className="max-w-[1140px] mx-auto px-5 sm:px-8 py-20">
          <div
            className="reveal rounded-3xl p-8 sm:p-12 border border-slate-200/60"
            style={{ background: "white" }}
          >
            <div className="text-center mb-8">
              <h3
                className="font-black text-slate-900 tracking-[-0.03em]"
                style={{ fontSize: "clamp(22px, 3vw, 32px)" }}
              >
                All tools. One platform.
              </h3>
              <p className="text-slate-400 text-[14px] mt-2">
                Everything you need to land your next job, in one place.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {TOOLS.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => scrollToTool(tool.id)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full border transition-all hover:-translate-y-0.5"
                  style={{
                    background: tool.bg,
                    borderColor: `${tool.color}20`,
                  }}
                >
                  <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0" style={{ background: tool.color }}>
                    <svg width="7" height="7" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  <span className="text-[12px] font-bold" style={{ color: tool.color }}>{tool.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── CTA Strip ── */}
        <div className="border-t border-b border-slate-100" style={{ background:"#f8faff" }}>
          <div className="max-w-[1140px] mx-auto px-5 sm:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full pulse-dot" style={{ background:"#3b82f6" }} />
              <p className="text-[14px] font-semibold text-slate-700">
                More tools launching soon — <span className="text-blue-600 font-bold">be the first to get access.</span>
              </p>
            </div>
            <button
              onClick={() => openWaitlist()}
              className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-bold text-white transition-all hover:-translate-y-0.5"
              style={{ background:"linear-gradient(135deg,#2548c5,#3b82f6)", boxShadow:"0 4px 14px -4px rgba(37,72,197,0.45)" }}
            >
              Join Waitlist →
            </button>
          </div>
        </div>

        <Footer />

      </div>
    </>
  )
}
