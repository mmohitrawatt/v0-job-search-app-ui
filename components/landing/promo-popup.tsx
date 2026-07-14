"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PROMO_POPUP, type PromoPopup as PromoConfig } from "@/lib/promo-popup"

const SESSION_KEY = "jobingen_promo_shown"

export function PromoPopup() {
  const [cfg, setCfg] = useState<PromoConfig | null>(null)
  const [open, setOpen] = useState(false)
  const [remaining, setRemaining] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // load admin config (falls back to static default)
  useEffect(() => {
    let alive = true
    fetch("/api/site-content")
      .then((r) => r.json())
      .then((d) => { if (alive) setCfg((d?.popup as PromoConfig) ?? PROMO_POPUP) })
      .catch(() => { if (alive) setCfg(PROMO_POPUP) })
    return () => { alive = false }
  }, [])

  // open on mount (after a beat so the page paints first)
  useEffect(() => {
    if (!cfg || !cfg.enabled || !cfg.image) return
    if (cfg.oncePerSession) {
      try {
        if (sessionStorage.getItem(SESSION_KEY)) return
        sessionStorage.setItem(SESSION_KEY, "1")
      } catch {}
    }
    const t = setTimeout(() => setOpen(true), 600)
    return () => clearTimeout(t)
  }, [cfg])

  // countdown + auto-close
  useEffect(() => {
    if (!open || !cfg) return
    setRemaining(cfg.autoCloseSeconds)
    timerRef.current = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          if (timerRef.current) clearInterval(timerRef.current)
          setOpen(false)
          return 0
        }
        return r - 1
      })
    }, 1000)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [open, cfg])

  // esc to close + scroll lock
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false) }
    window.addEventListener("keydown", onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = prev
    }
  }, [open])

  if (!cfg) return null

  const pct = cfg.autoCloseSeconds ? (remaining / cfg.autoCloseSeconds) * 100 : 0

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          onClick={() => setOpen(false)}
          style={{
            position: "fixed", inset: 0, zIndex: 300,
            background: "rgba(9,13,24,0.72)",
            backdropFilter: "blur(8px)",
            display: "grid", placeItems: "center", padding: 16,
          }}
        >
          <motion.div
            initial={{ scale: 0.9, y: 18, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.94, y: 12, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              width: "100%", maxWidth: 440,
              maxHeight: "92vh",
              borderRadius: 22, overflow: "hidden",
              background: "#fff",
              boxShadow: "0 30px 90px rgba(0,0,0,0.5)",
            }}
          >
            {/* close */}
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              style={{
                position: "absolute", top: 12, right: 12, zIndex: 4,
                width: 34, height: 34, borderRadius: "50%",
                background: "rgba(12,26,53,0.55)", backdropFilter: "blur(4px)",
                border: "none", cursor: "pointer", color: "#fff",
                display: "grid", placeItems: "center",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>

            {/* countdown pill */}
            <div style={{
              position: "absolute", top: 14, left: 14, zIndex: 4,
              display: "flex", alignItems: "center", gap: 6,
              padding: "5px 11px", borderRadius: 999,
              background: "rgba(12,26,53,0.55)", backdropFilter: "blur(4px)",
              color: "#fff", fontSize: 12, fontWeight: 700,
            }}>
              <span style={{
                width: 7, height: 7, borderRadius: 999, background: "#22c55e",
                boxShadow: "0 0 0 3px rgba(34,197,94,0.28)",
              }} />
              Closes in {remaining}s
            </div>

            {/* poster */}
            {cfg.href ? (
              <a href={cfg.href} onClick={() => setOpen(false)} style={{ display: "block" }}>
                <PosterImg src={cfg.image} alt={cfg.alt} />
              </a>
            ) : (
              <PosterImg src={cfg.image} alt={cfg.alt} />
            )}

            {/* auto-close progress bar */}
            <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 4, background: "rgba(12,26,53,0.12)" }}>
              <div style={{
                height: "100%", width: `${pct}%`,
                background: "linear-gradient(90deg,#1d3a8f,#4668f5)",
                transition: "width 1s linear",
              }} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function PosterImg({ src, alt }: { src: string; alt: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      style={{ display: "block", width: "100%", height: "auto", objectFit: "contain" }}
    />
  )
}
