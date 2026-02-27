"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { useApp } from "@/lib/app-context"
import { MOCK_JOBS, JobPortal } from "@/lib/mock-data"

const PORTAL_OPTIONS: JobPortal[] = ["linkedin", "naukri", "indeed", "foundit", "internshala"]

const PORTAL_COLORS: Record<JobPortal, string> = {
  linkedin: "bg-blue-100 text-blue-700",
  naukri: "bg-orange-100 text-orange-700",
  indeed: "bg-indigo-100 text-indigo-700",
  foundit: "bg-purple-100 text-purple-700",
  internshala: "bg-cyan-100 text-cyan-700",
}

export function JobAlertsScreen() {
  const { goBack, alerts, addAlert, toggleAlert, deleteAlert, setSelectedJob, setActiveTab, navigate, showToast } = useApp()
  const [showForm, setShowForm] = useState(false)
  const [keyword, setKeyword] = useState("")
  const [location, setLocation] = useState("")
  const [minSalary, setMinSalary] = useState(20)
  const [selectedPortals, setSelectedPortals] = useState<JobPortal[]>(["linkedin", "naukri"])

  function handleTogglePortal(portal: JobPortal) {
    setSelectedPortals((prev) =>
      prev.includes(portal) ? prev.filter((p) => p !== portal) : [...prev, portal]
    )
  }

  function handleSaveAlert() {
    if (!keyword.trim()) return
    addAlert({
      keyword: keyword.trim(),
      location: location.trim() || "Anywhere",
      minSalaryLPA: minSalary,
      portals: selectedPortals,
      active: true,
      matchCount: Math.floor(Math.random() * 5) + 1,
    })
    showToast(`Alert created for "${keyword}"`, "success")
    setKeyword("")
    setLocation("")
    setMinSalary(20)
    setSelectedPortals(["linkedin", "naukri"])
    setShowForm(false)
  }

  // Jobs that match any active alert keyword
  const matchedJobs = MOCK_JOBS.filter((job) =>
    alerts.some(
      (a) =>
        a.active &&
        (job.title.toLowerCase().includes(a.keyword.toLowerCase()) ||
          a.keyword.toLowerCase().includes("ml") ||
          a.keyword.toLowerCase().includes("data"))
    )
  ).slice(0, 4)

  return (
    <div className="flex-1 flex flex-col bg-background min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between px-4 lg:px-8 pt-14 lg:pt-6 pb-4 bg-card border-b border-border">
        <div className="flex items-center gap-3">
          <button onClick={goBack} className="w-8 h-8 rounded-full bg-muted flex items-center justify-center tap-highlight-none btn-press">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <div>
            <p className="text-[15px] font-bold text-foreground">Job Alerts</p>
            <p className="text-[10px] text-muted-foreground font-medium">{alerts.filter((a) => a.active).length} active alerts</p>
          </div>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-1.5 bg-primary text-primary-foreground px-3 py-1.5 rounded-[10px] text-[11px] font-bold btn-press tap-highlight-none"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 2V10M2 6H10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
          New Alert
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 lg:px-8 py-5">

        {/* Active Alerts */}
        <div className="mb-5">
          <p className="text-[12px] font-bold text-foreground mb-3">Your Alerts</p>
          {alerts.length === 0 ? (
            <div className="bg-card rounded-[14px] p-6 text-center border border-border shadow-card">
              <p className="text-[14px] text-muted-foreground mb-1">No alerts yet</p>
              <p className="text-[11px] text-muted-foreground/70">Create your first alert to get notified of new matching jobs</p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className="bg-card rounded-[14px] p-4 shadow-card border border-border"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0 mr-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[13px] font-bold text-foreground">{alert.keyword}</span>
                        {alert.matchCount > 0 && alert.active && (
                          <span className="bg-primary/10 text-primary text-[9px] font-extrabold px-2 py-0.5 rounded-full">
                            {alert.matchCount} new
                          </span>
                        )}
                      </div>
                      <p className="text-[10.5px] text-muted-foreground mt-0.5">
                        {alert.location} · ₹{alert.minSalaryLPA}+ LPA
                      </p>
                      <div className="flex gap-1 mt-1.5 flex-wrap">
                        {alert.portals.map((p) => (
                          <span key={p} className={cn("text-[9px] font-bold px-1.5 py-0.5 rounded-full capitalize", PORTAL_COLORS[p])}>
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      {/* Toggle switch */}
                      <button
                        onClick={() => toggleAlert(alert.id)}
                        className={cn(
                          "w-10 h-5.5 rounded-full relative transition-all duration-200 tap-highlight-none flex-shrink-0",
                          alert.active ? "bg-primary" : "bg-muted"
                        )}
                        style={{ height: "22px" }}
                      >
                        <span
                          className={cn(
                            "absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-all duration-200",
                            alert.active ? "left-[22px]" : "left-0.5"
                          )}
                        />
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => {
                          deleteAlert(alert.id)
                          showToast("Alert deleted", "info")
                        }}
                        className="w-7 h-7 rounded-full bg-muted flex items-center justify-center tap-highlight-none btn-press"
                      >
                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 2.5L11 11M11 2.5L2 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Matches */}
        {matchedJobs.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-[12px] font-bold text-foreground">Matching Jobs</p>
              <button
                onClick={() => setActiveTab("jobs")}
                className="text-[11px] text-primary font-semibold tap-highlight-none"
              >
                See all
              </button>
            </div>
            <div className="space-y-2.5">
              {matchedJobs.map((job) => {
                const matchColor = job.matchScore >= 85 ? "text-emerald-600 bg-emerald-50" : job.matchScore >= 70 ? "text-amber-600 bg-amber-50" : "text-orange-600 bg-orange-50"
                return (
                  <button
                    key={job.id}
                    onClick={() => {
                      setSelectedJob(job)
                      setActiveTab("jobs")
                      navigate("job-detail")
                    }}
                    className="w-full flex items-center gap-3 bg-card rounded-[14px] px-3 py-3 shadow-card border border-border card-tap text-left"
                  >
                    <div className={cn("w-9 h-9 rounded-[10px] flex items-center justify-center text-[11px] font-extrabold flex-shrink-0", job.color)}>
                      {job.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] font-bold text-foreground truncate">{job.title}</p>
                      <p className="text-[10.5px] text-muted-foreground font-medium">{job.company} · {job.salary}</p>
                    </div>
                    <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0", matchColor)}>
                      {job.matchScore}%
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* New Alert Bottom Sheet */}
      {showForm && (
        <div className="absolute inset-0 bg-black/40 z-50 flex items-end" onClick={() => setShowForm(false)}>
          <div
            className="w-full bg-card rounded-t-[20px] p-5 pb-8 max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-8 h-1 bg-muted rounded-full mx-auto mb-5" />
            <p className="text-[15px] font-bold text-foreground mb-5">Create Job Alert</p>

            {/* Keyword */}
            <div className="mb-4">
              <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wide block mb-1.5">Job Title / Keyword *</label>
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="e.g. ML Engineer, Data Scientist"
                className="w-full bg-muted rounded-[10px] px-3 py-2.5 text-[13px] text-foreground outline-none placeholder:text-muted-foreground/60"
              />
            </div>

            {/* Location */}
            <div className="mb-4">
              <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wide block mb-1.5">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Bengaluru, Remote"
                className="w-full bg-muted rounded-[10px] px-3 py-2.5 text-[13px] text-foreground outline-none placeholder:text-muted-foreground/60"
              />
            </div>

            {/* Min Salary */}
            <div className="mb-4">
              <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wide block mb-1.5">
                Min Salary · <span className="text-primary">₹{minSalary} LPA</span>
              </label>
              <input
                type="range"
                min={5}
                max={80}
                step={5}
                value={minSalary}
                onChange={(e) => setMinSalary(Number(e.target.value))}
                className="w-full accent-primary"
              />
              <div className="flex justify-between text-[9px] text-muted-foreground mt-1">
                <span>₹5L</span><span>₹80L</span>
              </div>
            </div>

            {/* Portals */}
            <div className="mb-5">
              <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wide block mb-2">Portals</label>
              <div className="flex flex-wrap gap-2">
                {PORTAL_OPTIONS.map((portal) => {
                  const selected = selectedPortals.includes(portal)
                  return (
                    <button
                      key={portal}
                      onClick={() => handleTogglePortal(portal)}
                      className={cn(
                        "px-2.5 py-1 rounded-full text-[11px] font-bold capitalize transition-all tap-highlight-none",
                        selected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                      )}
                    >
                      {portal}
                    </button>
                  )
                })}
              </div>
            </div>

            <button
              onClick={handleSaveAlert}
              disabled={!keyword.trim()}
              className={cn(
                "w-full py-3 rounded-[12px] text-[14px] font-bold transition-all",
                keyword.trim() ? "bg-primary text-primary-foreground btn-press" : "bg-muted text-muted-foreground cursor-not-allowed"
              )}
            >
              Save Alert
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
