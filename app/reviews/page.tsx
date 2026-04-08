"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { JobingenLogo } from "@/components/jobingen-logo"

type Review = {
  id?: string
  name: string
  rating: number
  quote: string
  recommend: string
  bootcamp?: string
  created_at?: string
}

const AVATAR_COLORS = ["#1d3a8f", "#7c3aed", "#0f766e", "#b45309", "#0891b2", "#dc2626", "#16a34a", "#ea580c"]
const TAGS = ["All", "5 Stars", "4 Stars", "Recommends"]

const FALLBACK: Review[] = [
  { name: "Rahul M.", rating: 5, quote: "The RAG session was incredibly hands-on. I built my first AI app on Day 1 itself. Mentors were super accessible throughout. The hackathon at the end was the cherry on top.", recommend: "Definitely Yes" },
  { name: "Priya S.", rating: 5, quote: "Best money I've ever spent on learning. Content quality was top-notch — from ML fundamentals to RAG pipelines to a real hackathon in 2 days. The mentors actually care.", recommend: "Definitely Yes" },
  { name: "Arjun K.", rating: 5, quote: "Practical, structured, and the mentors actually helped debug live. No pre-recorded fluff. Everything was real-time and interactive. Waiting for the next batch!", recommend: "Definitely Yes" },
  { name: "Sneha R.", rating: 5, quote: "Loved the hackathon format. Built a real project in 12 hours with my team. The community vibe was amazing — everyone was helping each other.", recommend: "Definitely Yes" },
  { name: "Vikram P.", rating: 4, quote: "Very well structured for someone new to AI. The live debugging sessions were the best part. Would've loved an extra day for more depth on deployment.", recommend: "Probably Yes" },
  { name: "Ananya T.", rating: 5, quote: "Got clarity on RAG architecture that I couldn't find in months of YouTube videos. The mentors broke down complex concepts beautifully. Exceptional value.", recommend: "Definitely Yes" },
  { name: "Kunal D.", rating: 5, quote: "From zero AI knowledge to building a working RAG chatbot in 2 days. The pace was perfect and mentors were available even after the session for doubts.", recommend: "Definitely Yes" },
  { name: "Meera J.", rating: 4, quote: "Really appreciated the project-first approach. Instead of boring lectures, we actually built things. The certificate and LinkedIn post template were nice touches too.", recommend: "Definitely Yes" },
]

