"use client"

import { useState, useEffect } from "react"
import { motion } from "./motion"
import { FileText, Users, AudioLines, Send, Fingerprint, Briefcase } from "lucide-react"
import { JobingenLogo } from "@/components/jobingen-logo"
import { HeroParticles } from "./hero-particles"
import { useWaitlist } from "@/components/waitlist-modal"

/* ─── Typewriter — types & deletes through a set of words ─── */
function Typewriter({ words, color = "#1d3a8f" }: { words: string[]; color?: string }) {
  const [index, setIndex] = useState(0)
  const [sub, setSub] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const [blink, setBlink] = useState(true)

  useEffect(() => {
    const current = words[index % words.length]

    // finished typing → hold, then start deleting
    if (!deleting && sub === current.length) {
      const t = setTimeout(() => setDeleting(true), 950)
      return () => clearTimeout(t)
    }
    // finished deleting → next word
    if (deleting && sub === 0) {
      setDeleting(false)
      setIndex(i => (i + 1) % words.length)
      return
    }
    const t = setTimeout(() => {
      setSub(s => s + (deleting ? -1 : 1))
    }, deleting ? 20 : 42)
    return () => clearTimeout(t)
  }, [sub, deleting, index, words])

  // caret blink
  useEffect(() => {
    const t = setInterval(() => setBlink(b => !b), 480)
    return () => clearInterval(t)
  }, [])

  const text = words[index % words.length].substring(0, sub)

  return (
    <span style={{ whiteSpace: "nowrap" }}>
      <span style={{ color }}>
        {text}
      </span>
      <span style={{
        display: "inline-block", width: "0.06em", height: "0.92em",
        transform: "translateY(0.06em)", marginLeft: 4, borderRadius: 3,
        background: color,
        opacity: blink ? 1 : 0, transition: "opacity .12s ease",
      }} />
    </span>
  )
}

/* ─── Feature cards data for the animated hero graphic ─── */
const FEATURE_CARDS: Array<{ icon: typeof FileText; title: string; sub: string; float: number; badge?: string }> = [
  { icon: FileText,    title: "Resumes",      sub: "AI Resume Builder",    float: -5 },
  { icon: Users,       title: "Mentors",      sub: "1:1 Guidance",         float: -4 },
  { icon: AudioLines,  title: "Interview AI", sub: "AI Mock Interview",    float: -5 },
  { icon: Send,        title: "JobEngine",    sub: "AI Apply to 1000+ Jobs", float: -4 },
  { icon: Fingerprint, title: "ThinkPrint",   sub: "Think Like Recruiters", float: -5 },
  { icon: Briefcase,   title: "Job Matches",  sub: "AI Job Matches For You", float: -4 },
]

/* entrance choreography — each card is "born" from the center jobingen card
   and slides out to its slot. `x` = start offset toward center, `rank` = how
   far from center (nearer cards emerge first). */
const EMERGE = [
  { x:  330, rank: 2 }, // Resumes     (far left)
  { x:  205, rank: 1 }, // Mentors
  { x:   95, rank: 0 }, // Interview AI (near left)
  { x:  -95, rank: 0 }, // JobEngine    (near right)
  { x: -205, rank: 1 }, // ThinkPrint
  { x: -330, rank: 2 }, // Job Matches  (far right)
]

/* circular score ring (SVG) for the mobile match-card mockup */
function Ring({ pct, label }: { pct: number; label: string }) {
  const C = 2 * Math.PI * 20
  return (
    <div style={{ textAlign: "center" }}>
      <svg width="54" height="54" viewBox="0 0 48 48">
        <circle cx="24" cy="24" r="20" fill="none" stroke="#e8ecf3" strokeWidth="4.5" />
        <circle cx="24" cy="24" r="20" fill="none" stroke="#1d3a8f" strokeWidth="4.5" strokeLinecap="round"
          strokeDasharray={C} strokeDashoffset={C * (1 - pct / 100)} transform="rotate(-90 24 24)" />
        <text x="24" y="27.5" textAnchor="middle" fontSize="13" fontWeight="800" fill="#0c1a35">{pct}</text>
      </svg>
      <div style={{ fontSize: 9.5, fontWeight: 700, color: "#8492ad", marginTop: 1, letterSpacing: ".02em" }}>{label}</div>
    </div>
  )
}

