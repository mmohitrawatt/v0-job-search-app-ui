"use client"

import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { JobingenLogo } from "@/components/jobingen-logo"

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

const MOCKUPS = [
  MockupResumeBuilder,
  MockupMockInterview,
  MockupCareerCopilot,
  MockupAutoApply,
  MockupSalaryIntel,
  MockupLinkedInOptimizer,
]

/* ─── Tool Section ─────────────────────────────────────────────────────────── */

function ToolSection({ tool, index }: { tool: typeof TOOLS[0]; index: number }) {
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
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-[13px] font-bold text-white transition-all hover:-translate-y-0.5"
          style={{
            background: tool.gradient,
            boxShadow: `0 8px 24px -6px ${tool.color}55`,
            textDecoration: "none",
          }}
        >
          Get Early Access
          <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
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
        {/* ── Navbar ── */}
        <header
          className="sticky top-0 z-50 border-b border-slate-100"
          style={{ background: "rgba(255,255,255,0.80)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}
        >
          <div className="max-w-[1140px] mx-auto px-5 sm:px-8 h-[60px] flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <JobingenLogo height={70} />
            </Link>
            <nav className="flex items-center gap-1.5">
              <Link
                href="/mentors"
                className="text-[13px] font-semibold text-slate-500 hover:text-slate-900 px-3.5 py-2 rounded-xl hover:bg-slate-50 transition-all hidden sm:block"
                style={{ textDecoration: "none" }}
              >
                Mentors
              </Link>
              <Link
                href="/jobs"
                className="text-[13px] font-bold text-white px-5 py-2 rounded-xl transition-all"
                style={{
                  background: "linear-gradient(135deg, #1d3a8f, #3b5bdb)",
                  boxShadow: "0 2px 8px rgba(29,58,143,0.28)",
                  textDecoration: "none",
                }}
              >
                Browse Jobs
              </Link>
            </nav>
          </div>
        </header>

        {/* ══════════════════════════════════════════
            HERO — Aurora · Centered · Animated
        ══════════════════════════════════════════ */}
        <section className="relative flex flex-col overflow-hidden" style={{ background: "#04071a" }}>

          {/* ── Aurora blobs ── */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="aurora-1 absolute rounded-full blur-[160px]"
              style={{ width:700, height:700, top:"-20%", left:"-12%", background:"#5b21b6", opacity:.28 }} />
            <div className="aurora-2 absolute rounded-full blur-[140px]"
              style={{ width:600, height:600, top:"5%", right:"-18%", background:"#1e3a8a", opacity:.32 }} />
            <div className="aurora-3 absolute rounded-full blur-[120px]"
              style={{ width:480, height:480, bottom:"-10%", left:"35%", background:"#0d9488", opacity:.18 }} />
          </div>

          {/* ── Dot grid ── */}
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.18) 1px, transparent 1px)",
            backgroundSize: "38px 38px", opacity:.25,
          }} />

          {/* ── Vignette edges ── */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: "radial-gradient(ellipse at 50% 50%, transparent 40%, #04071a 100%)"
          }} />

          {/* ── Main centered content ── */}
          <div className="relative flex flex-col items-center justify-center text-center px-5 pt-16 pb-12 sm:pt-20 sm:pb-16">

            {/* Badge */}
            <div className="h1 inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8 border"
              style={{ background:"rgba(255,255,255,0.06)", borderColor:"rgba(255,255,255,0.11)" }}>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-dot" />
              <span className="text-[11px] font-bold text-white/60 uppercase tracking-[0.12em]">
                AI Career Toolkit · 6 Tools · India
              </span>
            </div>

            {/* H1 */}
            <h1 className="h2 font-black text-white leading-[1.03] tracking-[-0.045em] mb-6"
              style={{ fontSize:"clamp(38px,7.5vw,84px)", maxWidth:900 }}>
              The career tools
              <br />
              <span style={{
                background:"linear-gradient(90deg,#a78bfa 0%,#67e8f9 45%,#6ee7b7 100%)",
                WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
              }}>
                your competition isn&apos;t using.
              </span>
            </h1>

            {/* Sub */}
            <p className="h3 text-white/40 leading-[1.78] mb-10"
              style={{ fontSize:"clamp(15px,2vw,18px)", maxWidth:480 }}>
              Six AI tools. One platform. Resume builder, mock interviews,
              auto-apply, salary intel and more — built for India.
            </p>

            {/* CTAs */}
            <div className="h4 flex flex-wrap items-center justify-center gap-3 mb-12">
              <button onClick={() => scrollToTool(TOOLS[0].id)}
                className="cta-glow inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl text-[14px] font-bold bg-white text-[#04071a] hover:-translate-y-0.5 transition-all duration-200"
              >
                Explore All Tools
                <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
              <Link href="/"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl text-[14px] font-semibold text-white/65 border hover:bg-white/[0.07] hover:text-white/90 transition-all duration-200"
                style={{ borderColor:"rgba(255,255,255,0.13)", textDecoration:"none" }}
              >
                Join Waitlist
              </Link>
            </div>

            {/* Trust row */}
            <div className="h5 flex flex-wrap items-center justify-center gap-3">
              <div className="flex -space-x-2.5">
                {[{i:"AK",c:"#3b5bdb"},{i:"SR",c:"#0d9488"},{i:"PV",c:"#7c3aed"},{i:"MR",c:"#dc2626"},{i:"NS",c:"#b45309"}].map(a=>(
                  <div key={a.i} className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black text-white border-2 shrink-0"
                    style={{ background:a.c, borderColor:"#04071a" }}>{a.i}</div>
                ))}
              </div>
              <p className="text-[13px] text-white/40">
                <span className="text-white/75 font-bold">12,000+</span> professionals on waitlist
              </p>
            </div>

          </div>

          {/* ── Stats strip ── */}
          <div className="relative border-t pb-0" style={{ borderColor:"rgba(255,255,255,0.07)", background:"rgba(255,255,255,0.025)" }}>
            <div className="max-w-[1140px] mx-auto px-5 sm:px-8">
              <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/[0.06]">
                {[
                  { val:"6",    label:"AI Tools",         icon:"M12 2L2 7l10 5 10-5-10-5z M2 17l10 5 10-5 M2 12l10 5 10-5" },
                  { val:"92%",  label:"Avg ATS Score",    icon:"M22 11.08V12a10 10 0 1 1-5.93-9.14 M22 4L12 14.01l-3-3" },
                  { val:"5x",   label:"Interview Prep",   icon:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" },
                  { val:"100+", label:"Jobs Applied/Day", icon:"M22 2L11 13 M22 2l-7 20-4-9-9-4 20-7z" },
                ].map((s,i)=>(
                  <div key={i} className="flex items-center gap-3 px-5 sm:px-8 py-5 sm:py-6">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background:"rgba(255,255,255,0.07)" }}>
                      <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d={s.icon}/>
                      </svg>
                    </div>
                    <div>
                      <div className="text-[20px] font-black text-white leading-none">{s.val}</div>
                      <div className="text-[10px] font-semibold text-white/35 uppercase tracking-wider mt-0.5">{s.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Marquee of tools ── */}
          <div className="overflow-hidden border-t py-3.5" style={{ borderColor:"rgba(255,255,255,0.06)", background:"rgba(0,0,0,0.2)" }}>
            <div className="marquee-track flex w-max">
              {[...TOOLS,...TOOLS,...TOOLS].map((t,i)=>(
                <div key={i} className="flex items-center gap-2.5 px-7 shrink-0">
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ background:t.color }} />
                  <span className="text-[12px] font-semibold whitespace-nowrap" style={{ color:"rgba(255,255,255,0.32)" }}>{t.title}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Sticky Tool Selector ── */}
        <div
          ref={selectorRef}
          className="sticky z-40 border-b border-slate-100 bg-white"
          style={{ top: 60 }}
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
              <ToolSection tool={tool} index={i} />
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

        {/* ── CTA Section ── */}
        <div className="max-w-[1140px] mx-auto px-5 sm:px-8 pb-24">
          <div
            className="reveal relative overflow-hidden rounded-3xl px-8 sm:px-16 py-16 sm:py-20"
            style={{ background: "linear-gradient(135deg, #0d1b45, #1d3a8f, #2548c5)" }}
          >
            {/* Orbs */}
            <div
              className="absolute top-0 left-1/3 w-72 h-72 rounded-full opacity-10 blur-[70px] pointer-events-none"
              style={{ background: "radial-gradient(circle, #a78bfa, transparent)" }}
            />
            <div
              className="absolute bottom-0 right-1/4 w-56 h-56 rounded-full opacity-10 blur-[60px] pointer-events-none"
              style={{ background: "radial-gradient(circle, #60a5fa, transparent)" }}
            />

            <div className="relative text-center">
              <h3
                className="font-black text-white tracking-[-0.035em] leading-[1.08] mb-4"
                style={{ fontSize: "clamp(26px, 4vw, 44px)" }}
              >
                Be the first when we launch.
              </h3>
              <p className="text-white/50 text-[15px] mb-10 max-w-[400px] mx-auto leading-[1.75]">
                Join the waitlist. Get early access to every tool.
              </p>

              {/* Email + button */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6 max-w-[440px] mx-auto">
                <input
                  type="email"
                  placeholder="you@email.com"
                  className="flex-1 w-full sm:w-auto rounded-xl px-4 py-3 text-[14px] font-medium text-slate-800 outline-none border-0"
                  style={{ background: "rgba(255,255,255,0.95)" }}
                />
                <button
                  className="w-full sm:w-auto shrink-0 px-6 py-3 rounded-xl text-[14px] font-bold text-[#0d1b45] bg-white transition-all hover:-translate-y-0.5"
                  style={{ boxShadow: "0 4px 20px rgba(255,255,255,0.2)" }}
                >
                  Join Waitlist
                </button>
              </div>

              <p className="text-[12px] text-white/30">
                Free forever · No credit card · Cancel anytime
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
