"use client"

import { useEffect, useState, useMemo } from "react"

type EarlyAccessUser = {
  id: string; name: string; email: string; phone?: string; created_at: string
}
type HackathonReg = {
  id: string; name: string; email: string; phone?: string; college?: string
  team_name?: string; learning_cluster?: string; upi_transaction_id?: string; payment_screenshot_url?: string; bootcamp?: string; created_at: string
}
type BootcampFeedback = {
  id: string; name: string; email?: string
  overall_rating: number; content_rating: number; mentor_rating: number
  liked: string; improve?: string; recommend?: string; next_topic?: string
  bootcamp: string; created_at: string
}
type CampusAmbassador = {
  id: string; name: string; email: string; phone: string; college: string
  course_year: string; linkedin?: string; instagram?: string; why_ambassador: string; created_at: string
}
type JobApplication = {
  id: string; name: string; email: string; phone: string
  linkedin?: string; resume_url?: string; job_slug: string; job_title: string; created_at: string
}
type HackathonSubmission = {
  id: string; team_name: string; leader_name: string; email: string
  project_title: string; description: string; tech_stack: string
  github_link: string; demo_link?: string; screenshot_url?: string; created_at: string
}
type StudentInsight = {
  id: string; problem_categories: string[]; skill_rating: number
  resume_problem: string; student_insight_text: string; created_at: string
}

function fmt(iso: string) {
  return new Date(iso).toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })
}

function exportCSV(data: Record<string, unknown>[], filename: string) {
  if (!data.length) return
  const keys = Object.keys(data[0]).filter(k => k !== "id")
  const rows = data.map(r => keys.map(k => `"${String(r[k] ?? "").replace(/"/g, '""')}"`).join(","))
  const csv = [keys.join(","), ...rows].join("\n")
  const a = document.createElement("a")
  a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }))
  a.download = filename; a.click()
}

function filterRows<T extends { name: string; email: string }>(rows: T[], q: string): T[] {
  if (!q.trim()) return rows
  const s = q.toLowerCase()
  return rows.filter(r => r.name.toLowerCase().includes(s) || r.email.toLowerCase().includes(s))
}

