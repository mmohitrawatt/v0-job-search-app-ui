"use client"

import { FadeIn, StaggerContainer, StaggerItem } from "./motion"

const STATS = [
  { value: "2,500+", label: "Students Joined", icon: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" },
  { value: "150+", label: "Projects Built", icon: "M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" },
  { value: "10+", label: "Masterclasses Completed", icon: "M12 14l9-5-9-5-9 5 9 5z" },
  { value: "95%", label: "Recommend to Friends", icon: "M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" },
]

export function CommunityStats() {
  return (
    <section id="community" className="py-20 sm:py-28 bg-white">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <FadeIn className="text-center mb-14">
          <h2 className="text-[clamp(26px,3.5vw,40px)] font-extrabold text-slate-900 tracking-[-0.03em] mb-4">
            Trusted by Students Across India
          </h2>
          <p className="text-[16px] text-slate-500 max-w-[440px] mx-auto leading-relaxed">
            A growing community of learners, builders, and future leaders.
          </p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-[900px] mx-auto">
          {STATS.map((stat) => (
            <StaggerItem key={stat.label}>
              <div className="text-center p-6 rounded-2xl bg-[#fafbff] border border-slate-100">
                <div className="w-12 h-12 rounded-xl bg-white border border-slate-200/80 flex items-center justify-center mx-auto mb-4 text-[#1d3a8f]">
                  <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d={stat.icon} />
                  </svg>
                </div>
                <div className="text-[28px] sm:text-[32px] font-extrabold text-slate-900 tracking-[-0.03em] leading-none mb-1.5">
                  {stat.value}
                </div>
                <div className="text-[13px] font-medium text-slate-400">{stat.label}</div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
