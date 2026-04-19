"use client"

const STEPS = [
  {
    n: "01",
    title: "Create Your Profile",
    desc: "Sign up, add your skills and career goals. Jobingen builds your personalized job-readiness score instantly.",
    color: "#1d3a8f",
    bg: "#eef2ff",
    tags: ["Resume Builder", "Skills Assessment", "Career Goals"],
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    n: "02",
    title: "Get Matched to Jobs",
    desc: "AI scans thousands of roles from KPMG, Dell, PhonePe, Zepto & more — surfaces only what fits you.",
    color: "#7c3aed",
    bg: "#f5f3ff",
    tags: ["AI Job Match", "Top Companies", "Real-time Listings"],
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
      </svg>
    ),
  },
  {
    n: "03",
    title: "Upskill with Mentors",
    desc: "1:1 mentoring from industry professionals, live bootcamps, and mock interviews — close the gap between college and industry.",
    color: "#047857",
    bg: "#ecfdf5",
    tags: ["1:1 Mentoring", "Live Bootcamps", "Mock Interviews"],
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    n: "04",
    title: "Apply & Get Hired",
    desc: "AI-tailored resume, one-click smart apply, and real-time application tracking — from first click to offer letter.",
    color: "#b45309",
    bg: "#fffbeb",
    tags: ["Smart Apply", "Resume Tailor", "Application Tracker"],
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="M22 4 12 14.01l-3-3" />
      </svg>
    ),
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 sm:py-28 bg-[#fafbff]">
      <div className="max-w-[1100px] mx-auto px-5 sm:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-[12px] font-bold text-[#1d3a8f] uppercase tracking-[0.12em] mb-3">How It Works</p>
          <h2 className="text-[clamp(26px,3.5vw,40px)] font-black text-slate-900 tracking-[-0.03em] leading-[1.15] mb-3">
            From student to hired —<br className="hidden sm:block" /> 4 simple steps
          </h2>
          <p className="text-[15px] text-slate-500 max-w-[400px] mx-auto leading-relaxed">
            Everything you need to go from "no idea where to start" to offer letter.
          </p>
        </div>

        {/* Steps — desktop: 4 col, mobile: vertical list */}
        <div className="hidden md:grid md:grid-cols-4 gap-0 relative mb-2">
          {/* Connector line */}
          <div className="absolute top-[28px] left-[12.5%] right-[12.5%] h-[2px] bg-gradient-to-r from-[#1d3a8f22] via-[#7c3aed22] via-[#04785722] to-[#b4530922] z-0 pointer-events-none" />

          {STEPS.map((step, i) => (
            <div key={step.n} className="flex flex-col items-center text-center px-4 relative z-10">
              {/* Circle icon */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 shadow-sm"
                style={{ background: step.bg, color: step.color, border: `1.5px solid ${step.color}20` }}
              >
                {step.icon}
              </div>

              {/* Step label */}
              <span className="text-[10px] font-black uppercase tracking-[0.1em] mb-1.5" style={{ color: `${step.color}88` }}>
                Step {step.n}
              </span>

              <h3 className="text-[14px] font-extrabold text-slate-900 tracking-[-0.02em] mb-2 leading-snug">
                {step.title}
              </h3>

              <p className="text-[12px] text-slate-500 leading-[1.7] mb-3">
                {step.desc}
              </p>

              <div className="flex flex-wrap justify-center gap-1">
                {step.tags.map(t => (
                  <span
                    key={t}
                    className="text-[9px] font-semibold px-2 py-0.5 rounded-full border"
                    style={{ color: step.color, background: step.bg, borderColor: `${step.color}20` }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: vertical numbered list */}
        <div className="md:hidden flex flex-col gap-0">
          {STEPS.map((step, i) => (
            <div key={step.n} className="flex gap-4 relative">
              {/* Left: number + vertical line */}
              <div className="flex flex-col items-center">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-[13px] font-black shadow-sm"
                  style={{ background: step.bg, color: step.color, border: `1.5px solid ${step.color}25` }}
                >
                  {step.n}
                </div>
                {i < STEPS.length - 1 && (
                  <div className="w-[2px] flex-1 my-2 rounded-full" style={{ background: `${step.color}18`, minHeight: 32 }} />
                )}
              </div>

              {/* Right: content */}
              <div className="pb-7 flex-1 min-w-0">
                <h3 className="text-[15px] font-extrabold text-slate-900 tracking-[-0.02em] mb-1 leading-snug">
                  {step.title}
                </h3>
                <p className="text-[13px] text-slate-500 leading-[1.7] mb-2.5">
                  {step.desc}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {step.tags.map(t => (
                    <span
                      key={t}
                      className="text-[10px] font-semibold px-2.5 py-1 rounded-full border"
                      style={{ color: step.color, background: step.bg, borderColor: `${step.color}20` }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
