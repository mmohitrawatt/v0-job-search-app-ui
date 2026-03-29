"use client"

import Link from "next/link"
import { FadeIn } from "./motion"

export function CTASection() {
  return (
    <section className="py-20 sm:py-28 bg-[#fafbff]">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <FadeIn>
          <div
            className="relative overflow-hidden rounded-3xl px-8 py-16 sm:px-16 sm:py-20 text-center"
            style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 40%, #1d3a8f 100%)" }}
          >
            {/* Decorative circles */}
            <div className="absolute top-[-80px] right-[-60px] w-[300px] h-[300px] rounded-full opacity-[0.06] bg-white pointer-events-none" />
            <div className="absolute bottom-[-100px] left-[-40px] w-[250px] h-[250px] rounded-full opacity-[0.04] bg-white pointer-events-none" />

            <div className="relative">
              <h2 className="text-[clamp(26px,4vw,42px)] font-extrabold text-white tracking-[-0.03em] mb-5 leading-[1.15]">
                Start Building Your{" "}
                <span className="bg-gradient-to-r from-[#93c5fd] to-[#c4b5fd] bg-clip-text text-transparent">
                  Career with AI
                </span>
              </h2>
              <p className="text-[16px] sm:text-[18px] text-slate-400 max-w-[480px] mx-auto leading-[1.7] mb-10">
                Join Jobingen and access powerful tools, mentorship, and opportunities — all in one platform.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/register"
                  className="w-full sm:w-auto text-center text-[15px] font-bold text-slate-900 bg-white px-8 py-4 rounded-xl hover:bg-slate-50 transition-all duration-200 shadow-[0_4px_16px_rgba(0,0,0,0.2)]"
                >
                  Get Started for Free
                </Link>
                <Link
                  href="/jobs"
                  className="w-full sm:w-auto text-center text-[15px] font-semibold text-white/80 px-8 py-4 rounded-xl border border-white/20 hover:bg-white/10 transition-all duration-200"
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
