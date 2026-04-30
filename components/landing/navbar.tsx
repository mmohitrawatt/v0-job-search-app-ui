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
  { label: "Creator", href: "/creator-community" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { open: openWaitlist } = useWaitlist()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-xl border-b ${
          scrolled
            ? "border-slate-200/80 shadow-[0_1px_8px_rgba(0,0,0,0.06)]"
            : "border-slate-100"
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10 h-[68px] flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <JobingenLogo height={52} className="sm:!h-[68px] lg:!h-[76px]" />
          </Link>

          {/* Center nav — desktop */}
          <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
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
          <div className="hidden lg:flex items-center gap-3 shrink-0">
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
            className="fixed inset-x-0 z-40 bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-lg lg:hidden" style={{ top: 68 }}
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
