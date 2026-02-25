"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { useApp } from "@/lib/app-context"
import { MOCK_JOBS } from "@/lib/mock-data"

type SubScreen = "main" | "saved-jobs" | "edit-name"

function ChevronRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-muted-foreground flex-shrink-0">
      <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ─── Saved Jobs Sub-screen ─────────────────────────────────────

function SavedJobsScreen({ onBack }: { onBack: () => void }) {
  const { savedJobIds, toggleSavedJob, setSelectedJob, setActiveTab, navigate, showToast } = useApp()
  const savedJobs = MOCK_JOBS.filter((j) => savedJobIds.includes(j.id))

  return (
    <div className="flex-1 flex flex-col bg-background">
      <div className="px-4 pt-14 pb-4 border-b border-border flex-shrink-0">
        <button onClick={onBack} className="flex items-center gap-1.5 text-primary text-[14px] font-semibold btn-press tap-highlight-none mb-1">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M11 4L6 9L11 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Profile
        </button>
        <h1 className="text-xl font-bold text-foreground">Saved Jobs</h1>
        <p className="text-[12px] text-muted-foreground mt-0.5 font-medium">{savedJobs.length} jobs bookmarked</p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-5">
        {savedJobs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="text-muted-foreground">
                <path d="M6 3H22C23.1 3 24 3.9 24 5V26L14 21L4 26V5C4 3.9 4.9 3 6 3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
              </svg>
            </div>
            <p className="text-[14px] font-semibold text-foreground">No saved jobs yet</p>
            <p className="text-[12px] text-muted-foreground mt-1">Bookmark jobs from the Jobs tab</p>
          </div>
        ) : (
          <div className="space-y-3">
            {savedJobs.map((job) => (
              <div key={job.id} className="bg-card rounded-[14px] border border-border shadow-card">
                <button
                  onClick={() => { setSelectedJob(job); setActiveTab("jobs"); navigate("job-detail") }}
                  className="w-full p-4 text-left card-tap"
                >
                  <div className="flex items-center gap-3">
                    <div className={cn("w-10 h-10 rounded-[10px] flex items-center justify-center text-[11px] font-bold flex-shrink-0", job.color)}>
                      {job.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-bold text-foreground leading-tight">{job.title}</p>
                      <p className="text-[11px] text-muted-foreground font-medium mt-0.5">{job.company} · {job.isRemote ? "Remote" : job.location}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className={cn(
                        "text-[10px] font-bold px-2 py-0.5 rounded-full",
                        job.matchScore >= 85 ? "text-emerald-600 bg-emerald-50" : "text-amber-600 bg-amber-50"
                      )}>
                        {job.matchScore}%
                      </span>
                    </div>
                  </div>
                </button>
                <div className="flex border-t border-border">
                  <button
                    onClick={() => { setSelectedJob(job); setActiveTab("jobs"); navigate("job-detail") }}
                    className="flex-1 py-2.5 text-[11px] font-semibold text-primary transition-colors active:bg-muted border-r border-border"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => { toggleSavedJob(job.id); showToast("Job removed from saved", "info") }}
                    className="flex-1 py-2.5 text-[11px] font-semibold text-destructive transition-colors active:bg-muted"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Edit Name Modal ──────────────────────────────────────────

function EditNameModal({ onClose }: { onClose: () => void }) {
  const { profileName, setProfileName, showToast } = useApp()
  const [value, setValue] = useState(profileName)

  function save() {
    if (value.trim()) {
      setProfileName(value.trim())
      showToast("Profile updated", "success")
      onClose()
    }
  }

  return (
    <div className="absolute inset-0 bg-black/30 z-50 flex items-end">
      <div className="w-full bg-card rounded-t-[24px] p-6 animate-in slide-in-from-bottom-8 duration-300">
        <h3 className="text-[16px] font-bold text-foreground mb-4">Edit Name</h3>
        <input
          autoFocus
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && save()}
          className="w-full bg-background border border-border rounded-[12px] px-4 py-3 text-[15px] text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary mb-4 transition-all"
        />
        <div className="flex gap-2.5">
          <button
            onClick={onClose}
            className="flex-1 py-3.5 rounded-[12px] border border-border bg-card text-[14px] font-semibold text-foreground btn-press"
          >
            Cancel
          </button>
          <button
            onClick={save}
            className="flex-1 py-3.5 rounded-[12px] bg-primary text-primary-foreground text-[14px] font-bold btn-press"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Main Profile Screen ──────────────────────────────────────

export function ProfileScreen() {
  const { profileName, skills, setSkills, savedJobIds, resumes, showToast } = useApp()
  const [subScreen, setSubScreen] = useState<SubScreen>("main")
  const [editingName, setEditingName] = useState(false)
  const [newSkill, setNewSkill] = useState("")
  const [addingSkill, setAddingSkill] = useState(false)

  function removeSkill(s: string) {
    setSkills(skills.filter((x) => x !== s))
    showToast(`Removed "${s}"`, "info")
  }

  function addSkill() {
    const trimmed = newSkill.trim()
    if (trimmed && !skills.includes(trimmed)) {
      setSkills([...skills, trimmed])
      showToast(`Added "${trimmed}"`, "success")
    }
    setNewSkill("")
    setAddingSkill(false)
  }

  const initials = profileName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()

  if (subScreen === "saved-jobs") return <SavedJobsScreen onBack={() => setSubScreen("main")} />

  return (
    <div className="flex-1 flex flex-col bg-background overflow-hidden relative">
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 pt-14 pb-8">
          {/* Avatar + Name */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative mb-3">
              <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center shadow-card">
                <span className="text-[26px] font-bold text-primary-foreground select-none">{initials}</span>
              </div>
              <button
                onClick={() => setEditingName(true)}
                className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-card border-2 border-background shadow-card flex items-center justify-center text-foreground btn-press"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M8 2L10 4L3.5 10.5H1.5V8.5L8 2Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <button onClick={() => setEditingName(true)} className="group flex items-center gap-1.5 btn-press">
              <h1 className="text-xl font-bold text-foreground tracking-tight">{profileName}</h1>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-muted-foreground">
                <path d="M9.5 2L12 4.5L4.5 12H2V9.5L9.5 2Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
              </svg>
            </button>
            <p className="text-sm text-muted-foreground font-medium mt-0.5">AI Career Track</p>
            <div className="mt-3 flex items-center gap-1.5">
              <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-amber-50 text-amber-700">Pro Member</span>
              <span className="text-[11px] font-semibold px-3 py-1 rounded-full bg-accent text-accent-foreground">78% Complete</span>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-2.5 mb-6">
            {[
              { label: "Applications", value: "24" },
              { label: "Saved Jobs", value: String(savedJobIds.length) },
              { label: "Resumes", value: String(resumes.length) },
            ].map((stat) => (
              <div key={stat.label} className="bg-card rounded-[14px] p-3 shadow-card border border-border text-center">
                <p className="text-[20px] font-bold text-foreground leading-none">{stat.value}</p>
                <p className="text-[10px] text-muted-foreground font-medium mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Skills */}
          <div className="bg-card rounded-[14px] border border-border shadow-card p-4 mb-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[13px] font-semibold text-foreground">Skills</p>
              <button
                onClick={() => setAddingSkill(true)}
                className="w-7 h-7 rounded-full bg-accent flex items-center justify-center text-primary btn-press"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 2V10M2 6H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <button
                  key={skill}
                  onClick={() => removeSkill(skill)}
                  className="flex items-center gap-1.5 text-[12px] font-semibold px-3 py-1.5 rounded-full bg-accent text-accent-foreground border border-border transition-all duration-200 btn-press group"
                >
                  {skill}
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="text-muted-foreground group-hover:text-destructive transition-colors">
                    <path d="M2 2L8 8M8 2L2 8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                  </svg>
                </button>
              ))}
            </div>
            {addingSkill && (
              <div className="flex gap-2 mt-3 animate-in fade-in duration-200">
                <input
                  autoFocus
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") addSkill(); if (e.key === "Escape") setAddingSkill(false) }}
                  placeholder="Add skill…"
                  className="flex-1 bg-background border border-border rounded-[10px] px-3 py-2 text-[13px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                />
                <button onClick={addSkill} className="px-3 py-2 rounded-[10px] bg-primary text-primary-foreground text-[12px] font-bold btn-press">Add</button>
                <button onClick={() => { setAddingSkill(false); setNewSkill("") }} className="px-3 py-2 rounded-[10px] bg-muted text-muted-foreground text-[12px] font-medium btn-press">Cancel</button>
              </div>
            )}
          </div>

          {/* Menu Items */}
          <div className="space-y-2.5">
            <button
              onClick={() => setSubScreen("saved-jobs")}
              className="w-full bg-card rounded-[14px] px-4 py-3.5 shadow-card border border-border card-tap flex items-center gap-3.5 text-left"
            >
              <div className="w-10 h-10 rounded-[10px] bg-violet-50 text-violet-600 flex items-center justify-center flex-shrink-0">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M4 3H14C14.55 3 15 3.45 15 4V16L9 13L3 16V4C3 3.45 3.45 3 4 3Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/></svg>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-[13px] font-semibold text-foreground">Saved Jobs</p>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-primary/10 text-primary leading-none">{savedJobIds.length}</span>
                </div>
                <p className="text-[11px] text-muted-foreground font-medium mt-0.5">{savedJobIds.length} jobs bookmarked</p>
              </div>
              <ChevronRight />
            </button>

            {[
              {
                label: "Subscription Plan",
                desc: "Pro plan — Renews Mar 15",
                badge: "Pro",
                badgeColor: "bg-emerald-100 text-emerald-700",
                iconBg: "bg-emerald-50 text-emerald-600",
                icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="4" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.4"/><path d="M2 7.5H16" stroke="currentColor" strokeWidth="1.4"/><path d="M5.5 11H7.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>,
              },
              {
                label: "Notifications",
                desc: "Job alerts, interview reminders",
                iconBg: "bg-blue-50 text-blue-600",
                icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2C6.24 2 4 4.24 4 7V11L2.5 12.5V13.5H15.5V12.5L14 11V7C14 4.24 11.76 2 9 2Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/><path d="M7 13.5C7 14.6 7.9 15.5 9 15.5C10.1 15.5 11 14.6 11 13.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>,
              },
              {
                label: "Privacy & Account",
                desc: "Data, password, linked accounts",
                iconBg: "bg-muted text-muted-foreground",
                icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2L3 5V9C3 12.31 5.69 15.16 9 16C12.31 15.16 15 12.31 15 9V5L9 2Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/></svg>,
              },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => showToast(`${item.label} — coming soon`, "info")}
                className="w-full bg-card rounded-[14px] px-4 py-3.5 shadow-card border border-border card-tap flex items-center gap-3.5 text-left"
              >
                <div className={cn("w-10 h-10 rounded-[10px] flex items-center justify-center flex-shrink-0", item.iconBg)}>
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-[13px] font-semibold text-foreground">{item.label}</p>
                    {item.badge && (
                      <span className={cn("text-[9px] font-bold px-1.5 py-0.5 rounded-full leading-none", item.badgeColor)}>
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-muted-foreground font-medium mt-0.5">{item.desc}</p>
                </div>
                <ChevronRight />
              </button>
            ))}
          </div>

          {/* Sign Out */}
          <button
            onClick={() => showToast("You have been signed out", "info")}
            className="w-full mt-5 py-3.5 rounded-[14px] border border-destructive/20 bg-card text-[13px] font-semibold text-destructive transition-all duration-200 btn-press active:bg-destructive/5"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Edit Name Modal */}
      {editingName && <EditNameModal onClose={() => setEditingName(false)} />}
    </div>
  )
}
