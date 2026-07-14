"use client"

import { useState, useEffect, useRef } from "react"

export function SummerTraining() {
  const [seats, setSeats] = useState({ total: 60, filled: 0, remaining: 60 })
  const [bump,  setBump]  = useState(false)
  const prevRef = useRef(60)

  useEffect(() => {
    const load = () =>
      fetch("/api/early-apply/seats")
        .then(r => r.json())
        .then(d => {
          setSeats(d)
          if (prevRef.current !== d.remaining) {
            setBump(true)
            setTimeout(() => setBump(false), 700)
          }
          prevRef.current = d.remaining
        })
        .catch(() => {})
    load()
    const id = setInterval(load, 30000)
    return () => clearInterval(id)
  }, [])

  const pct       = Math.round((seats.filled / seats.total) * 100)
  const urgency   = seats.remaining <= 10 ? "red" : seats.remaining <= 25 ? "yellow" : "green"
  const numColor  = urgency === "red" ? "#dc2626" : urgency === "yellow" ? "#d97706" : "#059669"
  const badgeBg   = urgency === "red" ? "#fee2e2" : urgency === "yellow" ? "#fef3c7" : "#dcfce7"
  const badgeTxt  = urgency === "red" ? "#dc2626" : urgency === "yellow" ? "#b45309" : "#059669"
  const barColor  = urgency === "red" ? "linear-gradient(90deg,#dc2626,#f87171)" : urgency === "yellow" ? "linear-gradient(90deg,#d97706,#fbbf24)" : "linear-gradient(90deg,#059669,#34d399)"
  const label     = urgency === "red" ? "Almost Full!" : urgency === "yellow" ? "Filling Fast" : "Spots Available"
  const dotColor  = urgency === "red" ? "#dc2626" : urgency === "yellow" ? "#f59e0b" : "#22c55e"

  return (
    <>
      <style>{`
        @keyframes st-bump { 0%{transform:scale(1)} 40%{transform:scale(1.18)} 70%{transform:scale(.96)} 100%{transform:scale(1)} }
        @keyframes st-bar-shine { 0%{left:-60%} 100%{left:120%} }
        @keyframes st-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.45;transform:scale(.7)} }
        .st-bump { animation: st-bump .65s cubic-bezier(.34,1.2,.64,1) both; }
        .st-bar-fill::after { content:''; position:absolute; top:0; bottom:0; width:50%; background:linear-gradient(90deg,transparent,rgba(255,255,255,.3),transparent); animation:st-bar-shine 2.2s ease-in-out infinite; }
        .st-dot { animation: st-dot 1.8s ease-in-out infinite; }
        .st-section { padding: 40px 20px; }
        .st-card {
          display: grid;
          align-items: center;
          padding: 52px 60px;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 60px;
        }
        .st-stats { display: flex; align-items: flex-start; margin-bottom: 32px; }
        .st-stat-item { padding-right: 22px; margin-right: 22px; border-right: 1px solid #e2e8f0; }
        .st-stat-item:last-child { padding-right: 0; margin-right: 0; border-right: none; }
        .st-btns { flex-wrap: nowrap; }
        @media (max-width: 768px) {
          .st-section { padding: 24px 14px; }
          .st-card {
            padding: 24px 18px !important;
            grid-template-columns: 1fr !important;
            gap: 24px !important;
            align-items: start !important;
          }
          .st-stats {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 14px 0 !important;
            margin-bottom: 24px !important;
          }
          .st-stat-item {
            padding-right: 0 !important;
            margin-right: 0 !important;
            border-right: none !important;
            padding-bottom: 0 !important;
          }
          .st-stat-item:nth-child(odd) {
            padding-right: 16px !important;
            border-right: 1px solid #e2e8f0 !important;
          }
          .st-btns { flex-wrap: wrap !important; gap: 10px !important; }
          .st-btns a { flex: 1 1 140px; justify-content: center; text-align: center; }
          .st-seats-num { font-size: 52px !important; }
        }
      `}</style>

      <section className="st-section" style={{ background: "#ffffff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>

          <div className="st-card" style={{
            background: "#ffffff",
            borderRadius: 28,
            boxShadow: "0 0 0 1.5px rgba(29,58,143,0.12), 0 4px 6px rgba(0,0,0,0.02), 0 20px 60px rgba(29,58,143,0.08)",
            backgroundImage: "radial-gradient(circle at 100% 0%, rgba(70,104,245,0.04) 0%, transparent 50%), radial-gradient(circle at 0% 100%, rgba(29,58,143,0.04) 0%, transparent 50%)",
          }}>

            {/* ── LEFT ── */}
            <div>
              {/* Live badge */}
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 7,
                background: "#eff4ff", border: "1px solid #bfcfff",
                borderRadius: 99, padding: "5px 14px", marginBottom: 22,
              }}>
                <div className="st-dot" style={{ width: 7, height: 7, borderRadius: "50%", background: "#1d3a8f" }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: "#1d3a8f", letterSpacing: ".07em", textTransform: "uppercase" }}>
                  Registrations Open · Cohort 2026
                </span>
              </div>

              {/* Headline */}
              <h2 style={{
                fontSize: "clamp(38px, 3.5vw, 58px)", fontWeight: 900,
                color: "#0f172a", letterSpacing: "-0.04em", lineHeight: 1.05, marginBottom: 16,
              }}>
                Summer Training<br />
                <span style={{
                  background: "#1d3a8f",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                }}>2026</span>
              </h2>

              <p style={{ fontSize: 15.5, color: "#475569", lineHeight: 1.7, marginBottom: 28, maxWidth: 400 }}>
                4-week AI-first program with real projects, modern workflows, and startup experience — starting June 1.
              </p>

              {/* Stats with vertical dividers */}
              <div className="st-stats">
                {[
                  { val: "4 Weeks", label: "Duration"   },
                  { val: "60",      label: "Total Seats" },
                  { val: "June 1",  label: "Start Date"  },
                  { val: "6",       label: "Domains"     },
                ].map((s) => (
                  <div key={s.label} className="st-stat-item">
                    <div style={{ fontSize: 18, fontWeight: 900, color: "#0f172a", letterSpacing: "-0.03em", lineHeight: 1 }}>{s.val}</div>
                    <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600, marginTop: 4 }}>{s.label}</div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="st-btns" style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <a href="/early-apply" style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: "#1d3a8f",
                  color: "white", fontSize: 14, fontWeight: 700,
                  padding: "13px 28px", borderRadius: 12, textDecoration: "none",
                  boxShadow: "0 4px 20px rgba(29,58,143,0.30)",
                }}>
                  Apply Now
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
                <a href="/early-apply#program" style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: "#ffffff", color: "#1d3a8f", fontSize: 14, fontWeight: 700,
                  padding: "12px 22px", borderRadius: 12, textDecoration: "none",
                  border: "1.5px solid rgba(29,58,143,0.20)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                }}>
                  Explore Program
                </a>
              </div>
            </div>

            {/* ── RIGHT ── */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

              {/* Live seats block */}
              <div style={{
                background: urgency === "red" ? "#fff5f5" : urgency === "yellow" ? "#fffbeb" : "#f0fdf4",
                border: `1.5px solid ${urgency === "red" ? "rgba(220,38,38,0.18)" : urgency === "yellow" ? "rgba(180,83,9,0.18)" : "rgba(5,150,105,0.18)"}`,
                borderRadius: 20,
                padding: "24px 28px",
              }}>
                <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 4 }}>
                  <div
                    className={`st-seats-num${bump ? " st-bump" : ""}`}
                    style={{ fontSize: "clamp(52px,7vw,72px)", fontWeight: 900, color: numColor, letterSpacing: "-0.05em", lineHeight: 1 }}
                  >
                    {seats.remaining}
                  </div>
                  <div style={{
                    display: "inline-flex", alignItems: "center", gap: 5,
                    background: badgeBg, color: badgeTxt,
                    borderRadius: 99, padding: "5px 12px",
                    fontSize: 11, fontWeight: 800,
                  }}>
                    <div className="st-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: dotColor }} />
                    {label}
                  </div>
                </div>

                <div style={{ fontSize: 12, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: ".07em", marginBottom: 14 }}>
                  Seats Remaining of 60
                </div>

                {/* Progress bar */}
                <div style={{ height: 8, background: "rgba(0,0,0,0.06)", borderRadius: 99, overflow: "hidden", position: "relative" }}>
                  <div
                    className="st-bar-fill"
                    style={{
                      width: `${pct}%`, height: "100%", borderRadius: 99,
                      background: barColor,
                      position: "relative", overflow: "hidden",
                      transition: "width .8s cubic-bezier(.34,1.2,.64,1)",
                    }}
                  />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: "#94a3b8" }}>{seats.filled} filled</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: numColor }}>{pct}% full</span>
                </div>
              </div>

              {/* 6 Domains */}
              <div style={{
                background: "#f8fafc", border: "1px solid #e2e8f0",
                borderRadius: 16, padding: "18px 20px",
              }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: ".09em", marginBottom: 12 }}>
                  6 Domains
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                  {["AI / ML", "Development", "Product Design", "Marketing", "Operations", "Creator Program"].map(d => (
                    <span key={d} style={{
                      fontSize: 12, fontWeight: 600, color: "#1d3a8f",
                      background: "#eff4ff", border: "1px solid #bfcfff",
                      borderRadius: 8, padding: "5px 12px",
                    }}>{d}</span>
                  ))}
                </div>
              </div>

              {/* Certificate strip */}
              <div style={{
                background: "linear-gradient(135deg, #fffbeb 0%, #fef9ee 100%)",
                border: "1px solid #fde68a", borderRadius: 14,
                padding: "13px 18px", display: "flex", alignItems: "center", gap: 12,
              }}>
                <span style={{ fontSize: 20, flexShrink: 0 }}>🏆</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: "#92400e", marginBottom: 2 }}>
                    Training Certificate + Jobingen AI Platform Access
                  </div>
                  <div style={{ fontSize: 11.5, color: "#b45309" }}>
                    Industry-recognised certificate · Full platform access included
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  )
}
