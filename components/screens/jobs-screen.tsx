"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

const filters = ["Location", "Experience", "Remote", "Salary", "Internship", "IT"]

const jobs = [
  {
    title: "AI Engineer",
    company: "OpenAI",
    location: "San Francisco, CA",
    skills: ["Python", "LLMs", "Transformers"],
    initials: "OA",
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    title: "ML Engineer",
    company: "Google DeepMind",
    location: "Remote",
    skills: ["PyTorch", "CUDA", "Research"],
    initials: "GD",
    color: "bg-blue-100 text-blue-700",
  },
  {
    title: "Data Scientist",
    company: "Stripe",
    location: "New York, NY",
    skills: ["Python", "SQL", "Statistics"],
    initials: "ST",
    color: "bg-violet-100 text-violet-700",
  },
  {
    title: "Backend Engineer",
    company: "Vercel",
    location: "Remote",
    skills: ["Node.js", "Go", "Rust"],
    initials: "VC",
    color: "bg-amber-100 text-amber-700",
  },
  {
    title: "AI Product Manager",
    company: "Anthropic",
    location: "San Francisco, CA",
    skills: ["AI Strategy", "Product", "LLMs"],
    initials: "AN",
    color: "bg-rose-100 text-rose-700",
  },
  {
    title: "DevOps Engineer",
    company: "Cloudflare",
    location: "Austin, TX",
    skills: ["K8s", "Terraform", "AWS"],
    initials: "CF",
    color: "bg-orange-100 text-orange-700",
  },
]

export function JobsScreen() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const [query, setQuery] = useState("")

  return (
    <div className="flex-1 overflow-y-auto bg-background">
      <div className="px-4 pt-14 pb-6">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Job Companion</h1>
          <p className="text-sm text-muted-foreground mt-0.5 font-medium">Find your next opportunity</p>
        </div>

        {/* Search Bar */}
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
            placeholder="Search jobs like AI Engineer…"
            className="w-full bg-card border border-border rounded-full pl-10 pr-4 py-3 text-[14px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200 shadow-card"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute inset-y-0 right-4 flex items-center text-muted-foreground"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 3L11 11M11 3L3 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          )}
        </div>

        {/* Filter Chips */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-5 -mx-4 px-4 scrollbar-none" style={{ scrollbarWidth: "none" }}>
          {filters.map((filter) => {
            const isActive = activeFilter === filter
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(isActive ? null : filter)}
                className={cn(
                  "flex-shrink-0 px-3.5 py-1.5 rounded-full text-[12px] font-semibold transition-all duration-200 btn-press",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-card"
                    : "bg-card text-muted-foreground border border-border"
                )}
              >
                {filter}
              </button>
            )
          })}
        </div>

        {/* Job Grid */}
        <div className="grid grid-cols-2 gap-3">
          {jobs.map((job) => (
            <JobCard key={job.title + job.company} job={job} />
          ))}
        </div>
      </div>
    </div>
  )
}

function JobCard({ job }: { job: typeof jobs[0] }) {
  return (
    <div className="bg-card rounded-[14px] border border-border shadow-card overflow-hidden card-tap flex flex-col">
      <div className="p-3.5 flex-1">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1 min-w-0 pr-2">
            <p className="text-[12px] font-bold text-foreground leading-tight text-balance">{job.title}</p>
            <p className="text-[10px] text-muted-foreground mt-0.5 font-medium">{job.company}</p>
          </div>
          <div className={cn("w-8 h-8 rounded-[8px] flex items-center justify-center text-[10px] font-bold flex-shrink-0", job.color)}>
            {job.initials}
          </div>
        </div>
        <div className="flex items-center gap-1 mb-2.5">
          <svg width="9" height="9" viewBox="0 0 9 9" fill="none" className="text-muted-foreground flex-shrink-0">
            <path d="M4.5 1C3.12 1 2 2.12 2 3.5C2 5.5 4.5 8 4.5 8C4.5 8 7 5.5 7 3.5C7 2.12 5.88 1 4.5 1Z" stroke="currentColor" strokeWidth="1.1" />
            <circle cx="4.5" cy="3.5" r="0.8" fill="currentColor" />
          </svg>
          <p className="text-[9.5px] text-muted-foreground font-medium truncate">{job.location}</p>
        </div>
        <div className="flex flex-wrap gap-1">
          {job.skills.map((skill) => (
            <span key={skill} className="text-[9.5px] font-semibold px-1.5 py-0.5 rounded-full bg-accent text-accent-foreground leading-tight">
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex border-t border-border">
        <button className="flex-1 py-2.5 text-[11px] font-semibold text-foreground transition-colors duration-200 active:bg-muted border-r border-border">
          Build Resume
        </button>
        <button className="flex-1 py-2.5 text-[11px] font-bold text-primary-foreground bg-primary transition-all duration-200 active:opacity-90">
          Apply Now
        </button>
      </div>
    </div>
  )
}
