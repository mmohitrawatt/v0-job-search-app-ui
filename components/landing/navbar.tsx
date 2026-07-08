"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { JobingenLogo } from "@/components/jobingen-logo"
import { useWaitlist } from "@/components/waitlist-modal"

const NAV_LINKS = [
  { label: "Jobs",            href: "/jobs" },
  { label: "AI Tools",       href: "/ai-tools" },
  { label: "Bootcamps",      href: "/bootcamps" },
  { label: "Mentors",        href: "/mentors" },
  { label: "Creator",        href: "/creator-community" },
  { label: "Club",            href: "/jobingen-club" },
  { label: "Campus Ambassador", href: "/campus-ambassador-program" },
  { label: "Careers",        href: "/careers" },
  { label: "Hire Talent",    href: "/hire-talent" },
]

const NAV_H = 96   // navbar height

/* exported so hero can calculate its top offset */
export const HEADER_H = 10 + NAV_H   // 106px

export function Navbar() {
  const [mobileOpen, setMobileOpen]   = useState(false)
  const [activePath, setActivePath]   = useState("")
  const { open: openWaitlist }        = useWaitlist()
  const pathname                      = usePathname()

  useEffect(() => { setActivePath(pathname) }, [pathname])

  return (
    <>
      {/* ── Floating Navbar ── */}
      <motion.header
        animate={{ top: 10 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="px-3 sm:px-5 lg:px-8"
        style={{ position: "fixed", left: 0, right: 0, zIndex: 50 }}
      >
        <div className="h-[64px] lg:h-[96px]" style={{
          maxWidth: 1320, margin: "0 auto",
          background: "rgba(255,255,255,0.97)",
          backdropFilter: "blur(20px)",
          borderRadius: 22,
          border: "1px solid rgba(0,0,0,0.07)",
          boxShadow: "0 4px 6px rgba(0,0,0,0.02), 0 12px 32px rgba(0,0,0,0.08)",
          display: "flex", alignItems: "center",
          padding: "0 20px", gap: 12,
        }}>

          {/* Logo */}
          <a href="/" style={{ display: "flex", alignItems: "center", flexShrink: 0, textDecoration: "none" }}>
            <JobingenLogo className="h-[54px] lg:h-[88px] w-auto" style={{ height: undefined }} />
          </a>

          {/* Center nav — desktop */}
          <nav className="hidden lg:flex" style={{ flex: 1, justifyContent: "center", gap: 2, alignItems: "center" }}>
            {NAV_LINKS.map(link => {
              const isActive = activePath === link.href || activePath.startsWith(link.href + "/")
              return (
                <a key={link.label} href={link.href} style={{
                  position: "relative", padding: "7px 11px",
                  fontSize: 13.5, fontWeight: isActive ? 700 : 600,
                  color: isActive ? "#0f172a" : "#1e293b",
                  textDecoration: "none", borderRadius: 10,
                  display: "flex", alignItems: "center", gap: 5,
                  background: isActive ? "#f1f5f9" : "transparent",
                  transition: "all .15s",
                }}>
                  {link.label}
                  {link.badge && (
                    <span style={{
                      fontSize: 9, fontWeight: 800, color: "white", letterSpacing: ".05em",
                      background: "linear-gradient(135deg,#1d3a8f,#4668f5)",
                      padding: "2px 6px", borderRadius: 99,
                    }}>{link.badge}</span>
                  )}
                </a>
              )
            })}
          </nav>

          {/* Right CTAs — desktop */}
          <div className="hidden lg:flex" style={{ alignItems: "center", gap: 8, flexShrink: 0 }}>
            <button onClick={openWaitlist} style={{
              fontSize: 13.5, fontWeight: 600, color: "#475569",
              padding: "9px 22px", borderRadius: 10, cursor: "pointer",
              border: "1.5px solid #e2e8f0", background: "#f8fafc",
              transition: "all .15s",
            }}>Login</button>
            <button onClick={openWaitlist} style={{
              fontSize: 13.5, fontWeight: 700, color: "white",
              padding: "9px 20px", borderRadius: 10, border: "none", cursor: "pointer",
              background: "linear-gradient(135deg,#1a3585,#2d4fd4 55%,#4668f5)",
              boxShadow: "0 2px 12px rgba(29,58,143,0.28)",
              transition: "all .15s",
            }}>Get Started</button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden ml-auto"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 6 }}
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
      </motion.header>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: "fixed", left: 10, right: 10, zIndex: 40, top: 80 }}
          >
            <div style={{
              background: "white", borderRadius: 18,
              border: "1px solid rgba(0,0,0,0.08)",
              boxShadow: "0 8px 40px rgba(0,0,0,0.13)", overflow: "hidden",
            }}>
              <nav style={{ display: "flex", flexDirection: "column", padding: 8 }}>
                {NAV_LINKS.map(link => {
                  const isActive = activePath === link.href
                  return (
                    <a key={link.label} href={link.href} onClick={() => setMobileOpen(false)} style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "12px 16px", fontSize: 15, borderRadius: 12,
                      fontWeight: isActive ? 700 : 500,
                      color: isActive ? "#0f172a" : "#475569",
                      background: isActive ? "#f8fafc" : "transparent",
                      textDecoration: "none",
                    }}>
                      {link.label}
                      {link.badge && (
                        <span style={{ fontSize: 9, fontWeight: 800, color: "white", background: "linear-gradient(135deg,#1d3a8f,#4668f5)", padding: "2px 7px", borderRadius: 99 }}>
                          {link.badge}
                        </span>
                      )}
                    </a>
                  )
                })}
                <div style={{ height: 1, background: "#f1f5f9", margin: "4px 8px" }} />
                <div style={{ padding: 8, display: "flex", gap: 8 }}>
                  <button onClick={() => { openWaitlist(); setMobileOpen(false) }} style={{ flex: 1, fontSize: 14, fontWeight: 600, color: "#475569", textAlign: "center", padding: "11px", borderRadius: 12, border: "1.5px solid #e2e8f0", background: "#f8fafc", cursor: "pointer" }}>
                    Login
                  </button>
                  <button onClick={() => { openWaitlist(); setMobileOpen(false) }} style={{ flex: 1, fontSize: 14, fontWeight: 700, color: "white", padding: "11px", borderRadius: 12, border: "none", cursor: "pointer", background: "linear-gradient(135deg,#1a3585,#2d4fd4,#4668f5)", boxShadow: "0 2px 12px rgba(29,58,143,0.28)" }}>
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
