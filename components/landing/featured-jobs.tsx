"use client"

import Link from "next/link"
import { FadeIn, StaggerContainer, StaggerItem, motion } from "./motion"

const PORTALS = [
  { name: "LinkedIn", color: "#0077b5" },
  { name: "Naukri", color: "#4a90d9" },
  { name: "Indeed", color: "#2164f3" },
  { name: "Internshala", color: "#00a5ec" },
  { name: "Foundit", color: "#ff6b35" },
]

const JOBS = [
  {
    title: "AI Engineer Intern",
    company: "Trippyway",
    location: "Remote (India)",
    tags: ["Internship", "Remote"],
    dept: "Engineering & AI",
    slug: "ai-engineer-intern-trippyway",
    gradient: "linear-gradient(135deg, #0f766e, #14b8a6)",
    initials: "TW",
    salary: "\u20B98K \u2013 15K/mo",
    posted: "2d ago",
    hot: true,
  },
  {
    title: "UI/UX Design Intern",
    company: "Trippyway",
    location: "Remote (India)",
    tags: ["Internship", "Remote"],
    dept: "Design",
    slug: "uiux-intern-trippyway",
    gradient: "linear-gradient(135deg, #7c3aed, #a78bfa)",
    initials: "TW",
    salary: "\u20B96K \u2013 10K/mo",
    posted: "3d ago",
    hot: false,
  },
]

export function FeaturedJobs() {
  return (
    <section className="py-20 sm:py-28 bg-[#f8fafc]" id="featured-jobs">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        {/* Header */}
        <FadeIn className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-[13px] font-semibold text-[#1d3a8f] uppercase tracking-[0.12em] mb-3">Opportunities</p>
            <h2 className="text-[clamp(26px,3.5vw,40px)] font-black text-slate-900 tracking-[-0.03em] mb-2">
              Featured Opportunities
            </h2>
            <p className="text-[15px] text-slate-500 leading-relaxed">
              Curated from top portals &amp; direct listings — all in one place.
            </p>
          </div>
          <Link
            href="/jobs"
            className="text-[14px] font-semibold text-[#1d3a8f] hover:text-[#3b5bdb] flex items-center gap-1.5 transition-colors shrink-0"
          >
            View all openings
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </FadeIn>

        {/* Portal aggregation bar */}
        <FadeIn delay={0.1} className="mb-8">
          <div className="bg-white rounded-xl border border-slate-200/60 px-4 sm:px-5 py-3 flex items-center gap-3 sm:gap-4 flex-wrap shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
            <span className="text-[10px] sm:text-[11px] font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap shrink-0">Aggregated from</span>
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              {PORTALS.map((p) => (
                <span key={p.name} className="flex items-center gap-1 sm:gap-1.5 whitespace-nowrap">
                  <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full shrink-0" style={{ background: p.color }} />
                  <span className="text-[11px] sm:text-[12px] font-semibold text-slate-500">{p.name}</span>
                </span>
              ))}
              <span className="text-[11px] sm:text-[12px] text-slate-400">+ direct</span>
            </div>
          </div>
        </FadeIn>

        {/* Job cards */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {JOBS.map((job) => (
            <StaggerItem key={job.slug}>
              <motion.div
                whileHover={{ y: -3 }}
                className="group bg-white rounded-2xl border border-slate-200/60 overflow-hidden hover:border-slate-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] transition-all duration-300"
              >
                <div className="p-5">
                  {/* Top row — logo + title + salary */}
                  <div className="flex items-start gap-3 sm:gap-3.5 mb-4">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center text-white text-[13px] font-bold shrink-0 shadow-sm"
                      style={{ background: job.gradient }}
                    >
                      {job.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h3 className="text-[15px] font-extrabold text-slate-900 truncate">{job.title}</h3>
                        {job.hot && (
                          <span className="text-[9px] font-bold text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded border border-orange-200/50 shrink-0 uppercase">Hot</span>
                        )}
                      </div>
                      <p className="text-[12px] text-slate-500">{job.company}</p>
                    </div>
                    <div className="text-right shrink-0 hidden sm:block">
                      <div className="text-[13px] font-extrabold text-slate-900">{job.salary}</div>
                      <div className="text-[10px] text-slate-400">{job.posted}</div>
                    </div>
                  </div>

                  {/* Meta row */}
                  <div className="flex items-center gap-2 flex-wrap mb-4">
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 bg-slate-50 px-2 py-1 rounded-md">
                      <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                        <circle cx="12" cy="9" r="2.5" />
                      </svg>
                      {job.location}
                    </span>
                    {job.tags.map((tag) => (
                      <span key={tag} className="text-[10px] font-semibold px-2 py-1 rounded-md bg-slate-50 text-slate-500 border border-slate-100">
                        {tag}
                      </span>
                    ))}
                    <span className="text-[10px] font-semibold px-2 py-1 rounded-md bg-indigo-50 text-[#1d3a8f] border border-indigo-100">
                      {job.dept}
                    </span>
                    <span className="sm:hidden text-[10px] font-bold text-slate-600 px-2 py-1 rounded-md bg-slate-50 border border-slate-100">
                      {job.salary}
                    </span>
                  </div>
                </div>

                {/* Footer */}
                <div className="px-5 py-3 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-medium">via Jobingen</span>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/jobs/${job.slug}`}
                      className="text-[12px] font-semibold text-slate-500 hover:text-slate-700 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-all"
                    >
                      View Details
                    </Link>
                    <Link
                      href={`/jobs/${job.slug}`}
                      className="text-[12px] font-bold text-white px-4 py-1.5 rounded-lg shadow-sm hover:opacity-90 transition-all flex items-center gap-1.5"
                      style={{ background: "linear-gradient(135deg, #1d3a8f, #3b5bdb)" }}
                    >
                      Apply
                      <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Bottom CTA */}
        <FadeIn delay={0.2} className="mt-8 text-center">
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 text-[14px] font-bold text-[#1d3a8f] bg-white border border-slate-200 px-6 py-3 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all shadow-[0_1px_3px_rgba(0,0,0,0.03)]"
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="7" width="20" height="14" rx="2" />
              <path d="M16 7V5a4 4 0 0 0-8 0v2" />
            </svg>
            Explore All {JOBS.length}+ Openings
          </Link>
        </FadeIn>
      </div>
    </section>
  )
}
