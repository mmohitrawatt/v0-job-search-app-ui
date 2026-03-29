"use client"

import { FadeIn, StaggerContainer, StaggerItem } from "./motion"

const STEPS = [
  {
    n: "01",
    title: "Explore Opportunities",
    desc: "Browse curated jobs from top companies and startups — matched to your profile.",
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
      </svg>
    ),
  },
  {
    n: "02",
    title: "Build Skills with Bootcamps",
    desc: "Join hands-on masterclasses and learn from industry mentors in live sessions.",
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
  },
  {
    n: "03",
    title: "Get Job-Ready with AI Tools",
    desc: "Polish your resume, ace mock interviews, and land your dream role with AI assistance.",
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="M22 4L12 14.01l-3-3" />
      </svg>
    ),
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 sm:py-28 bg-white">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <FadeIn className="text-center mb-14">
          <span className="inline-flex items-center gap-2 bg-slate-100 text-slate-600 text-[12px] font-bold px-4 py-1.5 rounded-full mb-5 tracking-wide uppercase">
            How It Works
          </span>
          <h2 className="text-[clamp(26px,3.5vw,40px)] font-extrabold text-slate-900 tracking-[-0.03em] mb-4">
            Three steps to your dream career
          </h2>
          <p className="text-[16px] text-slate-500 max-w-[460px] mx-auto leading-relaxed">
            A simple, powerful path from exploration to employment.
          </p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[960px] mx-auto">
          {STEPS.map((step, i) => (
            <StaggerItem key={step.n}>
              <div className="relative text-center">
                {/* Connector line */}
                {i < STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-[calc(50%+40px)] right-[calc(-50%+40px)] h-[2px] bg-gradient-to-r from-slate-200 to-slate-100" />
                )}

                <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-[#fafbff] border border-slate-200/80 mb-5 mx-auto text-[#1d3a8f]">
                  {step.icon}
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-br from-[#1d3a8f] to-[#3b5bdb] text-white text-[10px] font-extrabold flex items-center justify-center shadow-sm">
                    {step.n}
                  </span>
                </div>

                <h3 className="text-[17px] font-bold text-slate-900 mb-2 tracking-[-0.01em]">{step.title}</h3>
                <p className="text-[14px] text-slate-500 leading-[1.65] max-w-[260px] mx-auto">{step.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
