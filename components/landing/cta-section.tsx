"use client"

import Link from "next/link"
import { FadeIn } from "./motion"

export function CTASection() {
  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-[900px] mx-auto px-5 sm:px-8">
        <FadeIn>
          <div
            className="relative overflow-hidden rounded-2xl px-6 py-10 sm:px-12 sm:py-12"
            style={{ background: "linear-gradient(135deg, #0f172a 0%, #1d3a8f 100%)" }}
          >
            {/* Subtle grid */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />

            <div className="relative flex flex-col md:flex-row items-center gap-6 md:gap-10">
              {/* Left — text */}
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-[clamp(20px,3vw,28px)] font-extrabold text-white tracking-[-0.03em] mb-2 leading-[1.2]">
                  Ready to get career-ready?
                </h2>
                <p className="text-[14px] text-slate-400 leading-relaxed max-w-[360px] mx-auto md:mx-0">
                  Join Jobingen — AI tools, bootcamps, and opportunities in one place.
                </p>
              </div>

              {/* Right — buttons */}
              <div className="flex items-center gap-3 shrink-0">
                <Link
                  href="/register"
                  className="text-[14px] font-bold text-slate-900 bg-white px-6 py-3 rounded-xl hover:bg-slate-100 transition-all duration-200 shadow-[0_2px_12px_rgba(0,0,0,0.15)] whitespace-nowrap"
                >
                  Get Started Free
                </Link>
                <Link
                  href="/jobs"
                  className="text-[14px] font-semibold text-white/70 px-6 py-3 rounded-xl border border-white/15 hover:bg-white/10 transition-all duration-200 whitespace-nowrap"
                >
                  Browse Jobs
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
