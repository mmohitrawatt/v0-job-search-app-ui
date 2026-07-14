"use client"

import Link from "next/link"
import { FadeIn, motion } from "./motion"

export function StudentInsightsBanner() {
  return (
    <section className="py-10 sm:py-12 bg-white border-t border-slate-100">
      <div className="max-w-[900px] mx-auto px-5 sm:px-8">
        <FadeIn>
          <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
            <Link
              href="/student-insights"
              className="group flex items-center gap-4 sm:gap-5 bg-[#fafbff] border border-slate-200/60 rounded-2xl px-5 sm:px-7 py-4 sm:py-5 hover:border-[#1d3a8f]/20 hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all duration-300 no-underline"
            >
              {/* Icon */}
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm" style={{ background: "#1d3a8f" }}>
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l.572 2.287a.5.5 0 01-.486.613H9.828a.5.5 0 01-.485-.613l.572-2.287z" />
                </svg>
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <div className="text-[14px] sm:text-[15px] font-bold text-slate-900 mb-0.5">Share your student experience</div>
                <div className="text-[12px] sm:text-[13px] text-slate-500">Help us build better tools — take a 2-min survey</div>
              </div>

              {/* Arrow */}
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="hidden sm:inline text-[12px] font-semibold text-[#1d3a8f] opacity-0 group-hover:opacity-100 transition-opacity duration-300">Take Survey</span>
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#1d3a8f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          </motion.div>
        </FadeIn>
      </div>
    </section>
  )
}
