"use client"

import { cn } from "@/lib/utils"

const sections = [
  {
    label: "Personal Information",
    desc: "Name, email, phone, location",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="6.5" r="3" stroke="currentColor" strokeWidth="1.4" />
        <path d="M3 15C3 12.24 5.69 10 9 10C12.31 10 15 12.24 15 15" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
    color: "bg-blue-50 text-blue-600",
  },
  {
    label: "Skills & Experience",
    desc: "Work history, certifications",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 2L10.5 6H15L11.3 8.6L12.8 13L9 10.4L5.2 13L6.7 8.6L3 6H7.5L9 2Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    ),
    color: "bg-amber-50 text-amber-600",
  },
  {
    label: "Saved Jobs",
    desc: "12 jobs bookmarked",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M4 3H14C14.55 3 15 3.45 15 4V16L9 13L3 16V4C3 3.45 3.45 3 4 3Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    ),
    color: "bg-violet-50 text-violet-600",
    badge: "12",
  },
  {
    label: "Subscription Plan",
    desc: "Pro plan — Renews Mar 15",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="2" y="4" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.4" />
        <path d="M2 7.5H16" stroke="currentColor" strokeWidth="1.4" />
        <path d="M5.5 11H7.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
    color: "bg-emerald-50 text-emerald-600",
    badge: "Pro",
    badgeColor: "bg-emerald-100 text-emerald-700",
  },
  {
    label: "Settings",
    desc: "Notifications, privacy, account",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M9 2V3.5M9 14.5V16M16 9H14.5M3.5 9H2M13.96 4.04L12.9 5.1M5.1 12.9L4.04 13.96M13.96 13.96L12.9 12.9M5.1 5.1L4.04 4.04" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
    color: "bg-muted text-muted-foreground",
  },
]

function ChevronRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-muted-foreground flex-shrink-0">
      <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function ProfileScreen() {
  return (
    <div className="flex-1 overflow-y-auto bg-background">
      <div className="px-4 pt-14 pb-8">

        {/* Avatar + Name */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative mb-4">
            <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center shadow-card">
              <span className="text-[28px] font-bold text-primary-foreground select-none">M</span>
            </div>
            <button className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-card border-2 border-background shadow-card flex items-center justify-center text-foreground">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M8 2L10 4L3.5 10.5H1.5V8.5L8 2Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          <h1 className="text-xl font-bold text-foreground tracking-tight">Mohit Rawat</h1>
          <p className="text-sm text-muted-foreground font-medium mt-0.5">AI Career Track</p>
          <div className="flex items-center gap-2 mt-3">
            <span className="text-[11px] font-semibold px-3 py-1 rounded-full bg-accent text-primary">
              78% Profile Complete
            </span>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-2.5 mb-7">
          {[
            { label: "Applications", value: "24" },
            { label: "Saved Jobs", value: "12" },
            { label: "ATS Score", value: "82%" },
          ].map((stat) => (
            <div key={stat.label} className="bg-card rounded-[14px] p-3 shadow-card border border-border text-center">
              <p className="text-[18px] font-bold text-foreground leading-none">{stat.value}</p>
              <p className="text-[10px] text-muted-foreground font-medium mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Profile Sections */}
        <div className="space-y-2.5">
          {sections.map((section) => (
            <button
              key={section.label}
              className="w-full bg-card rounded-[14px] px-4 py-3.5 shadow-card border border-border card-tap flex items-center gap-3.5 text-left"
            >
              <div className={cn("w-10 h-10 rounded-[10px] flex items-center justify-center flex-shrink-0", section.color)}>
                {section.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-[13px] font-semibold text-foreground leading-tight">{section.label}</p>
                  {section.badge && (
                    <span className={cn(
                      "text-[9px] font-bold px-1.5 py-0.5 rounded-full leading-none",
                      section.badgeColor || "bg-primary/10 text-primary"
                    )}>
                      {section.badge}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-muted-foreground font-medium mt-0.5">{section.desc}</p>
              </div>
              <ChevronRight />
            </button>
          ))}
        </div>

        {/* Sign Out */}
        <button className="w-full mt-6 py-3.5 rounded-[14px] border border-destructive/20 bg-card text-[13px] font-semibold text-destructive transition-all duration-200 btn-press active:bg-destructive/5">
          Sign Out
        </button>
      </div>
    </div>
  )
}
