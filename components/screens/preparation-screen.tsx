"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { useApp } from "@/lib/app-context"
import { MOCK_JOBS, MOCK_QUESTIONS, QuestionCategory } from "@/lib/mock-data"

// ─── Types ────────────────────────────────────────────────────

type Tab = "roadmap" | "interview" | "questions"
type ConfidenceRating = "easy" | "medium" | "hard" | null

// ─── Constants ────────────────────────────────────────────────

const ROADMAP = [
  {
    day: "Day 1", title: "Resume Optimization", time: "45 min",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-violet-600">
        <path d="M3 1H10L14 5V15H3V1Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
        <path d="M10 1V5H14M5 8H11M5 11H9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
    iconBg: "bg-violet-50",
    subtasks: ["Add 3 quantified impact bullets", "Run ATS keyword scan", "Fix spacing and hierarchy", "Update skills section"],
  },
  {
    day: "Day 2", title: "Core Concept Review", time: "90 min",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-blue-600">
        <path d="M8 1L9.5 5.5H14.5L10.5 8.5L12 13L8 10L4 13L5.5 8.5L1.5 5.5H6.5L8 1Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      </svg>
    ),
    iconBg: "bg-blue-50",
    subtasks: ["Transformers & attention deep-dive", "Revise gradient descent variants", "Review regularisation techniques", "LLM fine-tuning concepts"],
  },
  {
    day: "Day 3", title: "Mock Interview", time: "60 min",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-emerald-600">
        <path d="M8 2C5.24 2 3 4.24 3 7V11L1.5 12.5V13H14.5V12.5L13 11V7C13 4.24 10.76 2 8 2Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
        <path d="M6.5 13.5C6.5 14.33 7.17 15 8 15C8.83 15 9.5 14.33 9.5 13.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
    iconBg: "bg-emerald-50",
    subtasks: ["5 behavioral questions (STAR)", "3 technical deep-dives", "1 system design walkthrough", "Record yourself and review"],
  },
  {
    day: "Day 4", title: "Coding & Projects", time: "120 min",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-amber-600">
        <path d="M5 4L2 8L5 12M11 4L14 8L11 12M9 2L7 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    iconBg: "bg-amber-50",
    subtasks: ["Solve 2 ML coding problems", "Build LLM fine-tuning demo", "Push to GitHub with README", "Prepare to walk through code"],
  },
  {
    day: "Day 5", title: "Final Simulation", time: "90 min",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-primary">
        <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3" />
        <path d="M8 4.5V8L10.5 10.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    iconBg: "bg-primary/10",
    subtasks: ["Full-length timed mock interview", "Salary negotiation practice", "Prepare 3 questions for interviewer", "Review offer evaluation criteria"],
  },
]

const CATEGORY_META: Record<QuestionCategory, { label: string; color: string; bg: string; dot: string }> = {
  behavioral:      { label: "Behavioral",    color: "text-violet-700", bg: "bg-violet-50 border-violet-200",  dot: "bg-violet-500" },
  technical:       { label: "Technical",     color: "text-blue-700",   bg: "bg-blue-50 border-blue-200",      dot: "bg-blue-500" },
  "system-design": { label: "System Design", color: "text-emerald-700",bg: "bg-emerald-50 border-emerald-200",dot: "bg-emerald-500" },
  debugging:       { label: "Debugging",     color: "text-amber-700",  bg: "bg-amber-50 border-amber-200",    dot: "bg-amber-500" },
}

const DIFFICULTY_META = {
  medium: { label: "Medium", color: "text-amber-600 bg-amber-50 border-amber-200" },
  hard:   { label: "Hard",   color: "text-red-600 bg-red-50 border-red-200" },
}

// ─── Roadmap Tab ──────────────────────────────────────────────

