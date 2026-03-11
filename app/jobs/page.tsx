import Link from "next/link"
import { createServerClient } from "@/lib/supabase"

type Job = {
  id: string
  title: string
  company: string
  location: string
  slug: string
}

export const revalidate = 60

const STATIC_JOBS: Job[] = [
  {
    id: "1",
    title: "Technology Transfer & IP Manager",
    company: "IIT Kanpur (IITK)",
    location: "Kanpur, Uttar Pradesh",
    slug: "ip-manager-iitk",
  },
]

export default async function JobsPage() {
  let jobs: Job[] = STATIC_JOBS
  try {
    const supabase = createServerClient()
    const { data } = await supabase
      .from("jobs")
      .select("id, title, company, location, slug")
      .order("created_at", { ascending: false })
    if (data && data.length > 0) jobs = data
  } catch {
    // fallback to static jobs
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif" }}>
      {/* Header */}
      <header style={{
        background: "#fff",
        borderBottom: "1px solid #e2e8f0",
        position: "sticky",
        top: 0,
        zIndex: 20,
        boxShadow: "0 1px 3px rgba(0,0,0,.04)"
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 20px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/jobingen-logo.png" alt="Jobingen" style={{ height: 36, width: "auto", display: "block" }} />
          </Link>
          <span style={{ fontSize: 13, fontWeight: 600, color: "#64748b", background: "#f1f5f9", padding: "4px 12px", borderRadius: 20 }}>Careers</span>
        </div>
      </header>

      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg,#1e3a8a 0%,#1d4ed8 60%,#2563eb 100%)", padding: "56px 20px 52px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,.15)", borderRadius: 20, padding: "4px 14px", marginBottom: 18 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", display: "inline-block" }} />
            <span style={{ color: "#fff", fontSize: 12, fontWeight: 700, letterSpacing: ".5px", textTransform: "uppercase" }}>We&apos;re Hiring</span>
          </div>
          <h1 style={{ color: "#fff", fontSize: "clamp(28px,5vw,40px)", fontWeight: 900, margin: "0 0 12px", lineHeight: 1.15, letterSpacing: "-0.5px" }}>
            Build the future of<br />job search in India
          </h1>
          <p style={{ color: "rgba(255,255,255,.75)", fontSize: 16, margin: 0, maxWidth: 480 }}>
            Join Jobingen and help millions of Indian professionals find their dream jobs.
          </p>
        </div>
      </div>

      {/* Jobs */}
      <main style={{ maxWidth: 900, margin: "0 auto", padding: "40px 20px 60px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: "#0f172a", margin: 0 }}>
            Open Positions
            <span style={{ marginLeft: 10, fontSize: 13, fontWeight: 700, color: "#64748b", background: "#f1f5f9", padding: "2px 10px", borderRadius: 20 }}>
              {jobs?.length ?? 0}
            </span>
          </h2>
        </div>

        {!jobs || jobs.length === 0 ? (
          <div style={{ textAlign: "center", padding: "64px 20px", color: "#94a3b8" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>💼</div>
            <div style={{ fontSize: 16, fontWeight: 600 }}>No open positions right now</div>
            <div style={{ fontSize: 14, marginTop: 6 }}>Check back soon — we&apos;re growing fast.</div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {jobs.map((job: Job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid #e2e8f0", padding: "24px 20px", textAlign: "center" }}>
        <p style={{ fontSize: 13, color: "#94a3b8", margin: 0 }}>
          © {new Date().getFullYear()} Jobingen. All rights reserved.
        </p>
      </footer>
    </div>
  )
}

function JobCard({ job }: { job: Job }) {
  return (
    <div style={{
      background: "#fff",
      borderRadius: 16,
      border: "1px solid #e2e8f0",
      boxShadow: "0 1px 4px rgba(0,0,0,.05)",
      padding: "22px 24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 16,
      transition: "box-shadow .2s",
    }}>
      <div>
        <h3 style={{ fontSize: 17, fontWeight: 800, color: "#0f172a", margin: "0 0 6px", letterSpacing: "-.2px" }}>{job.title}</h3>
        <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 6 }}>
          <span style={{ fontSize: 13, color: "#475569", fontWeight: 600 }}>{job.company}</span>
          <span style={{ color: "#cbd5e1" }}>·</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 13, color: "#64748b" }}>
            <svg width="13" height="13" fill="none" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" fill="#94a3b8" />
            </svg>
            {job.location}
          </span>
        </div>
      </div>
      <Link
        href={`/jobs/${job.slug}`}
        style={{
          flexShrink: 0,
          background: "#1d4ed8",
          color: "#fff",
          fontSize: 13,
          fontWeight: 700,
          padding: "10px 22px",
          borderRadius: 10,
          textDecoration: "none",
          whiteSpace: "nowrap",
          letterSpacing: "-.1px",
        }}
      >
        View Job →
      </Link>
    </div>
  )
}
