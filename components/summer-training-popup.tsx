"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export function SummerTrainingPopup() {
  const [visible, setVisible] = useState(false)
  const [closing, setClosing] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem("st-popup-seen")) return
    const t = setTimeout(() => setVisible(true), 3000)
    return () => clearTimeout(t)
  }, [])

  function close() {
    setClosing(true)
    setTimeout(() => {
      setVisible(false)
      setClosing(false)
      sessionStorage.setItem("st-popup-seen", "1")
    }, 280)
  }

  useEffect(() => {
    if (!visible) return
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close() }
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [visible])

  if (!visible) return null

  return (
    <div
      onClick={close}
      className="fixed inset-0 z-[999] flex items-center justify-center px-4"
      style={{
        background: "rgba(9,9,20,0.55)",
        backdropFilter: "blur(6px)",
        animation: closing ? "fadeOut 0.28s ease forwards" : "fadeIn 0.3s ease forwards",
      }}
    >
      <style>{`
        @keyframes fadeIn  { from { opacity:0 } to { opacity:1 } }
        @keyframes fadeOut { from { opacity:1 } to { opacity:0 } }
        @keyframes slideUp { from { opacity:0; transform:translateY(28px) scale(0.96) } to { opacity:1; transform:translateY(0) scale(1) } }
        @keyframes slideDown { from { opacity:1; transform:translateY(0) scale(1) } to { opacity:0; transform:translateY(20px) scale(0.96) } }
      `}</style>

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[420px] bg-white rounded-[24px] overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.22)]"
        style={{ animation: closing ? "slideDown 0.28s ease forwards" : "slideUp 0.35s cubic-bezier(0.22,1,0.36,1) forwards" }}
      >
        {/* Top gradient banner */}
        <div
          className="relative px-6 pt-8 pb-6 text-white"
          style={{ background: "linear-gradient(135deg, #0d1b45 0%, #1d3a8f 50%, #3b5bdb 100%)" }}
        >
          {/* Close button */}
          <button
            onClick={close}
            className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer border-0"
            style={{ background: "rgba(255,255,255,0.15)" }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1l12 12M13 1L1 13" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>

          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold mb-4"
            style={{ background: "rgba(255,255,255,0.18)", backdropFilter: "blur(4px)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block" />
            Limited Seats — June 2026
          </div>

          <h2 className="text-[24px] font-black leading-tight tracking-tight mb-1">
            Jobingen<br />Summer Training
          </h2>
          <p className="text-[13px] font-medium" style={{ color: "rgba(255,255,255,0.72)" }}>
            Work on live AI tools & real startup projects
          </p>

          {/* Decorative blobs */}
          <div className="absolute top-0 right-0 w-40 h-40 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)", transform: "translate(30%, -30%)" }} />
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 divide-x divide-slate-100 border-b border-slate-100">
          {[
            { value: "4 Weeks", label: "Duration" },
            { value: "June 1", label: "Starts" },
            { value: "6", label: "Domains" },
          ].map((s) => (
            <div key={s.label} className="py-3 text-center">
              <div className="text-[15px] font-black text-slate-900">{s.value}</div>
              <div className="text-[11px] font-medium text-slate-400">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          <div className="flex flex-col gap-2.5 mb-5">
            {[
              "Ship features used by real users",
              "Official Jobingen certificate",
              "Mentorship from senior team",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: "linear-gradient(135deg, #1d3a8f, #3b5bdb)" }}>
                  <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-[13.5px] font-medium text-slate-700">{item}</span>
              </div>
            ))}
          </div>

          <Link
            href="/early-apply"
            onClick={close}
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-[14px] text-[14px] font-bold text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            style={{
              background: "linear-gradient(135deg, #1a3585 0%, #2d4fd4 55%, #4668f5 100%)",
              boxShadow: "0 4px 16px rgba(29,58,143,0.35), inset 0 1px 0 rgba(255,255,255,0.12)",
            }}
          >
            Apply Now
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>

          <button
            onClick={close}
            className="w-full text-center text-[12px] font-medium text-slate-400 hover:text-slate-600 transition-colors mt-3 cursor-pointer border-0 bg-transparent"
          >
            No thanks, maybe later
          </button>
        </div>
      </div>
    </div>
  )
}
