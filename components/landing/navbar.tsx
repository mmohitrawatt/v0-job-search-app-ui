"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { JobingenLogo } from "@/components/jobingen-logo"
import { useWaitlist } from "@/components/waitlist-modal"

const NAV_LINKS = [
  { label: "Jobs", href: "/jobs" },
  { label: "AI Tools", href: "/ai-tools" },
  { label: "Bootcamps", href: "/bootcamps" },
  { label: "Mentors", href: "/mentors" },
  { label: "Creator", href: "/creator-community" },
  { label: "Summer Training", href: "/early-apply", badge: "New" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activePath, setActivePath] = useState("")
  const { open: openWaitlist } = useWaitlist()
  const pathname = usePathname()

  useEffect(() => {
    setActivePath(pathname)
  }, [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/[0.97] backdrop-blur-2xl border-b border-slate-200/60 shadow-[0_2px_24px_rgba(0,0,0,0.07)]"
            : "bg-white/80 backdrop-blur-xl border-b border-slate-100/60"
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 h-[72px] flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <JobingenLogo height={52} className="sm:!h-[68px] lg:!h-[76px]" />
          </Link>

          {/* Center nav — desktop */}
          <nav className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
            {NAV_LINKS.map((link) => {
              const isActive = activePath === link.href || activePath.startsWith(link.href + "/")
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`group relative px-4 py-2 text-[15px] transition-colors duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? "font-bold text-slate-900"
                      : "font-semibold text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {link.label}
                  {link.badge && (
                    <span
                      className="text-[9.5px] font-bold px-1.5 py-[2px] rounded-full text-white leading-none tracking-wide"
                      style={{ background: "linear-gradient(135deg, #1d3a8f, #4668f5)" }}
                    >
                      {link.badge}
                    </span>
                  )}
                  <span className={`absolute bottom-0 left-4 right-4 h-[1.5px] bg-slate-800 transition-transform duration-200 origin-left rounded-full ${
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`} />
                </a>
              )
            })}
          </nav>

          {/* Right — desktop */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            <Link
              href="/campus-ambassador"
              className="text-[14px] font-semibold text-slate-500 px-4 py-2 rounded-[10px] hover:text-slate-900 hover:bg-slate-50 transition-all duration-200"
            >
              Campus Ambassador
            </Link>
            <button
              onClick={openWaitlist}
              className="text-[14px] font-semibold text-white px-5 py-[10px] rounded-[10px] transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] border-0 cursor-pointer"
              style={{
                background: "linear-gradient(135deg, #1a3585 0%, #2d4fd4 55%, #4668f5 100%)",
                boxShadow: "0 2px 12px rgba(29,58,143,0.28), inset 0 1px 0 rgba(255,255,255,0.12)",
              }}
            >
              Get Started
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-5 flex flex-col gap-[5px]">
              <span className={`block h-[1.5px] bg-slate-700 transition-all duration-300 origin-center ${mobileOpen ? "rotate-45 translate-y-[6.5px]" : ""}`} />
              <span className={`block h-[1.5px] bg-slate-700 transition-all duration-200 ${mobileOpen ? "opacity-0 scale-x-0" : ""}`} />
              <span className={`block h-[1.5px] bg-slate-700 transition-all duration-300 origin-center ${mobileOpen ? "-rotate-45 -translate-y-[6.5px]" : ""}`} />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile menu — floating card */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 z-40 lg:hidden px-3"
            style={{ top: 76 }}
          >
            <div className="rounded-2xl bg-white border border-slate-200/80 shadow-[0_8px_40px_rgba(0,0,0,0.13)] overflow-hidden">
              <nav className="flex flex-col p-2">
                {NAV_LINKS.map((link) => {
                  const isActive = activePath === link.href || activePath.startsWith(link.href + "/")
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center justify-between px-4 py-3 text-[15px] rounded-xl transition-colors ${
                        isActive
                          ? "font-bold text-slate-900 bg-slate-50"
                          : "font-medium text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      {link.label}
                      {link.badge && (
                        <span
                          className="text-[9.5px] font-bold px-2 py-[3px] rounded-full text-white tracking-wide"
                          style={{ background: "linear-gradient(135deg, #1d3a8f, #4668f5)" }}
                        >
                          {link.badge}
                        </span>
                      )}
                    </a>
                  )
                })}

                <div className="mx-2 my-2 h-px bg-slate-100" />

                <Link
                  href="/campus-ambassador"
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 text-[15px] font-medium text-[#1d3a8f] hover:bg-indigo-50 rounded-xl transition-colors"
                >
                  Campus Ambassador
                </Link>

                <div className="p-2 pt-1">
                  <button
                    onClick={() => { openWaitlist(); setMobileOpen(false) }}
                    className="text-[14px] font-semibold text-white text-center py-3 rounded-xl border-0 cursor-pointer w-full"
                    style={{
                      background: "linear-gradient(135deg, #1a3585 0%, #2d4fd4 55%, #4668f5 100%)",
                      boxShadow: "0 2px 12px rgba(29,58,143,0.28)",
                    }}
                  >
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
