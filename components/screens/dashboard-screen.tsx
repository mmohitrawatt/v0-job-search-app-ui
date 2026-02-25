"use client"

import { cn } from "@/lib/utils"

const summaryCards = [
  {
    label: "Applications Sent",
    value: "24",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M2 14L9 3L16 14H2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M9 10V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="9" cy="12" r="0.75" fill="currentColor" />
      </svg>
    ),
    color: "text-primary",
    bg: "bg-accent",
  },
  {
    label: "Interview Calls",
    value: "6",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="2" y="3" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M6 15.5H12M9 13V15.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    label: "Resume Score",
    value: "82%",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5" />
        <path d="M5.5 9L8 11.5L12.5 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    label: "Active Prep",
    value: "Day 3",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 2L10.8 6.4L15.5 6.9L12 10.1L13.1 14.8L9 12.3L4.9 14.8L6 10.1L2.5 6.9L7.2 6.4L9 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
]

const jobs = [
  {
    title: "AI Engineer",
    company: "OpenAI",
    location: "San Francisco",
    skills: ["Python", "LLMs"],
    initials: "OA",
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    title: "ML Engineer",
    company: "Google DeepMind",
    location: "Remote",
    skills: ["PyTorch", "CUDA"],
    initials: "GD",
    color: "bg-blue-100 text-blue-700",
  },
  {
    title: "Data Scientist",
    company: "Stripe",
    location: "New York",
    skills: ["Python", "SQL"],
    initials: "ST",
    color: "bg-violet-100 text-violet-700",
  },
  {
    title: "Backend Engineer",
    company: "Vercel",
    location: "Remote",
    skills: ["Node.js", "Go"],
    initials: "VC",
    color: "bg-amber-100 text-amber-700",
  },
]

export function DashboardScreen() {
  return (
    <div className="flex-1 overflow-y-auto bg-background">
      <div className="px-4 pt-14 pb-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight text-balance">
              Good Evening, Mohit
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5 font-medium">
              Track your career progress
            </p>
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
          {summaryCards.map((card) => (
            <div
              key={card.label}
              className="bg-card rounded-[14px] p-4 shadow-card card-tap"
            >
              <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center mb-3", card.bg, card.color)}>
                {card.icon}
              </div>
              <p className="text-[22px] font-bold text-foreground leading-none mb-1">{card.value}</p>
              <p className="text-[11px] text-muted-foreground font-medium tracking-tight">{card.label}</p>
            </div>
          ))}
        </div>

        {/* Recommended Jobs */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold text-foreground">Recommended Jobs</h2>
          <button className="text-xs text-primary font-semibold">See all</button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {jobs.map((job) => (
            <div
              key={job.title + job.company}
              className="bg-card rounded-[14px] p-3.5 shadow-card border border-border card-tap"
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
                <p className="text-[10px] text-muted-foreground font-medium">{job.location}</p>
              </div>
              <div className="flex flex-wrap gap-1">
                {job.skills.map((skill) => (
                  <span key={skill} className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-accent text-accent-foreground">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
