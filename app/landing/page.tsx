"use client"

import { useEffect, useRef, useState } from "react"

// ─── Keyframe animations ───────────────────────────────────────
const KEYFRAMES = `
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0.8deg); }
    50%       { transform: translateY(-14px) rotate(0.8deg); }
  }
  @keyframes float-reverse {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(8px); }
  }
  @keyframes card-drift-a {
    0%, 100% { transform: translateY(0px) translateX(0px); }
    40%       { transform: translateY(-8px) translateX(3px); }
    70%       { transform: translateY(4px) translateX(-2px); }
  }
  @keyframes card-drift-b {
    0%, 100% { transform: translateY(0px) translateX(0px); }
    35%       { transform: translateY(6px) translateX(-3px); }
    65%       { transform: translateY(-4px) translateX(2px); }
  }
  @keyframes card-drift-c {
    0%, 100% { transform: translateY(0px) translateX(0px); }
    50%       { transform: translateY(-6px) translateX(4px); }
  }
  @keyframes glow-pulse {
    0%, 100% { opacity: 0.18; }
    50%       { opacity: 0.38; }
  }
  @keyframes shimmer {
    0%   { background-position: -400% center; }
    100% { background-position: 400% center; }
  }
  @keyframes pulse-ring {
    0%   { transform: scale(1);   opacity: 0.7; }
    100% { transform: scale(2.2); opacity: 0; }
  }
  @keyframes slide-up {
    from { opacity: 0; transform: translateY(32px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fade-in {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes badge-bob {
    0%, 100% { transform: translateY(0px) scale(1); }
    50%       { transform: translateY(-6px) scale(1.02); }
  }
  @keyframes gradient-x {
    0%, 100% { background-position: 0% 50%; }
    50%       { background-position: 100% 50%; }
  }
  @keyframes count-up {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .animate-section {
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.7s ease-out, transform 0.7s ease-out;
  }
  .animate-section.visible {
    opacity: 1;
    transform: translateY(0);
  }
  .shimmer-text {
    background: linear-gradient(90deg, #818cf8 0%, #c4b5fd 30%, #f0abfc 50%, #c4b5fd 70%, #818cf8 100%);
    background-size: 300% auto;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shimmer 4s linear infinite;
  }
  .gradient-border-card {
    position: relative;
  }
  .gradient-border-card::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1px;
    background: linear-gradient(135deg, rgba(99,102,241,0.4), rgba(139,92,246,0.1), rgba(99,102,241,0.0));
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }
  .pro-card-glow {
    box-shadow: 0 0 0 1px rgba(99,102,241,0.3), 0 20px 60px rgba(99,102,241,0.15), 0 0 80px rgba(139,92,246,0.1);
  }
`

// ─── Color tokens ──────────────────────────────────────────────
const C = {
  bg:      "#030712",
  glass:   "rgba(255,255,255,0.04)",
  glassHi: "rgba(255,255,255,0.07)",
  border:  "rgba(255,255,255,0.08)",
  borderHi:"rgba(255,255,255,0.16)",
  text:    "rgba(255,255,255,0.92)",
  textSub: "rgba(255,255,255,0.58)",
  textMut: "rgba(255,255,255,0.32)",
  indigo:  "#4f46e5",
  violet:  "#7c3aed",
}

// ─── Hero mockup ───────────────────────────────────────────────

