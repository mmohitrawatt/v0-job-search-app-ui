"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { useApp } from "@/lib/app-context"
import { MOCK_JOBS, Job, JobPortal } from "@/lib/mock-data"

// ─── Portal Badge ─────────────────────────────────────────────────────────────

const PORTAL_META: Record<JobPortal, { label: string; bg: string; text: string; dot: string }> = {
  linkedin:    { label: "in",        bg: "bg-[#0A66C2]",   text: "text-white",        dot: "#0A66C2" },
  naukri:      { label: "Naukri",    bg: "bg-[#FF7555]",   text: "text-white",        dot: "#FF7555" },
  indeed:      { label: "Indeed",    bg: "bg-[#003A9B]",   text: "text-white",        dot: "#003A9B" },
  foundit:     { label: "foundit",   bg: "bg-[#6941C6]",   text: "text-white",        dot: "#6941C6" },
  internshala: { label: "Intern…",   bg: "bg-[#19A7CE]",   text: "text-white",        dot: "#19A7CE" },
}

function PortalBadge({ portal }: { portal: JobPortal }) {
  const meta = PORTAL_META[portal]
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-1.5 py-0.5 rounded-[5px] text-[9px] font-bold tracking-tight leading-none select-none",
        meta.bg, meta.text
      )}
      title={`Posted on ${portal}`}
    >
      {portal === "linkedin" ? (
        <svg width="8" height="8" viewBox="0 0 16 16" fill="currentColor">
          <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
        </svg>
      ) : portal === "naukri" ? (
        <svg width="8" height="8" viewBox="0 0 20 20" fill="currentColor">
          <circle cx="10" cy="10" r="10" fill="white" fillOpacity="0.2"/>
          <path d="M5 14l3-5 2 3 2-4 3 6H5z" fill="currentColor"/>
        </svg>
      ) : (
        <span className="w-1.5 h-1.5 rounded-full bg-white/70 inline-block" />
      )}
      {meta.label}
    </span>
  )
}

type SubScreen = "list" | "detail" | "apply-detail" | "apply-confirm"

const FILTERS = ["Remote", "Full-time", "Internship", "High Match", "Saved"]

// Prep roadmap steps generated per job
function getPrepRoadmap(job: Job) {
  return [
    {
      day: "Day 1",
      title: "Understand the Role",
      tasks: [`Deep-read ${job.company}'s mission and recent product launches`, `Study the JD: map every required skill to your experience`, "Draft a 90-second elevator pitch for this specific role"],
    },
    {
      day: "Day 2",
      title: "Technical Foundations",
      tasks: [`Review core skills: ${job.skills.slice(0, 3).join(", ")}`, "Solve 3 LeetCode problems in the domain", "Read 2 relevant engineering blog posts from their team"],
    },
    {
      day: "Day 3",
      title: "Project Storytelling",
      tasks: ["Pick 3 past projects — frame each with STAR method", "Quantify every achievement (%, $, x faster)", `Map your projects to ${job.company}'s tech stack`],
    },
    {
      day: "Day 4",
      title: "Mock Interviews",
      tasks: ["Complete 2 mock behavioral rounds with AI feedback", "Record yourself answering 'Tell me about yourself'", `Practice 2 system design questions relevant to ${job.title}`],
    },
    {
      day: "Day 5",
      title: "Final Prep",
      tasks: ["Review missing skills: " + (job.missingSkills.join(", ") || "None — you're fully ready!"), "Prepare 5 thoughtful questions to ask the interviewer", "Submit application and confirm your resume is ATS-optimized"],
    },
  ]
}

function BackButton({ onBack, label = "Back" }: { onBack: () => void; label?: string }) {
  return (
    <button
      onClick={onBack}
      className="flex items-center gap-1.5 text-primary text-[14px] font-semibold btn-press tap-highlight-none"
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M11 4L6 9L11 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {label}
    </button>
  )
}

