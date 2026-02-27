"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { useApp } from "@/lib/app-context"
import { MOCK_JOBS, MOCK_QUESTIONS } from "@/lib/mock-data"

type Tab = "roadmap" | "interview" | "questions"

// ─── Roadmap Tab ──────────────────────────────────────────────

const BASE_TIMELINE = [
  { day: "Day 1", title: "Resume Optimization", desc: "Tailor keywords, improve ATS score, add quantified impact." },
  { day: "Day 2", title: "Core Concept Review", desc: "ML fundamentals, Transformers, attention mechanisms." },
  { day: "Day 3", title: "Mock Interview", desc: "Timed coding problems and behavioral questions." },
  { day: "Day 4", title: "Portfolio Project", desc: "Build a small LLM fine-tuning demo for your portfolio." },
  { day: "Day 5", title: "Final Simulation", desc: "Full-length mock with evaluation feedback." },
]

function RoadmapTab({ jobTitle }: { jobTitle: string }) {
  const [completed, setCompleted] = useState<boolean[]>([true, true, false, false, false])

  const toggle = (i: number) => {
    setCompleted((prev) => {
      const next = [...prev]
      next[i] = !next[i]
      return next
    })
  }

  const progress = Math.round((completed.filter(Boolean).length / BASE_TIMELINE.length) * 100)

  return (
    <div className="px-4 py-4">
      {/* Progress summary */}
      <div className="bg-card rounded-[14px] border border-border shadow-card p-4 mb-5">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[13px] font-semibold text-foreground">Overall Progress</p>
          <span className="text-[13px] font-bold text-primary">{progress}%</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-[11px] text-muted-foreground mt-2 font-medium">
          {completed.filter(Boolean).length} of {BASE_TIMELINE.length} tasks complete · Targeting {jobTitle}
        </p>
      </div>

      {/* Timeline */}
      <div className="relative">
        <div className="absolute left-[19px] top-5 bottom-5 w-px bg-border" />
        <div className="space-y-3">
          {BASE_TIMELINE.map((item, i) => {
            const isDone = completed[i]
            const isActive = !isDone && (i === 0 || completed[i - 1])
            return (
              <button
                key={i}
                onClick={() => toggle(i)}
                className="flex items-start gap-3.5 pl-1 w-full text-left tap-highlight-none"
              >
                {/* Node */}
                <div className="relative z-10 flex-shrink-0 mt-3">
                  <div className={cn(
                    "w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300",
                    isDone ? "bg-primary text-primary-foreground" :
                    isActive ? "bg-primary/15 border-2 border-primary text-primary" :
                    "bg-muted border border-border text-muted-foreground"
                  )}>
                    {isDone ? (
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7L6 10L11 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    ) : isActive ? (
                      <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                    ) : (
                      <div className="w-2.5 h-2.5 rounded-full border border-current" />
                    )}
                  </div>
                </div>

                {/* Card */}
                <div className={cn(
                  "flex-1 rounded-[12px] p-3.5 border transition-all duration-200",
                  isDone ? "bg-muted/50 border-border" :
                  isActive ? "bg-card border-primary/30 shadow-card-hover" :
                  "bg-card border-border shadow-card"
                )}>
                  <div className="flex items-center justify-between mb-1">
                    <span className={cn("text-[10px] font-bold uppercase tracking-widest", isActive ? "text-primary" : "text-muted-foreground")}>
                      {item.day}
                    </span>
                    {isDone && <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600">Done</span>}
                    {isActive && <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">Active</span>}
                  </div>
                  <p className={cn("text-[13px] font-semibold leading-tight", isDone ? "text-muted-foreground" : "text-foreground")}>{item.title}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5 font-medium leading-relaxed">{item.desc}</p>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ─── Mock Interview Tab ───────────────────────────────────────

function InterviewTab() {
  const [qIndex, setQIndex] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [recording, setRecording] = useState(false)
  const [done, setDone] = useState<boolean[]>(MOCK_QUESTIONS.map(() => false))
  const q = MOCK_QUESTIONS[qIndex]

  function next() {
    setQIndex((i) => (i + 1) % MOCK_QUESTIONS.length)
    setRevealed(false)
    setRecording(false)
  }

  function prev() {
    setQIndex((i) => (i - 1 + MOCK_QUESTIONS.length) % MOCK_QUESTIONS.length)
    setRevealed(false)
    setRecording(false)
  }

  function markDone() {
    setDone((d) => { const n = [...d]; n[qIndex] = true; return n })
    next()
  }

  return (
    <div className="px-4 py-4">
      {/* Progress dots */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-[12px] text-muted-foreground font-medium">Question {qIndex + 1} of {MOCK_QUESTIONS.length}</p>
        <div className="flex gap-1.5">
          {MOCK_QUESTIONS.map((_, i) => (
            <div
              key={i}
              className={cn("w-2 h-2 rounded-full transition-all duration-300",
                i === qIndex ? "bg-primary w-4" :
                done[i] ? "bg-emerald-500" : "bg-muted"
              )}
            />
          ))}
        </div>
      </div>

      {/* Question card */}
      <div className="bg-card rounded-[14px] border border-border shadow-card p-5 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary px-2.5 py-1 rounded-full bg-accent">Interview Q</span>
        </div>
        <p className="text-[14px] font-semibold text-foreground leading-relaxed">{q.q}</p>
      </div>

      {/* Record Answer */}
      <button
        onClick={() => setRecording((r) => !r)}
        className={cn(
          "w-full rounded-[12px] p-3.5 mb-4 flex items-center gap-3 transition-all duration-200 btn-press border",
          recording ? "bg-red-50 border-red-200" : "bg-card border-border shadow-card"
        )}
      >
        <div className={cn("w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0", recording ? "bg-red-100" : "bg-accent")}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={recording ? "text-red-600" : "text-primary"}>
            <rect x="5" y="2" width="6" height="8" rx="3" stroke="currentColor" strokeWidth="1.4"/>
            <path d="M3 9C3 11.76 5.24 14 8 14C10.76 14 13 11.76 13 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
            <path d="M8 14V16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
        </div>
        <div className="flex-1 text-left">
          <p className={cn("text-[13px] font-semibold", recording ? "text-red-600" : "text-foreground")}>
            {recording ? "Recording… tap to stop" : "Record Your Answer"}
          </p>
          <p className="text-[11px] text-muted-foreground mt-0.5">Practice speaking out loud</p>
        </div>
        {recording && (
          <div className="flex gap-0.5 items-end h-4">
            {[3, 5, 2, 4, 3, 5, 2].map((h, i) => (
              <div key={i} className={cn("w-1 bg-red-400 rounded-full animate-pulse")} style={{ height: `${h * 3}px`, animationDelay: `${i * 80}ms` }} />
            ))}
          </div>
        )}
      </button>

      {/* Reveal Answer */}
      {!revealed ? (
        <button
          onClick={() => setRevealed(true)}
          className="w-full py-3.5 rounded-[12px] border border-border bg-card text-[14px] font-semibold text-foreground shadow-card btn-press mb-3"
        >
          Reveal Model Answer
        </button>
      ) : (
        <div className="bg-emerald-50 rounded-[14px] border border-emerald-200 p-4 mb-3 animate-in fade-in duration-300">
          <p className="text-[11px] font-bold uppercase tracking-widest text-emerald-700 mb-2">Model Answer</p>
          <p className="text-[12px] text-emerald-900 leading-relaxed">{q.a}</p>
        </div>
      )}

      {/* Nav */}
      <div className="flex gap-2.5">
        <button onClick={prev} className="flex-1 py-3 rounded-[12px] border border-border bg-card text-[13px] font-semibold text-foreground btn-press flex items-center justify-center gap-1.5">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 4L6 8L10 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Prev
        </button>
        <button onClick={markDone} className="flex-1 py-3 rounded-[12px] bg-primary text-primary-foreground text-[13px] font-bold shadow-card btn-press flex items-center justify-center gap-1.5">
          Got it
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>
    </div>
  )
}

// ─── Practice Questions Tab ───────────────────────────────────

function QuestionsTab() {
  const [expanded, setExpanded] = useState<number | null>(null)

  return (
    <div className="px-4 py-4 space-y-3">
      <p className="text-[12px] text-muted-foreground font-medium">{MOCK_QUESTIONS.length} practice questions</p>
      {MOCK_QUESTIONS.map((item, i) => (
        <button
          key={i}
          onClick={() => setExpanded(expanded === i ? null : i)}
          className="w-full bg-card rounded-[14px] border border-border shadow-card p-4 text-left card-tap"
        >
          <div className="flex items-start gap-3">
            <span className="text-[11px] font-bold text-primary w-5 flex-shrink-0 mt-0.5">Q{i + 1}</span>
            <div className="flex-1">
              <p className="text-[13px] font-semibold text-foreground leading-tight">{item.q}</p>
              {expanded === i && (
                <div className="mt-3 pt-3 border-t border-border animate-in fade-in duration-200">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-emerald-700 mb-1.5">Answer Guide</p>
                  <p className="text-[12px] text-foreground leading-relaxed">{item.a}</p>
                </div>
              )}
            </div>
            <svg
              width="16" height="16" viewBox="0 0 16 16" fill="none"
              className={cn("text-muted-foreground flex-shrink-0 mt-0.5 transition-transform duration-200", expanded === i ? "rotate-180" : "")}
            >
              <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </button>
      ))}
    </div>
  )
}

// ─── Main Export ──────────────────────────────────────────────

export function PreparationScreen() {
  const { prepJobId } = useApp()
  const [activeTab, setActiveTab] = useState<Tab>("roadmap")

  const job = MOCK_JOBS.find((j) => j.id === prepJobId) ?? MOCK_JOBS[0]

  const tabs: { id: Tab; label: string }[] = [
    { id: "roadmap", label: "Roadmap" },
    { id: "interview", label: "Mock Interview" },
    { id: "questions", label: "Practice Q's" },
  ]

  return (
    <div className="flex-1 flex flex-col bg-background overflow-hidden">
      {/* Header */}
      <div className="px-4 lg:px-8 pt-14 lg:pt-8 pb-0 flex-shrink-0">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">Preparation</h1>
            <p className="text-sm text-muted-foreground mt-0.5 font-medium">AI-personalized roadmap</p>
          </div>
          <div className={cn("w-10 h-10 rounded-[10px] flex items-center justify-center text-[12px] font-bold flex-shrink-0", job.color)}>
            {job.initials}
          </div>
        </div>

        {/* Job banner */}
        <div className="bg-card rounded-[14px] border border-border shadow-card px-4 py-3 mb-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-0.5">Target Role</p>
          <p className="text-[14px] font-bold text-foreground leading-tight">{job.title} — {job.company}</p>
          <p className="text-[11px] text-muted-foreground font-medium mt-0.5">{job.isRemote ? "Remote" : job.location}</p>
        </div>

        {/* Tabs */}
        <div className="flex bg-muted rounded-[12px] p-1 gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex-1 py-2 rounded-[9px] text-[11px] font-bold transition-all duration-200 btn-press",
                activeTab === tab.id
                  ? "bg-card text-foreground shadow-card"
                  : "text-muted-foreground"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto pb-4">
        {activeTab === "roadmap" && <RoadmapTab jobTitle={job.title} />}
        {activeTab === "interview" && <InterviewTab />}
        {activeTab === "questions" && <QuestionsTab />}
      </div>
    </div>
  )
}
