"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { useApp } from "@/lib/app-context"

type InterviewType = "behavioral" | "technical" | "hr"
type Phase = "welcome" | "question" | "feedback" | "summary"

const INTERVIEW_DATA: Record<InterviewType, { label: string; questions: { q: string; tips: string; score: number }[] }> = {
  behavioral: {
    label: "Behavioral",
    questions: [
      { q: "Tell me about a time you led a project under tight deadlines. How did you manage it?", tips: "Use STAR method. Focus on your specific role, actions taken, and measurable outcomes.", score: 8 },
      { q: "Describe a situation where you had to work with a difficult team member. What did you do?", tips: "Show emotional intelligence. Emphasize communication and how the relationship improved.", score: 7 },
      { q: "Give an example of when you failed. What did you learn?", tips: "Be honest — pick a real failure. Focus 70% on learnings and what changed after.", score: 8 },
      { q: "Tell me about a time you influenced someone without direct authority.", tips: "Data-backed persuasion stories work best. Show alignment with their goals.", score: 9 },
      { q: "Describe a situation where you had to make a decision with incomplete information.", tips: "Show structured thinking: what data you had, your risk assessment, and how you validated.", score: 7 },
    ],
  },
  technical: {
    label: "Technical",
    questions: [
      { q: "Explain the architecture of a real-time recommendation system for 100 million users.", tips: "Split into retrieval (two-tower + ANN) and ranking stages. Cover latency, cold-start, and data freshness.", score: 8 },
      { q: "How would you detect and handle data drift in a production ML model?", tips: "Mention PSI, KS-test, Evidently AI. Cover retraining triggers and rollback strategy.", score: 7 },
      { q: "Design a system to process 1 million payment transactions per second.", tips: "Focus on horizontal scaling, partitioning, event sourcing, idempotency, and consistency trade-offs.", score: 9 },
      { q: "Explain the attention mechanism and why it replaced RNNs.", tips: "Cover scaled dot-product attention, O(n²) complexity, multi-head parallelism, and long-range dependencies.", score: 8 },
      { q: "How do you debug a model regression after a data pipeline change?", tips: "Bisect: compare outputs before/after. Check input distributions, schema drift, label changes. Use ablations.", score: 7 },
    ],
  },
  hr: {
    label: "HR Round",
    questions: [
      { q: "Where do you see yourself in 5 years?", tips: "Align with the company's growth trajectory. Show ambition but also commitment to the current role.", score: 8 },
      { q: "Why do you want to join our company specifically?", tips: "Research their recent products, culture, and mission. Be specific — avoid generic answers.", score: 9 },
      { q: "What is your expected compensation and how did you arrive at that?", tips: "Give a range based on market data. Show you've researched — mention CRED / Zepto benchmarks at your level.", score: 7 },
      { q: "How do you handle work-life balance during high-pressure releases?", tips: "Show self-awareness and good boundaries. Mention systems/processes that help you stay sustainable.", score: 8 },
      { q: "Do you have any competing offers? How are you thinking about this decision?", tips: "Be honest but diplomatic. Focus on what matters most to you: impact, growth, culture, compensation.", score: 8 },
    ],
  },
}

const TYPE_OPTIONS: { id: InterviewType; label: string; desc: string }[] = [
  { id: "behavioral", label: "Behavioral", desc: "STAR method, leadership, conflict resolution" },
  { id: "technical", label: "Technical", desc: "ML systems, architecture, algorithms" },
  { id: "hr", label: "HR Round", desc: "Salary, culture fit, career goals" },
]

