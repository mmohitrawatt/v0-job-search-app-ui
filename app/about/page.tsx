"use client"

import React, { useRef, useEffect } from "react"
import Link from "next/link"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import { Target, Sparkles, Users, Rocket, Heart, ShieldCheck, ArrowRight } from "lucide-react"

/* ─── Scroll reveal ─── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("show"); io.unobserve(el) } }, { threshold: 0.08 })
    io.observe(el); return () => io.disconnect()
  }, [])
  return ref
}
function R({ children, d = 0, className = "" }: { children: React.ReactNode; d?: number; className?: string }) {
  const ref = useReveal()
  return <div ref={ref} className={`ab-rev ${className}`} style={{ transitionDelay: `${d}ms` }}>{children}</div>
}

const STATS = [
  { v: "50K+", l: "Live jobs matched" },
  { v: "10K+", l: "Jobseekers helped" },
  { v: "100+", l: "Hiring companies" },
  { v: "4.9", l: "Avg. user rating" },
]

const PILLARS = [
  { icon: Target, t: "AI that gets you", d: "We read your profile and surface only the roles you're a real fit for — plus who can refer you in." },
  { icon: Sparkles, t: "One place for everything", d: "Resume AI, mock interviews, salary intel and mentors — your whole job hunt under one roof." },
  { icon: Rocket, t: "Built for the ambitious", d: "Made for students and early professionals who want to move fast and get hired faster." },
]

const VALUES = [
  { icon: Heart, t: "Candidate-first", d: "Every decision starts with what actually helps you land the job — not vanity metrics." },
  { icon: ShieldCheck, t: "Honest & transparent", d: "Real match scores, real salary data, no dark patterns. What you see is what you get." },
  { icon: Users, t: "Better together", d: "Referrals, mentors and community — because careers are built with people, not alone." },
]

export default function AboutPage() {
  return (
    <div style={{ background: "#ffffff", minHeight: "100vh" }}>
      <style>{`
        .ab-rev { opacity: 0; transform: translateY(18px); transition: opacity .6s cubic-bezier(.16,1,.3,1), transform .6s cubic-bezier(.16,1,.3,1); }
        .ab-rev.show { opacity: 1; transform: none; }
      `}</style>

      <Navbar />

      {/* Hero */}
      <section className="pt-28 sm:pt-36 pb-16 sm:pb-20 px-5 sm:px-8 text-center relative overflow-hidden">
        <div style={{ position: "absolute", inset: "-10% -5% auto -5%", height: "70%", background: "radial-gradient(55% 60% at 50% 20%, rgba(70,104,245,0.09), transparent 70%)", pointerEvents: "none" }} />
        <div className="max-w-[820px] mx-auto relative">
          <R>
            <span className="inline-flex items-center gap-1.5 text-[12px] font-extrabold tracking-[0.16em] uppercase mb-5" style={{ color: "#1d3a8f" }}>
              <Sparkles size={13} strokeWidth={2.4} /> About jobengen
            </span>
          </R>
          <R d={80}>
            <h1 className="font-black tracking-[-0.04em] leading-[1.04]" style={{ fontSize: "clamp(34px,6vw,68px)", color: "#0c1a35" }}>
              The AI career{" "}
              <span style={{ color: "#1d3a8f" }}>operating system</span>{" "}
              for the next generation
            </h1>
          </R>
          <R d={160}>
            <p className="text-[16px] sm:text-[18px] max-w-[600px] mx-auto mt-6 leading-relaxed" style={{ color: "#475569" }}>
              We&rsquo;re on a mission to make landing your dream job simpler, fairer and faster —
              powered by AI, grounded in real human mentorship.
            </p>
          </R>
        </div>
      </section>

      {/* Stats */}
      <section className="px-5 sm:px-8 pb-16 sm:pb-20">
        <div className="max-w-[1000px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-4">
          {STATS.map((s, i) => (
            <R key={s.l} d={i * 60}>
              <div className="text-center px-2 lg:px-6" style={{ borderLeft: i % 2 === 0 ? "none" : "1px solid #e6eaf1" }}>
                <div className="font-black tracking-[-0.03em] leading-none" style={{ fontSize: "clamp(28px,3.4vw,42px)", color: "#0c1a35" }}>{s.v}</div>
                <div className="text-[13px] font-medium mt-2" style={{ color: "#64748b" }}>{s.l}</div>
              </div>
            </R>
          ))}
        </div>
      </section>

      {/* Mission / story */}
      <section className="px-5 sm:px-8 py-16 sm:py-20" style={{ background: "#f6f8fc" }}>
        <div className="max-w-[880px] mx-auto text-center">
          <R>
            <span className="text-[12px] font-extrabold tracking-[0.16em] uppercase" style={{ color: "#1d3a8f" }}>Our mission</span>
          </R>
          <R d={80}>
            <h2 className="font-black tracking-[-0.03em] leading-[1.12] mt-4" style={{ fontSize: "clamp(24px,3.6vw,40px)", color: "#0c1a35" }}>
              Job hunting is broken. We&rsquo;re fixing it.
            </h2>
          </R>
          <R d={160}>
            <p className="text-[15.5px] sm:text-[17px] leading-relaxed mt-6" style={{ color: "#475569" }}>
              Spraying hundreds of applications into the void, guessing what recruiters want, negotiating blind —
              it shouldn&rsquo;t be this hard. jobengen brings AI-powered matching, resume tailoring, interview prep,
              salary intelligence and real mentors together, so you spend less time searching and more time getting hired.
            </p>
          </R>
        </div>
      </section>

      {/* What we do — pillars */}
      <section className="px-5 sm:px-8 py-16 sm:py-24">
        <div className="max-w-[1100px] mx-auto">
          <R className="text-center mb-12">
            <h2 className="font-black tracking-[-0.03em] leading-[1.1]" style={{ fontSize: "clamp(24px,3.6vw,40px)", color: "#0c1a35" }}>
              What we&rsquo;re building
            </h2>
          </R>
          <div className="grid md:grid-cols-3 gap-5">
            {PILLARS.map((p, i) => {
              const Icon = p.icon
              return (
                <R key={p.t} d={i * 90}>
                  <div className="h-full rounded-2xl p-7" style={{ background: "#fff", border: "1px solid #eef1f6", boxShadow: "0 8px 26px rgba(15,23,42,0.06)" }}>
                    <div className="w-12 h-12 rounded-xl grid place-items-center mb-5" style={{ background: "#eef2ff", color: "#1d3a8f" }}>
                      <Icon size={22} strokeWidth={2.1} />
                    </div>
                    <h3 className="text-[18px] font-extrabold mb-2" style={{ color: "#0c1a35" }}>{p.t}</h3>
                    <p className="text-[14.5px] leading-relaxed" style={{ color: "#475569" }}>{p.d}</p>
                  </div>
                </R>
              )
            })}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="px-5 sm:px-8 py-16 sm:py-20" style={{ background: "#f6f8fc" }}>
        <div className="max-w-[1100px] mx-auto">
          <R className="text-center mb-12">
            <span className="text-[12px] font-extrabold tracking-[0.16em] uppercase" style={{ color: "#1d3a8f" }}>What we stand for</span>
            <h2 className="font-black tracking-[-0.03em] leading-[1.1] mt-4" style={{ fontSize: "clamp(24px,3.6vw,40px)", color: "#0c1a35" }}>
              Our values
            </h2>
          </R>
          <div className="grid md:grid-cols-3 gap-5">
            {VALUES.map((v, i) => {
              const Icon = v.icon
              return (
                <R key={v.t} d={i * 90}>
                  <div className="h-full rounded-2xl p-7" style={{ background: "#fff", border: "1px solid #e8edf3" }}>
                    <div className="w-11 h-11 rounded-xl grid place-items-center mb-4" style={{ background: "#eef2ff", color: "#1d3a8f" }}>
                      <Icon size={20} strokeWidth={2.1} />
                    </div>
                    <h3 className="text-[17px] font-extrabold mb-2" style={{ color: "#0c1a35" }}>{v.t}</h3>
                    <p className="text-[14px] leading-relaxed" style={{ color: "#475569" }}>{v.d}</p>
                  </div>
                </R>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 sm:px-8 py-20 sm:py-28 text-center">
        <div className="max-w-[680px] mx-auto">
          <R>
            <h2 className="font-black tracking-[-0.035em] leading-[1.08]" style={{ fontSize: "clamp(28px,4.4vw,48px)", color: "#0c1a35" }}>
              Ready to find your next role?
            </h2>
          </R>
          <R d={100}>
            <p className="text-[16px] mt-4 mb-8" style={{ color: "#475569" }}>
              Join thousands of jobseekers moving their careers forward with jobengen.
            </p>
          </R>
          <R d={180}>
            <Link href="/" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl text-[15px] font-bold text-white transition-all hover:brightness-110"
              style={{ background: "#1d3a8f", boxShadow: "0 6px 22px rgba(29,58,143,0.28)" }}>
              Get started — it&rsquo;s free
              <ArrowRight size={17} strokeWidth={2.4} />
            </Link>
          </R>
        </div>
      </section>

      <Footer />
    </div>
  )
}
