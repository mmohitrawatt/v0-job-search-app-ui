"use client"

import { useState } from "react"
import { FadeIn } from "./motion"
import { TrendingUp } from "lucide-react"

type FBItem = {
  name: string; rating: number; quote: string; recommend?: string
  role?: string; tag?: string; result?: string
}

/* Feedback — each spotlights a distinct jobengen AI feature + a real result. */
const FALLBACK: FBItem[] = [
  { name: "Aditya B.", role: "Data Analyst", rating: 5, tag: "AI Job Matches", result: "3 interviews / week",
    quote: "The AI actually reads my profile and only surfaces roles I'm a real fit for — no more scrolling through 200 irrelevant listings. It even flags who at the company can refer me in." },
  { name: "Priya S.", role: "Product Manager", rating: 5, tag: "AI Resume Builder", result: "2× callback rate",
    quote: "I paste a JD and the AI rewrites my bullets to match — keywords, metrics, tone, all handled. Seeing my ATS score climb to green before I even apply is genuinely addictive." },
  { name: "Rahul M.", role: "Backend Engineer", rating: 5, tag: "JobEngine · Auto-Apply", result: "1,000+ jobs in a day",
    quote: "JobEngine applied to hundreds of matching roles overnight while I slept. I woke up to interview requests instead of a blank inbox. This alone is worth it." },
  { name: "Sneha R.", role: "UX Designer", rating: 5, tag: "Interview AI · Vibe", result: "Cleared on 1st try",
    quote: "Vibe ran a full mock interview, transcribed my answers, and called out my filler words and weak STAR structure. By the real round I felt like I'd already done it." },
  { name: "Karan D.", role: "Data Scientist", rating: 5, tag: "ThinkPrint", result: "Passed every screen",
    quote: "ThinkPrint shows you exactly how a recruiter reads your profile in 6 seconds. I fixed the three things it flagged and suddenly started clearing resume screens I used to fail." },
  { name: "Fred H.", role: "Senior Software Engineer", rating: 5, tag: "AI Job Matches", result: "3× interview rate",
    quote: "The match scoring is scary accurate. Since switching to jobengen I've tripled my interview rate while sending fewer, better-targeted applications. Quality over spray-and-pray." },
  { name: "Meera N.", role: "Business Analyst", rating: 5, tag: "Salary Intel", result: "+30% on offer",
    quote: "The salary intelligence gave me live data for my exact role, city, and experience. I walked into the negotiation with numbers, not hope — and closed 30% above their first offer." },
  { name: "Chelsea L.", role: "Marketing Lead", rating: 5, tag: "AI Mentors", result: "1:1 that sealed it",
    quote: "The AI matched me with a mentor actually working in my target role. One 30-minute call reframed my whole pitch — I'd been selling myself completely wrong." },
]

// paired gradient avatars
const AVATARS = [
  ["#1d3a8f", "#1d3a8f"], ["#0f766e", "#2dd4bf"], ["#7c3aed", "#c084fc"],
  ["#b45309", "#f59e0b"], ["#0891b2", "#22d3ee"], ["#be185d", "#f472b6"],
]

