"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { useApp } from "@/lib/app-context"
import { MOCK_JOBS, Application, ApplicationStatus } from "@/lib/mock-data"

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return "Good Morning"
  if (hour < 17) return "Good Afternoon"
  return "Good Evening"
}

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

type PipelineStage = { id: ApplicationStatus; label: string; color: string; dot: string }
const PIPELINE_STAGES: PipelineStage[] = [
  { id: "applied", label: "Applied", color: "bg-blue-500", dot: "bg-blue-500" },
  { id: "screening", label: "Screening", color: "bg-primary", dot: "bg-primary" },
  { id: "interview", label: "Interview", color: "bg-amber-500", dot: "bg-amber-500" },
  { id: "offer", label: "Offer", color: "bg-emerald-500", dot: "bg-emerald-500" },
  { id: "rejected", label: "Rejected", color: "bg-red-400", dot: "bg-red-400" },
]

function Skeleton({ className }: { className?: string }) {
  return <div className={cn("bg-muted animate-pulse rounded-[10px]", className)} />
}

function ApplicationCard({ app }: { app: Application }) {
  const { setSelectedJob, setActiveTab, navigate } = useApp()
  const job = MOCK_JOBS.find((j) => j.id === app.jobId)

  function handleClick() {
    if (job) {
      setSelectedJob(job)
      setActiveTab("jobs")
      navigate("job-detail")
    }
  }

  return (
    <button
      onClick={handleClick}
      className="w-full flex items-center gap-3 bg-card rounded-[12px] px-3 py-2.5 shadow-card border border-border card-tap text-left"
    >
      <div className={cn("w-9 h-9 rounded-[10px] flex items-center justify-center text-[11px] font-extrabold flex-shrink-0", app.color)}>
        {app.initials}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[12px] font-bold text-foreground truncate">{app.jobTitle}</p>
        <p className="text-[10.5px] text-muted-foreground font-medium">{app.company} · {app.salary}</p>
      </div>
      <div className="text-right flex-shrink-0">
        <p className="text-[9.5px] text-muted-foreground">{app.appliedDate}</p>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-muted-foreground mt-0.5 ml-auto"><path d="M5 3L9 7L5 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </div>
    </button>
  )
}

