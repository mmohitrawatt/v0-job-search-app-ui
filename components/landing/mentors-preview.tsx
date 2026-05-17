"use client"

import { useRef, useEffect, useCallback, useState } from "react"
import Image from "next/image"
import Link from "next/link"

/* ── same helpers as mentors page ── */
type DBMentor = {
  id: string; full_name: string; job_title: string; domain: string
  mentorship_topics: string[]; photo_url?: string
}

const DOMAIN_COLORS: Record<string, { color: string; bg: string; border: string }> = {
  "AI/ML":        { color: "#7c3aed", bg: "#f5f3ff", border: "#ddd6fe" },
  "Full Stack":   { color: "#1d3a8f", bg: "#eff4ff", border: "#bfcfff" },
  "Backend":      { color: "#0f766e", bg: "#f0fdfa", border: "#a7f3d0" },
  "Data Science": { color: "#0891b2", bg: "#ecfeff", border: "#a5f3fc" },
  "Web Dev":      { color: "#1d3a8f", bg: "#eff4ff", border: "#bfcfff" },
  "DevOps":       { color: "#0369a1", bg: "#f0f9ff", border: "#bae6fd" },
  "UI/UX":        { color: "#e11d48", bg: "#fff1f2", border: "#fecdd3" },
  "DSA":          { color: "#16a34a", bg: "#f0fdf4", border: "#a7f3d0" },
  "Embedded":     { color: "#dc2626", bg: "#fff5f5", border: "#fecaca" },
}

function domainStyle(domain: string) {
  for (const [key, val] of Object.entries(DOMAIN_COLORS)) {
    if (domain?.toLowerCase().includes(key.toLowerCase())) return val
  }
  return { color: "#1d3a8f", bg: "#eff4ff", border: "#bfcfff" }
}

function initials(name: string) {
  const parts = name.trim().split(" ")
  return parts.length >= 2 ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase() : name.slice(0, 2).toUpperCase()
}

type MentorCard = {
  name: string; role: string; company: string; initials: string
  photo: string; color: string; bg: string; border: string; skills: string[]
}

/* ── hardcoded active mentors ── */
const HARDCODED: MentorCard[] = [
  { name: "Shubham Kaushik",   role: "AI Researcher",            company: "KPMG",             initials: "SK", photo: "/mentors/shubham-kaushik.jpg",        color: "#b45309", bg: "#fffbeb", border: "#fde68a", skills: ["LLMs", "ML", "Full Stack"] },
  { name: "Jitesh Vijaykumar", role: "AI Engineer",              company: "KPMG",             initials: "JV", photo: "/mentors/jitesh-vijaykumar.jpg",       color: "#7c3aed", bg: "#f5f3ff", border: "#ddd6fe", skills: ["AI/ML", "Python", "Enterprise"] },
  { name: "Sonic Payeng",      role: "Software Engineer II",     company: "Dell Technologies", initials: "SP", photo: "/mentors/sonic-payeng.jpg",           color: "#16a34a", bg: "#f0fdf4", border: "#a7f3d0", skills: ["Automation", "AI", "Cloud"] },
  { name: "Aditya Dubey",      role: "AI Engineer",              company: "Cograd",           initials: "AD", photo: "/mentors/aditya-dubey.jpg",            color: "#1d3a8f", bg: "#eff4ff", border: "#bfcfff", skills: ["AI/ML", "Mentorship", "NLP"] },
  { name: "Bipin Chaudhary",   role: "Full Stack Developer",     company: "SAP",              initials: "BC", photo: "/mentors/bipin-chaudhary.jpg",         color: "#0369a1", bg: "#f0f9ff", border: "#bae6fd", skills: ["React", "TypeScript", "Node.js"] },
  { name: "Tarsh Vaibhav",     role: "Embedded SWE & DSA Trainer", company: "Wabtec",        initials: "TV", photo: "/mentors/tarsh-vaibhav.jpg",           color: "#dc2626", bg: "#fff5f5", border: "#fecaca", skills: ["DSA", "C++", "Embedded"] },
  { name: "Ashirvad Kar Pathak", role: "Software Engineer 2",   company: "Dell Technologies", initials: "AK", photo: "/mentors/Ashirvad Kar Pathak.jpeg",   color: "#0f766e", bg: "#f0fdfa", border: "#a7f3d0", skills: ["C / C++", "DSA", "Systems"] },
  { name: "Yukta Manek",       role: "Software Engineer III",    company: "Walmart",          initials: "YM", photo: "/mentors/Yukta_manek.jpeg",            color: "#be185d", bg: "#fdf2f8", border: "#fbcfe8", skills: ["Backend", "Microservices", "System Design"] },
]

