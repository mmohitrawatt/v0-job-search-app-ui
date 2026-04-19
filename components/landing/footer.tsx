"use client"

import Link from "next/link"
import { JobingenLogo } from "@/components/jobingen-logo"

const FOOTER_LINKS = [
  {
    title: "Product",
    links: [
      { label: "Browse Jobs",       href: "/jobs" },
      { label: "AI Tools",          href: "/ai-tools" },
      { label: "Bootcamps",         href: "/#bootcamps" },
      { label: "Mentors",           href: "/mentors" },
      { label: "Become a Mentor",   href: "/become-mentor" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Student Insights",       href: "/student-insights" },
      { label: "Interview Experience",   href: "/interview-feedback" },
      { label: "Reviews",                href: "/reviews" },
      { label: "Campus Ambassador",      href: "/campus-ambassador" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About",     href: "/" },
      { label: "Blog",      href: "/" },
      { label: "Careers",   href: "/" },
      { label: "Contact",   href: "mailto:hello@jobingen.com" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy",   href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Cookie Policy",    href: "#" },
    ],
  },
]

const SOCIALS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/jobingen",
    useFill: false,
    icon: <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/jobingen.ai/",
    useFill: false,
    icon: <><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1.5" /></>,
  },
  {
    label: "Discord",
    href: "https://discord.com/invite/aVWx54Cp3V",
    useFill: true,
    icon: <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />,
  },
]

export function Footer() {
  return (
    <footer
      style={{
        background: "#ffffff",
        borderTop: "1px solid #f0f0f0",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', sans-serif",
      }}
    >
      {/* Main grid */}
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "64px 28px 0" }}>
        <div
          className="footer-main-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.8fr 1fr 1fr 1fr 1fr",
            gap: "48px",
            paddingBottom: 56,
            borderBottom: "1px solid #f0f0f0",
          }}
        >
          {/* Brand column */}
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            <div style={{ marginBottom: 16 }}>
              <JobingenLogo height={64} />
            </div>
            <p
              style={{
                fontSize: 13.5,
                color: "#8c8c8c",
                lineHeight: 1.75,
                maxWidth: 230,
                margin: "0 0 24px",
                fontWeight: 400,
                letterSpacing: "-0.01em",
              }}
            >
              India&apos;s AI-powered job search engine — built to help every professional find and land their dream job.
            </p>

            {/* Socials */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 10,
                    background: "#f5f5f7",
                    border: "1px solid #e8e8ed",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#6e6e73",
                    textDecoration: "none",
                    transition: "all 0.2s ease",
                    flexShrink: 0,
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = "#e8e8ed"
                    e.currentTarget.style.color = "#1d1d1f"
                    e.currentTarget.style.transform = "translateY(-1px)"
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "#f5f5f7"
                    e.currentTarget.style.color = "#6e6e73"
                    e.currentTarget.style.transform = ""
                  }}
                >
                  <svg
                    width="15"
                    height="15"
                    fill={s.useFill ? "currentColor" : "none"}
                    viewBox="0 0 24 24"
                    stroke={s.useFill ? "none" : "currentColor"}
                    strokeWidth={1.8}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {s.icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_LINKS.map((col) => (
            <div key={col.title}>
              <h4
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.09em",
                  color: "#b0b0b8",
                  marginBottom: 18,
                }}
              >
                {col.title}
              </h4>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      style={{
                        fontSize: 14,
                        fontWeight: 400,
                        color: "#5a5a5e",
                        textDecoration: "none",
                        letterSpacing: "-0.01em",
                        transition: "color 0.15s ease",
                      }}
                      onMouseEnter={e => (e.currentTarget.style.color = "#1d1d1f")}
                      onMouseLeave={e => (e.currentTarget.style.color = "#5a5a5e")}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="footer-bottom-bar"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px 0 24px",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <p style={{ fontSize: 12.5, color: "#ababab", letterSpacing: "-0.01em", margin: 0 }}>
            &copy; {new Date().getFullYear()} Jobingen Technologies. All rights reserved.
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <span
              style={{
                fontSize: 12,
                color: "#c0c0c8",
                letterSpacing: "-0.01em",
              }}
            >
              Crafted with care in India 🇮🇳
            </span>

            {/* Status pill */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                padding: "4px 10px",
                borderRadius: 99,
                background: "#f0fdf4",
                border: "1px solid rgba(16,185,129,0.15)",
              }}
            >
              <div
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: "#10b981",
                }}
              />
              <span style={{ fontSize: 11, fontWeight: 600, color: "#059669", letterSpacing: "0.01em" }}>
                All systems operational
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 1024px) {
          .footer-main-grid {
            grid-template-columns: 1fr 1fr 1fr !important;
            gap: 36px !important;
          }
        }
        @media (max-width: 640px) {
          .footer-main-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 28px !important;
          }
          .footer-bottom-bar {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 12px !important;
          }
        }
      `}</style>
    </footer>
  )
}