export function DashboardScreen() {
  const { setSelectedJob, navigate, setActiveTab, profile, applications, notificationCount } = useApp()
  const [loading, setLoading] = useState(true)
  const [activeStage, setActiveStage] = useState<ApplicationStatus>("interview")

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const displayName = profile.name.split(" ")[0]

  function handleJobClick(job: (typeof MOCK_JOBS)[0]) {
    setSelectedJob(job)
    setActiveTab("jobs")
    navigate("job-detail")
  }

  const stageApps = applications.filter((a) => a.status === activeStage)

  const initials = profile.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase()


  return (
    <div className="flex-1 overflow-y-auto bg-background">
      {/* Header Banner */}
      <div className="px-4 lg:px-8 pt-14 lg:pt-8 pb-5 bg-card border-b border-border">

        {/* Row 1: Avatar + Greeting + Actions */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-[14px] font-bold flex-shrink-0 shadow-sm ring-2 ring-primary/20">
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-semibold text-muted-foreground">{getGreeting()}</p>
            <h1 className="text-[20px] font-extrabold text-foreground tracking-tight leading-tight truncate">
              {displayName} 👋
            </h1>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <button
              onClick={() => setActiveTab("jobs")}
              className="hidden sm:flex w-9 h-9 rounded-full bg-muted items-center justify-center text-muted-foreground hover:bg-accent hover:text-primary transition-colors tap-highlight-none"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="6.5" cy="6.5" r="4" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M10 10L13.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
            <button
              onClick={() => navigate("job-alerts")}
              className="lg:hidden w-9 h-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground relative tap-highlight-none btn-press"
            >
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <path d="M10 2.5C6.69 2.5 4 5.19 4 8.5V13L2.5 14.5V15.5H17.5V14.5L16 13V8.5C16 5.19 13.31 2.5 10 2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                <path d="M8 15.5C8 16.6 8.9 17.5 10 17.5C11.1 17.5 12 16.6 12 15.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              {notificationCount > 0 && (
                <span className="absolute top-1 right-1 min-w-[14px] h-3.5 bg-red-500 rounded-full flex items-center justify-center text-[8px] font-bold text-white px-0.5">
                  {notificationCount}
                </span>
              )}
            </button>
          </div>
        </div>

      </div>

      <div className="px-4 lg:px-8 pt-5 pb-6">

        {/* AI Interview Card */}
        {!loading && (
          <button
            onClick={() => navigate("ai-interview")}
            className="w-full rounded-[16px] p-4 mb-5 text-left tap-highlight-none btn-press overflow-hidden relative"
            style={{ background: "linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)" }}
          >
            {/* Decorative circles */}
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/10" />
            <div className="absolute -bottom-4 -right-2 w-14 h-14 rounded-full bg-white/8" />

            <div className="relative flex items-center gap-3">
              {/* Icon */}
              <div className="relative flex-shrink-0">
                <div className="w-12 h-12 rounded-[14px] bg-white/20 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="8" r="4" stroke="white" strokeWidth="1.8"/>
                    <path d="M4 20C4 16.69 7.58 14 12 14C16.42 14 20 16.69 20 20" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
                    <circle cx="19" cy="7" r="3" fill="white" fillOpacity="0.3" stroke="white" strokeWidth="1.4"/>
                    <path d="M18 7H20M19 6V8" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white/30 flex items-center justify-center">
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><circle cx="4" cy="4" r="2" fill="white"/></svg>
                </span>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <p className="text-[15px] font-extrabold text-white">AI Interview Coach</p>
                </div>
                <p className="text-[11px] text-white/80 font-medium">Practice 5 questions tailored to your profile</p>
              </div>

              <div className="flex-shrink-0 bg-white/20 rounded-[10px] px-3 py-1.5">
                <p className="text-[11px] font-bold text-white whitespace-nowrap">Start →</p>
              </div>
            </div>
          </button>
        )}

        {loading && (
          <div className="w-full h-[76px] rounded-[16px] mb-5 bg-muted animate-pulse" />
        )}

        {/* Bootcamp Banner */}
        {!loading && (
          <div className="w-full rounded-[16px] mb-5 overflow-hidden relative" style={{ background: "linear-gradient(135deg, #F97316 0%, #EF4444 60%, #DC2626 100%)" }}>
            {/* Decorative shapes */}
            <div className="absolute -top-5 -right-5 w-28 h-28 rounded-full bg-white/10" />
            <div className="absolute bottom-0 right-16 w-10 h-10 rounded-full bg-white/8" />
            <div className="absolute top-3 right-10 w-5 h-5 rounded-full bg-yellow-300/30" />

            <div className="relative p-4">
              {/* Top row: badge + price */}
              <div className="flex items-start justify-between mb-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="bg-white/25 text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-widest">
                    🔥 Bootcamp
                  </span>
                  <span className="bg-yellow-400/30 text-yellow-100 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                    2 Days
                  </span>
                </div>
                <div className="text-right">
                  <div className="flex items-baseline gap-1">
                    <span className="text-[22px] font-extrabold text-white leading-none">₹99</span>
                    <span className="text-[11px] text-white/50 line-through font-medium">₹999</span>
                  </div>
                  <p className="text-[9px] text-white/70 font-semibold">only</p>
                </div>
              </div>

              {/* Title + subtitle */}
              <p className="text-[16px] font-extrabold text-white leading-tight mb-0.5">
                Sprint AI &amp; Interactive Hackathon
              </p>
              <p className="text-[11px] text-white/75 font-medium mb-3">
                Build real AI projects · Compete · Get certified
              </p>

              {/* CTA */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="flex -space-x-1">
                    {["bg-yellow-400", "bg-green-400", "bg-blue-400"].map((c, i) => (
                      <div key={i} className={cn("w-5 h-5 rounded-full border-2 border-white/30", c)} />
                    ))}
                  </div>
                  <span className="text-[10px] text-white/70 font-semibold">500+ joined</span>
                </div>
                <button className="bg-white rounded-[10px] px-4 py-1.5 tap-highlight-none btn-press">
                  <span className="text-[12px] font-extrabold text-orange-600">Reserve Seat →</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {loading && (
          <div className="w-full h-[110px] rounded-[16px] mb-5 bg-muted animate-pulse" />
        )}

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
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

        {/* Application Pipeline Tracker */}
        {!loading && (
          <div className="bg-card rounded-[14px] p-4 shadow-card mb-5 border border-border">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[13px] font-bold text-foreground">Applications Pipeline</p>
              <span className="text-[11px] font-semibold text-muted-foreground">{applications.length} total</span>
            </div>

            {/* Stage chips */}
            <div className="flex gap-1.5 overflow-x-auto pb-1 mb-3 scrollbar-hide">
              {PIPELINE_STAGES.map((stage) => {
                const count = applications.filter((a) => a.status === stage.id).length
                const isActive = activeStage === stage.id
                return (
                  <button
                    key={stage.id}
                    onClick={() => setActiveStage(stage.id)}
                    className={cn(
                      "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10.5px] font-bold whitespace-nowrap transition-all duration-200 tap-highlight-none flex-shrink-0",
                      isActive
                        ? "bg-foreground text-background"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    <span className={cn("w-1.5 h-1.5 rounded-full flex-shrink-0", isActive ? "bg-background" : stage.dot)} />
                    {stage.label}
                    {count > 0 && (
                      <span className={cn(
                        "text-[9px] font-extrabold min-w-[16px] h-4 rounded-full flex items-center justify-center px-1",
                        isActive ? "bg-white/20 text-background" : "bg-muted-foreground/20 text-muted-foreground"
                      )}>
                        {count}
                      </span>
                    )}
                  </button>
                )
              })}
            </div>

            {/* Stage applications */}
            {stageApps.length > 0 ? (
              <div className="space-y-2">
                {stageApps.map((app) => (
                  <ApplicationCard key={app.id} app={app} />
                ))}
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-[12px] text-muted-foreground">No applications in this stage</p>
              </div>
            )}
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
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
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
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {MOCK_JOBS.slice(0, 4).map((job) => {
              const matchColor = job.matchScore >= 85 ? "text-emerald-600 bg-emerald-50" : job.matchScore >= 70 ? "text-amber-600 bg-amber-50" : "text-orange-600 bg-orange-50"
              return (
                <button
                  key={job.id}
                  onClick={() => handleJobClick(job)}
                  className="bg-card rounded-[14px] p-3.5 shadow-card border border-border card-tap text-left w-full"
                >
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
