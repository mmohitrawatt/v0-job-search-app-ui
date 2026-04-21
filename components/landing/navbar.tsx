"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { JobingenLogo } from "@/components/jobingen-logo"
import { useWaitlist } from "@/components/waitlist-modal"

const NAV_LINKS = [
  { label: "Jobs", href: "/jobs" },
  { label: "AI Tools", href: "/ai-tools" },
  { label: "Bootcamps", href: "/bootcamps" },

  { label: "Mentors", href: "/mentors" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [stripVisible, setStripVisible] = useState(true)
  const { open: openWaitlist } = useWaitlist()

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10)
      if (window.scrollY > 80) setStripVisible(false)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      {/* ── Announcement Strip ── */}
      <AnimatePresence>
        {stripVisible && (
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.25, ease: "easeIn" }}
            className="fixed top-0 left-0 right-0 z-[60] flex items-center justify-center gap-2 sm:gap-3 px-8 py-2"
            style={{ background: "linear-gradient(135deg, #0a1533 0%, #1d3a8f 100%)", minHeight: 40 }}
          >
            {/* NEW pill */}
            <span
              className="shrink-0 text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded"
              style={{ background: "rgba(255,255,255,0.18)", color: "white" }}
            >
              Live
            </span>

            {/* Text — truncated on mobile, full on desktop */}
            <Link href="/recursion-bootcamp" className="text-white/85 leading-tight font-medium truncate hover:text-white transition-colors" style={{ fontSize: 12 }}>
              <span className="sm:hidden">Recursion Bootcamp · Register Now @ ₹29 🚀</span>
              <span className="hidden sm:inline">🚀 New Bootcamp: Recursion Deep Dive — From Call Stack to Backtracking Mastery · Only ₹29 · Register Now</span>
            </Link>

            {/* Dismiss */}
            <button
              onClick={() => setStripVisible(false)}
              className="absolute right-2.5 sm:right-5 flex items-center justify-center w-5 h-5 rounded-full transition-all hover:bg-white/20"
              style={{ color: "rgba(255,255,255,0.5)" }}
              aria-label="Dismiss"
            >
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <header
        className={`fixed left-0 right-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-xl border-b ${
          scrolled
            ? "border-slate-200/80 shadow-[0_1px_8px_rgba(0,0,0,0.06)]"
            : "border-slate-100"
        }`}
        style={{ top: stripVisible ? 40 : 0 }}
      >
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10 h-[68px] flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <JobingenLogo height={56} className="sm:!h-[80px]" />
          </Link>

          {/* Center nav — desktop */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-2 text-[14px] font-medium text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100/60 transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right — desktop */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/campus-ambassador"
              className="text-[13px] font-semibold text-[#1d3a8f] px-4 py-2 rounded-[10px] border border-[#1d3a8f]/20 hover:bg-indigo-50 transition-all duration-200"
            >
              Campus Ambassador
            </Link>
            <button
              onClick={openWaitlist}
              className="text-[13px] font-semibold text-white px-5 py-2.5 rounded-[10px] transition-all duration-200 hover:opacity-90 shadow-[0_2px_8px_rgba(29,58,143,0.3)] border-0 cursor-pointer"
              style={{ background: "linear-gradient(135deg, #1d3a8f 0%, #3b5bdb 100%)" }}
            >
              Get Started
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden flex flex-col gap-[5px] p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-[2px] bg-slate-700 transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
            <span className={`block w-5 h-[2px] bg-slate-700 transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-[2px] bg-slate-700 transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 z-40 bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-lg lg:hidden" style={{ top: stripVisible ? 108 : 68 }}
          >
            <nav className="flex flex-col p-4 gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 text-[15px] font-medium text-slate-700 hover:bg-slate-50 rounded-xl transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="border-t border-slate-100 mt-2 pt-3 flex flex-col gap-2">
                <Link href="/campus-ambassador" onClick={() => setMobileOpen(false)} className="px-4 py-3 text-[15px] font-medium text-[#1d3a8f] text-center rounded-xl border border-[#1d3a8f]/20 hover:bg-indigo-50">
                  Campus Ambassador
                </Link>
                <button
                  onClick={() => { openWaitlist(); setMobileOpen(false) }}
                  className="text-[14px] font-semibold text-white text-center py-3 rounded-xl border-0 cursor-pointer w-full"
                  style={{ background: "linear-gradient(135deg, #1d3a8f 0%, #3b5bdb 100%)" }}
                >
                  Get Started
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