/* playful mobile feature pills — brand navy + category accent colours */
const STICKERS = [
  { icon: FileText,    label: "Resumes",      c: "#1d3a8f", bg: "#eef2ff", bd: "#d3ddfb" },
  { icon: AudioLines,  label: "Interview AI", c: "#0f766e", bg: "#ecfdf5", bd: "#b6ecd8" },
  { icon: Users,       label: "Mentors",      c: "#7c3aed", bg: "#f5f3ff", bd: "#e0d5fb" },
  { icon: Send,        label: "JobEngine",    c: "#b45309", bg: "#fffbeb", bd: "#fde9b0" },
  { icon: Fingerprint, label: "ThinkPrint",   c: "#e11d48", bg: "#fff1f2", bd: "#fbccd3" },
  { icon: Briefcase,   label: "Job Matches",  c: "#16a34a", bg: "#f0fdf4", bd: "#bbf0cc" },
]

/* each icon gets its own signature looping motion — brings the cards alive */
function iconMotion(title: string) {
  switch (title) {
    case "Resumes":     // gentle page-flip nod
      return { animate: { rotateX: [0, 22, 0] }, transition: { duration: 3, repeat: Infinity, ease: "easeInOut" } }
    case "Mentors":     // friendly breathe
      return { animate: { scale: [1, 1.14, 1] }, transition: { duration: 2.6, repeat: Infinity, ease: "easeInOut" } }
    case "Interview AI":// sound-wave pulse
      return { animate: { scaleY: [1, 1.35, 0.8, 1.2, 1] }, transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" } }
    case "JobEngine":   // paper-plane lift-off
      return { animate: { x: [0, 5, 0], y: [0, -5, 0], rotate: [0, 8, 0] }, transition: { duration: 2.4, repeat: Infinity, ease: "easeInOut" } }
    case "ThinkPrint":  // scanning shimmer
      return { animate: { opacity: [1, 0.55, 1], scale: [1, 1.08, 1] }, transition: { duration: 2.2, repeat: Infinity, ease: "easeInOut" } }
    case "Job Matches": // subtle sway
      return { animate: { rotate: [0, -7, 7, 0] }, transition: { duration: 3.4, repeat: Infinity, ease: "easeInOut" } }
    default:
      return { animate: {}, transition: {} }
  }
}

/* one animated feature card with entrance + gentle float + hover lift.
   `noEmerge` (mobile) skips the horizontal "born from centre" slide so cards
   never overflow the viewport — they just fade + rise into place. */
function FeatureCard({
  card, index, highlight = false, noEmerge = false,
}: {
  card: (typeof FEATURE_CARDS)[number]
  index: number
  highlight?: boolean
  noEmerge?: boolean
}) {
  const Icon = card.icon
  const [hover, setHover] = useState(false)
  const im = iconMotion(card.title)
  const em = EMERGE[index] ?? { x: 0, rank: 0 }
  const emDelay = noEmerge ? 0.1 + index * 0.06 : 0.5 + em.rank * 0.15
  return (
    <motion.div
      initial={noEmerge
        ? { opacity: 0, y: 20, scale: 0.9 }
        : { opacity: 0, x: em.x, y: 34, scale: 0.32, rotate: em.x > 0 ? -10 : 10 }}
      animate={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }}
      transition={{
        default: { type: "spring", stiffness: 88, damping: 13, mass: 0.9, delay: emDelay },
        opacity: { duration: 0.35, delay: emDelay },
      }}
      className="relative"
      style={{ zIndex: 1, minWidth: 0 }}
    >
      {/* continuous floating wrapper — gentle synced wave (desktop only; static on mobile for perf) */}
      <motion.div
        animate={noEmerge ? undefined : { y: [0, card.float, 0] }}
        transition={noEmerge ? undefined : { duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.35 }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          position: "relative", overflow: "hidden",
          borderRadius: 20,
          padding: "22px 12px 20px",
          minHeight: 168,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          background: "#ffffff",
          border: highlight ? "1.5px solid #cdd8fb" : "1px solid #eef1f6",
          boxShadow: hover
            ? "0 20px 44px rgba(15,23,42,0.14)"
            : "0 8px 26px rgba(15,23,42,0.07)",
          transform: hover ? "translateY(-6px)" : "none",
          transition: "box-shadow .25s ease, transform .25s ease",
          textAlign: "center",
          cursor: "default",
        }}
      >
        {card.badge && (
          <span style={{
            position: "absolute", top: 12, right: 12,
            fontSize: 9, fontWeight: 800, letterSpacing: "0.06em",
            color: "white", padding: "3px 8px", borderRadius: 999,
            background: "#1d3a8f",
            boxShadow: "0 4px 12px rgba(29,58,143,0.4)",
          }}>
            {card.badge}
          </span>
        )}
        {/* light-gray circular icon holder (matches original) */}
        <div style={{
          width: 60, height: 60, borderRadius: "50%", margin: "0 auto 16px",
          display: "grid", placeItems: "center",
          background: hover ? "#e7edff" : "#f3f5f9",
          color: "#1d3a8f", position: "relative", zIndex: 1,
          transform: hover ? "scale(1.07)" : "none",
          transition: "transform .25s ease, background .25s ease",
        }}>
          <motion.span
            animate={noEmerge ? undefined : im.animate}
            transition={noEmerge ? undefined : ({ ...im.transition, delay: index * 0.25 } as any)}
            style={{ display: "grid", placeItems: "center", transformOrigin: "center" }}
          >
            <Icon size={26} strokeWidth={1.9} />
          </motion.span>
        </div>
        <div style={{ fontSize: 16, fontWeight: 800, color: "#0c1a35", lineHeight: 1.15 }}>
          {card.title}
        </div>
        <div style={{ fontSize: 12, fontWeight: 500, color: "#7b8798", marginTop: 5, lineHeight: 1.35 }}>
          {card.sub}
        </div>
      </motion.div>
    </motion.div>
  )
}

