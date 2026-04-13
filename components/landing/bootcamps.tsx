"use client"

import Link from "next/link"
import { FadeIn, StaggerContainer, StaggerItem, motion } from "./motion"

const MENTORS = [
  { initials: "AD", color: "#1d3a8f" },
  { initials: "SP", color: "#0f766e" },
  { initials: "JV", color: "#7c3aed" },
  { initials: "SK", color: "#b45309" },
]

export function Bootcamps() {
  return (
    <section id="bootcamps" className="py-20 sm:py-28 bg-[#f8fafc]">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <FadeIn className="text-center mb-12">
          <p className="text-[13px] font-semibold text-[#1d3a8f] uppercase tracking-[0.12em] mb-3">Bootcamps</p>
          <h2 className="text-[clamp(26px,3.5vw,40px)] font-black text-slate-900 tracking-[-0.03em] mb-4">
            Hands-on Learning Experiences
          </h2>
          <p className="text-[16px] text-slate-500 max-w-[480px] mx-auto leading-relaxed">
            Intensive bootcamps and masterclasses taught by industry practitioners.
          </p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[860px] mx-auto">

          {/* ── Completed — Bootcamp 1 ─────────── */}
          <StaggerItem>
            <div className="relative overflow-hidden rounded-2xl border border-slate-200/60 bg-white h-full flex flex-col">
              <div className="h-1.5 w-full bg-slate-200" />
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-500 text-[10px] font-bold px-2.5 py-1 rounded-full">
                    <svg width="10" height="10" fill="none" viewBox="0 0 24 24" className="text-slate-400">
                      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Completed
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400">Bootcamp 1 &middot; Mar 2026</span>
                </div>

                <h3 className="text-[17px] font-extrabold text-slate-900 tracking-[-0.02em] mb-1">
                  AI Bootcamp &amp; Hackathon
                </h3>
                <p className="text-[12px] text-slate-500 leading-[1.55] mb-3">
                  2-day intensive — ML foundations, RAG architecture, and a 12-hour hackathon with real AI projects.
                </p>

                <div className="flex flex-wrap gap-1.5 mb-3">
                  {["Mar 2026", "2 Days", "200+ Students"].map((label) => (
                    <span key={label} className="text-[10px] font-medium text-slate-400 bg-slate-50 px-2 py-0.5 rounded">
                      {label}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-1.5 mb-3">
                  {["ML Foundations", "RAG Architecture", "Agentic AI", "Hackathon"].map((t) => (
                    <div key={t} className="flex items-center gap-1.5">
                      <svg width="9" height="9" fill="none" viewBox="0 0 24 24" className="text-slate-300 shrink-0">
                        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="text-[10px] font-medium text-slate-500">{t}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100 mt-auto">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {MENTORS.map((m) => (
                        <div key={m.initials} className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-[8px] font-bold text-white opacity-60" style={{ background: m.color }}>
                          {m.initials}
                        </div>
                      ))}
                    </div>
                    <span className="text-[10px] text-slate-400">4 Mentors</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <svg key={s} width="10" height="10" viewBox="0 0 14 14">
                          <path d="M7 1L8.5 5H13L9.5 7.5L11 12L7 9.5L3 12L4.5 7.5L1 5H5.5L7 1Z" fill={s <= 4 ? "#fbbf24" : "#fde68a"} />
                        </svg>
                      ))}
                    </div>
                    <span className="text-[10px] font-bold text-slate-400">4.7</span>
                  </div>
                </div>

                <div className="mt-3 w-full flex items-center justify-center gap-2 text-[12px] font-bold text-slate-400 py-2.5 rounded-xl bg-slate-50 border border-slate-200 cursor-default">
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <path d="M22 4L12 14.01l-3-3" />
                  </svg>
                  Completed Successfully
                </div>
              </div>
            </div>
          </StaggerItem>

          {/* ── Completed — Bootcamp 2 (12 Apr Masterclass) ── */}
          <StaggerItem>
            <div className="relative overflow-hidden rounded-2xl border border-slate-200/60 bg-white h-full flex flex-col">
              <div className="h-1.5 w-full bg-emerald-200" />
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-600 text-[10px] font-bold px-2.5 py-1 rounded-full border border-emerald-200/60">
                    <svg width="10" height="10" fill="none" viewBox="0 0 24 24" className="text-emerald-500">
                      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Completed
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400">Bootcamp 2 &middot; 12 Apr 2026</span>
                </div>

                <h3 className="text-[17px] font-extrabold text-slate-900 tracking-[-0.02em] mb-1">
                  Vibe Coding Masterclass
                </h3>
                <p className="text-[12px] text-slate-500 leading-[1.55] mb-3">
                  4-hour live session — AI workflows, agentic AI, and building a working prototype with expert mentors. Successfully completed with 300+ students.
                </p>

                <div className="flex flex-wrap gap-1.5 mb-3">
                  {["12 Apr 2026", "4 Hours", "300+ Students"].map((label) => (
                    <span key={label} className="text-[10px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                      {label}
                    </span>
                  ))}
                </div>

                {/* What was covered */}
                <div className="mb-3">
                  <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-2">What Was Covered</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-1.5">
                    {[
                      { title: "AI Workflows & Agentic AI", color: "#1d3a8f" },
                      { title: "Intro to Vibe Coding", color: "#7c3aed" },
                      { title: "Live Project Discussion", color: "#047857" },
                      { title: "Prototype Development", color: "#b45309" },
                    ].map((t) => (
                      <div key={t.title} className="flex items-center gap-1.5">
                        <svg width="9" height="9" fill="none" viewBox="0 0 24 24" className="text-emerald-400 shrink-0">
                          <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="text-[10px] font-medium text-slate-600">{t.title}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* What students got */}
                <div className="mb-3">
                  <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-2">Delivered</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-1">
                    {["AI prototype", "Recordings", "Roadmap", "Certificate", "Toolkit", "Community"].map((item) => (
                      <div key={item} className="flex items-center gap-1">
                        <svg width="8" height="8" fill="none" viewBox="0 0 24 24" className="text-emerald-400 shrink-0">
                          <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="text-[10px] text-slate-500">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mentors + Rating */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100 mt-auto">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {MENTORS.slice(0, 3).map((m) => (
                        <div key={m.initials} className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-[8px] font-bold text-white opacity-60" style={{ background: m.color }}>
                          {m.initials}
                        </div>
                      ))}
                    </div>
                    <span className="text-[10px] text-slate-400">3 Mentors</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <svg key={s} width="10" height="10" viewBox="0 0 14 14">
                          <path d="M7 1L8.5 5H13L9.5 7.5L11 12L7 9.5L3 12L4.5 7.5L1 5H5.5L7 1Z" fill={s <= 5 ? "#fbbf24" : "#fde68a"} />
                        </svg>
                      ))}
                    </div>
                    <span className="text-[10px] font-bold text-slate-400">4.8</span>
                  </div>
                </div>

                <div className="mt-3 w-full flex items-center justify-center gap-2 text-[12px] font-bold text-emerald-600 py-2.5 rounded-xl bg-emerald-50 border border-emerald-200/60 cursor-default">
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <path d="M22 4L12 14.01l-3-3" />
                  </svg>
                  Completed Successfully
                </div>
              </div>
            </div>
          </StaggerItem>

        </StaggerContainer>
      </div>
    </section>
  )
}
