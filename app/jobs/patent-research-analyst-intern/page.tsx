import Link from "next/link"
import PatentApplyForm from "./patent-apply-form"

export const metadata = {
  title: "IP & Technology Transfer Associate | Jobingen",
  description:
    "Join a leading Indian institute as an Intellectual Property & Technology Transfer Associate. Work on patent research, technology commercialization, and innovation management.",
}

/* ─── Data ─────────────────────────────────────────── */

const HIGHLIGHTS = [
  {
    label: "Compensation",
    value: "\u20B980K \u2013 \u20B91L /mo",
    sub: "Contractual",
    gradient: "linear-gradient(135deg,#0f766e,#14b8a6)",
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Contract",
    value: "Performance-based",
    sub: "Renewal on merit",
    gradient: "linear-gradient(135deg,#4338ca,#818cf8)",
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
        <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Mentorship",
    value: "Senior Faculty",
    sub: "Innovation leaders",
    gradient: "linear-gradient(135deg,#b45309,#f59e0b)",
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Deadline",
    value: "Apply Today",
    sub: "Limited positions",
    gradient: "linear-gradient(135deg,#dc2626,#f87171)",
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" stroke="#fff" strokeWidth="1.8" />
        <path d="M12 6v6l4 2" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
]

const RESPONSIBILITIES = [
  { text: "Support intellectual property lifecycle including patent analysis and documentation", icon: "shield" },
  { text: "Assist in technology transfer and innovation commercialization", icon: "transfer" },
  { text: "Conduct patent research and prior art searches", icon: "search" },
  { text: "Prepare technology briefs and innovation summaries", icon: "doc" },
  { text: "Coordinate with researchers, faculty, startups, and industry stakeholders", icon: "people" },
  { text: "Support marketing of technologies through digital outreach and presentations", icon: "megaphone" },
  { text: "Conduct techno-commercial feasibility studies and market research", icon: "chart" },
  { text: "Assist in patent filings, portfolio tracking, and compliance processes", icon: "folder" },
  { text: "Support workshops, innovation events, and knowledge sessions", icon: "calendar" },
]

const QUALIFICATIONS = [
  "B.Tech / M.Tech in a relevant field",
  "BCA, BSc, MSc, or LLB candidates interested in Intellectual Property may also apply",
  "Prior exposure to patents, IPR, research, or technology transfer is preferred",
]

const IDEAL_TRAITS = [
  { title: "Curious Explorer", desc: "Fascinated by innovation and emerging technologies", icon: "lightbulb" },
  { title: "IP Enthusiast", desc: "Interested in patents and intellectual property", icon: "patent" },
  { title: "Analytical Thinker", desc: "Strong research and analytical thinking skills", icon: "brain" },
  { title: "Fast Learner", desc: "Willing to learn in a fast-paced innovation ecosystem", icon: "rocket" },
]

const PROCESS_STEPS = [
  { n: "01", title: "Resume Screening", desc: "Submit your profile and resume for initial review.", color: "#0f766e" },
  { n: "02", title: "Patent Research Quiz", desc: "Complete a short analytical quiz on patents and innovation.", color: "#4338ca" },
  { n: "03", title: "Final Discussion", desc: "Selected candidates are invited for a final conversation.", color: "#1d3a8f" },
]

/* ─── Icons for responsibilities ───────────────────── */

function ResponsibilityIcon({ type }: { type: string }) {
  const icons: Record<string, React.ReactNode> = {
    shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
    transfer: <><path d="M18 8A6 6 0 0 0 6 8" /><path d="M6 16a6 6 0 0 0 12 0" /><path d="M12 2v4m0 12v4M6 8l6 4 6-4M6 16l6-4 6 4" /></>,
    search: <><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></>,
    doc: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" /></>,
    people: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>,
    megaphone: <><path d="M3 11l18-5v12L3 13v-2z" /><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" /></>,
    chart: <><path d="M18 20V10M12 20V4M6 20v-6" /></>,
    folder: <><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /></>,
    calendar: <><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></>,
  }
  return (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#64748b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {icons[type]}
    </svg>
  )
}

function TraitIcon({ type }: { type: string }) {
  const map: Record<string, React.ReactNode> = {
    lightbulb: <><path d="M9 18h6M10 22h4" /><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A7 7 0 1 0 7.5 11.5c.76.76 1.23 1.52 1.41 2.5" /></>,
    patent: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></>,
    brain: <><path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z" /><path d="M9 21h6M10 17v4M14 17v4" /></>,
    rocket: <><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></>,
  }
  return (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {map[type]}
    </svg>
  )
}

/* ─── Page ─────────────────────────────────────────── */

export default function PatentInternPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#fafafa",
        fontFamily: "'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",
        color: "#0f172a",
      }}
    >
      {/* ── Navbar ─────────────────────────────────── */}
      <header
        style={{
          background: "rgba(255,255,255,.85)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(0,0,0,.06)",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        <div
          style={{
            maxWidth: 1080,
            margin: "0 auto",
            padding: "0 clamp(16px,4vw,32px)",
            height: 72,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/jobingen-logo.png" alt="Jobingen" style={{ height: 68, width: "auto", display: "block" }} />
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <Link
              href="/jobs"
              style={{ fontSize: 14, fontWeight: 500, color: "#64748b", textDecoration: "none", transition: "color .2s" }}
            >
              All Openings
            </Link>
            <a
              href="#apply"
              style={{
                background: "#1d3a8f",
                color: "#fff",
                fontSize: 13,
                fontWeight: 600,
                padding: "8px 20px",
                borderRadius: 8,
                textDecoration: "none",
                transition: "opacity .2s",
                letterSpacing: "-.1px",
              }}
            >
              Apply Now
            </a>
          </div>
        </div>
      </header>

      {/* ── Hero ───────────────────────────────────── */}
      <section
        style={{
          background: "#fff",
          borderBottom: "1px solid #f1f5f9",
          padding: "28px clamp(16px,4vw,32px) clamp(32px,4vw,48px)",
        }}
      >
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
            <Link href="/jobs" style={{ fontSize: 14, color: "#94a3b8", textDecoration: "none", fontWeight: 500 }}>Careers</Link>
            <span style={{ color: "#d1d5db", fontSize: 13 }}>/</span>
            <span style={{ fontSize: 14, color: "#475569", fontWeight: 500 }}>IP &amp; Technology Transfer</span>
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: "clamp(30px,5vw,48px)",
              fontWeight: 800,
              color: "#0f172a",
              margin: "0 0 16px",
              letterSpacing: "-1.2px",
              lineHeight: 1.12,
              maxWidth: 680,
            }}
          >
            Intellectual Property &amp; Technology Transfer Associate
          </h1>

          <p
            style={{
              fontSize: "clamp(16px,2vw,19px)",
              color: "#64748b",
              margin: "0 0 28px",
              lineHeight: 1.65,
              maxWidth: 580,
              fontWeight: 400,
            }}
          >
            Work at the intersection of innovation, research, and intellectual property at one of India&apos;s top science &amp; technology institutes.
          </p>

          {/* Meta row */}
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 20, marginBottom: 32 }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14, color: "#334155", fontWeight: 600 }}>
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" /><circle cx="12" cy="9" r="2.5" /></svg>
              Top Institute of India
            </span>
            <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#d1d5db", display: "inline-block" }} />
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14, color: "#334155", fontWeight: 600 }}>
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
              {"\u20B9"}80K {"\u2013"} {"\u20B9"}1L /month
            </span>
            <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#d1d5db", display: "inline-block" }} />
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14, color: "#334155", fontWeight: 600 }}>
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
              Contractual
            </span>
          </div>

          {/* CTA */}
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <a
              href="#apply"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "#1d3a8f",
                color: "#fff",
                fontSize: 15,
                fontWeight: 700,
                padding: "13px 28px",
                borderRadius: 10,
                textDecoration: "none",
                letterSpacing: "-.2px",
                transition: "background .15s",
              }}
            >
              Apply Now
              <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: 13,
                fontWeight: 600,
                color: "#dc2626",
                background: "#fef2f2",
                border: "1px solid #fecaca",
                padding: "8px 16px",
                borderRadius: 8,
              }}
            >
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
              Closing Soon
            </span>
          </div>
        </div>
      </section>

      {/* ── Highlights Strip ──────────────────────── */}
      <section style={{ padding: "20px clamp(16px,4vw,32px)" }}>
        <div
          style={{
            maxWidth: 1080,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            border: "1px solid #e2e8f0",
            borderRadius: 14,
            background: "#fff",
            overflow: "hidden",
          }}
          className="ip-highlights-grid"
        >
          {HIGHLIGHTS.map((h, i) => (
            <div
              key={h.label}
              style={{
                padding: "20px 24px",
                borderRight: i < HIGHLIGHTS.length - 1 ? "1px solid #e2e8f0" : "none",
              }}
            >
              <div style={{ fontSize: 11, fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", letterSpacing: ".5px", marginBottom: 6 }}>
                {h.label}
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#0f172a", letterSpacing: "-.1px", lineHeight: 1.3 }}>{h.value}</div>
              <div style={{ fontSize: 13, color: "#64748b", marginTop: 2 }}>{h.sub}</div>
            </div>
          ))}
        </div>
        {/* Mobile: stack vertically */}
        <style dangerouslySetInnerHTML={{ __html: `@media(max-width:640px){.ip-highlights-grid{grid-template-columns:1fr 1fr !important}}` }} />
      </section>

      {/* ── Main Content ───────────────────────────── */}
      <main style={{ maxWidth: 1080, margin: "0 auto", padding: "20px clamp(16px,4vw,32px) 80px" }}>
        {/* Two-column layout on desktop */}
        <div style={{ display: "flex", gap: 48, flexWrap: "wrap" }}>
          {/* Left column: Content */}
          <div style={{ flex: "1 1 600px", minWidth: 0 }}>
            {/* ── About ──────────────────────────── */}
            <Section title="About the Role">
              <p style={{ fontSize: 16, color: "#475569", lineHeight: 1.8, margin: 0 }}>
                We are looking for enthusiastic and hardworking individuals interested in the field of Intellectual Property (IP), Patent Research, and Technology Transfer.
              </p>
              <p style={{ fontSize: 16, color: "#475569", lineHeight: 1.8, margin: "16px 0 0" }}>
                The role involves working closely with researchers, innovators, and technology teams to support patent analysis, technology commercialization, and intellectual property management.
              </p>
              <p style={{ fontSize: 16, color: "#475569", lineHeight: 1.8, margin: "16px 0 0" }}>
                This opportunity is ideal for candidates curious about innovation, patents, and emerging technologies who want hands-on exposure to the intellectual property ecosystem.
              </p>
            </Section>

            {/* ── Responsibilities ────────────────── */}
            <Section title="Key Responsibilities">
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {RESPONSIBILITIES.map((r, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 14,
                      padding: "14px 0",
                      borderBottom: i < RESPONSIBILITIES.length - 1 ? "1px solid #f1f5f9" : "none",
                    }}
                  >
                    <div
                      style={{
                        width: 34,
                        height: 34,
                        borderRadius: 10,
                        background: "#f8fafc",
                        border: "1px solid #e2e8f0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        marginTop: 1,
                      }}
                    >
                      <ResponsibilityIcon type={r.icon} />
                    </div>
                    <span style={{ fontSize: 15, color: "#334155", lineHeight: 1.65, paddingTop: 6 }}>{r.text}</span>
                  </div>
                ))}
              </div>
            </Section>

            {/* ── Qualifications ──────────────────── */}
            <Section title="Qualifications">
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {QUALIFICATIONS.map((q, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                    <div
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: 6,
                        background: "#0f766e",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        marginTop: 2,
                      }}
                    >
                      <svg width="12" height="12" fill="none" viewBox="0 0 24 24">
                        <path d="M20 6L9 17l-5-5" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span style={{ fontSize: 15, color: "#334155", lineHeight: 1.6 }}>{q}</span>
                  </div>
                ))}
              </div>
            </Section>

            {/* ── Ideal Candidate ─────────────────── */}
            <Section title="Ideal Candidate">
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14 }}>
                {IDEAL_TRAITS.map((t) => (
                  <div
                    key={t.title}
                    style={{
                      background: "#f8fafc",
                      border: "1px solid #e2e8f0",
                      borderRadius: 14,
                      padding: "20px",
                      transition: "border-color .2s, box-shadow .2s",
                    }}
                  >
                    <div style={{ color: "#4338ca", marginBottom: 12 }}>
                      <TraitIcon type={t.icon} />
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: "#0f172a", marginBottom: 4, letterSpacing: "-.1px" }}>
                      {t.title}
                    </div>
                    <div style={{ fontSize: 14, color: "#64748b", lineHeight: 1.55 }}>{t.desc}</div>
                  </div>
                ))}
              </div>
            </Section>

            {/* ── Selection Process ───────────────── */}
            <Section title="Selection Process">
              <div style={{ position: "relative", paddingLeft: 28 }}>
                {/* Vertical line */}
                <div
                  style={{
                    position: "absolute",
                    left: 13,
                    top: 22,
                    bottom: 22,
                    width: 2,
                    background: "linear-gradient(to bottom,#0f766e,#4338ca,#1d3a8f)",
                    borderRadius: 1,
                  }}
                />
                <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
                  {PROCESS_STEPS.map((s) => (
                    <div key={s.n} style={{ display: "flex", alignItems: "flex-start", gap: 20, position: "relative" }}>
                      <div
                        style={{
                          position: "absolute",
                          left: -28,
                          width: 28,
                          height: 28,
                          borderRadius: "50%",
                          background: s.color,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 11,
                          fontWeight: 800,
                          color: "#fff",
                          boxShadow: `0 0 0 4px #fff, 0 0 0 5px ${s.color}33`,
                          zIndex: 1,
                        }}
                      >
                        {s.n}
                      </div>
                      <div style={{ paddingTop: 2, marginLeft: 8 }}>
                        <div style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", letterSpacing: "-.1px" }}>{s.title}</div>
                        <div style={{ fontSize: 14, color: "#64748b", marginTop: 3, lineHeight: 1.55 }}>{s.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notice */}
              <div
                style={{
                  marginTop: 28,
                  background: "#fffbeb",
                  border: "1px solid #fde68a",
                  borderRadius: 12,
                  padding: "16px 20px",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#92400e",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                  lineHeight: 1.5,
                }}
              >
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" style={{ flexShrink: 0, marginTop: 1 }}>
                  <path d="M12 9v4m0 4h.01M12 3l9.66 16.5a1 1 0 0 1-.87 1.5H3.21a1 1 0 0 1-.87-1.5L12 3z" stroke="#b45309" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Only candidates who complete the quiz will move forward in the selection process.
              </div>
            </Section>
          </div>

          {/* Right column: Sticky summary on desktop */}
          <aside
            style={{
              flex: "0 0 300px",
              position: "sticky",
              top: 88,
              alignSelf: "flex-start",
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <style dangerouslySetInnerHTML={{ __html: `@media(max-width:960px){.ip-aside{display:none !important}}` }} />
            <div
              className="ip-aside"
              style={{
                background: "#fff",
                borderRadius: 18,
                border: "1px solid rgba(0,0,0,.06)",
                boxShadow: "0 2px 12px rgba(0,0,0,.04)",
                padding: "28px 24px",
                display: "flex",
                flexDirection: "column",
                gap: 20,
              }}
            >
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", letterSpacing: ".6px", marginBottom: 6 }}>Role</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: "#0f172a", letterSpacing: "-.2px", lineHeight: 1.3 }}>
                  IP &amp; Technology Transfer Associate
                </div>
              </div>
              <div style={{ height: 1, background: "#f1f5f9" }} />
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  { label: "Location", value: "Top Institute of India" },
                  { label: "Type", value: "Contractual" },
                  { label: "Compensation", value: "\u20B980K \u2013 \u20B91L /mo" },
                  { label: "Mentorship", value: "Senior Faculty" },
                ].map((item) => (
                  <div key={item.label}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", letterSpacing: ".5px" }}>{item.label}</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#334155", marginTop: 2 }}>{item.value}</div>
                  </div>
                ))}
              </div>
              <a
                href="#apply"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  background: "#0f172a",
                  color: "#fff",
                  fontSize: 15,
                  fontWeight: 700,
                  padding: "14px 24px",
                  borderRadius: 12,
                  textDecoration: "none",
                  letterSpacing: "-.2px",
                  transition: "opacity .2s",
                  marginTop: 4,
                }}
              >
                Apply Now
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </aside>
        </div>

        {/* ── Apply Section ────────────────────────── */}
        <div
          id="apply"
          style={{
            background: "#fff",
            borderRadius: 24,
            border: "1px solid rgba(0,0,0,.06)",
            boxShadow: "0 4px 24px rgba(0,0,0,.05)",
            padding: "clamp(28px,5vw,48px) clamp(20px,4vw,44px)",
            marginTop: 48,
            maxWidth: 720,
          }}
        >
          <PatentApplyForm />
        </div>
      </main>

      {/* ── Footer ─────────────────────────────────── */}
      <footer
        style={{
          borderTop: "1px solid rgba(0,0,0,.06)",
          padding: "32px clamp(16px,4vw,32px)",
          background: "#fff",
        }}
      >
        <div style={{ maxWidth: 1080, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontSize: 13, color: "#94a3b8", margin: 0 }}>&copy; {new Date().getFullYear()} Jobingen. All rights reserved.</p>
          <Link href="/jobs" style={{ fontSize: 13, color: "#94a3b8", textDecoration: "none" }}>View all openings &rarr;</Link>
        </div>
      </footer>
    </div>
  )
}

/* ─── Section Component ────────────────────────────── */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 36 }}>
      <h2
        style={{
          fontSize: 22,
          fontWeight: 800,
          color: "#0f172a",
          margin: "0 0 20px",
          letterSpacing: "-.4px",
          lineHeight: 1.2,
        }}
      >
        {title}
      </h2>
      {children}
    </section>
  )
}
