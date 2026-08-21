"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import type { PromoPopup } from "@/lib/promo-popup"
import { STATUS_GRADIENTS, type StatusUpdate, type StatusGradient } from "@/lib/status-updates"

const GRADIENT_KEYS = Object.keys(STATUS_GRADIENTS) as StatusGradient[]

const EMPTY_POPUP: PromoPopup = {
  enabled: true, image: "", alt: "", href: "", autoCloseSeconds: 20, oncePerSession: true,
}

const BUCKET = "site-content"
const MAX_EDGE = 1600 // px — posters never need more, keeps uploads fast

/* Shrink oversized phone photos in the browser before upload. */
async function downscale(file: File): Promise<Blob> {
  if (!file.type.startsWith("image/") || file.type === "image/gif") return file
  if (file.size < 600_000) return file
  try {
    const bmp = await createImageBitmap(file)
    const scale = Math.min(1, MAX_EDGE / Math.max(bmp.width, bmp.height))
    if (scale === 1 && file.size < 2_000_000) return file
    const canvas = document.createElement("canvas")
    canvas.width = Math.round(bmp.width * scale)
    canvas.height = Math.round(bmp.height * scale)
    const ctx = canvas.getContext("2d")
    if (!ctx) return file
    ctx.drawImage(bmp, 0, 0, canvas.width, canvas.height)
    const blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, "image/jpeg", 0.86))
    return blob && blob.size < file.size ? blob : file
  } catch {
    return file
  }
}

/* Upload straight to Supabase Storage via a signed URL — bypasses the
   ~4.5MB body limit on the API route. Throws with a real message on failure. */
async function uploadImage(file: File, pwd: string): Promise<string> {
  const body = await downscale(file)
  const res = await fetch("/api/admin/site-content/upload-url", {
    method: "POST",
    headers: { Authorization: `Bearer ${pwd}`, "Content-Type": "application/json" },
    body: JSON.stringify({ fileName: body === file ? file.name : "poster.jpg" }),
  })
  const d = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(d?.error || `Upload failed (${res.status})`)

  const { error } = await supabase.storage
    .from(BUCKET)
    .uploadToSignedUrl(d.path, d.token, body, { contentType: body.type || file.type || "image/jpeg" })
  if (error) throw new Error(error.message)
  return d.publicUrl as string
}

