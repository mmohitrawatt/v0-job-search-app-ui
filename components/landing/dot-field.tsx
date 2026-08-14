"use client"

import { useEffect, useRef, useId, memo } from "react"

/* Interactive dot-grid field (React Bits DotField, adapted).
   A canvas grid of dots that bulge away from the cursor with a soft glow
   following it. Light-theme defaults: navy dots on white. Desktop-only —
   on touch / small screens the rAF loop is skipped entirely. */

const TWO_PI = Math.PI * 2

type Dot = { ax: number; ay: number; sx: number; sy: number; vx: number; vy: number; x: number; y: number }

type DotFieldProps = {
  dotRadius?: number
  dotSpacing?: number
  cursorRadius?: number
  cursorForce?: number
  bulgeOnly?: boolean
  bulgeStrength?: number
  glowRadius?: number
  sparkle?: boolean
  waveAmplitude?: number
  gradientFrom?: string
  gradientTo?: string
  glowColor?: string
  className?: string
  style?: React.CSSProperties
}

export const DotField = memo(function DotField({
  dotRadius = 1.5,
  dotSpacing = 14,
  cursorRadius = 500,
  cursorForce = 0.1,
  bulgeOnly = true,
  bulgeStrength = 67,
  glowRadius = 160,
  sparkle = false,
  waveAmplitude = 0,
  gradientFrom = "rgba(29,58,143,0.30)",
  gradientTo = "rgba(70,104,245,0.16)",
  glowColor = "rgba(29,58,143,0.10)",
  className,
  style,
}: DotFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const glowRef = useRef<SVGCircleElement>(null)
  const dotsRef = useRef<Dot[]>([])
  const mouseRef = useRef({ x: -9999, y: -9999, prevX: -9999, prevY: -9999, speed: 0 })
  const rafRef = useRef(0)
  const sizeRef = useRef({ w: 0, h: 0, offsetX: 0, offsetY: 0 })
  const glowOpacity = useRef(0)
  const engagement = useRef(0)
  const propsRef = useRef({ dotRadius, dotSpacing, cursorRadius, cursorForce, bulgeOnly, bulgeStrength, sparkle, waveAmplitude, gradientFrom, gradientTo })
  propsRef.current = { dotRadius, dotSpacing, cursorRadius, cursorForce, bulgeOnly, bulgeStrength, sparkle, waveAmplitude, gradientFrom, gradientTo }
  const rebuildRef = useRef<(() => void) | null>(null)
  const glowId = useId()

  useEffect(() => {
    const canvas = canvasRef.current
    const glowEl = glowRef.current
    if (!canvas) return

    // Cursor-interaction effect: skip on touch / small screens (constant rAF drain, no value)
    const isTouchOrSmall = window.innerWidth < 1024 ||
      (window.matchMedia?.("(hover: none)").matches ?? false)
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false
    if (isTouchOrSmall || reduce) return

    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    let resizeTimer: ReturnType<typeof setTimeout> | undefined

    function resize() {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(doResize, 100)
    }

    function doResize() {
      if (!canvas || !ctx || !canvas.parentElement) return
      const rect = canvas.parentElement.getBoundingClientRect()
      const w = rect.width
      const h = rect.height

      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      sizeRef.current = {
        w,
        h,
        offsetX: rect.left + window.scrollX,
        offsetY: rect.top + window.scrollY,
      }

      buildDots(w, h)
      idle = false // canvas was cleared by the resize — force a redraw
    }

    function buildDots(w: number, h: number) {
      const p = propsRef.current
      const step = p.dotRadius + p.dotSpacing
      const cols = Math.floor(w / step)
      const rows = Math.floor(h / step)
      const padX = (w % step) / 2
      const padY = (h % step) / 2
      const dots: Dot[] = new Array(rows * cols)
      let idx = 0

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const ax = padX + col * step + step / 2
          const ay = padY + row * step + step / 2
          dots[idx++] = { ax, ay, sx: ax, sy: ay, vx: 0, vy: 0, x: ax, y: ay }
        }
      }
      dotsRef.current = dots
    }

    function onMouseMove(e: MouseEvent) {
      const s = sizeRef.current
      mouseRef.current.x = e.pageX - s.offsetX
      mouseRef.current.y = e.pageY - s.offsetY
    }

    function updateMouseSpeed() {
      const m = mouseRef.current
      const dx = m.prevX - m.x
      const dy = m.prevY - m.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      m.speed += (dist - m.speed) * 0.5
      if (m.speed < 0.001) m.speed = 0
      m.prevX = m.x
      m.prevY = m.y
    }

    const speedInterval = setInterval(updateMouseSpeed, 20)

    let frameCount = 0
    // cached background gradient — rebuilding it every frame is wasteful
    let cachedGrad: CanvasGradient | null = null
    let gradKey = ""
    // when the field is fully at rest we draw one last frame and then skip
    // all per-dot work until the cursor engages again
    let idle = false

    function tick() {
      if (!ctx) return
      frameCount++
      const dots = dotsRef.current
      const m = mouseRef.current
      const { w, h } = sizeRef.current
      const p = propsRef.current
      const len = dots.length
      const t = frameCount * 0.02

      const targetEngagement = Math.min(m.speed / 5, 1)
      engagement.current += (targetEngagement - engagement.current) * 0.06
      if (engagement.current < 0.001) engagement.current = 0
      const eng = engagement.current

      const animating = p.sparkle || p.waveAmplitude > 0

      // fully at rest and already drawn → skip all per-dot work this frame
      if (idle && eng === 0 && !animating) {
        rafRef.current = requestAnimationFrame(tick)
        return
      }

      glowOpacity.current += (eng - glowOpacity.current) * 0.08

      if (glowEl) {
        glowEl.setAttribute("cx", String(m.x))
        glowEl.setAttribute("cy", String(m.y))
        glowEl.style.opacity = String(glowOpacity.current)
      }

      ctx.clearRect(0, 0, w, h)

      const gk = `${w}|${h}|${p.gradientFrom}|${p.gradientTo}`
      if (gk !== gradKey || !cachedGrad) {
        cachedGrad = ctx.createLinearGradient(0, 0, w, h)
        cachedGrad.addColorStop(0, p.gradientFrom)
        cachedGrad.addColorStop(1, p.gradientTo)
        gradKey = gk
      }
      ctx.fillStyle = cachedGrad

      const cr = p.cursorRadius
      const crSq = cr * cr
      const rad = p.dotRadius / 2
      const size = rad * 2
      const isBulge = p.bulgeOnly
      // tiny dots read identically as squares — rect() is far cheaper than arc()
      const useRect = rad <= 1.25
      let maxOff = 0

      ctx.beginPath()

      for (let i = 0; i < len; i++) {
        const d = dots[i]
        const dx = m.x - d.ax
        const dy = m.y - d.ay
        const distSq = dx * dx + dy * dy

        if (distSq < crSq && eng > 0.01) {
          const dist = Math.sqrt(distSq)
          if (isBulge) {
            const f = 1 - dist / cr
            const push = (f * f * p.bulgeStrength * eng) / (dist || 1)
            d.sx += (d.ax - dx * push - d.sx) * 0.15
            d.sy += (d.ay - dy * push - d.sy) * 0.15
          } else {
            const move = (500 / (dist * dist || 1)) * (m.speed * p.cursorForce)
            d.vx -= dx * move
            d.vy -= dy * move
          }
        } else if (isBulge) {
          const ox = d.ax - d.sx
          const oy = d.ay - d.sy
          // settled dots don't need easing — snap and skip the math
          if (ox > 0.05 || ox < -0.05 || oy > 0.05 || oy < -0.05) {
            d.sx += ox * 0.1
            d.sy += oy * 0.1
          } else {
            d.sx = d.ax
            d.sy = d.ay
          }
        }

        if (!isBulge) {
          d.vx *= 0.9
          d.vy *= 0.9
          d.x = d.ax + d.vx
          d.y = d.ay + d.vy
          d.sx += (d.x - d.sx) * 0.1
          d.sy += (d.y - d.sy) * 0.1
        }

        const ax2 = d.sx - d.ax
        const ay2 = d.sy - d.ay
        const off = (ax2 > 0 ? ax2 : -ax2) + (ay2 > 0 ? ay2 : -ay2)
        if (off > maxOff) maxOff = off

        let drawX = d.sx
        let drawY = d.sy
        if (p.waveAmplitude > 0) {
          drawY += Math.sin(d.ax * 0.03 + t) * p.waveAmplitude
          drawX += Math.cos(d.ay * 0.03 + t * 0.7) * p.waveAmplitude * 0.5
        }

        let r = rad
        let s = size
        if (p.sparkle) {
          const hash = ((i * 2654435761) ^ (frameCount >> 3)) >>> 0
          if (hash % 100 < 3) {
            r = rad * 1.8
            s = r * 2
          }
        }

        if (useRect) {
          ctx.rect(drawX - r, drawY - r, s, s)
        } else {
          ctx.moveTo(drawX + r, drawY)
          ctx.arc(drawX, drawY, r, 0, TWO_PI)
        }
      }

      ctx.fill()

      // everything settled → next frames can be skipped until the cursor moves
      idle = eng === 0 && maxOff < 0.05 && !animating

      rafRef.current = requestAnimationFrame(tick)
    }

    doResize()
    window.addEventListener("resize", resize)
    window.addEventListener("mousemove", onMouseMove, { passive: true })
    rafRef.current = requestAnimationFrame(tick)

    rebuildRef.current = () => {
      const { w, h } = sizeRef.current
      if (w > 0 && h > 0) buildDots(w, h)
    }

    return () => {
      cancelAnimationFrame(rafRef.current)
      clearInterval(speedInterval)
      clearTimeout(resizeTimer)
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", onMouseMove)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    rebuildRef.current?.()
  }, [dotRadius, dotSpacing])

  return (
    <div
      className={className}
      style={{ position: "absolute", inset: 0, pointerEvents: "none", ...style }}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      />
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
        <defs>
          <radialGradient id={glowId}>
            <stop offset="0%" stopColor={glowColor} />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <circle
          ref={glowRef}
          cx="-9999"
          cy="-9999"
          r={glowRadius}
          fill={`url(#${glowId})`}
          style={{ opacity: 0, willChange: "opacity" }}
        />
      </svg>
    </div>
  )
})