/* central brand card — the hero of the graphic */
function BrandCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
      style={{ position: "relative", zIndex: 5 }}
    >
      {/* rotating aurora glow ring — the AI-OS heartbeat */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute", inset: -3, borderRadius: 27, zIndex: 0,
          background: "conic-gradient(from 0deg, #4668f5, #a78bfa, #38bdf8, #4668f5, #3b5bdb, #4668f5)",
          filter: "blur(11px)", opacity: 0.16, pointerEvents: "none",
        }}
      />
      {/* soft breathing halo */}
      <motion.div
        animate={{ opacity: [0.2, 0.38, 0.2], scale: [1, 1.03, 1] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute", inset: -8, borderRadius: 30, zIndex: 0,
          background: "radial-gradient(closest-side, rgba(70,104,245,0.18), transparent)",
          pointerEvents: "none",
        }}
      />
      {/* one-time "emit" shockwave — fires as the feature cards launch out */}
      <motion.div
        initial={{ opacity: 0.5, scale: 0.72 }}
        animate={{ opacity: 0, scale: 1.85 }}
        transition={{ duration: 0.9, delay: 0.42, ease: "easeOut" }}
        style={{
          position: "absolute", inset: 0, borderRadius: 26, zIndex: 0,
          border: "2px solid rgba(70,104,245,0.45)",
          pointerEvents: "none",
        }}
      />
      <div
      style={{
        position: "relative", zIndex: 1,
        borderRadius: 24,
        padding: "28px 22px",
        minHeight: 210,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        background: "#ffffff",
        border: "1.5px solid #cdd8fb",
        boxShadow: "0 22px 54px rgba(29,58,143,0.13)",
        textAlign: "center",
      }}
    >
      <JobingenLogo className="w-auto" style={{ height: 92, maxWidth: "100%", margin: "0 auto" }} />
      <div style={{ fontSize: 15, fontWeight: 700, color: "#0c1a35", marginTop: 16 }}>
        AI Career <span style={{ color: "#1d3a8f" }}>Operating System.</span>
      </div>
      </div>
    </motion.div>
  )
}

