"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { useApp } from "@/lib/app-context"
import { MOCK_SALARY_DATA } from "@/lib/mock-data"

const LOCATION_DATA: Record<string, Record<string, { min: number; median: number; max: number }>> = {
  "ML Engineer": {
    "Bengaluru": { min: 25, median: 42, max: 70 },
    "Mumbai": { min: 22, median: 38, max: 60 },
    "Remote": { min: 20, median: 36, max: 65 },
    "Delhi NCR": { min: 20, median: 35, max: 58 },
  },
  "Data Scientist": {
    "Bengaluru": { min: 20, median: 35, max: 58 },
    "Mumbai": { min: 18, median: 30, max: 50 },
    "Remote": { min: 18, median: 32, max: 55 },
    "Delhi NCR": { min: 17, median: 28, max: 48 },
  },
  "SDE II": {
    "Bengaluru": { min: 28, median: 45, max: 80 },
    "Mumbai": { min: 25, median: 40, max: 70 },
    "Remote": { min: 22, median: 38, max: 72 },
    "Delhi NCR": { min: 22, median: 38, max: 68 },
  },
  "SDE III": {
    "Bengaluru": { min: 45, median: 70, max: 120 },
    "Mumbai": { min: 40, median: 62, max: 105 },
    "Remote": { min: 38, median: 65, max: 115 },
    "Delhi NCR": { min: 38, median: 60, max: 100 },
  },
  "AI/ML Lead": {
    "Bengaluru": { min: 55, median: 90, max: 150 },
    "Mumbai": { min: 50, median: 82, max: 135 },
    "Remote": { min: 48, median: 85, max: 145 },
    "Delhi NCR": { min: 45, median: 78, max: 128 },
  },
  "Backend Engineer": {
    "Bengaluru": { min: 22, median: 38, max: 65 },
    "Mumbai": { min: 20, median: 34, max: 55 },
    "Remote": { min: 18, median: 32, max: 60 },
    "Delhi NCR": { min: 18, median: 30, max: 52 },
  },
}

const COMPANY_DATA: Record<string, { company: string; median: number; color: string }[]> = {
  "ML Engineer": [
    { company: "Zepto", median: 45, color: "bg-violet-500" },
    { company: "CRED", median: 42, color: "bg-zinc-700" },
    { company: "Razorpay", median: 38, color: "bg-blue-500" },
    { company: "Flipkart", median: 36, color: "bg-yellow-500" },
    { company: "Dream11", median: 28, color: "bg-red-500" },
  ],
  "Data Scientist": [
    { company: "CRED", median: 38, color: "bg-zinc-700" },
    { company: "PhonePe", median: 35, color: "bg-indigo-500" },
    { company: "Flipkart", median: 32, color: "bg-yellow-500" },
    { company: "Razorpay", median: 30, color: "bg-blue-500" },
    { company: "Dream11", median: 25, color: "bg-red-500" },
  ],
  "SDE II": [
    { company: "Razorpay", median: 48, color: "bg-blue-500" },
    { company: "CRED", median: 45, color: "bg-zinc-700" },
    { company: "PhonePe", median: 44, color: "bg-indigo-500" },
    { company: "Zepto", median: 40, color: "bg-violet-500" },
    { company: "Flipkart", median: 38, color: "bg-yellow-500" },
  ],
  "SDE III": [
    { company: "CRED", median: 75, color: "bg-zinc-700" },
    { company: "Razorpay", median: 72, color: "bg-blue-500" },
    { company: "PhonePe", median: 68, color: "bg-indigo-500" },
    { company: "Flipkart", median: 62, color: "bg-yellow-500" },
    { company: "Zepto", median: 60, color: "bg-violet-500" },
  ],
  "AI/ML Lead": [
    { company: "CRED", median: 100, color: "bg-zinc-700" },
    { company: "Zepto", median: 95, color: "bg-violet-500" },
    { company: "Razorpay", median: 88, color: "bg-blue-500" },
    { company: "PhonePe", median: 85, color: "bg-indigo-500" },
    { company: "Flipkart", median: 80, color: "bg-yellow-500" },
  ],
  "Backend Engineer": [
    { company: "Razorpay", median: 42, color: "bg-blue-500" },
    { company: "PhonePe", median: 38, color: "bg-indigo-500" },
    { company: "CRED", median: 36, color: "bg-zinc-700" },
    { company: "Zepto", median: 34, color: "bg-violet-500" },
    { company: "Dream11", median: 28, color: "bg-red-500" },
  ],
}

