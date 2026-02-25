"use client"

import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { useApp } from "@/lib/app-context"
import { MOCK_JOBS, Job } from "@/lib/mock-data"

type SubScreen = "list" | "detail" | "smart-apply" | "apply-confirm"

const FILTERS = ["Remote", "Full-time", "Internship", "High Match", "Saved"]

function BackButton({ onBack, label = "Back" }: { onBack: () => void; label?: string }) {
  return (
    <button onClick={onBack} className="flex items-center gap-1.5 text-primary text-[14px] font-semibold btn-press tap-highlight-none mb-1">
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M11 4L6 9L11 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {label}
    </button>
  )
}

// ─── Job List ──────────────────────────────────────────────────

function JobList({ onJobClick, onApply }: { onJobClick: (j: Job) => void; onApply: (j: Job) => void }) {
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
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Job Companion</h1>
          <p className="text-sm text-muted-foreground mt-0.5 font-medium">Find your next opportunity</p>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-muted-foreground">
              <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M10.5 10.5L13.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search jobs, companies, skills…"
            className="w-full bg-card border border-border rounded-full pl-10 pr-12 py-3 text-[14px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200 shadow-card"
          />
          <button
            onClick={() => setShowFilterSheet(true)}
            className="absolute inset-y-0 right-2 flex items-center justify-center w-9 h-9 my-auto rounded-full bg-primary/10 text-primary btn-press"
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M2 4H13M4 7.5H11M6.5 11H8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
          {query && (
            <button onClick={() => setQuery("")} className="absolute inset-y-0 right-12 flex items-center text-muted-foreground pr-1">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 3L11 11M11 3L3 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          )}
        </div>

        {/* Filter chips */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-4 -mx-4 px-4" style={{ scrollbarWidth: "none" }}>
          {FILTERS.map((f) => {
            const active = activeFilters.includes(f)
            return (
              <button
                key={f}
                onClick={() => toggleFilter(f)}
                className={cn(
                  "flex-shrink-0 px-3.5 py-1.5 rounded-full text-[12px] font-semibold transition-all duration-200 btn-press",
                  active ? "bg-primary text-primary-foreground shadow-card" : "bg-card text-muted-foreground border border-border"
                )}
              >
                {f}
              </button>
            )
          })}
        </div>

        {/* Results count */}
        <p className="text-[11px] text-muted-foreground font-medium mb-3">{filtered.length} positions found</p>

        {/* Job Grid */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="text-muted-foreground">
                <circle cx="13" cy="13" r="8" stroke="currentColor" strokeWidth="1.6"/>
                <path d="M19 19L24 24" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
              </svg>
            </div>
            <p className="text-[14px] font-semibold text-foreground">No jobs found</p>
            <p className="text-[12px] text-muted-foreground mt-1">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filtered.map((job) => (
              <JobCard key={job.id} job={job} bookmarked={bookmarks.has(job.id)} onToggleBookmark={() => toggleBookmark(job.id)} onClick={() => onJobClick(job)} onApply={() => onApply(job)} />
            ))}
          </div>
        )}
      </div>

      {/* Filter Bottom Sheet */}
      {showFilterSheet && (
        <FilterSheet activeFilters={activeFilters} onToggle={toggleFilter} onClose={() => setShowFilterSheet(false)} />
      )}
    </div>
  )
}

// ─── Job Card ─────────────────────────────────────────────────