const HARDCODED_NAMES = new Set(HARDCODED.map(m => m.name.toLowerCase()))

function dbToCard(m: DBMentor): MentorCard {
  const { color, bg, border } = domainStyle(m.domain)
  return {
    name: m.full_name,
    role: m.job_title,
    company: m.domain,
    initials: initials(m.full_name),
    photo: m.photo_url || "",
    color, bg, border,
    skills: (m.mentorship_topics || []).slice(0, 3),
  }
}

export function MentorsPreview() {
  const [mentors, setMentors] = useState<MentorCard[]>(HARDCODED)

  useEffect(() => {
    fetch("/api/mentors")
      .then(r => r.json())
      .then((data: DBMentor[]) => {
        if (!Array.isArray(data)) return
        const extra = data.map(dbToCard).filter(m => !HARDCODED_NAMES.has(m.name.toLowerCase()))
        if (extra.length) setMentors([...HARDCODED, ...extra])
      })
      .catch(() => {})
  }, [])

  const scrollRef = useRef<HTMLDivElement>(null)
  const cardRefs  = useRef<(HTMLDivElement | null)[]>([])
  const btnRefs   = useRef<(HTMLAnchorElement | null)[]>([])
  const rafRef    = useRef<number>(0)
  const activeRef = useRef(-1)

  const applyActive = useCallback((idx: number) => {
    if (idx === activeRef.current) return
    activeRef.current = idx
    cardRefs.current.forEach((card, i) => {
      if (!card) return
      const a = i === idx
      card.style.transform   = a ? "scale(1.05)" : "scale(0.93)"
      card.style.boxShadow   = a ? "0 20px 56px rgba(29,58,143,0.14)" : "0 2px 10px rgba(0,0,0,0.06)"
      card.style.borderColor = a ? "rgba(29,58,143,0.22)" : "rgba(0,0,0,0.07)"
    })
    btnRefs.current.forEach((btn, i) => {
      if (!btn) return
      btn.style.opacity   = i === idx ? "1" : "0"
      btn.style.transform = i === idx ? "translateY(0)" : "translateY(6px)"
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
  }, [onScroll, mentors])

  const scroll = (dir: "left" | "right") =>
    scrollRef.current?.scrollBy({ left: dir === "left" ? -290 : 290, behavior: "smooth" })

  return (
    <>
      <style>{`
        .mentor-scroll::-webkit-scrollbar { display: none; }
        .mc { transition: transform .35s cubic-bezier(.16,1,.3,1), box-shadow .35s, border-color .35s; will-change: transform; }
        .mc-btn { transition: opacity .25s ease, transform .25s ease; }
        .sc-arr { transition: background .18s, border-color .18s; cursor: pointer; }
        .sc-arr:hover { background: #eff4ff !important; border-color: #bfcfff !important; }
      `}</style>

      <section style={{ background: "#ffffff", padding: "72px 0", overflow: "hidden" }} id="mentors">

        {/* ── Header ── */}
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px", marginBottom: 36 }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "#eff4ff", border: "1px solid #bfcfff", borderRadius: 99, padding: "5px 14px", marginBottom: 16 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#1d3a8f" }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: "#1d3a8f", letterSpacing: ".08em", textTransform: "uppercase" }}>Expert Mentors</span>
              </div>
              <h2 style={{ fontSize: "clamp(28px,3.5vw,42px)", fontWeight: 900, color: "#0f172a", letterSpacing: "-0.04em", lineHeight: 1.1, marginBottom: 10 }}>
                Learn From the Best
              </h2>
              <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.65, maxWidth: 420 }}>
                Working professionals from KPMG, Dell, SAP, Wabtec, Walmart & more.
              </p>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {(["left", "right"] as const).map(dir => (
                <button key={dir} className="sc-arr" onClick={() => scroll(dir)} style={{ width: 42, height: 42, borderRadius: "50%", background: "#f8fafc", border: "1.5px solid #e2e8f0", color: "#1d3a8f", fontSize: 17, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {dir === "left" ? "←" : "→"}
                </button>
              ))}
              <Link href="/mentors" style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "linear-gradient(135deg,#1a3585,#2d4fd4 55%,#4668f5)", color: "white", fontSize: 13, fontWeight: 700, padding: "11px 22px", borderRadius: 12, textDecoration: "none", boxShadow: "0 4px 16px rgba(29,58,143,0.28)" }}>
                View All
                <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </Link>
            </div>
          </div>
        </div>

        {/* ── Scroll track ── */}
        <div ref={scrollRef} className="mentor-scroll" style={{ display: "flex", alignItems: "center", gap: 14, overflowX: "auto", scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch", padding: "20px 40px 32px", scrollbarWidth: "none" }}>
          {mentors.map((m, i) => (
            <div key={m.name} className="mc" ref={el => { cardRefs.current[i] = el }} style={{ flexShrink: 0, width: 258, borderRadius: 22, overflow: "hidden", scrollSnapAlign: "center", background: "#ffffff", border: "1.5px solid rgba(0,0,0,0.07)", boxShadow: "0 2px 10px rgba(0,0,0,0.06)", transform: "scale(0.93)" }}>

              {/* Photo / Initials */}
              <div style={{ position: "relative", height: 220, overflow: "hidden", background: m.photo ? "transparent" : m.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {m.photo ? (
                  <Image src={m.photo} alt={m.name} fill style={{ objectFit: "cover", objectPosition: "top" }} />
                ) : (
                  <div style={{ width: 80, height: 80, borderRadius: "50%", background: m.color, color: "white", fontSize: 28, fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center" }}>{m.initials}</div>
                )}
                {m.photo && <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(15,23,42,0.42) 0%, transparent 55%)" }} />}
                <div style={{ position: "absolute", bottom: 10, right: 10, display: "flex", alignItems: "center", gap: 4, background: "rgba(255,255,255,0.92)", backdropFilter: "blur(8px)", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 99, padding: "3px 9px" }}>
                  <span style={{ fontSize: 11, color: "#f59e0b" }}>★</span>
                  <span style={{ fontSize: 11, fontWeight: 800, color: "#0f172a" }}>5.0</span>
                </div>
              </div>

              {/* Info */}
              <div style={{ padding: "14px 16px 16px" }}>
                <div style={{ fontSize: 15, fontWeight: 800, color: "#0f172a", letterSpacing: "-0.02em", marginBottom: 3 }}>{m.name}</div>
                <div style={{ fontSize: 12, color: "#64748b", fontWeight: 500, marginBottom: 10 }}>
                  {m.role} · <span style={{ color: "#94a3b8" }}>{m.company}</span>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 12 }}>
                  {m.skills.map(s => (
                    <span key={s} style={{ fontSize: 10.5, fontWeight: 600, color: "#475569", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 6, padding: "3px 8px" }}>{s}</span>
                  ))}
                </div>
                <Link href="/mentors" className="mc-btn" ref={el => { btnRefs.current[i] = el }} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: "linear-gradient(135deg,#1a3585,#2d4fd4 55%,#4668f5)", color: "white", fontSize: 12.5, fontWeight: 700, padding: "9px 16px", borderRadius: 10, textDecoration: "none", boxShadow: "0 4px 14px rgba(29,58,143,0.28)", opacity: 0, transform: "translateY(6px)" }}>
                  View Profile →
                </Link>
              </div>
            </div>
          ))}

          {/* End card */}
          <div style={{ flexShrink: 0, width: 180, height: 340, borderRadius: 22, scrollSnapAlign: "center", background: "#f8fafc", border: "1.5px dashed #e2e8f0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12 }}>
            <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#eff4ff", border: "1.5px solid #bfcfff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, color: "#1d3a8f", fontWeight: 900 }}>+</div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: "#0f172a", marginBottom: 4 }}>{mentors.length}+ Mentors</div>
              <div style={{ fontSize: 12, color: "#94a3b8" }}>on the platform</div>
            </div>
            <Link href="/mentors" style={{ fontSize: 12.5, fontWeight: 700, color: "#1d3a8f", textDecoration: "none" }}>View All →</Link>
          </div>
        </div>

        {/* ── Stats ── */}
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ display: "flex", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 16, overflow: "hidden" }}>
            {[
              { val: `${mentors.length}+`, label: "Active Mentors"  },
              { val: "8+",                 label: "Top Companies"   },
              { val: "12K+",               label: "Students Guided" },
              { val: "4.8★",               label: "Average Rating"  },
            ].map((s, i) => (
              <div key={s.label} style={{ flex: 1, textAlign: "center", padding: "18px 16px", borderRight: i < 3 ? "1px solid #e2e8f0" : "none" }}>
                <div style={{ fontSize: 20, fontWeight: 900, color: "#1d3a8f", letterSpacing: "-0.03em" }}>{s.val}</div>
                <div style={{ fontSize: 10.5, fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", letterSpacing: ".06em", marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

      </section>
    </>
  )
}
