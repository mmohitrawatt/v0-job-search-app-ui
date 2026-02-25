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

const summaryCards = [
  { label: "Applications Sent", value: "24", color: "text-primary", bg: "bg-accent" },
  { label: "Interview Calls", value: "6", color: "text-emerald-600", bg: "bg-emerald-50" },
  { label: "Resume Score", value: "82%", color: "text-amber-600", bg: "bg-amber-50" },
  { label: "Active Prep", value: "Day 3", color: "text-violet-600", bg: "bg-violet-50" },
]

const cardIcons = [
  <svg key="a" width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M2.5 14.5L9 3.5L15.5 14.5H2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M9 10V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="9" cy="12" r="0.75" fill="currentColor"/></svg>,
  <svg key="b" width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="3" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M6 15.5H12M9 13V15.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  <svg key="c" width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5"/><path d="M5.5 9L8 11.5L12.5 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  <svg key="d" width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2L10.8 6.4L15.5 6.9L12 10.1L13.1 14.8L9 12.3L4.9 14.8L6 10.1L2.5 6.9L7.2 6.4L9 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>,
]

// Skeleton pulse component
function Skeleton({ className }: { className?: string }) {
  return <div className={cn("bg-muted animate-pulse rounded-[10px]", className)} />
}

export function DashboardScreen() {
  const { setSelectedJob, navigate, setActiveTab, profileName } = useApp()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200)
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
            <h1 className="text-2xl font-bold text-foreground tracking-tight text-balance">
              {getGreeting()}, {displayName}
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5 font-medium">Track your career progress</p>
          </div>
          <button className="w-10 h-10 rounded-full bg-card shadow-card flex items-center justify-center text-foreground btn-press relative">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 2.5C6.69 2.5 4 5.19 4 8.5V13L2.5 14.5V15.5H17.5V14.5L16 13V8.5C16 5.19 13.31 2.5 10 2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              <path d="M8 15.5C8 16.6 8.9 17.5 10 17.5C11.1 17.5 12 16.6 12 15.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full" />
          </button>
        </div>

        {/* Summary Cards 2x2 */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-card rounded-[14px] p-4 shadow-card">
                  <Skeleton className="w-8 h-8 rounded-lg mb-3" />
                  <Skeleton className="w-14 h-6 mb-2" />
                  <Skeleton className="w-20 h-3" />
                </div>
              ))
            : summaryCards.map((card, i) => (
                <div key={card.label} className="bg-card rounded-[14px] p-4 shadow-card card-tap">
                  <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center mb-3", card.bg, card.color)}>
                    {cardIcons[i]}
                  </div>
                  <p className="text-[22px] font-bold text-foreground leading-none mb-1">{card.value}</p>
                  <p className="text-[11px] text-muted-foreground font-medium tracking-tight">{card.label}</p>
                </div>
              ))}
        </div>

        {/* Application Progress Bar */}
        {!loading && (
          <div className="bg-card rounded-[14px] p-4 shadow-card mb-6 border border-border">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[13px] font-semibold text-foreground">Application Pipeline</p>
              <span className="text-[11px] font-bold text-primary">24 total</span>
            </div>
            <div className="space-y-2">
              {[
                { label: "Applied", count: 24, max: 24, color: "bg-primary" },
                { label: "Interview", count: 6, max: 24, color: "bg-emerald-500" },
                { label: "Offer", count: 1, max: 24, color: "bg-amber-500" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <span className="text-[10px] text-muted-foreground font-medium w-12 flex-shrink-0">{item.label}</span>
                  <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className={cn("h-full rounded-full transition-all duration-700", item.color)}
                      style={{ width: `${(item.count / item.max) * 100}%` }}
                    />
                  </div>
                  <span className="text-[11px] font-bold text-foreground w-4 text-right">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recommended Jobs */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold text-foreground">Recommended Jobs</h2>
          <button
            className="text-xs text-primary font-semibold btn-press"
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
            {MOCK_JOBS.slice(0, 4).map((job) => (
              <button
                key={job.id}
                onClick={() => handleJobClick(job)}
                className="bg-card rounded-[14px] p-3.5 shadow-card border border-border card-tap text-left w-full"
              >
                <div className="flex items-start justify-between mb-2.5">
                  <div className="flex-1 min-w-0 pr-2">
                    <p className="text-[13px] font-semibold text-foreground leading-tight text-balance">{job.title}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5 font-medium">{job.company}</p>
                  </div>
                  <div className={cn("w-8 h-8 rounded-[8px] flex items-center justify-center text-[10px] font-bold flex-shrink-0", job.color)}>
                    {job.initials}
                  </div>
                </div>
                <div className="flex items-center gap-1 mb-2.5">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="text-muted-foreground flex-shrink-0">
                    <path d="M5 1C3.34 1 2 2.34 2 4C2 6.5 5 9 5 9C5 9 8 6.5 8 4C8 2.34 6.66 1 5 1Z" stroke="currentColor" strokeWidth="1.2" />
                    <circle cx="5" cy="4" r="1" fill="currentColor" />
                  </svg>
                  <p className="text-[10px] text-muted-foreground font-medium truncate">{job.location}</p>
                </div>
                <div className="flex flex-wrap gap-1">
                  {job.skills.slice(0, 2).map((skill) => (
                    <span key={skill} className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-accent text-accent-foreground">
                      {skill}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
