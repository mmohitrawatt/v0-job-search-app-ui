"use client"

import { useEffect, useState, useRef } from "react"
import { createPortal } from "react-dom"
import Image from "next/image"
import Link from "next/link"
import { FadeIn, motion, AnimatePresence } from "./motion"
import { Users, Building2, GraduationCap, Star } from "lucide-react"

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
  { name: "Sonic Payeng",      role: "Software Engineer II",     company: "Dell",             initials: "SP", photo: "/mentors/sonic-payeng.jpg",           color: "#16a34a", bg: "#f0fdf4", border: "#a7f3d0", skills: ["Automation", "AI", "Cloud"] },
  { name: "Aditya Dubey",      role: "AI Engineer",              company: "Cograd",           initials: "AD", photo: "/mentors/aditya-dubey.jpg",            color: "#1d3a8f", bg: "#eff4ff", border: "#bfcfff", skills: ["AI/ML", "Mentorship", "NLP"] },
  { name: "Bipin Chaudhary",   role: "Full Stack Developer",     company: "SAP",              initials: "BC", photo: "/mentors/bipin-chaudhary.jpg",         color: "#0369a1", bg: "#f0f9ff", border: "#bae6fd", skills: ["React", "Node.js"] },
  { name: "Tarsh Vaibhav",     role: "Embedded SWE",             company: "Wabtec",           initials: "TV", photo: "/mentors/tarsh-vaibhav.jpg",           color: "#dc2626", bg: "#fff5f5", border: "#fecaca", skills: ["DSA", "C++", "Embedded"] },
  { name: "Ashirvad Kar Pathak", role: "Software Engineer 2",   company: "Dell",             initials: "AK", photo: "/mentors/Ashirvad Kar Pathak.jpeg",   color: "#0f766e", bg: "#f0fdfa", border: "#a7f3d0", skills: ["C / C++", "DSA", "Systems"] },
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

/* ── marquee card + portal hover popover ── */
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

