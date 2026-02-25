"use client"

import React from "react"
import { cn } from "@/lib/utils"

type Tab = "dashboard" | "resume" | "jobs" | "preparation" | "profile"

interface BottomNavProps {
  activeTab: Tab
  onTabChange: (tab: Tab) => void
}

const tabs: { id: Tab; label: string; icon: (active: boolean) => React.ReactNode }[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="8" height="8" rx="2.5" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth={active ? "0" : "1.6"} />
        <rect x="12" y="2" width="8" height="8" rx="2.5" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth={active ? "0" : "1.6"} />
        <rect x="2" y="12" width="8" height="8" rx="2.5" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth={active ? "0" : "1.6"} />
        <rect x="12" y="12" width="8" height="8" rx="2.5" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth={active ? "0" : "1.6"} />
      </svg>
    ),
  },
  {
    id: "resume",
    label: "Resume",
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="2" width="16" height="18" rx="2.5" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth={active ? "0" : "1.6"} />
        {active ? (
          <>
            <rect x="6.5" y="6" width="9" height="1.5" rx="0.75" fill="white" />
            <rect x="6.5" y="9.5" width="6" height="1.5" rx="0.75" fill="white" />
            <rect x="6.5" y="13" width="7.5" height="1.5" rx="0.75" fill="white" />
          </>
        ) : (
          <>
            <rect x="6.5" y="6" width="9" height="1.5" rx="0.75" fill="currentColor" />
            <rect x="6.5" y="9.5" width="6" height="1.5" rx="0.75" fill="currentColor" />
            <rect x="6.5" y="13" width="7.5" height="1.5" rx="0.75" fill="currentColor" />
          </>
        )}
      </svg>
    ),
  },
  {
    id: "jobs",
    label: "Jobs",
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="7" width="18" height="13" rx="2.5" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth={active ? "0" : "1.6"} />
        <path d="M7.5 7V5.5C7.5 3.567 9.067 2 11 2C12.933 2 14.5 3.567 14.5 5.5V7" stroke={active ? "white" : "currentColor"} strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="11" cy="13.5" r="1.5" fill={active ? "white" : "currentColor"} />
      </svg>
    ),
  },
  {
    id: "preparation",
    label: "Prep",
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="11" cy="11" r="8.5" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth={active ? "0" : "1.6"} />
        <path d="M7.5 11L10 13.5L14.5 8.5" stroke={active ? "white" : "currentColor"} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "profile",
    label: "Profile",
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="11" cy="7.5" r="3.5" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth={active ? "0" : "1.6"} />
        <path d="M3.5 18.5C3.5 14.91 6.91 12 11 12C15.09 12 18.5 14.91 18.5 18.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
]

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] bg-card border-t border-border z-50 tap-highlight-none"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="flex items-center justify-around px-2 pt-2 pb-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all duration-200 ease-out min-w-0 flex-1",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground active:text-foreground"
              )}
              aria-label={tab.label}
              aria-current={isActive ? "page" : undefined}
            >
              <span className="flex items-center justify-center h-6 w-6">
                {tab.icon(isActive)}
              </span>
              <span
                className={cn(
                  "text-[10px] font-medium tracking-tight leading-none",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                {tab.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