// ─── Job List ─────────────────────────────────────────────────────────────────

function JobList({ onJobClick, onApplyNow }: { onJobClick: (j: Job) => void; onApplyNow: (j: Job) => void }) {
  const { bookmarks, toggleBookmark, savedJobIds } = useApp()
  const [query, setQuery] = useState("")
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [showFilterSheet, setShowFilterSheet] = useState(false)

  const filtered = MOCK_JOBS.filter((j) => {
    const q = query.toLowerCase()
    const matchQuery = !q || j.title.toLowerCase().includes(q) || j.company.toLowerCase().includes(q) || j.skills.some((s) => s.toLowerCase().includes(q))
    const matchRemote = !activeFilters.includes("Remote") || j.isRemote
    const matchSaved = !activeFilters.includes("Saved") || savedJobIds.includes(j.id)
    const matchHighMatch = !activeFilters.includes("High Match") || j.matchScore >= 80
    return matchQuery && matchRemote && matchSaved && matchHighMatch
  })

  function toggleFilter(f: string) {
    setActiveFilters((prev) => prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f])
  }

  return (
    <div className="flex-1 overflow-y-auto bg-background">
      <div className="px-4 pt-14 pb-6">
        <div className="mb-4">
          <h1 className="text-[22px] font-bold text-foreground tracking-tight">Job Companion</h1>
          <p className="text-[13px] text-muted-foreground mt-0.5 font-medium">Curated for your profile</p>
        </div>

        {/* Search */}
        <div className="relative mb-3">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" className="text-muted-foreground">
              <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M10 10L13 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search jobs, companies, skills…"
            className="w-full bg-card border border-border rounded-full pl-10 pr-12 py-2.5 text-[13.5px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary transition-all duration-200 shadow-card"
          />
          <button
            onClick={() => setShowFilterSheet(true)}
            className="absolute inset-y-0 right-2 flex items-center justify-center w-8 h-8 my-auto rounded-full bg-primary/10 text-primary btn-press tap-highlight-none"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1.5 3.5H12.5M3.5 7H10.5M6 10.5H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Filter chips */}
        <div className="flex gap-2 overflow-x-auto pb-2.5 mb-4 -mx-4 px-4" style={{ scrollbarWidth: "none" }}>
          {FILTERS.map((f) => {
            const active = activeFilters.includes(f)
            return (
              <button
                key={f}
                onClick={() => toggleFilter(f)}
                className={cn(
                  "flex-shrink-0 px-3.5 py-1.5 rounded-full text-[11.5px] font-semibold transition-all duration-200 btn-press tap-highlight-none",
                  active ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground border border-border"
                )}
              >
                {f}
              </button>
            )
          })}
        </div>

        {/* Result count */}
        <p className="text-[11px] text-muted-foreground font-medium mb-3">{filtered.length} positions found</p>

        {/* Job cards */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center mb-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-muted-foreground">
                <circle cx="11" cy="11" r="7.5" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M17 17L21 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <p className="text-[14px] font-semibold text-foreground">No jobs found</p>
            <p className="text-[12px] text-muted-foreground mt-1">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filtered.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                bookmarked={bookmarks.has(job.id)}
                onToggleBookmark={() => toggleBookmark(job.id)}
                onClick={() => onJobClick(job)}
                onApplyNow={() => onApplyNow(job)}
              />
            ))}
          </div>
        )}
      </div>

      {showFilterSheet && (
        <FilterSheet activeFilters={activeFilters} onToggle={toggleFilter} onClose={() => setShowFilterSheet(false)} />
      )}
    </div>
  )
}

// ─── Job Card (horizontal, full-width) ───────────────────────────────────────

