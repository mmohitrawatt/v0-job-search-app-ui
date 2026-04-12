"use client"

import { useState } from "react"
import Link from "next/link"
import { FadeIn, motion, AnimatePresence } from "./motion"

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-[68px]">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f8faff] via-white to-white" />

      <div className="relative max-w-[1200px] mx-auto px-5 sm:px-8 pt-16 sm:pt-20 lg:pt-28 pb-12 sm:pb-16">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

          {/* ── Left — Content ─────────────────── */}
          <div className="flex-1 text-center lg:text-left">
            <FadeIn delay={0.06}>
              <h1 className="text-[clamp(32px,5.5vw,56px)] font-black text-slate-900 leading-[1.06] tracking-[-0.04em] mb-5">
                The Last Engine
                <br />
                you need for{" "}
                <span className="bg-gradient-to-r from-[#1d3a8f] to-[#3b5bdb] bg-clip-text text-transparent">
                  Job Search.
                </span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.12}>
              <p className="text-[clamp(16px,1.6vw,19px)] text-slate-500 leading-[1.75] mb-8 max-w-[480px] mx-auto lg:mx-0">
                Smarter job discovery, AI-powered resumes, mock interviews, and hands-on bootcamps — everything in one place.
              </p>
            </FadeIn>

            <FadeIn delay={0.18}>
              <div className="flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start mb-8">
                <Link
                  href="/register"
                  className="w-full sm:w-auto text-[15px] font-bold text-white px-8 py-3.5 rounded-xl shadow-[0_4px_16px_rgba(29,58,143,0.28)] hover:shadow-[0_8px_24px_rgba(29,58,143,0.35)] transition-all duration-300 hover:-translate-y-0.5"
                  style={{ background: "linear-gradient(135deg, #1d3a8f 0%, #3b5bdb 100%)" }}
                >
                  Get Started — It&apos;s Free
                </Link>
                <a
                  href="#ai-tools"
                  className="w-full sm:w-auto text-[15px] font-semibold text-slate-600 px-8 py-3.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 transition-all duration-200"
                >
                  Explore Tools
                </a>
              </div>
            </FadeIn>

            <FadeIn delay={0.24}>
              <div className="flex items-center gap-6 justify-center lg:justify-start text-[13px] text-slate-400 font-medium flex-wrap">
                {["AI Resume Builder", "Smart Job Matching", "Mock Interviews"].map((label) => (
                  <span key={label} className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#1d3a8f]/40" />
                    {label}
                  </span>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* ── Right — AI Chatbot Card ────── */}
          <FadeIn direction="left" delay={0.15} className="flex-1 w-full max-w-[480px] lg:max-w-none">
            <ChatbotCard />
          </FadeIn>

        </div>

        {/* Trusted by strip */}
        <FadeIn delay={0.3}>
          <div className="mt-12 sm:mt-16 pt-8 border-t border-slate-100">
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-[0.1em] text-center mb-4">Trusted by students from</p>
            <div className="flex items-center justify-center gap-4 sm:gap-8 text-[13px] sm:text-[14px] text-slate-300 font-bold flex-wrap">
              {["IITs", "NITs", "IIITs", "BITS", "DTU", "VIT", "SRM", "NSUT"].map((name) => (
                <span key={name} className="hover:text-slate-500 transition-colors duration-200">{name}</span>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

/* ── Chatbot Card ──────────────────────────────────── */

function ChatbotCard() {
  const [showToast, setShowToast] = useState(false)
  const [inputVal, setInputVal] = useState("")

  function handleSend() {
    setShowToast(true)
    setTimeout(() => setShowToast(false), 2000)
  }

  return (
    <div className="relative">
      <motion.div
        className="relative"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="bg-white rounded-2xl border border-slate-200/70 shadow-[0_8px_48px_rgba(0,0,0,0.07)] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-gradient-to-r from-[#1d3a8f] to-[#3b5bdb]">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <div>
                <div className="text-[13px] font-bold text-white leading-tight">Jobingen AI</div>
                <div className="flex items-center gap-1">
                  <span className="w-[5px] h-[5px] rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] text-white/70 font-medium">Online</span>
                </div>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="p-4 space-y-3 bg-[#fafbfc]">
            {/* User */}
            <div className="flex justify-end">
              <div className="bg-[#1d3a8f] text-white text-[12px] px-3.5 py-2 rounded-2xl rounded-br-md max-w-[80%] leading-relaxed font-medium">
                Build me a resume for an AI Engineer role
              </div>
            </div>

            {/* AI */}
            <div className="flex gap-2 items-start">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#1d3a8f] to-[#3b5bdb] flex items-center justify-center shrink-0 mt-0.5">
                <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                </svg>
              </div>
              <div className="bg-white border border-slate-200 text-[12px] text-slate-600 px-3.5 py-2.5 rounded-2xl rounded-bl-md max-w-[85%] leading-[1.6] shadow-sm">
                <p className="mb-2 text-slate-700 font-medium">Creating your tailored resume:</p>
                <div className="space-y-1.5">
                  {["Professional Summary", "Work Experience", "Skills & Tools"].map((item) => (
                    <div key={item} className="flex items-center gap-1.5">
                      <div className="w-3.5 h-3.5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                        <svg width="7" height="7" fill="none" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" stroke="#059669" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </div>
                      <span className="text-[11px] text-slate-500">{item}</span>
                    </div>
                  ))}
                  <div className="flex items-center gap-1.5">
                    <div className="w-3.5 h-3.5 rounded-full border-[1.5px] border-[#1d3a8f] border-t-transparent animate-spin shrink-0" />
                    <span className="text-[11px] font-medium text-[#1d3a8f]">Optimizing for ATS...</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Resume file */}
            <div className="flex gap-2 items-start">
              <div className="w-6 shrink-0" />
              <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-sm flex-1 max-w-[85%]">
                <div className="flex items-center gap-2 mb-2.5">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#1d3a8f] to-[#3b5bdb] flex items-center justify-center shrink-0">
                    <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /></svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] font-bold text-slate-700 truncate">Resume_AI_Engineer.pdf</div>
                    <div className="text-[9px] text-slate-400">ATS-Optimized</div>
                  </div>
                  <div className="bg-emerald-50 text-emerald-600 text-[9px] font-bold px-1.5 py-0.5 rounded border border-emerald-200/60 shrink-0">92%</div>
                </div>
                <div className="flex gap-1.5">
                  <div className="flex-1 bg-[#1d3a8f] text-white text-[10px] font-bold py-1.5 rounded-lg text-center">Download</div>
                  <div className="flex-1 bg-slate-50 text-slate-500 text-[10px] font-bold py-1.5 rounded-lg text-center border border-slate-200">Edit</div>
                </div>
              </div>
            </div>
          </div>

          {/* Input + Coming Soon toast */}
          <div className="px-4 py-2.5 border-t border-slate-100 bg-white relative">
            <AnimatePresence>
              {showToast && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.2 }}
                  className="absolute -top-9 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[11px] font-semibold px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap z-10"
                >
                  Coming Soon
                </motion.div>
              )}
            </AnimatePresence>
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type your prompt..."
                className="text-[13px] text-slate-700 placeholder:text-slate-400 flex-1 bg-transparent outline-none font-medium"
              />
              <button
                onClick={handleSend}
                className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 hover:opacity-80 transition-opacity"
                style={{ background: "linear-gradient(135deg, #1d3a8f, #3b5bdb)" }}
              >
                <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