export default function AdminPage() {
  const [earlyAccess, setEarlyAccess] = useState<EarlyAccessUser[]>([])
  const [bootcamp1, setBootcamp1] = useState<HackathonReg[]>([])
  const [bootcamp2, setBootcamp2] = useState<HackathonReg[]>([])
  const [feedback, setFeedback] = useState<BootcampFeedback[]>([])
  const [ambassadors, setAmbassadors] = useState<CampusAmbassador[]>([])
  const [jobApplications, setJobApplications] = useState<JobApplication[]>([])
  const [hackathonSubs, setHackathonSubs] = useState<HackathonSubmission[]>([])
  const [studentInsights, setStudentInsights] = useState<StudentInsight[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [search, setSearch] = useState("")
  const [authChecked, setAuthChecked] = useState(false)

  useEffect(() => {
    const pwd = typeof window !== "undefined" ? sessionStorage.getItem("adm_auth") : null
    if (!pwd) { window.location.href = "/admin-login"; return }
    setAuthChecked(true)
    fetch("/api/admin/data", { headers: { Authorization: `Bearer ${pwd}` } })
      .then(r => { if (r.status === 401) { sessionStorage.removeItem("adm_auth"); window.location.href = "/admin-login" } return r.json() })
      .then(d => { setEarlyAccess(d.earlyAccess || []); setBootcamp1(d.bootcamp1 || []); setBootcamp2(d.bootcamp2 || []); setFeedback(d.feedback || []); setAmbassadors(d.campusAmbassadors || []); setJobApplications(d.jobApplications || []); setHackathonSubs(d.hackathonSubmissions || []); setStudentInsights(d.studentInsights || []) })
      .catch(() => setError("Failed to load data. Refresh to retry."))
      .finally(() => setLoading(false))
  }, [])

  const eaFiltered  = useMemo(() => filterRows(earlyAccess, search), [earlyAccess, search])
  const b1Filtered  = useMemo(() => filterRows(bootcamp1, search), [bootcamp1, search])
  const b2Filtered  = useMemo(() => filterRows(bootcamp2, search), [bootcamp2, search])
  const fbFiltered  = useMemo(() => filterRows(feedback, search), [feedback, search])
  const caFiltered  = useMemo(() => filterRows(ambassadors, search), [ambassadors, search])
  const jaFiltered  = useMemo(() => filterRows(jobApplications, search), [jobApplications, search])
  const hsFiltered  = useMemo(() => {
    if (!search.trim()) return hackathonSubs
    const s = search.toLowerCase()
    return hackathonSubs.filter(r => r.leader_name.toLowerCase().includes(s) || r.email.toLowerCase().includes(s) || r.team_name.toLowerCase().includes(s) || r.project_title.toLowerCase().includes(s))
  }, [hackathonSubs, search])

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
  const logout = () => { sessionStorage.removeItem("adm_auth"); window.location.href = "/admin-login" }

  if (!authChecked) return null

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        body{background:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;-webkit-font-smoothing:antialiased}
        .adm{min-height:100vh;background:#f1f5f9}
        /* Header */
        .adm-hdr{background:#0f172a;height:64px;display:flex;align-items:center;justify-content:space-between;padding:0 32px;position:sticky;top:0;z-index:50;box-shadow:0 1px 0 rgba(255,255,255,.05)}
        .adm-hdr-l{display:flex;align-items:center;gap:12px}
        .adm-hdr-dot{width:9px;height:9px;border-radius:50%;background:#22c55e;box-shadow:0 0 0 3px rgba(34,197,94,.2);animation:adm-pulse 2s infinite}
        @keyframes adm-pulse{0%,100%{box-shadow:0 0 0 3px rgba(34,197,94,.2)}50%{box-shadow:0 0 0 6px rgba(34,197,94,.08)}}
        .adm-hdr-title{color:#f8fafc;font-size:17px;font-weight:800;letter-spacing:-.3px}
        .adm-hdr-sub{color:#475569;font-size:12px;font-weight:500;margin-top:1px}
        .adm-hdr-r{display:flex;align-items:center;gap:12px}
        .adm-search{background:#1e293b;border:1.5px solid #334155;border-radius:10px;padding:8px 14px 8px 36px;font-size:13px;color:#f8fafc;outline:none;width:240px;font-family:inherit;transition:all .2s;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' fill='none' viewBox='0 0 24 24'%3E%3Ccircle cx='11' cy='11' r='8' stroke='%2364748b' stroke-width='2'/%3E%3Cpath d='m21 21-4.35-4.35' stroke='%2364748b' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:12px center}
        .adm-search:focus{border-color:#3b82f6;box-shadow:0 0 0 3px rgba(59,130,246,.15)}
        .adm-search::placeholder{color:#475569}
        .adm-logout{background:#1e293b;border:1.5px solid #334155;color:#94a3b8;font-size:13px;font-weight:600;padding:8px 16px;border-radius:10px;cursor:pointer;font-family:inherit;transition:all .2s}
        .adm-logout:hover{background:#334155;color:#f8fafc}
        @media(max-width:640px){.adm-hdr{padding:0 16px;height:56px}.adm-search{width:140px}.adm-hdr-sub{display:none}}
        /* Body */
        .adm-body{padding:28px 32px;max-width:1440px;margin:0 auto}
        @media(max-width:768px){.adm-body{padding:16px}}
        /* Stats */
        .adm-stats{display:grid;grid-template-columns:repeat(6,1fr);gap:14px;margin-bottom:28px}
        @media(max-width:1200px){.adm-stats{grid-template-columns:repeat(3,1fr)}}
        @media(max-width:768px){.adm-stats{grid-template-columns:repeat(2,1fr)}}
        @media(max-width:480px){.adm-stats{grid-template-columns:1fr 1fr}}
        .adm-stat{background:#fff;border-radius:14px;padding:20px 22px;border:1px solid #e2e8f0;box-shadow:0 1px 3px rgba(0,0,0,.05)}
        .adm-stat-lbl{font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:.6px;margin-bottom:10px}
        .adm-stat-val{font-size:34px;font-weight:900;line-height:1;color:#0f172a}
        .adm-stat-val.green{color:#16a34a}
        .adm-stat-val.blue{color:#2563eb}
        .adm-stat-val.purple{color:#7c3aed}
        .adm-stat-val.orange{color:#ea580c}
        .adm-stat-sub{font-size:11px;color:#94a3b8;margin-top:6px;font-weight:500}
        /* Error */
        .adm-err{background:#fff1f2;border:1px solid #fecdd3;border-radius:12px;padding:16px 20px;color:#be123c;font-size:14px;font-weight:600;margin-bottom:20px}
        /* Loading */
        .adm-load{display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:50vh;gap:16px}
        .adm-spinner{width:36px;height:36px;border:3px solid #e2e8f0;border-top-color:#3b82f6;border-radius:50%;animation:adm-spin .65s linear infinite}
        @keyframes adm-spin{to{transform:rotate(360deg)}}
        .adm-load-txt{color:#64748b;font-size:14px;font-weight:500}
        /* Section */
        .adm-sec{background:#fff;border-radius:16px;border:1px solid #e2e8f0;box-shadow:0 1px 4px rgba(0,0,0,.05);margin-bottom:24px;overflow:hidden}
        .adm-sec-head{padding:18px 24px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}
        .adm-sec-hl{display:flex;align-items:center;gap:10px}
        .adm-sec-title{font-size:15px;font-weight:800;color:#0f172a;letter-spacing:-.2px}
        .adm-stat{cursor:pointer;transition:transform .15s,box-shadow .15s}
        .adm-stat:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,.08)}
        .adm-sec-badge{background:#f1f5f9;color:#475569;font-size:11px;font-weight:700;padding:3px 10px;border-radius:20px}
        .adm-csv{display:inline-flex;align-items:center;gap:6px;background:#f8fafc;border:1.5px solid #e2e8f0;color:#475569;font-size:12px;font-weight:700;padding:6px 14px;border-radius:8px;cursor:pointer;font-family:inherit;transition:all .2s;white-space:nowrap}
        .adm-csv:hover{background:#e2e8f0;color:#0f172a}
        /* Table */
        .adm-tbl-wrap{overflow-x:auto;-webkit-overflow-scrolling:touch}
        table{width:100%;border-collapse:collapse;min-width:600px}
        thead tr{background:#f8fafc}
        th{padding:10px 18px;text-align:left;font-size:10px;font-weight:800;color:#94a3b8;text-transform:uppercase;letter-spacing:.7px;white-space:nowrap;border-bottom:1px solid #f1f5f9}
        td{padding:13px 18px;font-size:13px;color:#334155;border-bottom:1px solid #f8fafc;vertical-align:middle}
        tr:last-child td{border-bottom:none}
        tbody tr:hover{background:#fafbfc}
        .adm-empty{padding:48px 24px;text-align:center;color:#94a3b8;font-size:14px;font-weight:500}
        .adm-empty-ico{font-size:28px;margin-bottom:10px}
        /* Cell types */
        .c-num{color:#94a3b8;font-size:12px;font-weight:600}
        .c-name{font-weight:700;color:#0f172a}
        .c-email{color:#2563eb;font-size:12px}
        .c-phone{color:#475569;font-family:monospace;font-size:12px}
        .c-date{color:#94a3b8;font-size:11px;white-space:nowrap}
        .c-txn{font-family:monospace;font-size:11px;color:#475569;max-width:140px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;display:block}
        .c-tag{display:inline-flex;align-items:center;background:#f0fdf4;color:#16a34a;font-size:11px;font-weight:700;padding:3px 10px;border-radius:20px;border:1px solid #bbf7d0;white-space:nowrap}
        .c-link{color:#2563eb;font-size:12px;font-weight:600;text-decoration:none}
        .c-link:hover{text-decoration:underline}
        .c-why{max-width:220px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:12px;color:#64748b;cursor:help}
      ` }} />

      <div className="adm">
        {/* Header */}
        <header className="adm-hdr">
          <div className="adm-hdr-l">
            <div className="adm-hdr-dot" />
            <div>
              <div className="adm-hdr-title">Jobingen Admin</div>
              <div className="adm-hdr-sub">Internal Dashboard</div>
            </div>
          </div>
          <div className="adm-hdr-r">
            <input
              className="adm-search"
              placeholder="Search name or email..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <button className="adm-logout" onClick={logout}>Logout</button>
          </div>
        </header>

        <div className="adm-body">
          {loading ? (
            <div className="adm-load">
              <div className="adm-spinner" />
              <div className="adm-load-txt">Loading data...</div>
            </div>
          ) : (
            <>
              {error && <div className="adm-err">{error}</div>}

              {/* Stats */}
              <div className="adm-stats">
                <div className="adm-stat" onClick={() => scrollTo("sec-bootcamp1")}>
                  <div className="adm-stat-lbl">Bootcamp 1</div>
                  <div className="adm-stat-val blue">{bootcamp1.length}</div>
                  <div className="adm-stat-sub">Registrations</div>
                </div>
                <div className="adm-stat" onClick={() => scrollTo("sec-bootcamp2")}>
                  <div className="adm-stat-lbl">Bootcamp 2</div>
                  <div className="adm-stat-val" style={{ color:"#0891b2" }}>{bootcamp2.length}</div>
                  <div className="adm-stat-sub">Registrations</div>
                </div>
                <div className="adm-stat" onClick={() => scrollTo("sec-feedback")}>
                  <div className="adm-stat-lbl">Feedback</div>
                  <div className="adm-stat-val green">{feedback.length}</div>
                  <div className="adm-stat-sub">Bootcamp 1 responses</div>
                </div>
                <div className="adm-stat" onClick={() => scrollTo("sec-early-access")}>
                  <div className="adm-stat-lbl">Early Access</div>
                  <div className="adm-stat-val purple">{earlyAccess.length}</div>
                  <div className="adm-stat-sub">Waitlist signups</div>
                </div>
                <div className="adm-stat" onClick={() => scrollTo("sec-hackathon")}>
                  <div className="adm-stat-lbl">Hackathon</div>
                  <div className="adm-stat-val" style={{ color: "#7c3aed" }}>{hackathonSubs.length}</div>
                  <div className="adm-stat-sub">Project submissions</div>
                </div>
                <div className="adm-stat" onClick={() => scrollTo("sec-ambassadors")}>
                  <div className="adm-stat-lbl">Ambassadors</div>
                  <div className="adm-stat-val orange">{ambassadors.length}</div>
                  <div className="adm-stat-sub">Applications</div>
                </div>
                <div className="adm-stat" onClick={() => scrollTo("sec-student-insights")}>
                  <div className="adm-stat-lbl">Student Insights</div>
                  <div className="adm-stat-val" style={{ color: "#0d9488" }}>{studentInsights.length}</div>
                  <div className="adm-stat-sub">Survey responses</div>
                </div>
              </div>

              {/* ── Early Access ── */}
              <div id="sec-early-access" className="adm-sec">
                <div className="adm-sec-head">
                  <div className="adm-sec-hl">
                    <div className="adm-sec-title">Early Access Users</div>
                    <div className="adm-sec-badge">{eaFiltered.length} users</div>
                  </div>
                  <button className="adm-csv" onClick={() => exportCSV(eaFiltered as unknown as Record<string, unknown>[], "early-access.csv")}>
                    <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    Export CSV
                  </button>
                </div>
                <div className="adm-tbl-wrap">
                  {eaFiltered.length === 0 ? (
                    <div className="adm-empty">
                      <div className="adm-empty-ico">📭</div>
                      {search ? `No results for "${search}"` : "No registrations yet"}
                    </div>
                  ) : (
                    <table>
                      <thead>
                        <tr>
                          <th>#</th><th>Name</th><th>Email</th><th>Phone</th><th>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {eaFiltered.map((u, i) => (
                          <tr key={u.id}>
                            <td className="c-num">{i + 1}</td>
                            <td className="c-name">{u.name}</td>
                            <td className="c-email">{u.email}</td>
                            <td className="c-phone">{u.phone || "—"}</td>
                            <td className="c-date">{fmt(u.created_at)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>

              {/* ── Bootcamp 2 Registrations ── */}
              <div id="sec-bootcamp2" className="adm-sec">
                <div className="adm-sec-head">
                  <div className="adm-sec-hl">
                    <div className="adm-sec-title">Bootcamp 2 — Registrations</div>
                    <div className="adm-sec-badge">{b2Filtered.length} registrations</div>
                  </div>
                  <button className="adm-csv" onClick={() => exportCSV(b2Filtered as unknown as Record<string, unknown>[], "bootcamp2-registrations.csv")}>
                    <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    Export CSV
                  </button>
                </div>
                <div className="adm-tbl-wrap">
                  {b2Filtered.length === 0 ? (
                    <div className="adm-empty">
                      <div className="adm-empty-ico">📭</div>
                      {search ? `No results for "${search}"` : "No registrations yet"}
                    </div>
                  ) : (
                    <table>
                      <thead>
                        <tr><th>#</th><th>Name</th><th>Email</th><th>Phone</th><th>College</th><th>Cluster</th><th>Transaction ID</th><th>Screenshot</th><th>Date</th></tr>
                      </thead>
                      <tbody>
                        {b2Filtered.map((r, i) => (
                          <tr key={r.id}>
                            <td className="c-num">{i + 1}</td>
                            <td className="c-name">{r.name}</td>
                            <td className="c-email">{r.email}</td>
                            <td className="c-phone">{r.phone || "—"}</td>
                            <td style={{ fontSize: 13 }}>{r.college || "—"}</td>
                            <td style={{ fontSize: 12, fontWeight: 600, color: "#7c3aed" }}>{r.learning_cluster || "—"}</td>
                            <td><span className="c-txn" title={r.upi_transaction_id}>{r.upi_transaction_id || "—"}</span></td>
                            <td>{r.payment_screenshot_url ? <a className="c-link" href={r.payment_screenshot_url} target="_blank" rel="noopener noreferrer">View</a> : "—"}</td>
                            <td className="c-date">{fmt(r.created_at)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>

              {/* ── Hackathon Project Submissions ── */}
              <div id="sec-hackathon" className="adm-sec">
                <div className="adm-sec-head">
                  <div className="adm-sec-hl">
                    <div className="adm-sec-title">Hackathon — Project Submissions</div>
                    <div className="adm-sec-badge">{hsFiltered.length} projects</div>
                  </div>
                  <button className="adm-csv" onClick={() => exportCSV(hsFiltered as unknown as Record<string, unknown>[], "hackathon-submissions.csv")}>
                    <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    Export CSV
                  </button>
                </div>
                <div className="adm-tbl-wrap">
                  {hsFiltered.length === 0 ? (
                    <div className="adm-empty">
                      <div className="adm-empty-ico">📭</div>
                      {search ? `No results for "${search}"` : "No project submissions yet"}
                    </div>
                  ) : (
                    <table>
                      <thead>
                        <tr><th>#</th><th>Team</th><th>Leader</th><th>Email</th><th>Project</th><th>Tech Stack</th><th>GitHub</th><th>Demo</th><th>Screenshot</th><th>Date</th></tr>
                      </thead>
                      <tbody>
                        {hsFiltered.map((r, i) => (
                          <tr key={r.id}>
                            <td className="c-num">{i + 1}</td>
                            <td className="c-name">{r.team_name}</td>
                            <td style={{ fontSize: 13 }}>{r.leader_name}</td>
                            <td className="c-email">{r.email}</td>
                            <td>
                              <div style={{ fontWeight: 700, fontSize: 13, color: "#0f172a" }}>{r.project_title}</div>
                              <span className="c-why" title={r.description}>{r.description}</span>
                            </td>
                            <td style={{ fontSize: 12, color: "#64748b", maxWidth: 160 }}>{r.tech_stack}</td>
                            <td><a className="c-link" href={r.github_link} target="_blank" rel="noopener noreferrer">Repo</a></td>
                            <td>{r.demo_link ? <a className="c-link" href={r.demo_link} target="_blank" rel="noopener noreferrer">View</a> : "—"}</td>
                            <td>{r.screenshot_url ? <a className="c-link" href={r.screenshot_url} target="_blank" rel="noopener noreferrer">View</a> : "—"}</td>
                            <td className="c-date">{fmt(r.created_at)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>

              {/* ── Bootcamp 1 Feedback ── */}
              <div id="sec-feedback" className="adm-sec">
                <div className="adm-sec-head">
                  <div className="adm-sec-hl">
                    <div className="adm-sec-title">Bootcamp 1 — Feedback</div>
                    <div className="adm-sec-badge">{fbFiltered.length} responses</div>
                  </div>
                  <button className="adm-csv" onClick={() => exportCSV(fbFiltered as unknown as Record<string, unknown>[], "bootcamp1-feedback.csv")}>
                    <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    Export CSV
                  </button>
                </div>
                <div className="adm-tbl-wrap">
                  {fbFiltered.length === 0 ? (
                    <div className="adm-empty">
                      <div className="adm-empty-ico">📭</div>
                      {search ? `No results for "${search}"` : "No feedback yet"}
                    </div>
                  ) : (
                    <table>
                      <thead>
                        <tr><th>#</th><th>Name</th><th>Email</th><th>Overall</th><th>Content</th><th>Mentor</th><th>Liked</th><th>Improve</th><th>Recommend</th><th>Next Topic</th><th>Date</th></tr>
                      </thead>
                      <tbody>
                        {fbFiltered.map((r, i) => (
                          <tr key={r.id}>
                            <td className="c-num">{i + 1}</td>
                            <td className="c-name">{r.name}</td>
                            <td className="c-email">{r.email || "—"}</td>
                            <td style={{ fontSize: 14, fontWeight: 800, color: r.overall_rating >= 4 ? "#16a34a" : r.overall_rating >= 3 ? "#d97706" : "#dc2626" }}>{"★".repeat(r.overall_rating)}{"☆".repeat(5 - r.overall_rating)}</td>
                            <td style={{ fontSize: 12, color: "#64748b" }}>{r.content_rating ? `${r.content_rating}/5` : "—"}</td>
                            <td style={{ fontSize: 12, color: "#64748b" }}>{r.mentor_rating ? `${r.mentor_rating}/5` : "—"}</td>
                            <td><span className="c-why" title={r.liked}>{r.liked}</span></td>
                            <td><span className="c-why" title={r.improve}>{r.improve || "—"}</span></td>
                            <td style={{ fontSize: 12 }}>{r.recommend || "—"}</td>
                            <td style={{ fontSize: 12, color: "#64748b" }}>{r.next_topic || "—"}</td>
                            <td className="c-date">{fmt(r.created_at)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>

              {/* ── Bootcamp 1 Registrations ── */}
              <div id="sec-bootcamp1" className="adm-sec">
                <div className="adm-sec-head">
                  <div className="adm-sec-hl">
                    <div className="adm-sec-title">Bootcamp 1 — Registrations</div>
                    <div className="adm-sec-badge">{b1Filtered.length} registrations</div>
                  </div>
                  <button className="adm-csv" onClick={() => exportCSV(b1Filtered as unknown as Record<string, unknown>[], "bootcamp1-registrations.csv")}>
                    <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    Export CSV
                  </button>
                </div>
                <div className="adm-tbl-wrap">
                  {b1Filtered.length === 0 ? (
                    <div className="adm-empty">
                      <div className="adm-empty-ico">📭</div>
                      {search ? `No results for "${search}"` : "No registrations"}
                    </div>
                  ) : (
                    <table>
                      <thead>
                        <tr><th>#</th><th>Name</th><th>Email</th><th>Phone</th><th>College</th><th>Transaction ID</th><th>Screenshot</th><th>Date</th></tr>
                      </thead>
                      <tbody>
                        {b1Filtered.map((r, i) => (
                          <tr key={r.id}>
                            <td className="c-num">{i + 1}</td>
                            <td className="c-name">{r.name}</td>
                            <td className="c-email">{r.email}</td>
                            <td className="c-phone">{r.phone || "—"}</td>
                            <td style={{ fontSize: 13 }}>{r.college || "—"}</td>
                            <td><span className="c-txn" title={r.upi_transaction_id}>{r.upi_transaction_id || "—"}</span></td>
                            <td>{r.payment_screenshot_url ? <a className="c-link" href={r.payment_screenshot_url} target="_blank" rel="noopener noreferrer">View</a> : "—"}</td>
                            <td className="c-date">{fmt(r.created_at)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>

              {/* ── Job Applications ── */}
              <div id="sec-jobs" className="adm-sec">
                <div className="adm-sec-head">
                  <div className="adm-sec-hl">
                    <div className="adm-sec-title">Job Applications</div>
                    <div className="adm-sec-badge">{jaFiltered.length} applications</div>
                  </div>
                  <button className="adm-csv" onClick={() => exportCSV(jaFiltered as unknown as Record<string, unknown>[], "job-applications.csv")}>
                    <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    Export CSV
                  </button>
                </div>
                <div className="adm-tbl-wrap">
                  {jaFiltered.length === 0 ? (
                    <div className="adm-empty">
                      <div className="adm-empty-ico">📭</div>
                      {search ? `No results for "${search}"` : "No job applications yet"}
                    </div>
                  ) : (
                    <table>
                      <thead>
                        <tr>
                          <th>#</th><th>Name</th><th>Email</th><th>Phone</th>
                          <th>Job Title</th><th>LinkedIn</th><th>Resume</th><th>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {jaFiltered.map((a, i) => (
                          <tr key={a.id}>
                            <td className="c-num">{i + 1}</td>
                            <td className="c-name">{a.name}</td>
                            <td className="c-email">{a.email}</td>
                            <td className="c-phone">{a.phone}</td>
                            <td>
                              <span className="c-tag">{a.job_title}</span>
                            </td>
                            <td>
                              {a.linkedin
                                ? <a className="c-link" href={a.linkedin.startsWith("http") ? a.linkedin : `https://${a.linkedin}`} target="_blank" rel="noopener noreferrer">View</a>
                                : "—"}
                            </td>
                            <td>
                              {a.resume_url
                                ? <a className="c-link" href={a.resume_url} target="_blank" rel="noopener noreferrer">Download ↓</a>
                                : "—"}
                            </td>
                            <td className="c-date">{fmt(a.created_at)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>

              {/* ── Student Insights ── */}
              <div id="sec-student-insights" className="adm-sec">
                <div className="adm-sec-head">
                  <div className="adm-sec-hl">
                    <div className="adm-sec-title">Student Insights</div>
                    <div className="adm-sec-badge">{studentInsights.length} responses</div>
                  </div>
                  <button className="adm-csv" onClick={() => exportCSV(studentInsights.map(s => ({ ...s, problem_categories: (s.problem_categories || []).join(", ") })) as unknown as Record<string, unknown>[], "student-insights.csv")}>
                    <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    Export CSV
                  </button>
                </div>
                <div className="adm-tbl-wrap">
                  {studentInsights.length === 0 ? (
                    <div className="adm-empty">
                      <div className="adm-empty-ico">📭</div>
                      No student insights yet
                    </div>
                  ) : (
                    <table>
                      <thead>
                        <tr>
                          <th>#</th><th>Problem Categories</th><th>Skill Rating</th>
                          <th>Resume Challenge</th><th>Open Insight</th><th>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {studentInsights.map((s, i) => (
                          <tr key={s.id}>
                            <td className="c-num">{i + 1}</td>
                            <td style={{ fontSize: 12 }}>{(s.problem_categories || []).join(", ") || "—"}</td>
                            <td style={{ textAlign: "center" }}>{"⭐".repeat(s.skill_rating || 0)}</td>
                            <td style={{ fontSize: 12 }}>{s.resume_problem || "—"}</td>
                            <td><span className="c-why" title={s.student_insight_text}>{s.student_insight_text || "—"}</span></td>
                            <td className="c-date">{fmt(s.created_at)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>

              {/* ── Campus Ambassadors ── */}
              <div id="sec-ambassadors" className="adm-sec">
                <div className="adm-sec-head">
                  <div className="adm-sec-hl">
                    <div className="adm-sec-title">Campus Ambassador Applications</div>
                    <div className="adm-sec-badge">{caFiltered.length} applications</div>
                  </div>
                  <button className="adm-csv" onClick={() => exportCSV(caFiltered as unknown as Record<string, unknown>[], "campus-ambassadors.csv")}>
                    <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    Export CSV
                  </button>
                </div>
                <div className="adm-tbl-wrap">
                  {caFiltered.length === 0 ? (
                    <div className="adm-empty">
                      <div className="adm-empty-ico">📭</div>
                      {search ? `No results for "${search}"` : "No applications yet"}
                    </div>
                  ) : (
                    <table>
                      <thead>
                        <tr>
                          <th>#</th><th>Name</th><th>Email</th><th>Phone</th>
                          <th>College</th><th>Course / Year</th>
                          <th>LinkedIn</th><th>Instagram</th><th>Why Ambassador</th><th>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {caFiltered.map((a, i) => (
                          <tr key={a.id}>
                            <td className="c-num">{i + 1}</td>
                            <td className="c-name">{a.name}</td>
                            <td className="c-email">{a.email}</td>
                            <td className="c-phone">{a.phone}</td>
                            <td style={{ fontSize: 13 }}>{a.college}</td>
                            <td style={{ fontSize: 12, color: "#64748b" }}>{a.course_year}</td>
                            <td>
                              {a.linkedin
                                ? <a className="c-link" href={a.linkedin.startsWith("http") ? a.linkedin : `https://${a.linkedin}`} target="_blank" rel="noopener noreferrer">View</a>
                                : "—"}
                            </td>
                            <td style={{ fontSize: 12, color: "#64748b" }}>{a.instagram || "—"}</td>
                            <td><span className="c-why" title={a.why_ambassador}>{a.why_ambassador}</span></td>
                            <td className="c-date">{fmt(a.created_at)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}