function JobCard({
  job, bookmarked, onToggleBookmark, onClick, onApplyNow,
}: {
  job: Job; bookmarked: boolean; onToggleBookmark: () => void; onClick: () => void; onApplyNow: () => void
}) {
  const [heartAnim, setHeartAnim] = useState(false)
  const matchColor = job.matchScore >= 85 ? "text-emerald-600 bg-emerald-50 border-emerald-200" : job.matchScore >= 70 ? "text-amber-600 bg-amber-50 border-amber-200" : "text-orange-600 bg-orange-50 border-orange-200"

  function handleBookmark(e: React.MouseEvent) {
    e.stopPropagation()
    setHeartAnim(true)
    onToggleBookmark()
    setTimeout(() => setHeartAnim(false), 350)
  }

  return (
    <div className="bg-card rounded-[16px] border border-border shadow-card overflow-hidden">
      {/* Top section — clickable for detail */}
      <button onClick={onClick} className="w-full p-4 text-left tap-highlight-none active:bg-muted/40 transition-colors duration-150">
        <div className="flex items-start gap-3">
          {/* Logo */}
          <div className={cn("w-11 h-11 rounded-[11px] flex items-center justify-center text-[12px] font-extrabold flex-shrink-0 shadow-sm", job.color)}>
            {job.initials}
          </div>

          {/* Main info */}
          <div className="flex-1 min-w-0">
            {/* Title row — title left, bookmark right */}
            <div className="flex items-start justify-between gap-2 mb-0.5">
              <p className="text-[14px] font-bold text-foreground leading-tight flex-1">{job.title}</p>
              <button
                onClick={handleBookmark}
                className={cn(
                  "flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full transition-all duration-200 tap-highlight-none -mt-0.5",
                  heartAnim ? "scale-125" : "scale-100",
                  bookmarked ? "bg-primary/10" : "bg-transparent"
                )}
              >
                <svg
                  width="16" height="16" viewBox="0 0 16 16"
                  fill={bookmarked ? "currentColor" : "none"}
                  className={bookmarked ? "text-primary" : "text-muted-foreground"}
                >
                  <path d="M8 13.5S2.5 10 2.5 5.8C2.5 3.7 4.18 2 6.3 2C7.22 2 8 2.6 8 2.6C8 2.6 8.78 2 9.7 2C11.82 2 13.5 3.7 13.5 5.8C13.5 10 8 13.5 8 13.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            {/* Company + portal badge on same line */}
            <div className="flex items-center gap-1.5 mb-2">
              <p className="text-[12px] text-muted-foreground font-semibold leading-none">
                {job.company} · {job.isRemote ? "Remote" : job.location}
              </p>
              <PortalBadge portal={job.portal} />
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <span className={cn("text-[10.5px] font-bold px-2 py-0.5 rounded-full border", matchColor)}>
                {job.matchScore}% Match
              </span>
              <span className="text-[10.5px] font-semibold px-2 py-0.5 rounded-full bg-accent text-accent-foreground">
                {job.type}
              </span>
              <span className="text-[10.5px] font-semibold text-muted-foreground">{job.salary}</span>
            </div>
          </div>
        </div>

        {/* Skills row */}
        <div className="flex gap-1.5 mt-3 flex-wrap">
          {job.skills.slice(0, 3).map((s) => (
            <span key={s} className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
              {s}
            </span>
          ))}
          {job.skills.length > 3 && (
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
              +{job.skills.length - 3}
            </span>
          )}
        </div>
      </button>

      {/* Prep promotion banner */}
      <div className="mx-3 mb-3 rounded-[10px] bg-accent border border-primary/15 px-3 py-2 flex items-center gap-2.5">
        <div className="w-6 h-6 rounded-[6px] bg-primary/10 flex items-center justify-center flex-shrink-0">
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="text-primary">
            <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.3"/>
            <path d="M4.5 6.5L6 8L8.5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <p className="text-[11px] text-primary font-semibold flex-1 leading-tight">
          5-day AI prep plan available for this role
        </p>
        <button
          onClick={(e) => { e.stopPropagation(); onApplyNow() }}
          className="text-[10px] font-bold text-primary underline underline-offset-2 tap-highlight-none"
        >
          View
        </button>
      </div>

      {/* Action buttons */}
      <div className="flex border-t border-border">
        <button
          onClick={onClick}
          className="flex-1 py-3 text-[12px] font-semibold text-foreground transition-colors duration-150 active:bg-muted border-r border-border"
        >
          View Details
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onApplyNow() }}
          className="flex-1 py-3 text-[12px] font-bold text-primary-foreground bg-primary transition-all duration-150 active:opacity-85"
        >
          Apply Now
        </button>
      </div>
    </div>
  )
}

