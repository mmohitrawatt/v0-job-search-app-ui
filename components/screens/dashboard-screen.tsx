"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { useApp } from "@/lib/app-context"
import { MOCK_JOBS, Job } from "@/lib/mock-data"

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return "Good Morning"
  if (hour < 17) return "Good Afternoon"
  return "Good Evening"
}

// 4 distinct, non-redundant stats
const summaryCards = [
  { label: "Applications", value: "24", sub: "this month", color: "text-primary", bg: "bg-accent" },
  { label: "Resume Score", value: "92%", sub: "ATS optimized", color: "text-emerald-600", bg: "bg-emerald-50" },
  { label: "Prep Streak", value: "Day 3", sub: "keep going", color: "text-amber-600", bg: "bg-amber-50" },
  { label: "Jobs Saved", value: "11", sub: "in watchlist", color: "text-violet-600", bg: "bg-violet-50" },
]

const cardIcons = [
  <svg key="a" width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="3" y="2" width="12" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M6 6.5H12M6 9.5H10M6 12.5H11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>,
  <svg key="b" width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5"/><path d="M5.5 9L8 11.5L12.5 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  <svg key="c" width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2L10.5 6H15L11.3 8.6L12.8 13L9 10.4L5.2 13L6.7 8.6L3 6H7.5L9 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>,
  <svg key="d" width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M5 2H13C13.55 2 14 2.45 14 3V16L9 13L4 16V3C4 2.45 4.45 2 5 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>,
]

// Application funnel — 3 distinct pipeline stages
const pipelineStages = [
  { label: "Screening", count: 14, max: 24, color: "bg-primary" },
  { label: "Interviews", count: 6, max: 24, color: "bg-emerald-500" },
  { label: "Offers", count: 1, max: 24, color: "bg-amber-500" },
]

function Skeleton({ className }: { className?: string }) {
  return <div className={cn("bg-muted animate-pulse rounded-[10px]", className)} />
}

export function DashboardScreen() {
  const { setSelectedJob, navigate, setActiveTab, profileName } = useApp()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const displayName = profileName.split(" ")[0]

  function handleJobClick(job: Job) {
    setSelectedJob(job)
    setActiveTab("jobs")
    navigate("job-detail")
  }

  return (
    <div className="flex-1 overflow-y-auto bg-background">
      <div className="px-4 pt-14 pb-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-[13px] font-medium text-muted-foreground">{getGreeting()}</p>
            <h1 className="text-[22px] font-bold text-foreground tracking-tight leading-tight text-balance">
              {displayName} 👋
            </h1>
          </div>
          <button className="w-10 h-10 rounded-full bg-card shadow-card flex items-center justify-center text-foreground btn-press relative tap-highlight-none">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 2.5C6.69 2.5 4 5.19 4 8.5V13L2.5 14.5V15.5H17.5V14.5L16 13V8.5C16 5.19 13.31 2.5 10 2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              <path d="M8 15.5C8 16.6 8.9 17.5 10 17.5C11.1 17.5 12 16.6 12 15.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full" />
          </button>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-card rounded-[14px] p-4 shadow-card">
                  <Skeleton className="w-8 h-8 rounded-lg mb-3" />
                  <Skeleton className="w-14 h-6 mb-2" />
                  <Skeleton className="w-20 h-3" />
                </div>
              ))
            : summaryCards.map((card, i) => (
                <div key={card.label} className="bg-card rounded-[14px] p-4 shadow-card">
                  <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center mb-3", card.bg, card.color)}>
                    {cardIcons[i]}
                  </div>
                  <p className="text-[22px] font-bold text-foreground leading-none mb-0.5">{card.value}</p>
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">{card.label}</p>
                  <p className="text-[10px] text-muted-foreground/70 mt-0.5">{card.sub}</p>
                </div>
              ))}
        </div>

        {/* Application Funnel */}
        {!loading && (
          <div className="bg-card rounded-[14px] p-4 shadow-card mb-5 border border-border">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[13px] font-bold text-foreground">Application Funnel</p>
              <span className="text-[11px] font-semibold text-muted-foreground">24 applied</span>
            </div>
            <div className="space-y-2.5">
              {pipelineStages.map((stage) => (
                <div key={stage.label} className="flex items-center gap-3">
                  <span className="text-[10px] text-muted-foreground font-semibold w-16 flex-shrink-0">{stage.label}</span>
                  <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className={cn("h-full rounded-full transition-all duration-700", stage.color)}
                      style={{ width: `${(stage.count / stage.max) * 100}%` }}
                    />
                  </div>
                  <span className="text-[11px] font-bold text-foreground w-4 text-right">{stage.count}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recommended Jobs */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[15px] font-bold text-foreground">Recommended for You</h2>
          <button
            className="text-[12px] text-primary font-semibold btn-press tap-highlight-none"
            onClick={() => setActiveTab("jobs")}
          >
            See all
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-card rounded-[14px] p-3.5 shadow-card border border-border">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 pr-2 space-y-1.5">
                    <Skeleton className="w-full h-3.5" />
                    <Skeleton className="w-16 h-3" />
                  </div>
                  <Skeleton className="w-8 h-8 rounded-[8px] flex-shrink-0" />
                </div>
                <Skeleton className="w-24 h-3 mb-2.5" />
                <div className="flex gap-1">
                  <Skeleton className="w-12 h-4 rounded-full" />
                  <Skeleton className="w-14 h-4 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {MOCK_JOBS.slice(0, 4).map((job) => {
              const matchColor = job.matchScore >= 85 ? "text-emerald-600 bg-emerald-50" : job.matchScore >= 70 ? "text-amber-600 bg-amber-50" : "text-orange-600 bg-orange-50"
              return (
                <button
                  key={job.id}
                  onClick={() => handleJobClick(job)}
                  className="bg-card rounded-[14px] p-3.5 shadow-card border border-border card-tap text-left w-full"
                >
                  {/* Logo + bookmark row */}
                  <div className="flex items-start justify-between mb-2.5">
                    <div className={cn("w-9 h-9 rounded-[10px] flex items-center justify-center text-[11px] font-extrabold flex-shrink-0", job.color)}>
                      {job.initials}
                    </div>
                    <span className={cn("text-[9px] font-bold px-1.5 py-0.5 rounded-full", matchColor)}>
                      {job.matchScore}%
                    </span>
                  </div>
                  <p className="text-[12px] font-bold text-foreground leading-tight text-balance mb-0.5">{job.title}</p>
                  <p className="text-[10.5px] text-muted-foreground font-medium mb-2">{job.company}</p>
                  <div className="flex items-center gap-1">
                    <svg width="9" height="9" viewBox="0 0 9 9" fill="none" className="text-muted-foreground flex-shrink-0">
                      <path d="M4.5 1C3.12 1 2 2.12 2 3.5C2 5.5 4.5 8 4.5 8S7 5.5 7 3.5C7 2.12 5.88 1 4.5 1Z" stroke="currentColor" strokeWidth="1.1"/>
                      <circle cx="4.5" cy="3.5" r="0.8" fill="currentColor"/>
                    </svg>
                    <p className="text-[9.5px] text-muted-foreground font-medium truncate">{job.isRemote ? "Remote" : job.location}</p>
                  </div>
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
