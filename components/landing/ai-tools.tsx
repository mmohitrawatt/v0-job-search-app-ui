"use client"

import Link from "next/link"
import { FadeIn, StaggerContainer, StaggerItem, motion } from "./motion"

const TOOLS = [
  {
    title: "AI Resume Builder",
    desc: "Paste any job description and get a fully tailored, ATS-optimized resume in seconds. No templates — just smart AI that knows what recruiters want.",
    color: "#1d3a8f",
    gradient: "from-[#1d3a8f] to-[#3b5bdb]",
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
      </svg>
    ),
    features: [
      { text: "ATS score optimization", icon: "M9 12l2 2 4-4" },
      { text: "One-click from JD to resume", icon: "M13 2L3 14h9l-1 8 10-12h-9l1-8z" },
      { text: "Multiple formats (PDF, DOCX)", icon: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" },
    ],
    stat: { value: "92%", label: "Avg ATS Score" },
  },
  {
    title: "AI Mock Interview",
    desc: "Practice with an AI interviewer that adapts to your role. Get real-time feedback on answers, communication, and confidence — before the real thing.",
    color: "#0f766e",
    gradient: "from-[#0f766e] to-[#14b8a6]",
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    features: [
      { text: "Role-specific questions", icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5" },
      { text: "Real-time AI feedback", icon: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" },
      { text: "Confidence & tone analysis", icon: "M12 8v4l3 3" },
    ],
    stat: { value: "5x", label: "Better Prepared" },
  },
  {
    title: "AI Career Copilot",
    desc: "Your personal AI career advisor. Get skill-gap analysis, personalized learning roadmaps, and smart opportunity matching — all in one chat.",
    color: "#7c3aed",
    gradient: "from-[#7c3aed] to-[#a78bfa]",
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    features: [
      { text: "Skill-gap analysis", icon: "M9 19v-6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6M15 19v-6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v6" },
      { text: "Personalized career roadmap", icon: "M22 11.08V12a10 10 0 1 1-5.93-9.14" },
      { text: "Smart opportunity matching", icon: "M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z" },
    ],
    stat: { value: "24/7", label: "Always Available" },
  },
]

export function AITools() {
  return (
    <section id="ai-tools" className="py-16 sm:py-20 bg-white relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        {/* Header */}
        <FadeIn className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <span className="inline-flex items-center gap-2 bg-indigo-50 text-[#1d3a8f] text-[12px] font-bold px-4 py-1.5 rounded-full mb-5 tracking-wide uppercase border border-indigo-200/40">
              <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              AI-Powered Tools
            </span>
            <h2 className="text-[clamp(26px,3.5vw,40px)] font-extrabold text-slate-900 tracking-[-0.03em] mb-3">
              Your AI career toolkit
            </h2>
            <p className="text-[16px] text-slate-500 max-w-[420px] leading-relaxed">
              Three powerful tools that work together to get you hired faster.
            </p>
          </div>
          <span className="text-[13px] font-semibold text-slate-400 flex items-center gap-1.5 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            Launching soon
          </span>
        </FadeIn>

        {/* Cards */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TOOLS.map((tool) => (
            <StaggerItem key={tool.title}>
              <motion.div
                className="group relative bg-white rounded-2xl border border-slate-200/60 overflow-hidden cursor-default transition-all duration-300 hover:border-slate-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] h-full flex flex-col"
                whileHover={{ y: -4 }}
              >
                {/* Top colored accent */}
                <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${tool.color}, ${tool.color}66)` }} />

                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(circle at top left, ${tool.color}08, transparent 60%)` }}
                />

                <div className="relative p-6 flex flex-col flex-1">
                  {/* Header row */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${tool.gradient} text-white flex items-center justify-center shadow-sm`}>
                      {tool.icon}
                    </div>
                    {/* Stat badge */}
                    <div className="text-right">
                      <div className="text-[16px] font-extrabold leading-none" style={{ color: tool.color }}>{tool.stat.value}</div>
                      <div className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider mt-0.5">{tool.stat.label}</div>
                    </div>
                  </div>

                  {/* Title + desc */}
                  <h3 className="text-[17px] font-extrabold text-slate-900 mb-2 tracking-[-0.01em]">{tool.title}</h3>
                  <p className="text-[13px] text-slate-500 leading-[1.7] mb-5">{tool.desc}</p>

                  {/* Features */}
                  <div className="space-y-2.5 mb-5 mt-auto">
                    {tool.features.map((f) => (
                      <div key={f.text} className="flex items-center gap-2.5">
                        <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${tool.color}0a` }}>
                          <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke={tool.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d={f.icon} />
                          </svg>
                        </div>
                        <span className="text-[12px] font-medium text-slate-600">{f.text}</span>
                      </div>
                    ))}
                  </div>

                  {/* Coming soon badge */}
                  <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                    <span
                      className="text-[10px] font-bold px-2.5 py-1 rounded-md border"
                      style={{ color: tool.color, background: `${tool.color}08`, borderColor: `${tool.color}18` }}
                    >
                      Coming Soon
                    </span>
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
