"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { useApp } from "@/lib/app-context"
import { Resume } from "@/lib/mock-data"

// ─── Sub-screens ──────────────────────────────────────────────

type SubScreen = "list" | "form" | "preview" | "optimize"

const STEP_LABELS = ["Personal Info", "Experience", "Skills & Summary"]

function BackButton({ onBack }: { onBack: () => void }) {
  return (
    <button
      onClick={onBack}
      className="flex items-center gap-1.5 text-primary text-[14px] font-semibold btn-press tap-highlight-none mb-1"
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M11 4L6 9L11 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      Back
    </button>
  )
}

// ─── Resume List ──────────────────────────────────────────────

function ResumeList({ onCreate, onPreview }: { onCreate: () => void; onPreview: (r: Resume) => void }) {
  const { resumes } = useApp()

  return (
    <div className="flex-1 overflow-y-auto bg-background">
      <div className="px-4 pt-14 pb-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Your Resumes</h1>
          <p className="text-sm text-muted-foreground mt-0.5 font-medium">AI-powered resume builder</p>
        </div>

        {/* Primary CTA */}
        <button
          onClick={onCreate}
          className="w-full bg-primary rounded-[14px] p-5 mb-3 shadow-card btn-press text-left"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-[12px] bg-white/20 flex items-center justify-center text-primary-foreground flex-shrink-0">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 5V19M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-base font-bold text-primary-foreground leading-tight">Create Resume with AI</p>
              <p className="text-[12px] text-primary-foreground/70 mt-0.5 font-medium">Generate a tailored resume in seconds</p>
            </div>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M5 3L9 7L5 11" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </button>

        {/* Upload option */}
        <div className="bg-card rounded-[14px] p-4 mb-6 border border-border shadow-card card-tap cursor-pointer">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-[10px] bg-accent flex items-center justify-center text-primary flex-shrink-0">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 3V14M10 3L6.5 6.5M10 3L13.5 6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M3 17H17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-[14px] font-semibold text-foreground leading-tight">Upload & Improve Existing Resume</p>
              <p className="text-[11px] text-muted-foreground mt-0.5 font-medium">Get AI-powered suggestions</p>
            </div>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-muted-foreground">
              <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold text-foreground">My Resumes</h2>
          <span className="text-xs text-muted-foreground font-medium">{resumes.length} resumes</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {resumes.map((resume) => (
            <button
              key={resume.id}
              onClick={() => onPreview(resume)}
              className="bg-card rounded-[14px] p-3.5 shadow-card border border-border card-tap text-left"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-[10px] bg-accent flex items-center justify-center text-primary flex-shrink-0">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <rect x="3" y="2" width="14" height="16" rx="2.5" stroke="currentColor" strokeWidth="1.4" />
                    <path d="M6 7H14M6 10.5H11M6 14H12.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M9.5 2L12 4.5L4.5 12H2V9.5L9.5 2Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
              <p className="text-[12px] font-semibold text-foreground leading-tight mb-1 text-balance">{resume.name}</p>
              <p className="text-[10px] text-muted-foreground font-medium mb-2.5">{resume.edited}</p>
              <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full", resume.scoreColor)}>
                ATS {resume.score}%
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Resume Form (3-step) ─────────────────────────────────────

type FormData = {
  name: string; email: string; phone: string; location: string
  jobTitle: string; company: string; years: string; description: string
  skills: string; summary: string; targetRole: string
}

function ResumeForm({ onBack, onDone }: { onBack: () => void; onDone: (data: FormData) => void }) {
  const [step, setStep] = useState(0)
  const [data, setData] = useState<FormData>({
    name: "Mohit Rawat", email: "mohit@example.com", phone: "+1 415-555-0192", location: "San Francisco, CA",
    jobTitle: "AI Engineer", company: "Scale AI", years: "3", description: "Built and deployed NLP pipelines serving 10M+ requests/day.",
    skills: "Python, PyTorch, LLMs, SQL, React", summary: "Passionate AI engineer with 3+ years building production ML systems.",
    targetRole: "AI Engineer",
  })

  const set = (key: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setData((d) => ({ ...d, [key]: e.target.value }))

  const inputCls = "w-full bg-background border border-border rounded-[10px] px-3.5 py-2.5 text-[13px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
  const labelCls = "block text-[11px] font-semibold text-muted-foreground uppercase tracking-widest mb-1.5"

  return (
    <div className="flex-1 flex flex-col bg-background">
      {/* Header */}
      <div className="px-4 pt-14 pb-4 border-b border-border flex-shrink-0">
        <BackButton onBack={onBack} />
        <h1 className="text-xl font-bold text-foreground tracking-tight">Create Resume</h1>
        <p className="text-[12px] text-muted-foreground mt-0.5 font-medium">Step {step + 1} of {STEP_LABELS.length} — {STEP_LABELS[step]}</p>
        {/* Step progress */}
        <div className="flex gap-1.5 mt-3">
          {STEP_LABELS.map((_, i) => (
            <div key={i} className={cn("h-1 flex-1 rounded-full transition-all duration-300", i <= step ? "bg-primary" : "bg-muted")} />
          ))}
        </div>
      </div>

      {/* Fields */}
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4">
        {step === 0 && (
          <>
            <div><label className={labelCls}>Full Name</label><input value={data.name} onChange={set("name")} className={inputCls} /></div>
            <div><label className={labelCls}>Email</label><input value={data.email} onChange={set("email")} className={inputCls} /></div>
            <div><label className={labelCls}>Phone</label><input value={data.phone} onChange={set("phone")} className={inputCls} /></div>
            <div><label className={labelCls}>Location</label><input value={data.location} onChange={set("location")} className={inputCls} /></div>
          </>
        )}
        {step === 1 && (
          <>
            <div><label className={labelCls}>Most Recent Job Title</label><input value={data.jobTitle} onChange={set("jobTitle")} className={inputCls} /></div>
            <div><label className={labelCls}>Company</label><input value={data.company} onChange={set("company")} className={inputCls} /></div>
            <div><label className={labelCls}>Years of Experience</label><input value={data.years} onChange={set("years")} className={inputCls} /></div>
            <div>
              <label className={labelCls}>Key Achievements</label>
              <textarea value={data.description} onChange={set("description")} rows={3} className={cn(inputCls, "resize-none leading-relaxed")} />
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <div><label className={labelCls}>Target Role</label><input value={data.targetRole} onChange={set("targetRole")} className={inputCls} /></div>
            <div><label className={labelCls}>Skills (comma-separated)</label><input value={data.skills} onChange={set("skills")} className={inputCls} /></div>
            <div>
              <label className={labelCls}>Professional Summary</label>
              <textarea value={data.summary} onChange={set("summary")} rows={4} className={cn(inputCls, "resize-none leading-relaxed")} />
            </div>
          </>
        )}
      </div>

      {/* CTA */}
      <div className="px-4 pb-5 pt-3 border-t border-border flex-shrink-0 flex gap-2.5">
        {step > 0 && (
          <button
            onClick={() => setStep((s) => s - 1)}
            className="flex-1 py-3.5 rounded-[12px] border border-border bg-card text-[14px] font-semibold text-foreground btn-press"
          >
            Back
          </button>
        )}
        <button
          onClick={() => step < STEP_LABELS.length - 1 ? setStep((s) => s + 1) : onDone(data)}
          className="flex-1 py-3.5 rounded-[12px] bg-primary text-primary-foreground text-[14px] font-bold shadow-card btn-press"
        >
          {step < STEP_LABELS.length - 1 ? "Continue" : "Generate Resume"}
        </button>
      </div>
    </div>
  )
}

// ─── Resume Preview ───────────────────────────────────────────

function ResumePreview({ resume, onBack, onOptimize }: { resume: Resume; onBack: () => void; onOptimize: () => void }) {
  const { showToast } = useApp()
  const [atsVisible, setAtsVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setAtsVisible(true), 400)
    return () => clearTimeout(t)
  }, [])

  const score = resume.score
  const scoreColor = score >= 85 ? "text-emerald-600" : score >= 70 ? "text-amber-600" : "text-orange-600"
  const barColor = score >= 85 ? "bg-emerald-500" : score >= 70 ? "bg-amber-500" : "bg-orange-500"

  return (
    <div className="flex-1 flex flex-col bg-background">
      <div className="px-4 pt-14 pb-4 border-b border-border flex-shrink-0">
        <BackButton onBack={onBack} />
        <h1 className="text-xl font-bold text-foreground">{resume.name}</h1>
        <p className="text-[12px] text-muted-foreground mt-0.5 font-medium">Preview · {resume.edited}</p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-5">
        {/* ATS Score Card */}
        <div className="bg-card rounded-[14px] border border-border shadow-card p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[13px] font-semibold text-foreground">ATS Score</p>
            <span className={cn("text-[18px] font-extrabold transition-all duration-500", atsVisible ? scoreColor : "text-muted-foreground")}>
              {atsVisible ? `${score}%` : "—"}
            </span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className={cn("h-full rounded-full transition-all duration-700", barColor)}
              style={{ width: atsVisible ? `${score}%` : "0%" }}
            />
          </div>
          <p className="text-[11px] text-muted-foreground mt-2 font-medium">
            {score >= 85 ? "Excellent match for most ATS systems." : score >= 70 ? "Good score — optimize keywords to boost further." : "Needs improvement — missing key skills and keywords."}
          </p>
        </div>

        {/* Simulated resume paper */}
        <div className="bg-card rounded-[14px] border border-border shadow-card p-5 mb-4 space-y-4">
          <div className="border-b border-border pb-3">
            <h2 className="text-[17px] font-bold text-foreground">Mohit Rawat</h2>
            <p className="text-[12px] text-muted-foreground font-medium mt-0.5">AI Engineer · San Francisco, CA</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">mohit@example.com · +1 415-555-0192</p>
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-primary mb-1.5">Summary</p>
            <p className="text-[12px] text-foreground leading-relaxed">Passionate AI engineer with 3+ years building production ML systems at scale. Proven track record delivering measurable impact across NLP, LLMs, and data pipelines.</p>
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-primary mb-1.5">Experience</p>
            <p className="text-[12px] font-semibold text-foreground">AI Engineer — Scale AI</p>
            <p className="text-[11px] text-muted-foreground mb-1">3 years</p>
            <p className="text-[12px] text-foreground leading-relaxed">Built and deployed NLP pipelines serving 10M+ requests/day. Reduced inference latency by 5x through quantization and ONNX export.</p>
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-primary mb-2">Skills</p>
            <div className="flex flex-wrap gap-1.5">
              {["Python", "PyTorch", "LLMs", "SQL", "React", "Node.js"].map((s) => (
                <span key={s} className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-accent text-accent-foreground">{s}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2.5">
          <button
            onClick={() => showToast("Resume downloaded as PDF", "success")}
            className="flex-1 py-3 rounded-[12px] border border-border bg-card text-[13px] font-semibold text-foreground btn-press flex items-center justify-center gap-2"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 3V10M8 10L5 7M8 10L11 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 13H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            Download PDF
          </button>
          <button
            onClick={onOptimize}
            className="flex-1 py-3 rounded-[12px] bg-primary text-primary-foreground text-[13px] font-bold shadow-card btn-press"
          >
            Optimize for Job
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Resume Optimize ──────────────────────────────────────────

function ResumeOptimize({ resume, onBack }: { resume: Resume; onBack: () => void }) {
  const suggestions = [
    { type: "Add", text: "Include 'RLHF' and 'Constitutional AI' in your skills section.", done: false },
    { type: "Improve", text: "Quantify your impact in role descriptions — add % metrics.", done: false },
    { type: "Add", text: "Add a 'Key Projects' section featuring an LLM fine-tuning demo.", done: false },
    { type: "Remove", text: "Remove outdated skills like 'Hadoop' — replace with 'Spark'.", done: false },
  ]
  const [done, setDone] = useState<boolean[]>(suggestions.map(() => false))

  return (
    <div className="flex-1 flex flex-col bg-background">
      <div className="px-4 pt-14 pb-4 border-b border-border flex-shrink-0">
        <BackButton onBack={onBack} />
        <h1 className="text-xl font-bold text-foreground">Optimize for Job</h1>
        <p className="text-[12px] text-muted-foreground mt-0.5 font-medium">AI suggestions for {resume.name}</p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-5">
        {/* Score delta */}
        <div className="bg-primary rounded-[14px] p-4 mb-5 text-primary-foreground">
          <p className="text-[12px] font-semibold text-primary-foreground/70 mb-1">Projected ATS Score</p>
          <div className="flex items-end gap-2">
            <span className="text-[32px] font-extrabold leading-none">{resume.score + done.filter(Boolean).length * 2}%</span>
            <span className="text-[14px] font-semibold text-primary-foreground/70 mb-1">
              +{done.filter(Boolean).length * 2}% from {done.filter(Boolean).length} fix{done.filter(Boolean).length !== 1 ? "es" : ""}
            </span>
          </div>
          <div className="mt-3 h-1.5 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all duration-500"
              style={{ width: `${Math.min(resume.score + done.filter(Boolean).length * 2, 100)}%` }}
            />
          </div>
        </div>

        <h3 className="text-[14px] font-semibold text-foreground mb-3">AI Suggestions</h3>
        <div className="space-y-3">
          {suggestions.map((s, i) => (
            <button
              key={i}
              onClick={() => setDone((d) => { const n = [...d]; n[i] = !n[i]; return n })}
              className={cn(
                "w-full rounded-[12px] p-3.5 border text-left transition-all duration-200 card-tap",
                done[i] ? "bg-emerald-50 border-emerald-200" : "bg-card border-border shadow-card"
              )}
            >
              <div className="flex items-start gap-3">
                <div className={cn(
                  "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all",
                  done[i] ? "bg-emerald-500 border-emerald-500" : "border-muted-foreground"
                )}>
                  {done[i] && <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5L4 7L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </div>
                <div className="flex-1">
                  <span className={cn(
                    "text-[10px] font-bold uppercase tracking-widest mr-1.5",
                    s.type === "Add" ? "text-primary" : s.type === "Remove" ? "text-destructive" : "text-amber-600"
                  )}>
                    {s.type}
                  </span>
                  <p className={cn("text-[12px] leading-relaxed mt-0.5", done[i] ? "text-muted-foreground line-through" : "text-foreground")}>{s.text}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Main Export ──────────────────────────────────────────────

export function ResumeScreen() {
  const { screen, navigate, goBack, addResume, showToast, resumes } = useApp()
  const [subScreen, setSubScreen] = useState<SubScreen>("list")
  const [activeResume, setActiveResume] = useState<Resume | null>(null)

  // Sync with global screen (for deep linking from Smart Apply / Jobs)
  useEffect(() => {
    if (screen === "resume-form") setSubScreen("form")
    else if (screen === "resume-preview") setSubScreen("preview")
    else if (screen === "resume-optimize") setSubScreen("optimize")
    else setSubScreen("list")
  }, [screen])

  function handleCreate() {
    setSubScreen("form")
    navigate("resume-form")
  }

  function handleFormDone() {
    const newResume: Resume = {
      id: `r${Date.now()}`,
      name: "New AI Engineer Resume",
      edited: "Just now",
      score: 88,
      scoreColor: "text-emerald-600 bg-emerald-50",
    }
    addResume(newResume)
    setActiveResume(newResume)
    setSubScreen("preview")
    showToast("Resume created with AI", "success")
  }

  function handlePreview(r: Resume) {
    setActiveResume(r)
    setSubScreen("preview")
  }

  function handleBack() {
    goBack()
    setSubScreen("list")
    setActiveResume(null)
  }

  function handleOptimize() {
    setSubScreen("optimize")
  }

  if (subScreen === "form") return <ResumeForm onBack={handleBack} onDone={handleFormDone} />
  if (subScreen === "preview" && activeResume) return <ResumePreview resume={activeResume} onBack={handleBack} onOptimize={handleOptimize} />
  if (subScreen === "optimize" && activeResume) return <ResumeOptimize resume={activeResume} onBack={() => setSubScreen("preview")} />

  return <ResumeList onCreate={handleCreate} onPreview={handlePreview} />
}