function HeroMockup() {
  return (
    <div className="relative w-[340px] lg:w-[390px] h-[460px] lg:h-[500px] mx-auto flex-shrink-0"
      style={{ animation: "float 6s ease-in-out infinite" }}>

      {/* Glow behind */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.35), transparent 70%)", animation: "glow-pulse 3s ease-in-out infinite", filter: "blur(40px)" }} />

      {/* Outer frame */}
      <div className="absolute inset-0 rounded-[28px]"
        style={{ background: "rgba(15,18,40,0.95)", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04) inset" }}>

        {/* Notch / header bar */}
        <div className="flex items-center gap-1.5 px-4 pt-4 pb-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
          <div className="flex-1 mx-2 h-4 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }} />
          <div className="w-4 h-4 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }} />
        </div>

        {/* Card A — Job Match */}
        <div className="absolute top-14 left-4 right-4 rounded-2xl p-3.5"
          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", animation: "card-drift-a 8s ease-in-out infinite", animationDelay: "0s" }}>
          <div className="flex items-center gap-2.5 mb-2.5">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-[11px] font-black flex-shrink-0"
              style={{ background: "rgba(249,115,22,0.15)", border: "1px solid rgba(249,115,22,0.2)", color: "#fb923c" }}>SW</div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-semibold truncate" style={{ color: C.text }}>SDE II — AI/ML</p>
              <p className="text-[10px]" style={{ color: C.textMut }}>Swiggy · ₹32–52 LPA · Mumbai</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-[18px] font-black leading-none shimmer-text">94%</p>
              <p className="text-[9px]" style={{ color: C.textMut }}>Match</p>
            </div>
          </div>
          {/* Skill bars */}
          <div className="space-y-1.5">
            {[
              { label: "Skills",      pct: 95, color: "#6366f1" },
              { label: "Experience",  pct: 88, color: "#8b5cf6" },
              { label: "Culture fit", pct: 91, color: "#10b981" },
            ].map(b => (
              <div key={b.label} className="flex items-center gap-2">
                <span className="text-[9px] w-14 flex-shrink-0" style={{ color: C.textMut }}>{b.label}</span>
                <div className="flex-1 h-1 rounded-full" style={{ background: "rgba(255,255,255,0.07)" }}>
                  <div className="h-full rounded-full" style={{ width: `${b.pct}%`, background: b.color }} />
                </div>
                <span className="text-[9px] w-6 text-right" style={{ color: C.textMut }}>{b.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Card B — Pipeline */}
        <div className="absolute top-[210px] left-6 right-2 rounded-2xl p-3"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", animation: "card-drift-b 9s ease-in-out infinite", animationDelay: "3s" }}>
          <p className="text-[11px] font-bold mb-2.5" style={{ color: C.text }}>Application Pipeline</p>
          <div className="flex items-center gap-2 mb-2">
            {[
              { label: "Applied",    n: 12, color: "#6366f1" },
              { label: "Screen",     n: 5,  color: "#8b5cf6" },
              { label: "Interview",  n: 3,  color: "#f59e0b" },
              { label: "Offer",      n: 1,  color: "#10b981" },
            ].map(s => (
              <div key={s.label} className="flex flex-col items-center gap-0.5 flex-1">
                <span className="text-[14px] font-black" style={{ color: s.color }}>{s.n}</span>
                <span className="text-[8px]" style={{ color: C.textMut }}>{s.label}</span>
              </div>
            ))}
          </div>
          <div className="flex h-1.5 rounded-full overflow-hidden gap-px">
            {[{ w: 57, c: "#6366f1" }, { w: 24, c: "#8b5cf6" }, { w: 14, c: "#f59e0b" }, { w: 5, c: "#10b981" }].map((s, i) => (
              <div key={i} className="rounded-full" style={{ width: `${s.w}%`, background: s.c }} />
            ))}
          </div>
        </div>

        {/* Card C — Prep Streak */}
        <div className="absolute top-[335px] left-2 right-6 rounded-2xl p-3"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", animation: "card-drift-c 7s ease-in-out infinite", animationDelay: "1.5s" }}>
          <div className="flex items-center justify-between mb-2">
            <p className="text-[11px] font-bold" style={{ color: C.text }}>5-Day Interview Prep</p>
            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(245,158,11,0.15)", color: "#fbbf24" }}>🔥 Day 3</span>
          </div>
          <div className="flex items-center gap-1.5 mb-2">
            {[1, 2, 3, 4, 5].map(d => (
              <div key={d} className="relative flex-1 flex items-center justify-center h-7 rounded-full text-[9px] font-bold"
                style={{
                  background: d < 3 ? "#4f46e5" : d === 3 ? "#4f46e5" : "rgba(255,255,255,0.07)",
                  border: d === 3 ? "2px solid rgba(99,102,241,0.5)" : "1px solid rgba(255,255,255,0.1)",
                  color: d <= 3 ? "white" : C.textMut,
                }}>
                {d < 3 ? "✓" : d}
                {d === 3 && (
                  <span className="absolute inset-0 rounded-full" style={{ border: "2px solid rgba(99,102,241,0.5)", animation: "pulse-ring 1.8s ease-out infinite" }} />
                )}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[9px]" style={{ color: C.textMut }}>Next: System Design</span>
            <span className="text-[9px] font-semibold" style={{ color: "#818cf8" }}>Continue →</span>
          </div>
        </div>
      </div>

      {/* Floating badges */}
      <div className="absolute -top-3 -right-5 z-20 flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl"
        style={{ background: "rgba(5,10,30,0.95)", border: "1px solid rgba(16,185,129,0.3)", boxShadow: "0 4px 20px rgba(0,0,0,0.4)", animation: "badge-bob 4s ease-in-out infinite", animationDelay: "1s" }}>
        <span className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" style={{ animation: "fade-in 0.5s" }} />
        <span className="text-[11px] font-bold text-emerald-400">ATS 92 ↑</span>
      </div>

      <div className="absolute -bottom-3 -left-5 z-20 flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl"
        style={{ background: "rgba(5,10,30,0.95)", border: "1px solid rgba(99,102,241,0.3)", boxShadow: "0 4px 20px rgba(0,0,0,0.4)", animation: "badge-bob 4.5s ease-in-out infinite", animationDelay: "0.5s" }}>
        <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M7 2L8.5 5.5H12.5L9.5 7.5L10.5 11L7 9L3.5 11L4.5 7.5L1.5 5.5H5.5L7 2Z" fill="#818cf8" /></svg>
        <span className="text-[11px] font-semibold" style={{ color: "#a5b4fc" }}>Vibe AI</span>
      </div>
    </div>
  )
}

// ─── Navbar ────────────────────────────────────────────────────

function Navbar({ scrolled }: { scrolled: boolean }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(3,7,18,0.85)" : "rgba(3,7,18,0.5)",
        backdropFilter: "blur(20px)",
        borderBottom: scrolled ? `1px solid ${C.border}` : "1px solid transparent",
      }}>
      <div className="max-w-6xl mx-auto px-4 lg:px-8 h-16 flex items-center justify-between gap-6">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5 flex-shrink-0">
          <div className="w-8 h-8 rounded-[8px] flex items-center justify-center text-[15px] font-black text-white"
            style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)" }}>J</div>
          <span className="text-[16px] font-black text-white tracking-tight">JobsAI</span>
        </a>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-7">
          {["Features", "How It Works", "Pricing"].map(l => (
            <a key={l} href={`#${l.toLowerCase().replace(/ /g, "-")}`}
              className="text-[13px] font-medium transition-colors duration-200"
              style={{ color: C.textSub }}
              onMouseEnter={e => (e.currentTarget.style.color = "white")}
              onMouseLeave={e => (e.currentTarget.style.color = C.textSub)}>
              {l}
            </a>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex items-center gap-2.5">
          <a href="/" className="hidden sm:block text-[12px] font-semibold px-3.5 py-2 rounded-[8px] transition-all"
            style={{ color: C.textSub, border: `1px solid ${C.border}` }}
            onMouseEnter={e => { e.currentTarget.style.color = "white"; e.currentTarget.style.borderColor = C.borderHi }}
            onMouseLeave={e => { e.currentTarget.style.color = C.textSub; e.currentTarget.style.borderColor = C.border }}>
            Open App
          </a>
          <a href="/" className="text-[12px] font-bold px-4 py-2 rounded-[8px] text-white transition-all"
            style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)", boxShadow: "0 0 20px rgba(99,102,241,0.3)" }}
            onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 0 30px rgba(99,102,241,0.5)")}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 0 20px rgba(99,102,241,0.3)")}>
            Get Started Free
          </a>
        </div>
      </div>
    </nav>
  )
}

// ─── Hero Section ──────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden"
      style={{ background: C.bg }}>

      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      {/* Radial glow */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)", filter: "blur(40px)" }} />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)", filter: "blur(60px)" }} />

      <div className="max-w-6xl mx-auto px-4 lg:px-8 w-full py-16 lg:py-24">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* Left */}
          <div className="flex-1 min-w-0 text-center lg:text-left" style={{ animation: "slide-up 0.7s ease-out both" }}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-6"
              style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.25)" }}>
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full opacity-75 bg-indigo-400" style={{ animation: "pulse-ring 1.5s ease-out infinite" }} />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-400" />
              </span>
              <span className="text-[12px] font-semibold" style={{ color: "#a5b4fc" }}>Powered by Vibe AI · For India's Tech Jobs</span>
            </div>

            {/* Headline */}
            <h1 className="text-[40px] sm:text-[52px] lg:text-[58px] font-black leading-[1.08] tracking-tight mb-5" style={{ color: "white" }}>
              Land Your<br />
              <span className="shimmer-text">Dream Tech Job</span><br />
              Faster.
            </h1>

            <p className="text-[16px] lg:text-[17px] leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0" style={{ color: C.textSub }}>
              AI-powered resume tailoring, smart job matching with % scores, salary intelligence in ₹ LPA, and a 5-day interview prep streak — built for India's top tech companies.
            </p>

            {/* Stat chips */}
            <div className="flex flex-wrap gap-2.5 justify-center lg:justify-start mb-8">
              {[
                { icon: "⚡", text: "92% avg ATS score" },
                { icon: "📈", text: "3× more callbacks" },
                { icon: "🏆", text: "50,000+ hired" },
              ].map(s => (
                <div key={s.text} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium"
                  style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${C.border}`, color: C.textSub }}>
                  <span>{s.icon}</span>{s.text}
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <a href="/" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[12px] text-[14px] font-bold text-white transition-all"
                style={{ background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)", boxShadow: "0 4px 30px rgba(99,102,241,0.4)" }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 6px 40px rgba(99,102,241,0.6)")}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 4px 30px rgba(99,102,241,0.4)")}>
                Start Free — No Credit Card
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </a>
              <a href="/" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[12px] text-[14px] font-semibold transition-all"
                style={{ color: "white", border: `1px solid ${C.border}`, background: "rgba(255,255,255,0.04)" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = C.borderHi)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = C.border)}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" /><path d="M6.5 6C6.5 5.17 7.17 4.5 8 4.5C8.83 4.5 9.5 5.17 9.5 6C9.5 7 8 7.75 8 9M8 11V11.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
                Watch Demo
              </a>
            </div>

            {/* Trust line */}
            <p className="mt-5 text-[12px]" style={{ color: C.textMut }}>
              Trusted by developers at Swiggy, Flipkart, CRED, PhonePe, Razorpay & more
            </p>
          </div>

          {/* Right — Mockup */}
          <div className="flex-shrink-0 lg:w-[420px]" style={{ animation: "slide-up 0.7s ease-out 0.2s both" }}>
            <HeroMockup />
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Stats Bar ─────────────────────────────────────────────────

function StatsBar() {
  const stats = [
    { value: "50K+",    label: "Active Users" },
    { value: "₹18 LPA", label: "Avg Salary Boost" },
    { value: "4.9★",    label: "User Rating" },
    { value: "93%",     label: "Interview Success" },
  ]
  return (
    <section className="animate-section border-y" style={{ borderColor: C.border, background: "rgba(255,255,255,0.02)" }}>
      <div className="max-w-6xl mx-auto px-4 lg:px-8 py-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x" style={{ borderColor: C.border }}>
          {stats.map((s, i) => (
            <div key={i} className="text-center lg:px-8">
              <p className="text-[32px] lg:text-[38px] font-black leading-none mb-1 shimmer-text">{s.value}</p>
              <p className="text-[13px]" style={{ color: C.textSub }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Features Section ──────────────────────────────────────────

function FeaturesSection() {
  const features = [
    {
      icon: "✦", iconBg: "rgba(99,102,241,0.15)", iconColor: "#818cf8",
      title: "AI Resume Tailor",
      desc: "Paste any JD and get keyword-matched bullet points in seconds. ATS score jumps 40+ points instantly.",
      tag: "Most Used",
    },
    {
      icon: "◎", iconBg: "rgba(139,92,246,0.15)", iconColor: "#a78bfa",
      title: "Smart Job Matching",
      desc: "See your fit % before you apply. Every job ranked by skill match, experience, culture, and salary alignment.",
    },
    {
      icon: "₹", iconBg: "rgba(16,185,129,0.12)", iconColor: "#34d399",
      title: "Salary Intelligence",
      desc: "Live ₹ LPA benchmarks by role, city, and company. Know market rate before walking into any negotiation.",
    },
    {
      icon: "◈", iconBg: "rgba(245,158,11,0.12)", iconColor: "#fbbf24",
      title: "5-Day Interview Prep",
      desc: "Structured roadmap: DSA, system design, HR rounds. Daily subtasks, streak tracking, Vibe AI coaching.",
      tag: "New",
    },
    {
      icon: "⬡", iconBg: "rgba(59,130,246,0.12)", iconColor: "#60a5fa",
      title: "Application Pipeline",
      desc: "Visual kanban tracker from Applied → Offer. Know exactly where each application stands in real time.",
    },
    {
      icon: "◆", iconBg: "rgba(244,63,94,0.12)", iconColor: "#fb7185",
      title: "Vibe AI Strategist",
      desc: "Your personal AI career coach. Weekly action plans, feedback on every application, negotiation scripts.",
    },
  ]

  return (
    <section id="features" className="animate-section py-20 lg:py-28" style={{ background: C.bg }}>
      <div className="max-w-6xl mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest mb-4"
            style={{ background: "rgba(99,102,241,0.1)", color: "#818cf8", border: "1px solid rgba(99,102,241,0.2)" }}>
            Features
          </div>
          <h2 className="text-[36px] lg:text-[44px] font-black leading-tight text-white mb-4">
            Everything You Need<br />
            <span className="shimmer-text">to Get Hired</span>
          </h2>
          <p className="text-[16px] max-w-xl mx-auto" style={{ color: C.textSub }}>
            One platform built for India's competitive tech job market — from resume to offer letter.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <div key={i}
              className="gradient-border-card group rounded-2xl p-6 transition-all duration-300 cursor-default relative overflow-hidden"
              style={{ background: C.glass, border: `1px solid ${C.border}` }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = C.glassHi; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)" }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = C.glass; (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)" }}>

              {/* Glow on hover */}
              <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.5), transparent)" }} />

              {/* Icon */}
              <div className="w-11 h-11 rounded-[10px] flex items-center justify-center text-xl font-black mb-4 flex-shrink-0"
                style={{ background: f.iconBg, color: f.iconColor }}>
                {f.icon}
              </div>

              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="text-[15px] font-bold text-white">{f.title}</h3>
                {f.tag && (
                  <span className="text-[9px] font-black px-2 py-0.5 rounded-full flex-shrink-0 mt-0.5"
                    style={{ background: "rgba(99,102,241,0.15)", color: "#818cf8", border: "1px solid rgba(99,102,241,0.25)" }}>
                    {f.tag}
                  </span>
                )}
              </div>
              <p className="text-[13px] leading-relaxed" style={{ color: C.textSub }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── How It Works ──────────────────────────────────────────────

function HowItWorksSection() {
  const steps = [
    { n: "01", color: "#6366f1", title: "Build Your Profile", desc: "Upload your resume or build from scratch. Vibe AI scores it instantly and highlights gaps before you even apply." },
    { n: "02", color: "#8b5cf6", title: "Discover & Match",   desc: "AI scans thousands of jobs daily and ranks them by your fit %. See exactly which skills to highlight for each role." },
    { n: "03", color: "#10b981", title: "Prep, Apply & Win",  desc: "5-day interview roadmap tailored to the JD + one-tap Smart Apply with a custom-tailored resume. Land the offer." },
  ]

  return (
    <section id="how-it-works" className="animate-section py-20 lg:py-28"
      style={{ background: "linear-gradient(180deg, rgba(15,18,40,0.5) 0%, rgba(3,7,18,1) 100%)", borderTop: `1px solid ${C.border}` }}>
      <div className="max-w-6xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest mb-4"
            style={{ background: "rgba(16,185,129,0.1)", color: "#34d399", border: "1px solid rgba(16,185,129,0.2)" }}>
            How It Works
          </div>
          <h2 className="text-[36px] lg:text-[44px] font-black text-white leading-tight">
            Profile to Offer in<br /><span className="shimmer-text">3 Simple Steps</span>
          </h2>
        </div>

        <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Connector line (desktop) */}
          <div className="absolute hidden lg:block top-12 left-[calc(16.7%+2rem)] right-[calc(16.7%+2rem)] h-px"
            style={{ background: "linear-gradient(90deg, rgba(99,102,241,0.6), rgba(139,92,246,0.6), rgba(16,185,129,0.6))", borderTop: "1px dashed rgba(255,255,255,0.1)" }} />

          {steps.map((s, i) => (
            <div key={i} className="relative text-center lg:text-left">
              {/* Number circle */}
              <div className="relative w-16 h-16 rounded-full flex items-center justify-center mx-auto lg:mx-0 mb-5"
                style={{ background: `${s.color}20`, border: `2px solid ${s.color}40` }}>
                <span className="text-[22px] font-black" style={{ color: s.color }}>{i + 1}</span>
                {/* Watermark */}
                <span className="absolute text-[80px] font-black leading-none select-none pointer-events-none"
                  style={{ color: "rgba(255,255,255,0.025)", top: "-12px", left: "calc(50% - 40px)" }}>{s.n}</span>
              </div>
              <h3 className="text-[18px] font-bold text-white mb-2">{s.title}</h3>
              <p className="text-[14px] leading-relaxed" style={{ color: C.textSub }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Testimonials ──────────────────────────────────────────────

function TestimonialsSection() {
  const testimonials = [
    {
      quote: "JobsAI's resume tailor got me 3 interview calls in one week. The ATS score went from 61% to 94% overnight. The salary intel helped me negotiate ₹44 LPA at Zepto.",
      name: "Rahul M.", role: "SDE II", company: "Zepto", initials: "RM", color: "#8b5cf6",
    },
    {
      quote: "The 5-day prep streak and Vibe AI mock interviews completely changed how I prepared. Cracked the Flipkart system design round on my first attempt. Life-changing tool.",
      name: "Priya S.", role: "Product Manager", company: "Flipkart", initials: "PS", color: "#f59e0b",
    },
    {
      quote: "Saw 94% match on a Swiggy job, knew exactly which skills to highlight. Got an offer in 12 days. JobsAI basically did my job search for me. Worth every rupee.",
      name: "Arjun K.", role: "Backend Engineer", company: "Swiggy", initials: "AK", color: "#10b981",
    },
  ]

  return (
    <section className="animate-section py-20 lg:py-28" style={{ background: C.bg, borderTop: `1px solid ${C.border}` }}>
      <div className="max-w-6xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest mb-4"
            style={{ background: "rgba(245,158,11,0.1)", color: "#fbbf24", border: "1px solid rgba(245,158,11,0.2)" }}>
            Testimonials
          </div>
          <h2 className="text-[36px] lg:text-[44px] font-black text-white">
            Hired at <span className="shimmer-text">Top Indian Companies</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <div key={i} className="rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300"
              style={{ background: C.glass, border: `1px solid ${C.border}` }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = C.borderHi)}
              onMouseLeave={e => (e.currentTarget.style.borderColor = C.border)}>
              {/* Stars */}
              <div className="flex gap-1">
                {[...Array(5)].map((_, j) => (
                  <svg key={j} width="14" height="14" viewBox="0 0 14 14" fill="#818cf8"><path d="M7 1L8.5 5H13L9.5 7.5L11 12L7 9.5L3 12L4.5 7.5L1 5H5.5L7 1Z" /></svg>
                ))}
              </div>
              <p className="text-[13.5px] leading-relaxed flex-1" style={{ color: C.textSub }}>&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-3 pt-3 border-t" style={{ borderColor: C.border }}>
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-black text-white flex-shrink-0"
                  style={{ background: `${t.color}30`, border: `1px solid ${t.color}40` }}>{t.initials}</div>
                <div>
                  <p className="text-[13px] font-bold text-white">{t.name}</p>
                  <p className="text-[11px]" style={{ color: C.textMut }}>{t.role} · {t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Pricing ───────────────────────────────────────────────────

function PricingSection() {
  const freeFeatures = ["5 job applications / month", "Basic resume builder", "Job match scores", "1-day interview prep", "3 active job alerts"]
  const proFeatures  = ["Everything in Free", "Unlimited applications", "AI Resume Tailor", "Salary Intelligence", "5-Day AI Prep + Streak", "Smart Apply", "Vibe AI Strategist", "Priority support"]

  return (
    <section id="pricing" className="animate-section py-20 lg:py-28"
      style={{ background: "linear-gradient(180deg, rgba(3,7,18,1) 0%, rgba(15,18,40,0.4) 100%)", borderTop: `1px solid ${C.border}` }}>
      <div className="max-w-6xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest mb-4"
            style={{ background: "rgba(99,102,241,0.1)", color: "#818cf8", border: "1px solid rgba(99,102,241,0.2)" }}>
            Pricing
          </div>
          <h2 className="text-[36px] lg:text-[44px] font-black text-white mb-4">
            Simple, <span className="shimmer-text">Transparent</span> Pricing
          </h2>
          <p className="text-[16px]" style={{ color: C.textSub }}>Start free forever. Upgrade when you&apos;re ready to go all-in.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Free */}
          <div className="rounded-2xl p-7 flex flex-col" style={{ background: C.glass, border: `1px solid ${C.border}` }}>
            <p className="text-[13px] font-bold uppercase tracking-widest mb-2" style={{ color: C.textMut }}>Free</p>
            <div className="flex items-end gap-1.5 mb-6">
              <span className="text-[42px] font-black text-white leading-none">₹0</span>
              <span className="text-[14px] mb-2" style={{ color: C.textSub }}>/month</span>
            </div>
            <ul className="space-y-3 mb-8 flex-1">
              {freeFeatures.map(f => (
                <li key={f} className="flex items-center gap-2.5">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" fill="rgba(255,255,255,0.06)" /><path d="M4 7L6 9L10 5" stroke="rgba(255,255,255,0.4)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  <span className="text-[13px]" style={{ color: C.textSub }}>{f}</span>
                </li>
              ))}
            </ul>
            <a href="/" className="block text-center py-3 rounded-[10px] text-[13px] font-bold transition-all"
              style={{ border: `1px solid ${C.border}`, color: "white" }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = C.borderHi)}
              onMouseLeave={e => (e.currentTarget.style.borderColor = C.border)}>
              Get Started Free
            </a>
          </div>

          {/* Pro */}
          <div className="rounded-2xl p-7 flex flex-col relative overflow-hidden pro-card-glow"
            style={{ background: "linear-gradient(145deg, rgba(79,70,229,0.2) 0%, rgba(124,58,237,0.12) 100%)", border: "1px solid rgba(99,102,241,0.4)" }}>
            {/* Popular badge */}
            <div className="absolute top-4 right-4 px-2.5 py-0.5 rounded-full text-[10px] font-black"
              style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)", color: "white" }}>
              MOST POPULAR
            </div>

            <p className="text-[13px] font-bold uppercase tracking-widest mb-2" style={{ color: "#a5b4fc" }}>Pro</p>
            <div className="flex items-end gap-1.5 mb-1">
              <span className="text-[42px] font-black text-white leading-none">₹499</span>
              <span className="text-[14px] mb-2" style={{ color: "#a5b4fc" }}>/month</span>
            </div>
            <p className="text-[12px] mb-6 line-through" style={{ color: C.textMut }}>₹999 regular price</p>
            <ul className="space-y-3 mb-8 flex-1">
              {proFeatures.map(f => (
                <li key={f} className="flex items-center gap-2.5">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" fill="rgba(99,102,241,0.25)" /><path d="M4 7L6 9L10 5" stroke="#818cf8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  <span className="text-[13px] text-white">{f}</span>
                </li>
              ))}
            </ul>
            <a href="/" className="block text-center py-3.5 rounded-[10px] text-[14px] font-black text-white transition-all"
              style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)", boxShadow: "0 4px 20px rgba(99,102,241,0.4)" }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 6px 30px rgba(99,102,241,0.6)")}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 4px 20px rgba(99,102,241,0.4)")}>
              Start 7-Day Free Trial →
            </a>
            <p className="text-center text-[11px] mt-3" style={{ color: C.textMut }}>No credit card · Cancel anytime</p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── CTA Banner ────────────────────────────────────────────────

function CTASection() {
  return (
    <section className="animate-section py-20 lg:py-28 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, rgba(79,70,229,0.15) 0%, rgba(124,58,237,0.1) 100%)", borderTop: `1px solid ${C.border}` }}>
      <div className="absolute inset-0 opacity-[0.06]"
        style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)", backgroundSize: "24px 24px" }} />
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.2), transparent 70%)", filter: "blur(60px)" }} />

      <div className="relative max-w-2xl mx-auto px-4 lg:px-8 text-center">
        <h2 className="text-[36px] lg:text-[48px] font-black text-white leading-tight mb-4">
          Ready to Land<br /><span className="shimmer-text">Your Next Role?</span>
        </h2>
        <p className="text-[16px] mb-8" style={{ color: C.textSub }}>
          Join 50,000+ job seekers using JobsAI to get hired faster at India&apos;s top tech companies.
        </p>
        <a href="/" className="inline-flex items-center gap-2.5 px-8 py-4 rounded-[14px] text-[15px] font-black text-white transition-all"
          style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)", boxShadow: "0 6px 40px rgba(99,102,241,0.4)" }}
          onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 8px 50px rgba(99,102,241,0.6)")}
          onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 6px 40px rgba(99,102,241,0.4)")}>
          Get Started Free Today
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 9H15M11 5L15 9L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </a>
        <p className="text-[12px] mt-4" style={{ color: C.textMut }}>
          Free forever plan available · No credit card required
        </p>
      </div>
    </section>
  )
}

// ─── Footer ────────────────────────────────────────────────────

function Footer() {
  const links = {
    Product: ["Features", "How It Works", "Pricing", "Changelog"],
    Company:  ["About", "Blog", "Careers", "Press"],
    Legal:    ["Privacy Policy", "Terms of Service", "Cookie Policy"],
  }

  return (
    <footer style={{ background: C.bg, borderTop: `1px solid ${C.border}` }}>
      <div className="max-w-6xl mx-auto px-4 lg:px-8 py-14">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-[8px] flex items-center justify-center text-[15px] font-black text-white"
                style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)" }}>J</div>
              <span className="text-[16px] font-black text-white">JobsAI</span>
            </div>
            <p className="text-[13px] leading-relaxed max-w-[220px]" style={{ color: C.textMut }}>
              AI-powered job search built for India&apos;s tech job market. From resume to offer letter.
            </p>
          </div>
          {/* Links */}
          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <p className="text-[11px] font-bold uppercase tracking-widest mb-4" style={{ color: C.textMut }}>{section}</p>
              <ul className="space-y-2.5">
                {items.map(item => (
                  <li key={item}>
                    <a href="/" className="text-[13px] transition-colors" style={{ color: C.textSub }}
                      onMouseEnter={e => (e.currentTarget.style.color = "white")}
                      onMouseLeave={e => (e.currentTarget.style.color = C.textSub)}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: `1px solid ${C.border}` }}>
          <p className="text-[12px]" style={{ color: C.textMut }}>
            © 2026 JobsAI. Built with ❤️ for India&apos;s job seekers.
          </p>
          <div className="flex items-center gap-4">
            {[
              { label: "LinkedIn", path: "M3 3H7V11H3V3ZM5 1.5C5 2.33 4.33 3 3.5 3C2.67 3 2 2.33 2 1.5C2 0.67 2.67 0 3.5 0C4.33 0 5 0.67 5 1.5ZM9 3H13V4.5C13.5 3.5 14.5 3 16 3C18.5 3 20 4.5 20 7.5V11H16V8C16 7 15.5 6.5 14.5 6.5C13.5 6.5 13 7 13 8V11H9V3Z" },
              { label: "Twitter", path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
            ].map(s => (
              <a key={s.label} href="/" aria-label={s.label} className="transition-colors"
                style={{ color: C.textMut }}
                onMouseEnter={e => (e.currentTarget.style.color = "white")}
                onMouseLeave={e => (e.currentTarget.style.color = C.textMut)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d={s.path} /></svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─── Main Page ─────────────────────────────────────────────────

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    // Override body bg
    const prev = document.body.style.backgroundColor
    document.body.style.backgroundColor = "#030712"
    return () => { document.body.style.backgroundColor = prev }
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible") }),
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    )
    document.querySelectorAll(".animate-section").forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: KEYFRAMES }} />
      <div style={{ backgroundColor: C.bg, fontFamily: "var(--font-inter, system-ui, sans-serif)" }}>
        <Navbar scrolled={scrolled} />
        <HeroSection />
        <StatsBar />
        <FeaturesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <PricingSection />
        <CTASection />
        <Footer />
      </div>
    </>
  )
}