// ─── Filter Sheet ─────────────────────────────────────────────────────────────

function FilterSheet({ activeFilters, onToggle, onClose }: { activeFilters: string[]; onToggle: (f: string) => void; onClose: () => void }) {
  return (
    <>
      <div className="absolute inset-0 bg-black/30 z-40" onClick={onClose} />
      <div className="absolute bottom-0 left-0 right-0 bg-card rounded-t-[24px] z-50 animate-in slide-in-from-bottom-8 duration-300 pb-6">
        <div className="w-10 h-1 bg-muted-foreground/30 rounded-full mx-auto mt-3 mb-4" />
        <div className="flex items-center justify-between px-5 pb-4 border-b border-border">
          <h3 className="text-[15px] font-bold text-foreground">Filter Jobs</h3>
          <button onClick={onClose} className="w-7 h-7 rounded-full bg-muted flex items-center justify-center btn-press">
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
              <path d="M1.5 1.5L9.5 9.5M9.5 1.5L1.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        <div className="px-5 pt-4">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-3">Filter by</p>
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => {
              const active = activeFilters.includes(f)
              return (
                <button
                  key={f}
                  onClick={() => onToggle(f)}
                  className={cn(
                    "px-4 py-2 rounded-full text-[13px] font-semibold transition-all duration-200 btn-press",
                    active ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                  )}
                >
                  {f}
                </button>
              )
            })}
          </div>
          <button onClick={onClose} className="w-full mt-5 py-3.5 rounded-[12px] bg-primary text-primary-foreground text-[14px] font-bold shadow-card btn-press">
            Apply Filters
          </button>
        </div>
      </div>
    </>
  )
}

// ─── Job Detail (view-only) ───────────────────────────────────────────────────

