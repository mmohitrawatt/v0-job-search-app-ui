"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"

const TOOLS = [
  {
    title: "AI Resume Builder",
    tagline: "From JD to resume in seconds",
    desc: "Paste any job description and get a fully tailored, ATS-optimized resume. Our AI understands what recruiters look for — keywords, formatting, structure — and gets you past screening.",
    color: "#1d3a8f",
    bg: "#eef1fd",
    border: "#bfcfff",
    gradient: "linear-gradient(135deg, #1d3a8f 0%, #3b5bdb 100%)",
    stat: { value: "92%", label: "Avg ATS Score" },
    features: ["Smart JD Parsing", "ATS Optimization", "Multiple Templates", "Export PDF / DOCX"],
    badge: "Most Popular",
    icon: (
      <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
      </svg>
    ),
  },
  {
    title: "AI Mock Interview",
    tagline: "Practice before the real thing",
    desc: "Our AI interviewer adapts to your target role — SDE, Data Science, Product, or HR rounds. Get real-time scoring on answer quality, communication clarity, and confidence.",
    color: "#0f766e",
    bg: "#ecfdf5",
    border: "#a7f3d0",
    gradient: "linear-gradient(135deg, #0f766e 0%, #14b8a6 100%)",
    stat: { value: "5x", label: "Better Prepared" },
    features: ["Role-Specific Questions", "Real-Time AI Feedback", "Confidence Analysis", "Performance Report"],
    badge: null,
    icon: (
      <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    title: "AI Career Copilot",
    tagline: "Your 24/7 career advisor",
    desc: "Ask anything — skill gaps, career switches, what to learn next, salary benchmarks. Vibe gives you personalized, no-fluff career advice backed by real market data.",
    color: "#7c3aed",
    bg: "#f5f3ff",
    border: "#ddd6fe",
    gradient: "linear-gradient(135deg, #6d28d9 0%, #8b5cf6 100%)",
    stat: { value: "24/7", label: "Always On" },
    features: ["Skill-Gap Analysis", "Career Roadmaps", "Salary Intelligence", "Smart Matching"],
    badge: "New",
    icon: (
      <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
      </svg>
    ),
  },
  {
    title: "AI Auto Apply",
    tagline: "Apply to 100+ jobs while you sleep",
    desc: "Set your preferences once and let our AI apply to matching jobs across all major portals automatically. Every application is personalized with a tailored cover letter.",
    color: "#dc2626",
    bg: "#fef2f2",
    border: "#fecaca",
    gradient: "linear-gradient(135deg, #b91c1c 0%, #ef4444 100%)",
    stat: { value: "100+", label: "Jobs / Day" },
    features: ["Multi-Portal Reach", "Personalized Applications", "Smart Filters", "Application Tracker"],
    badge: null,
    icon: (
      <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
  },
  {
    title: "Salary Intelligence",
    tagline: "Know your worth before you negotiate",
    desc: "Real salary data from verified offers — not guesswork. Compare packages across roles, companies, locations, and experience levels so you never lowball yourself again.",
    color: "#b45309",
    bg: "#fffbeb",
    border: "#fde68a",
    gradient: "linear-gradient(135deg, #92400e 0%, #d97706 100%)",
    stat: { value: "500+", label: "Companies" },
    features: ["Role-Based Data", "Company Benchmarks", "Location Insights", "Negotiation Tips"],
    badge: null,
    icon: (
      <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
  },
  {
    title: "LinkedIn Optimizer",
    tagline: "Get found by recruiters",
    desc: "AI analyzes your LinkedIn profile and gives you specific, actionable improvements — headline, summary, experience bullets, skills ordering, and keyword density.",
    color: "#0369a1",
    bg: "#f0f9ff",
    border: "#bae6fd",
    gradient: "linear-gradient(135deg, #075985 0%, #0284c7 100%)",
    stat: { value: "3x", label: "More Views" },
    features: ["Headline Optimization", "Summary Rewrite", "Experience Bullets", "Keyword Density"],
    badge: null,
    icon: (
      <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    title: "Universal Job Feed",
    tagline: "Every job portal. One place.",
    desc: "Stop switching between Naukri, LinkedIn, Internshala, Indeed, and AngelList. Jobingen pulls live listings from every major portal, deduplicates, and ranks by fit.",
    color: "#059669",
    bg: "#f0fdf4",
    border: "#a7f3d0",
    gradient: "linear-gradient(135deg, #047857 0%, #10b981 100%)",
    stat: { value: "10+", label: "Portals" },
    features: ["Naukri · LinkedIn · Internshala", "Smart Deduplication", "Relevance Ranking", "One-Click Apply"],
    badge: "New",
    icon: (
      <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
      </svg>
    ),
  },
]

export function AITools() {
  const outerRef  = useRef<HTMLDivElement>(null)
  const cardRef   = useRef<HTMLDivElement>(null)
  const idxRef    = useRef(0)
  const timerRef  = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [idx, setIdx] = useState(0)
  const tool = TOOLS[idx] ?? TOOLS[0]

  useEffect(() => {
    const onScroll = () => {
      const el = outerRef.current
      if (!el) return
      const top     = el.getBoundingClientRect().top + window.scrollY
      const scrolled = window.scrollY - top
      const next    = Math.max(0, Math.min(TOOLS.length - 1, Math.floor(scrolled / window.innerHeight)))
      if (next === idxRef.current) return
      idxRef.current = next

      // Fade out → swap content → fade in
      const card = cardRef.current
      if (!card) { setIdx(next); return }
      card.style.transition = "opacity 0.18s ease, transform 0.18s ease"
      card.style.opacity    = "0"
      card.style.transform  = "translateY(16px)"
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => {
        setIdx(next)
        requestAnimationFrame(() => {
          if (!cardRef.current) return
          cardRef.current.style.opacity   = "1"
          cardRef.current.style.transform = "translateY(0)"
        })
      }, 190)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener("scroll", onScroll)
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  return (
    <>
      <style>{`
        .ait-cta { transition: opacity .15s, transform .15s; display: inline-flex; align-items: center; gap: 8px; }
        .ait-cta:hover { opacity: .86; transform: translateY(-2px); }
        .ait-inner { display: grid; grid-template-columns: 1.15fr 0.85fr; gap: 52px; align-items: center; padding: 44px 52px; }
        .ait-rpanel { border-radius: 20px; padding: 36px 28px; display: flex; flex-direction: column; align-items: center; gap: 16px; text-align: center; }
        @media (max-width: 900px) {
          .ait-inner { grid-template-columns: 1fr !important; padding: 28px 22px 30px !important; gap: 0 !important; }
          .ait-rpanel { display: none !important; }
        }
      `}</style>

      {/* ── Outer: tall div = 1 viewport per tool ── */}
      <div ref={outerRef} id="ai-tools" style={{ height: `${TOOLS.length * 100}vh`, position: "relative" }}>

        {/* ── Sticky panel: stays fixed while outer scrolls ── */}
        <div style={{ position: "sticky", top: 0, height: "100vh", background: "#ffffff", display: "flex", flexDirection: "column", justifyContent: "center", overflow: "hidden" }}>

          {/* Header row */}
          <div style={{ padding: "0 clamp(18px,3.5vw,52px)", maxWidth: 1200, margin: "0 auto", width: "100%", marginBottom: 24 }}>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
              <div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "#eff4ff", border: "1px solid #bfcfff", borderRadius: 99, padding: "5px 14px", marginBottom: 12 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#1d3a8f" }} />
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#1d3a8f", letterSpacing: ".08em", textTransform: "uppercase" }}>AI Tools — Coming Soon</span>
                </div>
                <h2 style={{ fontSize: "clamp(22px,3vw,38px)", fontWeight: 900, color: "#0f172a", letterSpacing: "-0.04em", lineHeight: 1.1, margin: 0 }}>
                  Your AI-powered career toolkit
                </h2>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#94a3b8" }}>{idx + 1} / {TOOLS.length}</span>
                <Link href="/ai-tools" style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "linear-gradient(135deg,#1a3585,#2d4fd4 55%,#4668f5)", color: "white", fontSize: 13, fontWeight: 700, padding: "10px 20px", borderRadius: 12, textDecoration: "none", boxShadow: "0 4px 16px rgba(29,58,143,0.28)" }}>
                  Explore All
                  <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Tool card */}
          <div ref={cardRef} style={{ padding: "0 clamp(18px,3.5vw,52px)", maxWidth: 1200, margin: "0 auto", width: "100%" }}>
            <div style={{ borderRadius: 28, overflow: "hidden", background: "#ffffff", border: "1.5px solid rgba(0,0,0,0.08)", boxShadow: "0 4px 40px rgba(0,0,0,0.09)" }}>

              <div style={{ height: 5, background: tool.gradient }} />

              <div className="ait-inner">
                {/* LEFT */}
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 18 }}>
                    <div style={{ width: 62, height: 62, borderRadius: 18, background: tool.gradient, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: `0 8px 24px ${tool.color}35` }}>
                      {tool.icon}
                    </div>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" as const }}>
                        <h3 style={{ fontSize: 26, fontWeight: 900, color: "#0f172a", letterSpacing: "-0.03em", lineHeight: 1.1, margin: 0 }}>{tool.title}</h3>
                        {tool.badge && <span style={{ fontSize: 10, fontWeight: 800, color: tool.color, background: tool.bg, border: `1px solid ${tool.border}`, borderRadius: 99, padding: "3px 10px", textTransform: "uppercase" as const }}>{tool.badge}</span>}
                      </div>
                      <div style={{ fontSize: 13.5, fontWeight: 600, color: tool.color, marginTop: 4 }}>{tool.tagline}</div>
                    </div>
                  </div>

                  <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.75, marginBottom: 22 }}>{tool.desc}</p>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "9px 18px", marginBottom: 30 }}>
                    {tool.features.map(f => (
                      <div key={f} style={{ display: "flex", alignItems: "center", gap: 9 }}>
                        <div style={{ width: 17, height: 17, borderRadius: "50%", background: tool.bg, border: `1px solid ${tool.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <svg width="9" height="9" fill="none" viewBox="0 0 24 24" stroke={tool.color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                        </div>
                        <span style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>{f}</span>
                      </div>
                    ))}
                  </div>

                  <Link href="/ai-tools" className="ait-cta" style={{ background: tool.gradient, color: "white", fontSize: 14, fontWeight: 700, padding: "13px 28px", borderRadius: 14, textDecoration: "none", boxShadow: `0 6px 20px ${tool.color}35` }}>
                    Explore Tool
                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </Link>
                </div>

                {/* RIGHT */}
                <div className="ait-rpanel" style={{ background: tool.bg, border: `1.5px solid ${tool.border}` }}>
                  <div>
                    <div style={{ fontSize: 80, fontWeight: 900, color: tool.color, letterSpacing: "-0.05em", lineHeight: 1 }}>{tool.stat.value}</div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase" as const, letterSpacing: ".08em", marginTop: 8 }}>{tool.stat.label}</div>
                  </div>
                  <div style={{ width: "100%", height: 1, background: tool.border }} />
                  <div style={{ display: "flex", flexDirection: "column" as const, gap: 7, width: "100%" }}>
                    {tool.features.map(f => (
                      <div key={f} style={{ fontSize: 12, fontWeight: 600, color: tool.color, background: "rgba(255,255,255,0.72)", borderRadius: 8, padding: "5px 12px" }}>{f}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right-side vertical dot progress */}
          <div style={{ position: "absolute", right: 20, top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", gap: 7 }}>
            {TOOLS.map((_, i) => (
              <div key={i} style={{ width: 5, borderRadius: 99, background: i === idx ? tool.color : "#e2e8f0", height: i === idx ? 22 : 5, transition: "height .28s ease, background .28s ease" }} />
            ))}
          </div>

          {/* Scroll hint — hide on last tool */}
          <div style={{ position: "absolute", bottom: 20, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 4, opacity: idx < TOOLS.length - 1 ? 1 : 0, transition: "opacity .3s" }}>
            <span style={{ fontSize: 10.5, fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", letterSpacing: ".08em" }}>Scroll</span>
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
          </div>

        </div>
      </div>
    </>
  )
}