function JobCard({ job, bookmarked, onToggleBookmark, onClick, onApply }: {
  job: Job; bookmarked: boolean; onToggleBookmark: () => void; onClick: () => void; onApply: () => void
}) {
  const [heartAnim, setHeartAnim] = useState(false)

  function handleBookmark(e: React.MouseEvent) {
    e.stopPropagation()
    setHeartAnim(true)
    onToggleBookmark()
    setTimeout(() => setHeartAnim(false), 400)
  }

  const matchColor = job.matchScore >= 85 ? "text-emerald-600 bg-emerald-50" : job.matchScore >= 70 ? "text-amber-600 bg-amber-50" : "text-orange-600 bg-orange-50"

  return (
    <div className="bg-card rounded-[14px] border border-border shadow-card overflow-hidden flex flex-col">
      <button onClick={onClick} className="p-3.5 flex-1 text-left card-tap">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1 min-w-0 pr-1">
            <p className="text-[12px] font-bold text-foreground leading-tight text-balance">{job.title}</p>
            <p className="text-[10px] text-muted-foreground mt-0.5 font-medium">{job.company}</p>
          </div>
          <button
            onClick={handleBookmark}
            className={cn("w-7 h-7 flex items-center justify-center rounded-full flex-shrink-0 transition-all duration-200 tap-highlight-none", heartAnim ? "scale-125" : "scale-100")}
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill={bookmarked ? "currentColor" : "none"} className={bookmarked ? "text-primary" : "text-muted-foreground"}>
              <path d="M7.5 13S2 9.5 2 5.5C2 3.57 3.57 2 5.5 2C6.5 2 7.5 2.6 7.5 2.6C7.5 2.6 8.5 2 9.5 2C11.43 2 13 3.57 13 5.5C13 9.5 7.5 13 7.5 13Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        <div className="flex items-center gap-1 mb-2">
          <svg width="9" height="9" viewBox="0 0 9 9" fill="none" className="text-muted-foreground flex-shrink-0">
            <path d="M4.5 1C3.12 1 2 2.12 2 3.5C2 5.5 4.5 8 4.5 8S7 5.5 7 3.5C7 2.12 5.88 1 4.5 1Z" stroke="currentColor" strokeWidth="1.1"/>
            <circle cx="4.5" cy="3.5" r="0.8" fill="currentColor"/>
          </svg>
          <p className="text-[9.5px] text-muted-foreground font-medium truncate">{job.isRemote ? "Remote" : job.location}</p>
        </div>
        <div className="flex flex-wrap gap-1 mb-2">
          {job.skills.slice(0, 2).map((s) => (
            <span key={s} className="text-[9.5px] font-semibold px-1.5 py-0.5 rounded-full bg-accent text-accent-foreground">{s}</span>
          ))}
        </div>
        <span className={cn("text-[9px] font-bold px-2 py-0.5 rounded-full", matchColor)}>
          {job.matchScore}% Match
        </span>
      </button>

      <div className="flex border-t border-border">
        <button
          onClick={onClick}
          className="flex-1 py-2.5 text-[11px] font-semibold text-foreground transition-colors duration-200 active:bg-muted border-r border-border"
        >
          View Details
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onApply() }}
          className="flex-1 py-2.5 text-[11px] font-bold text-primary-foreground bg-primary transition-all duration-200 active:opacity-90"
        >
          Apply Now
        </button>
      </div>
    </div>
  )
}

// ─── Filter Bottom Sheet ──────────────────────────────────────

function FilterSheet({ activeFilters, onToggle, onClose }: { activeFilters: string[]; onToggle: (f: string) => void; onClose: () => void }) {
  return (
    <>
      <div className="absolute inset-0 bg-black/30 z-40" onClick={onClose} />
      <div className="absolute bottom-0 left-0 right-0 bg-card rounded-t-[24px] z-50 animate-in slide-in-from-bottom-8 duration-300 pb-6">
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-border">
          <h3 className="text-[15px] font-bold text-foreground">Filter Jobs</h3>
          <button onClick={onClose} className="w-7 h-7 rounded-full bg-muted flex items-center justify-center btn-press">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 2L10 10M10 2L2 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        <div className="px-5 pt-4">
          <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest mb-3">Job Type</p>
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
          <button
            onClick={onClose}
            className="w-full mt-6 py-3.5 rounded-[12px] bg-primary text-primary-foreground text-[14px] font-bold shadow-card btn-press"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </>
  )
}

// ─── Job Detail ───────────────────────────────────────────────

