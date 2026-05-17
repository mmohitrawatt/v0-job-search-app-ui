"use client"

import { useState, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { FadeIn, StaggerContainer, StaggerItem, motion } from "./motion"

const PORTALS = [
  { name: "LinkedIn", color: "#0077b5" },
  { name: "Naukri",   color: "#4a90d9" },
  { name: "Indeed",   color: "#2164f3" },
  { name: "Internshala", color: "#00a5ec" },
  { name: "Foundit",  color: "#ff6b35" },
]

const JOBS = [
  {
    id: 1, title: "AI Engineer Intern", company: "Trippyway",
    location: "Remote (India)", tags: ["Internship", "Remote"], dept: "Engineering & AI",
    salary: "₹8K–15K/mo", posted: "2d ago", hot: true,
    gradient: "linear-gradient(135deg,#0f766e,#14b8a6)", initials: "TW", slug: "ai-engineer-intern-trippyway",
    desc: "Build and fine-tune AI models for travel recommendations. Work directly with the founding team on real-world ML pipelines.",
    skills: ["Python", "LLMs", "FastAPI"],
  },
  {
    id: 2, title: "UI/UX Design Intern", company: "Trippyway",
    location: "Remote (India)", tags: ["Internship", "Design"], dept: "Design",
    salary: "₹6K–10K/mo", posted: "3d ago", hot: false,
    gradient: "linear-gradient(135deg,#7c3aed,#a78bfa)", initials: "TW", slug: "uiux-intern-trippyway",
    desc: "Design user flows, prototypes and final UI for the Trippyway app. Figma-first environment, fast iteration cycles.",
    skills: ["Figma", "Prototyping", "User Research"],
  },
  {
    id: 3, title: "Frontend Developer", company: "Cograd",
    location: "Bangalore (Hybrid)", tags: ["Full-time", "Hybrid"], dept: "Engineering",
    salary: "₹4–8 LPA", posted: "1d ago", hot: true,
    gradient: "linear-gradient(135deg,#1d3a8f,#4668f5)", initials: "CG", slug: "frontend-dev-cograd",
    desc: "Build responsive web apps and dashboards for EdTech products. React + TypeScript stack, strong design sensibility needed.",
    skills: ["React", "TypeScript", "Tailwind"],
  },
  {
    id: 4, title: "Data Science Intern", company: "Analytics Vidhya",
    location: "Mumbai (WFH)", tags: ["Internship", "Remote"], dept: "Data Science",
    salary: "₹10K–18K/mo", posted: "Today", hot: false,
    gradient: "linear-gradient(135deg,#b45309,#d97706)", initials: "AV", slug: "data-science-intern",
    desc: "Work on real datasets, build dashboards and predictive models. Mentorship from senior data scientists throughout.",
    skills: ["Python", "Pandas", "SQL"],
  },
  {
    id: 5, title: "Product Manager", company: "GrowthStartup",
    location: "Delhi NCR", tags: ["Full-time", "On-site"], dept: "Product",
    salary: "₹12–20 LPA", posted: "5d ago", hot: false,
    gradient: "linear-gradient(135deg,#dc2626,#f87171)", initials: "GS", slug: "pm-growthstartup",
    desc: "Own the product roadmap, work closely with engineering and design. 1–3 yrs experience, strong analytical mindset required.",
    skills: ["Roadmapping", "Analytics", "Agile"],
  },
]

type Job = (typeof JOBS)[0]

/* ── Swipe card (mobile only) ── */
function SwipeCard({ job }: { job: Job }) {
  return (
    <div style={{ width: "100%", height: "100%", background: "#ffffff", borderRadius: 22, boxShadow: "0 8px 40px rgba(0,0,0,0.10)", overflow: "hidden", display: "flex", flexDirection: "column", border: "1.5px solid #e8edf4" }}>

      {/* Top accent bar */}
      <div style={{ height: 4, background: "linear-gradient(90deg,#1a3585,#4668f5)", flexShrink: 0 }} />

      {/* Header */}
      <div style={{ padding: "18px 20px 16px", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 13 }}>
          <div style={{ width: 46, height: 46, borderRadius: 13, background: job.gradient, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 14, fontWeight: 900, flexShrink: 0 }}>
            {job.initials}
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
            {job.hot && <div style={{ fontSize: 10, fontWeight: 800, color: "#dc2626", background: "#fff5f5", borderRadius: 99, padding: "3px 9px", border: "1px solid #fecaca" }}>🔥 Hot</div>}
            <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 500 }}>{job.posted}</div>
          </div>
        </div>

        <h3 style={{ fontSize: 20, fontWeight: 900, color: "#0f172a", letterSpacing: "-0.03em", lineHeight: 1.15, margin: "0 0 4px" }}>{job.title}</h3>
        <div style={{ fontSize: 13, color: "#64748b", marginBottom: 13 }}>{job.company} · {job.location}</div>

        <div style={{ display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap" }}>
          <span style={{ fontSize: 13.5, fontWeight: 800, color: "#1a3585", background: "#eff4ff", borderRadius: 10, padding: "5px 12px", border: "1px solid #c7d4ff" }}>{job.salary}</span>
          {job.tags.map(t => (
            <span key={t} style={{ fontSize: 11, fontWeight: 600, color: "#64748b", background: "#f8fafc", borderRadius: 8, padding: "4px 10px", border: "1px solid #e2e8f0" }}>{t}</span>
          ))}
        </div>
      </div>

      <div style={{ height: 1, background: "#f1f5f9", flexShrink: 0 }} />

      {/* Body */}
      <div style={{ padding: "14px 20px", flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
        <p style={{ fontSize: 13, color: "#475569", lineHeight: 1.72, margin: 0 }}>{job.desc}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {job.skills.map(s => (
            <span key={s} style={{ fontSize: 11.5, fontWeight: 600, color: "#1d3a8f", background: "#eff4ff", border: "1px solid #bfcfff", borderRadius: 8, padding: "4px 10px" }}>{s}</span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{ padding: "11px 20px", borderTop: "1px solid #f1f5f9", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0, background: "#fafbfc" }}>
        <span style={{ fontSize: 11, color: "#94a3b8", fontWeight: 500 }}>via Jobingen</span>
        <Link href={`/jobs/${job.slug}`} style={{ fontSize: 12, fontWeight: 700, color: "#1a3585", textDecoration: "none" }}>View Details →</Link>
      </div>

    </div>
  )
}

function MobileSwipe() {
  const router = useRouter()
  const [topIdx, setTopIdx]       = useState(0)
  const [indicator, setIndicator] = useState<"left" | "right" | null>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef({ active: false, startX: 0, currentX: 0 })

  const dismiss = useCallback((dir: "left" | "right", job?: Job) => {
    const card = cardRef.current
    if (!card) return
    card.style.transition = "transform 0.36s cubic-bezier(.25,.46,.45,.94), opacity 0.36s"
    card.style.transform  = `translateX(${dir === "right" ? 130 : -130}%) rotate(${dir === "right" ? 20 : -20}deg)`
    card.style.opacity    = "0"
    setIndicator(null)
    setTimeout(() => {
      if (dir === "right" && job) {
        router.push(`/jobs/${job.slug}`)
      } else {
        setTopIdx(i => i + 1)
        if (cardRef.current) {
          cardRef.current.style.transition = "none"
          cardRef.current.style.transform  = "translateX(0) rotate(0deg)"
          cardRef.current.style.opacity    = "1"
        }
      }
    }, 360)
  }, [router])

  const onPointerDown = (e: React.PointerEvent) => {
    dragRef.current = { active: true, startX: e.clientX, currentX: e.clientX }
    const card = cardRef.current
    if (card) { card.style.transition = "none"; card.setPointerCapture(e.pointerId) }
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current.active) return
    dragRef.current.currentX = e.clientX
    const dx = e.clientX - dragRef.current.startX
    if (cardRef.current) cardRef.current.style.transform = `translateX(${dx}px) rotate(${dx / 18}deg)`
    setIndicator(dx > 50 ? "right" : dx < -50 ? "left" : null)
  }
  const onPointerUp = () => {
    if (!dragRef.current.active) return
    dragRef.current.active = false
    const dx = dragRef.current.currentX - dragRef.current.startX
    if (dx > 90) { dismiss("right", JOBS[topIdx]); return }
    if (dx < -90) { dismiss("left"); return }
    if (cardRef.current) {
      cardRef.current.style.transition = "transform 0.32s cubic-bezier(.34,1.56,.64,1)"
      cardRef.current.style.transform  = "translateX(0) rotate(0deg)"
    }
    setIndicator(null)
  }

  if (topIdx >= JOBS.length) {
    return (
      <div style={{ textAlign: "center", padding: "48px 16px" }}>
        <Link href="/jobs" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "linear-gradient(135deg,#1a3585,#2d4fd4 55%,#4668f5)", color: "white", fontSize: 15, fontWeight: 800, padding: "14px 32px", borderRadius: 14, textDecoration: "none", boxShadow: "0 6px 20px rgba(29,58,143,0.28)" }}>
          View More Jobs →
        </Link>
      </div>
    )
  }

  return (
    <>
      {/* Stack */}
      <div style={{ position: "relative", height: 340, maxWidth: 380, margin: "0 auto", overflow: "hidden", borderRadius: 22 }}>
        {[2, 1].map(offset => {
          const job = JOBS[topIdx + offset]
          if (!job) return null
          return (
            <div key={job.id} style={{ position: "absolute", inset: 0, transform: `scale(${1 - offset * 0.04}) translateY(${offset * 12}px)`, zIndex: 10 - offset, pointerEvents: "none", transformOrigin: "bottom center" }}>
              <SwipeCard job={job} />
            </div>
          )
        })}
        <div
          ref={cardRef}
          style={{ position: "absolute", inset: 0, zIndex: 10, cursor: "grab", touchAction: "none", userSelect: "none" as const }}
          onPointerDown={onPointerDown} onPointerMove={onPointerMove}
          onPointerUp={onPointerUp} onPointerLeave={onPointerUp}
        >
          {indicator && (
            <div style={{ position: "absolute", inset: 0, borderRadius: 22, zIndex: 20, pointerEvents: "none", display: "flex", alignItems: "center", justifyContent: indicator === "right" ? "flex-start" : "flex-end", padding: "0 24px", background: indicator === "right" ? "rgba(5,150,105,0.07)" : "rgba(220,38,38,0.07)" }}>
              <div style={{ fontSize: 16, fontWeight: 900, letterSpacing: ".06em", color: indicator === "right" ? "#059669" : "#dc2626", border: `2px solid ${indicator === "right" ? "#059669" : "#dc2626"}`, borderRadius: 9, padding: "5px 12px", transform: `rotate(${indicator === "right" ? -12 : 12}deg)`, textTransform: "uppercase" as const }}>
                {indicator === "right" ? "APPLY" : "SKIP"}
              </div>
            </div>
          )}
          <SwipeCard job={JOBS[topIdx]} />
        </div>
      </div>

      {/* Buttons + progress */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20, marginTop: 22 }}>
        <button onClick={() => dismiss("left")} style={{ width: 52, height: 52, borderRadius: "50%", background: "#fff5f5", border: "2px solid #fecaca", color: "#dc2626", fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>✕</button>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#94a3b8" }}>{topIdx + 1} / {JOBS.length}</span>
          <div style={{ display: "flex", gap: 4 }}>
            {JOBS.map((_, i) => (
              <div key={i} style={{ width: i === topIdx ? 16 : 5, height: 4, borderRadius: 99, background: i < topIdx ? "#1d3a8f" : i === topIdx ? "#4668f5" : "#e2e8f0", transition: "all .25s" }} />
            ))}
          </div>
        </div>
        <button onClick={() => dismiss("right", JOBS[topIdx])} style={{ width: 52, height: 52, borderRadius: "50%", background: "#f0fdf4", border: "2px solid #a7f3d0", color: "#059669", fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>✓</button>
      </div>
      <div style={{ textAlign: "center", marginTop: 16 }}>
        <Link href="/jobs" style={{ fontSize: 13, fontWeight: 700, color: "#1d3a8f", textDecoration: "none" }}>View all openings →</Link>
      </div>
    </>
  )
}

export function FeaturedJobs() {
  return (
    <section className="py-8 sm:py-28 bg-[#f8fafc]" id="featured-jobs">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">

        {/* Header — desktop only */}
        <FadeIn className="hidden sm:flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-[13px] font-semibold text-[#1d3a8f] uppercase tracking-[0.12em] mb-3">Opportunities</p>
            <h2 className="text-[clamp(26px,3.5vw,40px)] font-black text-slate-900 tracking-[-0.03em] mb-2">Featured Opportunities</h2>
            <p className="text-[15px] text-slate-500 leading-relaxed">
              Curated from top portals &amp; direct listings — all in one place.
            </p>
          </div>
          <Link href="/jobs" className="text-[14px] font-semibold text-[#1d3a8f] hover:text-[#3b5bdb] flex items-center gap-1.5 transition-colors shrink-0">
            View all openings
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
        </FadeIn>

        {/* Portal bar — desktop only */}
        <FadeIn delay={0.1} className="hidden sm:block mb-8">
          <div className="bg-white rounded-xl border border-slate-200/60 px-4 sm:px-5 py-3 flex items-center gap-3 sm:gap-4 flex-wrap shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider shrink-0">Aggregated from</span>
            <div className="flex items-center gap-3 flex-wrap">
              {PORTALS.map(p => (
                <span key={p.name} className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
                  <span className="text-[12px] font-semibold text-slate-500">{p.name}</span>
                </span>
              ))}
              <span className="text-[12px] text-slate-400">+ direct</span>
            </div>
          </div>
        </FadeIn>

        {/* ── DESKTOP: original grid ── */}
        <div className="hidden sm:block">
          <StaggerContainer className="grid grid-cols-2 gap-4">
            {JOBS.slice(0, 2).map(job => (
              <StaggerItem key={job.slug}>
                <motion.div whileHover={{ y: -3 }} className="group bg-white rounded-2xl border border-slate-200/60 overflow-hidden hover:border-slate-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] transition-all duration-300">
                  <div className="p-5">
                    <div className="flex items-start gap-3.5 mb-4">
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white text-[13px] font-bold shrink-0 shadow-sm" style={{ background: job.gradient }}>{job.initials}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <h3 className="text-[15px] font-extrabold text-slate-900 truncate">{job.title}</h3>
                          {job.hot && <span className="text-[9px] font-bold text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded border border-orange-200/50 shrink-0 uppercase">Hot</span>}
                        </div>
                        <p className="text-[12px] text-slate-500">{job.company}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-[13px] font-extrabold text-slate-900">{job.salary}</div>
                        <div className="text-[10px] text-slate-400">{job.posted}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap mb-4">
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 bg-slate-50 px-2 py-1 rounded-md">📍 {job.location}</span>
                      {job.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-semibold px-2 py-1 rounded-md bg-slate-50 text-slate-500 border border-slate-100">{tag}</span>
                      ))}
                      <span className="text-[10px] font-semibold px-2 py-1 rounded-md bg-indigo-50 text-[#1d3a8f] border border-indigo-100">{job.dept}</span>
                    </div>
                  </div>
                  <div className="px-5 py-3 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 font-medium">via Jobingen</span>
                    <div className="flex items-center gap-2">
                      <Link href={`/jobs/${job.slug}`} className="text-[12px] font-semibold text-slate-500 hover:text-slate-700 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-all">View Details</Link>
                      <Link href={`/jobs/${job.slug}`} className="text-[12px] font-bold text-white px-4 py-1.5 rounded-lg shadow-sm hover:opacity-90 transition-all flex items-center gap-1.5" style={{ background: "linear-gradient(135deg,#1d3a8f,#3b5bdb)" }}>
                        Apply
                        <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeIn delay={0.2} className="mt-8 text-center">
            <Link href="/jobs" className="inline-flex items-center gap-2 text-[14px] font-bold text-[#1d3a8f] bg-white border border-slate-200 px-6 py-3 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a4 4 0 0 0-8 0v2"/></svg>
              Explore All {JOBS.length}+ Openings
            </Link>
          </FadeIn>
        </div>

        {/* ── MOBILE: Tinder swipe ── */}
        <div className="sm:hidden">
          <h2 className="text-[24px] font-black text-slate-900 tracking-[-0.03em] text-center mb-1">Featured Opportunities</h2>
          <p className="text-center text-[12px] text-slate-400 font-medium mb-4">
            Swipe <span style={{ color: "#059669" }}>right to apply</span> · <span style={{ color: "#dc2626" }}>left to skip</span>
          </p>
          <MobileSwipe />
        </div>

      </div>
    </section>
  )
}