function JobDetail({ job, onBack, onApplyNow }: { job: Job; onBack: () => void; onApplyNow: () => void }) {
  const { bookmarks, toggleBookmark } = useApp()
  const bookmarked = bookmarks.has(job.id)
  const matchColor = job.matchScore >= 85 ? "text-emerald-600 bg-emerald-50" : "text-amber-600 bg-amber-50"

  return (
    <div className="flex-1 flex flex-col bg-background">
      <div className="px-4 pt-12 pb-4 flex-shrink-0">
        <BackButton onBack={onBack} label="Jobs" />
        <div className="flex items-start justify-between mt-3">
          <div className="flex-1 pr-3">
            <h1 className="text-[19px] font-bold text-foreground leading-tight">{job.title}</h1>
            <p className="text-[13px] text-muted-foreground mt-0.5 font-medium">{job.company} · {job.isRemote ? "Remote" : job.location}</p>
          </div>
          <div className={cn("w-12 h-12 rounded-[13px] flex items-center justify-center text-[13px] font-extrabold flex-shrink-0 shadow-sm", job.color)}>
            {job.initials}
          </div>
        </div>
        <div className="flex items-center gap-2 mt-3 flex-wrap">
          <span className={cn("text-[11px] font-bold px-2.5 py-1 rounded-full", matchColor)}>{job.matchScore}% Match</span>
          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-accent text-accent-foreground">{job.type}</span>
          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-accent text-accent-foreground">{job.salary}</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-28">
        <div className="bg-card rounded-[14px] border border-border shadow-card p-4 mb-3">
          <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2">About the Role</p>
          <p className="text-[13px] text-foreground leading-relaxed">{job.description}</p>
        </div>
        <div className="bg-card rounded-[14px] border border-border shadow-card p-4 mb-3">
          <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-3">Required Skills</p>
          <div className="flex flex-wrap gap-1.5">
            {job.skills.map((s) => (
              <span key={s} className="text-[12px] font-semibold px-2.5 py-1 rounded-full bg-accent text-accent-foreground">{s}</span>
            ))}
          </div>
        </div>
        {job.missingSkills.length > 0 && (
          <div className="bg-amber-50 rounded-[14px] border border-amber-200 p-4 mb-3">
            <p className="text-[10px] font-bold uppercase tracking-widest text-amber-700 mb-2">Skills to Develop</p>
            <div className="flex flex-wrap gap-1.5">
              {job.missingSkills.map((s) => (
                <span key={s} className="text-[12px] font-semibold px-2.5 py-1.5 rounded-full bg-amber-100 text-amber-700">{s}</span>
              ))}
            </div>
          </div>
        )}
        <button
          onClick={() => toggleBookmark(job.id)}
          className="w-full bg-card rounded-[14px] border border-border shadow-card p-4 flex items-center gap-3 card-tap"
        >
          <div className="w-9 h-9 rounded-[9px] bg-accent flex items-center justify-center text-primary flex-shrink-0">
            <svg width="18" height="18" viewBox="0 0 18 18" fill={bookmarked ? "currentColor" : "none"} className="text-primary">
              <path d="M4 2H14C14.55 2 15 2.45 15 3V17L9 14L3 17V3C3 2.45 3.45 2 4 2Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="flex-1 text-left">
            <p className="text-[13px] font-semibold text-foreground">{bookmarked ? "Job Saved" : "Save Job"}</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">{bookmarked ? "In your saved list" : "Add to watchlist"}</p>
          </div>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-muted-foreground"><path d="M5 3L9 7L5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 px-4 pb-5 pt-3 bg-background border-t border-border z-10">
        <button
          onClick={onApplyNow}
          className="w-full py-3.5 rounded-[14px] bg-primary text-primary-foreground text-[14px] font-bold shadow-card btn-press"
        >
          View Prep Plan & Apply
        </button>
      </div>
    </div>
  )
}

// ─── Apply Detail (Prep Roadmap + JD + Apply CTA) ────────────────────────────

