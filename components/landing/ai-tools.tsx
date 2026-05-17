"use client"

import { useRef, useEffect, useCallback } from "react"
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
  const scrollRef = useRef<HTMLDivElement>(null)
  const cardRefs  = useRef<(HTMLDivElement | null)[]>([])
  const rafRef    = useRef<number>(0)
  const activeRef = useRef(-1)

  const applyActive = useCallback((idx: number) => {
    if (idx === activeRef.current) return
    activeRef.current = idx
    cardRefs.current.forEach((card, i) => {
      if (!card) return
      const a = i === idx
      card.style.transform   = a ? "scale(1.04)" : "scale(0.93)"
      card.style.boxShadow   = a ? "0 24px 60px rgba(0,0,0,0.11)" : "0 2px 10px rgba(0,0,0,0.05)"
      card.style.borderColor = a ? "rgba(29,58,143,0.20)" : "rgba(0,0,0,0.07)"
    })
  }, [])

  const onScroll = useCallback(() => {
    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      const el = scrollRef.current
      if (!el) return
      const center = el.scrollLeft + el.clientWidth / 2
      let best = 0, bestDist = Infinity
      cardRefs.current.forEach((card, i) => {
        if (!card) return
        const dist = Math.abs((card.offsetLeft + card.offsetWidth / 2) - center)
        if (dist < bestDist) { bestDist = dist; best = i }
      })
      applyActive(best)
    })
  }, [applyActive])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => { el.removeEventListener("scroll", onScroll); cancelAnimationFrame(rafRef.current) }
  }, [onScroll])

  const scroll = (dir: "left" | "right") =>
    scrollRef.current?.scrollBy({ left: dir === "left" ? -420 : 420, behavior: "smooth" })

  return (
    <>
      <style>{`
        .ait-scroll::-webkit-scrollbar { display: none; }
        .ait-card { transition: transform .35s cubic-bezier(.16,1,.3,1), box-shadow .35s, border-color .35s; will-change: transform; }
        .sc-arr2 { transition: background .18s, border-color .18s; cursor: pointer; }
        .sc-arr2:hover { background: #eff4ff !important; border-color: #bfcfff !important; }
      `}</style>

      <section id="ai-tools" style={{ background: "#ffffff", padding: "72px 0", overflow: "hidden" }}>

        {/* ── Header ── */}
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px", marginBottom: 36 }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "#eff4ff", border: "1px solid #bfcfff", borderRadius: 99, padding: "5px 14px", marginBottom: 16 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#1d3a8f", animation: "pulse 2s infinite" }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: "#1d3a8f", letterSpacing: ".08em", textTransform: "uppercase" }}>AI Tools — Coming Soon</span>
              </div>
              <h2 style={{ fontSize: "clamp(28px,3.5vw,42px)", fontWeight: 900, color: "#0f172a", letterSpacing: "-0.04em", lineHeight: 1.1, marginBottom: 10 }}>
                Your AI-powered career toolkit
              </h2>
              <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.65, maxWidth: 440 }}>
                Resume, interviews, career guidance — all in one place, built for the Indian job market.
              </p>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {(["left", "right"] as const).map(dir => (
                <button key={dir} className="sc-arr2" onClick={() => scroll(dir)} style={{ width: 42, height: 42, borderRadius: "50%", background: "#f8fafc", border: "1.5px solid #e2e8f0", color: "#1d3a8f", fontSize: 17, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {dir === "left" ? "←" : "→"}
                </button>
              ))}
              <Link href="/ai-tools" style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "linear-gradient(135deg,#1a3585,#2d4fd4 55%,#4668f5)", color: "white", fontSize: 13, fontWeight: 700, padding: "11px 22px", borderRadius: 12, textDecoration: "none", boxShadow: "0 4px 16px rgba(29,58,143,0.28)" }}>
                Explore All
                <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </Link>
            </div>
          </div>
        </div>

        {/* ── Scroll track ── */}
        <div
          ref={scrollRef}
          className="ait-scroll"
          style={{ display: "flex", alignItems: "center", gap: 16, overflowX: "auto", scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch", padding: "20px 40px 32px", scrollbarWidth: "none" }}
        >
          {TOOLS.map((tool, i) => (
            <div
              key={tool.title}
              className="ait-card"
              ref={el => { cardRefs.current[i] = el }}
              style={{ flexShrink: 0, width: 380, borderRadius: 24, overflow: "hidden", scrollSnapAlign: "center", background: "#ffffff", border: "1.5px solid rgba(0,0,0,0.07)", boxShadow: "0 2px 10px rgba(0,0,0,0.05)", transform: "scale(0.93)" }}
            >
              {/* Gradient top bar */}
              <div style={{ height: 4, background: tool.gradient }} />

              <div style={{ padding: "28px 28px 26px" }}>

                {/* Icon row */}
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 52, height: 52, borderRadius: 16, background: tool.gradient, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: `0 6px 20px ${tool.color}30` }}>
                      {tool.icon}
                    </div>
                    <div>
                      <h3 style={{ fontSize: 17, fontWeight: 900, color: "#0f172a", letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: 3 }}>{tool.title}</h3>
                      <div style={{ fontSize: 12, fontWeight: 600, color: tool.color }}>{tool.tagline}</div>
                    </div>
                  </div>

                  {/* Stat */}
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ fontSize: 22, fontWeight: 900, color: tool.color, letterSpacing: "-0.03em", lineHeight: 1 }}>{tool.stat.value}</div>
                    <div style={{ fontSize: 10, fontWeight: 600, color: "#94a3b8", marginTop: 2 }}>{tool.stat.label}</div>
                  </div>
                </div>

                {/* Badge */}
                {tool.badge && (
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 5, background: tool.bg, border: `1px solid ${tool.border}`, borderRadius: 99, padding: "3px 10px", marginBottom: 12 }}>
                    <span style={{ fontSize: 10, fontWeight: 800, color: tool.color, letterSpacing: ".05em", textTransform: "uppercase" }}>{tool.badge}</span>
                  </div>
                )}

                {/* Desc */}
                <p style={{ fontSize: 13.5, color: "#64748b", lineHeight: 1.7, marginBottom: 20, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                  {tool.desc}
                </p>

                {/* Features 2-col grid */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 12px", marginBottom: 24 }}>
                  {tool.features.map(f => (
                    <div key={f} style={{ display: "flex", alignItems: "center", gap: 7 }}>
                      <div style={{ width: 16, height: 16, borderRadius: "50%", background: tool.bg, border: `1px solid ${tool.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <svg width="8" height="8" fill="none" viewBox="0 0 24 24" stroke={tool.color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                      </div>
                      <span style={{ fontSize: 11.5, fontWeight: 600, color: "#475569" }}>{f}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <Link href="/ai-tools" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: tool.gradient, color: "white", fontSize: 13, fontWeight: 700, padding: "11px 18px", borderRadius: 12, textDecoration: "none", boxShadow: `0 4px 16px ${tool.color}30` }}>
                  Explore Tool
                  <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Link>
              </div>
            </div>
          ))}

          {/* End card */}
          <div style={{ flexShrink: 0, width: 220, height: 420, borderRadius: 24, scrollSnapAlign: "center", background: "#f8fafc", border: "1.5px dashed #e2e8f0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14 }}>
            <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#eff4ff", border: "1.5px solid #bfcfff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, color: "#1d3a8f", fontWeight: 900 }}>+</div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: "#0f172a", marginBottom: 5 }}>7 AI Tools</div>
              <div style={{ fontSize: 12, color: "#94a3b8", lineHeight: 1.5 }}>more coming<br />every month</div>
            </div>
            <Link href="/ai-tools" style={{ fontSize: 13, fontWeight: 700, color: "#1d3a8f", textDecoration: "none" }}>View All →</Link>
          </div>
        </div>

      </section>
    </>
  )
}