function MentorMarqueeCard({ m, onHover }: { m: MentorCard; onHover: (v: boolean) => void }) {
  const shown = m.skills.slice(0, 2)
  const extra = m.skills.length - shown.length
  const ref = useRef<HTMLAnchorElement>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [mounted, setMounted] = useState(false)
  const [rect, setRect] = useState<DOMRect | null>(null)

  useEffect(() => setMounted(true), [])
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current) }, [])

  // close the fixed popover on scroll/resize so it never floats over other sections
  useEffect(() => {
    if (!rect) return
    const close = () => { setRect(null); onHover(false) }
    window.addEventListener("scroll", close, { passive: true, capture: true })
    window.addEventListener("resize", close)
    return () => {
      window.removeEventListener("scroll", close, { capture: true } as any)
      window.removeEventListener("resize", close)
    }
  }, [rect, onHover])

  const open = () => {
    if (timer.current) clearTimeout(timer.current)
    if (ref.current) setRect(ref.current.getBoundingClientRect())
    onHover(true)
  }
  const keep = () => {
    if (timer.current) clearTimeout(timer.current)
    onHover(true)
  }
  const scheduleClose = () => {
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => { setRect(null); onHover(false) }, 150)
  }

  // popover geometry (centered over the card, expanding downward)
  const POP_W = rect ? rect.width + 40 : 360
  const left = rect ? Math.min(Math.max(rect.left - 20, 12), window.innerWidth - POP_W - 12) : 0
  const top = rect ? Math.max(rect.top - 12, 12) : 0

  return (
    <Link
      ref={ref}
      href="/mentors"
      className="mm-card"
      onMouseEnter={open}
      onMouseLeave={scheduleClose}
      style={{
        textDecoration: "none", flexShrink: 0, width: 344,
        display: "flex", alignItems: "center", gap: 16,
        background: "#ffffff", border: "1.5px solid rgba(15,23,42,0.08)",
        borderRadius: 22, padding: "22px 20px",
        boxShadow: "0 2px 10px rgba(15,23,42,0.05)", cursor: "pointer",
      }}
    >
      {/* Avatar */}
      <div className="mm-avatar" style={{ position: "relative", flexShrink: 0, width: 72, height: 72, borderRadius: "50%", overflow: "hidden", background: m.photo ? "#eef2f7" : "#1d3a8f", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 0 3px #eef2f7, 0 0 0 4.5px #dbe2ee", transition: "box-shadow .3s" }}>
        {m.photo ? (
          <Image src={m.photo} alt={m.name} fill sizes="72px" style={{ objectFit: "cover", objectPosition: "top" }} />
        ) : (
          <span style={{ color: "white", fontSize: 22, fontWeight: 900 }}>{m.initials}</span>
        )}
      </div>

      {/* Info */}
      <div style={{ minWidth: 0, flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <span style={{ fontSize: 15.5, fontWeight: 800, color: "#0c1a35", letterSpacing: "-0.02em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", minWidth: 0 }}>{m.name}</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 3, background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 99, padding: "1px 6px", flexShrink: 0 }}>
            <span style={{ fontSize: 9, color: "#f59e0b" }}>★</span>
            <span style={{ fontSize: 10, fontWeight: 800, color: "#92400e" }}>5.0</span>
          </span>
        </div>
        <div style={{ fontSize: 12.5, color: "#64748b", fontWeight: 500, marginBottom: 11, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {m.role} · <span style={{ color: "#94a3b8" }}>{m.company}</span>
        </div>
        <div style={{ display: "flex", flexWrap: "nowrap", gap: 6, overflow: "hidden" }}>
          {shown.map(s => (
            <span key={s} style={{ fontSize: 10.5, fontWeight: 700, color: "#475569", background: "#f4f6fa", border: "1px solid #e6eaf1", borderRadius: 6, padding: "3px 8px", whiteSpace: "nowrap", flexShrink: 0 }}>{s}</span>
          ))}
          {extra > 0 && (
            <span style={{ fontSize: 10.5, fontWeight: 700, color: "#64748b", background: "#f1f5f9", border: "1px solid #e2e8f0", borderRadius: 6, padding: "3px 8px", whiteSpace: "nowrap", flexShrink: 0 }}>+{extra}</span>
          )}
        </div>
      </div>

      {/* Hover arrow */}
      <div className="mm-arrow" style={{ flexShrink: 0, alignSelf: "center", width: 30, height: 30, borderRadius: "50%", background: "#1d3a8f", color: "white", display: "flex", alignItems: "center", justifyContent: "center", opacity: 0, transform: "translateX(-6px)", transition: "opacity .25s ease, transform .25s ease", boxShadow: "0 4px 12px rgba(29,58,143,0.32)" }}>
        <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
      </div>

      {/* ── Portal popover — full details (fixed, never clipped) ── */}
      {mounted && createPortal(
        <AnimatePresence>
          {rect && (
            <motion.div
              key="pop"
              onMouseEnter={keep}
              onMouseLeave={scheduleClose}
              initial={{ opacity: 0, y: 12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={{ duration: 0.22, ease: EASE }}
              style={{
                position: "fixed", top, left, width: POP_W, zIndex: 9999,
                background: "#ffffff", borderRadius: 24, border: "1.5px solid #e2e9fb",
                boxShadow: "0 28px 64px rgba(15,23,42,0.22)", overflow: "hidden",
                pointerEvents: "auto", transformOrigin: "top center",
              }}
            >
              <Link href="/mentors" style={{ textDecoration: "none", display: "block", cursor: "pointer" }}>
              {/* accent top strip */}
              <div style={{ height: 5, background: "#1d3a8f" }} />
              <div style={{ padding: "20px 20px 22px" }}>
                {/* header */}
                <div style={{ display: "flex", alignItems: "center", gap: 15, marginBottom: 16 }}>
                  <div style={{ position: "relative", flexShrink: 0, width: 84, height: 84, borderRadius: "50%", overflow: "hidden", background: m.photo ? m.bg : m.color, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 0 3px #eff4ff, 0 0 0 4.5px #bfcfff" }}>
                    {m.photo ? (
                      <Image src={m.photo} alt={m.name} fill sizes="84px" style={{ objectFit: "cover", objectPosition: "top" }} />
                    ) : (
                      <span style={{ color: "white", fontSize: 26, fontWeight: 900 }}>{m.initials}</span>
                    )}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 18, fontWeight: 800, color: "#0c1a35", letterSpacing: "-0.02em", marginBottom: 3 }}>{m.name}</div>
                    <div style={{ fontSize: 13, color: "#475569", fontWeight: 600, marginBottom: 7 }}>{m.role}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "#f4f7fc", border: "1px solid #e4e9f2", borderRadius: 99, padding: "3px 9px", fontSize: 11, fontWeight: 700, color: "#334155" }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e" }} />
                        {m.company}
                      </span>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 2, fontSize: 12 }}>
                        <span style={{ color: "#f59e0b", letterSpacing: "-1px" }}>★★★★★</span>
                        <span style={{ fontWeight: 800, color: "#0c1a35", marginLeft: 3 }}>5.0</span>
                      </span>
                    </div>
                  </div>
                </div>
                {/* expertise */}
                <div style={{ fontSize: 10, fontWeight: 800, color: "#94a3b8", textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 9 }}>Areas of Expertise</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 18 }}>
                  {m.skills.map(s => (
                    <span key={s} style={{ fontSize: 11.5, fontWeight: 600, color: "#1d3a8f", background: "#eff4ff", border: "1px solid #bfcfff", borderRadius: 8, padding: "5px 11px" }}>{s}</span>
                  ))}
                </div>
                {/* CTA */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: "#1d3a8f", color: "white", fontSize: 14, fontWeight: 700, padding: "12px 18px", borderRadius: 13, boxShadow: "0 6px 18px rgba(29,58,143,0.32)" }}>
                  View Full Profile
                  <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </div>
              </div>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </Link>
  )
}

export function MentorsPreview() {
  const [mentors, setMentors] = useState<MentorCard[]>(HARDCODED)
  const [paused, setPaused] = useState(false)

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

  // Show up to 10 mentors in the auto-scrolling marquee
  const preview = mentors.slice(0, 10)
  const row = [...preview, ...preview] // duplicated for a seamless loop

  return (
    <>
      <style>{`
        /* ── auto-scroll marquee ── */
        .mm-mask {
          position: relative; overflow: hidden; padding: 14px 0;
          -webkit-mask-image: linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent);
          mask-image: linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent);
        }
        .mm-track {
          display: flex; align-items: stretch; gap: 16px; width: max-content;
          animation: mm-scroll 55s linear infinite;
        }
        .mm-card {
          transition: transform .3s cubic-bezier(.16,1,.3,1), box-shadow .3s, border-color .3s;
          will-change: transform;
        }
        .mm-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 18px 44px rgba(29,58,143,0.16) !important;
          border-color: rgba(29,58,143,0.28) !important;
        }
        .mm-card:hover .mm-avatar { box-shadow: 0 0 0 3px #eff4ff, 0 0 0 4.5px #bfcfff; }
        .mm-card:hover .mm-arrow { opacity: 1; transform: translateX(0); }
        @keyframes mm-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) { .mm-track { animation: none; } }

        .mn-cta-btn { transition: transform .18s ease, box-shadow .18s ease; }
        .mn-cta-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(29,58,143,0.38) !important; }
        .mn-stats > div { transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease; }
        .mn-stats > div:hover { transform: translateY(-2px); box-shadow: 0 12px 28px rgba(29,58,143,0.1); border-color: #cdd8fb !important; }
        @keyframes mn-ping { 0% { transform: scale(1); opacity: .55; } 100% { transform: scale(2.6); opacity: 0; } }
        .mn-ping { animation: mn-ping 1.8s cubic-bezier(0,0,.2,1) infinite; }
        @media (max-width: 560px) { .mn-stats { flex-wrap: wrap !important; } .mn-stats > div { flex: 1 1 calc(50% - 5px) !important; } }
        @media (max-width: 640px) { .mn-shell { padding: 32px 20px !important; border-radius: 24px !important; } .mn-title { white-space: normal !important; } }
      `}</style>

      <section style={{ background: "#ffffff", padding: "80px 0" }} id="mentors">
        <div className="px-4 sm:px-6 lg:px-10" style={{ maxWidth: 1360, margin: "0 auto" }}>
         <div className="mn-shell" style={{ position: "relative", overflow: "hidden", background: "#ffffff", border: "1px solid #e8ecf3", borderRadius: 28, padding: "48px 44px", boxShadow: "0 12px 44px rgba(15,23,42,0.06)" }}>

          {/* whisper of brand-navy depth (top-right) — no colour wash */}
          <div aria-hidden style={{ position: "absolute", top: -140, right: -90, width: 360, height: 360, borderRadius: "50%", background: "radial-gradient(circle, rgba(29,58,143,0.05), transparent 70%)", filter: "blur(22px)", pointerEvents: "none", zIndex: 0 }} />

          <div style={{ position: "relative", zIndex: 1 }}>

          {/* ── Header ── */}
          <FadeIn direction="up">
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 20, flexWrap: "wrap", marginBottom: 40 }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "#eff4ff", border: "1px solid #bfcfff", borderRadius: 99, padding: "5px 14px", marginBottom: 18 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#1d3a8f" }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: "#1d3a8f", letterSpacing: ".08em", textTransform: "uppercase" }}>Expert Mentors</span>
              </div>
              <h2 className="mn-title" style={{ fontSize: "clamp(26px,3.4vw,40px)", fontWeight: 900, color: "#0c1a35", letterSpacing: "-0.045em", lineHeight: 1.1, marginBottom: 14, whiteSpace: "nowrap" }}>
                Connect with{" "}
                <span style={{ background: "#1d3a8f", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  top mentors
                </span>{" "}
                anytime
              </h2>
              <p style={{ fontSize: 15.5, color: "#475569", lineHeight: 1.6, maxWidth: 480, fontWeight: 500 }}>
                Learn 1-on-1 from pros at KPMG, Dell, SAP &amp; Walmart — real guidance from people who&apos;ve been there.
              </p>
              {/* social proof — avatar pile */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 18 }}>
                <div style={{ display: "flex" }}>
                  {HARDCODED.slice(0, 5).map((m, i) => (
                    <div key={m.name} style={{ width: 34, height: 34, borderRadius: "50%", overflow: "hidden", position: "relative",
                      marginLeft: i === 0 ? 0 : -11, border: "2px solid #fff", boxShadow: "0 2px 6px rgba(15,23,42,0.12)", background: m.bg, zIndex: 5 - i }}>
                      <Image src={m.photo} alt={m.name} fill sizes="34px" style={{ objectFit: "cover", objectPosition: "top" }} />
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: 13, color: "#475569", fontWeight: 500 }}>
                  <span style={{ fontWeight: 800, color: "#0c1a35" }}>20K+ learners</span> mentored
                  <span style={{ margin: "0 7px", color: "#cbd5e1" }}>•</span>
                  <span style={{ color: "#f59e0b" }}>★</span> <span style={{ fontWeight: 800, color: "#0c1a35" }}>4.8</span> avg
                </div>
              </div>
            </div>

            <Link href="/mentors" className="mn-cta-btn" style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "white", color: "#1d3a8f", fontSize: 14, fontWeight: 700, padding: "12px 22px", borderRadius: 12, textDecoration: "none", border: "1.5px solid #e4e9f2", flexShrink: 0 }}>
              View all mentors
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
          </FadeIn>

          {/* rail label */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 11.5, fontWeight: 800, letterSpacing: ".08em", textTransform: "uppercase", color: "#8492ad" }}>
              <span style={{ position: "relative", display: "inline-flex" }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e" }} />
                <span className="mn-ping" style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#22c55e" }} />
              </span>
              Live mentor network
            </span>
            <span style={{ fontSize: 12, color: "#a4afc2", fontWeight: 600 }}>Hover to pause · tap to explore</span>
          </div>

          {/* ── Auto-scrolling marquee ── */}
          <div className="mm-mask">
            <div className="mm-track" style={{ animationPlayState: paused ? "paused" : "running" }}>
              {row.map((m, i) => <MentorMarqueeCard key={`${m.name}-${i}`} m={m} onHover={setPaused} />)}
            </div>
          </div>

          {/* ── Stats strip ── */}
          <FadeIn direction="up" delay={0.1}>
          <div className="mn-stats" style={{ marginTop: 30, display: "flex", alignItems: "stretch", gap: 12 }}>
            {[
              { icon: Users,          val: "60+",  label: "Active Mentors"  },
              { icon: Building2,      val: "50+",  label: "Top Companies"   },
              { icon: GraduationCap,  val: "20K+", label: "Students Guided" },
              { icon: Star,           val: "4.8",  label: "Average Rating", star: true },
            ].map((s) => {
              const Ico = s.icon
              return (
              <div key={s.label} style={{ flex: 1, display: "flex", alignItems: "center", gap: 13, padding: "18px 18px", background: "#ffffff", border: "1px solid #e8ecf3", borderRadius: 16 }}>
                <div style={{ width: 42, height: 42, flexShrink: 0, borderRadius: 12, background: "#eef2ff", display: "grid", placeItems: "center", color: "#1d3a8f", boxShadow: "inset 0 0 0 1px #dbe2f7" }}>
                  <Ico size={19} strokeWidth={2.2} />
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 3, fontSize: 24, fontWeight: 900, letterSpacing: "-0.04em", color: "#0c1a35", lineHeight: 1 }}>
                    {s.val}{s.star && <span style={{ color: "#f59e0b", fontSize: 15 }}>★</span>}
                  </div>
                  <div style={{ fontSize: 10.5, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: ".06em", marginTop: 5 }}>{s.label}</div>
                </div>
              </div>
              )
            })}
          </div>
          </FadeIn>

          </div>
         </div>
        </div>
      </section>
    </>
  )
}
