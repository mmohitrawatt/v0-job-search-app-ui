"use client"

import { cn } from "@/lib/utils"

const skills = ["Machine Learning", "System Design", "Python", "Data Structures"]

const timeline = [
  {
    day: "Day 1",
    title: "Resume Optimization",
    desc: "Tailor keywords, improve ATS score, add quantified impact.",
    status: "done",
  },
  {
    day: "Day 2",
    title: "Core Concept Review",
    desc: "ML fundamentals, Transformers, attention mechanisms.",
    status: "done",
  },
  {
    day: "Day 3",
    title: "Mock Interview",
    desc: "Timed coding problems and behavioral questions.",
    status: "active",
  },
  {
    day: "Day 4",
    title: "Project Practice",
    desc: "Build a small LLM fine-tuning demo for your portfolio.",
    status: "upcoming",
  },
  {
    day: "Day 5",
    title: "Final Interview Simulation",
    desc: "Full-length mock with evaluation feedback.",
    status: "upcoming",
  },
]

export function PreparationScreen() {
  return (
    <div className="flex-1 overflow-y-auto bg-background">
      <div className="px-4 pt-14 pb-28">
        {/* Header */}
        <div className="mb-5">
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Preparation Plan</h1>
          <p className="text-sm text-muted-foreground mt-0.5 font-medium">AI-personalized roadmap</p>
        </div>

        {/* Banner Card */}
        <div className="bg-card rounded-[14px] border border-border shadow-card p-4 mb-5">
          <div className="flex items-center justify-between mb-1">
            <p className="text-[11px] font-semibold text-primary uppercase tracking-widest">Target Role</p>
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700">
              78% Match
            </span>
          </div>
          <h2 className="text-[17px] font-bold text-foreground text-balance">AI Engineer – Preparation Plan</h2>
          <p className="text-[12px] text-muted-foreground mt-1 font-medium">OpenAI · San Francisco, CA</p>
          <div className="mt-3 h-1.5 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full" style={{ width: "78%" }} />
          </div>
          <div className="flex items-center justify-between mt-1.5">
            <p className="text-[10px] text-muted-foreground font-medium">Preparation progress</p>
            <p className="text-[10px] font-bold text-primary">78%</p>
          </div>
        </div>

        {/* Skills to Improve */}
        <div className="mb-5">
          <h3 className="text-[14px] font-semibold text-foreground mb-3">Skills to Improve</h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="text-[12px] font-semibold px-3.5 py-1.5 rounded-full bg-card border border-border text-foreground shadow-card"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Timeline Roadmap */}
        <div>
          <h3 className="text-[14px] font-semibold text-foreground mb-3">5-Day Roadmap</h3>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[19px] top-4 bottom-4 w-px bg-border" />
            <div className="space-y-3">
              {timeline.map((item, i) => (
                <TimelineItem key={i} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Fixed bottom CTA */}
      <div className="fixed bottom-[64px] left-1/2 -translate-x-1/2 w-full max-w-[390px] px-4 pb-3 pt-2 bg-background border-t border-border">
        <div className="flex gap-2.5">
          <button className="flex-1 py-3 rounded-[12px] border border-border bg-card text-[13px] font-semibold text-foreground transition-all duration-200 btn-press active:bg-muted">
            Full Preparation
          </button>
          <button className="flex-1 py-3 rounded-[12px] bg-primary text-primary-foreground text-[13px] font-bold shadow-card transition-all duration-200 btn-press">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  )
}

function TimelineItem({ item }: { item: typeof timeline[0] }) {
  const isDone = item.status === "done"
  const isActive = item.status === "active"

  return (
    <div className="flex items-start gap-3.5 pl-1">
      {/* Dot */}
      <div className="relative z-10 flex-shrink-0 mt-3.5">
        <div
          className={cn(
            "w-9 h-9 rounded-full flex items-center justify-center transition-all",
            isDone ? "bg-primary text-primary-foreground" :
            isActive ? "bg-primary/15 border-2 border-primary text-primary" :
            "bg-muted border border-border text-muted-foreground"
          )}
        >
          {isDone ? (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7L6 10L11 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : isActive ? (
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <circle cx="5" cy="5" r="3" fill="currentColor" />
            </svg>
          ) : (
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <circle cx="5" cy="5" r="3.5" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          )}
        </div>
      </div>

      {/* Card */}
      <div
        className={cn(
          "flex-1 bg-card rounded-[12px] p-3.5 border transition-all duration-200",
          isActive ? "border-primary/30 shadow-card-hover" : "border-border shadow-card"
        )}
      >
        <div className="flex items-center justify-between mb-1">
          <span className={cn(
            "text-[10px] font-bold uppercase tracking-widest",
            isDone ? "text-muted-foreground" :
            isActive ? "text-primary" :
            "text-muted-foreground"
          )}>
            {item.day}
          </span>
          {isActive && (
            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
              In Progress
            </span>
          )}
          {isDone && (
            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600">
              Complete
            </span>
          )}
        </div>
        <p className={cn(
          "text-[13px] font-semibold leading-tight",
          isDone ? "text-muted-foreground" : "text-foreground"
        )}>
          {item.title}
        </p>
        <p className="text-[11px] text-muted-foreground mt-0.5 font-medium leading-relaxed">{item.desc}</p>
      </div>
    </div>
  )
}
