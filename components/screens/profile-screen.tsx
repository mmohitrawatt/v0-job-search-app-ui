"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { useApp, ProfileData } from "@/lib/app-context"
import { MOCK_JOBS } from "@/lib/mock-data"

// ─── Icons ────────────────────────────────────────────────────

function ChevronRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="text-muted-foreground flex-shrink-0">
      <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function EditIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <path d="M9.5 2L12 4.5L4.5 12H2V9.5L9.5 2Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  )
}

function PlusIcon({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 13 13" fill="none">
      <path d="M6.5 2V11M2 6.5H11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

// ─── Section Card ─────────────────────────────────────────────

function SectionCard({
  title, onEdit, onAdd, addLabel, children,
}: {
  title: string
  onEdit?: () => void
  onAdd?: () => void
  addLabel?: string
  children: React.ReactNode
}) {
  return (
    <div className="bg-card rounded-[16px] border border-border shadow-card overflow-hidden">
      <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-border/60">
        <p className="text-[14px] font-bold text-foreground">{title}</p>
        <div className="flex items-center gap-2">
          {onAdd && (
            <button
              onClick={onAdd}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/8 text-primary text-[11px] font-semibold hover:bg-primary/15 transition-colors btn-press"
            >
              <PlusIcon size={11} />
              {addLabel ?? "Add"}
            </button>
          )}
          {onEdit && (
            <button onClick={onEdit} className="w-7 h-7 rounded-full bg-accent flex items-center justify-center text-primary hover:bg-primary/10 transition-colors btn-press">
              <EditIcon />
            </button>
          )}
        </div>
      </div>
      <div className="px-4 py-3">{children}</div>
    </div>
  )
}

// ─── Profile Completeness ─────────────────────────────────────

function calcCompleteness(profile: ProfileData) {
  const checks = [
    { label: "Name & headline",   done: !!profile.name && !!profile.headline },
    { label: "About section",     done: profile.about.trim().length > 30 },
    { label: "Work experience",   done: profile.experience.length > 0 },
    { label: "Education",         done: profile.education.length > 0 },
    { label: "5+ skills",         done: profile.skills.length >= 5 },
    { label: "Certifications",    done: profile.certifications.length > 0 },
    { label: "Profile photo",     done: false },   // no photo feature yet
    { label: "Portfolio URL",     done: false },   // not in data
  ]
  const done = checks.filter((c) => c.done).length
  const pct = Math.round((done / checks.length) * 100)
  const missing = checks.filter((c) => !c.done).map((c) => c.label)
  return { pct, missing }
}

// ─── Saved Jobs sub-screen ─────────────────────────────────────

function SavedJobsScreen({ onBack }: { onBack: () => void }) {
  const { savedJobIds, toggleSavedJob, setSelectedJob, setActiveTab, navigate, showToast } = useApp()
  const savedJobs = MOCK_JOBS.filter((j) => savedJobIds.includes(j.id))

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-background">
      <div className="px-4 lg:px-8 pt-12 lg:pt-6 pb-4 border-b border-border">
        <button onClick={onBack} className="flex items-center gap-1.5 text-primary text-[13px] font-semibold btn-press mb-2">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M11 4L6 9L11 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          Profile
        </button>
        <h1 className="text-[20px] font-bold text-foreground">Saved Jobs</h1>
        <p className="text-[12px] text-muted-foreground mt-0.5">{savedJobs.length} bookmarked</p>
      </div>
      <div className="flex-1 overflow-y-auto min-h-0 px-4 py-4 space-y-3">
        {savedJobs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="text-muted-foreground"><path d="M6 3H22C23.1 3 24 3.9 24 5V26L14 21L4 26V5C4 3.9 4.9 3 6 3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /></svg>
            </div>
            <p className="text-[14px] font-semibold text-foreground">No saved jobs yet</p>
            <p className="text-[12px] text-muted-foreground mt-1">Bookmark jobs from the Jobs tab</p>
          </div>
        ) : (
          savedJobs.map((job) => (
            <div key={job.id} className="bg-card rounded-[14px] border border-border shadow-card overflow-hidden">
              <button
                onClick={() => { setSelectedJob(job); setActiveTab("jobs"); navigate("job-detail") }}
                className="w-full p-4 text-left card-tap"
              >
                <div className="flex items-center gap-3">
                  <div className={cn("w-10 h-10 rounded-[10px] flex items-center justify-center text-[11px] font-bold flex-shrink-0", job.color)}>{job.initials}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-bold text-foreground">{job.title}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{job.company} · {job.location}</p>
                    <p className="text-[11px] text-muted-foreground">{job.salary}</p>
                  </div>
                  <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full", job.matchScore >= 85 ? "text-emerald-600 bg-emerald-50" : "text-amber-600 bg-amber-50")}>
                    {job.matchScore}%
                  </span>
                </div>
              </button>
              <div className="flex border-t border-border">
                <button onClick={() => { setSelectedJob(job); setActiveTab("jobs"); navigate("job-detail") }} className="flex-1 py-2.5 text-[11px] font-semibold text-primary border-r border-border active:bg-muted">View</button>
                <button onClick={() => { toggleSavedJob(job.id); showToast("Removed from saved", "info") }} className="flex-1 py-2.5 text-[11px] font-semibold text-destructive active:bg-muted">Remove</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

// ─── Modals ───────────────────────────────────────────────────

function EditAboutModal({ value, onSave, onClose }: { value: string; onSave: (v: string) => void; onClose: () => void }) {
  const [text, setText] = useState(value)
  return (
    <div className="absolute inset-0 bg-black/40 z-50 flex items-end lg:items-center lg:justify-center">
      <div className="w-full lg:w-[560px] bg-card rounded-t-[22px] lg:rounded-[20px] p-5 animate-in slide-in-from-bottom-8 lg:zoom-in-95 duration-300">
        <h3 className="text-[15px] font-bold text-foreground mb-3">Edit About</h3>
        <textarea
          autoFocus value={text} onChange={(e) => setText(e.target.value)} rows={5}
          className="w-full bg-background border border-border rounded-[12px] px-3.5 py-3 text-[13px] text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary mb-4"
        />
        <div className="flex gap-2">
          <button onClick={onClose} className="flex-1 py-3 rounded-[12px] border border-border text-[13px] font-semibold text-foreground btn-press">Cancel</button>
          <button onClick={() => { onSave(text); onClose() }} className="flex-1 py-3 rounded-[12px] bg-primary text-primary-foreground text-[13px] font-bold btn-press">Save</button>
        </div>
      </div>
    </div>
  )
}

function EditHeaderModal({ profile, onSave, onClose }: { profile: ProfileData; onSave: (p: Partial<ProfileData>) => void; onClose: () => void }) {
  const [form, setForm] = useState({ name: profile.name, headline: profile.headline, location: profile.location, email: profile.email, phone: profile.phone, linkedIn: profile.linkedIn, github: profile.github })
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => setForm((f) => ({ ...f, [k]: e.target.value }))
  return (
    <div className="absolute inset-0 bg-black/40 z-50 flex items-end lg:items-center lg:justify-center overflow-hidden">
      <div className="w-full lg:w-[560px] bg-card rounded-t-[22px] lg:rounded-[20px] animate-in slide-in-from-bottom-8 lg:zoom-in-95 duration-300 max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-border flex-shrink-0">
          <h3 className="text-[15px] font-bold text-foreground">Edit Profile Info</h3>
          <button onClick={onClose} className="text-muted-foreground text-[12px] font-semibold hover:text-foreground">Cancel</button>
        </div>
        <div className="overflow-y-auto px-5 py-4 space-y-3 flex-1">
          {(Object.keys(form) as (keyof typeof form)[]).map((key) => (
            <div key={key}>
              <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide mb-1 block">{key.replace("linkedIn", "LinkedIn")}</label>
              <input value={form[key]} onChange={set(key)} className="w-full bg-background border border-border rounded-[10px] px-3.5 py-2.5 text-[13px] text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
            </div>
          ))}
        </div>
        <div className="px-5 pb-6 pt-3 border-t border-border flex-shrink-0">
          <button onClick={() => { onSave(form); onClose() }} className="w-full py-3.5 rounded-[12px] bg-primary text-primary-foreground text-[13px] font-bold btn-press">Save Changes</button>
        </div>
      </div>
    </div>
  )
}

function EditSkillsModal({ skills, onSave, onClose }: { skills: string[]; onSave: (s: string[]) => void; onClose: () => void }) {
  const [list, setList] = useState([...skills])
  const [input, setInput] = useState("")
  function add() { const v = input.trim(); if (v && !list.includes(v)) setList((l) => [...l, v]); setInput("") }
  return (
    <div className="absolute inset-0 bg-black/40 z-50 flex items-end lg:items-center lg:justify-center">
      <div className="w-full lg:w-[520px] bg-card rounded-t-[22px] lg:rounded-[20px] p-5 animate-in slide-in-from-bottom-8 lg:zoom-in-95 duration-300 max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between mb-4 flex-shrink-0">
          <h3 className="text-[15px] font-bold text-foreground">Edit Skills</h3>
          <button onClick={onClose} className="text-muted-foreground text-[12px] font-semibold">Cancel</button>
        </div>
        <div className="flex gap-2 mb-3 flex-shrink-0">
          <input autoFocus value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && add()} placeholder="Add a skill…"
            className="flex-1 bg-background border border-border rounded-[10px] px-3.5 py-2.5 text-[13px] text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
          <button onClick={add} className="px-4 py-2.5 rounded-[10px] bg-primary text-primary-foreground text-[12px] font-bold btn-press">Add</button>
        </div>
        <div className="flex-1 overflow-y-auto">
          <div className="flex flex-wrap gap-2 mb-4">
            {list.map((s) => (
              <button key={s} onClick={() => setList((l) => l.filter((x) => x !== s))} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent text-accent-foreground text-[12px] font-semibold border border-border btn-press">
                {s}
                <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M1.5 1.5L7.5 7.5M7.5 1.5L1.5 7.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
              </button>
            ))}
          </div>
        </div>
        <button onClick={() => { onSave(list); onClose() }} className="w-full py-3.5 rounded-[12px] bg-primary text-primary-foreground text-[13px] font-bold btn-press flex-shrink-0">Save Skills</button>
      </div>
    </div>
  )
}

// ─── Reusable experience / education row ──────────────────────

function ExperienceRow({ exp, last }: { exp: { id: string; role: string; company: string; location: string; duration: string; current: boolean; points: string[] }; last: boolean }) {
  return (
    <div className={cn("relative pl-5", !last && "pb-5 border-b border-border/40")}>
      <div className="absolute left-0 top-1.5 w-2.5 h-2.5 rounded-full border-2 border-primary bg-card flex-shrink-0" />
      {!last && <div className="absolute left-[4.5px] top-4 bottom-0 w-[1px] bg-border/60" />}
      <div className="flex items-start justify-between gap-2 mb-1.5">
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-bold text-foreground leading-tight">{exp.role}</p>
          <div className="flex items-center gap-2 mt-0.5 flex-wrap">
            <p className="text-[12px] font-semibold text-primary">{exp.company}</p>
            {exp.current && <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">Current</span>}
          </div>
          <p className="text-[11px] text-muted-foreground mt-0.5">{exp.location} · {exp.duration}</p>
        </div>
      </div>
      <ul className="space-y-1">
        {exp.points.map((pt, j) => (
          <li key={j} className="text-[11.5px] text-muted-foreground leading-relaxed flex gap-2">
            <span className="text-primary mt-[3px] flex-shrink-0 text-[10px]">▸</span>{pt}
          </li>
        ))}
      </ul>
    </div>
  )
}

function EducationRow({ ed, last }: { ed: { id: string; degree: string; institution: string; location: string; year: string; cgpa: string }; last: boolean }) {
  return (
    <div className={cn("relative pl-5", !last && "pb-4 border-b border-border/40")}>
      <div className="absolute left-0 top-1.5 w-2.5 h-2.5 rounded-full border-2 border-amber-500 bg-card flex-shrink-0" />
      <p className="text-[13px] font-bold text-foreground leading-tight">{ed.degree}</p>
      <p className="text-[12px] font-semibold text-primary mt-0.5">{ed.institution}</p>
      <p className="text-[11px] text-muted-foreground mt-0.5">{ed.location} · {ed.year}</p>
      <p className="text-[11px] text-foreground font-semibold mt-1">CGPA: {ed.cgpa}</p>
    </div>
  )
}

// ─── Main Profile Screen ───────────────────────────────────────

type Modal = "header" | "about" | "skills" | null

export function ProfileScreen() {
  const { profile, setProfile, savedJobIds, resumes, showToast, navigate } = useApp()
  const [subScreen, setSubScreen] = useState<"main" | "saved-jobs">("main")
  const [modal, setModal] = useState<Modal>(null)
  const [openToWork, setOpenToWork] = useState(true)

  function updateProfile(patch: Partial<ProfileData>) {
    setProfile({ ...profile, ...patch })
    showToast("Profile updated", "success")
  }

  const initials = profile.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
  const { pct, missing } = calcCompleteness(profile)

  if (subScreen === "saved-jobs") return <SavedJobsScreen onBack={() => setSubScreen("main")} />

  // ── Shared data ──────────────────────────────────────────────
  const statsData = [
    { label: "Applied", value: "24", color: "text-primary" },
    { label: "Saved", value: String(savedJobIds.length), color: "text-violet-500" },
    { label: "Resumes", value: String(resumes.length), color: "text-emerald-500" },
  ]

  const quickLinksData = [
    {
      label: "Saved Jobs", desc: `${savedJobIds.length} bookmarked`,
      bg: "bg-violet-50 text-violet-600", badge: String(savedJobIds.length),
      onClick: () => setSubScreen("saved-jobs"),
      icon: <svg width="16" height="16" viewBox="0 0 18 18" fill="none"><path d="M4 3H14C14.55 3 15 3.45 15 4V16L9 13L3 16V4C3 3.45 3.45 3 4 3Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>,
    },
    {
      label: "Subscription", desc: "Pro — Renews 15 Mar",
      bg: "bg-emerald-50 text-emerald-600", badge: "Pro",
      onClick: () => showToast("Subscription — coming soon", "info"),
      icon: <svg width="16" height="16" viewBox="0 0 18 18" fill="none"><rect x="2" y="4" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.4" /><path d="M2 7.5H16" stroke="currentColor" strokeWidth="1.4" /></svg>,
    },
    {
      label: "Notifications", desc: "Alerts & reminders",
      bg: "bg-blue-50 text-blue-600", badge: undefined,
      onClick: () => showToast("Notifications — coming soon", "info"),
      icon: <svg width="16" height="16" viewBox="0 0 18 18" fill="none"><path d="M9 2C6.24 2 4 4.24 4 7V11L2.5 12.5V13.5H15.5V12.5L14 11V7C14 4.24 11.76 2 9 2Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M7 13.5C7 14.6 7.9 15.5 9 15.5C10.1 15.5 11 14.6 11 13.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>,
    },
    {
      label: "Privacy & Security", desc: "Password, accounts",
      bg: "bg-muted text-muted-foreground", badge: undefined,
      onClick: () => showToast("Privacy — coming soon", "info"),
      icon: <svg width="16" height="16" viewBox="0 0 18 18" fill="none"><path d="M9 2L3 5V9C3 12.31 5.69 15.16 9 16C12.31 15.16 15 12.31 15 9V5L9 2Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>,
    },
  ]

  // ────────────────────────────────────────────────────────────
  return (
    <div className="flex-1 flex flex-col bg-background overflow-hidden relative min-h-0">
      <div className="flex-1 overflow-y-auto min-h-0">

        {/* ═══════════════════════════════════════════════════
            DESKTOP LAYOUT
        ═══════════════════════════════════════════════════ */}
        <div className="hidden lg:flex gap-6 p-8 items-start">

          {/* ── LEFT PANEL ───────────────────────────────── */}
          <div className="w-[288px] flex-shrink-0 space-y-4">

            {/* Profile Card */}
            <div className="bg-card rounded-[20px] border border-border shadow-card overflow-hidden">
              {/* Cover */}
              <div className="relative h-[88px] overflow-hidden"
                style={{ background: "linear-gradient(135deg, #4F46E5 0%, #7C3AED 60%, #A78BFA 100%)" }}>
                {/* Mesh overlay */}
                <div className="absolute inset-0 opacity-30"
                  style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)", backgroundSize: "18px 18px" }} />
                <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 80% 20%, rgba(167,139,250,0.5) 0%, transparent 60%)" }} />
                <button
                  onClick={() => setModal("header")}
                  className="absolute top-2.5 right-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/25 backdrop-blur-sm border border-white/20 text-[10px] font-semibold text-white hover:bg-black/40 transition-colors"
                >
                  <EditIcon size={10} />
                  Edit
                </button>
              </div>

              {/* Avatar */}
              <div className="px-4 pb-4">
                <div className="-mt-8 mb-3 flex items-end justify-between">
                  <div className="relative group">
                    <div className="w-[64px] h-[64px] rounded-full bg-primary flex items-center justify-center shadow-lg border-4 border-card">
                      <span className="text-[20px] font-bold text-primary-foreground select-none">{initials}</span>
                    </div>
                    <button
                      onClick={() => showToast("Photo upload — coming soon", "info")}
                      className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="text-white">
                        <path d="M3 5C3 4.45 3.45 4 4 4H5.5L7 2H13L14.5 4H16C16.55 4 17 4.45 17 5V15C17 15.55 16.55 16 16 16H4C3.45 16 3 15.55 3 15V5Z" stroke="currentColor" strokeWidth="1.3" />
                        <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.3" />
                      </svg>
                    </button>
                  </div>
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 mb-1 flex-shrink-0">PRO</span>
                </div>

                <h2 className="text-[15px] font-bold text-foreground leading-tight">{profile.name}</h2>
                <p className="text-[11.5px] text-muted-foreground mt-0.5 leading-snug">{profile.headline}</p>

                {/* Location + Open to Work */}
                <div className="flex items-center gap-1.5 mt-2">
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none" className="text-muted-foreground flex-shrink-0">
                    <path d="M6 1C4.07 1 2.5 2.57 2.5 4.5C2.5 7.25 6 11 6 11S9.5 7.25 9.5 4.5C9.5 2.57 7.93 1 6 1Z" stroke="currentColor" strokeWidth="1.2" />
                    <circle cx="6" cy="4.5" r="1.2" fill="currentColor" />
                  </svg>
                  <span className="text-[11px] text-muted-foreground">{profile.location}</span>
                </div>

                {/* Open to Work toggle */}
                <button
                  onClick={() => { setOpenToWork((v) => !v); showToast(openToWork ? "Open to Work turned off" : "Open to Work turned on", "success") }}
                  className={cn(
                    "mt-2.5 flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[11px] font-semibold transition-all",
                    openToWork
                      ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                      : "bg-muted border-border text-muted-foreground"
                  )}
                >
                  <span className={cn("w-1.5 h-1.5 rounded-full flex-shrink-0", openToWork ? "bg-emerald-500" : "bg-muted-foreground")} />
                  {openToWork ? "Open to Work" : "Not Looking"}
                </button>

                {/* Contact */}
                <div className="mt-3 pt-3 border-t border-border/50 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" className="text-muted-foreground flex-shrink-0"><rect x="1" y="2" width="9" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.1"/><path d="M1 4L5.5 6.5L10 4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/></svg>
                    <span className="text-[11px] text-muted-foreground truncate">{profile.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" className="text-muted-foreground flex-shrink-0"><rect x="3" y="1" width="5" height="9" rx="1.2" stroke="currentColor" strokeWidth="1.1"/><circle cx="5.5" cy="8" r="0.5" fill="currentColor"/></svg>
                    <span className="text-[11px] text-muted-foreground truncate">{profile.phone}</span>
                  </div>
                </div>

                {/* Social */}
                <div className="flex gap-2 mt-3">
                  <span className="px-2.5 py-1 rounded-full border border-blue-100 bg-blue-50 text-[10px] font-semibold text-blue-600 truncate max-w-[120px]">{profile.linkedIn}</span>
                  <span className="px-2.5 py-1 rounded-full border border-border bg-muted text-[10px] font-semibold text-foreground truncate max-w-[120px]">{profile.github}</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2">
              {statsData.map((s) => (
                <div key={s.label} className="bg-card rounded-[14px] p-3 shadow-card border border-border text-center">
                  <p className={cn("text-[22px] font-bold leading-none", s.color)}>{s.value}</p>
                  <p className="text-[9px] text-muted-foreground font-semibold uppercase tracking-wide mt-1 leading-tight">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Profile Completeness */}
            <div className="bg-card rounded-[16px] border border-border shadow-card p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[12px] font-bold text-foreground">Profile Strength</p>
                <span className={cn("text-[12px] font-bold", pct >= 80 ? "text-emerald-600" : pct >= 60 ? "text-amber-600" : "text-destructive")}>{pct}%</span>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden mb-3">
                <div
                  className={cn("h-full rounded-full transition-all", pct >= 80 ? "bg-emerald-500" : pct >= 60 ? "bg-amber-500" : "bg-primary")}
                  style={{ width: `${pct}%` }}
                />
              </div>
              {missing.length > 0 && (
                <div className="space-y-1">
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">To complete</p>
                  {missing.slice(0, 3).map((m) => (
                    <div key={m} className="flex items-center gap-2">
                      <div className="w-3.5 h-3.5 rounded-full border-2 border-border flex-shrink-0" />
                      <span className="text-[11px] text-muted-foreground">{m}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="bg-card rounded-[20px] border border-border shadow-card overflow-hidden">
              <div className="px-4 pt-4 pb-2.5 border-b border-border/50">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Quick Actions</p>
              </div>
              <div className="p-2">
                <button
                  onClick={() => navigate("resume")}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-[12px] hover:bg-accent transition-colors text-left group"
                >
                  <div className="w-8 h-8 rounded-[8px] bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                    <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M3 1H10L14 5V15H3V1Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /><path d="M10 1V5H14M5 8H11M5 11H9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-semibold text-foreground">Manage Resumes</p>
                    <p className="text-[10px] text-muted-foreground">{resumes.length} resume{resumes.length !== 1 ? "s" : ""}</p>
                  </div>
                  <ChevronRight />
                </button>
                <button
                  onClick={() => navigate("job-alerts")}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-[12px] hover:bg-accent transition-colors text-left group"
                >
                  <div className="w-8 h-8 rounded-[8px] bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                    <svg width="15" height="15" viewBox="0 0 18 18" fill="none"><path d="M9 2C6.24 2 4 4.24 4 7V11L2.5 12.5V13.5H15.5V12.5L14 11V7C14 4.24 11.76 2 9 2Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M7 13.5C7 14.6 7.9 15.5 9 15.5C10.1 15.5 11 14.6 11 13.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-semibold text-foreground">Job Alerts</p>
                    <p className="text-[10px] text-muted-foreground">Manage notifications</p>
                  </div>
                  <ChevronRight />
                </button>
              </div>
            </div>

            {/* Account links */}
            <div className="bg-card rounded-[20px] border border-border shadow-card overflow-hidden">
              <div className="px-4 pt-4 pb-2.5 border-b border-border/50">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Account</p>
              </div>
              <div className="p-2">
                {quickLinksData.map((item) => (
                  <button key={item.label} onClick={item.onClick} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-[12px] hover:bg-accent transition-colors text-left">
                    <div className={cn("w-8 h-8 rounded-[8px] flex items-center justify-center flex-shrink-0", item.bg)}>
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] font-semibold text-foreground">{item.label}</p>
                      <p className="text-[10px] text-muted-foreground">{item.desc}</p>
                    </div>
                    {item.badge && <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-primary/10 text-primary flex-shrink-0">{item.badge}</span>}
                    <ChevronRight />
                  </button>
                ))}
              </div>
              <div className="px-4 pb-4 pt-1">
                <button
                  onClick={() => showToast("Signed out successfully", "info")}
                  className="w-full py-2.5 rounded-[12px] border border-destructive/20 text-[12px] font-semibold text-destructive hover:bg-destructive/5 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>

          {/* ── RIGHT PANEL ──────────────────────────────── */}
          <div className="flex-1 min-w-0 space-y-4">

            {/* Page header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-[20px] font-bold text-foreground leading-tight">Profile</h1>
                <p className="text-[12px] text-muted-foreground mt-0.5">Keep your profile up to date to get better job matches</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={cn(
                  "text-[11px] font-semibold px-3 py-1.5 rounded-full border",
                  pct === 100 ? "bg-emerald-50 border-emerald-200 text-emerald-700" : "bg-amber-50 border-amber-200 text-amber-700"
                )}>
                  {pct}% complete
                </span>
              </div>
            </div>

            {/* About */}
            <SectionCard title="About" onEdit={() => setModal("about")}>
              <p className="text-[13px] text-muted-foreground leading-relaxed">{profile.about}</p>
            </SectionCard>

            {/* Work Experience */}
            <SectionCard
              title="Work Experience"
              onAdd={() => showToast("Add experience — coming soon", "info")}
              addLabel="Add"
            >
              <div className="space-y-5">
                {profile.experience.map((exp, i) => (
                  <ExperienceRow key={exp.id} exp={exp} last={i === profile.experience.length - 1} />
                ))}
              </div>
            </SectionCard>

            {/* Education */}
            <SectionCard
              title="Education"
              onAdd={() => showToast("Add education — coming soon", "info")}
              addLabel="Add"
            >
              <div className="space-y-4">
                {profile.education.map((ed, i) => (
                  <EducationRow key={ed.id} ed={ed} last={i === profile.education.length - 1} />
                ))}
              </div>
            </SectionCard>

            {/* Skills + Certifications/Languages side by side */}
            <div className="grid grid-cols-5 gap-4">
              {/* Skills — wider */}
              <div className="col-span-3">
                <SectionCard title="Skills" onEdit={() => setModal("skills")}>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill) => (
                      <span key={skill} className="text-[12px] font-semibold px-3 py-1.5 rounded-full bg-primary/8 text-primary border border-primary/20">
                        {skill}
                      </span>
                    ))}
                  </div>
                </SectionCard>
              </div>

              {/* Certs + Languages — narrower */}
              <div className="col-span-2 space-y-4">
                <SectionCard title="Certifications" onAdd={() => showToast("Add certification — coming soon", "info")}>
                  <div className="space-y-3">
                    {profile.certifications.map((cert) => (
                      <div key={cert.id} className="flex items-start gap-2.5">
                        <div className="w-7 h-7 rounded-[7px] bg-amber-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg width="13" height="13" viewBox="0 0 14 14" fill="none" className="text-amber-600">
                            <path d="M7 1L8.5 5H13L9.5 7.5L11 12L7 9.5L3 12L4.5 7.5L1 5H5.5L7 1Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[12px] font-bold text-foreground leading-tight">{cert.name}</p>
                          <p className="text-[10.5px] text-muted-foreground mt-0.5">{cert.issuer} · {cert.year}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </SectionCard>

                <SectionCard title="Languages">
                  <div className="flex flex-wrap gap-2">
                    {profile.languages.map((lang) => (
                      <span key={lang} className="text-[12px] font-semibold px-3 py-1.5 rounded-full bg-muted text-foreground border border-border">
                        {lang}
                      </span>
                    ))}
                  </div>
                </SectionCard>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════
            MOBILE LAYOUT
        ═══════════════════════════════════════════════════ */}
        <div className="lg:hidden">
          {/* Cover + Avatar */}
          <div className="relative h-28 flex-shrink-0 overflow-hidden"
            style={{ background: "linear-gradient(135deg, #4F46E5 0%, #7C3AED 70%, #A78BFA 100%)" }}>
            <div className="absolute inset-0 opacity-20"
              style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)", backgroundSize: "16px 16px" }} />
            <div className="absolute left-4 -bottom-10 flex items-end gap-3">
              <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center shadow-card-hover border-4 border-card">
                <span className="text-[26px] font-bold text-primary-foreground select-none">{initials}</span>
              </div>
            </div>
            <button onClick={() => setModal("header")} className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 text-[11px] font-semibold text-white btn-press">
              <EditIcon size={12} />
              Edit Profile
            </button>
          </div>

          <div className="pt-12 px-4 pb-8 space-y-4">
            {/* Name */}
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-[22px] font-bold text-foreground tracking-tight leading-none">{profile.name}</h1>
                  <p className="text-[13px] text-muted-foreground font-medium mt-1">{profile.headline}</p>
                </div>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 mt-1 flex-shrink-0">Pro</span>
              </div>
              <div className="flex items-center gap-1.5 mt-2">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-muted-foreground flex-shrink-0">
                  <path d="M6 1C4.07 1 2.5 2.57 2.5 4.5C2.5 7.25 6 11 6 11S9.5 7.25 9.5 4.5C9.5 2.57 7.93 1 6 1Z" stroke="currentColor" strokeWidth="1.2" />
                  <circle cx="6" cy="4.5" r="1.2" fill="currentColor" />
                </svg>
                <span className="text-[12px] text-muted-foreground font-medium">{profile.location}</span>
              </div>

              {/* Open to Work — mobile */}
              <button
                onClick={() => { setOpenToWork((v) => !v); showToast(openToWork ? "Open to Work turned off" : "Open to Work turned on", "success") }}
                className={cn(
                  "mt-2 flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[11px] font-semibold transition-all",
                  openToWork ? "bg-emerald-50 border-emerald-200 text-emerald-700" : "bg-muted border-border text-muted-foreground"
                )}
              >
                <span className={cn("w-1.5 h-1.5 rounded-full flex-shrink-0", openToWork ? "bg-emerald-500" : "bg-muted-foreground")} />
                {openToWork ? "Open to Work" : "Not Looking"}
              </button>

              <div className="flex flex-wrap gap-2 mt-3">
                {[
                  { label: profile.email },
                  { label: profile.phone },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-muted border border-border">
                    <span className="text-[10.5px] text-muted-foreground font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 mt-2">
                <span className="px-2.5 py-1.5 rounded-full border border-blue-100 bg-blue-50 text-[10.5px] font-semibold text-blue-600">{profile.linkedIn}</span>
                <span className="px-2.5 py-1.5 rounded-full border border-border bg-muted text-[10.5px] font-semibold text-foreground">{profile.github}</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2.5">
              {statsData.map((s) => (
                <div key={s.label} className="bg-card rounded-[14px] p-3 shadow-card border border-border text-center">
                  <p className={cn("text-[22px] font-bold leading-none", s.color)}>{s.value}</p>
                  <p className="text-[9.5px] text-muted-foreground font-semibold uppercase tracking-wide mt-1">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Profile Completeness — mobile */}
            <div className="bg-card rounded-[14px] border border-border shadow-card p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[13px] font-bold text-foreground">Profile Strength</p>
                <span className={cn("text-[13px] font-bold", pct >= 80 ? "text-emerald-600" : "text-amber-600")}>{pct}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className={cn("h-full rounded-full transition-all", pct >= 80 ? "bg-emerald-500" : "bg-primary")} style={{ width: `${pct}%` }} />
              </div>
              {missing.length > 0 && <p className="text-[11px] text-muted-foreground mt-2">Add: {missing.slice(0, 2).join(" · ")}</p>}
            </div>

            {/* Sections */}
            <SectionCard title="About" onEdit={() => setModal("about")}>
              <p className="text-[13px] text-muted-foreground leading-relaxed">{profile.about}</p>
            </SectionCard>

            <SectionCard title="Work Experience" onAdd={() => showToast("Add experience — coming soon", "info")}>
              <div className="space-y-5">
                {profile.experience.map((exp, i) => (
                  <ExperienceRow key={exp.id} exp={exp} last={i === profile.experience.length - 1} />
                ))}
              </div>
            </SectionCard>

            <SectionCard title="Education" onAdd={() => showToast("Add education — coming soon", "info")}>
              <div className="space-y-4">
                {profile.education.map((ed, i) => (
                  <EducationRow key={ed.id} ed={ed} last={i === profile.education.length - 1} />
                ))}
              </div>
            </SectionCard>

            <SectionCard title="Skills" onEdit={() => setModal("skills")}>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill) => (
                  <span key={skill} className="text-[12px] font-semibold px-3 py-1.5 rounded-full bg-primary/8 text-primary border border-primary/20">{skill}</span>
                ))}
              </div>
            </SectionCard>

            <SectionCard title="Certifications" onAdd={() => showToast("Add certification — coming soon", "info")}>
              <div className="space-y-3">
                {profile.certifications.map((cert) => (
                  <div key={cert.id} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-[8px] bg-amber-50 flex items-center justify-center flex-shrink-0">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-amber-600">
                        <path d="M7 1L8.5 5H13L9.5 7.5L11 12L7 9.5L3 12L4.5 7.5L1 5H5.5L7 1Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[12.5px] font-bold text-foreground leading-tight">{cert.name}</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">{cert.issuer} · {cert.year}</p>
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>

            <SectionCard title="Languages">
              <div className="flex flex-wrap gap-2">
                {profile.languages.map((lang) => (
                  <span key={lang} className="text-[12px] font-semibold px-3 py-1.5 rounded-full bg-muted text-foreground border border-border">{lang}</span>
                ))}
              </div>
            </SectionCard>

            {/* Quick links — mobile */}
            <div className="space-y-2">
              {quickLinksData.map((item) => (
                <button key={item.label} onClick={item.onClick} className="w-full bg-card rounded-[14px] px-4 py-3.5 shadow-card border border-border card-tap flex items-center gap-3.5 text-left">
                  <div className={cn("w-10 h-10 rounded-[10px] flex items-center justify-center flex-shrink-0", item.bg)}>{item.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-[13px] font-semibold text-foreground">{item.label}</p>
                      {item.badge && <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-primary/10 text-primary">{item.badge}</span>}
                    </div>
                    <p className="text-[11px] text-muted-foreground">{item.desc}</p>
                  </div>
                  <ChevronRight />
                </button>
              ))}
            </div>

            <button onClick={() => showToast("Signed out successfully", "info")} className="w-full mt-2 py-3.5 rounded-[14px] border border-destructive/20 bg-card text-[13px] font-semibold text-destructive btn-press active:bg-destructive/5">
              Sign Out
            </button>
          </div>
        </div>

      </div>

      {/* ─── Modals ──────────────────────────────────────── */}
      {modal === "about" && (
        <EditAboutModal value={profile.about} onSave={(about) => updateProfile({ about })} onClose={() => setModal(null)} />
      )}
      {modal === "header" && (
        <EditHeaderModal profile={profile} onSave={(patch) => updateProfile(patch)} onClose={() => setModal(null)} />
      )}
      {modal === "skills" && (
        <EditSkillsModal skills={profile.skills} onSave={(skills) => updateProfile({ skills })} onClose={() => setModal(null)} />
      )}
    </div>
  )
}