export function AiInterviewScreen() {
  const { goBack, profile, showToast } = useApp()
  const [phase, setPhase] = useState<Phase>("welcome")
  const [interviewType, setInterviewType] = useState<InterviewType | null>(null)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [answer, setAnswer] = useState("")
  const [answers, setAnswers] = useState<string[]>([])
  const [showFeedback, setShowFeedback] = useState(false)

  const displayName = profile.name.split(" ")[0]

  function startInterview(type: InterviewType) {
    setInterviewType(type)
    setPhase("question")
    setQuestionIndex(0)
    setAnswers([])
    setAnswer("")
    setShowFeedback(false)
  }

  function submitAnswer() {
    if (!answer.trim()) return
    setShowFeedback(true)
  }

  function nextQuestion() {
    const questions = INTERVIEW_DATA[interviewType!].questions
    setAnswers((prev) => [...prev, answer])
    setAnswer("")
    setShowFeedback(false)
    if (questionIndex + 1 >= questions.length) {
      setPhase("summary")
    } else {
      setQuestionIndex((i) => i + 1)
    }
  }

  function handleFinish() {
    showToast("Mock interview complete. Well done.", "success")
    goBack()
  }

  const currentQuestion = interviewType ? INTERVIEW_DATA[interviewType].questions[questionIndex] : null
  const totalQuestions = interviewType ? INTERVIEW_DATA[interviewType].questions.length : 0
  const avgScore = interviewType
    ? Math.round(INTERVIEW_DATA[interviewType].questions.reduce((s, q) => s + q.score, 0) / totalQuestions)
    : 0

  return (
    <div className="flex-1 flex flex-col bg-background min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 lg:px-8 pt-14 lg:pt-6 pb-4 bg-card border-b border-border">
        <button onClick={goBack} className="w-8 h-8 rounded-full bg-muted flex items-center justify-center tap-highlight-none btn-press">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>

        {/* Vibe avatar */}
        <div className="relative">
          <div className="w-9 h-9 rounded-[10px] bg-foreground flex items-center justify-center text-background font-bold text-[13px]">
            Vi
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-card" />
        </div>

        <div>
          <p className="text-[13px] font-bold text-foreground">Interview Coach</p>
          <p className="text-[10px] text-muted-foreground font-medium">Mock sessions · 5 questions</p>
        </div>

        {phase === "question" && interviewType && (
          <div className="ml-auto text-right">
            <p className="text-[10px] font-bold text-primary">{questionIndex + 1} / {totalQuestions}</p>
            <p className="text-[9px] text-muted-foreground">{INTERVIEW_DATA[interviewType].label}</p>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-4 lg:px-8 py-5">

        {/* Welcome Phase */}
        {phase === "welcome" && (
          <div>
            {/* Greeting bubble */}
            <div className="flex items-start gap-2.5 mb-6">
              <div className="w-8 h-8 rounded-[8px] bg-foreground flex items-center justify-center text-background font-bold text-[11px] flex-shrink-0 mt-0.5">
                Vi
              </div>
              <div className="bg-accent rounded-[14px] rounded-tl-[4px] px-4 py-3 max-w-[85%]">
                <p className="text-[13px] font-semibold text-foreground leading-relaxed">
                  Hello {displayName}, I&apos;m <span className="text-primary font-bold">Vibe</span>, your interview coach.
                </p>
                <p className="text-[12px] text-muted-foreground mt-1.5 leading-relaxed">
                  We&apos;ll practice 5 questions tailored to your ML background and Swiggy experience. Which round would you like to focus on?
                </p>
              </div>
            </div>

            {/* Interview type options */}
            <p className="text-[12px] font-semibold text-muted-foreground mb-3 ml-1">Choose interview type:</p>
            <div className="space-y-2.5">
              {TYPE_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => startInterview(opt.id)}
                  className="w-full flex items-center gap-3 bg-card rounded-[14px] p-4 shadow-card border border-border card-tap text-left"
                >
                  <div className="w-9 h-9 rounded-[10px] bg-accent flex items-center justify-center flex-shrink-0">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-primary"><circle cx="8" cy="5.5" r="2.5" stroke="currentColor" strokeWidth="1.3"/><path d="M2.5 13C2.5 10.79 5.02 9 8 9C10.98 9 13.5 10.79 13.5 13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-[13px] font-bold text-foreground">{opt.label}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{opt.desc}</p>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-muted-foreground flex-shrink-0"><path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              ))}
            </div>

            {/* Info chip */}
            <div className="mt-4 bg-primary/8 rounded-[12px] px-4 py-3 flex items-center gap-2.5">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-primary flex-shrink-0"><circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.4"/><path d="M8 7V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="8" cy="5.5" r="0.75" fill="currentColor"/></svg>
              <p className="text-[11px] text-primary font-medium">5 questions · Feedback after each · Summary at end</p>
            </div>
          </div>
        )}

        {/* Question Phase */}
        {phase === "question" && currentQuestion && interviewType && (
          <div>
            {/* Progress bar */}
            <div className="h-1 bg-muted rounded-full mb-5 overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${((questionIndex) / totalQuestions) * 100}%` }}
              />
            </div>

            {/* AI question bubble */}
            <div className="flex items-start gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-[8px] bg-foreground flex items-center justify-center text-background font-bold text-[11px] flex-shrink-0 mt-0.5">
                Vi
              </div>
              <div>
                <div className="bg-accent rounded-[14px] rounded-tl-[4px] px-4 py-3">
                  <p className="text-[10px] font-bold text-primary mb-1.5 uppercase tracking-wide">Question {questionIndex + 1}</p>
                  <p className="text-[13px] font-semibold text-foreground leading-relaxed">{currentQuestion.q}</p>
                </div>
              </div>
            </div>

            {/* Answer input */}
            {!showFeedback && (
              <div className="bg-card rounded-[14px] border border-border p-3 shadow-card">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide mb-2">Your answer</p>
                <textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Type your answer here..."
                  className="w-full text-[12.5px] text-foreground bg-transparent resize-none outline-none placeholder:text-muted-foreground/60 leading-relaxed"
                  rows={5}
                />
                <button
                  onClick={submitAnswer}
                  disabled={!answer.trim()}
                  className={cn(
                    "w-full mt-2 py-2.5 rounded-[10px] text-[13px] font-bold transition-all",
                    answer.trim()
                      ? "bg-primary text-primary-foreground btn-press"
                      : "bg-muted text-muted-foreground cursor-not-allowed"
                  )}
                >
                  Submit Answer
                </button>
              </div>
            )}

            {/* AI Feedback */}
            {showFeedback && (
              <div>
                {/* User answer */}
                <div className="flex justify-end mb-3">
                  <div className="bg-primary rounded-[14px] rounded-tr-[4px] px-4 py-3 max-w-[85%]">
                    <p className="text-[12px] text-primary-foreground leading-relaxed line-clamp-3">{answer}</p>
                  </div>
                </div>

                {/* AI feedback */}
                <div className="flex items-start gap-2.5 mb-4">
                  <div className="w-8 h-8 rounded-[8px] flex items-center justify-center text-white flex-shrink-0 mt-0.5" style={{ background: "linear-gradient(135deg, #4F46E5, #7C3AED)" }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="5.5" r="2.5" stroke="white" strokeWidth="1.3"/><path d="M2.5 13C2.5 10.79 5.02 9 8 9C10.98 9 13.5 10.79 13.5 13" stroke="white" strokeWidth="1.3" strokeLinecap="round"/></svg>
                  </div>
                  <div className="flex-1">
                    <div className="bg-accent rounded-[14px] rounded-tl-[4px] px-4 py-3 mb-2">
                      {/* Score */}
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase">Score</span>
                        <div className="flex gap-0.5">
                          {Array.from({ length: 10 }).map((_, i) => (
                            <div
                              key={i}
                              className={cn(
                                "w-3 h-1.5 rounded-full",
                                i < currentQuestion.score ? "bg-primary" : "bg-muted"
                              )}
                            />
                          ))}
                        </div>
                        <span className="text-[11px] font-extrabold text-primary">{currentQuestion.score}/10</span>
                      </div>
                      <p className="text-[12.5px] font-semibold text-foreground leading-relaxed">{currentQuestion.tips}</p>
                    </div>

                    <button
                      onClick={nextQuestion}
                      className="w-full py-2.5 bg-primary text-primary-foreground rounded-[10px] text-[13px] font-bold btn-press"
                    >
                      {questionIndex + 1 < totalQuestions ? `Next Question →` : "View Summary"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Summary Phase */}
        {phase === "summary" && interviewType && (
          <div>
            {/* AI summary bubble */}
            <div className="flex items-start gap-2.5 mb-5">
              <div className="w-8 h-8 rounded-[8px] bg-foreground flex items-center justify-center text-background font-bold text-[11px] flex-shrink-0 mt-0.5">
                Vi
              </div>
              <div className="bg-accent rounded-[14px] rounded-tl-[4px] px-4 py-3">
                <p className="text-[13px] font-semibold text-foreground leading-relaxed">
                  You completed the <span className="text-primary font-bold">{INTERVIEW_DATA[interviewType].label}</span> round. Here&apos;s your performance summary:
                </p>
              </div>
            </div>

            {/* Overall score card */}
            <div className="bg-card rounded-[16px] p-5 shadow-card border border-border mb-4 text-center">
              <div
                className="w-20 h-20 rounded-full mx-auto mb-3 flex items-center justify-center text-background text-[28px] font-extrabold bg-foreground"
              >
                {avgScore}
              </div>
              <p className="text-[13px] font-bold text-foreground">Overall Score</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">out of 10 · {INTERVIEW_DATA[interviewType].label}</p>
              <div className="mt-3 flex justify-center gap-2">
                <span className={cn(
                  "text-[10px] font-bold px-2.5 py-1 rounded-full",
                  avgScore >= 8 ? "bg-emerald-50 text-emerald-700" : avgScore >= 6 ? "bg-amber-50 text-amber-700" : "bg-red-50 text-red-700"
                )}>
                  {avgScore >= 8 ? "Excellent" : avgScore >= 6 ? "Good" : "Needs Practice"}
                </span>
              </div>
            </div>

            {/* Per-question breakdown */}
            <div className="bg-card rounded-[14px] p-4 shadow-card border border-border mb-4">
              <p className="text-[12px] font-bold text-foreground mb-3">Question Breakdown</p>
              <div className="space-y-2.5">
                {INTERVIEW_DATA[interviewType].questions.map((q, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-accent flex items-center justify-center text-[9px] font-bold text-primary flex-shrink-0">{i + 1}</span>
                    <p className="text-[11px] text-muted-foreground flex-1 truncate">{q.q.split("?")[0]}?</p>
                    <span className={cn(
                      "text-[10px] font-extrabold px-1.5 py-0.5 rounded-full flex-shrink-0",
                      q.score >= 8 ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                    )}>{q.score}/10</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Next steps */}
            <div className="bg-primary/8 rounded-[12px] px-4 py-3 mb-5">
              <p className="text-[11px] font-bold text-primary mb-1">Coach Tip</p>
              <p className="text-[11px] text-foreground/80 leading-relaxed">
                {avgScore >= 8
                  ? "Solid performance! Try another round next — especially the Technical round if you haven't yet."
                  : "Practice makes perfect. Do one round daily and structure your answers using the STAR method."}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setPhase("welcome")}
                className="flex-1 py-3 bg-muted text-foreground rounded-[12px] text-[13px] font-bold btn-press"
              >
                Practice Again
              </button>
              <button
                onClick={handleFinish}
                className="flex-1 py-3 bg-primary text-primary-foreground rounded-[12px] text-[13px] font-bold btn-press"
              >
                Done ✓
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
