"use client"

/* ─────────────────────────────────────────────────────────────
   Azaadi — Independence Week theming primitives.

   Restraint is the brief: navy stays the brand, saffron + green
   are accents only. Every export is inert outside the campaign
   window (see lib/campaign.ts), so these can stay mounted in the
   page permanently and simply stop rendering on 18 Aug.
   ───────────────────────────────────────────────────────────── */

import { useEffect, useState } from "react"
import {
  AZAADI_COPY, TIRANGA, TRICOLOR_GRADIENT,
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

/** Live 79 → 00 countdown. Returns null until mounted. */
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
          background: TRICOLOR_GRADIENT,
          boxShadow: "0 1px 6px rgba(255,153,51,0.35)",
          transformOrigin: "left center",
          animation: `az-draw .9s cubic-bezier(.16,1,.3,1) ${delay}s both`,
        }}
      />
    </div>
  )
}

/* ─── Chakra ghost — 24 spokes, brand navy, ~4% opacity, one rotation a
   minute. You notice it on the second look. That's the point. ─── */
export function ChakraGhost({ size = 620, opacity = 0.045 }: { size?: number; opacity?: number }) {
  const live = useAzaadi()
  const [reduce, setReduce] = useState(false)
  useEffect(() => {
    setReduce(window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false)
  }, [])
  if (!live) return null

  const spokes = Array.from({ length: 24 }, (_, i) => i * 15)
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute", top: "-8%", left: "50%", zIndex: 0,
        width: size, height: size, marginLeft: -size / 2,
        pointerEvents: "none", opacity,
      }}
    >
      <style>{`@keyframes az-spin { to { transform: rotate(360deg) } }`}</style>
      <svg
        viewBox="0 0 200 200"
        width="100%" height="100%"
        style={reduce ? undefined : { animation: "az-spin 60s linear infinite" }}
      >
        <g stroke={TIRANGA.chakra} fill="none" strokeWidth="1.4">
          <circle cx="100" cy="100" r="92" strokeWidth="3" />
          <circle cx="100" cy="100" r="10" strokeWidth="3" />
          {spokes.map((deg) => (
            <line key={deg} x1="100" y1="100" x2="100" y2="10" transform={`rotate(${deg} 100 100)`} />
          ))}
        </g>
      </svg>
    </div>
  )
}

/* ─── The Freedom Pass strip — eyebrow, live countdown, two CTAs.
   Sits at the very top of the hero (inside normal flow), so it never
   fights the fixed navbar for space. ─── */
export function AzaadiBar() {
  const live = useAzaadi()
  const c = useCountdown()
  if (!live || !c || c.over) return null

  return (
    <div className="px-4 lg:px-8" style={{ position: "relative", zIndex: 2, paddingTop: 14 }}>
      <div
        style={{
          maxWidth: 1080, margin: "0 auto",
          borderRadius: 18, overflow: "hidden",
          background: "#fff",
          border: "1px solid #e8edf7",
          boxShadow: "0 10px 34px rgba(15,23,42,0.07)",
        }}
      >
        {/* tricolor cap — the only place the flag is literal */}
        <div style={{ height: 4, background: TRICOLOR_GRADIENT }} />

        <div
          className="flex flex-col sm:flex-row sm:items-center"
          style={{ gap: 14, padding: "14px 18px" }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontSize: 10.5, fontWeight: 800, letterSpacing: ".14em",
              textTransform: "uppercase", color: TIRANGA.saffron,
            }}>
              {AZAADI_COPY.eyebrow}
            </div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#0c1a35", marginTop: 3, lineHeight: 1.25 }}>
              {AZAADI_COPY.passName}
            </div>
            <div style={{ fontSize: 13, color: "#64748b", marginTop: 3, lineHeight: 1.45 }}>
              {AZAADI_COPY.passLine}
            </div>
          </div>

          {/* countdown — the number IS the story, so give it room */}
          <div
            style={{
              display: "flex", alignItems: "baseline", gap: 3,
              padding: "8px 14px", borderRadius: 12,
              background: "#f4f7fd", border: "1px solid #e3eaf7",
              fontVariantNumeric: "tabular-nums",
              color: "#0c1a35", fontWeight: 900, fontSize: 20, letterSpacing: "-0.02em",
              alignSelf: "flex-start",
            }}
          >
            {pad2(c.h)}<Sep />{pad2(c.m)}<Sep />{pad2(c.s)}
            <span style={{ fontSize: 10, fontWeight: 700, color: "#8492ad", marginLeft: 6, letterSpacing: ".06em" }}>
              LEFT
            </span>
          </div>

          <div className="flex items-center" style={{ gap: 8, flexWrap: "wrap" }}>
            <a
              href={AZAADI_COPY.ctaHref}
              style={{
                fontSize: 14, fontWeight: 800, color: "#fff", textDecoration: "none",
                padding: "12px 18px", borderRadius: 12, background: "#1d3a8f",
                boxShadow: "0 6px 18px rgba(29,58,143,0.26)", whiteSpace: "nowrap",
              }}
            >
              {AZAADI_COPY.cta}
            </a>
            <a
              href={AZAADI_COPY.wallHref}
              style={{
                fontSize: 14, fontWeight: 700, color: "#1d3a8f", textDecoration: "none",
                padding: "12px 16px", borderRadius: 12,
                background: "#fff", border: "1.5px solid #e4e9f2", whiteSpace: "nowrap",
              }}
            >
              Freedom Wall →
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

function Sep() {
  return <span style={{ color: "#c3cee2", fontWeight: 700, margin: "0 1px" }}>:</span>
}