const LOCATIONS = ["Bengaluru", "Mumbai", "Remote", "Delhi NCR"]

export function SalaryIntelScreen() {
  const { goBack, salaryRole } = useApp()
  const [selectedRole, setSelectedRole] = useState(salaryRole ?? MOCK_SALARY_DATA[0].role)
  const [selectedLocation, setSelectedLocation] = useState("Bengaluru")

  const roleData = MOCK_SALARY_DATA.find((d) => d.role === selectedRole)!
  const locationData = (LOCATION_DATA[selectedRole] ?? {})[selectedLocation] ?? { min: roleData.min, median: roleData.median, max: roleData.max }
  const companyData = COMPANY_DATA[selectedRole] ?? []
  const maxMedian = Math.max(...companyData.map((c) => c.median))

  const trendColor = roleData.trend === "up" ? "text-emerald-600" : roleData.trend === "down" ? "text-red-500" : "text-amber-600"
  const trendIcon = roleData.trend === "up" ? "↑" : roleData.trend === "down" ? "↓" : "→"
  const trendLabel = roleData.trend === "up" ? "+18% YoY" : roleData.trend === "down" ? "-5% YoY" : "Stable"

  return (
    <div className="flex-1 flex flex-col bg-background min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 lg:px-8 pt-14 lg:pt-6 pb-4 bg-card border-b border-border">
        <button onClick={goBack} className="w-8 h-8 rounded-full bg-muted flex items-center justify-center tap-highlight-none btn-press">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <div>
          <p className="text-[15px] font-bold text-foreground">Salary Intelligence</p>
          <p className="text-[10px] text-muted-foreground font-medium">Based on {roleData.companies}+ real offers</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 lg:px-8 py-5">

        {/* Role selector */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
          {MOCK_SALARY_DATA.map((d) => (
            <button
              key={d.role}
              onClick={() => setSelectedRole(d.role)}
              className={cn(
                "px-3 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap transition-all tap-highlight-none flex-shrink-0",
                selectedRole === d.role
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {d.role}
            </button>
          ))}
        </div>

        {/* Main salary card */}
        <div className="bg-card rounded-[16px] p-5 shadow-card border border-border mb-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-[13px] font-bold text-foreground">{selectedRole}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">{selectedLocation} · {roleData.companies} offers</p>
            </div>
            <span className={cn("text-[11px] font-bold px-2 py-1 rounded-full", trendColor, "bg-current/10")}>
              {trendIcon} {trendLabel}
            </span>
          </div>

          {/* Min / Median / Max */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            {[
              { label: "Min", value: locationData.min, color: "text-muted-foreground" },
              { label: "Median", value: locationData.median, color: "text-primary" },
              { label: "Max", value: locationData.max, color: "text-emerald-600" },
            ].map((stat) => (
              <div key={stat.label} className="bg-muted rounded-[12px] p-3 text-center">
                <p className={cn("text-[20px] font-extrabold leading-none mb-1", stat.color)}>₹{stat.value}</p>
                <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-wide">LPA · {stat.label}</p>
              </div>
            ))}
          </div>

          {/* Salary range bar */}
          <div className="relative h-3 bg-muted rounded-full overflow-hidden">
            <div
              className="absolute h-full bg-gradient-to-r from-muted-foreground/30 via-primary to-emerald-500 rounded-full"
              style={{
                left: `${(locationData.min / (locationData.max * 1.1)) * 100}%`,
                width: `${((locationData.max - locationData.min) / (locationData.max * 1.1)) * 100}%`,
              }}
            />
            {/* Median marker */}
            <div
              className="absolute top-0 w-0.5 h-full bg-white"
              style={{ left: `${(locationData.median / (locationData.max * 1.1)) * 100}%` }}
            />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-[9px] text-muted-foreground">₹{locationData.min}L</span>
            <span className="text-[9px] text-primary font-bold">₹{locationData.median}L median</span>
            <span className="text-[9px] text-muted-foreground">₹{locationData.max}L</span>
          </div>
        </div>

        {/* Location + Company — side by side on desktop */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-4">

        {/* Location comparison */}
        <div className="bg-card rounded-[14px] p-4 shadow-card border border-border mb-4">
          <p className="text-[12px] font-bold text-foreground mb-3">By Location</p>
          <div className="flex gap-1.5 mb-3 flex-wrap">
            {LOCATIONS.map((loc) => (
              <button
                key={loc}
                onClick={() => setSelectedLocation(loc)}
                className={cn(
                  "px-2.5 py-1 rounded-full text-[10px] font-bold transition-all tap-highlight-none",
                  selectedLocation === loc
                    ? "bg-foreground text-background"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {loc}
              </button>
            ))}
          </div>
          <div className="space-y-2">
            {LOCATIONS.map((loc) => {
              const locData = (LOCATION_DATA[selectedRole] ?? {})[loc]
              if (!locData) return null
              const isSelected = loc === selectedLocation
              return (
                <button
                  key={loc}
                  onClick={() => setSelectedLocation(loc)}
                  className={cn("w-full flex items-center gap-3 rounded-[10px] p-2.5 text-left transition-all", isSelected ? "bg-accent" : "")}
                >
                  <span className="text-[11px] font-semibold text-muted-foreground w-20 flex-shrink-0">{loc}</span>
                  <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className={cn("h-full rounded-full transition-all duration-500", isSelected ? "bg-primary" : "bg-muted-foreground/40")}
                      style={{ width: `${(locData.median / 110) * 100}%` }}
                    />
                  </div>
                  <span className={cn("text-[11px] font-bold flex-shrink-0", isSelected ? "text-primary" : "text-foreground")}>
                    ₹{locData.median}L
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Company comparison */}
        <div className="bg-card rounded-[14px] p-4 shadow-card border border-border mb-4">
          <p className="text-[12px] font-bold text-foreground mb-3">Top Paying Companies</p>
          <div className="space-y-2.5">
            {companyData.map((c, i) => (
              <div key={c.company} className="flex items-center gap-3">
                <span className="text-[10px] font-bold text-muted-foreground w-4 flex-shrink-0">{i + 1}</span>
                <span className="text-[11px] font-semibold text-foreground w-20 flex-shrink-0">{c.company}</span>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={cn("h-full rounded-full transition-all duration-700", c.color)}
                    style={{ width: `${(c.median / maxMedian) * 100}%` }}
                  />
                </div>
                <span className="text-[10.5px] font-bold text-foreground flex-shrink-0">₹{c.median}L</span>
              </div>
            ))}
          </div>
        </div>
        </div> {/* end lg:grid-cols-2 */}

        {/* Disclaimer */}
        <div className="bg-muted rounded-[10px] px-3 py-2.5 flex items-center gap-2">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-muted-foreground flex-shrink-0"><circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2"/><path d="M6 5V8.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/><circle cx="6" cy="3.75" r="0.5" fill="currentColor"/></svg>
          <p className="text-[10px] text-muted-foreground">
            Based on {roleData.companies} anonymised offers shared on community platforms. Data updated monthly.
          </p>
        </div>
      </div>
    </div>
  )
}
