"use client"

/* ─── Product showcase — permanent desktop, spinning screens ───
   A black-stroked desktop monitor stays fixed (pinned). Inside it, the
   product screens swap on scroll with a left/right 3D spin — the active
   screen sits flat & centered while neighbours turn and slide away. */

import { useState, useRef, useEffect } from "react"
import Link from "next/link"

const VH_PER = 125 // scroll (vh) per screen
const ACCENT = "#1d3a8f"
const ACCENT_BG = "#eef2fb"
const GRAD = "#1d3a8f"

type Feature = { file: string; tab: string; cta: string; href: string; icon: React.ReactNode }
const ico = (children: React.ReactNode) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{children}</svg>
)

const FEATURES: Feature[] = [
  { file: "resume-builder.png", tab: "Resume", cta: "Build a Resume with AI", href: "https://ai.jobingen.com/editor/6a564f128eb99890c0bf072a", icon: ico(<><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8"/></>) },
  { file: "mock-interview.png", tab: "Interview", cta: "Start a Mock Interview", href: "https://ai.jobingen.com/interview", icon: ico(<><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v3"/></>) },
  { file: "think-print.png", tab: "ThinkPrint", cta: "Take an Assessment", href: "https://ai.jobingen.com/dashboard", icon: ico(<><path d="M12 2a10 10 0 0 0-4 19.2M12 2a10 10 0 0 1 4 19.2M12 6v6l3 2"/></>) },
  { file: "mentors.png", tab: "Mentors", cta: "Find a Mentor", href: "https://ai.jobingen.com/mentors", icon: ico(<><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13A4 4 0 0 1 16 11"/></>) },
  { file: "jobengine.png", tab: "JobEngine", cta: "Browse Jobs", href: "https://ai.jobingen.com/dashboard", icon: ico(<><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></>) },
]
const N = FEATURES.length

export function ProductShowcase() {
  const outerRef = useRef<HTMLDivElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const monitorRef = useRef<HTMLDivElement>(null)
  const screensRef = useRef<(HTMLDivElement | null)[]>([])
  const activeRef = useRef(0)
  const [active, setActive] = useState(0)
  const f = FEATURES[active] ?? FEATURES[0]

  // Cursor-magnetic tilt: the monitor leans toward the pointer
  useEffect(() => {
    const pin = pinRef.current, mon = monitorRef.current
    // desktop-only: the pinned monitor is hidden below lg — don't run rAF on mobile
    if (window.innerWidth < 1024) return
    if (!pin || !mon || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0
    const onMove = (e: MouseEvent) => {
      const r = pin.getBoundingClientRect()
      tx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2)
      ty = (e.clientY - (r.top + r.height / 2)) / (r.height / 2)
    }
    const onLeave = () => { tx = 0; ty = 0 }
    const loop = () => {
      cx += (tx - cx) * 0.08
      cy += (ty - cy) * 0.08
      mon.style.transform = `rotateX(${(-cy * 6).toFixed(2)}deg) rotateY(${(cx * 10).toFixed(2)}deg) translate3d(${(cx * 14).toFixed(1)}px, ${(cy * 10).toFixed(1)}px, 0)`
      raf = requestAnimationFrame(loop)
    }
    pin.addEventListener("mousemove", onMove)
    pin.addEventListener("mouseleave", onLeave)
    loop()
    return () => { pin.removeEventListener("mousemove", onMove); pin.removeEventListener("mouseleave", onLeave); if (raf) cancelAnimationFrame(raf) }
  }, [])

  useEffect(() => {
    const outer = outerRef.current
    if (!outer) return
    // desktop-only: the scroll-driven monitor is hidden below lg — skip the rAF loop on mobile
    if (window.innerWidth < 1024) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let target = 0, cur = 0, raf = 0
    const measure = () => {
      const vh = window.innerHeight || 1
      const top = outer.getBoundingClientRect().top + window.scrollY
      const total = outer.offsetHeight - vh
      const p = Math.max(0, Math.min(1, (window.scrollY - top) / (total || 1)))
      // step-ease: hold on each screen, then a quick smooth spin to the next
      const raw = p * (N - 1)
      const seg = Math.min(N - 1, Math.floor(raw))
      const hold = 0.56
      let fr = raw - seg
      fr = fr < hold ? 0 : (fr - hold) / (1 - hold)
      fr = fr * fr * (3 - 2 * fr)
      target = seg + fr
    }
    const apply = (pos: number) => {
      screensRef.current.forEach((s, i) => {
        if (!s) return
        const o = pos - i // 0 = centered/active
        const ao = Math.abs(o)
        if (reduce) {
          s.style.transform = "translateX(0)"
          s.style.opacity = ao < 0.5 ? "1" : "0"
          s.style.zIndex = ao < 0.5 ? "20" : "1"
          return
        }
        const tx = -o * 100
        const ry = o * 34
        const tz = -Math.min(ao, 1.4) * 260
        const op = Math.max(0, 1 - ao * 1.05)
        s.style.transform = `translateX(${tx.toFixed(2)}%) translateZ(${tz.toFixed(0)}px) rotateY(${ry.toFixed(2)}deg)`
        s.style.opacity = op.toFixed(3)
        s.style.zIndex = String(20 - Math.round(ao * 5))
      })
      const idx = Math.max(0, Math.min(N - 1, Math.round(pos)))
      if (idx !== activeRef.current) { activeRef.current = idx; setActive(idx) }
    }
    const frame = () => {
      cur += (target - cur) * (reduce ? 1 : 0.11)
      if (Math.abs(target - cur) < 0.0004) cur = target
      apply(cur)
      raf = requestAnimationFrame(frame)
    }
    const onScroll = () => measure()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll, { passive: true })
    measure(); cur = target; frame()
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); if (raf) cancelAnimationFrame(raf) }
  }, [])

  return (
    <section style={{ background: "#ffffff" }}>
      <style>{`
        .dt-outer { position: relative; height: ${N * VH_PER}vh; }
        .dt-pin { position: sticky; top: 0; height: 100vh; overflow: hidden; display: flex; flex-direction: column;
          align-items: center; justify-content: center; padding: clamp(110px,15vh,168px) 20px clamp(24px,4vh,44px);
          perspective: 1500px; background: radial-gradient(85% 70% at 50% 30%, #f4f7fe 0%, #ffffff 70%); }

        /* Apple-style aluminum monitor */
        .dt-monitor { display: flex; flex-direction: column; align-items: center; transform-origin: center; will-change: transform; }
        .dt-frame {
          position: relative; width: min(84vw, 1160px); aspect-ratio: 221 / 100; max-height: 64vh;
          border-radius: 26px / 30px; padding: 7px; border: 1px solid rgba(15,23,42,.14);
          background: linear-gradient(180deg, #eef0f4 0%, #cfd4dc 46%, #b7bdc8 100%);
          box-shadow: 0 50px 96px -34px rgba(15,23,42,.44), 0 12px 28px -12px rgba(15,23,42,.24), inset 0 1px 0 rgba(255,255,255,.85), inset 0 -2px 4px rgba(15,23,42,.18);
        }
        .dt-bezel { width: 100%; height: 100%; background: #1a1e2a; border-radius: 20px / 24px; padding: 6px; box-shadow: inset 0 0 0 1px rgba(255,255,255,.06); }
        .dt-screen-area { position: relative; width: 100%; height: 100%; border-radius: 15px / 19px; overflow: hidden; background: #fff; perspective: 1700px; }
        .dt-screen { position: absolute; inset: 0; transform-origin: center; backface-visibility: hidden; will-change: transform, opacity; }
        .dt-screen img { width: 100%; height: 100%; object-fit: cover; object-position: center; display: block; background: #fff; }
        /* subtle glass glare only (no dark edges) */
        .dt-curve { position: absolute; inset: 0; z-index: 30; pointer-events: none; border-radius: inherit;
          background: linear-gradient(157deg, rgba(255,255,255,.12) 0%, rgba(255,255,255,0) 16%); }

        /* realistic stand — pillar + elliptical base */
        .dt-neck { width: 40px; height: 50px; margin-top: -2px; background: linear-gradient(90deg, #b7bdc8 0%, #eef1f5 46%, #b7bdc8 100%); border-radius: 3px 3px 5px 5px; box-shadow: inset 0 1px 0 rgba(255,255,255,.6); }
        .dt-base { width: 260px; height: 26px; border-radius: 50%; background: radial-gradient(ellipse at 50% 34%, #eef1f5 0%, #c6cbd4 62%, #aab0bd 100%); box-shadow: 0 16px 30px -10px rgba(15,23,42,.4), inset 0 2px 3px rgba(255,255,255,.7); }

        /* footer */
        .dt-foot { display: flex; flex-direction: column; align-items: center; gap: 16px; margin-top: clamp(22px,4vh,40px); }
        .dt-cta { display: inline-flex; align-items: center; gap: 9px; text-decoration: none; background: ${GRAD}; color: #fff;
          font-size: 14.5px; font-weight: 800; padding: 13px 26px; border-radius: 13px; box-shadow: 0 14px 34px -12px ${ACCENT};
          transition: transform .22s cubic-bezier(0.16,1,0.3,1), box-shadow .22s; }
        .dt-cta:hover { transform: translateY(-2px); box-shadow: 0 20px 44px -12px ${ACCENT}; }
        .dt-dots { display: flex; gap: 8px; }
        .dt-dot { height: 5px; border-radius: 99px; border: none; padding: 0; cursor: pointer; transition: width .35s cubic-bezier(0.16,1,0.3,1), background .35s; }

        /* animated scroll-mouse indicator (right side) */
        .dt-scroll { position: absolute; right: clamp(16px,3vw,46px); top: 50%; transform: translateY(-50%); z-index: 6; display: flex; flex-direction: column; align-items: center; gap: 12px; }
        .dt-scroll-lbl { font-size: 10px; font-weight: 800; color: #94a3b8; letter-spacing: .22em; text-transform: uppercase; writing-mode: vertical-rl; }
        .dt-mouse { width: 26px; height: 44px; border: 2px solid #b8c1d6; border-radius: 14px; position: relative; background: rgba(255,255,255,.55); box-shadow: 0 6px 16px -8px rgba(15,23,42,.25); }
        .dt-mouse::before { content: ""; position: absolute; left: 50%; top: 8px; width: 4px; height: 8px; border-radius: 3px; background: ${ACCENT}; transform: translateX(-50%); animation: dt-wheel 1.7s cubic-bezier(0.4,0,0.2,1) infinite; }
        @keyframes dt-wheel { 0% { opacity: 0; transform: translate(-50%,0) } 22% { opacity: 1 } 70% { opacity: 1; transform: translate(-50%,15px) } 100% { opacity: 0; transform: translate(-50%,17px) } }
        .dt-chevs { display: flex; flex-direction: column; align-items: center; margin-top: -3px; }
        .dt-chevs svg { color: #b8c1d6; margin-top: -5px; animation: dt-chev 1.7s ease-in-out infinite; }
        .dt-chevs svg:nth-child(2) { animation-delay: .18s; }
        @keyframes dt-chev { 0%,100% { opacity: .2; transform: translateY(0) } 50% { opacity: 1; transform: translateY(3px) } }
        .dt-fade { animation: dt-fade .4s ease both; }
        @keyframes dt-fade { from { opacity: 0; transform: translateY(8px) } to { opacity: 1; transform: none } }

        @media (max-width: 760px) { .dt-scroll { display: none; } .dt-base { width: 150px; } .dt-neck { width: 70px; height: 26px; } }
        @media (prefers-reduced-motion: reduce) { .dt-mouse::before, .dt-chevs svg { animation: none; } }
      `}</style>

      <div ref={outerRef} className="dt-outer hidden lg:block">
        <div ref={pinRef} className="dt-pin">
          <div ref={monitorRef} className="dt-monitor">
            <div className="dt-frame">
              <div className="dt-bezel">
                <div className="dt-screen-area">
                  {FEATURES.map((feat, i) => (
                    <div key={feat.file} ref={(el) => { screensRef.current[i] = el }} className="dt-screen">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={`/${feat.file}`} alt={`${feat.tab} — Jobingen`} loading={i === 0 ? "eager" : "lazy"} />
                    </div>
                  ))}
                  <div className="dt-curve" aria-hidden />
                </div>
              </div>
            </div>
            <div className="dt-neck" />
            <div className="dt-base" />
          </div>

          <div className="dt-foot">
            <Link href={f.href} key={`cta-${active}`} className="dt-cta dt-fade">
              {f.cta}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <div className="dt-dots">
              {FEATURES.map((feat, i) => (
                <div key={feat.file} className="dt-dot" style={{ width: i === active ? 26 : 6, background: i === active ? GRAD : "#dfe4ee" }} />
              ))}
            </div>
          </div>

          <div className="dt-scroll">
            <span className="dt-scroll-lbl">Scroll</span>
            <div className="dt-mouse" />
            <div className="dt-chevs">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════ MOBILE — clean stacked feature cards (no scroll-jack) ══════════════ */}
      <div className="lg:hidden" style={{ padding: "52px 0 24px" }}>
        <div className="px-5 text-center" style={{ maxWidth: 520, margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: ACCENT_BG,
            border: `1px solid ${ACCENT}22`, borderRadius: 999, padding: "6px 14px", marginBottom: 16 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: ACCENT }} />
            <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: ".12em", color: ACCENT, textTransform: "uppercase" }}>See it in action</span>
          </div>
          <h2 style={{ fontSize: "clamp(26px,7.5vw,34px)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.1, color: "#0c1a35" }}>
            One app. Every step of your <span style={{ color: ACCENT }}>job hunt.</span>
          </h2>
          <p style={{ fontSize: 15, color: "#64748b", marginTop: 12, lineHeight: 1.6, fontWeight: 500 }}>
            Six tools, one workflow — from a blank page to the offer letter.
          </p>
        </div>

        <div className="px-4" style={{ maxWidth: 480, margin: "0 auto", display: "flex", flexDirection: "column", gap: 15, marginTop: 26 }}>
          {FEATURES.map((feat) => {
            const DESC: Record<string, { desc: string; stat: string }> = {
              Resume:     { desc: "Tailor your resume to any job with AI — beat ATS filters and land more callbacks.", stat: "92% ATS score" },
              Interview:  { desc: "Rehearse real interviews with ARIA and get scored on clarity & confidence.",           stat: "5× more confident" },
              ThinkPrint: { desc: "Prove your skills with next-gen assessments across every domain.",                    stat: "360° skill profile" },
              Mentors:    { desc: "Book 1:1 sessions with verified mentors from KPMG, Dell, SAP & more.",                 stat: "Top-company pros" },
              JobEngine:  { desc: "Every job, ranked by how well you fit — pulled from 40+ sources.",                    stat: "40+ job sources" },
            }
            const m = { c: ACCENT, bg: ACCENT_BG, ...DESC[feat.tab] }
            return (
              <div key={feat.file} style={{ position: "relative", overflow: "hidden", background: "#fff",
                border: "1px solid #eef1f6", borderRadius: 22, boxShadow: "0 8px 26px rgba(15,23,42,0.06)" }}>
                {/* soft colour accent corner */}
                <div aria-hidden style={{ position: "absolute", top: -46, right: -46, width: 140, height: 140, borderRadius: "50%", background: m.bg }} />
                <div style={{ position: "relative", padding: "20px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
                    <span style={{ width: 52, height: 52, borderRadius: 16, background: m.bg, color: m.c, display: "grid", placeItems: "center", flexShrink: 0 }}>
                      <span style={{ display: "grid", placeItems: "center", transform: "scale(1.5)" }}>{feat.icon}</span>
                    </span>
                    <div>
                      <div style={{ fontSize: 18, fontWeight: 800, color: "#0c1a35", letterSpacing: "-0.02em" }}>{feat.tab}</div>
                      <span style={{ display: "inline-flex", marginTop: 5, fontSize: 11, fontWeight: 800, color: m.c,
                        background: m.bg, borderRadius: 999, padding: "3px 10px", letterSpacing: ".01em" }}>{m.stat}</span>
                    </div>
                  </div>
                  <p style={{ fontSize: 14.5, color: "#566175", lineHeight: 1.55, fontWeight: 500, marginTop: 14 }}>{m.desc}</p>
                  <Link href={feat.href} style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 15,
                    fontSize: 14, fontWeight: 800, color: m.c, textDecoration: "none", letterSpacing: "-0.01em" }}>
                    {feat.cta}
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </Link>
                </div>
              </div>
            )
          })}
          {/* single primary CTA for the whole section */}
          <Link href="/ai-tools" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
            marginTop: 6, fontSize: 16, fontWeight: 800, color: "#fff", background: ACCENT, padding: "16px", borderRadius: 14,
            textDecoration: "none", boxShadow: "0 12px 26px -8px " + ACCENT }}>
            Explore all AI tools
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
