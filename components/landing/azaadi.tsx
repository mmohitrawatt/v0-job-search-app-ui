"use client"

/* ─────────────────────────────────────────────────────────────
   Azaadi — Independence Week theming primitives.

   Restraint is the brief: navy stays the brand, saffron + green
   appear only as a hairline and a popup cap. Every export is inert outside the campaign
   window (see lib/campaign.ts), so these can stay mounted in the
   page permanently and simply stop rendering on 18 Aug.
   ───────────────────────────────────────────────────────────── */

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  AZAADI_COPY, AZAADI_NUMBER, TIRANGA, TRICOLOR_GRADIENT, TRICOLOR_LINE,
  azaadiCountdown, isAzaadiLive, pad2,
} from "@/lib/campaign"

/** Campaign gate. Always false on the server + first client paint so the
 *  markup matches during hydration, then flips on in an effect.
 *
 *  `?azaadi=1` forces the theming on and `?azaadi=0` forces it off, so the
 *  whole campaign can be previewed (or killed on a live page) without
 *  touching the dates. The override is remembered for the tab. */
export function useAzaadi() {
  const [live, setLive] = useState(false)
  useEffect(() => {
    const read = () => {
      let override: string | null = null
      try {
        const q = new URLSearchParams(window.location.search).get("azaadi")
        if (q === "1" || q === "0") sessionStorage.setItem("azaadi_preview", q)
        override = q ?? sessionStorage.getItem("azaadi_preview")
      } catch {}
      if (override === "1") return true
      if (override === "0") return false
      return isAzaadiLive()
    }
    setLive(read())
    // re-check each minute so an open tab flips itself on/off at the deadline
    const t = setInterval(() => setLive(read()), 60_000)
    return () => clearInterval(t)
  }, [])
  return live
}

/** Live 80 → 00 countdown. Returns null until mounted. */
function useCountdown() {
  const [c, setC] = useState<ReturnType<typeof azaadiCountdown> | null>(null)
  useEffect(() => {
    setC(azaadiCountdown())
    const t = setInterval(() => setC(azaadiCountdown()), 1000)
    return () => clearInterval(t)
  }, [])
  return c
}

/* ─── Tricolor thread — a 3px flag line that draws itself once, left to
   right, under whatever it sits below. The entire flag reference, in one
   hairline. ─── */
export function TricolorThread({
  width = 168, delay = 0.5, height = 3, className,
}: { width?: number; delay?: number; height?: number; className?: string }) {
  const live = useAzaadi()
  if (!live) return null
  return (
    <div className={className} aria-hidden="true" style={{ height, width, margin: "0 auto", overflow: "hidden", borderRadius: 999 }}>
      <style>{`@keyframes az-draw { from { transform: scaleX(0) } to { transform: scaleX(1) } }`}</style>
      <div
        style={{
          height: "100%", width: "100%", borderRadius: 999,
          background: TRICOLOR_LINE,
          boxShadow: "0 1px 6px rgba(255,153,51,0.35)",
          transformOrigin: "left center",
          animation: `az-draw .9s cubic-bezier(.16,1,.3,1) ${delay}s both`,
        }}
      />
    </div>
  )
}

/* ─── The Freedom Pass popup.
   Fires once per session, a beat after the page paints. Unlike the promo
   poster this is real markup, not an image — so the countdown is live and
   it stays sharp and readable on every screen size. ─── */

const POPUP_KEY = "jobingen_azaadi_popup"

