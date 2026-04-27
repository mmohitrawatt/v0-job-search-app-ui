"use client"

import { FadeIn, StaggerContainer, StaggerItem } from "./motion"

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

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[800px] mx-auto">

          {/* ── Upcoming — Bootcamp 4 (Recursion Deep Dive) ── */}
          <StaggerItem>
            <div className="relative overflow-hidden rounded-2xl border-2 border-[#7c3aed]/25 bg-white h-full flex flex-col shadow-[0_4px_24px_rgba(124,58,237,0.1)]">
              <div className="h-1.5 w-full" style={{ background: "linear-gradient(90deg,#7c3aed,#4f46e5)" }} />
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 bg-[#f5f3ff] text-[#7c3aed] text-[10px] font-bold px-2.5 py-1 rounded-full border border-[#ddd6fe]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#7c3aed] animate-pulse" />
                    Open for Registration
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400">Bootcamp 4</span>
                </div>

                <h3 className="text-[17px] font-extrabold text-slate-900 tracking-[-0.02em] mb-1">
                  Recursion Deep Dive
                </h3>
                <p className="text-[12px] text-slate-500 leading-[1.55] mb-3">
                  From call stack to backtracking mastery — recursion fundamentals, recursion trees, and real LeetCode problems in C++.
                </p>

                <div className="flex items-center gap-1.5 mb-3 text-[11px] font-semibold text-slate-500">
                  <span>📅</span> 29 April · 7:30 PM – 10:30 PM IST
                </div>

                <div className="flex flex-wrap gap-1.5 mb-3">
                  {["Live Session", "C++", "₹29 Only"].map((label) => (
                    <span key={label} className="text-[10px] font-bold text-[#7c3aed] bg-[#f5f3ff] px-2 py-0.5 rounded border border-[#ddd6fe]">
                      {label}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-1.5 mb-3">
                  {["Base Recursion & Stack", "Recursion Trees", "Backtracking Basics", "Subsets & Permutations", "N-Queens Problem"].map((t) => (
                    <div key={t} className="flex items-center gap-1.5">
                      <svg width="9" height="9" fill="none" viewBox="0 0 24 24" className="shrink-0" style={{ color: "#7c3aed" }}>
                        <path d="M20 6L9 17l-5-5" stroke="#7c3aed" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="text-[10px] font-medium text-slate-600">{t}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 pt-3 border-t border-slate-100 mt-auto mb-3">
                  <div className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-[8px] font-bold text-white" style={{ background: "#7c3aed" }}>TR</div>
                  <span className="text-[10px] text-slate-400">Tarsh</span>
                </div>

                <a href="/recursion-bootcamp"
                  className="w-full flex items-center justify-center gap-2 text-[13px] font-bold text-white py-3 rounded-xl transition-all hover:-translate-y-0.5"
                  style={{ background: "linear-gradient(135deg,#7c3aed,#4f46e5)", boxShadow: "0 4px 14px rgba(124,58,237,0.3)" }}>
                  Register Now — ₹29 →
                </a>
              </div>
            </div>
          </StaggerItem>

          {/* ── Upcoming — ML Masterclass ── */}
          <StaggerItem>
            <div className="relative overflow-hidden rounded-2xl border-2 border-[#1d3a8f]/25 bg-white h-full flex flex-col shadow-[0_4px_24px_rgba(29,58,143,0.1)]">
              <div className="h-1.5 w-full" style={{ background: "linear-gradient(90deg,#1d3a8f,#2563eb)" }} />
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 bg-[#eff6ff] text-[#1d3a8f] text-[10px] font-bold px-2.5 py-1 rounded-full border border-[#bfdbfe]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1d3a8f] animate-pulse" />
                    Open for Registration
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400">Bootcamp 5</span>
                </div>

                <h3 className="text-[17px] font-extrabold text-slate-900 tracking-[-0.02em] mb-1">
                  ML Masterclass
                </h3>
                <p className="text-[12px] text-slate-500 leading-[1.55] mb-3">
                  4-hour live deep dive into Machine Learning — from data preprocessing to deploying real ML models, with hands-on notebooks and industry mentors.
                </p>

                <div className="flex items-center gap-1.5 mb-3 text-[11px] font-semibold text-slate-500">
                  <span>📅</span> 10 May · 7:00 PM – 11:00 PM IST
                </div>

                <div className="flex flex-wrap gap-1.5 mb-3">
                  {["Live Session", "Python", "₹29 Only"].map((label) => (
                    <span key={label} className="text-[10px] font-bold text-[#1d3a8f] bg-[#eff6ff] px-2 py-0.5 rounded border border-[#bfdbfe]">
                      {label}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-1.5 mb-3">
                  {["7 Core ML Algorithms", "Full ML Pipeline", "Data Preprocessing", "Confusion Matrix & Metrics", "Hands-on Notebooks"].map((t) => (
                    <div key={t} className="flex items-center gap-1.5">
                      <svg width="9" height="9" fill="none" viewBox="0 0 24 24" className="shrink-0">
                        <path d="M20 6L9 17l-5-5" stroke="#1d3a8f" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="text-[10px] font-medium text-slate-600">{t}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 pt-3 border-t border-slate-100 mt-auto mb-3">
                  <div className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-[8px] font-bold text-white" style={{ background: "#1d3a8f" }}>AD</div>
                  <span className="text-[10px] text-slate-400">Aditya Dubey</span>
                </div>

                <a href="/ml-masterclass"
                  className="w-full flex items-center justify-center gap-2 text-[13px] font-bold text-white py-3 rounded-xl transition-all hover:-translate-y-0.5"
                  style={{ background: "linear-gradient(135deg,#1d3a8f,#2563eb)", boxShadow: "0 4px 14px rgba(29,58,143,0.3)" }}>
                  Register Now — ₹29 →
                </a>
              </div>
            </div>
          </StaggerItem>

        </StaggerContainer>
      </div>
    </section>
  )
}
