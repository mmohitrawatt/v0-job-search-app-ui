"use client"

import { useState } from "react"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"

/* ── Data ─────────────────────────────────────────────────────── */

const MENTORS_MAP: Record<string, { initials: string; color: string; name: string; role: string }> = {
  AD: { initials: "AD", color: "#1d3a8f", name: "Aditya D.",      role: "AI Engineer" },
  SP: { initials: "SP", color: "#0f766e", name: "Shubham P.",     role: "ML Engineer" },
  JV: { initials: "JV", color: "#7c3aed", name: "Jay V.",         role: "Full Stack Dev" },
  SK: { initials: "SK", color: "#b45309", name: "Shivam K.",      role: "Data Scientist" },
  BC: { initials: "BC", color: "#0891b2", name: "Bipin Chaudhary", role: "Full Stack Dev, SAP Ex-Intern" },
}

const BOOTCAMPS = [
  {
    id: 1,
    status: "completed" as const,
    num: "Bootcamp 1",
    date: "Mar 2026",
    title: "AI Bootcamp & Hackathon",
    description: "2-day intensive covering ML foundations, RAG architecture, and agentic AI — culminating in a 12-hour hackathon where teams shipped real AI projects.",
    duration: "2 Days",
    format: "Live + Hackathon",
    students: "200+",
    topics: ["ML Foundations", "RAG Architecture", "Agentic AI", "12-hr Hackathon"],
    delivered: ["Project Builds", "Recordings", "Certificate", "Community Access"],
    mentorKeys: ["AD", "SP", "JV", "SK"],
    rating: 4.7,
    accent: "#64748b",
    tagColor: "#475569",
    tagBg: "#f1f5f9",
  },
  {
    id: 2,
    status: "completed" as const,
    num: "Bootcamp 2",
    date: "12 Apr 2026",
    title: "Vibe Coding Masterclass",
    description: "4-hour live session on AI-assisted workflows, agentic AI in practice, and building a working product prototype from scratch with expert mentors.",
    duration: "4 Hours",
    format: "Live Online",
    students: "300+",
    topics: ["AI Workflows & Agentic AI", "Intro to Vibe Coding", "Live Project Discussion", "Prototype Development"],
    delivered: ["AI Prototype", "Recordings", "Career Roadmap", "Certificate", "Toolkit", "Community Access"],
    mentorKeys: ["AD", "SP", "JV"],
    rating: 4.8,
    accent: "#059669",
    tagColor: "#059669",
    tagBg: "#f0fdf4",
  },
  {
    id: 3,
    status: "completed" as const,
    num: "Bootcamp 3",
    date: "19 Apr 2026",
    title: "Frontend Engineering Masterclass",
    description: "3-hour deep-dive into JavaScript internals, frontend system design principles, and building a YouTube-style React app from scratch — live.",
    duration: "3 Hours",
    format: "Live Online",
    students: null,
    topics: ["JS Internals & Hoisting", "Event Loop & Async", "Frontend System Design", "Component Architecture", "Closures & Scope", "YouTube-style React App"],
    delivered: ["Recordings", "Certificate", "Code Resources", "Community Access"],
    mentorKeys: ["BC"],
    rating: 4.9,
    accent: "#1d3a8f",
    tagColor: "#1d3a8f",
    tagBg: "#eff6ff",
  },
]

/* ── Star component ───────────────────────────────────────────── */
function Stars({ rating }: { rating: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
      <div style={{ display: "flex", gap: 2 }}>
        {[1,2,3,4,5].map(s => (
          <svg key={s} width="11" height="11" viewBox="0 0 14 14">
            <path d="M7 1L8.5 5H13L9.5 7.5L11 12L7 9.5L3 12L4.5 7.5L1 5H5.5L7 1Z"
              fill={s <= Math.floor(rating) ? "#fbbf24" : s <= rating ? "#fcd34d" : "#e2e8f0"} />
          </svg>
        ))}
      </div>
      <span style={{ fontSize: 12, fontWeight: 700, color: "#64748b" }}>{rating.toFixed(1)}</span>
    </div>
  )
}

