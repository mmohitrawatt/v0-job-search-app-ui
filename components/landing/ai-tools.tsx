"use client"

import { FadeIn, StaggerContainer, StaggerItem } from "./motion"

const TOOLS = [
  {
    title: "AI Resume Builder",
    subtitle: "JD paste karo, tailored resume pao",
    desc: "Paste any job description and get an ATS-optimized, role-specific resume in seconds. No templates — just AI that knows what recruiters actually want.",
    color: "#1d3a8f",
    bg: "#eef2ff",
    iconBg: "linear-gradient(135deg, #1d3a8f, #3b5bdb)",
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
      </svg>
    ),
    features: ["ATS score optimization", "Tailored from job description", "Keyword gap analysis"],
    stat: "92%",
    statLabel: "avg ATS score",
  },
  {
    title: "AI Mock Interview",
    subtitle: "Real interview jaisa practice",
    desc: "Practice with an AI interviewer that adapts to your role and experience level. Get instant feedback on answers, communication, and confidence.",
    color: "#0f766e",
    bg: "#ecfdf5",
    iconBg: "linear-gradient(135deg, #0f766e, #14b8a6)",
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    features: ["Role-specific questions", "Real-time AI feedback", "Tone & confidence analysis"],
    stat: "5x",
    statLabel: "better prepared",
  },
  {
    title: "AI Career Copilot",
    subtitle: "Tera personal career advisor",
    desc: "Ask anything about your career. Get skill-gap analysis, learning roadmaps, and smart job matches — like having a senior mentor available 24/7.",
    color: "#7c3aed",
    bg: "#f5f3ff",
    iconBg: "linear-gradient(135deg, #7c3aed, #a78bfa)",
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    features: ["Skill gap analysis", "Personalized roadmap", "Smart job matching"],
    stat: "24/7",
    statLabel: "always available",
  },
]

export function AITools() {
  return (
    <section id="ai-tools" className="py-20 sm:py-28 bg-white">
      <div className="max-w-[1100px] mx-auto px-5 sm:px-8">

        {/* Header */}
        <FadeIn className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#eef2ff] border border-[#c7d2fe] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1d3a8f] animate-pulse" />
            <span className="text-[11px] font-bold text-[#1d3a8f] uppercase tracking-[0.08em]">AI Tools — Coming Soon</span>
          </div>
          <h2 className="text-[clamp(26px,3.5vw,40px)] font-black text-slate-900 tracking-[-0.03em] leading-[1.15] mb-3">
            Your AI-powered career toolkit
          </h2>
          <p className="text-[15px] text-slate-500 max-w-[440px] mx-auto leading-relaxed">
            Resume, interviews, career guidance — all in one place, powered by AI built for Indian job market.
          </p>
        </FadeIn>

        {/* Tool Cards */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TOOLS.map((tool) => (
            <StaggerItem key={tool.title}>
            <div
              className="bg-white rounded-2xl border border-slate-200/70 overflow-hidden hover:shadow-[0_12px_40px_rgba(0,0,0,0.09)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full"
            >
              {/* Colored top bar */}
              <div className="h-1" style={{ background: tool.iconBg }} />

              <div className="p-6 flex flex-col gap-4 flex-1">
                {/* Icon + stat */}
                <div className="flex items-start justify-between">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shadow-sm"
                    style={{ background: tool.iconBg }}
                  >
                    {tool.icon}
                  </div>
                  <div className="text-right">
                    <div className="text-[18px] font-black leading-none" style={{ color: tool.color }}>{tool.stat}</div>
                    <div className="text-[10px] font-semibold text-slate-400 mt-0.5">{tool.statLabel}</div>
                  </div>
                </div>

                {/* Title */}
                <div>
                  <h3 className="text-[16px] font-extrabold text-slate-900 tracking-[-0.02em] leading-snug mb-1">{tool.title}</h3>
                  <p className="text-[11px] font-semibold" style={{ color: tool.color }}>{tool.subtitle}</p>
                </div>

                {/* Desc */}
                <p className="text-[13px] text-slate-500 leading-[1.7]">{tool.desc}</p>

                {/* Feature list */}
                <ul className="space-y-2 mt-auto">
                  {tool.features.map(f => (
                    <li key={f} className="flex items-center gap-2.5">
                      <span
                        className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: tool.bg }}
                      >
                        <svg width="9" height="9" fill="none" viewBox="0 0 24 24" stroke={tool.color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      </span>
                      <span className="text-[12px] font-medium text-slate-600">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

      </div>
    </section>
  )
}
