"use client"

import { useState, useEffect, useRef, useCallback, type CSSProperties } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  STATUS_UPDATES,
  STATUS_GRADIENTS,
  statusDateLabel,
  type StatusUpdate,
} from "@/lib/status-updates"

const SEEN_KEY = "jobingen_status_seen_v1"
const STORY_MS_TEXT = 7000   // per text status
const STORY_MS_IMAGE = 15000 // posters get more time to read

/* ─────────────────────────────────────────────
   Ring — sits in the navbar. Click to open stories.
   ───────────────────────────────────────────── */
export function StatusRing({ compact = false }: { compact?: boolean }) {
  const [items, setItems] = useState<StatusUpdate[]>(STATUS_UPDATES)
  const [open, setOpen] = useState(false)
  const [seen, setSeen] = useState(true) // assume seen until we read storage (avoids SSR flash)

  const latestId = items[0]?.id ?? ""

  // load admin-managed statuses (falls back to static defaults)
  useEffect(() => {
    let alive = true
    fetch("/api/site-content")
      .then((r) => r.json())
      .then((d) => {
        if (!alive) return
        if (Array.isArray(d?.statuses) && d.statuses.length) setItems(d.statuses)
      })
      .catch(() => {})
    return () => { alive = false }
  }, [])

  useEffect(() => {
    if (!latestId) return
    try {
      const raw = localStorage.getItem(SEEN_KEY)
      setSeen(raw === latestId)
    } catch {
      setSeen(false)
    }
  }, [latestId])

  const markSeen = useCallback(() => {
    try { localStorage.setItem(SEEN_KEY, latestId) } catch {}
    setSeen(true)
  }, [latestId])

  if (items.length === 0) return null

  const size = compact ? 30 : 34
  // green ring = new/unseen update, muted brand-grey once seen
  const ringBg = seen
    ? "#d7dced"
    : "conic-gradient(from 210deg,#16a34a,#22c55e,#4ade80,#22c55e,#16a34a)"

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Jobingen daily updates"
        className="status-ring-btn"
        style={{
          position: "relative", flexShrink: 0,
          width: size, height: size, borderRadius: "50%",
          padding: seen ? 1.5 : 2, border: "none", cursor: "pointer",
          background: ringBg,
          display: "grid", placeItems: "center",
        }}
      >
        <span style={{
          width: "100%", height: "100%", borderRadius: "50%",
          background: "#fff", display: "grid", placeItems: "center",
          padding: 1.5,
        }}>
          <span style={{
            width: "100%", height: "100%", borderRadius: "50%",
            background: "#0c1a35",
            display: "grid", placeItems: "center",
            color: "#fff",
          }}>
            {/* sparkle = "updates" */}
            <svg width={compact ? 13 : 15} height={compact ? 13 : 15} viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l1.9 5.6L19.5 9l-5.6 1.9L12 16.5l-1.9-5.6L4.5 9l5.6-1.4L12 2z" opacity="0.95" />
              <circle cx="18.5" cy="17.5" r="1.6" />
            </svg>
          </span>
        </span>

        {/* tiny green "new update" dot */}
        {!seen && (
          <span style={{
            position: "absolute", top: -1, right: -1,
            width: 9, height: 9, borderRadius: 999,
            background: "#22c55e", border: "2px solid #fff",
          }} />
        )}
      </button>

      <AnimatePresence>
        {open && (
          <StatusViewer
            items={items}
            onClose={() => setOpen(false)}
            onSeen={markSeen}
          />
        )}
      </AnimatePresence>

      <style>{`
        .status-ring-btn { transition: transform .18s cubic-bezier(.22,1,.36,1); }
        .status-ring-btn:hover { transform: scale(1.06); }
        .status-ring-btn:active { transform: scale(.96); }
      `}</style>
    </>
  )
}

/* ─────────────────────────────────────────────
   Full-screen story viewer
   ───────────────────────────────────────────── */