/* full animated hero graphic that replaces the static SVG */
function HeroGraphic() {
  const left = FEATURE_CARDS.slice(0, 3)
  const right = FEATURE_CARDS.slice(3)
  return (
    <div className="w-full" style={{ maxWidth: 1080, margin: "0 auto" }}>
      {/* desktop (lg+): cards flanking the brand card in one row */}
      <div className="hidden lg:grid" style={{
        gridTemplateColumns: "repeat(3,1fr) 1.7fr repeat(3,1fr)",
        gap: 14, alignItems: "center",
      }}>
        {left.map((c, i) => <FeatureCard key={c.title} card={c} index={i} />)}
        <BrandCard />
        {right.map((c, i) => <FeatureCard key={c.title} card={c} index={i + 3} highlight={c.title === "JobEngine"} />)}
      </div>

      {/* mobile + tablet: brand card on top, features in a responsive grid */}
      <div className="lg:hidden">
        <BrandCard />
        <div className="grid grid-cols-2 sm:grid-cols-3" style={{ gap: 12, marginTop: 14 }}>
          {FEATURE_CARDS.map((c, i) => (
            <FeatureCard key={c.title} card={c} index={i} highlight={c.title === "JobEngine"} noEmerge />
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── Hero — animated cards graphic on top, big bold headline below ─── */
export function Hero() {
  const { open: openWaitlist } = useWaitlist()

  return (
    <section
      className="mt-[64px] lg:mt-[80px] pt-0 lg:pt-0 pb-0 lg:pb-0"
      style={{ position: "relative", overflow: "hidden", background: "#ffffff" }}
    >
      {/* interactive particle field — scatters away from the cursor */}
      <HeroParticles />

      {/* ══════════════ MOBILE HERO — clean & bold (Jobright-inspired, < lg) ══════════════ */}
      <div className="lg:hidden relative" style={{ zIndex: 1 }}>
        <style>{`
          @keyframes mh-up { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
          @keyframes mh-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
          .mh-anim { animation: mh-up .55s cubic-bezier(.16,1,.3,1) both; }
          .mh-cta { transition: transform .18s ease, box-shadow .18s ease; }
          .mh-cta:active { transform: scale(.97); }
        `}</style>

        <div className="px-5 pt-10 flex flex-col items-center text-center">
          {/* big bold premium headline — "Everything" + word always on their own
             lines so the changing word never reflows the page (no layout shift) */}
          <h1 className="mh-anim" style={{ animationDelay:"0s", fontSize:"clamp(44px, 14vw, 66px)", fontWeight:900,
            lineHeight:1.0, letterSpacing:"-0.055em", color:"#0c1a35", marginTop:0 }}>
            <span style={{ display:"block" }}>Everything</span>
            <span style={{ display:"block", whiteSpace:"nowrap" }}>
              <Typewriter words={["Career.", "Resume.", "Jobs.", "Mentors.", "Hired."]} />
            </span>
          </h1>

          {/* AI Career Operating System — tagline below the headline */}
          <div className="mh-anim" style={{ animationDelay:".09s", fontSize:12.5, fontWeight:800, letterSpacing:".13em",
            textTransform:"uppercase", color:"#8492ad", marginTop:16 }}>
            The AI Career Operating System
          </div>

          {/* subtext */}
          <p className="mh-anim" style={{ animationDelay:".13s", fontSize:16, color:"#475569", lineHeight:1.6,
            fontWeight:500, marginTop:12, maxWidth:330 }}>
            Get matched to the right jobs, tailor your resume, ace interviews &amp; land the offer — all with AI.
          </p>

          {/* CTA */}
          <div className="mh-anim" style={{ animationDelay:".16s", width:"100%", maxWidth:340, marginTop:24 }}>
            <button onClick={() => { window.location.href = "https://ai.jobingen.com/login" }} className="mh-cta" style={{ width:"100%", fontSize:17, fontWeight:800, color:"#fff",
              padding:"17px", borderRadius:999, border:"none", background:"#1d3a8f", cursor:"pointer",
              boxShadow:"0 12px 28px rgba(29,58,143,0.32)" }}>
              Get Started — it&apos;s free
            </button>
          </div>
        </div>

        {/* ── brand feature graphic (compact, clean, animated) ── */}
        <div className="mh-anim px-4" style={{ animationDelay:".22s", marginTop:26, paddingBottom:8 }}>
          <div className="grid grid-cols-2" style={{ gap: 11, maxWidth: 440, margin: "0 auto" }}>
            {FEATURE_CARDS.map((c, i) => (
              <FeatureCard key={c.title} card={c} index={i} highlight={c.title === "JobEngine"} noEmerge />
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════ DESKTOP HERO (lg+) ══════════════ */}
      <div className="hidden lg:flex w-full max-w-[1240px] mx-auto px-5 sm:px-8 flex-col items-center text-center" style={{ position: "relative", zIndex: 1 }}>

        {/* ── Top graphic (animated cards) — below the copy on mobile, on top on desktop ── */}
        <div className="w-full order-4 lg:order-1 mt-10 lg:mt-16 mb-2" style={{ position: "relative" }}>
          {/* soft radial glow behind the cards */}
          <div style={{
            position: "absolute", inset: "-10% -5% auto -5%", height: "130%",
            background: "radial-gradient(60% 70% at 50% 40%, rgba(70,104,245,0.10), rgba(70,104,245,0.03) 55%, transparent 75%)",
            pointerEvents: "none", zIndex: 0,
          }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <HeroGraphic />
          </div>
        </div>

        {/* ── Headline ── */}
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="order-1 lg:order-2 mt-8 lg:mt-12 px-2"
          style={{
            fontSize: "clamp(30px, 8vw, 80px)",
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: "-0.045em",
            color: "#0c1a35",
            whiteSpace: "normal",
            maxWidth: "100%",
          }}
        >
          Everything{" "}
          <Typewriter words={["Career.", "Resume.", "Interviews.", "Job Search.", "Mentorship."]} />
        </motion.h1>

        {/* ── Subtext ── */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          className="order-2 lg:order-3"
          style={{
            fontSize: "clamp(16px, 1.7vw, 19px)",
            color: "#475569", lineHeight: 1.7, fontWeight: 500,
            maxWidth: 660, marginTop: 20,
          }}
        >
          The AI Career Operating System for students and early professionals — discover the
          right opportunities, optimize your profile, auto-apply to roles, ace your interviews,
          and get hired faster.
        </motion.p>

        {/* ── CTAs ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
          className="order-3 lg:order-4 flex items-center gap-3 flex-wrap justify-center"
          style={{ marginTop: 30 }}
        >
          <button
            onClick={() => { window.location.href = "https://ai.jobingen.com/login" }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(-1px)"; el.style.boxShadow = "0 10px 30px rgba(29,58,143,0.38)" }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = ""; el.style.boxShadow = "0 6px 22px rgba(29,58,143,0.28)" }}
            style={{
              fontSize: 16, fontWeight: 700, color: "white",
              padding: "15px 28px", borderRadius: 14, border: "none", cursor: "pointer",
              background: "#1d3a8f",
              boxShadow: "0 6px 22px rgba(29,58,143,0.28)",
              transition: "all .2s ease", whiteSpace: "nowrap",
            }}
          >
            Get Started — it&apos;s free
          </button>
          <a
            href="https://ai.jobingen.com/dashboard"
            style={{
              fontSize: 16, fontWeight: 600, color: "#1d3a8f",
              padding: "15px 26px", borderRadius: 14, textDecoration: "none",
              background: "white", border: "1.5px solid #e4e9f2",
              transition: "all .2s ease", whiteSpace: "nowrap",
              display: "inline-flex", alignItems: "center", gap: 8,
            }}
          >
            ▶ Explore Features
          </a>
        </motion.div>

      </div>
    </section>
  )
}
