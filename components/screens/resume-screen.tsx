"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { useApp } from "@/lib/app-context"
import { Resume } from "@/lib/mock-data"

type SubScreen = "list" | "template-pick" | "form" | "preview" | "optimize"

const STEP_LABELS = ["Personal Info", "Experience", "Skills & Summary"]

// ─── Resume Templates ─────────────────────────────────────────────────────────

const TEMPLATES = [
  {
    id: "classic",
    name: "Classic LaTeX",
    desc: "Academic-style, ATS champion",
    accent: "bg-foreground",
    preview: "columns-1 left-aligned ruled",
  },
  {
    id: "modern",
    name: "Modern Pro",
    desc: "Two-column, sidebar layout",
    accent: "bg-primary",
    preview: "sidebar",
  },
  {
    id: "minimal",
    name: "Minimal",
    desc: "Clean whitespace, no lines",
    accent: "bg-muted-foreground",
    preview: "clean",
  },
]

function BackButton({ onBack, label = "Back" }: { onBack: () => void; label?: string }) {
  return (
    <button
      onClick={onBack}
      className="flex items-center gap-1.5 text-primary text-[14px] font-semibold btn-press tap-highlight-none"
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M11 4L6 9L11 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {label}
    </button>
  )
}

// ─── Resume List ──────────────────────────────────────────────────────────────

