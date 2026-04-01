"use client"

import Link from "next/link"
import { FadeIn, motion } from "./motion"

export function CampusAmbassador() {
  return (
    <section className="py-12 sm:py-16 bg-[#fafbff]">
      <div className="max-w-[900px] mx-auto px-5 sm:px-8">
        <FadeIn>
          <motion.div
            className="relative overflow-hidden rounded-2xl border border-slate-200/60 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] transition-all duration-300"
            whileHover={{ y: -2 }}
          >
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-0">
              {/* Left — content */}
              <div className="flex-1 p-6 sm:p-8">
                <div className="flex items-center gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 bg-indigo-50 text-[#1d3a8f] text-[10px] font-bold px-3 py-1 rounded-full border border-indigo-200/50 uppercase tracking-wider">
                    <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    Open Program
                  </span>
                </div>

                <h3 className="text-[22px] sm:text-[24px] font-extrabold text-slate-900 tracking-[-0.03em] mb-2 leading-tight">
                  Become a Campus Ambassador
                </h3>
                <p className="text-[14px] text-slate-500 leading-[1.7] mb-5 max-w-[400px]">
                  Represent Jobingen at your college. Lead workshops, grow your network, and earn exclusive rewards &amp; certificates.
                </p>

                {/* Perks */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {[
                    { text: "Leadership Certificate", icon: "M9 12l2 2 4-4" },
                    { text: "Exclusive Merch", icon: "M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7" },
                    { text: "Network Access", icon: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" },
                  ].map((p) => (
                    <span key={p.text} className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-600 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
                      <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="#1d3a8f" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d={p.icon} />
                      </svg>
                      {p.text}
                    </span>
                  ))}
                </div>

                <Link
                  href="/campus-ambassador"
                  className="inline-flex items-center gap-2 text-[13px] font-bold text-white px-6 py-2.5 rounded-xl transition-all duration-200 hover:opacity-90 shadow-[0_2px_8px_rgba(29,58,143,0.25)]"
                  style={{ background: "linear-gradient(135deg, #1d3a8f, #3b5bdb)" }}
                >
                  Apply Now
                  <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              {/* Right — visual */}
              <div className="w-full md:w-[280px] shrink-0 p-6 sm:p-8 md:pl-0 flex items-center justify-center">
                <div className="relative">
                  {/* Avatars grid */}
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { initial: "A", color: "#1d3a8f" },
                      { initial: "R", color: "#7c3aed" },
                      { initial: "S", color: "#0f766e" },
                      { initial: "M", color: "#b45309" },
                      { initial: "P", color: "#dc2626" },
                      { initial: "K", color: "#0891b2" },
                      { initial: "D", color: "#4f46e5" },
                      { initial: "N", color: "#059669" },
                      { initial: "+", color: "#94a3b8" },
                    ].map((a, i) => (
                      <motion.div
                        key={i}
                        className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center text-[14px] sm:text-[16px] font-bold text-white shadow-sm"
                        style={{ background: a.color, opacity: a.initial === "+" ? 0.5 : 0.85 }}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: a.initial === "+" ? 0.5 : 0.85 }}
                        transition={{ delay: i * 0.05, duration: 0.3 }}
                      >
                        {a.initial}
                      </motion.div>
                    ))}
                  </div>

                  {/* Floating label */}
                  <motion.div
                    className="absolute -bottom-3 -right-3 bg-white rounded-lg border border-slate-200 shadow-md px-3 py-1.5 z-10"
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <span className="text-[11px] font-bold text-[#1d3a8f]">50+ Ambassadors</span>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </FadeIn>
      </div>
    </section>
  )
}
