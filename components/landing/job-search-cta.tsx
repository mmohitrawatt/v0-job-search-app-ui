"use client"

import { Search, Sparkles, MapPin, Zap, Users, Building2, Check } from "lucide-react"
import { useWaitlist } from "@/components/waitlist-modal"

const QUICK = ["Remote", "Bengaluru", "Fresher", "Product", "Full-time"]

export function JobSearchCta() {
  const { open } = useWaitlist()

  return (
    <section className="py-16 sm:py-24 bg-white overflow-hidden">
      <div className="max-w-[1120px] mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-10 items-center">

          {/* ── Left: copy + search ── */}
          <div>
            <span className="inline-flex items-center gap-1.5 text-[12px] font-extrabold tracking-[0.14em] uppercase mb-4" style={{ color: "#1d3a8f" }}>
              <Sparkles size={13} strokeWidth={2.4} /> Ready when you are
            </span>

            <h2 className="font-black tracking-[-0.035em] leading-[1.04] mb-4"
              style={{ fontSize: "clamp(30px,4.6vw,52px)", color: "#0c1a35" }}>
              Your perfect job is{" "}
              <span style={{ color: "#1d3a8f" }}>one search away</span>
            </h2>
            <p className="text-[15px] sm:text-[16px] max-w-[440px] mb-7 leading-relaxed" style={{ color: "#475569" }}>
              Type what you&rsquo;re after. Our AI ranks the best-fit roles and shows
              you exactly who can refer you in.
            </p>

            {/* search input + button */}
            <div className="flex items-center gap-2 p-2 rounded-2xl max-w-[480px]"
              style={{ background: "#fff", border: "1.5px solid #e4e9f2", boxShadow: "0 12px 36px rgba(29,58,143,0.10)" }}>
              <div className="flex items-center gap-2.5 flex-1 px-3">
                <Search size={18} strokeWidth={2.2} style={{ color: "#94a3b8" }} className="shrink-0" />
                <input placeholder="Job title, skill or company"
                  className="w-full bg-transparent outline-none text-[14.5px] font-medium placeholder:text-slate-400 py-2.5"
                  style={{ color: "#0c1a35" }} />
              </div>
              <button onClick={open}
                className="shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl text-[14.5px] font-bold text-white transition-all hover:brightness-110"
                style={{ background: "#1d3a8f", boxShadow: "0 6px 18px rgba(29,58,143,0.30)" }}>
                Search
              </button>
            </div>

            {/* quick filter chips */}
            <div className="flex flex-wrap gap-2 mt-4">
              {QUICK.map((q) => (
                <button key={q} onClick={open}
                  className="px-3.5 py-1.5 rounded-full text-[12.5px] font-semibold transition-all hover:bg-[#eef2ff]"
                  style={{ color: "#475569", background: "#f5f7fb", border: "1px solid #e8edf3" }}>
                  {q}
                </button>
              ))}
            </div>

            <p className="text-[13px] mt-6" style={{ color: "#94a3b8" }}>
              Free to start · No credit card · 50,000+ live roles
            </p>
          </div>

          {/* ── Right: product-preview match card ── */}
          <div className="relative mx-auto w-full max-w-[400px]">
            {/* peeking card behind for depth */}
            <div className="absolute -top-4 left-4 right-4 h-full rounded-[22px] hidden sm:block"
              style={{ background: "#f0f3fb", border: "1px solid #e6ebf5", transform: "rotate(-3deg)" }} />

            {/* main card */}
            <div className="relative bg-white rounded-[22px] p-6 animate-float"
              style={{ border: "1px solid #e9edf4", boxShadow: "0 24px 60px rgba(15,23,42,0.13)" }}>
              {/* header */}
              <div className="flex items-start gap-3.5 mb-5">
                <div className="w-12 h-12 rounded-xl grid place-items-center shrink-0"
                  style={{ background: "#1d3a8f" }}>
                  <Building2 size={22} strokeWidth={2} color="#fff" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[16px] font-extrabold leading-tight" style={{ color: "#0c1a35" }}>Product Designer</div>
                  <div className="text-[13px] font-medium" style={{ color: "#7b8798" }}>Razorpay · Bengaluru</div>
                </div>
                {/* match score */}
                <div className="text-center shrink-0">
                  <div className="text-[19px] font-black leading-none" style={{ color: "#1d3a8f" }}>94%</div>
                  <div className="text-[10px] font-bold uppercase tracking-wide" style={{ color: "#94a3b8" }}>match</div>
                </div>
              </div>

              {/* tags */}
              <div className="flex flex-wrap gap-2 mb-5">
                {[{ icon: MapPin, t: "Remote" }, { icon: Zap, t: "₹22–28 LPA" }, { icon: Check, t: "Full-time" }].map((tag) => {
                  const I = tag.icon
                  return (
                    <span key={tag.t} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-semibold"
                      style={{ background: "#f5f7fb", color: "#475569" }}>
                      <I size={13} strokeWidth={2.2} style={{ color: "#1d3a8f" }} /> {tag.t}
                    </span>
                  )
                })}
              </div>

              {/* referral row */}
              <div className="flex items-center gap-2.5 px-3.5 py-3 rounded-xl mb-5"
                style={{ background: "#eef2ff", border: "1px solid #e0e7ff" }}>
                <Users size={17} strokeWidth={2.2} style={{ color: "#1d3a8f" }} className="shrink-0" />
                <span className="text-[13px] font-semibold" style={{ color: "#1d3a8f" }}>
                  2 people can refer you here
                </span>
              </div>

              {/* apply button */}
              <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-[14px] font-bold text-white"
                style={{ background: "#1d3a8f" }}>
                <Zap size={16} strokeWidth={2.4} /> One-click apply
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