function StatusViewer({ items, onClose, onSeen }: { items: StatusUpdate[]; onClose: () => void; onSeen: () => void }) {
  const [idx, setIdx] = useState(0)
  const [progress, setProgress] = useState(0)
  const [paused, setPaused] = useState(false)
  const rafRef = useRef<number | null>(null)
  const startRef = useRef<number>(0)
  const elapsedRef = useRef<number>(0)

  const count = items.length
  const status = items[idx]
  const hasImage = !!status.image

  // keep latest idx in a ref so goNext can decide to close WITHOUT
  // calling setState inside a state-updater (that runs during render).
  const idxRef = useRef(0)
  useEffect(() => { idxRef.current = idx }, [idx])

  const goNext = useCallback(() => {
    if (idxRef.current + 1 >= count) { onClose(); return }
    setIdx((i) => i + 1)
  }, [count, onClose])

  const goPrev = useCallback(() => {
    setIdx((i) => Math.max(0, i - 1))
  }, [])

  // mark seen once opened
  useEffect(() => { onSeen() }, [onSeen])

  // progress / auto-advance loop
  useEffect(() => {
    setProgress(0)
    elapsedRef.current = 0
    startRef.current = 0

    const durationMs = hasImage ? STORY_MS_IMAGE : STORY_MS_TEXT

    const tick = (ts: number) => {
      if (startRef.current === 0) startRef.current = ts
      if (!paused) {
        const now = elapsedRef.current + (ts - startRef.current)
        const p = Math.min(1, now / durationMs)
        setProgress(p)
        if (p >= 1) { goNext(); return }
      } else {
        // keep resetting the anchor so paused time isn't counted
        elapsedRef.current += ts - startRef.current
        startRef.current = ts
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx, paused, goNext])

  // keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      else if (e.key === "ArrowRight") goNext()
      else if (e.key === "ArrowLeft") goPrev()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [onClose, goNext, goPrev])

  // lock scroll
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = prev }
  }, [])

  const linkHref = status.cta?.href

  if (typeof document === "undefined") return null

  // Portal to <body> so the overlay escapes the navbar's backdrop-filter
  // containing block (otherwise `position:fixed` anchors to the header).
  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 200,
        background: "rgba(9,13,24,0.82)",
        backdropFilter: "blur(12px)",
        display: "grid", placeItems: "center", padding: 16,
      }}
    >
      <motion.div
        key="card"
        initial={{ scale: 0.94, y: 14, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.96, y: 10, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
        onPointerDown={() => setPaused(true)}
        onPointerUp={() => setPaused(false)}
        onPointerLeave={() => setPaused(false)}
        style={{
          position: "relative",
          width: hasImage ? "fit-content" : "min(400px, 94vw)",
          height: hasImage ? "auto" : "min(680px, 86svh)",
          maxWidth: "94vw",
          borderRadius: 22, overflow: "hidden",
          background: hasImage ? "#0b1220" : STATUS_GRADIENTS[status.gradient],
          boxShadow: "0 24px 70px rgba(0,0,0,0.5)",
          display: "flex", flexDirection: "column",
          userSelect: "none",
        }}
      >
        {/* ── POSTER (image status) ── */}
        {hasImage ? (
          <a
            href={linkHref}
            onClick={(e) => { if (!linkHref) e.preventDefault(); else onClose() }}
            style={{ display: "block", cursor: linkHref ? "pointer" : "default" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={status.image}
              alt={status.title || status.tag}
              draggable={false}
              style={{
                display: "block", width: "auto", height: "auto",
                maxWidth: "min(440px, 94vw)", maxHeight: "86svh",
              }}
            />
          </a>
        ) : (
          <>
            {/* bottom scrim for text legibility */}
            <div style={{
              position: "absolute", inset: 0, pointerEvents: "none",
              background: "linear-gradient(180deg,rgba(0,0,0,0.22) 0%,transparent 24%,transparent 50%,rgba(0,0,0,0.5) 100%)",
            }} />
            {/* tap zones (text stories) */}
            <button onClick={goPrev} aria-label="Previous" style={tapZone("left")} />
            <button onClick={goNext} aria-label="Next" style={tapZone("right")} />
          </>
        )}

        {/* ── Top overlay: progress + brand + close (both modes) ── */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, zIndex: 6,
          paddingBottom: 26,
          background: "linear-gradient(180deg,rgba(0,0,0,0.5) 0%,rgba(0,0,0,0.18) 55%,transparent 100%)",
          pointerEvents: "none",
        }}>
          {/* progress segments */}
          <div style={{ display: "flex", gap: 4, padding: "11px 12px 0" }}>
            {items.map((_, i) => (
              <div key={i} style={{
                flex: 1, height: 2.5, borderRadius: 2,
                background: "rgba(255,255,255,0.35)", overflow: "hidden",
              }}>
                <div style={{
                  height: "100%", borderRadius: 2, background: "#fff",
                  width: i < idx ? "100%" : i === idx ? `${progress * 100}%` : "0%",
                  transition: i === idx ? "none" : "width .2s",
                }} />
              </div>
            ))}
          </div>

          {/* brand row */}
          <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "11px 12px 0", pointerEvents: "auto" }}>
            <div style={{
              width: 30, height: 30, borderRadius: "50%",
              background: "#0c1a35", border: "1.5px solid rgba(255,255,255,0.55)",
              display: "grid", placeItems: "center", color: "#fff", flexShrink: 0,
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l1.9 5.6L19.5 9l-5.6 1.9L12 16.5l-1.9-5.6L4.5 9l5.6-1.4L12 2z" />
              </svg>
            </div>
            <div style={{ lineHeight: 1.2 }}>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: 13.5, textShadow: "0 1px 3px rgba(0,0,0,.4)" }}>Jobingen Daily</div>
              <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 11, textShadow: "0 1px 3px rgba(0,0,0,.4)" }}>
                {statusDateLabel(status.date)}
              </div>
            </div>
            <button
              onClick={onClose}
              aria-label="Close"
              style={{
                marginLeft: "auto", background: "rgba(0,0,0,0.35)", backdropFilter: "blur(4px)",
                border: "none", borderRadius: "50%", width: 32, height: 32,
                cursor: "pointer", color: "#fff", display: "grid", placeItems: "center",
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* ── Nav chevrons (only when multiple) ── */}
        {count > 1 && (
          <>
            <ChevronBtn side="left" disabled={idx === 0} onClick={(e) => { e.stopPropagation(); goPrev() }} />
            <ChevronBtn side="right" onClick={(e) => { e.stopPropagation(); goNext() }} />
          </>
        )}

        {/* ── Text content (text status only) ── */}
        {!hasImage && (
          <div style={{ position: "relative", zIndex: 5, marginTop: "auto", padding: "0 22px 26px" }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={status.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                <span style={{
                  display: "inline-block", padding: "5px 11px", borderRadius: 999,
                  background: "rgba(255,255,255,0.92)", color: "#111a30",
                  fontSize: 11.5, fontWeight: 800, letterSpacing: ".02em",
                  textTransform: "uppercase", marginBottom: 14,
                }}>{status.tag}</span>

                <h2 style={{
                  color: "#fff", fontWeight: 800, fontSize: 26,
                  lineHeight: 1.16, letterSpacing: "-0.02em", margin: 0,
                }}>{status.title}</h2>

                <p style={{
                  color: "rgba(255,255,255,0.9)", fontSize: 15,
                  lineHeight: 1.5, marginTop: 12,
                }}>{status.body}</p>

                {status.cta && (
                  <a
                    href={status.cta.href}
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      display: "inline-flex", alignItems: "center", gap: 7,
                      marginTop: 18, padding: "12px 22px", borderRadius: 999,
                      background: "#fff", color: "#111a30",
                      fontWeight: 700, fontSize: 14.5, textDecoration: "none",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.28)",
                    }}
                  >
                    {status.cta.label}
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </a>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {/* ── "Tap to apply" hint (image status with link) ── */}
        {hasImage && linkHref && (
          <div style={{
            position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)",
            zIndex: 6, display: "flex", alignItems: "center", gap: 6,
            padding: "7px 15px", borderRadius: 999,
            background: "rgba(255,255,255,0.95)", color: "#0c1a35",
            fontSize: 12.5, fontWeight: 800, whiteSpace: "nowrap",
            boxShadow: "0 6px 20px rgba(0,0,0,0.3)", pointerEvents: "none",
          }}>
            Tap to open
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </div>
        )}
      </motion.div>
    </motion.div>,
    document.body
  )
}

function ChevronBtn({ side, onClick, disabled }: { side: "left" | "right"; onClick: (e: React.MouseEvent) => void; disabled?: boolean }) {
  return (
    <button
      onClick={onClick}
      aria-label={side === "left" ? "Previous" : "Next"}
      style={{
        position: "absolute", top: "50%", transform: "translateY(-50%)",
        [side]: 10, zIndex: 6,
        width: 34, height: 34, borderRadius: "50%",
        background: "rgba(0,0,0,0.32)", backdropFilter: "blur(4px)",
        border: "none", cursor: disabled ? "default" : "pointer",
        color: "#fff", display: "grid", placeItems: "center",
        opacity: disabled ? 0.3 : 1, transition: "opacity .2s",
      } as CSSProperties}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d={side === "left" ? "m15 18-6-6 6-6" : "m9 18 6-6-6-6"} />
      </svg>
    </button>
  )
}

function tapZone(side: "left" | "right"): CSSProperties {
  return {
    position: "absolute", top: 60, bottom: 0, zIndex: 4,
    [side]: 0, width: side === "left" ? "32%" : "68%",
    background: "transparent", border: "none", cursor: "pointer",
  } as CSSProperties
}
