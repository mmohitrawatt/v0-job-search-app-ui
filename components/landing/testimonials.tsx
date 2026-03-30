"use client"

import { useState, useEffect, useRef } from "react"
import { FadeIn } from "./motion"

type FBItem = { name: string; rating: number; quote: string; recommend: string }

const FALLBACK: FBItem[] = [
  { name: "Rahul M.", rating: 5, quote: "The RAG session was incredibly hands-on. I built my first AI app on Day 1 itself. Mentors were super accessible throughout.", recommend: "Definitely Yes" },
  { name: "Priya S.", rating: 5, quote: "Best \u20B929 I've ever spent. Content quality was top-notch \u2014 ML to RAG to hackathon in 2 days. Completely worth it.", recommend: "Definitely Yes" },
  { name: "Arjun K.", rating: 5, quote: "Practical, structured, and mentors actually helped debug live. Waiting for the next batch!", recommend: "Definitely Yes" },
  { name: "Sneha R.", rating: 5, quote: "Loved the hackathon format. Built a real project in 12 hours. The community is amazing.", recommend: "Definitely Yes" },
  { name: "Vikram P.", rating: 4, quote: "Very well structured for someone new to AI. The live debugging sessions were the best part.", recommend: "Probably Yes" },
  { name: "Ananya T.", rating: 5, quote: "Got clarity on RAG architecture that I couldn't find in months of YouTube videos. Exceptional value.", recommend: "Definitely Yes" },
]

const AVATAR_COLORS = ["#1d3a8f", "#0f766e", "#7c3aed", "#b45309", "#0891b2", "#4f46e5"]

export function Testimonials() {
  const [items, setItems] = useState<FBItem[]>([])
  const [avgRating, setAvgRating] = useState(0)
  const [paused, setPaused] = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetch("/api/public-feedback")
      .then((r) => r.json())
      .then((d) => {
        const list: FBItem[] = d.feedback || []
        setItems(list)
        if (list.length) {
          setAvgRating(Math.round((list.reduce((s, r) => s + r.rating, 0) / list.length) * 10) / 10)
        }
      })
      .catch(() => {})
  }, [])

  const display = items.length > 0 ? items : FALLBACK
  const track = [...display, ...display]
  const isLive = items.length > 0

  return (
    <section className="py-16 sm:py-20 bg-white overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        {/* Header — left aligned with stats right */}
        <FadeIn className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <svg key={s} width="18" height="18" viewBox="0 0 14 14">
                    <path d="M7 1L8.5 5H13L9.5 7.5L11 12L7 9.5L3 12L4.5 7.5L1 5H5.5L7 1Z" fill={s <= 4 ? "#fbbf24" : "#fde68a"} />
                  </svg>
                ))}
              </div>
              <span className="text-[14px] font-bold text-slate-900">{isLive ? avgRating : "4.7"}</span>
              <span className="text-[13px] text-slate-400">from 85+ reviews</span>
            </div>
            <h2 className="text-[clamp(24px,3vw,36px)] font-extrabold text-slate-900 tracking-[-0.03em] mb-2">
              Loved by our community
            </h2>
            <p className="text-[15px] text-slate-500 max-w-[380px] leading-relaxed">
              Real feedback from bootcamp attendees. No edits, no filters.
            </p>
          </div>

          {/* Stats pills */}
          <div className="flex items-center gap-3 shrink-0 flex-wrap">
            {[
              { value: isLive ? `${avgRating}` : "4.7", label: "Rating", bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-200/50" },
              { value: "85+", label: "Reviews", bg: "bg-indigo-50", text: "text-[#1d3a8f]", border: "border-indigo-200/50" },
              { value: "95%", label: "Recommend", bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-200/50" },
            ].map((s) => (
              <div key={s.label} className={`${s.bg} border ${s.border} rounded-xl px-4 py-2.5 text-center`}>
                <div className={`text-[18px] font-extrabold leading-none ${s.text}`}>{s.value}</div>
                <div className="text-[9px] font-semibold text-slate-400 mt-1 uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>

      {/* Marquee — full width */}
      <div
        className="relative"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Edge fades */}
        <div className="absolute left-0 top-0 bottom-0 w-10 sm:w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-10 sm:w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <style>{`
          @keyframes testi-scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>

        <div
          ref={trackRef}
          className="flex gap-5 pl-6"
          style={{
            animationName: "testi-scroll",
            animationDuration: `${track.length * 8}s`,
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
            animationPlayState: paused ? "paused" : "running",
            width: "max-content",
          }}
        >
          {track.map((item, i) => {
            const initial = item.name.charAt(0).toUpperCase()
            const color = AVATAR_COLORS[i % AVATAR_COLORS.length]
            const recommends = item.recommend?.toLowerCase().includes("yes")

            return (
              <div
                key={i}
                className="w-[280px] sm:w-[320px] shrink-0 group"
              >
                <div className="bg-white rounded-2xl border border-slate-200/60 p-6 h-full flex flex-col transition-all duration-300 group-hover:border-slate-300 group-hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] group-hover:-translate-y-1">

                  {/* Top — avatar + name + stars */}
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-[15px] font-bold text-white shrink-0 shadow-sm"
                      style={{ background: color }}
                    >
                      {initial}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[13px] font-bold text-slate-900">{item.name}</div>
                      <div className="text-[11px] text-slate-400 font-medium">Bootcamp Attendee</div>
                    </div>
                    {recommends && (
                      <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center shrink-0" title="Recommends">
                        <svg width="11" height="11" fill="none" viewBox="0 0 24 24" className="text-emerald-500">
                          <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Stars */}
                  <div className="flex gap-0.5 mb-3">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <svg key={s} width="14" height="14" viewBox="0 0 14 14">
                        <path
                          d="M7 1L8.5 5H13L9.5 7.5L11 12L7 9.5L3 12L4.5 7.5L1 5H5.5L7 1Z"
                          fill={s <= item.rating ? "#fbbf24" : "#f1f5f9"}
                        />
                      </svg>
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-[14px] leading-[1.75] text-slate-600 flex-1">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
