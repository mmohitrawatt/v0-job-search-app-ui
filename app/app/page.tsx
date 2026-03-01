"use client"

import React, { useEffect } from "react"
import { AppProvider, useApp, Tab, Screen } from "@/lib/app-context"
import { DashboardScreen } from "@/components/screens/dashboard-screen"
import { ResumeScreen } from "@/components/screens/resume-screen"
import { JobsScreen } from "@/components/screens/jobs-screen"
import { PreparationScreen } from "@/components/screens/preparation-screen"
import { ProfileScreen } from "@/components/screens/profile-screen"
import { AiInterviewScreen } from "@/components/screens/ai-interview-screen"
import { SalaryIntelScreen } from "@/components/screens/salary-intel-screen"
import { JobAlertsScreen } from "@/components/screens/job-alerts-screen"
import { cn } from "@/lib/utils"

export default function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  )
}

// ─── Desktop Sidebar ──────────────────────────────────────────────────────────

function DesktopSidebar({
  activeTab,
  setActiveTab,
  notificationCount,
  navigate,
  profile,
}: {
  activeTab: Tab
  setActiveTab: (t: Tab) => void
  notificationCount: number
  navigate: (s: Screen) => void
  profile: { name: string }
}) {
  const [collapsed, setCollapsed] = React.useState(false)
  const initials = profile.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
  const firstName = profile.name.split(" ")[0]

  const navItems: { id: Tab; label: string; icon: (active: boolean) => React.ReactNode }[] = [
    { id: "dashboard",   label: "Dashboard",   icon: dashboardIcon },
    { id: "resume",      label: "Resume",      icon: resumeIcon },
    { id: "jobs",        label: "Jobs",        icon: jobsIcon },
    { id: "preparation", label: "Preparation", icon: prepIcon },
    { id: "profile",     label: "Profile",     icon: profileIcon },
  ]

  return (
    <aside
      className="hidden lg:flex flex-col h-screen bg-card border-r border-border flex-shrink-0 sticky top-0 z-40 overflow-hidden transition-[width] duration-300 ease-in-out"
      style={{ width: collapsed ? 64 : 240 }}
    >
      {/* Logo row */}
      <div className={cn("flex items-center border-b border-border flex-shrink-0 h-[65px]", collapsed ? "justify-center px-0" : "px-4 gap-2.5")}>
        <div className="w-9 h-9 rounded-[10px] bg-primary flex items-center justify-center flex-shrink-0">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <rect x="2.5" y="3" width="13" height="12" rx="2" stroke="white" strokeWidth="1.5"/>
            <path d="M5.5 7.5H12.5M5.5 10.5H10" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
            <circle cx="14" cy="4.5" r="2.5" fill="white"/>
          </svg>
        </div>
        {!collapsed && (
          <>
            <div className="flex-1 min-w-0">
              <p className="text-[15px] font-bold text-foreground leading-tight">JobComp</p>
              <p className="text-[10px] text-muted-foreground font-medium">AI Job Companion</p>
            </div>
            <button
              onClick={() => setCollapsed(true)}
              className="w-7 h-7 rounded-[8px] flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-colors flex-shrink-0"
              title="Collapse sidebar"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Expand button (shown only when collapsed) */}
      {collapsed && (
        <button
          onClick={() => setCollapsed(false)}
          className="mx-auto mt-3 w-8 h-8 rounded-[8px] flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-colors flex-shrink-0"
          title="Expand sidebar"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M5 2L10 7L5 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}

      {/* Nav items */}
      <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = activeTab === item.id
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              title={collapsed ? item.label : undefined}
              className={cn(
                "w-full flex items-center rounded-[10px] transition-all duration-150",
                collapsed ? "justify-center px-0 py-2.5" : "gap-3 px-3 py-2.5",
                isActive ? "bg-accent text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <span className={cn("flex-shrink-0", isActive ? "text-primary" : "text-muted-foreground")}>
                {item.icon(isActive)}
              </span>
              {!collapsed && <span className="text-[13px] font-semibold truncate">{item.label}</span>}
            </button>
          )
        })}

        <div className="h-px bg-border my-2" />

        {/* Alerts */}
        <button
          onClick={() => navigate("job-alerts")}
          title={collapsed ? "Job Alerts" : undefined}
          className={cn(
            "w-full flex items-center rounded-[10px] text-muted-foreground hover:bg-muted hover:text-foreground transition-all duration-150",
            collapsed ? "justify-center px-0 py-2.5" : "gap-3 px-3 py-2.5"
          )}
        >
          <span className="relative flex-shrink-0">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 2.5C6.69 2.5 4 5.19 4 8.5V13L2.5 14.5V15.5H17.5V14.5L16 13V8.5C16 5.19 13.31 2.5 10 2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
              <path d="M8 15.5C8 16.6 8.9 17.5 10 17.5C11.1 17.5 12 16.6 12 15.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[14px] h-3.5 bg-red-500 rounded-full flex items-center justify-center text-[8px] font-bold text-white px-0.5">
                {notificationCount}
              </span>
            )}
          </span>
          {!collapsed && (
            <>
              <span className="text-[13px] font-semibold flex-1">Job Alerts</span>
              {notificationCount > 0 && (
                <span className="bg-red-500/10 text-red-600 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {notificationCount}
                </span>
              )}
            </>
          )}
        </button>
      </nav>

      {/* User info */}
      <div className={cn("py-4 border-t border-border flex-shrink-0", collapsed ? "flex justify-center px-0" : "px-3")}>
        {collapsed ? (
          <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-[13px] font-bold" title={firstName}>
            {initials}
          </div>
        ) : (
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-[13px] font-bold flex-shrink-0">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-semibold text-foreground truncate">{firstName}</p>
              <p className="text-[10px] text-muted-foreground">Pro Member</p>
            </div>
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-amber-50 text-amber-700 flex-shrink-0">Pro</span>
          </div>
        )}
      </div>
    </aside>
  )
}

// ─── App Shell ────────────────────────────────────────────────────────────────

function AppShell() {
  const { activeTab, setActiveTab, screen, toasts, navigate, profile, notificationCount } = useApp()

  const hideTabBar = [
    "job-detail", "smart-apply", "resume-form", "resume-preview",
    "resume-optimize", "prep-detail", "ai-interview", "salary-intel",
    "job-alerts", "resume-tailor",
  ].includes(screen)

  return (
    <main className="flex flex-col lg:flex-row w-full h-[100dvh] bg-background font-sans overflow-hidden">

      {/* Desktop Sidebar */}
      <DesktopSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        notificationCount={notificationCount}
        navigate={navigate}
        profile={profile}
      />

      {/* Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-0 overflow-hidden relative">

        {/* Screen Content */}
        <div className={cn(
          "flex-1 flex flex-col min-h-0 overflow-hidden",
          !hideTabBar && "pb-[68px] lg:pb-0"
        )}>
          <ScreenRouter />
        </div>

        {/* Mobile Bottom Nav */}
        {!hideTabBar && (
          <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-md border-t border-border z-50">
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
      </div>

      {/* Toast layer */}
      <div className="fixed bottom-20 lg:bottom-6 left-0 right-0 lg:left-auto lg:right-6 lg:w-80 px-4 lg:px-0 z-[100] pointer-events-none flex flex-col gap-2">
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
    "resume-tailor": <ResumeScreen />,
    "prep-detail": <PreparationScreen />,
    "ai-interview": <AiInterviewScreen />,
    "salary-intel": <SalaryIntelScreen />,
    "job-alerts": <JobAlertsScreen />,
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