export function Testimonials() {
  const [paused, setPaused] = useState(false)

  const track = [...FALLBACK, ...FALLBACK]

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden" style={{ background: "#ffffff" }}>

      {/* Big stat headline */}
      <FadeIn className="max-w-[1200px] mx-auto px-5 sm:px-8 text-center mb-14 sm:mb-16 relative z-[1]">
        {/* trust pill */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white mb-7"
          style={{ border: "1.5px solid #e4e9f2", boxShadow: "0 6px 22px rgba(15,23,42,0.06)" }}>
          <span className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <svg key={s} width="13" height="13" viewBox="0 0 14 14"><path d="M7 1L8.5 5H13L9.5 7.5L11 12L7 9.5L3 12L4.5 7.5L1 5H5.5L7 1Z" fill="#fbbf24" /></svg>
            ))}
          </span>
          <span className="text-[12px] font-extrabold" style={{ color: "#0c1a35" }}>4.9 / 5</span>
          <span className="w-px h-3.5" style={{ background: "#e4e9f2" }} />
          <span className="text-[12px] font-medium" style={{ color: "#7b8798" }}>avg. user rating</span>
        </div>

        <div className="font-black tracking-[-0.04em] leading-[0.95]"
          style={{ fontSize: "clamp(34px,5.5vw,60px)", color: "#0c1a35" }}>
          <span style={{
            background: "#1d3a8f",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>10,000+</span> jobseekers
        </div>
        <h2 className="font-light tracking-[-0.03em] leading-[1.05] mt-1.5"
          style={{ fontSize: "clamp(22px,3.6vw,40px)", color: "#0c1a35" }}>
          already moving their careers <span className="font-black">forward</span>
        </h2>
        <p className="text-[15px] sm:text-[16px] max-w-[460px] mx-auto mt-6 leading-relaxed" style={{ color: "#475569" }}>
          Faster interviews, sharper resumes, real referrals — here&rsquo;s what
          people say after their job hunt with jobengen.
        </p>
      </FadeIn>

      {/* Marquee — single row, full width */}
      <div className="relative z-[1]" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <style>{`@keyframes testi-scroll {0%{transform:translateX(0)}100%{transform:translateX(-50%)}}`}</style>

        <div className="flex gap-5 pl-6"
          style={{
            animationName: "testi-scroll",
            animationDuration: `${track.length * 7}s`,
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
            animationPlayState: paused ? "paused" : "running",
            width: "max-content",
          }}>
          {track.map((item, i) => {
            const initial = item.name.charAt(0).toUpperCase()
            const [c1, c2] = AVATARS[i % AVATARS.length]
            return (
              <div key={i} className="w-[280px] sm:w-[312px] shrink-0 group">
                <div className="relative bg-white flex flex-col h-[276px] overflow-hidden transition-all duration-300 group-hover:-translate-y-1.5 group-hover:border-[#1d3a8f]"
                  style={{
                    borderRadius: 20, padding: "22px",
                    border: "1.5px solid #cdd8fb",
                    boxShadow: "0 8px 26px rgba(29,58,143,0.10)",
                  }}>
                  {/* result headline — the hook */}
                  <div className="flex items-center gap-1.5 mb-2.5">
                    <TrendingUp size={17} strokeWidth={2.6} style={{ color: "#1d3a8f" }} />
                    <span className="text-[18px] font-black tracking-[-0.02em]" style={{ color: "#0c1a35" }}>
                      {item.result}
                    </span>
                  </div>

                  {/* stars */}
                  <span className="flex gap-0.5 mb-2.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <svg key={s} width="13" height="13" viewBox="0 0 14 14"><path d="M7 1L8.5 5H13L9.5 7.5L11 12L7 9.5L3 12L4.5 7.5L1 5H5.5L7 1Z" fill={s <= item.rating ? "#fbbf24" : "#e8edf3"} /></svg>
                    ))}
                  </span>

                  {/* Quote */}
                  <p className="text-[13.5px] leading-[1.6] flex-1 overflow-hidden" style={{ color: "#475569" }}>
                    &ldquo;{item.quote}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-2.5 mt-3.5 pt-3.5" style={{ borderTop: "1px solid #f1f4f8" }}>
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-[14px] font-bold text-white shrink-0"
                      style={{ background: `linear-gradient(135deg, ${c1}, ${c2})`, boxShadow: "0 4px 12px rgba(15,23,42,0.12)" }}>
                      {initial}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1">
                        <span className="text-[12.5px] font-extrabold leading-tight truncate" style={{ color: "#0c1a35" }}>{item.name}</span>
                        <svg width="12" height="12" viewBox="0 0 24 24" className="shrink-0" fill="#1d3a8f"><path d="M12 2l2.2 1.6 2.7-.3 1 2.5 2.4 1.3-.6 2.6.9 2.5-2 1.8.1 2.7-2.6.6-1.5 2.3-2.5-.9L12 22l-2.5-1.9-2.5.9-1.5-2.3-2.6-.6.1-2.7-2-1.8.9-2.5-.6-2.6L3.6 5.8l1-2.5 2.7.3L12 2z" /><path d="M9.5 12.5l1.8 1.8 3.5-3.8" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>
                      </div>
                      <div className="text-[11px] font-medium truncate" style={{ color: "#7b8798" }}>
                        {item.role || "jobengen user"} · {item.tag}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

    </section>
  )
}
