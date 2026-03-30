"use client"

import { FadeIn, StaggerContainer, StaggerItem, motion } from "./motion"

const STEPS = [
  {
    n: "01",
    title: "Explore Opportunities",
    desc: "Browse curated jobs from top companies and startups — matched to your skills and goals.",
    color: "#1d3a8f",
    gradient: "from-[#1d3a8f] to-[#3b5bdb]",
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
      </svg>
    ),
    features: ["Smart job matching", "Top companies", "Filtered by skills"],
  },
  {
    n: "02",
    title: "Upskill with Bootcamps",
    desc: "Join hands-on masterclasses with industry mentors. Build real projects, not just theory.",
    color: "#7c3aed",
    gradient: "from-[#7c3aed] to-[#a78bfa]",
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
    features: ["Live sessions", "Expert mentors", "Real projects"],
  },
  {
    n: "03",
    title: "Get Job-Ready with AI",
    desc: "AI-powered resume builder, mock interviews, and career copilot to land your dream role.",
    color: "#047857",
    gradient: "from-[#047857] to-[#10b981]",
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="M22 4L12 14.01l-3-3" />
      </svg>
    ),
    features: ["ATS-ready resume", "Mock interviews", "Career guidance"],
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 sm:py-20 bg-[#fafbff] relative overflow-hidden">
      {/* Subtle bg pattern */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(29,58,143,0.03) 1px, transparent 0)", backgroundSize: "40px 40px" }} />

      <div className="relative max-w-[1200px] mx-auto px-5 sm:px-8">
        {/* Header */}
        <FadeIn className="text-center mb-14">
          <span className="inline-flex items-center gap-2 bg-white text-slate-600 text-[12px] font-bold px-4 py-1.5 rounded-full mb-5 tracking-wide uppercase border border-slate-200/60 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1d3a8f]">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
            How It Works
          </span>
          <h2 className="text-[clamp(26px,3.5vw,40px)] font-extrabold text-slate-900 tracking-[-0.03em] mb-3">
            From zero to job-ready
          </h2>
          <p className="text-[16px] text-slate-500 max-w-[440px] mx-auto leading-relaxed">
            Three simple steps. One powerful platform.
          </p>
        </FadeIn>

        {/* Steps */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1000px] mx-auto relative">
          {/* Connector line — desktop */}
          <div className="hidden md:block absolute top-[52px] left-[calc(16.67%+24px)] right-[calc(16.67%+24px)] h-[2px] z-0">
            <div className="w-full h-full bg-gradient-to-r from-[#1d3a8f]/20 via-[#7c3aed]/20 to-[#047857]/20 rounded-full" />
            {/* Animated dot */}
            <div className="absolute top-[-3px] w-2 h-2 rounded-full bg-[#1d3a8f] shadow-[0_0_8px_rgba(29,58,143,0.4)]" style={{ animation: "hiw-dot 4s ease-in-out infinite", left: 0 }} />
            <style>{`@keyframes hiw-dot{0%,100%{left:0;opacity:.6}50%{left:calc(100% - 8px);opacity:1}}`}</style>
          </div>

          {STEPS.map((step, i) => (
            <StaggerItem key={step.n}>
              <motion.div
                className="relative group"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25 }}
              >
                <div className="bg-white rounded-2xl border border-slate-200/60 p-6 shadow-[0_1px_4px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] hover:border-slate-300 transition-all duration-300 h-full flex flex-col">
                  {/* Step number + icon */}
                  <div className="flex items-center gap-4 mb-5">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shrink-0 shadow-sm`}>
                      {step.icon}
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-widest" style={{ color: step.color }}>Step {step.n}</div>
                      <h3 className="text-[16px] font-extrabold text-slate-900 tracking-[-0.01em] leading-tight">{step.title}</h3>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-[13px] text-slate-500 leading-[1.7] mb-5">{step.desc}</p>

                  {/* Feature chips */}
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {step.features.map((f) => (
                      <span
                        key={f}
                        className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-md border"
                        style={{
                          color: step.color,
                          background: `${step.color}08`,
                          borderColor: `${step.color}15`,
                        }}
                      >
                        <svg width="8" height="8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                        {f}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom accent line on hover */}
                <div
                  className="absolute bottom-0 left-4 right-4 h-[3px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, ${step.color}, transparent)` }}
                />
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
