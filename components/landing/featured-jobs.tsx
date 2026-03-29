"use client"

import Link from "next/link"
import { FadeIn, StaggerContainer, StaggerItem, motion } from "./motion"

const JOBS = [
  {
    title: "IP & Technology Transfer Associate",
    company: "Top Institute of India",
    location: "Leading S&T Campus",
    tags: ["Contractual", "On-site", "IP"],
    slug: "patent-research-analyst-intern",
    gradient: "linear-gradient(135deg, #1d3a8f, #3b5bdb)",
    initials: "IP",
  },
  {
    title: "AI Engineer Intern",
    company: "Trippyway",
    location: "Remote (India)",
    tags: ["Internship", "Remote", "AI"],
    slug: "ai-engineer-intern-trippyway",
    gradient: "linear-gradient(135deg, #0f766e, #14b8a6)",
    initials: "TW",
  },
  {
    title: "UI/UX Design Intern",
    company: "Trippyway",
    location: "Remote (India)",
    tags: ["Internship", "Remote", "Design"],
    slug: "uiux-intern-trippyway",
    gradient: "linear-gradient(135deg, #7c3aed, #a78bfa)",
    initials: "TW",
  },
  {
    title: "HR & Talent Acquisition Intern",
    company: "Trippyway",
    location: "Remote (India)",
    tags: ["Internship", "Remote", "HR"],
    slug: "hr-intern-trippyway",
    gradient: "linear-gradient(135deg, #b45309, #f59e0b)",
    initials: "TW",
  },
]

export function FeaturedJobs() {
  return (
    <section className="py-20 sm:py-28 bg-[#fafbff]">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <FadeIn className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 text-[12px] font-bold px-4 py-1.5 rounded-full mb-5 tracking-wide uppercase">
              Opportunities
            </span>
            <h2 className="text-[clamp(26px,3.5vw,40px)] font-extrabold text-slate-900 tracking-[-0.03em] mb-3">
              Featured Opportunities
            </h2>
            <p className="text-[16px] text-slate-500 leading-relaxed">
              Curated roles from top companies and institutes.
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

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {JOBS.map((job) => (
            <StaggerItem key={job.slug}>
              <motion.div
                whileHover={{ y: -3 }}
                className="group bg-white rounded-xl border border-slate-200/80 p-5 hover:border-slate-300 hover:shadow-[0_6px_24px_rgba(0,0,0,0.05)] transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-white text-[13px] font-bold shrink-0"
                    style={{ background: job.gradient }}
                  >
                    {job.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[15px] font-bold text-slate-900 mb-0.5 truncate">{job.title}</h3>
                    <p className="text-[13px] text-slate-500 mb-3">{job.company} &middot; {job.location}</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {job.tags.map((tag) => (
                        <span key={tag} className="text-[11px] font-semibold px-2.5 py-0.5 rounded-md bg-slate-50 text-slate-500 border border-slate-100">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link
                      href={`/jobs/${job.slug}`}
                      className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#1d3a8f] hover:text-[#3b5bdb] transition-colors"
                    >
                      Apply Now
                      <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
