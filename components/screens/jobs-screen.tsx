"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { useApp } from "@/lib/app-context"
import { MOCK_JOBS, Job, JobPortal, PortalListing } from "@/lib/mock-data"

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

  const MATCH_OPTIONS = ["Any", "70%+", "80%+", "90%+"]
  const TYPE_OPTIONS = ["Full-time", "Part-time", "Internship", "Contract"]
  const SALARY_OPTIONS = ["Any", "₹10+ LPA", "₹20+ LPA", "₹30+ LPA"]
  const [matchFilter, setMatchFilter] = useState("Any")
  const [typeFilter, setTypeFilter] = useState("Any")
  const [salaryFilter, setSalaryFilter] = useState("Any")

  const fullyFiltered = filtered.filter((j) => {
    const minMatch = matchFilter === "90%+" ? 90 : matchFilter === "80%+" ? 80 : matchFilter === "70%+" ? 70 : 0
    const matchOk = j.matchScore >= minMatch
    const typeOk = typeFilter === "Any" || j.type.toLowerCase().includes(typeFilter.toLowerCase())
    const salaryOk = salaryFilter === "Any" || (() => {
      const num = parseInt(salaryFilter)
      const parts = j.salary.replace(/[₹\s]/g, "").split("–")
      return parts.some((p) => parseInt(p) >= num)
    })()
    return matchOk && typeOk && salaryOk
  })

  function resetAll() {
    setActiveFilters([])
    setMatchFilter("Any")
    setTypeFilter("Any")
    setSalaryFilter("Any")
    setQuery("")
  }

  const hasActiveFilter = activeFilters.length > 0 || matchFilter !== "Any" || typeFilter !== "Any" || salaryFilter !== "Any" || query !== ""
  const activeFilterCount = activeFilters.length + (matchFilter !== "Any" ? 1 : 0) + (typeFilter !== "Any" ? 1 : 0) + (salaryFilter !== "Any" ? 1 : 0)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex-1 flex min-h-0 bg-background">

      {/* ── Desktop Filter Sidebar (collapsible) ── */}
      <aside
        className={cn(
          "hidden lg:flex flex-col flex-shrink-0 border-r border-border bg-card overflow-hidden",
          "transition-[width] duration-300 ease-in-out"
        )}
        style={{ width: sidebarOpen ? 256 : 0 }}
      >
        {/* Inner wrapper keeps fixed width so content doesn't squish during animation */}
        <div className="w-64 flex flex-col flex-1 overflow-y-auto">
          <div className="px-5 pt-5 pb-4 border-b border-border flex items-center justify-between flex-shrink-0">
            <p className="text-[13px] font-bold text-foreground">Filters</p>
            {hasActiveFilter && (
              <button onClick={resetAll} className="text-[11px] font-semibold text-primary hover:underline">
                Reset all
              </button>
            )}
          </div>

          <div className="px-5 py-4 space-y-5">

            {/* Search */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Search</p>
              <div className="relative">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                  <circle cx="5.5" cy="5.5" r="4" stroke="currentColor" strokeWidth="1.4"/>
                  <path d="M9 9L11.5 11.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
                <input type="text" value={query} onChange={(e) => setQuery(e.target.value)}
                  placeholder="Role, company, skill…"
                  className="w-full bg-background border border-border rounded-[8px] pl-8 pr-3 py-2 text-[12px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
            </div>

            {/* Quick filters */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Quick Filters</p>
              <div className="flex flex-wrap gap-1.5">
                {FILTERS.map((f) => {
                  const active = activeFilters.includes(f)
                  return (
                    <button key={f} onClick={() => toggleFilter(f)}
                      className={cn("px-2.5 py-1 rounded-full text-[11px] font-semibold transition-colors",
                        active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-accent"
                      )}
                    >{f}</button>
                  )
                })}
              </div>
            </div>

            {/* Match Score */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5">Match Score</p>
              <div className="space-y-0.5">
                {MATCH_OPTIONS.map((o) => (
                  <button key={o} onClick={() => setMatchFilter(o)}
                    className={cn("w-full text-left px-3 py-1.5 rounded-[8px] text-[12px] font-medium transition-colors flex items-center justify-between",
                      matchFilter === o ? "bg-primary/10 text-primary font-semibold" : "text-foreground hover:bg-muted"
                    )}
                  >
                    {o}
                    {matchFilter === o && <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                  </button>
                ))}
              </div>
            </div>

            {/* Job Type */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5">Job Type</p>
              <div className="space-y-0.5">
                {["Any", ...TYPE_OPTIONS].map((o) => (
                  <button key={o} onClick={() => setTypeFilter(o)}
                    className={cn("w-full text-left px-3 py-1.5 rounded-[8px] text-[12px] font-medium transition-colors flex items-center justify-between",
                      typeFilter === o ? "bg-primary/10 text-primary font-semibold" : "text-foreground hover:bg-muted"
                    )}
                  >
                    {o}
                    {typeFilter === o && <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                  </button>
                ))}
              </div>
            </div>

            {/* Salary */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5">Min Salary</p>
              <div className="space-y-0.5">
                {SALARY_OPTIONS.map((o) => (
                  <button key={o} onClick={() => setSalaryFilter(o)}
                    className={cn("w-full text-left px-3 py-1.5 rounded-[8px] text-[12px] font-medium transition-colors flex items-center justify-between",
                      salaryFilter === o ? "bg-primary/10 text-primary font-semibold" : "text-foreground hover:bg-muted"
                    )}
                  >
                    {o}
                    {salaryFilter === o && <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <div className="flex-1 overflow-y-auto min-h-0">

        {/* Mobile header */}
        <div className="lg:hidden px-4 pt-12 pb-3">
          <div className="mb-3">
            <h1 className="text-[19px] font-bold text-foreground tracking-tight">Job Companion</h1>
            <p className="text-[12px] text-muted-foreground mt-0.5 font-medium">Curated for your profile</p>
          </div>
          <div className="relative mb-3">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" className="text-muted-foreground">
                <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.5" />
                <path d="M10 10L13 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)}
              placeholder="Search jobs, companies, skills…"
              className="w-full bg-card border border-border rounded-full pl-10 pr-12 py-2.5 text-[13.5px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary transition-all shadow-card"
            />
            <button onClick={() => setShowFilterSheet(true)}
              className="absolute inset-y-0 right-2 flex items-center justify-center w-8 h-8 my-auto rounded-full bg-primary/10 text-primary btn-press tap-highlight-none">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1.5 3.5H12.5M3.5 7H10.5M6 10.5H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2.5 -mx-4 px-4" style={{ scrollbarWidth: "none" }}>
            {FILTERS.map((f) => {
              const active = activeFilters.includes(f)
              return (
                <button key={f} onClick={() => toggleFilter(f)}
                  className={cn("flex-shrink-0 px-3.5 py-1.5 rounded-full text-[11.5px] font-semibold transition-all btn-press tap-highlight-none",
                    active ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground border border-border"
                  )}>{f}</button>
              )
            })}
          </div>
        </div>

        {/* Desktop top bar */}
        <div className="hidden lg:flex items-center gap-3 px-6 pt-5 pb-4 border-b border-border">
          {/* Toggle sidebar button */}
          <button
            onClick={() => setSidebarOpen((v) => !v)}
            className={cn(
              "relative flex items-center gap-2 px-3 py-2 rounded-[10px] border text-[12px] font-semibold transition-all flex-shrink-0",
              sidebarOpen
                ? "bg-primary text-primary-foreground border-primary shadow-sm"
                : "bg-card border-border text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            {/* Panel split icon */}
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <rect x="1" y="1" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="1.4"/>
              <path d="M5.5 1V14" stroke="currentColor" strokeWidth="1.4"/>
            </svg>
            <span>{sidebarOpen ? "Hide Filters" : "Filters"}</span>
            {!sidebarOpen && activeFilterCount > 0 && (
              <span className="w-4 h-4 bg-primary rounded-full text-[9px] font-bold text-white flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>

          <div className="flex-1">
            <h1 className="text-[17px] font-bold text-foreground tracking-tight leading-none">Job Companion</h1>
            <p className="text-[11px] text-muted-foreground mt-0.5">{fullyFiltered.length} positions found</p>
          </div>

          {hasActiveFilter && (
            <button onClick={resetAll} className="text-[11px] font-semibold text-muted-foreground hover:text-foreground border border-border rounded-[8px] px-2.5 py-1.5 hover:bg-muted transition-colors">
              Clear filters
            </button>
          )}

          <div className="flex items-center gap-2">
            <span className="text-[12px] text-muted-foreground">Sort:</span>
            <select className="bg-card border border-border rounded-[8px] px-2 py-1.5 text-[12px] text-foreground focus:outline-none focus:ring-1 focus:ring-primary/30">
              <option>Best Match</option>
              <option>Latest</option>
              <option>Highest Salary</option>
            </select>
          </div>
        </div>

        {/* Cards */}
        <div className="px-4 lg:px-6 py-4">
          <p className="lg:hidden text-[11px] text-muted-foreground font-medium mb-3">{fullyFiltered.length} positions found</p>
          {fullyFiltered.length === 0 ? (
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
            <div className={cn("grid grid-cols-1 gap-3 transition-all duration-300", sidebarOpen ? "lg:grid-cols-2" : "lg:grid-cols-3")}>
              {fullyFiltered.map((job) => (
                <JobCard key={job.id} job={job}
                  bookmarked={bookmarks.has(job.id)}
                  onToggleBookmark={() => toggleBookmark(job.id)}
                  onClick={() => onJobClick(job)}
                  onApplyNow={() => onApplyNow(job)}
                />
              ))}
            </div>
          )}
        </div>
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
      <div onClick={onClick} role="button" tabIndex={0} onKeyDown={(e) => e.key === "Enter" && onClick()} className="w-full p-4 text-left tap-highlight-none active:bg-muted/40 transition-colors duration-150 cursor-pointer">
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
      </div>

      {/* Prep strip */}
      <button
        onClick={(e) => { e.stopPropagation(); onApplyNow() }}
        className="w-full px-3 py-2 flex items-center gap-2 tap-highlight-none border-t border-indigo-100 dark:border-indigo-900/40"
        style={{ background: "rgba(79,70,229,0.06)" }}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="flex-shrink-0 text-indigo-500">
          <path d="M6.5 1L7.5 4.5H11L8.5 6.5L9.5 10L6.5 8L3.5 10L4.5 6.5L2 4.5H5.5L6.5 1Z" fill="currentColor"/>
        </svg>
        <p className="flex-1 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 leading-none">
          5-Day AI Prep Plan — tailored to this role
        </p>
        <span className="text-[11px] font-bold text-indigo-500 flex-shrink-0">View →</span>
      </button>

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

function PlatformComparisonCard({ listings }: { listings: PortalListing[] }) {
  return (
    <div className="bg-card rounded-[14px] border border-border shadow-card p-4 mb-3">
      <div className="flex items-center gap-2 mb-3">
        <p className="text-[10px] font-bold uppercase tracking-widest text-primary">Also Available On</p>
        <span className="text-[9px] font-bold bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">{listings.length} portals</span>
      </div>
      <div className="space-y-2">
        {listings.map((listing) => {
          const meta = PORTAL_META[listing.portal]
          return (
            <div
              key={listing.portal}
              className={cn(
                "flex items-center gap-3 rounded-[10px] p-2.5",
                listing.recommended ? "bg-emerald-50 border border-emerald-200" : "bg-muted"
              )}
            >
              <span className={cn("inline-flex items-center gap-1 px-2 py-1 rounded-[6px] text-[10px] font-bold", meta.bg, meta.text)}>
                {listing.portal === "linkedin" ? (
                  <svg width="9" height="9" viewBox="0 0 16 16" fill="currentColor"><path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/></svg>
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-white/70 inline-block" />
                )}
                {PORTAL_META[listing.portal].label}
              </span>

              <div className="flex-1">
                <p className="text-[11px] font-semibold text-foreground">{listing.benefit}</p>
              </div>

              {listing.recommended && (
                <span className="text-[9px] font-extrabold bg-emerald-600 text-white px-1.5 py-0.5 rounded-full flex-shrink-0">Best</span>
              )}

              <button className={cn(
                "text-[10px] font-bold px-2 py-1 rounded-[7px] flex-shrink-0 tap-highlight-none btn-press",
                listing.recommended
                  ? "bg-emerald-600 text-white"
                  : "bg-muted-foreground/15 text-foreground"
              )}>
                Apply →
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Salary Comparison Card ───────────────────────────────────────────────────

function SalaryComparisonCard({ listings }: { listings: PortalListing[] }) {
  const withSalary = listings.filter(l => l.salaryMin !== undefined && l.salaryMax !== undefined)
  if (withSalary.length < 2) return null

  const globalMin = Math.min(...withSalary.map(l => l.salaryMin!))
  const globalMax = Math.max(...withSalary.map(l => l.salaryMax!))
  const spread = globalMax - globalMin || 1

  const highestMaxPortal = withSalary.reduce((a, b) => (b.salaryMax! > a.salaryMax! ? b : a))

  const barColors = ["bg-primary", "bg-emerald-500", "bg-amber-500", "bg-rose-500"]

  return (
    <div className="bg-card rounded-[14px] border border-border shadow-card p-4 mb-3">
      {/* Header */}
      <div className="flex items-start justify-between mb-1">
        <div>
          <div className="flex items-center gap-1.5 mb-0.5">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <circle cx="6.5" cy="6.5" r="5.5" stroke="currentColor" strokeWidth="1.2" className="text-primary"/>
              <path d="M6.5 3.5V6.5L8.5 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" className="text-primary"/>
            </svg>
            <p className="text-[10px] font-bold uppercase tracking-widest text-primary">Salary Across Portals</p>
          </div>
          <p className="text-[10.5px] text-muted-foreground">Same role, different listed salaries — use this to negotiate</p>
        </div>
        <span className="flex-shrink-0 text-[8.5px] font-extrabold px-1.5 py-0.5 rounded-full bg-violet-50 text-violet-700 border border-violet-200 uppercase tracking-wide ml-2">
          Aggregator Data
        </span>
      </div>

      {/* Scale labels */}
      <div className="flex justify-between mt-3 mb-1 px-0.5">
        <span className="text-[9px] text-muted-foreground font-semibold">₹{globalMin} LPA</span>
        <span className="text-[9px] text-muted-foreground font-semibold">₹{globalMax} LPA</span>
      </div>

      {/* Per-portal range bars */}
      <div className="space-y-3 mb-4">
        {withSalary.map((l, i) => {
          const leftPct  = ((l.salaryMin! - globalMin) / spread) * 100
          const widthPct = ((l.salaryMax! - l.salaryMin!) / spread) * 100
          const isHighest = l.portal === highestMaxPortal.portal
          return (
            <div key={l.portal}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1.5">
                  <PortalBadge portal={l.portal} />
                  {isHighest && (
                    <span className="text-[8.5px] font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded-full">
                      Highest ↑
                    </span>
                  )}
                </div>
                <span className="text-[11px] font-bold text-foreground">
                  ₹{l.salaryMin}–{l.salaryMax} <span className="text-[9px] font-semibold text-muted-foreground">LPA</span>
                </span>
              </div>
              {/* Range bar on shared scale */}
              <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={cn("absolute h-full rounded-full opacity-80", barColors[i % barColors.length])}
                  style={{ left: `${leftPct}%`, width: `${widthPct}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>

      {/* Summary insight */}
      <div className="bg-amber-50 border border-amber-100 rounded-[10px] px-3 py-2.5 flex items-start gap-2">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0 mt-0.5">
          <circle cx="7" cy="7" r="5.5" stroke="#F59E0B" strokeWidth="1.3"/>
          <path d="M7 4.5V7.5" stroke="#F59E0B" strokeWidth="1.4" strokeLinecap="round"/>
          <circle cx="7" cy="9.5" r="0.6" fill="#F59E0B"/>
        </svg>
        <p className="text-[11px] text-amber-800 leading-relaxed">
          <span className="font-bold">{PORTAL_META[highestMaxPortal.portal].label}</span> shows the highest ceiling at <span className="font-bold">₹{highestMaxPortal.salaryMax} LPA</span> — reference this when negotiating your offer.
        </p>
      </div>
    </div>
  )
}

// ─── YouTube Video Recommendations ───────────────────────────────────────────

type VideoRec = {
  title: string
  channel: string
  views: string
  duration: string
  thumb: string   // tailwind gradient classes for the thumbnail bg
  channelColor: string
}

const VIDEO_POOL: Record<string, VideoRec[]> = {
  ml: [
    { title: "ML System Design Interview — End to End", channel: "Gaurav Sen", views: "1.8M views", duration: "31:22", thumb: "from-violet-500 to-indigo-600", channelColor: "bg-violet-500" },
    { title: "Fine-Tuning LLMs with LoRA — Full Guide", channel: "Andrej Karpathy", views: "3.2M views", duration: "45:18", thumb: "from-indigo-500 to-purple-700", channelColor: "bg-indigo-500" },
    { title: "PyTorch in 60 Minutes — Deep Dive", channel: "PyTorch Official", views: "980K views", duration: "59:44", thumb: "from-orange-500 to-red-600", channelColor: "bg-orange-500" },
    { title: "RLHF Explained — How ChatGPT is Trained", channel: "Yannic Kilcher", views: "2.1M views", duration: "22:07", thumb: "from-emerald-500 to-teal-600", channelColor: "bg-emerald-500" },
  ],
  data: [
    { title: "SQL for Data Scientists — Complete Course", channel: "Alex The Analyst", views: "1.4M views", duration: "4:12:00", thumb: "from-blue-500 to-cyan-600", channelColor: "bg-blue-500" },
    { title: "Feature Engineering Masterclass", channel: "StatQuest", views: "856K views", duration: "38:55", thumb: "from-teal-500 to-green-600", channelColor: "bg-teal-500" },
    { title: "EDA in Python — Pandas & Seaborn", channel: "Corey Schafer", views: "1.1M views", duration: "52:30", thumb: "from-cyan-500 to-blue-700", channelColor: "bg-cyan-500" },
    { title: "A/B Testing — Statistical Significance", channel: "Cassie Kozyrkov", views: "678K views", duration: "18:42", thumb: "from-violet-500 to-pink-600", channelColor: "bg-violet-500" },
  ],
  backend: [
    { title: "System Design Interview — Top 10 Concepts", channel: "Gaurav Sen", views: "5.3M views", duration: "26:14", thumb: "from-slate-600 to-gray-800", channelColor: "bg-slate-600" },
    { title: "Distributed Systems in 26 Minutes", channel: "ByteByteGo", views: "2.9M views", duration: "26:00", thumb: "from-blue-600 to-indigo-700", channelColor: "bg-blue-600" },
    { title: "Kafka — Event Streaming Explained", channel: "Confluent", views: "740K views", duration: "34:12", thumb: "from-rose-500 to-red-700", channelColor: "bg-rose-500" },
    { title: "AWS Solutions Architect — Key Services", channel: "FreeCodeCamp", views: "3.8M views", duration: "2:42:31", thumb: "from-amber-500 to-orange-600", channelColor: "bg-amber-500" },
  ],
  frontend: [
    { title: "React 19 — All New Features Explained", channel: "Theo — t3.gg", views: "920K views", duration: "28:44", thumb: "from-cyan-500 to-blue-600", channelColor: "bg-cyan-500" },
    { title: "TypeScript Full Course for Beginners", channel: "Matt Pocock", views: "1.6M views", duration: "1:32:17", thumb: "from-blue-500 to-indigo-600", channelColor: "bg-blue-500" },
    { title: "CSS Grid & Flexbox — Deep Dive", channel: "Kevin Powell", views: "2.1M views", duration: "41:55", thumb: "from-pink-500 to-rose-600", channelColor: "bg-pink-500" },
    { title: "Figma to React — Component Workflow", channel: "DesignCourse", views: "488K views", duration: "22:18", thumb: "from-violet-500 to-fuchsia-600", channelColor: "bg-violet-500" },
  ],
  general: [
    { title: "How to Crack Any Tech Interview in 2024", channel: "NeetCode", views: "4.2M views", duration: "19:33", thumb: "from-emerald-500 to-green-700", channelColor: "bg-emerald-500" },
    { title: "Resume Tips That Got Me into Google", channel: "Clement Mihailescu", views: "2.7M views", duration: "14:08", thumb: "from-amber-500 to-yellow-600", channelColor: "bg-amber-500" },
    { title: "STAR Method — Behavioral Interviews", channel: "Self Made Millennial", views: "1.3M views", duration: "11:22", thumb: "from-blue-500 to-violet-600", channelColor: "bg-blue-500" },
  ],
}

function getJobVideos(job: Job): VideoRec[] {
  const t = job.title.toLowerCase()
  if (t.includes("ml") || t.includes("machine learning") || t.includes("ai") || t.includes("deep learning") || t.includes("llm")) return VIDEO_POOL.ml
  if (t.includes("data scientist") || t.includes("data science") || t.includes("analytics")) return VIDEO_POOL.data
  if (t.includes("frontend") || t.includes("react") || t.includes("ui") || t.includes("ux")) return VIDEO_POOL.frontend
  if (t.includes("backend") || t.includes("sde") || t.includes("software engineer") || t.includes("full stack")) return VIDEO_POOL.backend
  // fallback: mix from skills
  const skillLower = job.skills.join(" ").toLowerCase()
  if (skillLower.includes("python") || skillLower.includes("pytorch") || skillLower.includes("tensorflow")) return VIDEO_POOL.ml
  if (skillLower.includes("react") || skillLower.includes("vue") || skillLower.includes("css")) return VIDEO_POOL.frontend
  if (skillLower.includes("java") || skillLower.includes("golang") || skillLower.includes("aws")) return VIDEO_POOL.backend
  return VIDEO_POOL.general
}

// ─── Consultant Mock Data ─────────────────────────────────────────────────────

type Consultant = {
  name: string
  title: string
  company: string
  avatar: string
  rating: number
  sessions: number
  tags: string[]
  slots: string[]
}

function getConsultant(job: Job): Consultant {
  const t = job.title.toLowerCase()
  const s = job.skills.slice(0, 3)

  if (t.includes("ml") || t.includes("machine learning") || t.includes("ai") || t.includes("deep learning")) {
    return { name: "Priya Mehta", title: "ML Lead", company: "Ex-Google Brain", avatar: "bg-violet-500", rating: 4.9, sessions: 214, tags: s.length ? s : ["PyTorch", "LLMs", "MLOps"], slots: ["Today 6 PM", "Tomorrow 11 AM", "Thu 4 PM"] }
  }
  if (t.includes("data scientist") || t.includes("data science") || t.includes("analytics")) {
    return { name: "Rohan Kapoor", title: "Senior Data Scientist", company: "Ex-Microsoft", avatar: "bg-blue-500", rating: 4.9, sessions: 178, tags: s.length ? s : ["Python", "SQL", "Power BI"], slots: ["Today 7 PM", "Wed 10 AM", "Fri 3 PM"] }
  }
  if (t.includes("frontend") || t.includes("react") || t.includes("ui") || t.includes("ux")) {
    return { name: "Meera Nair", title: "Senior Frontend Engineer", company: "Ex-Flipkart", avatar: "bg-pink-500", rating: 4.8, sessions: 132, tags: s.length ? s : ["React", "TypeScript", "Figma"], slots: ["Tomorrow 12 PM", "Thu 5 PM", "Sat 10 AM"] }
  }
  if (t.includes("backend") || t.includes("sde") || t.includes("software engineer") || t.includes("full")) {
    return { name: "Vikram Iyer", title: "Principal Engineer", company: "Ex-Amazon", avatar: "bg-emerald-600", rating: 4.9, sessions: 289, tags: s.length ? s : ["System Design", "Java", "AWS"], slots: ["Today 8 PM", "Wed 2 PM", "Thu 6 PM"] }
  }
  if (t.includes("product") || t.includes("pm")) {
    return { name: "Kabir Singh", title: "Group Product Manager", company: "Ex-Swiggy", avatar: "bg-amber-500", rating: 4.8, sessions: 156, tags: ["Product Strategy", "Roadmapping", "GTM"], slots: ["Tomorrow 3 PM", "Fri 11 AM", "Sat 4 PM"] }
  }
  return { name: "Ananya Bose", title: "Engineering Manager", company: "Ex-Razorpay", avatar: "bg-cyan-600", rating: 4.7, sessions: 98, tags: s.length ? s : ["Leadership", "System Design", "Scaling"], slots: ["Tomorrow 5 PM", "Thu 10 AM", "Fri 7 PM"] }
}

// ─── Company Reviews Mock Data ────────────────────────────────────────────────

function getCompanyData(company: string) {
  const seed = company.split("").reduce((a, c) => a + c.charCodeAt(0), 0)
  const mod = (n: number) => seed % n

  const base = 3.8 + (mod(7) * 0.06)
  const rating = Math.round(base * 10) / 10

  const cultureScores: [string, number][] = [
    ["Work-Life Balance", Math.round((3.4 + mod(7) * 0.1) * 10) / 10],
    ["Career Growth",     Math.round((3.7 + mod(5) * 0.12) * 10) / 10],
    ["Team Culture",      Math.round((3.9 + mod(4) * 0.1) * 10) / 10],
    ["Management",        Math.round((3.5 + mod(6) * 0.1) * 10) / 10],
  ]

  const tagSets = [
    ["Great learning", "Competitive pay", "Fast-paced", "Modern tech"],
    ["Remote friendly", "Good benefits", "Team events", "Open culture"],
    ["Strong mentorship", "Innovation driven", "Collaborative", "Growth paths"],
  ]
  const cultureTags = tagSets[mod(3)]

  const reviewPool = [
    { stars: 5, text: "Amazing culture and supportive management. Learning opportunities are excellent and the team is top-notch.", role: "Software Engineer", tenure: "2 yrs" },
    { stars: 4, text: "Good place to grow your career. Work-life balance can get stretched during deadlines but overall it's manageable.", role: "Product Manager", tenure: "1.5 yrs" },
    { stars: 4, text: "Excellent tech stack and brilliant colleagues. Onboarding was smooth and HR is very responsive.", role: "ML Engineer", tenure: "8 mo" },
    { stars: 5, text: "Best company I've worked at. Leadership genuinely listens, culture is collaborative, and growth paths are real.", role: "Backend Developer", tenure: "3 yrs" },
    { stars: 3, text: "Decent salary but growth can be slow. The projects are interesting and the tech is modern.", role: "Data Scientist", tenure: "1 yr" },
    { stars: 4, text: "Great work environment. The team is smart and the leadership is transparent about company direction.", role: "Frontend Engineer", tenure: "14 mo" },
  ]
  const r1 = mod(reviewPool.length)
  const r2 = (r1 + 2) % reviewPool.length
  const ago = ["2 wks ago", "1 mo ago", "3 mo ago"]

  return {
    rating,
    totalReviews: 80 + mod(220),
    cultureScores,
    cultureTags,
    reviews: [
      { ...reviewPool[r1], ago: ago[mod(3)] },
      { ...reviewPool[r2], ago: ago[(mod(3) + 1) % 3] },
    ],
  }
}

function StarRow({ count, size = 12, color = "#F59E0B" }: { count: number; size?: number; color?: string }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 12 12" fill={i <= count ? color : "#E5E7EB"}>
          <path d="M6 1L7.3 4.2H11L8.2 6L9.3 9.5L6 7.6L2.7 9.5L3.8 6L1 4.2H4.7L6 1Z" />
        </svg>
      ))}
    </div>
  )
}

function JobDetail({ job, onBack, onApplyNow }: { job: Job; onBack: () => void; onApplyNow: () => void }) {
  const { bookmarks, toggleBookmark, navigate, setSalaryRole, isPro, showToast } = useApp()
  const bookmarked = bookmarks.has(job.id)
  const matchColor = job.matchScore >= 85 ? "text-emerald-600 bg-emerald-50" : "text-amber-600 bg-amber-50"
  const companyData = getCompanyData(job.company)
  const consultant = getConsultant(job)
  const videos = getJobVideos(job)
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const [booked, setBooked] = useState(false)

  function handleBook() {
    if (!selectedSlot) return
    setBooked(true)
    showToast(`Session booked with ${consultant.name} · ${selectedSlot}`, "success")
  }

  return (
    <div className="flex-1 flex flex-col bg-background min-h-0">
      <div className="px-4 lg:px-8 pt-12 lg:pt-6 pb-4 flex-shrink-0">
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
          <button
            onClick={() => { setSalaryRole(job.title.split(" ")[0] === "SDE" ? "SDE II" : job.title.includes("ML") ? "ML Engineer" : job.title.includes("Data") ? "Data Scientist" : "Backend Engineer"); navigate("salary-intel") }}
            className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary tap-highlight-none btn-press flex items-center gap-1"
          >
            {job.salary}
            <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M4.5 1.5L7.5 4.5L4.5 7.5M7.5 4.5H1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto min-h-0 px-4 lg:px-8 pb-6">
        <div className="bg-card rounded-[14px] border border-border shadow-card p-4 mb-3">
          <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2">About the Role</p>
          <p className="text-[13px] text-foreground leading-relaxed">{job.description}</p>
        </div>
        {/* Salary Comparison — shown early so user sees it before scrolling */}
        {job.portalListings && job.portalListings.some(l => l.salaryMin !== undefined) && (
          <SalaryComparisonCard listings={job.portalListings} />
        )}

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
        {/* YouTube Video Recommendations */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              {/* YouTube logo */}
              <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
                <rect width="20" height="14" rx="3" fill="#FF0000"/>
                <path d="M8 4L14 7L8 10V4Z" fill="white"/>
              </svg>
              <p className="text-[13px] font-bold text-foreground">Watch &amp; Learn</p>
            </div>
            <span className="text-[10px] text-muted-foreground font-medium">Tailored to this role</span>
          </div>

          {/* Horizontal scroll row */}
          <div className="flex gap-3 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
            {videos.map((v, i) => (
              <div key={i} className="flex-shrink-0 w-44 cursor-pointer group">
                {/* Thumbnail */}
                <div className={cn("w-full h-24 rounded-[12px] bg-gradient-to-br flex items-center justify-center relative overflow-hidden mb-2", v.thumb)}>
                  {/* Play button */}
                  <div className="w-9 h-9 rounded-full bg-black/50 flex items-center justify-center group-hover:bg-black/70 transition-colors">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M5 3L11 7L5 11V3Z" fill="white"/>
                    </svg>
                  </div>
                  {/* Duration badge */}
                  <span className="absolute bottom-1.5 right-1.5 bg-black/80 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-[5px]">
                    {v.duration}
                  </span>
                </div>
                {/* Info */}
                <div className="flex gap-1.5">
                  <div className={cn("w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-white text-[8px] font-extrabold mt-0.5", v.channelColor)}>
                    {v.channel[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-semibold text-foreground leading-tight line-clamp-2">{v.title}</p>
                    <p className="text-[9.5px] text-muted-foreground mt-0.5">{v.channel}</p>
                    <p className="text-[9px] text-muted-foreground/70">{v.views}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Company Culture & Employee Reviews */}
        <div className="bg-card rounded-[14px] border border-border shadow-card p-4 mb-3">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <p className="text-[10px] font-bold uppercase tracking-widest text-primary">Culture &amp; Reviews</p>
            <span className="text-[10px] text-muted-foreground font-medium">{companyData.totalReviews} employees</span>
          </div>

          {/* Rating + stars */}
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border">
            <div className="w-16 h-16 rounded-[14px] bg-amber-50 border border-amber-100 flex flex-col items-center justify-center flex-shrink-0">
              <span className="text-[26px] font-extrabold text-amber-600 leading-none">{companyData.rating}</span>
              <span className="text-[9px] text-amber-500 font-semibold mt-0.5">out of 5</span>
            </div>
            <div>
              <StarRow count={Math.round(companyData.rating)} size={16} />
              <p className="text-[11px] text-foreground font-semibold mt-1">{companyData.rating >= 4.2 ? "Highly Rated" : companyData.rating >= 3.8 ? "Well Rated" : "Mixed Reviews"}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">Based on verified employee reviews</p>
            </div>
          </div>

          {/* Culture score bars */}
          <div className="space-y-3 mb-4">
            {companyData.cultureScores.map(([label, score]) => (
              <div key={label} className="flex items-center gap-3">
                <span className="text-[11px] font-semibold text-muted-foreground w-32 flex-shrink-0">{label}</span>
                <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${(score / 5) * 100}%` }}
                  />
                </div>
                <span className="text-[11px] font-bold text-foreground w-6 text-right flex-shrink-0">{score.toFixed(1)}</span>
              </div>
            ))}
          </div>

          {/* Culture tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {companyData.cultureTags.map((tag) => (
              <span key={tag} className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M1.5 4.5L3.5 6.5L7.5 2.5" stroke="#059669" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                {tag}
              </span>
            ))}
          </div>

          {/* Employee Reviews */}
          <p className="text-[11px] font-bold text-foreground mb-2.5">What employees say</p>
          <div className="space-y-2.5">
            {companyData.reviews.map((r, i) => (
              <div key={i} className="bg-muted/50 rounded-[11px] p-3">
                <div className="flex items-center justify-between mb-1.5">
                  <StarRow count={r.stars} size={11} />
                  <span className="text-[9.5px] text-muted-foreground font-medium">{r.ago}</span>
                </div>
                <p className="text-[12px] text-foreground leading-relaxed mb-1.5">"{r.text}"</p>
                <p className="text-[10px] text-muted-foreground font-semibold">{r.role} · {r.tenure}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Platform Comparison */}
        {job.portalListings && job.portalListings.length >= 2 && (
          <PlatformComparisonCard listings={job.portalListings} />
        )}

        {/* Consultant Booking */}
        {isPro ? (
          <div className="bg-card rounded-[14px] border border-border shadow-card mb-3 overflow-hidden">
            {/* Header */}
            <div className="px-4 pt-4 pb-3 flex items-center justify-between border-b border-border">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-primary">Expert Consultation</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">1-on-1 session tailored to this role</p>
              </div>
              <span className="text-[9px] font-extrabold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 uppercase tracking-wide">
                Pro
              </span>
            </div>

            <div className="p-4">
              {booked ? (
                /* Confirmed state */
                <div className="text-center py-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-3">
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="9" stroke="#10B981" strokeWidth="1.8"/><path d="M7 11L10 14L15 8.5" stroke="#10B981" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <p className="text-[14px] font-bold text-foreground mb-0.5">Session Confirmed!</p>
                  <p className="text-[12px] text-muted-foreground">with {consultant.name} · <span className="font-semibold text-primary">{selectedSlot}</span></p>
                  <button onClick={() => { setBooked(false); setSelectedSlot(null) }} className="mt-3 text-[11px] text-muted-foreground underline">Change slot</button>
                </div>
              ) : (
                <>
                  {/* Consultant profile */}
                  <div className="flex items-center gap-3 mb-3.5">
                    <div className={cn("w-12 h-12 rounded-full flex items-center justify-center text-white text-[15px] font-extrabold flex-shrink-0", consultant.avatar)}>
                      {consultant.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] font-bold text-foreground leading-tight">{consultant.name}</p>
                      <p className="text-[11px] text-muted-foreground font-medium">{consultant.title} · <span className="text-foreground font-semibold">{consultant.company}</span></p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <StarRow count={Math.round(consultant.rating)} size={10} />
                        <span className="text-[10px] font-bold text-amber-600">{consultant.rating}</span>
                        <span className="text-[10px] text-muted-foreground">· {consultant.sessions} sessions</span>
                      </div>
                    </div>
                  </div>

                  {/* Specialty tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {consultant.tags.map((tag) => (
                      <span key={tag} className="text-[10.5px] font-semibold px-2 py-0.5 rounded-full bg-accent text-accent-foreground">{tag}</span>
                    ))}
                  </div>

                  {/* Slot picker */}
                  <p className="text-[11px] font-bold text-foreground mb-2">Pick a slot</p>
                  <div className="flex gap-2 mb-4 flex-wrap">
                    {consultant.slots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setSelectedSlot(slot)}
                        className={cn(
                          "px-3 py-1.5 rounded-[10px] text-[11px] font-semibold border transition-all tap-highlight-none",
                          selectedSlot === slot
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-muted text-foreground border-border hover:border-primary/50"
                        )}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>

                  {/* Book CTA */}
                  <button
                    onClick={handleBook}
                    disabled={!selectedSlot}
                    className={cn(
                      "w-full py-2.5 rounded-[12px] text-[13px] font-bold transition-all btn-press tap-highlight-none flex items-center justify-center gap-2",
                      selectedSlot
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "bg-muted text-muted-foreground cursor-not-allowed"
                    )}
                  >
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><rect x="2" y="3" width="11" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.3"/><path d="M5 2V4.5M10 2V4.5M2 6.5H13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
                    {selectedSlot ? `Book · ${selectedSlot}` : "Select a slot to book"}
                    {selectedSlot && <span className="text-[10px] opacity-75">· Free with Pro</span>}
                  </button>
                </>
              )}
            </div>
          </div>
        ) : (
          /* Locked for non-Pro users */
          <div className="bg-card rounded-[14px] border border-border shadow-card mb-3 overflow-hidden relative">
            <div className="px-4 pt-4 pb-3 flex items-center justify-between border-b border-border">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Expert Consultation</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">1-on-1 session tailored to this role</p>
              </div>
              <span className="text-[9px] font-extrabold px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border uppercase tracking-wide">
                Pro Only
              </span>
            </div>
            <div className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2.5C6.51 2.5 4.5 4.51 4.5 7V8.5H3.5V15.5H14.5V8.5H13.5V7C13.5 4.51 11.49 2.5 9 2.5ZM9 4C10.66 4 12 5.34 12 7V8.5H6V7C6 5.34 7.34 4 9 4Z" fill="currentColor" className="text-muted-foreground"/></svg>
              </div>
              <div className="flex-1">
                <p className="text-[13px] font-semibold text-foreground">Unlock Expert Sessions</p>
                <p className="text-[11px] text-muted-foreground">Book role-specific 1:1 calls with ex-FAANG mentors</p>
              </div>
              <button className="flex-shrink-0 bg-primary text-primary-foreground text-[11px] font-bold px-3 py-1.5 rounded-[9px] btn-press">
                Upgrade
              </button>
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

      <div className="flex-shrink-0 px-4 pb-5 pt-3 bg-background border-t border-border">
        <div className="flex gap-3">
          <button
            onClick={() => navigate("resume-tailor")}
            className="flex-1 py-3.5 rounded-[14px] border-2 border-primary text-primary text-[13px] font-bold btn-press flex items-center justify-center gap-1.5"
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M3 3h6l3 3v7a1 1 0 01-1 1H3a1 1 0 01-1-1V4a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
              <path d="M9 3v3h3M6 8h3M6 10.5h3M5 5.5h1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              <circle cx="11.5" cy="11.5" r="2.5" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M10.8 11.5h1.4M11.5 10.8v1.4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            Build Resume
          </button>
          <button
            onClick={onApplyNow}
            className="flex-1 py-3.5 rounded-[14px] bg-primary text-primary-foreground text-[13px] font-bold shadow-card btn-press"
          >
            Prep Plan & Apply →
          </button>
        </div>
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
    <div className="flex-1 flex flex-col bg-background min-h-0 relative">
      {/* Header */}
      <div className="px-4 lg:px-8 pt-12 lg:pt-6 pb-4 border-b border-border flex-shrink-0">
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

      <div className="flex-1 overflow-y-auto min-h-0 px-4 py-4 pb-36">
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
    <div className="flex-1 flex flex-col overflow-hidden relative min-h-0">
      {subScreen === "list" && <JobList onJobClick={openDetail} onApplyNow={openApplyDetail} />}
      {subScreen === "detail" && selectedJob && <JobDetail job={selectedJob} onBack={handleBack} onApplyNow={() => openApplyDetail(selectedJob)} />}
      {subScreen === "apply-detail" && selectedJob && <ApplyDetail job={selectedJob} onBack={handleBack} onConfirm={() => setConfirmJob(selectedJob)} />}
      {confirmJob && <ApplyConfirm job={confirmJob} onClose={() => setConfirmJob(null)} />}
    </div>
  )
}
