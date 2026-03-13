"use client"

import { useState, useRef } from "react"

export default function ApplyForm({ jobSlug }: { jobSlug: string }) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [linkedin, setLinkedin] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    if (!name.trim()) return setError("Please enter your name.")
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError("Please enter a valid email address.")
    if (!phone.trim() || phone.replace(/\D/g, "").length < 10) return setError("Please enter a valid 10-digit phone number.")
    if (!file) return setError("Please upload your resume.")

    setSubmitting(true)
    try {
      const fd = new FormData()
      fd.append("name", name.trim())
      fd.append("email", email.trim().toLowerCase())
      fd.append("phone", phone.trim())
      fd.append("linkedin", linkedin.trim())
      fd.append("job_slug", jobSlug)
      fd.append("resume", file)

      const res = await fetch("/api/jobs/apply", { method: "POST", body: fd })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Submission failed.")
      setSuccess(true)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  if (success) {
    return (
      <div style={{
        background: "#f0fdf4",
        border: "1.5px solid #bbf7d0",
        borderRadius: 16,
        padding: "32px 28px",
        textAlign: "center",
      }}>
        <div style={{ marginBottom: 12, display: "flex", justifyContent: "center" }}><svg width="40" height="40" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="18" stroke="#15803d" strokeWidth="2"/><path d="M12 20L17.5 25.5L28 14" stroke="#15803d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
        <h3 style={{ fontSize: 18, fontWeight: 800, color: "#15803d", margin: "0 0 8px" }}>Application Submitted!</h3>
        <p style={{ fontSize: 15, color: "#166534", margin: 0, lineHeight: 1.6 }}>
          Application submitted successfully. Our team will review your resume.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      {error && (
        <div style={{ background: "#fff1f2", border: "1px solid #fecdd3", borderRadius: 10, padding: "12px 16px", color: "#be123c", fontSize: 14, fontWeight: 600 }}>
          {error}
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Field label="Full Name *" value={name} onChange={setName} placeholder="Rahul Sharma" />
        <Field label="Email Address *" value={email} onChange={setEmail} placeholder="rahul@email.com" type="email" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Field label="Phone Number *" value={phone} onChange={setPhone} placeholder="+91 98765 43210" type="tel" />
        <Field label="LinkedIn Profile (optional)" value={linkedin} onChange={setLinkedin} placeholder="linkedin.com/in/your-profile" />
      </div>

      {/* Resume Upload */}
      <div>
        <label style={{ fontSize: 13, fontWeight: 700, color: "#374151", display: "block", marginBottom: 8 }}>
          Upload Resume *
          <span style={{ fontSize: 11, fontWeight: 500, color: "#94a3b8", marginLeft: 6 }}>PDF, DOC or DOCX — max 10MB</span>
        </label>
        <div
          onClick={() => fileRef.current?.click()}
          style={{
            border: `2px dashed ${file ? "#bbf7d0" : "#d1d5db"}`,
            borderRadius: 12,
            padding: "24px 20px",
            textAlign: "center",
            cursor: "pointer",
            background: file ? "#f0fdf4" : "#fafafa",
            transition: "all .2s",
          }}
        >
          <input
            ref={fileRef}
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            style={{ display: "none" }}
            onChange={e => setFile(e.target.files?.[0] ?? null)}
          />
          {file ? (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" style={{ color: "#15803d" }}><rect x="4" y="2" width="14" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M7.5 7.5H14.5M7.5 11H12M7.5 14.5H13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#166534" }}>{file.name}</div>
                <div style={{ fontSize: 12, color: "#15803d" }}>{(file.size / 1024).toFixed(1)} KB · Click to change</div>
              </div>
            </div>
          ) : (
            <div>
              <div style={{ fontSize: 28, marginBottom: 8 }}>📎</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#374151" }}>Click to upload your resume</div>
              <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 4 }}>PDF, DOC, or DOCX accepted</div>
            </div>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        style={{
          background: submitting ? "#93c5fd" : "#1d4ed8",
          color: "#fff",
          border: "none",
          borderRadius: 12,
          padding: "14px 24px",
          fontSize: 15,
          fontWeight: 800,
          cursor: submitting ? "not-allowed" : "pointer",
          letterSpacing: "-.2px",
          transition: "background .2s",
          marginTop: 4,
        }}
      >
        {submitting ? "Submitting…" : "Submit Application"}
      </button>
    </form>
  )
}

function Field({
  label, value, onChange, placeholder, type = "text"
}: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string
}) {
  return (
    <div>
      <label style={{ fontSize: 13, fontWeight: 700, color: "#374151", display: "block", marginBottom: 6 }}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: "100%",
          border: "1.5px solid #d1d5db",
          borderRadius: 10,
          padding: "10px 14px",
          fontSize: 14,
          color: "#0f172a",
          outline: "none",
          background: "#fff",
          boxSizing: "border-box",
          fontFamily: "inherit",
          transition: "border-color .2s",
        }}
        onFocus={e => (e.target.style.borderColor = "#3b82f6")}
        onBlur={e => (e.target.style.borderColor = "#d1d5db")}
      />
    </div>
  )
}
