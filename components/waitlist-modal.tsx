"use client"

import { createContext, useContext, useState, useEffect, useCallback } from "react"

/* ─── Context ─────────────────────────────────────────────────────────────── */

const WaitlistCtx = createContext<{ open: () => void }>({ open: () => {} })

export function useWaitlist() {
  return useContext(WaitlistCtx)
}

/* ─── Modal ───────────────────────────────────────────────────────────────── */

function Modal({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [onClose])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (!name.trim() || !email.trim()) { setError("Name and email are required."); return }
    setLoading(true)
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim().toLowerCase(), phone: phone.trim() }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || "Something went wrong."); return }
      setSuccess(true)
    } catch {
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 16,
        background: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 440,
          borderRadius: 24,
          overflow: "hidden",
          background: "#ffffff",
          boxShadow: "0 32px 80px -12px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.05)",
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Inter', sans-serif",
        }}
      >
        {/* Top accent bar */}
        <div style={{ height: 4, background: "linear-gradient(90deg,#1d3a8f,#2548c5,#3b82f6)" }} />

        <div style={{ padding: "32px 32px 28px" }}>
          {/* Close */}
          <button
            onClick={onClose}
            style={{
              position: "absolute", top: 16, right: 16,
              width: 32, height: 32, borderRadius: 99,
              background: "#f5f5f7", border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#6e6e73",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {success ? (
            <div style={{ textAlign: "center", padding: "16px 0" }}>
              <div style={{
                width: 56, height: 56, borderRadius: "50%", margin: "0 auto 20px",
                background: "#f0fdf4", display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <h3 style={{ fontSize: 22, fontWeight: 800, color: "#1d1d1f", margin: "0 0 8px", letterSpacing: "-0.03em" }}>
                You&apos;re on the list!
              </h3>
              <p style={{ fontSize: 14, color: "#8c8c8c", lineHeight: 1.7, margin: "0 0 24px" }}>
                We&apos;ll notify you as soon as early access opens. Stay tuned!
              </p>
              <button
                onClick={onClose}
                style={{
                  padding: "10px 28px", borderRadius: 12, border: "none", cursor: "pointer",
                  fontSize: 14, fontWeight: 700, color: "white",
                  background: "linear-gradient(135deg,#1d3a8f,#3b82f6)",
                }}
              >
                Done
              </button>
            </div>
          ) : (
            <>
              {/* Header */}
              <div style={{ marginBottom: 24 }}>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  padding: "4px 10px", borderRadius: 99, marginBottom: 14,
                  background: "#eff6ff", border: "1px solid #bfdbfe",
                }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#3b82f6" }} />
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#2563eb", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                    Early Access
                  </span>
                </div>
                <h3 style={{ fontSize: 24, fontWeight: 800, color: "#1d1d1f", margin: "0 0 6px", letterSpacing: "-0.03em", lineHeight: 1.2 }}>
                  Join the Waitlist
                </h3>
                <p style={{ fontSize: 14, color: "#8c8c8c", margin: 0, lineHeight: 1.6 }}>
                  Be the first to get access when we launch.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: "#b0b0b8", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    Full Name *
                  </label>
                  <input
                    value={name} onChange={e => setName(e.target.value)}
                    placeholder="Your full name"
                    style={{
                      padding: "11px 14px", borderRadius: 12, fontSize: 14, fontWeight: 500,
                      border: "1.5px solid #e8e8ed", outline: "none", color: "#1d1d1f",
                      background: "#fafafa", transition: "border-color 0.2s",
                    }}
                    onFocus={e => (e.target.style.borderColor = "#2548c5")}
                    onBlur={e => (e.target.style.borderColor = "#e8e8ed")}
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: "#b0b0b8", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    Email *
                  </label>
                  <input
                    type="email" value={email} onChange={e => setEmail(e.target.value)}
                    placeholder="you@email.com"
                    style={{
                      padding: "11px 14px", borderRadius: 12, fontSize: 14, fontWeight: 500,
                      border: "1.5px solid #e8e8ed", outline: "none", color: "#1d1d1f",
                      background: "#fafafa", transition: "border-color 0.2s",
                    }}
                    onFocus={e => (e.target.style.borderColor = "#2548c5")}
                    onBlur={e => (e.target.style.borderColor = "#e8e8ed")}
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: "#b0b0b8", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    Phone <span style={{ fontWeight: 400, textTransform: "none", fontSize: 11, color: "#c0c0c8" }}>(optional)</span>
                  </label>
                  <input
                    type="tel" value={phone} onChange={e => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    style={{
                      padding: "11px 14px", borderRadius: 12, fontSize: 14, fontWeight: 500,
                      border: "1.5px solid #e8e8ed", outline: "none", color: "#1d1d1f",
                      background: "#fafafa", transition: "border-color 0.2s",
                    }}
                    onFocus={e => (e.target.style.borderColor = "#2548c5")}
                    onBlur={e => (e.target.style.borderColor = "#e8e8ed")}
                  />
                </div>

                {error && (
                  <p style={{ fontSize: 12, color: "#ef4444", fontWeight: 500, margin: 0 }}>{error}</p>
                )}

                <button
                  type="submit" disabled={loading}
                  style={{
                    marginTop: 4, padding: "13px", borderRadius: 14, border: "none", cursor: loading ? "not-allowed" : "pointer",
                    fontSize: 15, fontWeight: 800, color: "white", letterSpacing: "-0.01em",
                    background: "linear-gradient(135deg,#1d3a8f,#2548c5,#3b82f6)",
                    boxShadow: "0 6px 20px -4px rgba(37,72,197,0.45)",
                    opacity: loading ? 0.7 : 1,
                    transition: "opacity 0.2s, transform 0.15s",
                  }}
                  onMouseEnter={e => { if (!loading) e.currentTarget.style.transform = "translateY(-1px)" }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "" }}
                >
                  {loading ? "Joining..." : "Join Waitlist →"}
                </button>
                <p style={{ textAlign: "center", fontSize: 12, color: "#c0c0c8", margin: 0 }}>
                  Free forever · No credit card required
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

/* ─── Provider ────────────────────────────────────────────────────────────── */

export function WaitlistProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])

  return (
    <WaitlistCtx.Provider value={{ open }}>
      {children}
      {isOpen && <Modal onClose={close} />}
    </WaitlistCtx.Provider>
  )
}