/* ── Bootcamp Card ────────────────────────────────────────────── */
function BootcampCard({ bc }: { bc: typeof BOOTCAMPS[0] }) {
  return (
    <div style={{
      background: "white", borderRadius: 20, border: "1.5px solid #eef0f6",
      overflow: "hidden", display: "flex", flexDirection: "column",
      boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
      animation: `fadeUp 0.5s ease ${bc.id * 0.1}s both`,
    }}>
      {/* Top accent */}
      <div style={{ height: 4, background: bc.accent }} />

      <div style={{ padding: "20px 22px 22px", display: "flex", flexDirection: "column", flex: 1 }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 5,
              background: "#f0fdf4", color: "#16a34a",
              fontSize: 10, fontWeight: 700, padding: "4px 10px", borderRadius: 99,
              border: "1px solid #bbf7d0",
            }}>
              <svg width="9" height="9" fill="none" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Completed
            </span>
            <span style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600 }}>{bc.num}</span>
          </div>
          <span style={{ fontSize: 11, color: "#94a3b8", fontWeight: 500 }}>{bc.date}</span>
        </div>

        {/* Title */}
        <h3 style={{ fontSize: 18, fontWeight: 900, color: "#0f172a", letterSpacing: "-0.025em", marginBottom: 8, lineHeight: 1.2 }}>
          {bc.title}
        </h3>
        <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.65, marginBottom: 16 }}>
          {bc.description}
        </p>

        {/* Chips */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
          {[bc.duration, bc.format, ...(bc.students ? [bc.students + " Students"] : [])].map(l => (
            <span key={l} style={{
              fontSize: 10, fontWeight: 700, padding: "4px 10px", borderRadius: 99,
              color: bc.tagColor, background: bc.tagBg, border: `1px solid ${bc.tagColor}20`,
            }}>{l}</span>
          ))}
        </div>

        {/* Topics */}
        <div style={{ marginBottom: 16 }}>
          <p style={{ fontSize: 10, fontWeight: 800, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>What Was Covered</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 12px" }}>
            {bc.topics.map(t => (
              <div key={t} style={{ display: "flex", alignItems: "flex-start", gap: 6 }}>
                <svg width="9" height="9" fill="none" viewBox="0 0 24 24" style={{ flexShrink: 0, marginTop: 2, color: bc.accent }}>
                  <path d="M20 6L9 17l-5-5" stroke={bc.accent} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span style={{ fontSize: 11, color: "#374151", fontWeight: 500, lineHeight: 1.4 }}>{t}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Delivered */}
        <div style={{ marginBottom: 20 }}>
          <p style={{ fontSize: 10, fontWeight: 800, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>Students Got</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {bc.delivered.map(d => (
              <span key={d} style={{
                fontSize: 10, fontWeight: 600, padding: "3px 10px", borderRadius: 6,
                color: "#475569", background: "#f8fafc", border: "1px solid #e2e8f0",
              }}>{d}</span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 14, borderTop: "1px solid #f1f5f9", marginTop: "auto" }}>
          {/* Mentors */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ display: "flex" }}>
              {bc.mentorKeys.map((k, i) => {
                const m = MENTORS_MAP[k]
                return (
                  <div key={k} style={{
                    width: 28, height: 28, borderRadius: "50%",
                    border: "2px solid white",
                    background: m.color,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 9, fontWeight: 800, color: "white",
                    marginLeft: i > 0 ? -8 : 0,
                    zIndex: bc.mentorKeys.length - i,
                    position: "relative",
                  }}>{m.initials}</div>
                )
              })}
            </div>
            <span style={{ fontSize: 11, color: "#94a3b8", fontWeight: 500 }}>
              {bc.mentorKeys.length} Mentor{bc.mentorKeys.length > 1 ? "s" : ""}
            </span>
          </div>
          <Stars rating={bc.rating} />
        </div>

        {/* CTA */}
        <a href="/bootcamp" style={{
          marginTop: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
          padding: "11px 0", borderRadius: 12,
          background: "#f8fafc", border: "1.5px solid #e2e8f0",
          fontSize: 12, fontWeight: 700, color: "#374151", textDecoration: "none",
          transition: "all 0.2s ease",
        }}
          onMouseEnter={e => { e.currentTarget.style.background = bc.tagBg; e.currentTarget.style.color = bc.tagColor; e.currentTarget.style.borderColor = bc.tagColor + "30" }}
          onMouseLeave={e => { e.currentTarget.style.background = "#f8fafc"; e.currentTarget.style.color = "#374151"; e.currentTarget.style.borderColor = "#e2e8f0" }}
        >
          <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
          Share Feedback
        </a>
      </div>
    </div>
  )
}

/* ── Page ─────────────────────────────────────────────────────── */
export default function BootcampsPage() {
  const [email, setEmail] = useState("")
  const [notified, setNotified] = useState(false)

  async function handleNotify(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    try {
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), source: "bootcamps-next-session" }),
      })
    } catch {}
    setNotified(true)
  }

  const totalStudents = 500
  const avgRating = (BOOTCAMPS.reduce((s, b) => s + b.rating, 0) / BOOTCAMPS.length).toFixed(1)

  return (
    <>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulseDot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.5)} }
        .bc-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; }
        @media(max-width:1024px){ .bc-grid{grid-template-columns:repeat(2,1fr)!important} }
        @media(max-width:640px){
          .bc-grid{grid-template-columns:1fr!important}
          .bc-hero-pad{padding:40px 16px 36px!important}
          .bc-stats{flex-wrap:wrap;gap:0!important}
          .bc-next-inner{flex-direction:column!important;gap:24px!important;text-align:center!important}
          .bc-next-form{width:100%!important}
        }
      `}</style>

      <Navbar />
      <div style={{ height: 108 }} />

      {/* ── Hero ───────────────────────────────────────────────── */}
      <section style={{ background: "linear-gradient(180deg,#f8faff 0%,#eef2ff 50%,#fff 100%)", borderBottom: "1px solid #e8edf8", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(29,58,143,0.035) 1px,transparent 1px)", backgroundSize: "32px 32px", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: -80, right: "8%", width: 360, height: 360, borderRadius: "50%", background: "radial-gradient(circle,rgba(29,58,143,0.06) 0%,transparent 70%)", pointerEvents: "none" }} />

        <div className="bc-hero-pad" style={{ position: "relative", maxWidth: 760, margin: "0 auto", padding: "60px 24px 56px", textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 20, padding: "5px 16px", borderRadius: 99, background: "white", border: "1.5px solid #e0e7ff", boxShadow: "0 2px 12px rgba(29,58,143,0.07)", animation: "fadeUp 0.5s ease both" }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#16a34a", animation: "pulseDot 2s infinite", display: "inline-block" }} />
            <span style={{ fontSize: 12, fontWeight: 700, color: "#1d3a8f" }}>3 Sessions Completed · Next coming soon</span>
          </div>

          <h1 style={{ fontSize: "clamp(30px,5vw,52px)", fontWeight: 900, color: "#0f172a", lineHeight: 1.08, letterSpacing: "-0.04em", marginBottom: 14, animation: "fadeUp 0.5s ease 0.08s both" }}>
            Bootcamps &amp; Masterclasses<br />
            <span style={{ background: "linear-gradient(135deg,#1d3a8f 0%,#3b5bdb 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              built for real learning.
            </span>
          </h1>

          <p style={{ fontSize: 16, color: "#64748b", lineHeight: 1.75, maxWidth: 480, margin: "0 auto 36px", animation: "fadeUp 0.5s ease 0.14s both" }}>
            Intensive live sessions with industry practitioners — hands-on projects, real mentorship, and skills you can use the next day.
          </p>

          {/* Stats */}
          <div className="bc-stats" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0, animation: "fadeUp 0.5s ease 0.2s both" }}>
            {[
              { val: `${BOOTCAMPS.length}`, label: "Sessions held" },
              { val: `${totalStudents}+`, label: "Students taught" },
              { val: avgRating, label: "Avg rating" },
              { val: "Live", label: "Format" },
            ].map((s, i) => (
              <div key={s.label} style={{ display: "flex", alignItems: "stretch" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, padding: "12px 24px" }}>
                  <span style={{ fontSize: 22, fontWeight: 900, color: "#1d3a8f", letterSpacing: "-0.03em" }}>{s.val}</span>
                  <span style={{ fontSize: 11, color: "#94a3b8", fontWeight: 500 }}>{s.label}</span>
                </div>
                {i < 3 && <div style={{ width: 1, background: "#e0e7ff", alignSelf: "center", height: 28 }} />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Completed Sessions ─────────────────────────────────── */}
      <section style={{ background: "#f8fafc", borderBottom: "1px solid #eef0f6", padding: "52px 0 60px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: "#f0fdf4", border: "1px solid #bbf7d0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="13" height="13" fill="none" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <h2 style={{ fontSize: 20, fontWeight: 900, color: "#0f172a", letterSpacing: "-0.025em" }}>Completed Sessions</h2>
            </div>
            <p style={{ fontSize: 13, color: "#94a3b8", marginLeft: 38 }}>All sessions are recorded — participants get lifetime access</p>
          </div>

          <div className="bc-grid">
            {BOOTCAMPS.map(bc => <BootcampCard key={bc.id} bc={bc} />)}
          </div>
        </div>
      </section>

      {/* ── Upcoming / Next Session ────────────────────────────── */}
      <section style={{ background: "white", padding: "56px 24px 64px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ borderRadius: 24, border: "1.5px solid #e0e7ff", overflow: "hidden", background: "linear-gradient(135deg,#f8faff 0%,#eef2ff 100%)" }}>
            {/* Top band */}
            <div style={{ height: 4, background: "linear-gradient(90deg,#1d3a8f,#3b5bdb,#7c3aed)" }} />

            <div className="bc-next-inner" style={{ display: "flex", alignItems: "center", gap: 48, padding: "40px 40px" }}>

              {/* Left */}
              <div style={{ flex: 1 }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "white", border: "1.5px solid #e0e7ff", borderRadius: 99, padding: "4px 14px", marginBottom: 16, boxShadow: "0 2px 8px rgba(29,58,143,0.07)" }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#f59e0b", display: "inline-block" }} />
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#1d3a8f" }}>Bootcamp 4 · Coming Soon</span>
                </div>

                <h3 style={{ fontSize: "clamp(20px,3vw,28px)", fontWeight: 900, color: "#0f172a", letterSpacing: "-0.03em", marginBottom: 10, lineHeight: 1.15 }}>
                  Next session is<br />
                  <span style={{ background: "linear-gradient(135deg,#1d3a8f,#3b5bdb)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    in the works.
                  </span>
                </h3>

                <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.7, marginBottom: 20, maxWidth: 380 }}>
                  We're planning the next live session — topic TBD based on community demand. Drop your email and be the first to know when it opens.
                </p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {["Live Session", "Expert Mentor", "Hands-on Project", "Certificate"].map(t => (
                    <span key={t} style={{ fontSize: 11, fontWeight: 600, color: "#4b5563", background: "white", border: "1.5px solid #e0e7ff", padding: "4px 12px", borderRadius: 99 }}>{t}</span>
                  ))}
                </div>
              </div>

              {/* Right — email signup */}
              <div className="bc-next-form" style={{ width: 320, flexShrink: 0 }}>
                <div style={{ background: "white", borderRadius: 18, border: "1.5px solid #e0e7ff", padding: "28px 24px", boxShadow: "0 4px 24px rgba(29,58,143,0.08)" }}>
                  {notified ? (
                    <div style={{ textAlign: "center", padding: "12px 0" }}>
                      <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#f0fdf4", border: "1px solid #bbf7d0", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
                        <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </div>
                      <p style={{ fontSize: 14, fontWeight: 700, color: "#0f172a", marginBottom: 4 }}>You're on the list!</p>
                      <p style={{ fontSize: 12, color: "#64748b" }}>We'll notify you when the next session opens.</p>
                    </div>
                  ) : (
                    <>
                      <p style={{ fontSize: 14, fontWeight: 700, color: "#0f172a", marginBottom: 4 }}>Get notified first</p>
                      <p style={{ fontSize: 12, color: "#94a3b8", marginBottom: 18, lineHeight: 1.6 }}>Early birds get early access and the best price.</p>
                      <form onSubmit={handleNotify} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          placeholder="your@email.com"
                          style={{ padding: "12px 14px", borderRadius: 10, border: "1.5px solid #e0e7ff", fontSize: 13, color: "#0f172a", outline: "none", background: "#f8faff" }}
                        />
                        <button type="submit" style={{
                          padding: "12px 0", borderRadius: 10, border: "none",
                          background: "linear-gradient(135deg,#1d3a8f,#3b5bdb)",
                          color: "white", fontSize: 13, fontWeight: 700, cursor: "pointer",
                        }}>
                          Notify Me →
                        </button>
                      </form>
                      <p style={{ fontSize: 10, color: "#94a3b8", textAlign: "center", marginTop: 10 }}>No spam. Unsubscribe anytime.</p>
                    </>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── Mentors ────────────────────────────────────────────── */}
      <section style={{ background: "#f8fafc", borderTop: "1px solid #eef0f6", padding: "52px 24px 60px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: 11, fontWeight: 800, color: "#1d3a8f", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 10 }}>Mentors</p>
          <h2 style={{ fontSize: "clamp(22px,3vw,32px)", fontWeight: 900, color: "#0f172a", letterSpacing: "-0.03em", marginBottom: 8 }}>Taught by practitioners</h2>
          <p style={{ fontSize: 14, color: "#64748b", marginBottom: 36, lineHeight: 1.7 }}>Every session is led by engineers and builders actively working in the industry.</p>

          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 16 }}>
            {Object.values(MENTORS_MAP).map(m => (
              <div key={m.initials} style={{ display: "flex", alignItems: "center", gap: 12, background: "white", border: "1.5px solid #eef0f6", borderRadius: 14, padding: "12px 18px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: m.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: "white", flexShrink: 0 }}>
                  {m.initials}
                </div>
                <div style={{ textAlign: "left" }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "#0f172a", margin: 0 }}>{m.name}</p>
                  <p style={{ fontSize: 11, color: "#94a3b8", margin: 0 }}>{m.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
