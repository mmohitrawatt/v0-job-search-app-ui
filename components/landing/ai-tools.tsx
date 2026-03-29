"use client"

import { FadeIn, StaggerContainer, StaggerItem, motion } from "./motion"

const TOOLS = [
  {
    title: "AI Resume Builder",
    desc: "Generate ATS-optimized resumes in seconds. Paste a job description — get a tailored resume instantly.",
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
      </svg>
    ),
    gradient: "from-[#1d3a8f] to-[#3b5bdb]",
    bgGlow: "rgba(29,58,143,0.06)",
  },
  {
    title: "AI Mock Interview",
    desc: "Practice interviews with AI and get real-time feedback on answers, tone, and confidence.",
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    gradient: "from-[#0f766e] to-[#14b8a6]",
    bgGlow: "rgba(15,118,110,0.06)",
  },
  {
    title: "AI Career Copilot",
    desc: "Get personalized career guidance powered by AI — skill gaps, roadmaps, and opportunity matching.",
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4M12 8h.01" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      </svg>
    ),
    gradient: "from-[#7c3aed] to-[#a78bfa]",
    bgGlow: "rgba(124,58,237,0.06)",
  },
]

export function AITools() {
  return (
    <section id="ai-tools" className="py-20 sm:py-28 bg-white">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <FadeIn className="text-center mb-14">
          <span className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 text-[12px] font-bold px-4 py-1.5 rounded-full mb-5 tracking-wide uppercase">
            AI-Powered
          </span>
          <h2 className="text-[clamp(26px,3.5vw,40px)] font-extrabold text-slate-900 tracking-[-0.03em] mb-4">
            Powerful AI Tools for Your Career
          </h2>
          <p className="text-[16px] text-slate-500 max-w-[480px] mx-auto leading-relaxed">
            Everything you need to land your dream role — powered by intelligent AI.
          </p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TOOLS.map((tool) => (
            <StaggerItem key={tool.title}>
              <motion.div
                className="group relative bg-white rounded-2xl border border-slate-200/80 p-7 cursor-default transition-all duration-300 hover:border-slate-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)]"
                whileHover={{ y: -4 }}
              >
                {/* Glow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(circle at top left, ${tool.bgGlow}, transparent 60%)` }}
                />

                <div className="relative">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.gradient} text-white flex items-center justify-center mb-5 shadow-sm`}>
                    {tool.icon}
                  </div>
                  <h3 className="text-[18px] font-bold text-slate-900 mb-2.5 tracking-[-0.01em]">{tool.title}</h3>
                  <p className="text-[14px] text-slate-500 leading-[1.7]">{tool.desc}</p>

                  <div className="mt-5 flex items-center gap-1.5 text-[13px] font-semibold text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Learn more
                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
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