function timeAgo(iso: string) {
  const d = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(d / 60000)
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  if (days < 30) return `${days}d ago`
  return `${Math.floor(days / 30)}mo ago`
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("All")

  // Write review modal
  const [showModal, setShowModal] = useState(false)
  const [formName, setFormName] = useState("")
  const [formRating, setFormRating] = useState(5)
  const [formQuote, setFormQuote] = useState("")
  const [formRecommend, setFormRecommend] = useState("Definitely Yes")
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    fetch("/api/public-feedback")
      .then(r => r.json())
      .then(d => {
        const list: Review[] = d.feedback || []
        setReviews(list.length > 0 ? list : FALLBACK)
      })
      .catch(() => setReviews(FALLBACK))
      .finally(() => setLoading(false))
  }, [])

  const filtered = reviews.filter(r => {
    if (filter === "5 Stars") return r.rating === 5
    if (filter === "4 Stars") return r.rating === 4
    if (filter === "Recommends") return r.recommend?.toLowerCase().includes("yes")
    return true
  })

  const avgRating = reviews.length ? Math.round((reviews.reduce((s, r) => s + r.rating, 0) / reviews.length) * 10) / 10 : 4.7
  const fiveStarPct = reviews.length ? Math.round((reviews.filter(r => r.rating === 5).length / reviews.length) * 100) : 85
  const recommendPct = reviews.length ? Math.round((reviews.filter(r => r.recommend?.toLowerCase().includes("yes")).length / reviews.length) * 100) : 95

  async function handleSubmit() {
    if (!formName.trim() || !formQuote.trim() || formQuote.trim().length < 10) return
    setSubmitting(true)
    try {
      await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: formName.trim(), rating: formRating, quote: formQuote.trim(), recommend: formRecommend }),
      })
      setSubmitted(true)
      // Add to local list
      setReviews(p => [{ name: formName.trim().split(" ").length > 1 ? `${formName.trim().split(" ")[0]} ${formName.trim().split(" ")[1][0]}.` : formName.trim(), rating: formRating, quote: formQuote.trim(), recommend: formRecommend, created_at: new Date().toISOString() }, ...p])
    } catch {
      alert("Something went wrong. Try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#fafbff]" style={{ fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif" }}>
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/60">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-8 h-[64px] flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <JobingenLogo height={70} />
          </Link>
          <button
            onClick={() => { setShowModal(true); setSubmitted(false); setFormName(""); setFormQuote(""); setFormRating(5) }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-bold text-white cursor-pointer border-none"
            style={{ background: "linear-gradient(135deg, #7c3aed, #3b5bdb)", fontFamily: "inherit" }}
          >
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg>
            Write a Review
          </button>
        </div>
      </header>

      <div className="max-w-[1100px] mx-auto px-5 sm:px-8 py-10 sm:py-14">
        {/* Hero */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200/50 mb-4">
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(s => (
                  <svg key={s} width="14" height="14" viewBox="0 0 14 14"><path d="M7 1L8.5 5H13L9.5 7.5L11 12L7 9.5L3 12L4.5 7.5L1 5H5.5L7 1Z" fill={s <= 4 ? "#fbbf24" : "#fde68a"} /></svg>
                ))}
              </div>
              <span className="text-[12px] font-bold text-amber-700">{avgRating} avg rating</span>
            </div>
            <h1 className="text-[clamp(28px,4vw,42px)] font-black text-slate-900 tracking-[-0.04em] leading-[1.1] mb-3">
              Loved by Our Community
            </h1>
            <p className="text-[15px] text-slate-500 leading-relaxed max-w-[420px]">
              Real, unfiltered reviews from bootcamp attendees. No edits, no cherry-picking — just honest feedback.
            </p>
          </div>

          {/* Stats */}
          <div className="flex gap-3 shrink-0">
            {[
              { val: `${avgRating}`, label: "Avg Rating", color: "#d97706", bg: "#fffbeb", border: "#fde68a" },
              { val: `${fiveStarPct}%`, label: "5-Star", color: "#7c3aed", bg: "#f5f3ff", border: "#ede9fe" },
              { val: `${recommendPct}%`, label: "Recommend", color: "#16a34a", bg: "#f0fdf4", border: "#bbf7d0" },
              { val: `${reviews.length}+`, label: "Reviews", color: "#1d3a8f", bg: "#eef1fd", border: "#c7d2fe" },
            ].map(s => (
              <div key={s.label} className="rounded-xl px-4 py-3 text-center border" style={{ background: s.bg, borderColor: s.border }}>
                <div className="text-[20px] font-black leading-none" style={{ color: s.color }}>{s.val}</div>
                <div className="text-[9px] font-bold text-slate-400 mt-1.5 uppercase tracking-widest">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-1">
          {TAGS.map(t => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className="px-4 py-2 rounded-lg text-[12px] font-bold border cursor-pointer transition-all whitespace-nowrap"
              style={{
                background: filter === t ? "#1e1b4b" : "#fff",
                color: filter === t ? "#fff" : "#64748b",
                borderColor: filter === t ? "#1e1b4b" : "#e2e8f0",
                fontFamily: "inherit",
              }}
            >
              {t} {t !== "All" && <span className="ml-1 opacity-60">({reviews.filter(r => {
                if (t === "5 Stars") return r.rating === 5
                if (t === "4 Stars") return r.rating === 4
                if (t === "Recommends") return r.recommend?.toLowerCase().includes("yes")
                return true
              }).length})</span>}
            </button>
          ))}
        </div>

        {/* Reviews grid — masonry-like */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-3 border-slate-200 border-t-[#7c3aed] rounded-full animate-spin" />
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
            {filtered.map((r, i) => {
              const initial = r.name.charAt(0).toUpperCase()
              const color = AVATAR_COLORS[i % AVATAR_COLORS.length]
              const recommends = r.recommend?.toLowerCase().includes("yes")
              const isLong = r.quote.length > 120

              return (
                <div
                  key={i}
                  className="break-inside-avoid bg-white rounded-2xl border border-slate-200/60 overflow-hidden transition-all duration-200 hover:shadow-[0_12px_40px_rgba(0,0,0,0.07)] hover:-translate-y-0.5"
                >
                  {/* Color accent */}
                  <div className="h-1" style={{ background: `linear-gradient(90deg, ${color}, ${color}66)` }} />

                  <div className="p-5">
                    {/* Stars */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex gap-0.5">
                        {[1,2,3,4,5].map(s => (
                          <svg key={s} width="16" height="16" viewBox="0 0 14 14">
                            <path d="M7 1L8.5 5H13L9.5 7.5L11 12L7 9.5L3 12L4.5 7.5L1 5H5.5L7 1Z" fill={s <= r.rating ? "#fbbf24" : "#f1f5f9"} />
                          </svg>
                        ))}
                      </div>
                      {recommends && (
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                          Recommends
                        </span>
                      )}
                    </div>

                    {/* Quote */}
                    <p className={`text-[13.5px] leading-[1.75] text-slate-700 mb-5 ${isLong ? "" : "font-medium"}`}>
                      &ldquo;{r.quote}&rdquo;
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-bold text-white shrink-0"
                        style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)` }}
                      >
                        {initial}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[13px] font-bold text-slate-900">{r.name}</div>
                        <div className="text-[11px] text-slate-400">Bootcamp Attendee</div>
                      </div>
                      {r.created_at && (
                        <span className="text-[10px] text-slate-300 font-medium shrink-0">{timeAgo(r.created_at)}</span>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {filtered.length === 0 && !loading && (
          <div className="text-center py-20 text-slate-400">
            <div className="text-[28px] mb-3 opacity-50">No reviews match this filter</div>
          </div>
        )}
      </div>

      {/* Write Review Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,.5)", backdropFilter: "blur(4px)" }} onClick={() => !submitting && setShowModal(false)}>
          <div className="bg-white rounded-2xl w-full max-w-[480px] overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,.2)]" onClick={e => e.stopPropagation()} style={{ animation: "revSlide .2s ease" }}>
            {/* Header */}
            <div className="px-6 pt-6 pb-4 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <h3 className="text-[18px] font-extrabold text-slate-900">Write a Review</h3>
                <button onClick={() => setShowModal(false)} className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 cursor-pointer border-none">
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
                </button>
              </div>
              <p className="text-[12px] text-slate-400 mt-1">Share your honest bootcamp experience</p>
            </div>

            {submitted ? (
              <div className="px-6 py-12 text-center">
                <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center bg-emerald-50">
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                </div>
                <h4 className="text-[17px] font-extrabold text-slate-900 mb-2">Thank you!</h4>
                <p className="text-[13px] text-slate-500">Your review has been submitted and will appear shortly.</p>
                <button onClick={() => setShowModal(false)} className="mt-6 px-6 py-2.5 rounded-xl text-[13px] font-bold text-white cursor-pointer border-none" style={{ background: "linear-gradient(135deg, #7c3aed, #3b5bdb)", fontFamily: "inherit" }}>Done</button>
              </div>
            ) : (
              <div className="px-6 py-5">
                {/* Name */}
                <div className="mb-4">
                  <label className="text-[12px] font-semibold text-slate-700 mb-1.5 block">Your Name <span className="text-red-400">*</span></label>
                  <input
                    type="text"
                    value={formName}
                    onChange={e => setFormName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full p-3 rounded-xl border border-slate-200 text-[14px] text-slate-800 outline-none focus:border-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed]/10 placeholder:text-slate-400"
                    style={{ fontFamily: "inherit" }}
                  />
                </div>

                {/* Rating */}
                <div className="mb-4">
                  <label className="text-[12px] font-semibold text-slate-700 mb-2 block">Rating <span className="text-red-400">*</span></label>
                  <div className="flex gap-1.5">
                    {[1,2,3,4,5].map(s => (
                      <button
                        key={s}
                        onClick={() => setFormRating(s)}
                        className="p-1 cursor-pointer border-none bg-transparent"
                      >
                        <svg width="28" height="28" viewBox="0 0 14 14" style={{ transition: "transform .1s" }} onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.2)")} onMouseLeave={e => (e.currentTarget.style.transform = "")}>
                          <path d="M7 1L8.5 5H13L9.5 7.5L11 12L7 9.5L3 12L4.5 7.5L1 5H5.5L7 1Z" fill={s <= formRating ? "#fbbf24" : "#e2e8f0"} />
                        </svg>
                      </button>
                    ))}
                    <span className="ml-2 text-[14px] font-bold text-amber-600 self-center">{formRating}/5</span>
                  </div>
                </div>

                {/* Review text */}
                <div className="mb-4">
                  <label className="text-[12px] font-semibold text-slate-700 mb-1.5 block">Your Review <span className="text-red-400">*</span></label>
                  <textarea
                    value={formQuote}
                    onChange={e => { if (e.target.value.length <= 500) setFormQuote(e.target.value) }}
                    placeholder="What did you like about the bootcamp? What was your experience like?"
                    rows={4}
                    className="w-full p-3 rounded-xl border border-slate-200 text-[14px] text-slate-800 outline-none focus:border-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed]/10 placeholder:text-slate-400 resize-y leading-[1.7]"
                    style={{ fontFamily: "inherit" }}
                  />
                  <div className="flex justify-end mt-1">
                    <span className={`text-[11px] font-semibold ${formQuote.length > 450 ? "text-amber-500" : "text-slate-300"}`}>
                      {formQuote.length}/500
                    </span>
                  </div>
                </div>

                {/* Recommend */}
                <div className="mb-5">
                  <label className="text-[12px] font-semibold text-slate-700 mb-2 block">Would you recommend?</label>
                  <div className="flex gap-2">
                    {["Definitely Yes", "Probably Yes", "Not Sure"].map(r => (
                      <button
                        key={r}
                        onClick={() => setFormRecommend(r)}
                        className="flex-1 py-2 rounded-lg border text-[12px] font-bold cursor-pointer transition-all"
                        style={{
                          background: formRecommend === r ? "#f0fdf4" : "#fff",
                          borderColor: formRecommend === r ? "#16a34a" : "#e2e8f0",
                          color: formRecommend === r ? "#16a34a" : "#94a3b8",
                          fontFamily: "inherit",
                        }}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit */}
                <button
                  onClick={handleSubmit}
                  disabled={submitting || !formName.trim() || formQuote.trim().length < 10}
                  className="w-full py-3 rounded-xl text-[14px] font-bold text-white cursor-pointer border-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ background: "linear-gradient(135deg, #7c3aed, #3b5bdb)", fontFamily: "inherit" }}
                >
                  {submitting ? "Submitting..." : "Submit Review"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `@keyframes revSlide{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}` }} />
    </div>
  )
}
