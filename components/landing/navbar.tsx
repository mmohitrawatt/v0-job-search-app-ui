"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { JobingenLogo } from "@/components/jobingen-logo"
import { useWaitlist } from "@/components/waitlist-modal"

const NAV_BEFORE = [
  { label: "Jobs",     href: "/jobs" },
  { label: "Mentors",  href: "/mentors" },
]

const COMMUNITY = [
  { label: "Creator",           href: "/creator-community",          desc: "Creator community" },
  { label: "Club",              href: "/jobingen-club",              desc: "Jobingen Club" },
  { label: "Campus Ambassador", href: "/campus-ambassador-program",  desc: "Represent your campus" },
]

const NAV_AFTER: { label: string; href: string }[] = []

const ALL_LINKS = [...NAV_BEFORE, ...COMMUNITY, ...NAV_AFTER]

/* flush full-width bar height — exported so hero can offset below it */
export const HEADER_H = 80

export function Navbar() {
  const [mobileOpen, setMobileOpen]     = useState(false)
  const [communityOpen, setCommunityOpen] = useState(false)
  const [activePath, setActivePath]     = useState("")
  const { open: openWaitlist }          = useWaitlist()
  const pathname                        = usePathname()

  useEffect(() => { setActivePath(pathname) }, [pathname])

  const linkStyle = (isActive: boolean) => ({
    padding: "8px 12px",
    fontSize: 14.5, fontWeight: isActive ? 700 : 600,
    color: isActive ? "#0c1a35" : "#334155",
    textDecoration: "none", borderRadius: 10,
    whiteSpace: "nowrap" as const, transition: "color .15s",
  })

  const communityActive = COMMUNITY.some(l => activePath === l.href || activePath.startsWith(l.href + "/"))

  return (
    <>
      <style>{`
        /* nav link — sliding gradient underline + subtle lift */
        .nav-link { position: relative; transition: color .18s ease, transform .18s cubic-bezier(.22,1,.36,1); }
        .nav-link::after {
          content: ""; position: absolute; left: 12px; right: 12px; bottom: 5px; height: 2px;
          background: #1d3a8f; border-radius: 2px;
          transform: scaleX(0); transform-origin: center;
          transition: transform .24s cubic-bezier(.22,1,.36,1);
        }
        .nav-link:hover { color: #1d3a8f !important; transform: translateY(-1px); }
        .nav-link:hover::after { transform: scaleX(1); }

        /* CTA buttons — lift + shadow */
        .nav-btn { transition: transform .2s cubic-bezier(.22,1,.36,1), box-shadow .2s ease, border-color .15s ease; }
        .nav-btn:hover { transform: translateY(-2px); }
        .nav-btn:active { transform: translateY(0); }
        .nav-cta-outline:hover { border-color: #c7d2fe !important; box-shadow: 0 6px 16px rgba(29,58,143,0.14); }
        .nav-cta-primary:hover { box-shadow: 0 10px 28px rgba(29,58,143,0.45) !important; }

        /* primary CTA — shine sweep */
        .nav-cta-primary { position: relative; overflow: hidden; }
        .nav-cta-primary::before {
          content: ""; position: absolute; top: 0; left: -130%; width: 55%; height: 100%;
          background: linear-gradient(120deg, transparent, rgba(255,255,255,.4), transparent);
          transform: skewX(-20deg); transition: left .55s ease;
        }
        .nav-cta-primary:hover::before { left: 150%; }
      `}</style>
      {/* ── Flush full-width Navbar (Homerun style) ── */}
      <header
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          background: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(16px)",
        }}
      >
        <div
          className="h-[64px] lg:h-[80px] px-4 sm:px-6 lg:px-10"
          style={{ maxWidth: 1360, margin: "0 auto", display: "flex", alignItems: "center", gap: 18 }}
        >

          {/* Logo */}
          <a href="/" style={{ display: "flex", alignItems: "center", flexShrink: 0, textDecoration: "none" }}>
            <JobingenLogo className="h-[68px] lg:h-[104px] w-auto" style={{ height: undefined }} />
          </a>

          {/* Nav links — desktop (centered) */}
          <nav className="hidden lg:flex" style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 2, background: "#ffffff", border: "1px solid #e8ebf1", borderRadius: 999, padding: "5px 9px", boxShadow: "0 2px 12px rgba(15,23,42,0.05)" }}>
            {NAV_BEFORE.map(link => {
              const isActive = activePath === link.href || activePath.startsWith(link.href + "/")
              return (
                <a key={link.label} href={link.href} className="nav-link" style={linkStyle(isActive)}>{link.label}</a>
              )
            })}

            {/* Community dropdown */}
            <div
              style={{ position: "relative" }}
              onMouseEnter={() => setCommunityOpen(true)}
              onMouseLeave={() => setCommunityOpen(false)}
            >
              <button className="nav-link" style={{
                ...linkStyle(communityActive),
                display: "flex", alignItems: "center", gap: 5,
                background: communityOpen ? "#f5f7fb" : "transparent",
                border: "none", cursor: "pointer",
              }}>
                Community
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                  style={{ transform: communityOpen ? "rotate(180deg)" : "none", transition: "transform .2s", opacity: .6 }}>
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>

              <AnimatePresence>
                {communityOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      position: "absolute", top: "calc(100% + 8px)", left: 0, width: 268,
                      background: "white", borderRadius: 16, border: "1px solid #eef0f4",
                      boxShadow: "0 12px 40px rgba(15,23,42,0.12)", padding: 8, zIndex: 60,
                    }}
                  >
                    {COMMUNITY.map(link => {
                      const isActive = activePath === link.href || activePath.startsWith(link.href + "/")
                      return (
                        <a key={link.label} href={link.href} style={{
                          display: "block", padding: "10px 12px", borderRadius: 11,
                          textDecoration: "none", background: isActive ? "#f5f7fb" : "transparent",
                          transition: "background .15s",
                        }}
                          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#f5f7fb" }}
                          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = isActive ? "#f5f7fb" : "transparent" }}
                        >
                          <div style={{ fontSize: 14.5, fontWeight: 700, color: "#0c1a35" }}>{link.label}</div>
                          <div style={{ fontSize: 12.5, color: "#64748b", marginTop: 1 }}>{link.desc}</div>
                        </a>
                      )
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {NAV_AFTER.map(link => {
              const isActive = activePath === link.href || activePath.startsWith(link.href + "/")
              return (
                <a key={link.label} href={link.href} className="nav-link" style={linkStyle(isActive)}>{link.label}</a>
              )
            })}
            </div>
          </nav>

          {/* Right CTAs — desktop */}
          <div className="hidden lg:flex" style={{ alignItems: "center", gap: 10, flexShrink: 0 }}>
            <button onClick={openWaitlist} className="nav-btn nav-cta-outline" style={{
              fontSize: 14.5, fontWeight: 600, color: "#0c1a35",
              padding: "10px 22px", borderRadius: 11, cursor: "pointer",
              border: "1.5px solid #e4e9f2", background: "white",
            }}>Log in</button>
            <button onClick={openWaitlist} className="nav-btn nav-cta-primary" style={{
              fontSize: 14.5, fontWeight: 700, color: "white",
              padding: "10px 24px", borderRadius: 11, border: "none", cursor: "pointer",
              background: "#1d3a8f",
              boxShadow: "0 4px 16px rgba(29,58,143,0.28)",
            }}>Get Started</button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 6, marginLeft: "auto" }}
          >
            <div style={{ width: 22, display: "flex", flexDirection: "column", gap: 5 }}>
              {[
                mobileOpen ? "rotate(45deg) translateY(7px)" : "none",
                undefined,
                mobileOpen ? "rotate(-45deg) translateY(-7px)" : "none",
              ].map((transform, i) => (
                <span key={i} style={{
                  display: "block", height: 2, background: "#334155",
                  borderRadius: 2, transition: "all .28s",
                  transform: transform || "none",
                  opacity: i === 1 && mobileOpen ? 0 : 1,
                }} />
              ))}
            </div>
          </button>

        </div>
      </header>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: "fixed", left: 10, right: 10, zIndex: 40, top: 70 }}
          >
            <div style={{
              background: "white", borderRadius: 18,
              border: "1px solid #eef0f4",
              boxShadow: "0 8px 40px rgba(0,0,0,0.13)", overflow: "hidden",
            }}>
              <nav style={{ display: "flex", flexDirection: "column", padding: 8 }}>
                {ALL_LINKS.map(link => {
                  const isActive = activePath === link.href
                  return (
                    <a key={link.label} href={link.href} onClick={() => setMobileOpen(false)} style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "12px 16px", fontSize: 15, borderRadius: 12,
                      fontWeight: isActive ? 700 : 500,
                      color: isActive ? "#0c1a35" : "#475569",
                      background: isActive ? "#f5f7fb" : "transparent",
                      textDecoration: "none",
                    }}>
                      {link.label}
                    </a>
                  )
                })}
                <div style={{ height: 1, background: "#eef0f4", margin: "4px 8px" }} />
                <div style={{ padding: 8, display: "flex", gap: 8 }}>
                  <button onClick={() => { openWaitlist(); setMobileOpen(false) }} style={{ flex: 1, fontSize: 14, fontWeight: 600, color: "#0c1a35", textAlign: "center", padding: "12px", borderRadius: 999, border: "1.5px solid #e4e9f2", background: "white", cursor: "pointer" }}>
                    Log in
                  </button>
                  <button onClick={() => { openWaitlist(); setMobileOpen(false) }} style={{ flex: 1, fontSize: 14, fontWeight: 700, color: "white", padding: "12px", borderRadius: 999, border: "none", cursor: "pointer", background: "#1d3a8f", boxShadow: "0 2px 12px rgba(29,58,143,0.28)" }}>
                    Get Started
                  </button>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