export function AzaadiPopup() {
  const live = useAzaadi()
  const c = useCountdown()
  const [open, setOpen] = useState(false)

  // open once per session, after the hero has had a moment to paint
  useEffect(() => {
    if (!live) return
    try {
      if (sessionStorage.getItem(POPUP_KEY)) return
      sessionStorage.setItem(POPUP_KEY, "1")
    } catch {}
    const t = setTimeout(() => setOpen(true), 900)
    return () => clearTimeout(t)
  }, [live])

  // esc to close + scroll lock while it's up
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

  if (!live) return null

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
            background: "rgba(9,13,24,0.72)", backdropFilter: "blur(8px)",
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
              position: "relative", width: "100%", maxWidth: 420,
              maxHeight: "92vh", overflow: "hidden",
              borderRadius: 22, background: "#fff",
              boxShadow: "0 30px 90px rgba(0,0,0,0.5)",
            }}
          >
            <div style={{ height: 5, background: TRICOLOR_GRADIENT }} />

            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              style={{
                position: "absolute", top: 16, right: 14, zIndex: 4,
                width: 30, height: 30, borderRadius: "50%",
                background: "#f1f4fa", border: "none", cursor: "pointer",
                color: "#64748b", display: "grid", placeItems: "center",
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>

            <div style={{ position: "relative", zIndex: 1, padding: "26px 24px 24px", textAlign: "center" }}>
              <div style={{
                fontSize: 10.5, fontWeight: 800, letterSpacing: ".14em",
                textTransform: "uppercase", color: TIRANGA.saffron,
              }}>
                {AZAADI_COPY.eyebrow} · India&apos;s {AZAADI_NUMBER}th
              </div>

              <div style={{
                fontSize: 27, fontWeight: 900, color: "#0c1a35",
                marginTop: 10, lineHeight: 1.12, letterSpacing: "-0.03em",
              }}>
                {AZAADI_COPY.passName}
              </div>

              <p style={{ fontSize: 14, color: "#64748b", marginTop: 10, lineHeight: 1.55 }}>
                {AZAADI_COPY.passLine}
              </p>

              {/* live countdown — the number is the whole pitch */}
              {c && !c.over && (
                <div style={{ marginTop: 20 }}>
                  <div className="flex" style={{ gap: 8, justifyContent: "center" }}>
                    <Unit v={pad2(c.h)} label="HRS" />
                    <Unit v={pad2(c.m)} label="MIN" />
                    <Unit v={pad2(c.s)} label="SEC" />
                  </div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", marginTop: 9, letterSpacing: ".08em" }}>
                    THEN IT&apos;S GONE
                  </div>
                </div>
              )}

              <a
                href={AZAADI_COPY.ctaHref}
                style={{
                  display: "block", marginTop: 20,
                  fontSize: 16, fontWeight: 800, color: "#fff", textDecoration: "none",
                  padding: "15px", borderRadius: 14, background: "#1d3a8f",
                  boxShadow: "0 10px 26px rgba(29,58,143,0.30)",
                }}
              >
                {AZAADI_COPY.cta}
              </a>

              <a
                href={AZAADI_COPY.wallHref}
                onClick={() => setOpen(false)}
                style={{
                  display: "block", marginTop: 10,
                  fontSize: 14.5, fontWeight: 700, color: "#1d3a8f", textDecoration: "none",
                  padding: "13px", borderRadius: 14,
                  background: "#fff", border: "1.5px solid #e4e9f2",
                }}
              >
                {AZAADI_COPY.wallPrompt} →
              </a>

              <button
                onClick={() => setOpen(false)}
                style={{
                  marginTop: 14, fontSize: 12.5, fontWeight: 600, color: "#94a3b8",
                  background: "none", border: "none", cursor: "pointer",
                }}
              >
                Maybe later
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Unit({ v, label }: { v: string; label: string }) {
  return (
    <div style={{
      minWidth: 72, padding: "10px 6px", borderRadius: 13,
      background: "#f4f7fd", border: "1px solid #e3eaf7",
    }}>
      <div style={{
        fontSize: 26, fontWeight: 900, color: "#0c1a35",
        fontVariantNumeric: "tabular-nums", letterSpacing: "-0.03em", lineHeight: 1,
      }}>
        {v}
      </div>
      <div style={{ fontSize: 9.5, fontWeight: 800, color: "#94a3b8", marginTop: 5, letterSpacing: ".1em" }}>
        {label}
      </div>
    </div>
  )
}

