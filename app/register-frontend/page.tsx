"use client"

import { useState } from "react"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import { useWaitlist } from "@/components/waitlist-modal"

export default function RegisterFrontendPage() {
  const { open: openWaitlist } = useWaitlist()
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  async function handleNotify(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    try {
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), source: "frontend-masterclass-next" }),
      })
    } catch {}
    setSubmitted(true)
  }

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseDot {
          0%,100% { opacity: 1; transform: scale(1); }
          50%      { opacity: .6; transform: scale(1.35); }
        }
        @keyframes floatBadge {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-6px); }
        }
      `}</style>

      <Navbar />

      <main style={{ minHeight: "100vh", background: "linear-gradient(180deg,#f8faff 0%,#eef2ff 40%,#fff 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "108px 20px 80px" }}>

        {/* Background accents */}
        <div style={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "10%", right: "8%", width: 380, height: 380, borderRadius: "50%", background: "radial-gradient(circle,rgba(29,58,143,0.06) 0%,transparent 70%)" }} />
          <div style={{ position: "absolute", bottom: "15%", left: "6%", width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle,rgba(59,91,219,0.05) 0%,transparent 70%)" }} />
        </div>

        <div style={{ position: "relative", maxWidth: 560, width: "100%", textAlign: "center" }}>

          {/* Session badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 28, padding: "6px 18px", borderRadius: 99, background: "white", border: "1.5px solid #e0e7ff", boxShadow: "0 2px 12px rgba(29,58,143,0.08)", animation: "fadeUp 0.5s ease both" }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#16a34a", animation: "pulseDot 2s infinite", display: "inline-block" }} />
            <span style={{ fontSize: 12, fontWeight: 700, color: "#1d3a8f" }}>Session Complete · 19 Apr 2026</span>
          </div>

          {/* Heading */}
          <h1 style={{ fontSize: "clamp(28px,5vw,46px)", fontWeight: 900, color: "#0f172a", lineHeight: 1.1, letterSpacing: "-0.04em", marginBottom: 16, animation: "fadeUp 0.5s ease 0.08s both" }}>
            Registration Closed
          </h1>

          {/* Subtext */}
          <p style={{ fontSize: 17, color: "#64748b", lineHeight: 1.75, maxWidth: 440, margin: "0 auto 12px", animation: "fadeUp 0.5s ease 0.14s both" }}>
            The <strong style={{ color: "#0f172a", fontWeight: 700 }}>Frontend Engineering Masterclass</strong> has concluded with over 200 students. Thank you for the incredible response!
          </p>

          {/* Stats row */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0, marginBottom: 40, animation: "fadeUp 0.5s ease 0.2s both" }}>
            {[
              { val: "1", label: "Session held" },
              { val: "1", label: "Live session" },
              { val: "₹29", label: "Accessible price" },
            ].map((s, i) => (
              <div key={s.label} style={{ display: "flex", alignItems: "stretch", gap: 0 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, padding: "0 24px" }}>
                  <span style={{ fontSize: 20, fontWeight: 900, color: "#1d3a8f", letterSpacing: "-0.03em" }}>{s.val}</span>
                  <span style={{ fontSize: 12, color: "#94a3b8", fontWeight: 500 }}>{s.label}</span>
                </div>
                {i < 2 && <div style={{ width: 1, background: "#e0e7ff", alignSelf: "center", height: 28 }} />}
              </div>
            ))}
          </div>

          {/* Notify card */}
          <div style={{ background: "white", borderRadius: 20, border: "1.5px solid #e0e7ff", boxShadow: "0 8px 40px rgba(29,58,143,0.1)", padding: "32px 28px", animation: "fadeUp 0.5s ease 0.26s both" }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#1d3a8f", marginBottom: 6 }}>
              Next Batch Coming Soon
            </div>
            <p style={{ fontSize: 13, color: "#64748b", marginBottom: 20, lineHeight: 1.6 }}>
              Drop your email — we'll notify you first when the next session opens.
            </p>

            {submitted ? (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "14px 0", background: "#f0fdf4", borderRadius: 12, border: "1px solid #bbf7d0" }}>
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#15803d" }}>You're on the list! We'll reach out soon.</span>
              </div>
            ) : (
              <form onSubmit={handleNotify} style={{ display: "flex", gap: 8 }}>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  style={{ flex: 1, padding: "12px 16px", borderRadius: 12, border: "1.5px solid #e0e7ff", fontSize: 14, color: "#0f172a", outline: "none", background: "#f8faff" }}
                />
                <button type="submit" style={{ padding: "12px 22px", borderRadius: 12, border: "none", background: "#1d3a8f", color: "white", fontSize: 13, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }}>
                  Notify Me
                </button>
              </form>
            )}
          </div>

          {/* Back to jobs */}
          <div style={{ marginTop: 28, animation: "fadeUp 0.5s ease 0.32s both" }}>
            <a href="/jobs" style={{ fontSize: 13, fontWeight: 600, color: "#1d3a8f", textDecoration: "none" }}>
              ← Browse open jobs on Jobingen
            </a>
          </div>

        </div>
      </main>

      <Footer />
    </>
  )
}