function ApplyDetail({ job, onBack, onConfirm }: { job: Job; onBack: () => void; onConfirm: () => void }) {
  const roadmap = getPrepRoadmap(job)
  const [expandedDay, setExpandedDay] = useState<number | null>(0)
  const matchColor = job.matchScore >= 85 ? "text-emerald-600 bg-emerald-50 border-emerald-200" : "text-amber-600 bg-amber-50 border-amber-200"
  const gaugeColor = job.matchScore >= 85 ? "text-emerald-500" : "text-amber-500"

  return (
    <div className="flex-1 flex flex-col bg-background">
      {/* Header */}
      <div className="px-4 pt-12 pb-4 border-b border-border flex-shrink-0">
        <BackButton onBack={onBack} label="Job Details" />
        <div className="flex items-center justify-between mt-3">
          <div className="flex-1 pr-3">
            <h1 className="text-[18px] font-bold text-foreground leading-tight">{job.title}</h1>
            <p className="text-[12px] text-muted-foreground font-semibold mt-0.5">{job.company}</p>
          </div>
          <div className={cn("w-11 h-11 rounded-[11px] flex items-center justify-center text-[12px] font-extrabold", job.color)}>
            {job.initials}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 pb-32">
        {/* Match Score */}
        <div className="bg-card rounded-[16px] border border-border shadow-card p-4 mb-4 flex items-center gap-4">
          <div className="relative w-14 h-14 flex-shrink-0">
            <svg width="56" height="56" viewBox="0 0 56 56" className="-rotate-90">
              <circle cx="28" cy="28" r="22" fill="none" stroke="currentColor" strokeWidth="5" className="text-muted" />
              <circle
                cx="28" cy="28" r="22" fill="none" stroke="currentColor" strokeWidth="5"
                strokeDasharray={`${2 * Math.PI * 22}`}
                strokeDashoffset={`${2 * Math.PI * 22 * (1 - job.matchScore / 100)}`}
                strokeLinecap="round"
                className={gaugeColor}
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-[13px] font-extrabold text-foreground">{job.matchScore}%</span>
          </div>
          <div className="flex-1">
            <p className="text-[14px] font-bold text-foreground">{job.matchScore >= 85 ? "Strong Match" : job.matchScore >= 70 ? "Good Match" : "Fair Match"}</p>
            <p className="text-[11.5px] text-muted-foreground mt-1 leading-relaxed">
              {job.matchScore >= 85 ? "Your profile aligns well. Apply with confidence." : "A few improvements can significantly boost your chances."}
            </p>
            {job.missingSkills.length > 0 && (
              <div className="flex gap-1 flex-wrap mt-2">
                {job.missingSkills.map((s) => (
                  <span key={s} className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">{s}</span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* AI Prep Roadmap */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-[6px] bg-primary flex items-center justify-center flex-shrink-0">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M6.5 1L7.8 4.5H11.5L8.5 6.7L9.7 10.2L6.5 8.1L3.3 10.2L4.5 6.7L1.5 4.5H5.2L6.5 1Z" stroke="white" strokeWidth="1.2" strokeLinejoin="round"/>
              </svg>
            </div>
            <p className="text-[14px] font-bold text-foreground">AI-Generated 5-Day Prep Plan</p>
          </div>
          <p className="text-[11.5px] text-muted-foreground mb-3 leading-relaxed">
            Customized for {job.title} at {job.company} based on your profile and the job description.
          </p>

          <div className="space-y-2">
            {roadmap.map((day, i) => (
              <div
                key={i}
                className={cn(
                  "bg-card rounded-[14px] border overflow-hidden transition-all duration-200",
                  expandedDay === i ? "border-primary/40 shadow-card-hover" : "border-border shadow-card"
                )}
              >
                <button
                  onClick={() => setExpandedDay(expandedDay === i ? null : i)}
                  className="w-full flex items-center gap-3 p-3.5 text-left tap-highlight-none"
                >
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-extrabold flex-shrink-0 transition-all",
                    expandedDay === i ? "bg-primary text-primary-foreground" : "bg-accent text-primary"
                  )}>
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] font-bold text-primary uppercase tracking-widest">{day.day}</p>
                    <p className="text-[13px] font-bold text-foreground">{day.title}</p>
                  </div>
                  <svg
                    width="14" height="14" viewBox="0 0 14 14" fill="none"
                    className={cn("text-muted-foreground transition-transform duration-200 flex-shrink-0", expandedDay === i ? "rotate-180" : "")}
                  >
                    <path d="M3 5L7 9L11 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>

                {expandedDay === i && (
                  <div className="px-4 pb-4 animate-in fade-in duration-200">
                    <div className="space-y-2.5 pt-1">
                      {day.tasks.map((task, ti) => (
                        <div key={ti} className="flex items-start gap-2.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                          <p className="text-[12px] text-foreground leading-relaxed">{task}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Job Description Summary */}
        <div className="bg-card rounded-[14px] border border-border shadow-card p-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2">Job Description</p>
          <p className="text-[12.5px] text-foreground leading-relaxed">{job.description}</p>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {job.skills.map((s) => (
              <span key={s} className="text-[10.5px] font-semibold px-2 py-0.5 rounded-full bg-accent text-accent-foreground">{s}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Fixed Apply CTA */}
      <div className="absolute bottom-0 left-0 right-0 px-4 pb-5 pt-3 bg-background/95 backdrop-blur-sm border-t border-border z-10">
        <div className="flex items-center justify-between mb-2.5 px-0.5">
          <div>
            <p className="text-[12px] font-bold text-foreground">{job.company}</p>
            <p className="text-[11px] text-muted-foreground">{job.salary}</p>
          </div>
          <span className={cn("text-[11px] font-bold px-2.5 py-1 rounded-full", matchColor)}>
            {job.matchScore}% Match
          </span>
        </div>
        <button
          onClick={onConfirm}
          className="w-full py-4 rounded-[14px] bg-primary text-primary-foreground text-[15px] font-bold shadow-card btn-press"
        >
          Apply Now — {job.company}
        </button>
      </div>
    </div>
  )
}

// ─── Apply Confirm Modal ──────────────────────────────────────────────────────

function ApplyConfirm({ job, onClose }: { job: Job; onClose: () => void }) {
  const [countdown, setCountdown] = useState(3)
  const { showToast } = useApp()

  useEffect(() => {
    if (countdown <= 0) {
      showToast(`Application submitted to ${job.company}`, "success")
      onClose()
      return
    }
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000)
    return () => clearTimeout(t)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countdown])

  return (
    <div className="absolute inset-0 bg-black/40 z-50 flex items-end">
      <div className="w-full bg-card rounded-t-[24px] p-6 animate-in slide-in-from-bottom-8 duration-300">
        <div className="flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center mb-4">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="text-emerald-600">
              <path d="M4 14L10 20L24 8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h3 className="text-[18px] font-bold text-foreground mb-1">Submitting Application</h3>
          <p className="text-[13px] text-muted-foreground mb-3 leading-relaxed">
            Redirecting to {job.company} portal in <span className="font-bold text-foreground">{countdown}s</span>
          </p>
          <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden mb-5">
            <div
              className="h-full bg-primary rounded-full transition-all duration-1000"
              style={{ width: `${((3 - countdown) / 3) * 100}%` }}
            />
          </div>
          <button
            onClick={() => { showToast("Cancelled", "info"); onClose() }}
            className="text-[13px] font-semibold text-muted-foreground btn-press tap-highlight-none"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export function JobsScreen() {
  const { screen, selectedJob, setSelectedJob, navigate, goBack } = useApp()
  const [subScreen, setSubScreen] = useState<SubScreen>("list")
  const [confirmJob, setConfirmJob] = useState<Job | null>(null)

  useEffect(() => {
    if (screen === "job-detail" && selectedJob) setSubScreen("detail")
    else if (screen === "smart-apply" && selectedJob) setSubScreen("apply-detail")
    else setSubScreen("list")
  }, [screen, selectedJob])

  function openDetail(job: Job) {
    setSelectedJob(job)
    setSubScreen("detail")
    navigate("job-detail")
  }

  function openApplyDetail(job: Job) {
    setSelectedJob(job)
    setSubScreen("apply-detail")
    navigate("smart-apply")
  }

  function handleBack() {
    goBack()
    if (subScreen === "apply-detail") {
      setSubScreen("detail")
    } else {
      setSubScreen("list")
      setSelectedJob(null)
    }
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden relative">
      {subScreen === "list" && <JobList onJobClick={openDetail} onApplyNow={openApplyDetail} />}
      {subScreen === "detail" && selectedJob && <JobDetail job={selectedJob} onBack={handleBack} onApplyNow={() => openApplyDetail(selectedJob)} />}
      {subScreen === "apply-detail" && selectedJob && <ApplyDetail job={selectedJob} onBack={handleBack} onConfirm={() => setConfirmJob(selectedJob)} />}
      {confirmJob && <ApplyConfirm job={confirmJob} onClose={() => setConfirmJob(null)} />}
    </div>
  )
}