function ResumeList({ onCreate, onPreview }: { onCreate: () => void; onPreview: (r: Resume) => void }) {
  const { resumes } = useApp()

  return (
    <div className="flex-1 overflow-y-auto bg-background">
      <div className="px-4 pt-14 pb-6">
        <div className="mb-5">
          <h1 className="text-[22px] font-bold text-foreground tracking-tight">Resume Builder</h1>
          <p className="text-[13px] text-muted-foreground mt-0.5 font-medium">LaTeX-quality resumes in seconds</p>
        </div>

        {/* Primary CTA */}
        <button
          onClick={onCreate}
          className="w-full bg-primary rounded-[16px] p-5 mb-3 shadow-card btn-press tap-highlight-none text-left"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-[12px] bg-white/20 flex items-center justify-center flex-shrink-0">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 5V19M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-[15px] font-bold text-primary-foreground">Create New Resume</p>
              <p className="text-[11.5px] text-primary-foreground/70 mt-0.5 font-medium">Pick a LaTeX template, fill in details</p>
            </div>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M5 3L9 7L5 11" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </button>

        {/* Upload */}
        <div className="bg-card rounded-[14px] p-4 mb-6 border border-border shadow-card card-tap cursor-pointer">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-[10px] bg-accent flex items-center justify-center text-primary flex-shrink-0">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 3V13M10 3L6.5 6.5M10 3L13.5 6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M3 17H17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-[14px] font-semibold text-foreground">Upload & Improve</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">AI analyzes and optimizes your existing resume</p>
            </div>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-muted-foreground">
              <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* My Resumes */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[15px] font-bold text-foreground">My Resumes</h2>
          <span className="text-[11px] text-muted-foreground font-medium">{resumes.length} files</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {resumes.map((resume) => (
            <button
              key={resume.id}
              onClick={() => onPreview(resume)}
              className="bg-card rounded-[14px] p-3.5 shadow-card border border-border card-tap text-left"
            >
              {/* Mini LaTeX document thumbnail */}
              <div className="w-full h-20 bg-background border border-border rounded-[8px] mb-3 overflow-hidden relative">
                <div className="absolute inset-0 p-2">
                  <div className="h-2 bg-foreground/80 rounded-full mb-1.5 w-3/4" />
                  <div className="h-px bg-border mb-1.5" />
                  <div className="space-y-1">
                    {[0.9, 0.7, 0.5, 0.8, 0.6].map((w, i) => (
                      <div key={i} className="h-1 bg-muted-foreground/30 rounded-full" style={{ width: `${w * 100}%` }} />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-[12px] font-semibold text-foreground leading-tight mb-1">{resume.name}</p>
              <p className="text-[10px] text-muted-foreground font-medium mb-2">{resume.edited}</p>
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

// ─── Template Picker ──────────────────────────────────────────────────────────

function TemplatePicker({ onBack, onSelect }: { onBack: () => void; onSelect: (id: string) => void }) {
  const [selected, setSelected] = useState("classic")

  return (
    <div className="flex-1 flex flex-col bg-background">
      <div className="px-4 pt-12 pb-4 border-b border-border flex-shrink-0">
        <BackButton onBack={onBack} />
        <h1 className="text-[19px] font-bold text-foreground mt-2">Choose Template</h1>
        <p className="text-[12px] text-muted-foreground mt-0.5 font-medium">LaTeX-rendered, recruiter-approved</p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-5">
        <div className="space-y-3 mb-6">
          {TEMPLATES.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelected(t.id)}
              className={cn(
                "w-full rounded-[16px] border overflow-hidden transition-all duration-200 card-tap text-left",
                selected === t.id ? "border-primary shadow-card-hover" : "border-border shadow-card bg-card"
              )}
            >
              <div className="flex items-stretch">
                {/* Mini resume thumbnail */}
                <div className="w-20 bg-card border-r border-border flex-shrink-0 p-3 relative">
                  {t.id === "classic" && (
                    <>
                      <div className="h-2 bg-foreground/80 rounded-full mb-1 w-full" />
                      <div className="h-px bg-foreground/30 mb-1.5" />
                      {[0.8, 0.5, 0.9, 0.6, 0.7, 0.4].map((w, i) => (
                        <div key={i} className="h-1 bg-muted-foreground/30 rounded-full mb-1" style={{ width: `${w * 100}%` }} />
                      ))}
                    </>
                  )}
                  {t.id === "modern" && (
                    <div className="flex h-full gap-1">
                      <div className="w-5 bg-primary/10 rounded flex-shrink-0 flex flex-col gap-0.5 p-0.5">
                        <div className="w-full h-3 bg-primary/30 rounded" />
                        {[0.7, 0.5, 0.8, 0.4].map((_, i) => (
                          <div key={i} className="h-1 bg-muted-foreground/25 rounded-full" />
                        ))}
                      </div>
                      <div className="flex-1 flex flex-col gap-0.5 py-0.5">
                        <div className="h-1.5 bg-foreground/70 rounded-full mb-0.5 w-full" />
                        {[0.9, 0.6, 0.8, 0.5, 0.7].map((w, i) => (
                          <div key={i} className="h-1 bg-muted-foreground/25 rounded-full" style={{ width: `${w * 100}%` }} />
                        ))}
                      </div>
                    </div>
                  )}
                  {t.id === "minimal" && (
                    <div className="flex flex-col gap-1 py-0.5">
                      <div className="h-2.5 bg-foreground/80 rounded mb-0.5 w-3/4" />
                      <div className="h-1 bg-muted-foreground/20 rounded-full w-full" />
                      <div className="h-3 mt-0.5" />
                      {[0.9, 0.6, 0.8, 0.5].map((w, i) => (
                        <div key={i} className="h-1 bg-muted-foreground/25 rounded-full" style={{ width: `${w * 100}%` }} />
                      ))}
                    </div>
                  )}
                  {selected === t.id && (
                    <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1.5 4L3 5.5L6.5 2.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 p-3.5">
                  <div className="flex items-center gap-2 mb-1">
                    <div className={cn("w-2 h-2 rounded-full", t.accent)} />
                    <p className="text-[13px] font-bold text-foreground">{t.name}</p>
                  </div>
                  <p className="text-[11.5px] text-muted-foreground">{t.desc}</p>
                  {t.id === "classic" && (
                    <span className="inline-block mt-2 text-[9.5px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700">Best ATS Score</span>
                  )}
                  {t.id === "modern" && (
                    <span className="inline-block mt-2 text-[9.5px] font-bold px-1.5 py-0.5 rounded-full bg-primary/10 text-primary">Most Popular</span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 pb-5 pt-3 border-t border-border flex-shrink-0">
        <button
          onClick={() => onSelect(selected)}
          className="w-full py-3.5 rounded-[14px] bg-primary text-primary-foreground text-[14px] font-bold shadow-card btn-press"
        >
          Use {TEMPLATES.find((t) => t.id === selected)?.name} Template
        </button>
      </div>
    </div>
  )
}

// ─── Resume Form ──────────────────────────────────────────────────────────────

type FormData = {
  name: string; email: string; phone: string; location: string
  jobTitle: string; company: string; years: string; description: string
  skills: string; summary: string; targetRole: string
}

function ResumeForm({ onBack, onDone, template }: { onBack: () => void; onDone: (data: FormData) => void; template: string }) {
  const [step, setStep] = useState(0)
  const [data, setData] = useState<FormData>({
    name: "Mohit Rawat", email: "mohit@example.com", phone: "+1 415-555-0192", location: "San Francisco, CA",
    jobTitle: "AI Engineer", company: "Scale AI", years: "3",
    description: "Built and deployed NLP pipelines serving 10M+ requests/day. Reduced inference latency by 5x.",
    skills: "Python, PyTorch, LLMs, SQL, React", summary: "Passionate AI engineer with 3+ years building production ML systems.",
    targetRole: "AI Engineer",
  })

  const set = (key: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setData((d) => ({ ...d, [key]: e.target.value }))

  const inputCls = "w-full bg-background border border-border rounded-[10px] px-3.5 py-2.5 text-[13px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary transition-all"
  const labelCls = "block text-[10.5px] font-bold text-muted-foreground uppercase tracking-widest mb-1.5"

  const templateMeta = TEMPLATES.find((t) => t.id === template)

  return (
    <div className="flex-1 flex flex-col bg-background">
      <div className="px-4 pt-12 pb-4 border-b border-border flex-shrink-0">
        <BackButton onBack={onBack} />
        <div className="flex items-center justify-between mt-2">
          <h1 className="text-[19px] font-bold text-foreground">Create Resume</h1>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-accent text-accent-foreground">
            {templateMeta?.name}
          </span>
        </div>
        <p className="text-[12px] text-muted-foreground mt-0.5 font-medium">
          Step {step + 1} of {STEP_LABELS.length} — {STEP_LABELS[step]}
        </p>
        <div className="flex gap-1.5 mt-3">
          {STEP_LABELS.map((_, i) => (
            <div key={i} className={cn("h-1 flex-1 rounded-full transition-all duration-300", i <= step ? "bg-primary" : "bg-muted")} />
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4">
        {step === 0 && (
          <>
            <div><label className={labelCls}>Full Name</label><input value={data.name} onChange={set("name")} className={inputCls} /></div>
            <div><label className={labelCls}>Email</label><input value={data.email} onChange={set("email")} type="email" className={inputCls} /></div>
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

      <div className="px-4 pb-5 pt-3 border-t border-border flex-shrink-0 flex gap-2.5">
        {step > 0 && (
          <button onClick={() => setStep((s) => s - 1)} className="flex-1 py-3.5 rounded-[12px] border border-border bg-card text-[14px] font-semibold text-foreground btn-press">
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

// ─── LaTeX Resume Preview ─────────────────────────────────────────────────────

function ResumePreview({
  resume,
  onBack,
  onOptimize,
  template,
  formData,
}: {
  resume: Resume
  onBack: () => void
  onOptimize: () => void
  template: string
  formData: Partial<FormData> | null
}) {
  const { showToast } = useApp()
  const [atsVisible, setAtsVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setAtsVisible(true), 500)
    return () => clearTimeout(t)
  }, [])

  const score = resume.score
  const scoreColor = score >= 85 ? "text-emerald-600" : score >= 70 ? "text-amber-600" : "text-orange-600"
  const barColor = score >= 85 ? "bg-emerald-500" : score >= 70 ? "bg-amber-500" : "bg-orange-500"

  const name = formData?.name ?? "Mohit Rawat"
  const role = formData?.jobTitle ?? "AI Engineer"
  const location = formData?.location ?? "San Francisco, CA"
  const email = formData?.email ?? "mohit@example.com"
  const phone = formData?.phone ?? "+1 415-555-0192"
  const company = formData?.company ?? "Scale AI"
  const years = formData?.years ?? "3"
  const description = formData?.description ?? "Built NLP pipelines. Reduced inference latency by 5x."
  const summary = formData?.summary ?? "Passionate AI engineer with 3+ years building production ML systems."
  const skills = formData?.skills?.split(",").map((s) => s.trim()).filter(Boolean) ?? ["Python", "PyTorch", "LLMs", "SQL"]

  return (
    <div className="flex-1 flex flex-col bg-background">
      <div className="px-4 pt-12 pb-4 border-b border-border flex-shrink-0">
        <BackButton onBack={onBack} />
        <div className="flex items-center justify-between mt-2">
          <h1 className="text-[19px] font-bold text-foreground">{resume.name}</h1>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{resume.edited}</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 pb-4">
        {/* ATS Score */}
        <div className="bg-card rounded-[14px] border border-border shadow-card p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[13px] font-bold text-foreground">ATS Score</p>
            <span className={cn("text-[20px] font-extrabold transition-all duration-700", atsVisible ? scoreColor : "text-muted/50")}>
              {atsVisible ? `${score}%` : "—"}
            </span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className={cn("h-full rounded-full transition-all duration-1000", barColor)}
              style={{ width: atsVisible ? `${score}%` : "0%" }}
            />
          </div>
          <p className="text-[11px] text-muted-foreground mt-2 font-medium">
            {score >= 85 ? "Excellent — passes most ATS filters." : score >= 70 ? "Good — optimize keywords to reach 90%+." : "Needs work — missing key skills and keywords."}
          </p>
        </div>

        {/* LaTeX-rendered resume paper */}
        {template === "classic" && (
          <ClassicLatex name={name} role={role} location={location} email={email} phone={phone} company={company} years={years} description={description} summary={summary} skills={skills} />
        )}
        {template === "modern" && (
          <ModernLatex name={name} role={role} location={location} email={email} phone={phone} company={company} years={years} description={description} summary={summary} skills={skills} />
        )}
        {template === "minimal" && (
          <MinimalLatex name={name} role={role} location={location} email={email} phone={phone} company={company} years={years} description={description} summary={summary} skills={skills} />
        )}

        {/* Actions */}
        <div className="flex gap-2.5 mt-4">
          <button
            onClick={() => showToast("Resume downloaded as PDF", "success")}
            className="flex-1 py-3 rounded-[12px] border border-border bg-card text-[13px] font-semibold text-foreground btn-press flex items-center justify-center gap-2"
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M7.5 2V10M7.5 10L5 7.5M7.5 10L10 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2.5 12.5H12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            Download PDF
          </button>
          <button
            onClick={onOptimize}
            className="flex-1 py-3 rounded-[12px] bg-primary text-primary-foreground text-[13px] font-bold shadow-card btn-press"
          >
            AI Optimize
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── LaTeX Template Components ────────────────────────────────────────────────

type LatexProps = {
  name: string; role: string; location: string; email: string; phone: string
  company: string; years: string; description: string; summary: string; skills: string[]
}

function ClassicLatex({ name, role, location, email, phone, company, years, description, summary, skills }: LatexProps) {
  return (
    <div className="bg-white rounded-[12px] border border-border shadow-card p-5 font-mono text-foreground" style={{ fontFamily: "'Courier New', 'Courier', monospace" }}>
      {/* Name block */}
      <div className="text-center mb-3 pb-3 border-b-2 border-foreground">
        <p className="text-[16px] font-black tracking-widest uppercase">{name}</p>
        <p className="text-[11px] font-semibold tracking-wide mt-0.5 text-muted-foreground">{role}</p>
        <p className="text-[10px] text-muted-foreground mt-0.5">{email} · {phone} · {location}</p>
      </div>

      {/* Summary */}
      <div className="mb-3">
        <p className="text-[10px] font-black uppercase tracking-[0.18em] border-b border-foreground pb-0.5 mb-1.5">Summary</p>
        <p className="text-[11px] leading-relaxed text-foreground/90">{summary}</p>
      </div>

      {/* Experience */}
      <div className="mb-3">
        <p className="text-[10px] font-black uppercase tracking-[0.18em] border-b border-foreground pb-0.5 mb-1.5">Experience</p>
        <div className="flex items-start justify-between mb-0.5">
          <p className="text-[11px] font-bold">{role}</p>
          <p className="text-[10px] text-muted-foreground">{years} yrs</p>
        </div>
        <p className="text-[10px] font-semibold text-muted-foreground mb-1">{company}</p>
        {description.split(".").filter(Boolean).slice(0, 3).map((line, i) => (
          <p key={i} className="text-[10.5px] leading-relaxed text-foreground/90 pl-3">• {line.trim()}.</p>
        ))}
      </div>

      {/* Skills */}
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.18em] border-b border-foreground pb-0.5 mb-1.5">Technical Skills</p>
        <p className="text-[10.5px] leading-relaxed">{skills.join(" · ")}</p>
      </div>
    </div>
  )
}

function ModernLatex({ name, role, location, email, phone, company, years, description, summary, skills }: LatexProps) {
  return (
    <div className="bg-white rounded-[12px] border border-border shadow-card overflow-hidden flex" style={{ minHeight: 340 }}>
      {/* Left sidebar */}
      <div className="w-24 bg-primary flex-shrink-0 p-3 flex flex-col gap-3">
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white text-[13px] font-black mx-auto">
          {name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
        </div>
        <div>
          <p className="text-[8px] font-black uppercase text-white/60 tracking-widest mb-1.5">Contact</p>
          <p className="text-[8.5px] text-white/90 leading-relaxed break-all">{email}</p>
          <p className="text-[8.5px] text-white/90 mt-1">{phone}</p>
          <p className="text-[8.5px] text-white/90 mt-1">{location}</p>
        </div>
        <div>
          <p className="text-[8px] font-black uppercase text-white/60 tracking-widest mb-1.5">Skills</p>
          <div className="flex flex-col gap-1">
            {skills.map((s) => (
              <span key={s} className="text-[8px] px-1.5 py-0.5 rounded bg-white/20 text-white font-semibold">{s}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-4">
        <div className="mb-3 pb-2 border-b border-border">
          <p className="text-[15px] font-black text-foreground">{name}</p>
          <p className="text-[11px] font-semibold text-primary">{role}</p>
        </div>

        <div className="mb-3">
          <p className="text-[9px] font-black uppercase tracking-widest text-primary mb-1">Profile</p>
          <p className="text-[10.5px] leading-relaxed text-foreground/90">{summary}</p>
        </div>

        <div>
          <p className="text-[9px] font-black uppercase tracking-widest text-primary mb-1">Experience</p>
          <div className="flex items-start justify-between mb-0.5">
            <p className="text-[11px] font-bold text-foreground">{role}</p>
            <p className="text-[9.5px] text-muted-foreground">{years} yrs</p>
          </div>
          <p className="text-[10px] font-semibold text-primary mb-1">{company}</p>
          {description.split(".").filter(Boolean).slice(0, 2).map((line, i) => (
            <p key={i} className="text-[10px] leading-relaxed text-foreground/80 pl-2">▸ {line.trim()}.</p>
          ))}
        </div>
      </div>
    </div>
  )
}

function MinimalLatex({ name, role, location, email, phone, company, years, description, summary, skills }: LatexProps) {
  return (
    <div className="bg-white rounded-[12px] border border-border shadow-card p-5 text-foreground" style={{ fontFamily: "'Georgia', serif" }}>
      {/* Name */}
      <div className="mb-4">
        <p className="text-[20px] font-black tracking-tight">{name}</p>
        <p className="text-[12px] text-muted-foreground mt-0.5">{role} · {location}</p>
        <p className="text-[10.5px] text-muted-foreground/80 mt-0.5">{email} · {phone}</p>
      </div>

      {/* Summary */}
      <div className="mb-4">
        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1.5">About</p>
        <p className="text-[11.5px] leading-relaxed text-foreground/90">{summary}</p>
      </div>

      {/* Experience */}
      <div className="mb-4">
        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2">Experience</p>
        <div className="flex items-baseline justify-between mb-0.5">
          <p className="text-[12px] font-bold">{role}, {company}</p>
          <p className="text-[10px] text-muted-foreground">{years} yrs</p>
        </div>
        {description.split(".").filter(Boolean).slice(0, 2).map((line, i) => (
          <p key={i} className="text-[11px] leading-relaxed text-foreground/85 mt-1">– {line.trim()}.</p>
        ))}
      </div>

      {/* Skills */}
      <div>
        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1.5">Skills</p>
        <p className="text-[11px] leading-relaxed">{skills.join(", ")}</p>
      </div>
    </div>
  )
}

// ─── Resume Optimize ──────────────────────────────────────────────────────────

function ResumeOptimize({ resume, onBack }: { resume: Resume; onBack: () => void }) {
  const suggestions = [
    { type: "Add", text: "Include 'RLHF' and 'Constitutional AI' in your skills section." },
    { type: "Improve", text: "Quantify your impact in role descriptions — add % metrics." },
    { type: "Add", text: "Add a 'Key Projects' section featuring an LLM fine-tuning demo." },
    { type: "Remove", text: "Remove outdated skills like 'Hadoop' — replace with 'Spark'." },
  ]
  const [done, setDone] = useState<boolean[]>(suggestions.map(() => false))
  const gained = done.filter(Boolean).length * 2
  const projected = Math.min(resume.score + gained, 99)

  return (
    <div className="flex-1 flex flex-col bg-background">
      <div className="px-4 pt-12 pb-4 border-b border-border flex-shrink-0">
        <BackButton onBack={onBack} />
        <h1 className="text-[19px] font-bold text-foreground mt-2">AI Optimize</h1>
        <p className="text-[12px] text-muted-foreground mt-0.5 font-medium">Tailored for {resume.name}</p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-5">
        {/* Score card */}
        <div className="bg-primary rounded-[16px] p-4 mb-5 text-primary-foreground">
          <p className="text-[11px] font-semibold text-primary-foreground/70 mb-1">Projected ATS Score</p>
          <div className="flex items-end gap-2 mb-3">
            <span className="text-[34px] font-extrabold leading-none">{projected}%</span>
            {gained > 0 && (
              <span className="text-[13px] font-bold text-primary-foreground/70 mb-1">+{gained}% from {done.filter(Boolean).length} fix{done.filter(Boolean).length !== 1 ? "es" : ""}</span>
            )}
          </div>
          <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-white rounded-full transition-all duration-700" style={{ width: `${projected}%` }} />
          </div>
        </div>

        <h3 className="text-[14px] font-bold text-foreground mb-3">Apply Suggestions</h3>
        <div className="space-y-2.5">
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
                  {done[i] && (
                    <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                      <path d="M1.5 4.5L3.5 6.5L7.5 2.5" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
                <div className="flex-1">
                  <span className={cn(
                    "text-[9.5px] font-black uppercase tracking-widest",
                    s.type === "Add" ? "text-primary" : s.type === "Remove" ? "text-destructive" : "text-amber-600"
                  )}>
                    {s.type}
                  </span>
                  <p className={cn("text-[12px] leading-relaxed mt-0.5", done[i] ? "text-muted-foreground line-through" : "text-foreground")}>
                    {s.text}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export function ResumeScreen() {
  const { screen, navigate, goBack, addResume, showToast, resumes } = useApp()
  const [subScreen, setSubScreen] = useState<SubScreen>("list")
  const [activeResume, setActiveResume] = useState<Resume | null>(null)
  const [selectedTemplate, setSelectedTemplate] = useState("classic")
  const [lastFormData, setLastFormData] = useState<Partial<FormData> | null>(null)

  useEffect(() => {
    if (screen === "resume-form") setSubScreen("form")
    else if (screen === "resume-preview") setSubScreen("preview")
    else if (screen === "resume-optimize") setSubScreen("optimize")
  }, [screen])

  function handleCreate() {
    setSubScreen("template-pick")
    navigate("resume-form")
  }

  function handleTemplateSelect(templateId: string) {
    setSelectedTemplate(templateId)
    setSubScreen("form")
  }

  function handleFormDone(data: FormData) {
    setLastFormData(data)
    const newResume: Resume = {
      id: `r-${Date.now()}`,
      name: `${data.targetRole} Resume`,
      edited: "Just now",
      score: 88,
      scoreColor: "text-emerald-600 bg-emerald-50",
    }
    addResume(newResume)
    setActiveResume(newResume)
    setSubScreen("preview")
    navigate("resume-preview")
    showToast("Resume generated with AI", "success")
  }

  function handlePreview(resume: Resume) {
    setActiveResume(resume)
    setSubScreen("preview")
    navigate("resume-preview")
  }

  function handleBack() {
    goBack()
    if (subScreen === "optimize") {
      setSubScreen("preview")
    } else if (subScreen === "preview") {
      setSubScreen("list")
      setActiveResume(null)
    } else if (subScreen === "form") {
      setSubScreen("template-pick")
    } else if (subScreen === "template-pick") {
      setSubScreen("list")
    } else {
      setSubScreen("list")
    }
  }

  const fallbackResume: Resume = resumes[0] ?? { id: "tmp", name: "Resume", edited: "Now", score: 88, scoreColor: "text-emerald-600 bg-emerald-50" }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {subScreen === "list" && <ResumeList onCreate={handleCreate} onPreview={handlePreview} />}
      {subScreen === "template-pick" && <TemplatePicker onBack={handleBack} onSelect={handleTemplateSelect} />}
      {subScreen === "form" && <ResumeForm onBack={handleBack} onDone={handleFormDone} template={selectedTemplate} />}
      {subScreen === "preview" && (
        <ResumePreview
          resume={activeResume ?? fallbackResume}
          onBack={handleBack}
          onOptimize={() => { setSubScreen("optimize"); navigate("resume-optimize") }}
          template={selectedTemplate}
          formData={lastFormData}
        />
      )}
      {subScreen === "optimize" && (
        <ResumeOptimize resume={activeResume ?? fallbackResume} onBack={handleBack} />
      )}
    </div>
  )
}
