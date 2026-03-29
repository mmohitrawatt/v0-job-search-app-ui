"use client"

import Link from "next/link"
import { FadeIn, motion } from "./motion"

const MENTORS = [
  { initials: "AD", color: "#1d3a8f" },
  { initials: "SP", color: "#0f766e" },
  { initials: "JV", color: "#7c3aed" },
  { initials: "SK", color: "#b45309" },
]

export function Bootcamps() {
  return (
    <section id="bootcamps" className="py-20 sm:py-28 bg-[#fafbff]">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <FadeIn className="text-center mb-14">
          <span className="inline-flex items-center gap-2 bg-amber-50 text-amber-600 text-[12px] font-bold px-4 py-1.5 rounded-full mb-5 tracking-wide uppercase">
            Learn &amp; Build
          </span>
          <h2 className="text-[clamp(26px,3.5vw,40px)] font-extrabold text-slate-900 tracking-[-0.03em] mb-4">
            Hands-on Learning Experiences
          </h2>
          <p className="text-[16px] text-slate-500 max-w-[480px] mx-auto leading-relaxed">
            Intensive bootcamps and masterclasses taught by industry practitioners.
          </p>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="max-w-[520px] mx-auto">
            <motion.div
              className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_48px_rgba(0,0,0,0.08)] transition-all duration-400"
              whileHover={{ y: -3 }}
            >
              {/* Top gradient bar */}
              <div className="h-1.5 w-full" style={{ background: "linear-gradient(90deg, #1d3a8f, #3b5bdb, #7c3aed)" }} />

              <div className="p-7">
                {/* Badge */}
                <div className="flex items-center gap-2 mb-5">
                  <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-600 text-[11px] font-bold px-3 py-1 rounded-full border border-emerald-200/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Upcoming
                  </span>
                  <span className="text-[11px] font-semibold text-slate-400">Application-Based AI Learning</span>
                </div>

                {/* Title */}
                <h3 className="text-[22px] font-extrabold text-slate-900 tracking-[-0.02em] mb-2">
                  Vibe Coding Masterclass
                </h3>
                <p className="text-[14px] text-slate-500 leading-[1.65] mb-6">
                  Build real AI applications from scratch — RAG systems, multi-agent workflows, and production-ready AI tools in one intensive session.
                </p>

                {/* Meta */}
                <div className="flex flex-wrap gap-3 mb-6">
                  {[
                    { icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z", label: "5 April 2026" },
                    { icon: "M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z", label: "4 Hours" },
                  ].map((m) => (
                    <span key={m.label} className="inline-flex items-center gap-1.5 text-[13px] font-medium text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg">
                      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
                        <path d={m.icon} />
                      </svg>
                      {m.label}
                    </span>
                  ))}
                </div>

                {/* Mentors + Price */}
                <div className="flex items-center justify-between pt-5 border-t border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {MENTORS.map((m) => (
                        <div
                          key={m.initials}
                          className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold text-white"
                          style={{ background: m.color }}
                        >
                          {m.initials}
                        </div>
                      ))}
                    </div>
                    <span className="text-[12px] text-slate-400 font-medium">4 Mentors</span>
                  </div>

                  <div className="text-right">
                    <div className="text-[12px] text-slate-400 line-through">&#x20B9;499</div>
                    <div className="text-[20px] font-extrabold text-slate-900 tracking-tight leading-none">&#x20B9;49</div>
                  </div>
                </div>

                {/* CTA */}
                <Link
                  href="/register"
                  className="mt-5 w-full flex items-center justify-center gap-2 text-[14px] font-bold text-white py-3.5 rounded-xl transition-all duration-200 hover:opacity-90 shadow-[0_2px_8px_rgba(29,58,143,0.25)]"
                  style={{ background: "linear-gradient(135deg, #1d3a8f 0%, #3b5bdb 100%)" }}
                >
                  Reserve Your Seat
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
