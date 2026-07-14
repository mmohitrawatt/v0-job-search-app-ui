"use client"

import { useRef, useEffect } from "react"

/* Interactive particle field — small colourful dashes that idle-drift and
   smoothly flow away from the cursor, aligning to the field like magnetic
   filings (Google-Antigravity-style hero background).

   Smoothness comes from a displacement model: every frame each particle eases
   toward `home + cursorPush`, and its angle eases toward the field direction —
   no velocity accumulation, so it never jitters. Pointer-events none. */

const COLORS = ["#4668f5", "#3b5bdb", "#1d3a8f", "#7c3aed", "#e11d48", "#f59e0b", "#16a34a"]

type P = {
  homeX: number; homeY: number
  x: number; y: number
  len: number; ang: number; restAng: number
  phase: number; drift: number
  color: string
}

export function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let W = 0, H = 0, raf = 0, t = 0
    let ps: P[] = []

    // raw + eased cursor (easing the cursor makes the whole field glide)
    const rawM = { x: -9999, y: -9999 }
    const m = { x: -9999, y: -9999 }

    const build = () => {
      const parent = canvas.parentElement
      if (!parent) return
      W = parent.clientWidth
      H = parent.clientHeight
      canvas.width = W * dpr
      canvas.height = H * dpr
      canvas.style.width = W + "px"
      canvas.style.height = H + "px"
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = Math.min(320, Math.floor((W * H) / 4800))
      ps = Array.from({ length: count }, () => {
        const x = Math.random() * W
        const y = Math.random() * H
        const restAng = Math.random() * Math.PI
        return {
          homeX: x, homeY: y, x, y,
          len: 1.5 + Math.random() * 2.5,
          ang: restAng, restAng,
          phase: Math.random() * Math.PI * 2,
          drift: 2 + Math.random() * 3,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        }
      })
    }

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect()
      rawM.x = e.clientX - r.left
      rawM.y = e.clientY - r.top
      if (m.x < -9000) { m.x = rawM.x; m.y = rawM.y } // snap on first enter
    }
    const onLeave = () => { rawM.x = -9999; rawM.y = -9999 }

    const R = 175        // influence radius
    const PUSH = 46      // max displacement in px

    // keep-out fade: hide particles over the centred headline / subtext / CTA
    // column (the empty side-gutters stay full of particles). Returns 0..1.
    const smooth = (v: number) => { const u = Math.max(0, Math.min(1, v)); return u * u * (3 - 2 * u) }
    const contentFade = (x: number, y: number) => {
      const cx = W / 2
      const halfW = Math.min(W * 0.34, 540)
      const topY = H * 0.52 // below the cards graphic
      const insideX = 1 - smooth((Math.abs(x - cx) - (halfW - 90)) / 90) // 1 inside band
      const belowTop = smooth((y - topY) / 50)                            // 1 below headline start
      return 1 - insideX * belowTop
    }
    const drawStatic = () => {
      ctx.clearRect(0, 0, W, H)
      ctx.lineCap = "round"
      for (const p of ps) {
        const fade = contentFade(p.x, p.y)
        if (fade <= 0.01) continue
        const c = Math.cos(p.ang) * p.len / 2
        const s = Math.sin(p.ang) * p.len / 2
        ctx.strokeStyle = p.color
        ctx.globalAlpha = 0.42 * fade
        ctx.lineWidth = 1.1
        ctx.beginPath()
        ctx.moveTo(p.x - c, p.y - s)
        ctx.lineTo(p.x + c, p.y + s)
        ctx.stroke()
      }
      ctx.globalAlpha = 1
    }

    const tick = () => {
      t += 0.016
      // ease cursor toward raw pointer
      if (rawM.x < -9000) { m.x = -9999; m.y = -9999 }
      else { m.x += (rawM.x - m.x) * 0.18; m.y += (rawM.y - m.y) * 0.18 }

      ctx.clearRect(0, 0, W, H)
      ctx.lineCap = "round"

      for (const p of ps) {
        // gentle idle drift around home
        const idleX = Math.cos(t * 0.5 + p.phase) * p.drift
        const idleY = Math.sin(t * 0.6 + p.phase) * p.drift

        // cursor push (smoothstep falloff for buttery edges)
        const dx = (p.homeX + idleX) - m.x
        const dy = (p.homeY + idleY) - m.y
        const dist = Math.hypot(dx, dy) || 0.001
        let infl = 0
        if (m.x > -9000 && dist < R) {
          const u = 1 - dist / R
          infl = u * u * (3 - 2 * u) // smoothstep
        }
        const nx = dx / dist, ny = dy / dist
        const targetX = p.homeX + idleX + nx * PUSH * infl
        const targetY = p.homeY + idleY + ny * PUSH * infl

        // ease position toward target — the key to the smooth glide
        p.x += (targetX - p.x) * 0.16
        p.y += (targetY - p.y) * 0.16

        // ease angle: align to field (point away from cursor) when engaged,
        // else drift back to rest — shortest-path so it never spins the long way
        const targetAng = infl > 0.02 ? Math.atan2(ny, nx) : p.restAng
        let da = targetAng - p.ang
        da = ((da + Math.PI * 1.5) % (Math.PI)) - Math.PI * 0.5 // wrap for 180° symmetric dash
        p.ang += da * (0.06 + infl * 0.22)

        const fade = contentFade(p.x, p.y)
        if (fade <= 0.01) continue
        const boost = 1 + infl * 1.15
        const half = (p.len / 2) * boost
        const c = Math.cos(p.ang) * half
        const s = Math.sin(p.ang) * half
        ctx.strokeStyle = p.color
        ctx.globalAlpha = Math.min(0.85, 0.4 + infl * 0.5) * fade
        ctx.lineWidth = 1.1 * boost
        ctx.beginPath()
        ctx.moveTo(p.x - c, p.y - s)
        ctx.lineTo(p.x + c, p.y + s)
        ctx.stroke()
      }
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(tick)
    }

    build()
    if (reduce) {
      drawStatic()
    } else {
      tick()
      window.addEventListener("mousemove", onMove)
      window.addEventListener("mouseleave", onLeave)
    }
    window.addEventListener("resize", build)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseleave", onLeave)
      window.removeEventListener("resize", build)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}
    />
  )
}
