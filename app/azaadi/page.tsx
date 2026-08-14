"use client"

/* ─────────────────────────────────────────────────────────────
   /azaadi — the Freedom Wall.

   One question, one line per person. Zero AI cost, entirely
   user-generated, and screenshot-able — which is the whole
   point of shipping it for Independence Week.
   ───────────────────────────────────────────────────────────── */

import { useCallback, useEffect, useState } from "react"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import { ChakraGhost, TricolorThread, useAzaadi } from "@/components/landing/azaadi"
import {
  AZAADI_COPY, FREEDOM_YEARS, TIRANGA, TRICOLOR_GRADIENT,
  azaadiCountdown, pad2,
} from "@/lib/campaign"

type Entry = {
  id: string
  text: string
  name: string | null
  city: string | null
  created_at: string
}

const MAX_LEN = 140

/* Card tints — three soft washes, cycled by index. Navy carries the weight;
   saffron and green appear only as the left edge and a faint ground. */
const TINTS = [
  { bg: "#fffaf3", edge: TIRANGA.saffron },
  { bg: "#ffffff", edge: "#c7d2e8" },
  { bg: "#f5fbf4", edge: TIRANGA.green },
] as const

export default function AzaadiWallPage() {
  const live = useAzaadi()
  const [entries, setEntries] = useState<Entry[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  const [text, setText] = useState("")
  const [name, setName] = useState("")
  const [city, setCity] = useState("")
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState("")
  const [done, setDone] = useState(false)

  const load = useCallback(async () => {
    try {
      const r = await fetch("/api/azaadi", { cache: "no-store" })
      const d = await r.json()
      setEntries(d.entries ?? [])
      setTotal(d.total ?? 0)
    } catch {
      /* wall just stays empty — not worth an error state */
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (busy) return
    const t = text.trim()
    if (t.length < 3) { setError("A few more words?"); return }

    setBusy(true)
    setError("")
    try {
      const r = await fetch("/api/azaadi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: t, name, city }),
      })
      const d = await r.json()
      if (!r.ok) { setError(d.error ?? "Couldn't post that."); return }
      setEntries((prev) => [d.entry, ...prev])
      setTotal((n) => n + 1)
      setText(""); setDone(true)
    } catch {
      setError("Network hiccup. Try again.")
    } finally {
      setBusy(false)
    }
  }

  const left = MAX_LEN - text.length

  return (
    <div className="min-h-screen font-sans antialiased" style={{ background: "#ffffff", overflowX: "clip" }}>
      <style>{`
        * { -webkit-font-smoothing: antialiased; }
        html { scroll-behavior: smooth; }
        @keyframes az-rise { from { opacity:0; transform: translateY(14px) } to { opacity:1; transform: none } }
        .az-card { animation: az-rise .5s cubic-bezier(.16,1,.3,1) both; }
        @media (prefers-reduced-motion: reduce) { .az-card { animation: none } }
      `}</style>

      <Navbar />

      {/* ── Hero ── */}
      <section
        className="px-4 lg:px-8"
        style={{ position: "relative", overflow: "hidden", background: "#fff", paddingTop: 96, paddingBottom: 8 }}
      >
        <ChakraGhost size={520} opacity={0.05} />

        <div className="text-center" style={{ position: "relative", zIndex: 1, maxWidth: 720, margin: "0 auto" }}>
          <div style={{
            fontSize: 11, fontWeight: 800, letterSpacing: ".14em",
            textTransform: "uppercase", color: TIRANGA.saffron,
          }}>
            {AZAADI_COPY.eyebrow} · {FREEDOM_YEARS} Years
          </div>

          <h1 style={{
            fontSize: "clamp(34px, 7vw, 60px)", fontWeight: 900,
            lineHeight: 1.05, letterSpacing: "-0.045em",
            color: "#0c1a35", marginTop: 12,
          }}>
            The Freedom Wall
          </h1>

          <TricolorThread width={170} delay={0.3} />

          <p style={{
            fontSize: "clamp(16px, 2vw, 19px)", color: "#475569",
            lineHeight: 1.65, fontWeight: 500, marginTop: 18,
          }}>
            {AZAADI_COPY.wallPrompt} A bad manager, a course you never wanted,
            someone else&apos;s definition of a safe career — write one line, leave it on the wall.
          </p>

          <Countdown live={live} />
        </div>
      </section>

      {/* ── Composer ── */}
      <section className="px-4 lg:px-8" style={{ paddingTop: 26 }}>
        <div style={{ maxWidth: 620, margin: "0 auto" }}>
          {!live ? (
            <Closed />
          ) : done ? (
            <Posted onAnother={() => setDone(false)} />
          ) : (
            <form
              onSubmit={submit}
              style={{
                borderRadius: 20, overflow: "hidden", background: "#fff",
                border: "1px solid #e8edf7", boxShadow: "0 12px 38px rgba(15,23,42,0.07)",
              }}
            >
              <div style={{ height: 4, background: TRICOLOR_GRADIENT }} />
              <div style={{ padding: 18 }}>
                <label htmlFor="az-text" style={{ fontSize: 13, fontWeight: 800, color: "#0c1a35" }}>
                  I&apos;m breaking free from…
                </label>
                <textarea
                  id="az-text"
                  value={text}
                  onChange={(e) => setText(e.target.value.slice(0, MAX_LEN))}
                  rows={3}
                  placeholder="…a job I stopped growing in two years ago."
                  style={{
                    width: "100%", marginTop: 8, resize: "vertical",
                    fontSize: 16, lineHeight: 1.5, color: "#0c1a35",
                    padding: "12px 14px", borderRadius: 12,
                    border: "1.5px solid #e4e9f2", outline: "none",
                    fontFamily: "inherit", background: "#fbfcfe",
                  }}
                />

                <div className="flex" style={{ gap: 10, marginTop: 10, flexWrap: "wrap" }}>
                  <input
                    value={name} onChange={(e) => setName(e.target.value.slice(0, 24))}
                    placeholder="First name (optional)" aria-label="First name"
                    style={inputStyle}
                  />
                  <input
                    value={city} onChange={(e) => setCity(e.target.value.slice(0, 32))}
                    placeholder="City (optional)" aria-label="City"
                    style={inputStyle}
                  />
                </div>

                {error && (
                  <div style={{ fontSize: 13, color: "#dc2626", marginTop: 10, fontWeight: 600 }}>{error}</div>
                )}

                <div className="flex items-center" style={{ gap: 12, marginTop: 14, justifyContent: "space-between" }}>
                  <span style={{ fontSize: 12, color: left < 20 ? "#dc2626" : "#8492ad", fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>
                    {left} left
                  </span>
                  <button
                    type="submit"
                    disabled={busy || text.trim().length < 3}
                    style={{
                      fontSize: 15, fontWeight: 800, color: "#fff",
                      padding: "13px 24px", borderRadius: 12, border: "none",
                      background: busy || text.trim().length < 3 ? "#9fb0d6" : "#1d3a8f",
                      cursor: busy || text.trim().length < 3 ? "not-allowed" : "pointer",
                      boxShadow: "0 6px 18px rgba(29,58,143,0.24)",
                    }}
                  >
                    {busy ? "Posting…" : "Put it on the wall"}
                  </button>
                </div>

                <p style={{ fontSize: 11.5, color: "#94a3b8", marginTop: 12, lineHeight: 1.5 }}>
                  Posts are public and anonymous unless you add a name. No links, no handles.
                </p>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* ── The wall ── */}
      <section className="px-4 lg:px-8" style={{ paddingTop: 40, paddingBottom: 64 }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <div className="flex items-baseline" style={{ gap: 10, marginBottom: 18 }}>
            <h2 style={{ fontSize: 20, fontWeight: 900, color: "#0c1a35", letterSpacing: "-0.02em" }}>
              On the wall
            </h2>
            {total > 0 && (
              <span style={{ fontSize: 13, fontWeight: 700, color: "#8492ad", fontVariantNumeric: "tabular-nums" }}>
                {total.toLocaleString("en-IN")} {total === 1 ? "voice" : "voices"}
              </span>
            )}
          </div>

          {loading ? (
            <div style={{ fontSize: 14, color: "#8492ad" }}>Loading the wall…</div>
          ) : entries.length === 0 ? (
            <div style={{
              padding: "44px 20px", textAlign: "center", borderRadius: 18,
              border: "1px dashed #dbe3f1", color: "#8492ad", fontSize: 14.5,
            }}>
              The wall is empty. Be the first to put something on it.
            </div>
          ) : (
            <div
              style={{
                columnGap: 14,
                columnWidth: 280,
              }}
            >
              {entries.map((e, i) => (
                <WallCard key={e.id} entry={e} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  flex: "1 1 160px", minWidth: 0,
  fontSize: 14, color: "#0c1a35",
  padding: "11px 13px", borderRadius: 11,
  border: "1.5px solid #e4e9f2", outline: "none",
  fontFamily: "inherit", background: "#fbfcfe",
}

function WallCard({ entry, index }: { entry: Entry; index: number }) {
  const tint = TINTS[index % TINTS.length]
  const who = [entry.name, entry.city].filter(Boolean).join(" · ")
  return (
    <div
      className="az-card"
      style={{
        breakInside: "avoid", marginBottom: 14,
        // stagger only the first screenful — later cards shouldn't wait
        animationDelay: `${Math.min(index, 12) * 0.035}s`,
        background: tint.bg,
        borderRadius: 16,
        border: "1px solid #eaeff8",
        borderLeft: `3px solid ${tint.edge}`,
        padding: "16px 18px",
        boxShadow: "0 6px 20px rgba(15,23,42,0.05)",
      }}
    >
      <p style={{ fontSize: 15.5, lineHeight: 1.55, color: "#0c1a35", fontWeight: 500, margin: 0 }}>
        {entry.text}
      </p>
      <div style={{ fontSize: 12, color: "#8492ad", marginTop: 10, fontWeight: 700 }}>
        {who || "Anonymous"}
      </div>
    </div>
  )
}

function Countdown({ live }: { live: boolean }) {
  const [c, setC] = useState<ReturnType<typeof azaadiCountdown> | null>(null)
  useEffect(() => {
    setC(azaadiCountdown())
    const t = setInterval(() => setC(azaadiCountdown()), 1000)
    return () => clearInterval(t)
  }, [])
  if (!live || !c || c.over) return null
  return (
    <div style={{
      display: "inline-flex", alignItems: "baseline", gap: 3, marginTop: 20,
      padding: "9px 16px", borderRadius: 999,
      background: "#f4f7fd", border: "1px solid #e3eaf7",
      fontVariantNumeric: "tabular-nums", color: "#0c1a35",
      fontWeight: 900, fontSize: 17, letterSpacing: "-0.02em",
    }}>
      {pad2(c.h)}<i style={sep}>:</i>{pad2(c.m)}<i style={sep}>:</i>{pad2(c.s)}
      <span style={{ fontSize: 10, fontWeight: 700, color: "#8492ad", marginLeft: 7, letterSpacing: ".06em" }}>
        LEFT IN THE WEEK
      </span>
    </div>
  )
}

const sep: React.CSSProperties = { color: "#c3cee2", fontStyle: "normal", margin: "0 1px" }

function Posted({ onAnother }: { onAnother: () => void }) {
  return (
    <div style={{
      borderRadius: 20, padding: "26px 22px", textAlign: "center",
      background: "#f5fbf4", border: `1px solid #cfe8cb`,
    }}>
      <div style={{ fontSize: 18, fontWeight: 900, color: "#0c1a35" }}>It&apos;s on the wall. 🇮🇳</div>
      <p style={{ fontSize: 14.5, color: "#475569", marginTop: 8, lineHeight: 1.6 }}>
        Now go claim the {AZAADI_COPY.passName} and let JobEngine do the applying.
      </p>
      <div className="flex" style={{ gap: 10, justifyContent: "center", marginTop: 16, flexWrap: "wrap" }}>
        <a href={AZAADI_COPY.ctaHref} style={{
          fontSize: 14, fontWeight: 800, color: "#fff", textDecoration: "none",
          padding: "12px 20px", borderRadius: 12, background: "#1d3a8f",
        }}>
          {AZAADI_COPY.cta}
        </a>
        <button onClick={onAnother} style={{
          fontSize: 14, fontWeight: 700, color: "#1d3a8f",
          padding: "12px 18px", borderRadius: 12,
          background: "#fff", border: "1.5px solid #e4e9f2", cursor: "pointer",
        }}>
          Write another
        </button>
      </div>
    </div>
  )
}

function Closed() {
  return (
    <div style={{
      borderRadius: 20, padding: "26px 22px", textAlign: "center",
      background: "#fbfcfe", border: "1px solid #e8edf7",
    }}>
      <div style={{ fontSize: 17, fontWeight: 900, color: "#0c1a35" }}>The wall is closed.</div>
      <p style={{ fontSize: 14.5, color: "#475569", marginTop: 8, lineHeight: 1.6 }}>
        Independence Week is over — but everything on it stays up. See you next August.
      </p>
      <a href="/" style={{
        display: "inline-block", marginTop: 16,
        fontSize: 14, fontWeight: 800, color: "#fff", textDecoration: "none",
        padding: "12px 20px", borderRadius: 12, background: "#1d3a8f",
      }}>
        Back to Jobingen
      </a>
    </div>
  )
}
