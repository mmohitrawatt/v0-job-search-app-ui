"use client"

const STEPS = [
  {
    n: "01",
    title: "Create Your Profile",
    desc: "Sign up, add your skills and career goals. Jobingen builds your personalized job-readiness score instantly.",
    tags: ["Resume Builder", "Skills Assessment", "Career Goals"],
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#1d3a8f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    n: "02",
    title: "Get Matched to Jobs",
    desc: "AI scans thousands of roles from KPMG, Dell, PhonePe, Zepto & more — surfaces only what fits you.",
    tags: ["AI Job Match", "Top Companies", "Real-time Listings"],
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#1d3a8f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
      </svg>
    ),
  },
  {
    n: "03",
    title: "Upskill with Mentors",
    desc: "1:1 mentoring from industry professionals, live bootcamps, and mock interviews — close the gap between college and industry.",
    tags: ["1:1 Mentoring", "Live Bootcamps", "Mock Interviews"],
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#1d3a8f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    n: "04",
    title: "Apply & Get Hired",
    desc: "AI-tailored resume, one-click smart apply, and real-time application tracking — from first click to offer letter.",
    tags: ["Smart Apply", "Resume Tailor", "Application Tracker"],
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#1d3a8f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="M22 4 12 14.01l-3-3" />
      </svg>
    ),
  },
]

export function HowItWorks() {
  return (
    <>
      <style>{`
        .hiw-section { padding: 72px 40px; }
        .hiw-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; position: relative; }
        .hiw-card { background: #ffffff; border: 1.5px solid rgba(29,58,143,0.10); border-radius: 22px; padding: 32px 26px 28px; display: flex; flex-direction: column; gap: 0; box-shadow: 0 2px 16px rgba(29,58,143,0.06); transition: box-shadow .22s ease, transform .22s ease; }
        .hiw-card:hover { box-shadow: 0 10px 40px rgba(29,58,143,0.12); transform: translateY(-3px); }
        .hiw-connector { display: flex; align-items: center; justify-content: center; padding-top: 52px; color: #cbd5e1; font-size: 20px; flex-shrink: 0; }
        @media (max-width: 900px) {
          .hiw-section { padding: 48px 18px; }
          .hiw-grid { grid-template-columns: 1fr 1fr; gap: 14px; }
          .hiw-connector { display: none; }
        }
        @media (max-width: 540px) {
          .hiw-grid { grid-template-columns: 1fr; gap: 12px; }
        }
      `}</style>

      <section id="how-it-works" className="hiw-section" style={{ background: "#ffffff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>

          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "#eff4ff", border: "1px solid #bfcfff", borderRadius: 99, padding: "5px 14px", marginBottom: 16 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#1d3a8f" }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: "#1d3a8f", letterSpacing: ".08em", textTransform: "uppercase" as const }}>How It Works</span>
            </div>
            <h2 style={{ fontSize: "clamp(26px,3.5vw,42px)", fontWeight: 900, color: "#0f172a", letterSpacing: "-0.04em", lineHeight: 1.1, marginBottom: 12 }}>
              From student to hired —<br />4 simple steps
            </h2>
            <p style={{ fontSize: 15, color: "#64748b", maxWidth: 400, margin: "0 auto", lineHeight: 1.7 }}>
              Everything you need to go from "no idea where to start" to offer letter.
            </p>
          </div>

          {/* Cards grid */}
          <div className="hiw-grid">
            {STEPS.map((step, i) => (
              <div key={step.n} className="hiw-card">

                {/* Top: step number + icon row */}
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
                  {/* Icon circle */}
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: "#eff4ff", border: "1.5px solid #bfcfff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {step.icon}
                  </div>
                  {/* Step number watermark */}
                  <div style={{ fontSize: 36, fontWeight: 900, color: "rgba(29,58,143,0.07)", letterSpacing: "-0.05em", lineHeight: 1, userSelect: "none" as const }}>
                    {step.n}
                  </div>
                </div>

                {/* Connector arrow on desktop — shown between cards */}
                {i < STEPS.length - 1 && (
                  <div style={{ position: "absolute", top: 40, left: `calc(${(i + 1) * 25}% - 10px)`, zIndex: 10, display: "none" }} />
                )}

                {/* Title */}
                <div style={{ fontSize: 15.5, fontWeight: 800, color: "#0f172a", letterSpacing: "-0.02em", lineHeight: 1.3, marginBottom: 10 }}>
                  {step.title}
                </div>

                {/* Description */}
                <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.75, marginBottom: 18, flex: 1 }}>
                  {step.desc}
                </p>

                {/* Tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {step.tags.map(t => (
                    <span key={t} style={{ fontSize: 10.5, fontWeight: 600, color: "#1d3a8f", background: "#eff4ff", border: "1px solid #bfcfff", borderRadius: 99, padding: "3px 10px" }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom connector strip */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 36 }}>
            {STEPS.map((_, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: i === 3 ? "#1d3a8f" : "#bfcfff" }} />
                {i < 3 && <div style={{ width: 40, height: 1.5, background: "#bfcfff" }} />}
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  )
}
