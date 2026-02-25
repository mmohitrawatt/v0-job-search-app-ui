"use client"

import React, { useEffect } from "react"
import { AppProvider, useApp, Tab } from "@/lib/app-context"
import { DashboardScreen } from "@/components/screens/dashboard-screen"
import { ResumeScreen } from "@/components/screens/resume-screen"
import { JobsScreen } from "@/components/screens/jobs-screen"
import { PreparationScreen } from "@/components/screens/preparation-screen"
import { ProfileScreen } from "@/components/screens/profile-screen"
import { cn } from "@/lib/utils"

export default function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  )
}

function AppShell() {
  const { activeTab, setActiveTab, screen, toasts } = useApp()

  const hideTabBar = ["job-detail", "smart-apply", "resume-form", "resume-preview", "resume-optimize", "prep-detail"].includes(screen)

  return (
    <main className="relative flex flex-col w-full min-h-screen max-w-lg mx-auto bg-background font-sans">

      {/* Screen Content */}
      <div className={cn("flex-1 flex flex-col overflow-y-auto", hideTabBar ? "pb-0" : "pb-[68px]")}>
        <ScreenRouter />
      </div>

      {/* Bottom Nav — fixed to bottom of the centered column */}
      {!hideTabBar && (
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-lg bg-card/95 backdrop-blur-md border-t border-border z-50">
          <div className="flex items-center justify-around px-2 pt-2 pb-safe pb-3">
            {(
              [
                { id: "dashboard" as Tab, label: "Dashboard", icon: dashboardIcon },
                { id: "resume" as Tab, label: "Resume", icon: resumeIcon },
                { id: "jobs" as Tab, label: "Jobs", icon: jobsIcon },
                { id: "preparation" as Tab, label: "Prep", icon: prepIcon },
                { id: "profile" as Tab, label: "Profile", icon: profileIcon },
              ] as const
            ).map((tab) => {
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="flex flex-col items-center gap-0.5 flex-1 py-1 tap-highlight-none transition-all duration-200 active:scale-90"
                  aria-label={tab.label}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span className={isActive ? "text-primary" : "text-muted-foreground"}>
                    {tab.icon(isActive)}
                  </span>
                  <span className={`text-[10px] font-semibold tracking-tight ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                    {tab.label}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Toast layer */}
      <div className="fixed bottom-20 left-1/2 -translate-x-1/2 w-full max-w-lg px-4 z-[100] pointer-events-none flex flex-col gap-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={cn(
              "w-full px-4 py-3 rounded-[12px] shadow-card-hover text-[13px] font-semibold text-white flex items-center gap-2.5 animate-in slide-in-from-bottom-4 fade-in duration-300",
              toast.type === "error" ? "bg-destructive" :
              toast.type === "info" ? "bg-foreground" :
              "bg-emerald-600"
            )}
          >
            {toast.type === "error" ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="white" strokeWidth="1.4"/><path d="M8 5V8.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/><circle cx="8" cy="11" r="0.75" fill="white"/></svg>
            ) : toast.type === "info" ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="white" strokeWidth="1.4"/><path d="M8 7V11" stroke="white" strokeWidth="1.5" strokeLinecap="round"/><circle cx="8" cy="5" r="0.75" fill="white"/></svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="white" strokeWidth="1.4"/><path d="M5 8L7 10L11 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            )}
            {toast.message}
          </div>
        ))}
      </div>
    </main>
  )
}

function ScreenRouter() {
  const { screen } = useApp()

  const screens: Record<string, React.ReactNode> = {
    dashboard: <DashboardScreen />,
    resume: <ResumeScreen />,
    jobs: <JobsScreen />,
    preparation: <PreparationScreen />,
    profile: <ProfileScreen />,
    // Sub-screens are rendered by their parent via internal state
    "job-detail": <JobsScreen />,
    "smart-apply": <JobsScreen />,
    "resume-form": <ResumeScreen />,
    "resume-preview": <ResumeScreen />,
    "resume-optimize": <ResumeScreen />,
    "prep-detail": <PreparationScreen />,
  }

  return <>{screens[screen] ?? <DashboardScreen />}</>
}

// Tab Icons
function dashboardIcon(active: boolean) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <rect x="2" y="2" width="8" height="8" rx="2.5" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth={active ? 0 : 1.6} />
      <rect x="12" y="2" width="8" height="8" rx="2.5" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth={active ? 0 : 1.6} />
      <rect x="2" y="12" width="8" height="8" rx="2.5" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth={active ? 0 : 1.6} />
      <rect x="12" y="12" width="8" height="8" rx="2.5" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth={active ? 0 : 1.6} />
    </svg>
  )
}
function resumeIcon(active: boolean) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <rect x="3.5" y="2" width="15" height="18" rx="2.5" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth={active ? 0 : 1.6} />
      <path d="M7 7H15M7 11H12M7 15H13.5" stroke={active ? "white" : "currentColor"} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
function jobsIcon(active: boolean) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <rect x="2" y="7.5" width="18" height="12" rx="2.5" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth={active ? 0 : 1.6} />
      <path d="M8 7.5V5.5C8 3.843 9.343 2.5 11 2.5C12.657 2.5 14 3.843 14 5.5V7.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="11" cy="13.5" r="1.5" fill={active ? "white" : "currentColor"} />
    </svg>
  )
}
function prepIcon(active: boolean) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <circle cx="11" cy="11" r="8.5" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth={active ? 0 : 1.6} />
      <path d="M7.5 11L10 13.5L14.5 8.5" stroke={active ? "white" : "currentColor"} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function profileIcon(active: boolean) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <circle cx="11" cy="7.5" r="3.5" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth={active ? 0 : 1.6} />
      <path d="M3.5 19C3.5 15.41 6.91 12.5 11 12.5C15.09 12.5 18.5 15.41 18.5 19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}