function newStatus(): StatusUpdate {
  return {
    id: `s-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    date: new Date().toISOString().slice(0, 10),
    tag: "Update", title: "", body: "", gradient: "blue",
  }
}

export default function AdminContentPage() {
  const [pwd, setPwd] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState("")

  const [popup, setPopup] = useState<PromoPopup>(EMPTY_POPUP)
  const [statuses, setStatuses] = useState<StatusUpdate[]>([])

  // in-flight image uploads, keyed by "popup" or the status id
  const [uploading, setUploading] = useState<Record<string, boolean>>({})

  // auth gate
  useEffect(() => {
    const p = typeof window !== "undefined" ? sessionStorage.getItem("adm_auth") : null
    if (!p) { window.location.href = "/admin-login"; return }
    setPwd(p)
  }, [])

  // load current config
  useEffect(() => {
    if (!pwd) return
    fetch("/api/admin/site-content", { headers: { Authorization: `Bearer ${pwd}` } })
      .then((r) => r.json())
      .then((d) => {
        if (d?.popup && Object.keys(d.popup).length) setPopup({ ...EMPTY_POPUP, ...d.popup })
        if (Array.isArray(d?.statuses)) setStatuses(d.statuses)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [pwd])

  const flash = (m: string) => { setToast(m); setTimeout(() => setToast(""), 3000) }

  const save = async () => {
    if (!pwd) return
    if (Object.values(uploading).some(Boolean)) { flash("Image still uploading — wait a sec"); return }
    setSaving(true)
    try {
      const res = await fetch("/api/admin/site-content", {
        method: "POST",
        headers: { Authorization: `Bearer ${pwd}`, "Content-Type": "application/json" },
        body: JSON.stringify({ popup, statuses }),
      })
      const d = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(d?.error || `Save failed (${res.status})`)
      if (d.popup) setPopup({ ...EMPTY_POPUP, ...d.popup })
      if (Array.isArray(d.statuses)) setStatuses(d.statuses)
      flash("Saved & live ✓")
    } catch (e) {
      flash(e instanceof Error ? e.message : "Save failed")
    } finally {
      setSaving(false)
    }
  }

  // Upload happens the moment a file is picked, so Save only sends JSON.
  const pickImage = async (key: string, file: File | null, apply: (url: string) => void) => {
    if (!file || !pwd) return
    setUploading((u) => ({ ...u, [key]: true }))
    try {
      apply(await uploadImage(file, pwd))
      flash("Image uploaded ✓ — press Save to publish")
    } catch (e) {
      flash(e instanceof Error ? e.message : "Upload failed")
    } finally {
      setUploading((u) => ({ ...u, [key]: false }))
    }
  }

  const setP = (patch: Partial<PromoPopup>) => setPopup((p) => ({ ...p, ...patch }))
  const setS = (i: number, patch: Partial<StatusUpdate>) =>
    setStatuses((arr) => arr.map((s, idx) => (idx === i ? { ...s, ...patch } : s)))

  if (loading) return <div style={{ ...S.page, display: "grid", placeItems: "center" }}>Loading…</div>

  return (
    <div style={S.page}>
      <style>{`
        .ac-input{width:100%;background:rgba(255,255,255,.05);border:1.5px solid rgba(255,255,255,.12);border-radius:10px;padding:11px 13px;font-size:14px;color:#f1f5f9;outline:none;font-family:inherit}
        .ac-input:focus{border-color:rgba(70,104,245,.7);background:rgba(255,255,255,.08)}
        .ac-input::placeholder{color:rgba(255,255,255,.28)}
        textarea.ac-input{resize:vertical;min-height:74px;line-height:1.5}
        .ac-lbl{display:block;font-size:11px;font-weight:700;color:rgba(255,255,255,.4);text-transform:uppercase;letter-spacing:.5px;margin:0 0 6px}
        .ac-btn{cursor:pointer;font-family:inherit;font-weight:700;border:none;border-radius:10px;transition:all .2s}
        .ac-file{font-size:12.5px;color:rgba(255,255,255,.55)}
        .ac-file::file-selector-button{margin-right:10px;padding:7px 12px;border-radius:8px;border:none;background:#1d3a8f;color:#fff;font-weight:700;cursor:pointer;font-family:inherit}
      `}</style>

      <div style={S.wrap}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 26 }}>
          <div>
            <a href="/admin" style={{ fontSize: 13, color: "#7c93d8", textDecoration: "none" }}>← Back to dashboard</a>
            <h1 style={{ fontSize: 26, fontWeight: 900, color: "#f8fafc", margin: "8px 0 2px", letterSpacing: "-.5px" }}>Site Content</h1>
            <p style={{ fontSize: 13.5, color: "rgba(255,255,255,.42)" }}>Manage the popup & daily status updates — changes go live on save.</p>
          </div>
          <button className="ac-btn" onClick={save} disabled={saving}
            style={{ background: saving ? "#334155" : "#1d3a8f", color: "#fff", padding: "13px 26px", fontSize: 14.5, boxShadow: "0 6px 20px rgba(29,58,143,.4)", opacity: saving ? .7 : 1 }}>
            {saving ? "Saving…" : "Save changes"}
          </button>
        </div>

        {/* ── POPUP ── */}
        <section style={S.card}>
          <div style={S.cardHead}>
            <h2 style={S.h2}>Center Popup</h2>
            <label style={S.toggle}>
              <input type="checkbox" checked={popup.enabled} onChange={(e) => setP({ enabled: e.target.checked })} />
              <span style={{ fontSize: 13, fontWeight: 700, color: popup.enabled ? "#4ade80" : "rgba(255,255,255,.4)" }}>
                {popup.enabled ? "Enabled" : "Disabled"}
              </span>
            </label>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: 22, alignItems: "start" }}>
            {/* preview */}
            <div>
              <span className="ac-lbl">Poster</span>
              <div style={S.preview}>
                {popup.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img alt="poster" src={popup.image} style={S.previewImg} />
                ) : (
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,.35)", textAlign: "center", padding: 10 }}>No image yet</span>
                )}
              </div>
              <input className="ac-file" type="file" accept="image/*" style={{ marginTop: 10 }}
                disabled={uploading.popup}
                onChange={(e) => pickImage("popup", e.target.files?.[0] ?? null, (url) => setP({ image: url }))} />
              {uploading.popup && <span style={{ fontSize: 12, color: "#93b0ff" }}>Uploading…</span>}
            </div>

            <div style={{ display: "grid", gap: 14 }}>
              <div>
                <span className="ac-lbl">Or image URL</span>
                <input className="ac-input" value={popup.image} placeholder="/promos/poster.png or https://…"
                  onChange={(e) => setP({ image: e.target.value })} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div>
                  <span className="ac-lbl">Link on click</span>
                  <input className="ac-input" value={popup.href ?? ""} placeholder="/campus-ambassador-program"
                    onChange={(e) => setP({ href: e.target.value })} />
                </div>
                <div>
                  <span className="ac-lbl">Alt text</span>
                  <input className="ac-input" value={popup.alt} placeholder="Short description"
                    onChange={(e) => setP({ alt: e.target.value })} />
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, alignItems: "end" }}>
                <div>
                  <span className="ac-lbl">Auto-close (seconds)</span>
                  <input className="ac-input" type="number" min={3} max={120} value={popup.autoCloseSeconds}
                    onChange={(e) => setP({ autoCloseSeconds: Number(e.target.value) || 20 })} />
                </div>
                <label style={{ ...S.toggle, paddingBottom: 11 }}>
                  <input type="checkbox" checked={popup.oncePerSession} onChange={(e) => setP({ oncePerSession: e.target.checked })} />
                  <span style={{ fontSize: 13, color: "rgba(255,255,255,.7)" }}>Show once per session</span>
                </label>
              </div>
            </div>
          </div>
        </section>

        {/* ── STATUSES ── */}
        <section style={S.card}>
          <div style={S.cardHead}>
            <h2 style={S.h2}>Daily Status Updates <span style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,.35)" }}>({statuses.length})</span></h2>
            <button className="ac-btn" onClick={() => setStatuses((a) => [newStatus(), ...a])}
              style={{ background: "rgba(70,104,245,.18)", color: "#93b0ff", padding: "9px 16px", fontSize: 13 }}>
              + Add status
            </button>
          </div>

          {statuses.length === 0 && (
            <p style={{ fontSize: 13.5, color: "rgba(255,255,255,.35)" }}>No statuses. Add one — the newest shows first in the ring.</p>
          )}

          <div style={{ display: "grid", gap: 16 }}>
            {statuses.map((s, i) => (
              <div key={s.id} style={S.statusRow}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <span style={{ ...S.chip, background: STATUS_GRADIENTS[s.gradient] }}>#{i + 1}</span>
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,.4)" }}>{i === 0 ? "Newest — shown first" : ""}</span>
                  <button className="ac-btn" onClick={() => setStatuses((a) => a.filter((_, idx) => idx !== i))}
                    style={{ marginLeft: "auto", background: "rgba(239,68,68,.14)", color: "#f87171", padding: "6px 12px", fontSize: 12.5 }}>
                    Delete
                  </button>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 12 }}>
                  <div><span className="ac-lbl">Tag</span><input className="ac-input" value={s.tag} onChange={(e) => setS(i, { tag: e.target.value })} placeholder="New Jobs" /></div>
                  <div><span className="ac-lbl">Date</span><input className="ac-input" type="date" value={s.date} onChange={(e) => setS(i, { date: e.target.value })} /></div>
                  <div>
                    <span className="ac-lbl">Color</span>
                    <select className="ac-input" value={s.gradient} onChange={(e) => setS(i, { gradient: e.target.value as StatusGradient })}>
                      {GRADIENT_KEYS.map((g) => <option key={g} value={g} style={{ color: "#000" }}>{g}</option>)}
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: 12 }}>
                  <span className="ac-lbl">Title</span>
                  <input className="ac-input" value={s.title} onChange={(e) => setS(i, { title: e.target.value })} placeholder="5,000+ fresh roles live today" />
                </div>
                <div style={{ marginBottom: 12 }}>
                  <span className="ac-lbl">Body</span>
                  <textarea className="ac-input" value={s.body} onChange={(e) => setS(i, { body: e.target.value })} placeholder="Short description shown in the story…" />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                  <div><span className="ac-lbl">Button label (optional)</span><input className="ac-input" value={s.cta?.label ?? ""} onChange={(e) => setS(i, { cta: e.target.value ? { label: e.target.value, href: s.cta?.href ?? "" } : undefined })} placeholder="Browse jobs" /></div>
                  <div><span className="ac-lbl">Button link</span><input className="ac-input" value={s.cta?.href ?? ""} onChange={(e) => setS(i, { cta: { label: s.cta?.label ?? "Open", href: e.target.value } })} placeholder="/jobs" /></div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <span className="ac-lbl">Background image (optional)</span>
                    <input className="ac-input" value={s.image ?? ""} onChange={(e) => setS(i, { image: e.target.value })} placeholder="Image URL (optional)" />
                  </div>
                  <input className="ac-file" type="file" accept="image/*" style={{ marginTop: 20 }}
                    disabled={uploading[s.id]}
                    onChange={(e) => pickImage(s.id, e.target.files?.[0] ?? null, (url) =>
                      // match by id, not index — the list can be reordered mid-upload
                      setStatuses((a) => a.map((x) => (x.id === s.id ? { ...x, image: url } : x))))} />
                  {uploading[s.id]
                    ? <span style={{ fontSize: 12, color: "#93b0ff", marginTop: 20 }}>Uploading…</span>
                    : s.image && <span style={{ fontSize: 12, color: "#4ade80", marginTop: 20 }}>✓ image set</span>}
                </div>
              </div>
            ))}
          </div>
        </section>

        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 24 }}>
          <button className="ac-btn" onClick={save} disabled={saving}
            style={{ background: saving ? "#334155" : "#1d3a8f", color: "#fff", padding: "14px 34px", fontSize: 15, boxShadow: "0 6px 20px rgba(29,58,143,.4)", opacity: saving ? .7 : 1 }}>
            {saving ? "Saving…" : "Save changes"}
          </button>
        </div>
      </div>

      {toast && (
        <div style={{ position: "fixed", bottom: 26, left: "50%", transform: "translateX(-50%)", background: "#0f1b3a", border: "1px solid rgba(255,255,255,.12)", color: "#f1f5f9", padding: "13px 22px", borderRadius: 12, fontSize: 14, fontWeight: 700, boxShadow: "0 12px 40px rgba(0,0,0,.5)", zIndex: 100 }}>
          {toast}
        </div>
      )}
    </div>
  )
}

const S: Record<string, React.CSSProperties> = {
  page: { minHeight: "100svh", background: "#060d24", fontFamily: "-apple-system,BlinkMacSystemFont,'Inter','Segoe UI',sans-serif", color: "#f1f5f9", padding: "36px 20px 80px" },
  wrap: { maxWidth: 860, margin: "0 auto" },
  card: { background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 18, padding: "24px 26px", marginBottom: 20 },
  cardHead: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 },
  h2: { fontSize: 18, fontWeight: 800, color: "#f8fafc", margin: 0 },
  toggle: { display: "flex", alignItems: "center", gap: 8, cursor: "pointer" },
  preview: { width: 180, height: 220, borderRadius: 12, background: "rgba(255,255,255,.04)", border: "1px dashed rgba(255,255,255,.14)", display: "grid", placeItems: "center", overflow: "hidden" },
  previewImg: { width: "100%", height: "100%", objectFit: "cover" },
  statusRow: { background: "rgba(255,255,255,.025)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 14, padding: 18 },
  chip: { color: "#fff", fontWeight: 800, fontSize: 12, padding: "4px 10px", borderRadius: 999 },
}