function JobDetail({ job, onBack, onSmartApply }: { job: Job; onBack: () => void; onSmartApply: () => void }) {
  const { bookmarks, toggleBookmark, setPrepJobId, setActiveTab, navigate } = useApp()
  const bookmarked = bookmarks.has(job.id)
  const matchColor = job.matchScore >= 85 ? "text-emerald-600 bg-emerald-50" : "text-amber-600 bg-amber-50"

  return (
    <div className="flex-1 flex flex-col bg-background">
      <div className="px-4 pt-14 pb-4 flex-shrink-0">
        <BackButton onBack={onBack} label="Jobs" />
        <div className="flex items-start justify-between">
          <div className="flex-1 pr-3">
            <h1 className="text-xl font-bold text-foreground leading-tight">{job.title}</h1>
            <p className="text-[13px] text-muted-foreground mt-0.5 font-medium">{job.company} · {job.isRemote ? "Remote" : job.location}</p>
          </div>
          <div className={cn("w-12 h-12 rounded-[12px] flex items-center justify-center text-[13px] font-bold flex-shrink-0", job.color)}>
            {job.initials}
          </div>
        </div>

        <div className="flex items-center gap-2 mt-3 flex-wrap">
          <span className={cn("text-[11px] font-bold px-2.5 py-1 rounded-full", matchColor)}>{job.matchScore}% Match</span>
          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-accent text-accent-foreground">{job.type}</span>
          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-accent text-accent-foreground">{job.salary}</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-32">
        {/* Description */}
        <div className="bg-card rounded-[14px] border border-border shadow-card p-4 mb-4">
          <p className="text-[11px] font-bold uppercase tracking-widest text-primary mb-2">About the Role</p>
          <p className="text-[13px] text-foreground leading-relaxed">{job.description}</p>
        </div>

        {/* Required Skills */}
        <div className="bg-card rounded-[14px] border border-border shadow-card p-4 mb-4">
          <p className="text-[11px] font-bold uppercase tracking-widest text-primary mb-3">Required Skills</p>
          <div className="flex flex-wrap gap-1.5">
            {job.skills.map((s) => (
              <span key={s} className="text-[12px] font-semibold px-3 py-1.5 rounded-full bg-accent text-accent-foreground">{s}</span>
            ))}
          </div>
        </div>

        {/* Missing Skills */}
        {job.missingSkills.length > 0 && (
          <div className="bg-amber-50 rounded-[14px] border border-amber-200 p-4 mb-4">
            <p className="text-[11px] font-bold uppercase tracking-widest text-amber-700 mb-2">Skills to Develop</p>
            <div className="flex flex-wrap gap-1.5">
              {job.missingSkills.map((s) => (
                <span key={s} className="text-[12px] font-semibold px-3 py-1.5 rounded-full bg-amber-100 text-amber-700">{s}</span>
              ))}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={() => { setPrepJobId(job.id); setActiveTab("preparation") }}
            className="bg-card rounded-[14px] border border-border shadow-card p-3.5 text-left card-tap"
          >
            <div className="w-8 h-8 rounded-[8px] bg-accent flex items-center justify-center text-primary mb-2">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.4"/><path d="M5.5 8L7 9.5L10.5 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <p className="text-[12px] font-semibold text-foreground">Start Prep Plan</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">5-day roadmap</p>
          </button>
          <button
            onClick={() => toggleBookmark(job.id)}
            className="bg-card rounded-[14px] border border-border shadow-card p-3.5 text-left card-tap"
          >
            <div className="w-8 h-8 rounded-[8px] bg-accent flex items-center justify-center text-primary mb-2">
              <svg width="16" height="16" viewBox="0 0 16 16" fill={bookmarked ? "currentColor" : "none"} className="text-primary">
                <path d="M4 2H12C12.55 2 13 2.45 13 3V15L8 12L3 15V3C3 2.45 3.45 2 4 2Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
              </svg>
            </div>
            <p className="text-[12px] font-semibold text-foreground">{bookmarked ? "Saved" : "Save Job"}</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">{bookmarked ? "In your list" : "For later"}</p>
          </button>
        </div>
      </div>

      {/* Fixed bottom CTA */}
      <div className="absolute bottom-0 left-0 right-0 px-4 pb-5 pt-3 bg-background border-t border-border z-10">
        <div className="flex gap-2.5">
          <button
            onClick={() => {}}
            className="flex-1 py-3.5 rounded-[12px] border border-border bg-card text-[13px] font-semibold text-foreground btn-press"
          >
            Build Resume
          </button>
          <button
            onClick={onSmartApply}
            className="flex-1 py-3.5 rounded-[12px] bg-primary text-primary-foreground text-[13px] font-bold shadow-card btn-press"
          >
            Smart Apply
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Smart Apply Screen ───────────────────────────────────────

function SmartApply({ job, onBack, onConfirm }: { job: Job; onBack: () => void; onConfirm: () => void }) {
  const { setPrepJobId, setActiveTab, navigate, showToast } = useApp()
  const matchColor = job.matchScore >= 85 ? "text-emerald-600" : "text-amber-600"
  const barColor = job.matchScore >= 85 ? "bg-emerald-500" : "bg-amber-500"

  return (
    <div className="flex-1 flex flex-col bg-background">
      <div className="px-4 pt-14 pb-4 border-b border-border flex-shrink-0">
        <BackButton onBack={onBack} label="Job Details" />
        <h1 className="text-xl font-bold text-foreground">Smart Apply</h1>
        <p className="text-[12px] text-muted-foreground mt-0.5 font-medium">{job.title} at {job.company}</p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-5 pb-40">
        {/* Match Score Hero */}
        <div className="bg-card rounded-[16px] border border-border shadow-card p-5 mb-4">
          <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-3">Your Match Score</p>
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 flex-shrink-0">
              <svg width="64" height="64" viewBox="0 0 64 64" className="-rotate-90">
                <circle cx="32" cy="32" r="26" fill="none" stroke="currentColor" strokeWidth="6" className="text-muted" />
                <circle
                  cx="32" cy="32" r="26" fill="none" stroke="currentColor" strokeWidth="6"
                  strokeDasharray={`${2 * Math.PI * 26}`}
                  strokeDashoffset={`${2 * Math.PI * 26 * (1 - job.matchScore / 100)}`}
                  strokeLinecap="round"
                  className={matchColor}
                />
              </svg>
              <span className={cn("absolute inset-0 flex items-center justify-center text-[15px] font-extrabold", matchColor)}>
                {job.matchScore}%
              </span>
            </div>
            <div className="flex-1">
              <p className="text-[15px] font-bold text-foreground">
                {job.matchScore >= 85 ? "Strong Match" : job.matchScore >= 70 ? "Good Match" : "Fair Match"}
              </p>
              <p className="text-[12px] text-muted-foreground mt-1 leading-relaxed">
                {job.matchScore >= 85
                  ? "Your profile aligns well with this role. Apply with confidence."
                  : "A few improvements can boost your chances significantly."}
              </p>
            </div>
          </div>
        </div>

        {/* Missing Skills */}
        {job.missingSkills.length > 0 && (
          <div className="bg-amber-50 rounded-[14px] border border-amber-200 p-4 mb-4">
            <p className="text-[11px] font-bold uppercase tracking-widest text-amber-700 mb-2">Missing Skills</p>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {job.missingSkills.map((s) => (
                <span key={s} className="text-[12px] font-semibold px-2.5 py-1 rounded-full bg-amber-100 text-amber-700">{s}</span>
              ))}
            </div>
            <p className="text-[11px] text-amber-700 font-medium">Adding these could increase your match to {Math.min(job.matchScore + 10, 99)}%</p>
          </div>
        )}

        {/* Improvement Suggestions */}
        <div className="bg-card rounded-[14px] border border-border shadow-card p-4 mb-4">
          <p className="text-[11px] font-bold uppercase tracking-widest text-primary mb-3">Improvement Suggestions</p>
          <div className="space-y-3">
            {[
              "Add quantified achievements to your resume (e.g., 'improved latency by 5x')",
              "Tailor your summary paragraph to mention " + job.company + " specifically",
              "Highlight any LLM projects in your portfolio section",
            ].map((s, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-[9px] font-bold text-primary">{i + 1}</span>
                </div>
                <p className="text-[12px] text-foreground leading-relaxed">{s}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Options */}
        <div className="space-y-2.5">
          <button
            onClick={() => showToast("Opening resume optimizer…", "info")}
            className="w-full bg-card border border-border rounded-[12px] p-4 flex items-center gap-3 card-tap shadow-card"
          >
            <div className="w-9 h-9 rounded-[9px] bg-accent flex items-center justify-center text-primary flex-shrink-0">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2.5" y="2" width="13" height="14" rx="2" stroke="currentColor" strokeWidth="1.4"/><path d="M5.5 6H12.5M5.5 9H10M5.5 12H11.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
            </div>
            <div className="flex-1 text-left">
              <p className="text-[13px] font-semibold text-foreground">Improve Resume</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">Boost ATS score for this role</p>
            </div>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-muted-foreground"><path d="M5 3L9 7L5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>

          <button
            onClick={() => { setPrepJobId(job.id); setActiveTab("preparation") }}
            className="w-full bg-card border border-border rounded-[12px] p-4 flex items-center gap-3 card-tap shadow-card"
          >
            <div className="w-9 h-9 rounded-[9px] bg-accent flex items-center justify-center text-primary flex-shrink-0">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="6.5" stroke="currentColor" strokeWidth="1.4"/><path d="M6.5 9L8.5 11L11.5 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <div className="flex-1 text-left">
              <p className="text-[13px] font-semibold text-foreground">Start Mock Interview</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">Practice role-specific questions</p>
            </div>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-muted-foreground"><path d="M5 3L9 7L5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>

          <button
            onClick={() => { setPrepJobId(job.id); setActiveTab("preparation") }}
            className="w-full bg-card border border-border rounded-[12px] p-4 flex items-center gap-3 card-tap shadow-card"
          >
            <div className="w-9 h-9 rounded-[9px] bg-accent flex items-center justify-center text-primary flex-shrink-0">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2L10.5 6H15L11.3 8.6L12.8 13L9 10.4L5.2 13L6.7 8.6L3 6H7.5L9 2Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/></svg>
            </div>
            <div className="flex-1 text-left">
              <p className="text-[13px] font-semibold text-foreground">Start 5-Day Prep Plan</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">Structured interview preparation</p>
            </div>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-muted-foreground"><path d="M5 3L9 7L5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
      </div>

      {/* Fixed Apply CTA */}
      <div className="absolute bottom-0 left-0 right-0 px-4 pb-5 pt-3 bg-background border-t border-border z-10">
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

// ─── Apply Confirm Modal ──────────────────────────────────────

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
  }, [countdown])

  return (
    <div className="absolute inset-0 bg-black/40 z-50 flex items-end">
      <div className="w-full bg-card rounded-t-[24px] p-6 animate-in slide-in-from-bottom-8 duration-300">
        <div className="flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="text-primary">
              <path d="M4 14L10 20L24 8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h3 className="text-[18px] font-bold text-foreground mb-1">Application Sent!</h3>
          <p className="text-[13px] text-muted-foreground mb-2 leading-relaxed">
            Redirecting to {job.company} portal in {countdown}s…
          </p>
          <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden mb-5">
            <div
              className="h-full bg-primary rounded-full transition-all duration-1000"
              style={{ width: `${((3 - countdown) / 3) * 100}%` }}
            />
          </div>
          <button
            onClick={() => { showToast("Redirecting cancelled", "info"); onClose() }}
            className="text-[13px] font-semibold text-muted-foreground btn-press"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Main Export ──────────────────────────────────────────────

export function JobsScreen() {
  const { screen, selectedJob, setSelectedJob, navigate, goBack } = useApp()
  const [subScreen, setSubScreen] = useState<SubScreen>("list")
  const [confirmJob, setConfirmJob] = useState<Job | null>(null)

  // Sync with global screen (for deep links from Dashboard)
  useEffect(() => {
    if (screen === "job-detail" && selectedJob) setSubScreen("detail")
    else if (screen === "smart-apply" && selectedJob) setSubScreen("smart-apply")
    else setSubScreen("list")
  }, [screen, selectedJob])

  function openDetail(job: Job) {
    setSelectedJob(job)
    setSubScreen("detail")
    navigate("job-detail")
  }

  function openSmartApply(job: Job) {
    setSelectedJob(job)
    setSubScreen("smart-apply")
    navigate("smart-apply")
  }

  function handleBack() {
    goBack()
    if (subScreen === "smart-apply") {
      setSubScreen("detail")
    } else {
      setSubScreen("list")
      setSelectedJob(null)
    }
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden relative">
      {subScreen === "list" && <JobList onJobClick={openDetail} onApply={openSmartApply} />}
      {subScreen === "detail" && selectedJob && <JobDetail job={selectedJob} onBack={handleBack} onSmartApply={() => openSmartApply(selectedJob)} />}
      {subScreen === "smart-apply" && selectedJob && <SmartApply job={selectedJob} onBack={handleBack} onConfirm={() => setConfirmJob(selectedJob)} />}
      {confirmJob && <ApplyConfirm job={confirmJob} onClose={() => setConfirmJob(null)} />}
    </div>
  )
}