function RoadmapTab({ jobTitle }: { jobTitle: string }) {
  const [completed, setCompleted] = useState<boolean[]>([true, true, false, false, false])
  const [expanded, setExpanded] = useState<number | null>(2)
  const [checkedSubs, setCheckedSubs] = useState<Record<number, boolean[]>>(() =>
    Object.fromEntries(ROADMAP.map((r, i) => [i, r.subtasks.map(() => i < 2)]))
  )

  const doneCount = completed.filter(Boolean).length
  const progress = Math.round((doneCount / ROADMAP.length) * 100)
  const totalMin = ROADMAP.filter((_, i) => !completed[i]).reduce((sum, r) => sum + parseInt(r.time), 0)

  function toggleSub(dayIdx: number, subIdx: number) {
    setCheckedSubs((prev) => {
      const arr = [...(prev[dayIdx] ?? [])]
      arr[subIdx] = !arr[subIdx]
      const allDone = arr.every(Boolean)
      if (allDone) setCompleted((c) => { const n = [...c]; n[dayIdx] = true; return n })
      return { ...prev, [dayIdx]: arr }
    })
  }

  return (
    <div className="px-4 lg:px-6 py-4 space-y-4">
      {/* Progress Card */}
      <div className="bg-card rounded-[16px] border border-border shadow-card p-4">
        <div className="flex items-center gap-5">
          {/* Ring */}
          <div className="relative w-16 h-16 flex-shrink-0">
            <svg width="64" height="64" viewBox="0 0 64 64" className="-rotate-90">
              <circle cx="32" cy="32" r="26" fill="none" stroke="var(--muted)" strokeWidth="6" />
              <circle
                cx="32" cy="32" r="26" fill="none" stroke="var(--primary)" strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 26}`}
                strokeDashoffset={`${2 * Math.PI * 26 * (1 - progress / 100)}`}
                className="transition-all duration-700"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[15px] font-bold text-foreground">{progress}%</span>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[14px] font-bold text-foreground">{doneCount} of {ROADMAP.length} days done</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">~{totalMin} min remaining</p>
            <p className="text-[11px] text-muted-foreground mt-0.5 truncate">Targeting: <span className="font-semibold text-foreground">{jobTitle}</span></p>
          </div>
          {doneCount === ROADMAP.length && (
            <div className="flex-shrink-0 text-center">
              <div className="text-[22px]">🎉</div>
              <p className="text-[9px] font-bold text-emerald-600 mt-0.5">All Done!</p>
            </div>
          )}
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        <div className="absolute left-[23px] top-6 bottom-6 w-[2px] bg-border/60 rounded-full" />
        <div className="space-y-3">
          {ROADMAP.map((item, i) => {
            const isDone = completed[i]
            const isActive = !isDone && (i === 0 || completed[i - 1])
            const isExpanded = expanded === i
            const subs = checkedSubs[i] ?? item.subtasks.map(() => false)
            const subsDone = subs.filter(Boolean).length

            return (
              <div key={i} className="flex items-start gap-3 pl-1">
                {/* Node */}
                <div className="relative z-10 flex-shrink-0 mt-3.5">
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border-2",
                    isDone ? "bg-primary border-primary text-primary-foreground" :
                    isActive ? "bg-card border-primary" :
                    "bg-card border-border"
                  )}>
                    {isDone ? (
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7L6 10L11 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    ) : isActive ? (
                      <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                    ) : (
                      <span className="text-[11px] font-bold text-muted-foreground">{i + 1}</span>
                    )}
                  </div>
                </div>

                {/* Card */}
                <div className={cn(
                  "flex-1 rounded-[14px] border overflow-hidden transition-all duration-200",
                  isDone ? "bg-muted/40 border-border" :
                  isActive ? "bg-card border-primary/25 shadow-card-hover" :
                  "bg-card border-border shadow-card"
                )}>
                  {/* Card header */}
                  <button
                    onClick={() => setExpanded(isExpanded ? null : i)}
                    className="w-full flex items-center gap-3 p-3.5 text-left"
                  >
                    <div className={cn("w-8 h-8 rounded-[8px] flex items-center justify-center flex-shrink-0", item.iconBg)}>
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={cn("text-[10px] font-bold uppercase tracking-widest", isActive ? "text-primary" : "text-muted-foreground")}>{item.day}</span>
                        {isDone && <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600">✓ Done</span>}
                        {isActive && <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-primary/10 text-primary animate-pulse">Active</span>}
                      </div>
                      <p className={cn("text-[13px] font-bold leading-tight", isDone ? "text-muted-foreground" : "text-foreground")}>{item.title}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-[10px] text-muted-foreground font-medium">{item.time}</span>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={cn("text-muted-foreground transition-transform duration-200", isExpanded ? "rotate-180" : "")}>
                        <path d="M3 5L7 9L11 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </button>

                  {/* Expanded subtasks */}
                  {isExpanded && (
                    <div className="px-3.5 pb-3.5 border-t border-border/60 animate-in fade-in duration-200">
                      <div className="flex items-center justify-between pt-3 mb-2.5">
                        <p className="text-[11px] font-semibold text-muted-foreground">{subsDone}/{item.subtasks.length} subtasks</p>
                        <div className="h-1 w-24 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${(subsDone / item.subtasks.length) * 100}%` }} />
                        </div>
                      </div>
                      <div className="space-y-2">
                        {item.subtasks.map((sub, j) => (
                          <button
                            key={j}
                            onClick={() => toggleSub(i, j)}
                            className="flex items-center gap-2.5 w-full text-left group"
                          >
                            <div className={cn(
                              "w-4 h-4 rounded-[4px] border flex items-center justify-center flex-shrink-0 transition-all",
                              subs[j] ? "bg-primary border-primary" : "border-border group-hover:border-primary/50"
                            )}>
                              {subs[j] && <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M1.5 4.5L3.5 6.5L7.5 2.5" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                            </div>
                            <span className={cn("text-[12px] leading-snug", subs[j] ? "line-through text-muted-foreground" : "text-foreground")}>{sub}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ─── Mock Interview Tab ───────────────────────────────────────

function InterviewTab() {
  const [filterCat, setFilterCat] = useState<QuestionCategory | "all">("all")
  const [qIndex, setQIndex] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [recording, setRecording] = useState(false)
  const [confidence, setConfidence] = useState<ConfidenceRating>(null)
  const [ratings, setRatings] = useState<Record<number, ConfidenceRating>>({})

  const filtered = filterCat === "all" ? MOCK_QUESTIONS : MOCK_QUESTIONS.filter((q) => q.category === filterCat)
  const safeIndex = Math.min(qIndex, filtered.length - 1)
  const q = filtered[safeIndex]
  const catMeta = CATEGORY_META[q.category]
  const diffMeta = DIFFICULTY_META[q.difficulty]

  function next() { setQIndex((i) => (i + 1) % filtered.length); reset() }
  function prev() { setQIndex((i) => (i - 1 + filtered.length) % filtered.length); reset() }
  function reset() { setRevealed(false); setRecording(false); setConfidence(null) }

  function rate(r: ConfidenceRating) {
    setConfidence(r)
    setRatings((prev) => ({ ...prev, [safeIndex]: r }))
    setTimeout(() => next(), 600)
  }

  const ratedCount = Object.keys(ratings).length
  const easyCount = Object.values(ratings).filter((r) => r === "easy").length

  return (
    <div className="px-4 lg:px-6 py-4 space-y-4">

      {/* Stats bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <div className="bg-card rounded-[10px] border border-border px-3 py-2 flex-shrink-0">
          <p className="text-[11px] text-muted-foreground">Done</p>
          <p className="text-[15px] font-bold text-foreground leading-none">{ratedCount}<span className="text-[10px] text-muted-foreground font-normal">/{filtered.length}</span></p>
        </div>
        <div className="bg-card rounded-[10px] border border-border px-3 py-2 flex-shrink-0">
          <p className="text-[11px] text-muted-foreground">Confident</p>
          <p className="text-[15px] font-bold text-emerald-600 leading-none">{easyCount}</p>
        </div>
        <div className="bg-card rounded-[10px] border border-border px-3 py-2 flex-shrink-0">
          <p className="text-[11px] text-muted-foreground">To review</p>
          <p className="text-[15px] font-bold text-amber-600 leading-none">{ratedCount - easyCount}</p>
        </div>
      </div>

      {/* Category filter chips */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {([{ id: "all", label: "All" }, ...Object.entries(CATEGORY_META).map(([id, m]) => ({ id, label: m.label }))] as { id: string; label: string }[]).map((c) => (
          <button
            key={c.id}
            onClick={() => { setFilterCat(c.id as QuestionCategory | "all"); setQIndex(0); reset() }}
            className={cn(
              "flex-shrink-0 px-3 py-1.5 rounded-full border text-[11px] font-semibold transition-all",
              filterCat === c.id
                ? "bg-primary text-primary-foreground border-primary shadow-sm"
                : "bg-card border-border text-muted-foreground hover:border-primary/40"
            )}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Progress dots */}
      <div className="flex items-center justify-between">
        <p className="text-[12px] text-muted-foreground font-medium">Q {safeIndex + 1} of {filtered.length}</p>
        <div className="flex gap-1.5 flex-wrap justify-end max-w-[160px]">
          {filtered.map((_, i) => {
            const r = ratings[i]
            return (
              <div key={i} className={cn(
                "rounded-full transition-all duration-300",
                i === safeIndex ? "w-4 h-2 bg-primary" :
                r === "easy" ? "w-2 h-2 bg-emerald-500" :
                r ? "w-2 h-2 bg-amber-500" :
                "w-2 h-2 bg-muted"
              )} />
            )
          })}
        </div>
      </div>

      {/* Question card */}
      <div className={cn("bg-card rounded-[16px] border shadow-card p-5", catMeta.bg)}>
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className={cn("flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full border", catMeta.bg, catMeta.color)}>
            <span className={cn("w-1.5 h-1.5 rounded-full flex-shrink-0", catMeta.dot)} />
            {catMeta.label}
          </span>
          <span className={cn("text-[10px] font-bold px-2.5 py-1 rounded-full border", diffMeta.color)}>
            {diffMeta.label}
          </span>
        </div>
        <p className="text-[14px] font-semibold text-foreground leading-relaxed">{q.q}</p>
        {q.tip && (
          <div className="mt-3 pt-3 border-t border-border/40 flex items-start gap-2">
            <span className="text-[12px] flex-shrink-0">💡</span>
            <p className="text-[11px] text-muted-foreground leading-relaxed">{q.tip}</p>
          </div>
        )}
      </div>

      {/* Record Answer */}
      <button
        onClick={() => setRecording((r) => !r)}
        className={cn(
          "w-full rounded-[12px] p-3.5 flex items-center gap-3 transition-all duration-200 btn-press border",
          recording ? "bg-red-50 border-red-200" : "bg-card border-border shadow-card"
        )}
      >
        <div className={cn("w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0", recording ? "bg-red-100" : "bg-accent")}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={recording ? "text-red-600" : "text-primary"}>
            <rect x="5" y="2" width="6" height="8" rx="3" stroke="currentColor" strokeWidth="1.4" />
            <path d="M3 9C3 11.76 5.24 14 8 14C10.76 14 13 11.76 13 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            <path d="M8 14V16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </div>
        <div className="flex-1 text-left">
          <p className={cn("text-[13px] font-semibold", recording ? "text-red-600" : "text-foreground")}>
            {recording ? "Recording… tap to stop" : "Record Your Answer"}
          </p>
          <p className="text-[11px] text-muted-foreground mt-0.5">Practise speaking out loud</p>
        </div>
        {recording && (
          <div className="flex gap-0.5 items-end h-5">
            {[3, 5, 2, 4, 3, 5, 2, 4].map((h, i) => (
              <div key={i} className="w-1 bg-red-400 rounded-full animate-pulse" style={{ height: `${h * 3}px`, animationDelay: `${i * 80}ms` }} />
            ))}
          </div>
        )}
      </button>

      {/* Reveal */}
      {!revealed ? (
        <button onClick={() => setRevealed(true)} className="w-full py-3.5 rounded-[12px] border border-border bg-card text-[13px] font-semibold text-foreground shadow-card btn-press">
          Reveal Model Answer
        </button>
      ) : (
        <div className="bg-emerald-50 rounded-[14px] border border-emerald-100 p-4 animate-in fade-in duration-300 space-y-3">
          <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-700">Model Answer</p>
          <p className="text-[12.5px] text-emerald-900 leading-relaxed">{q.a}</p>

          {/* Self-rate */}
          {!confidence && (
            <div className="pt-2 border-t border-emerald-200">
              <p className="text-[11px] font-semibold text-emerald-800 mb-2.5">How did you do?</p>
              <div className="flex gap-2">
                {([
                  { r: "easy" as const, label: "Got it ✓", cls: "bg-emerald-500 text-white border-emerald-500" },
                  { r: "medium" as const, label: "Partially", cls: "bg-amber-50 text-amber-700 border-amber-300" },
                  { r: "hard" as const, label: "Struggled", cls: "bg-red-50 text-red-600 border-red-300" },
                ]).map(({ r, label, cls }) => (
                  <button key={r} onClick={() => rate(r)} className={cn("flex-1 py-2 rounded-[10px] border text-[11px] font-bold btn-press transition-all", cls)}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
          )}
          {confidence && (
            <div className="flex items-center gap-2 pt-2 border-t border-emerald-200">
              <span className="text-[12px]">{confidence === "easy" ? "✅" : confidence === "medium" ? "🟡" : "🔴"}</span>
              <p className="text-[11px] font-semibold text-emerald-800">
                {confidence === "easy" ? "Great! Moving to next…" : confidence === "medium" ? "Review this one again later" : "Mark for revision"}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Nav */}
      <div className="flex gap-2.5">
        <button onClick={prev} className="flex-1 py-3 rounded-[12px] border border-border bg-card text-[13px] font-semibold text-foreground btn-press flex items-center justify-center gap-1.5">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 4L6 8L10 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          Prev
        </button>
        <button onClick={next} className="flex-1 py-3 rounded-[12px] bg-primary text-primary-foreground text-[13px] font-bold shadow-card btn-press flex items-center justify-center gap-1.5">
          Next
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </div>
    </div>
  )
}

// ─── Practice Questions Tab ───────────────────────────────────

function QuestionsTab() {
  const [filterCat, setFilterCat] = useState<QuestionCategory | "all">("all")
  const [expanded, setExpanded] = useState<number | null>(null)
  const [mastered, setMastered] = useState<Set<number>>(new Set())
  const [showFilter, setShowFilter] = useState<"all" | "pending" | "mastered">("all")

  const byCategory = MOCK_QUESTIONS.reduce<Record<QuestionCategory, typeof MOCK_QUESTIONS>>((acc, q) => {
    if (!acc[q.category]) acc[q.category] = []
    acc[q.category].push(q)
    return acc
  }, {} as Record<QuestionCategory, typeof MOCK_QUESTIONS>)

  const allFiltered = MOCK_QUESTIONS
    .map((q, origIdx) => ({ q, origIdx }))
    .filter(({ origIdx }) =>
      showFilter === "all" ? true :
      showFilter === "mastered" ? mastered.has(origIdx) :
      !mastered.has(origIdx)
    )
    .filter(({ q }) => filterCat === "all" || q.category === filterCat)

  const masterCount = mastered.size

  return (
    <div className="px-4 lg:px-6 py-4 space-y-4">

      {/* Summary */}
      <div className="bg-card rounded-[14px] border border-border shadow-card p-3.5 flex items-center gap-4">
        <div className="flex-1">
          <p className="text-[13px] font-bold text-foreground">{masterCount} / {MOCK_QUESTIONS.length} mastered</p>
          <div className="h-1.5 bg-muted rounded-full overflow-hidden mt-1.5">
            <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${(masterCount / MOCK_QUESTIONS.length) * 100}%` }} />
          </div>
        </div>
        <div className="flex gap-1.5">
          {(["all", "pending", "mastered"] as const).map((f) => (
            <button key={f} onClick={() => setShowFilter(f)}
              className={cn("px-2.5 py-1 rounded-full text-[10px] font-bold capitalize transition-all border",
                showFilter === f ? "bg-primary text-primary-foreground border-primary" : "bg-muted border-border text-muted-foreground"
              )}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {([{ id: "all", label: "All" }, ...Object.entries(CATEGORY_META).map(([id, m]) => ({ id, label: m.label }))] as { id: string; label: string }[]).map((c) => (
          <button key={c.id} onClick={() => setFilterCat(c.id as QuestionCategory | "all")}
            className={cn("flex-shrink-0 px-3 py-1.5 rounded-full border text-[11px] font-semibold transition-all",
              filterCat === c.id ? "bg-primary text-primary-foreground border-primary shadow-sm" : "bg-card border-border text-muted-foreground"
            )}>
            {c.label}
          </button>
        ))}
      </div>

      {/* Question list */}
      {allFiltered.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-[14px] font-semibold text-foreground">No questions here</p>
          <p className="text-[12px] text-muted-foreground mt-1">Try a different filter</p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {allFiltered.map(({ q, origIdx }) => {
            const cat = CATEGORY_META[q.category]
            const diff = DIFFICULTY_META[q.difficulty]
            const isMastered = mastered.has(origIdx)
            const isExp = expanded === origIdx

            return (
              <div key={origIdx} className={cn("bg-card rounded-[14px] border shadow-card overflow-hidden transition-all", isMastered ? "border-emerald-200 bg-emerald-50/30" : "border-border")}>
                <button onClick={() => setExpanded(isExp ? null : origIdx)} className="w-full p-4 text-left">
                  <div className="flex items-start gap-3">
                    {/* Category dot */}
                    <div className="flex flex-col items-center gap-1 flex-shrink-0 mt-0.5">
                      <div className={cn("w-2.5 h-2.5 rounded-full mt-1", cat.dot)} />
                    </div>
                    <div className="flex-1 min-w-0">
                      {/* Tags */}
                      <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
                        <span className={cn("text-[9px] font-bold px-1.5 py-0.5 rounded-full border", cat.bg, cat.color)}>{cat.label}</span>
                        <span className={cn("text-[9px] font-bold px-1.5 py-0.5 rounded-full border", diff.color)}>{diff.label}</span>
                        {isMastered && <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">✓ Mastered</span>}
                      </div>
                      <p className="text-[13px] font-semibold text-foreground leading-tight">{q.q}</p>
                    </div>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={cn("text-muted-foreground flex-shrink-0 mt-1 transition-transform duration-200", isExp ? "rotate-180" : "")}>
                      <path d="M3 5L7 9L11 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </button>

                {isExp && (
                  <div className="px-4 pb-4 border-t border-border/60 animate-in fade-in duration-200">
                    <div className="pt-3 space-y-3">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5">Answer Guide</p>
                        <p className="text-[12.5px] text-foreground leading-relaxed">{q.a}</p>
                      </div>
                      {q.tip && (
                        <div className="flex items-start gap-2 p-3 rounded-[10px] bg-amber-50 border border-amber-100">
                          <span className="text-[12px] flex-shrink-0">💡</span>
                          <p className="text-[11.5px] text-amber-900 leading-relaxed">{q.tip}</p>
                        </div>
                      )}
                      <button
                        onClick={() => setMastered((prev) => { const s = new Set(prev); if (s.has(origIdx)) s.delete(origIdx); else s.add(origIdx); return s })}
                        className={cn(
                          "w-full py-2.5 rounded-[10px] border text-[12px] font-semibold transition-all btn-press",
                          isMastered
                            ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                            : "bg-card border-border text-foreground hover:border-emerald-300"
                        )}
                      >
                        {isMastered ? "✓ Mastered — tap to unmark" : "Mark as Mastered"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

// ─── Main Export ──────────────────────────────────────────────

export function PreparationScreen() {
  const { prepJobId } = useApp()
  const [activeTab, setActiveTab] = useState<Tab>("roadmap")

  const job = MOCK_JOBS.find((j) => j.id === prepJobId) ?? MOCK_JOBS[0]

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    {
      id: "roadmap", label: "Roadmap",
      icon: <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M1 7H13M7 1L13 7L7 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>,
    },
    {
      id: "interview", label: "Mock Interview",
      icon: <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><rect x="1.5" y="2" width="11" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.3" /><path d="M4.5 13H9.5M7 10V13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>,
    },
    {
      id: "questions", label: "Practice Q's",
      icon: <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.3" /><path d="M5.5 5.5C5.5 4.67 6.17 4 7 4C7.83 4 8.5 4.67 8.5 5.5C8.5 6.33 7 7 7 8M7 10V10.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>,
    },
  ]

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-background overflow-hidden">

      {/* Header */}
      <div className="flex-shrink-0">
        {/* Gradient banner */}
        <div className="relative overflow-hidden px-4 lg:px-8 pt-12 lg:pt-6 pb-4"
          style={{ background: "linear-gradient(135deg, rgba(79,70,229,0.08) 0%, rgba(124,58,237,0.06) 100%)" }}>
          <div className="absolute inset-0 opacity-20"
            style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(79,70,229,0.3) 1px, transparent 0)", backgroundSize: "20px 20px" }} />

          <div className="relative flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary">5-Day AI Prep Plan</span>
                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">AI</span>
              </div>
              <h1 className="text-[19px] font-bold text-foreground tracking-tight leading-tight">{job.title}</h1>
              <p className="text-[12px] text-muted-foreground font-medium mt-0.5">{job.company} · {job.isRemote ? "Remote" : job.location}</p>
            </div>
            <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
              <div className={cn("w-11 h-11 rounded-[10px] flex items-center justify-center text-[12px] font-bold", job.color)}>
                {job.initials}
              </div>
              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                Interview in 3d
              </span>
            </div>
          </div>
        </div>

        {/* Tab bar */}
        <div className="px-4 lg:px-8 pb-3 border-b border-border">
          <div className="flex bg-muted rounded-[12px] p-1 gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex-1 flex items-center justify-center gap-1.5 py-2 rounded-[9px] text-[11px] font-bold transition-all duration-200 btn-press",
                  activeTab === tab.id
                    ? "bg-card text-foreground shadow-card"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.label.split(" ")[0]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto min-h-0 pb-4">
        {activeTab === "roadmap" && <RoadmapTab jobTitle={job.title} />}
        {activeTab === "interview" && <InterviewTab />}
        {activeTab === "questions" && <QuestionsTab />}
      </div>
    </div>
  )
}
