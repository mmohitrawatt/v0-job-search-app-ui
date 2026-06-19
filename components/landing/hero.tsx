"use client"

import Image from "next/image"
import { motion } from "./motion"
import { useWaitlist } from "@/components/waitlist-modal"

/* ─── Mini Jobingen Desktop Dashboard ─── */
function DesktopScreen() {
  return (
    <div style={{ display: "flex", height: "100%", background: "#f7f8fc", fontSize: 0 }}>

      {/* Sidebar */}
      <div style={{ width: 110, background: "white", borderRight: "1px solid #f1f5f9", display: "flex", flexDirection: "column", padding: "10px 0", flexShrink: 0 }}>
        {/* Logo */}
        <div style={{ padding: "0 10px 10px", borderBottom: "1px solid #f1f5f9", marginBottom: 8 }}>
          <div style={{ fontSize: 11, fontWeight: 900, color: "#1d3a8f", letterSpacing: "-0.03em" }}>jobingen</div>
        </div>
        {/* Nav label */}
        <div style={{ fontSize: 7, fontWeight: 700, color: "#94a3b8", letterSpacing: ".06em", textTransform: "uppercase", padding: "0 10px", marginBottom: 4 }}>Career Hub</div>
        {/* Nav items */}
        {[
          { label: "Dashboard", active: true },
          { label: "Resumes" },
          { label: "Mentors" },
        ].map(item => (
          <div key={item.label} style={{
            display: "flex", alignItems: "center", gap: 5,
            padding: "4px 10px", margin: "1px 6px", borderRadius: 6,
            background: item.active ? "#eef1fd" : "transparent",
          }}>
            <div style={{ width: 7, height: 7, borderRadius: 2, background: item.active ? "#1d3a8f" : "#e2e8f0", flexShrink: 0 }} />
            <span style={{ fontSize: 8, fontWeight: item.active ? 700 : 500, color: item.active ? "#1d3a8f" : "#64748b" }}>{item.label}</span>
          </div>
        ))}
        <div style={{ fontSize: 7, fontWeight: 700, color: "#94a3b8", letterSpacing: ".06em", textTransform: "uppercase", padding: "8px 10px 4px", marginBottom: 2 }}>Learn</div>
        {["Bootcamps", "Masterclasses"].map(label => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 5, padding: "4px 10px", margin: "1px 6px", borderRadius: 6 }}>
            <div style={{ width: 7, height: 7, borderRadius: 2, background: "#e2e8f0", flexShrink: 0 }} />
            <span style={{ fontSize: 8, fontWeight: 500, color: "#64748b" }}>{label}</span>
          </div>
        ))}
        <div style={{ fontSize: 7, fontWeight: 700, color: "#94a3b8", letterSpacing: ".06em", textTransform: "uppercase", padding: "8px 10px 4px" }}>Coming Soon</div>
        {["Interview AI", "AutoApply"].map(label => (
          <div key={label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "4px 10px", margin: "1px 6px", borderRadius: 6 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ width: 7, height: 7, borderRadius: 2, background: "#f1f5f9", flexShrink: 0 }} />
              <span style={{ fontSize: 8, fontWeight: 500, color: "#94a3b8" }}>{label}</span>
            </div>
            <span style={{ fontSize: 6, fontWeight: 700, color: "#f97316", background: "#fff7ed", padding: "1px 4px", borderRadius: 3 }}>Soon</span>
          </div>
        ))}
      </div>

      {/* Main content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, overflow: "hidden" }}>
        {/* Top bar */}
        <div style={{ height: 28, background: "white", borderBottom: "1px solid #f1f5f9", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 10px", flexShrink: 0 }}>
          <span style={{ fontSize: 9, fontWeight: 700, color: "#0f172a" }}>Dashboard</span>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ width: 70, height: 14, background: "#f8fafc", border: "1px solid #f1f5f9", borderRadius: 99, display: "flex", alignItems: "center", paddingLeft: 6, gap: 4 }}>
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#cbd5e1" }} />
              <span style={{ fontSize: 6.5, color: "#94a3b8" }}>Search...</span>
            </div>
            <div style={{ width: 16, height: 16, borderRadius: "50%", background: "linear-gradient(135deg,#1d3a8f,#3b5bdb)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 7, fontWeight: 800, color: "white" }}>J</span>
            </div>
          </div>
        </div>

        {/* Body */}
        <div style={{ flex: 1, padding: 10, display: "flex", flexDirection: "column", gap: 8, overflow: "hidden" }}>

          {/* Hero banner */}
          <div style={{ background: "linear-gradient(135deg,#eef0ff 0%,#e8edff 100%)", borderRadius: 10, padding: "10px 12px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
            <div>
              <div style={{ fontSize: 7.5, fontWeight: 600, color: "#3b5bdb", marginBottom: 3 }}>Rise and shine, Jobingen 👋</div>
              <div style={{ fontSize: 10, fontWeight: 800, color: "#0f172a", lineHeight: 1.3, maxWidth: 160 }}>A clear head, a clean draft, a closer goal</div>
              <div style={{ display: "flex", gap: 4, marginTop: 7 }}>
                <div style={{ fontSize: 6.5, fontWeight: 700, color: "white", background: "#1d3a8f", padding: "3px 7px", borderRadius: 5, display: "flex", alignItems: "center", gap: 3 }}>
                  <span>+</span> New Resume
                </div>
                <div style={{ fontSize: 6.5, fontWeight: 600, color: "#334155", background: "white", border: "1px solid #e2e8f0", padding: "3px 7px", borderRadius: 5 }}>Improve with AI</div>
                <div style={{ fontSize: 6.5, fontWeight: 600, color: "#334155", background: "white", border: "1px solid #e2e8f0", padding: "3px 7px", borderRadius: 5 }}>Tailor for a Role</div>
              </div>
            </div>
            {/* Floating card */}
            <div style={{ width: 64, height: 52, background: "white", borderRadius: 8, boxShadow: "0 4px 16px rgba(0,0,0,0.1)", marginRight: 4, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 3 }}>
              <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#eef1fd", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", border: "1.5px solid #3b5bdb", borderTopColor: "transparent" }} />
              </div>
              <div style={{ width: 36, height: 3, background: "#e2e8f0", borderRadius: 2 }} />
              <div style={{ width: 28, height: 3, background: "#f1f5f9", borderRadius: 2 }} />
            </div>
          </div>

          {/* Stats row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 6, flexShrink: 0 }}>
            {[
              { val: "0", label: "Total Resumes",   sub: "Create your first", ic: "#dbeafe", tc: "#1d3a8f" },
              { val: "—", label: "Best ATS Score",  sub: "Run analysis",      ic: "#dcfce7", tc: "#16a34a" },
              { val: "0", label: "Mentor Sessions", sub: "Book a session",    ic: "#fed7aa", tc: "#ea580c" },
              { val: "0", label: "Saved Jobs",      sub: "Coming soon",       ic: "#ede9fe", tc: "#7c3aed" },
            ].map(s => (
              <div key={s.label} style={{ background: "white", borderRadius: 8, padding: "7px 8px", border: "1px solid #f1f5f9" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 4 }}>
                  <div style={{ width: 14, height: 14, borderRadius: 4, background: s.ic, flexShrink: 0 }} />
                </div>
                <div style={{ fontSize: 12, fontWeight: 900, color: "#0f172a", lineHeight: 1 }}>{s.val}</div>
                <div style={{ fontSize: 6.5, color: "#64748b", marginTop: 2 }}>{s.label}</div>
                <div style={{ fontSize: 6, fontWeight: 600, color: s.tc, marginTop: 2 }}>{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Recent resumes */}
          <div style={{ flex: 1, background: "white", borderRadius: 8, padding: "8px", border: "1px solid #f1f5f9", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 5 }}>
            <div style={{ width: 22, height: 22, borderRadius: "50%", background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/></svg>
            </div>
            <div style={{ fontSize: 8, fontWeight: 700, color: "#0f172a" }}>No resumes yet</div>
            <div style={{ fontSize: 7, color: "#94a3b8" }}>Create your first resume</div>
            <div style={{ fontSize: 7, fontWeight: 700, color: "white", background: "#1d3a8f", padding: "4px 10px", borderRadius: 20 }}>Create Resume</div>
          </div>

        </div>
      </div>

      {/* Right AI panel */}
      <div style={{ width: 100, background: "white", borderLeft: "1px solid #f1f5f9", padding: 8, display: "flex", flexDirection: "column", gap: 8, flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 8, fontWeight: 800, color: "#0f172a" }}>AI Insights</span>
          <span style={{ fontSize: 6.5, fontWeight: 700, color: "#16a34a", display: "flex", alignItems: "center", gap: 2 }}>
            <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />Live
          </span>
        </div>
        {[
          { title: "ATS score can improve 18%", color: "#dbeafe", tc: "#1d3a8f" },
          { title: "Missing measurable impact", color: "#fff7ed", tc: "#ea580c" },
          { title: "Tailor for Product roles", color: "#ede9fe", tc: "#7c3aed" },
        ].map((item, i) => (
          <div key={i} style={{ background: "#f8fafc", borderRadius: 6, padding: "5px 6px" }}>
            <div style={{ width: 12, height: 12, borderRadius: 4, background: item.color, marginBottom: 4 }} />
            <div style={{ fontSize: 7, fontWeight: 600, color: "#0f172a", lineHeight: 1.4 }}>{item.title}</div>
          </div>
        ))}
        <div style={{ marginTop: 4 }}>
          <div style={{ fontSize: 8, fontWeight: 800, color: "#0f172a", marginBottom: 6 }}>Recent Bootcamps</div>
          {[
            { title: "Recursion Deep Dive", price: "₹29", open: true },
            { title: "ML Masterclass", price: "₹29", open: true },
          ].map((b, i) => (
            <div key={i} style={{ padding: "5px 0", borderBottom: i === 0 ? "1px solid #f1f5f9" : "none" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
                <span style={{ fontSize: 7, fontWeight: 700, color: "#0f172a" }}>{b.title}</span>
                <span style={{ fontSize: 7, fontWeight: 800, color: "#1d3a8f" }}>{b.price}</span>
              </div>
              <span style={{ fontSize: 6, fontWeight: 700, color: "#16a34a", background: "#dcfce7", padding: "1px 5px", borderRadius: 3 }}>Open</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

/* ─── Mini Jobingen Mobile Dashboard ─── */
function MobileScreen() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#f7f8fc" }}>

      {/* Top bar */}
      <div style={{ background: "white", padding: "8px 10px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #f1f5f9", flexShrink: 0 }}>
        <span style={{ fontSize: 10, fontWeight: 900, color: "#1d3a8f", letterSpacing: "-0.03em" }}>jobingen</span>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="8" height="8" fill="none" viewBox="0 0 24 24" stroke="#64748b" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          </div>
          <div style={{ width: 16, height: 16, borderRadius: "50%", background: "linear-gradient(135deg,#1d3a8f,#3b5bdb)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 7, fontWeight: 800, color: "white" }}>J</span>
          </div>
        </div>
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, padding: 8, display: "flex", flexDirection: "column", gap: 8, overflow: "hidden" }}>

        {/* Hero banner */}
        <div style={{ background: "linear-gradient(135deg,#eef0ff 0%,#e8edff 100%)", borderRadius: 10, padding: "10px 12px" }}>
          <div style={{ fontSize: 7.5, fontWeight: 600, color: "#3b5bdb", marginBottom: 3 }}>Good morning, Jobingen 👋</div>
          <div style={{ fontSize: 10, fontWeight: 800, color: "#0f172a", lineHeight: 1.3, marginBottom: 8 }}>A fresh day, a fresh chance to inch closer</div>
          <div style={{ display: "flex", gap: 5 }}>
            <div style={{ fontSize: 7, fontWeight: 700, color: "white", background: "#1d3a8f", padding: "4px 8px", borderRadius: 20, display: "flex", alignItems: "center", gap: 2 }}>
              + New Resume
            </div>
            <div style={{ fontSize: 7, fontWeight: 600, color: "#334155", background: "white", border: "1px solid #e2e8f0", padding: "4px 8px", borderRadius: 20 }}>AI Improve</div>
          </div>
        </div>

        {/* Stats 2x2 */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
          {[
            { val: "0", label: "Total Resumes",   sub: "Create your first", ic: "#dbeafe" },
            { val: "—", label: "Best ATS Score",  sub: "Run analysis",      ic: "#dcfce7" },
            { val: "0", label: "Mentor Sessions", sub: "Book a session",    ic: "#fed7aa" },
            { val: "0", label: "Saved Jobs",      sub: "Coming soon",       ic: "#ede9fe" },
          ].map(s => (
            <div key={s.label} style={{ background: "white", borderRadius: 8, padding: "8px", border: "1px solid #f1f5f9" }}>
              <div style={{ width: 16, height: 16, borderRadius: 5, background: s.ic, marginBottom: 5 }} />
              <div style={{ fontSize: 14, fontWeight: 900, color: "#0f172a", lineHeight: 1 }}>{s.val}</div>
              <div style={{ fontSize: 7, color: "#64748b", marginTop: 3 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Recent resumes */}
        <div style={{ flex: 1, background: "white", borderRadius: 8, padding: "10px", border: "1px solid #f1f5f9", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6 }}>
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/></svg>
          </div>
          <div style={{ fontSize: 9, fontWeight: 700, color: "#0f172a" }}>No resumes yet</div>
          <div style={{ fontSize: 8, fontWeight: 700, color: "white", background: "#1d3a8f", padding: "5px 14px", borderRadius: 20 }}>Create Resume</div>
        </div>

      </div>

      {/* Bottom nav */}
      <div style={{ background: "white", borderTop: "1px solid #f1f5f9", display: "flex", padding: "8px 0 4px", flexShrink: 0 }}>
        {[
          { label: "Home",    active: true },
          { label: "Resume"  },
          { label: "Mentors" },
          { label: "Learn"   },
          { label: "More"    },
        ].map(item => (
          <div key={item.label} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
            <div style={{ width: 14, height: 14, borderRadius: 4, background: item.active ? "#eef1fd" : "#f8fafc" }} />
            <span style={{ fontSize: 6.5, fontWeight: item.active ? 700 : 500, color: item.active ? "#1d3a8f" : "#94a3b8" }}>{item.label}</span>
          </div>
        ))}
      </div>

    </div>
  )
}

/* ─── Laptop Frame ─── */
function LaptopFrame() {
  return (
    <div style={{ background: "#1a1f2e", borderRadius: 14, padding: "8px 8px 0", boxShadow: "0 40px 100px rgba(0,0,0,0.22), 0 0 0 1px rgba(255,255,255,0.04)" }}>
      {/* Mac dots */}
      <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 8px 6px" }}>
        {["#ff5f57", "#febc2e", "#28c840"].map(c => (
          <div key={c} style={{ width: 8, height: 8, borderRadius: "50%", background: c }} />
        ))}
      </div>
      {/* Screen */}
      <div style={{ borderRadius: "6px 6px 0 0", overflow: "hidden", height: 260 }}>
        <DesktopScreen />
      </div>
      {/* Base */}
      <div style={{ height: 14, background: "#141924", margin: "0 -8px", borderRadius: "0 0 4px 4px", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div style={{ width: 50, height: 5, background: "#252d3d", borderRadius: 3 }} />
      </div>
    </div>
  )
}

/* ─── Phone Frame ─── */
function PhoneFrame() {
  return (
    <div style={{ background: "#1a1f2e", borderRadius: 28, padding: 7, boxShadow: "0 24px 64px rgba(0,0,0,0.30), 0 0 0 1px rgba(255,255,255,0.05)", width: 148, flexShrink: 0 }}>
      {/* Notch */}
      <div style={{ height: 16, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div style={{ width: 40, height: 8, background: "#0d1117", borderRadius: 99 }} />
      </div>
      {/* Screen */}
      <div style={{ borderRadius: 20, overflow: "hidden", height: 272 }}>
        <MobileScreen />
      </div>
      {/* Home bar */}
      <div style={{ height: 16, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div style={{ width: 40, height: 4, background: "#252d3d", borderRadius: 99 }} />
      </div>
    </div>
  )
}

/* ─── Hero ─── */
export function Hero() {
  const { open: openWaitlist } = useWaitlist()

  return (
    <section
      className="mt-[74px] lg:mt-[106px] min-h-[calc(100vh-74px)] lg:min-h-[calc(100vh-106px)]"
      style={{ position: "relative", overflow: "hidden", background: "#ffffff", display: "flex", alignItems: "center" }}
    >

      <div className="relative w-full max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center px-5 sm:px-8 lg:pl-16 lg:pr-0 py-10 lg:py-0">

        {/* ── LEFT ── */}
        <div className="flex-shrink-0 w-full lg:w-[44%] text-center lg:text-left" style={{ maxWidth: 560 }}>

          {/* Badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "white", border: "1px solid #e2e8f0",
            borderRadius: 99, padding: "7px 18px", marginBottom: 28,
            boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
          }}>
            <span style={{ fontSize: 16 }}>🎓</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#475569" }}>Trusted by</span>
            <span style={{ fontSize: 13, fontWeight: 800, color: "#1d3a8f" }}>10,000+ students</span>
          </div>

          {/* H1 */}
          <h1 style={{
            fontSize: "clamp(48px, 6vw, 80px)", fontWeight: 900,
            lineHeight: 1.02, letterSpacing: "-0.04em",
            color: "#0c1a35", marginBottom: 20,
          }}>
            Everything<br />
            <span style={{
              background: "linear-gradient(135deg,#1d3a8f,#3b5bdb,#6366f1)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>Career.</span>
          </h1>

          {/* Subtext */}
          <p className="mx-auto lg:mx-0" style={{
            fontSize: 18, color: "#334155", lineHeight: 1.72,
            marginBottom: 36, maxWidth: 460, fontWeight: 500,
          }}>
            AI-crafted resumes, smart job matching, real mock interviews, and expert bootcamps — all in one intelligent platform.
          </p>

          {/* CTAs */}
          <div className="flex items-center gap-3 justify-center lg:justify-start" style={{ marginBottom: 24 }}>
            <button
              onClick={openWaitlist}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.opacity = "0.9"; el.style.transform = "translateY(-1px)" }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.opacity = "1"; el.style.transform = "" }}
              style={{
                fontSize: 15, fontWeight: 700, color: "white",
                padding: "13px 24px", borderRadius: 12, border: "none", cursor: "pointer",
                background: "#0c1a35", boxShadow: "0 4px 20px rgba(12,26,53,0.3)",
                transition: "all .2s ease", whiteSpace: "nowrap",
              }}>
              Get Started
            </button>
            <div style={{ position: "relative", flexShrink: 0 }}>
              <div style={{
                position: "absolute", top: -10, left: "50%", transform: "translateX(-50%)",
                background: "#3b5bdb", color: "white", fontSize: 10, fontWeight: 800,
                padding: "2px 8px", borderRadius: 99, whiteSpace: "nowrap", letterSpacing: ".04em",
              }}>It&apos;s Free</div>
              <a href="/ai-tools" style={{
                display: "block", fontSize: 15, fontWeight: 600, color: "#1d3a8f",
                padding: "13px 24px", borderRadius: 12, textDecoration: "none",
                background: "#dce3ff", border: "1.5px solid #c7d2fe", transition: "all .2s ease",
                whiteSpace: "nowrap",
              }}>
                Explore Features
              </a>
            </div>
          </div>

          {/* Trust row */}
          <div className="flex items-center gap-5 justify-center lg:justify-start flex-wrap">
            {[
              { icon: "✓", text: "Free for students" },
              { icon: "✓", text: "No credit card" },
              { icon: "✓", text: "Instant access" },
            ].map(item => (
              <span key={item.text} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 13.5, fontWeight: 500, color: "#64748b" }}>
                <span style={{ width: 18, height: 18, borderRadius: "50%", background: "#e8edff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800, color: "#1d3a8f", flexShrink: 0 }}>{item.icon}</span>
                {item.text}
              </span>
            ))}
          </div>

        </div>

        {/* ── RIGHT — mobile: centered below text | desktop: fills to screen edge ── */}
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="w-full lg:flex-1 mt-6 lg:mt-0"
          style={{ minWidth: 0 }}>
          {/* Mobile */}
          <div className="lg:hidden flex justify-center">
            <Image
              src="/screenshots/devices-mockup.png"
              alt="Jobingen App"
              width={960}
              height={720}
              style={{ width: "100%", maxWidth: 440, height: "auto", objectFit: "contain" }}
              priority
            />
          </div>
          {/* Desktop */}
          <div className="hidden lg:flex items-center justify-end" style={{ alignSelf: "stretch", height: "100%" }}>
            <Image
              src="/screenshots/devices-mockup.png"
              alt="Jobingen App"
              width={1080}
              height={810}
              style={{ width: "100%", height: "auto", maxHeight: "85vh", objectFit: "contain", objectPosition: "right center", display: "block" }}
              priority
            />
          </div>
        </motion.div>

      </div>
    </section>
  )
}
