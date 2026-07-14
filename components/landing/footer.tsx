"use client"

import Link from "next/link"

const NAVY = "#1d3a8f"

/* categorised link columns */
const COLS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Jobs",           href: "/jobs" },
      { label: "AI Tools",       href: "/ai-tools" },
      { label: "Bootcamps",      href: "/bootcamps" },
      { label: "Hire Talent",    href: "/hire-talent" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Mentors",            href: "/mentors" },
      { label: "Become a Mentor",    href: "/become-mentor" },
      { label: "Campus Ambassador",  href: "/campus-ambassador-program" },
      { label: "Jobingen Club",      href: "/jobingen-club" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us",  href: "/about" },
      { label: "Careers",   href: "/careers" },
      { label: "Contact",   href: "mailto:hello@jobingen.com" },
      { label: "Privacy",   href: "#" },
    ],
  },
]

const SOCIALS = [
  { label: "LinkedIn",  href: "https://www.linkedin.com/company/jobingen", useFill: false,
    icon: <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" /> },
  { label: "Instagram", href: "https://www.instagram.com/jobingen.ai/", useFill: false,
    icon: <><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1.5" /></> },
  { label: "Discord",   href: "https://discord.com/invite/aVWx54Cp3V", useFill: true,
    icon: <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" /> },
]

export function Footer() {
  return (
    <footer style={{ background: "#ffffff", borderTop: "1px solid #eef1f6" }}>
      <style>{`
        .ft-link { font-size: 14px; font-weight: 500; color: #334155; text-decoration: none; transition: color .15s ease; position: relative; }
        .ft-link:hover { color: ${NAVY}; }
        .ft-legal:hover { color: #0c1a35 !important; }
        .ft-social { width: 36px; height: 36px; border-radius: 10px; background: #f5f7fb; border: 1px solid #e8ecf3;
          display: grid; place-items: center; color: #64748b; text-decoration: none; transition: all .2s ease; }
        .ft-social:hover { background: ${NAVY}; border-color: ${NAVY}; color: #fff; transform: translateY(-2px); box-shadow: 0 8px 18px rgba(29,58,143,.28); }
        .ft-grid { display: grid; grid-template-columns: 1.5fr 1fr 1fr 1fr; gap: 40px; }
        .ft-mark { height: 60px; width: auto; display: block; }
        @media (max-width: 860px) {
          .ft-grid { grid-template-columns: 1fr 1fr; gap: 36px 24px; }
          .ft-brand { grid-column: 1 / -1; }
        }
        @media (max-width: 520px) {
          .ft-grid { grid-template-columns: 1fr 1fr; }
          .ft-bottom { flex-direction: column; align-items: flex-start !important; gap: 14px !important; }
        }
      `}</style>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "64px 40px 0" }}>
        <div className="ft-grid">
          {/* brand column */}
          <div className="ft-brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/jobingen-svg-logo.svg" alt="jobingen" className="ft-mark" />
            <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.65, maxWidth: 300, marginTop: 18, fontWeight: 500 }}>
              The AI Career Operating System — discover roles, sharpen your profile, ace interviews, and get hired faster.
            </p>
            <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
              {SOCIALS.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="ft-social">
                  <svg width="15" height="15" fill={s.useFill ? "currentColor" : "none"} viewBox="0 0 24 24"
                    stroke={s.useFill ? "none" : "currentColor"} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                    {s.icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* link columns */}
          {COLS.map((col) => (
            <div key={col.title}>
              <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: ".08em", textTransform: "uppercase", color: "#0c1a35", marginBottom: 16 }}>
                {col.title}
              </div>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="ft-link">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* bottom bar */}
        <div style={{ borderTop: "1px solid #eef1f6", marginTop: 52 }}>
          <div className="ft-bottom" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "22px 0 30px", gap: 18, flexWrap: "wrap" }}>
            <span style={{ fontSize: 13, color: "#64748b", fontWeight: 500 }}>
              &copy; {new Date().getFullYear()} Jobingen Technologies · Made in India 🇮🇳
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
              {["Privacy", "Terms", "Cookies"].map((l) => (
                <Link key={l} href="#" className="ft-legal" style={{ fontSize: 13, color: "#64748b", textDecoration: "none", fontWeight: 500, transition: "color .15s" }}>
                  {l}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
