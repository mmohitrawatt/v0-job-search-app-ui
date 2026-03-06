"use client"

import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type EarlyAccessUser = {
  id: string
  name: string
  email: string
  phone?: string
  created_at: string
}

type HackathonRegistration = {
  id: string
  name: string
  email: string
  phone?: string
  college?: string
  team_name?: string
  upi_transaction_id?: string
  payment_screenshot_url?: string
  created_at: string
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export default function AdminPage() {
  const [earlyAccess, setEarlyAccess] = useState<EarlyAccessUser[]>([])
  const [hackathon, setHackathon] = useState<HackathonRegistration[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const [{ data: ea, error: eaErr }, { data: hr, error: hrErr }] = await Promise.all([
          supabase.from("early_access").select("*").order("created_at", { ascending: false }),
          supabase.from("hackathon_registrations").select("*").order("created_at", { ascending: false }),
        ])
        if (eaErr) throw eaErr
        if (hrErr) throw hrErr
        setEarlyAccess(ea || [])
        setHackathon(hr || [])
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Failed to load data")
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        body{background:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif}
        .adm-wrap{min-height:100vh;background:#f1f5f9}
        .adm-header{background:#0f172a;padding:0 32px;height:64px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:10;box-shadow:0 1px 3px rgba(0,0,0,.3)}
        .adm-header-logo{display:flex;align-items:center;gap:12px}
        .adm-header-logo-dot{width:10px;height:10px;border-radius:50%;background:#22c55e;box-shadow:0 0 0 3px rgba(34,197,94,.2);animation:pulse 2s infinite}
        @keyframes pulse{0%,100%{box-shadow:0 0 0 3px rgba(34,197,94,.2)}50%{box-shadow:0 0 0 6px rgba(34,197,94,.1)}}
        .adm-header-title{color:#f8fafc;font-size:18px;font-weight:700;letter-spacing:-.3px}
        .adm-header-sub{color:#64748b;font-size:13px;font-weight:500}
        .adm-body{padding:32px;max-width:1400px;margin:0 auto}
        @media(max-width:768px){.adm-body{padding:16px}}
        .adm-stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;margin-bottom:32px}
        .adm-stat-card{background:#fff;border-radius:14px;padding:24px;box-shadow:0 1px 3px rgba(0,0,0,.07);border:1px solid #e2e8f0}
        .adm-stat-label{font-size:12px;font-weight:600;color:#94a3b8;text-transform:uppercase;letter-spacing:.6px;margin-bottom:8px}
        .adm-stat-val{font-size:36px;font-weight:800;color:#0f172a;line-height:1}
        .adm-stat-val.green{color:#16a34a}
        .adm-stat-val.blue{color:#2563eb}
        .adm-section{background:#fff;border-radius:16px;box-shadow:0 1px 3px rgba(0,0,0,.07);border:1px solid #e2e8f0;margin-bottom:28px;overflow:hidden}
        .adm-section-head{padding:20px 28px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;gap:12px}
        .adm-section-title{font-size:16px;font-weight:700;color:#0f172a}
        .adm-section-badge{background:#f1f5f9;color:#475569;font-size:12px;font-weight:700;padding:4px 10px;border-radius:20px}
        .adm-table-wrap{overflow-x:auto}
        table{width:100%;border-collapse:collapse}
        thead tr{background:#f8fafc}
        th{padding:12px 20px;text-align:left;font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:.6px;white-space:nowrap;border-bottom:1px solid #f1f5f9}
        td{padding:14px 20px;font-size:14px;color:#334155;border-bottom:1px solid #f8fafc;vertical-align:middle}
        tr:last-child td{border-bottom:none}
        tbody tr:hover{background:#f8fafc}
        .adm-empty{padding:48px 28px;text-align:center;color:#94a3b8;font-size:14px;font-weight:500}
        .adm-loading{display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:60vh;gap:16px}
        .adm-spinner{width:40px;height:40px;border:3px solid #e2e8f0;border-top-color:#2563eb;border-radius:50%;animation:spin .7s linear infinite}
        @keyframes spin{to{transform:rotate(360deg)}}
        .adm-loading-text{color:#64748b;font-size:15px;font-weight:500}
        .adm-error{background:#fff1f2;border:1px solid #fecdd3;border-radius:12px;padding:20px 24px;color:#be123c;font-size:14px;font-weight:500;margin-bottom:24px}
        .cell-email{color:#2563eb;font-size:13px}
        .cell-phone{color:#475569;font-family:monospace;font-size:13px}
        .cell-date{color:#64748b;font-size:12px;white-space:nowrap}
        .cell-txn{font-family:monospace;font-size:12px;color:#475569;max-width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
        .cell-screenshot a{color:#2563eb;font-size:12px;text-decoration:none;font-weight:600}
        .cell-screenshot a:hover{text-decoration:underline}
        .adm-badge-row{display:inline-flex;align-items:center;gap:6px;background:#f0fdf4;color:#16a34a;font-size:11px;font-weight:700;padding:3px 9px;border-radius:20px;border:1px solid #bbf7d0}
      ` }} />

      <div className="adm-wrap">
        {/* Header */}
        <header className="adm-header">
          <div className="adm-header-logo">
            <div className="adm-header-logo-dot" />
            <div>
              <div className="adm-header-title">Jobingen Admin</div>
            </div>
          </div>
          <div className="adm-header-sub">Internal Dashboard</div>
        </header>

        <div className="adm-body">
          {loading ? (
            <div className="adm-loading">
              <div className="adm-spinner" />
              <div className="adm-loading-text">Loading data...</div>
            </div>
          ) : (
            <>
              {error && <div className="adm-error">Error: {error}</div>}

              {/* Stats */}
              <div className="adm-stats">
                <div className="adm-stat-card">
                  <div className="adm-stat-label">Early Access Users</div>
                  <div className="adm-stat-val green">{earlyAccess.length}</div>
                </div>
                <div className="adm-stat-card">
                  <div className="adm-stat-label">Bootcamp Registrations</div>
                  <div className="adm-stat-val blue">{hackathon.length}</div>
                </div>
                <div className="adm-stat-card">
                  <div className="adm-stat-label">Total Signups</div>
                  <div className="adm-stat-val">{earlyAccess.length + hackathon.length}</div>
                </div>
              </div>

              {/* Early Access */}
              <div className="adm-section">
                <div className="adm-section-head">
                  <div className="adm-section-title">Early Access Users</div>
                  <div className="adm-section-badge">{earlyAccess.length} users</div>
                </div>
                <div className="adm-table-wrap">
                  {earlyAccess.length === 0 ? (
                    <div className="adm-empty">No registrations yet</div>
                  ) : (
                    <table>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {earlyAccess.map((u, i) => (
                          <tr key={u.id}>
                            <td style={{ color: "#94a3b8", fontSize: 13 }}>{i + 1}</td>
                            <td style={{ fontWeight: 600 }}>{u.name}</td>
                            <td className="cell-email">{u.email}</td>
                            <td className="cell-phone">{u.phone || "—"}</td>
                            <td className="cell-date">{formatDate(u.created_at)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>

              {/* Hackathon */}
              <div className="adm-section">
                <div className="adm-section-head">
                  <div className="adm-section-title">AI Bootcamp & Hackathon Registrations</div>
                  <div className="adm-section-badge">{hackathon.length} registrations</div>
                </div>
                <div className="adm-table-wrap">
                  {hackathon.length === 0 ? (
                    <div className="adm-empty">No registrations yet</div>
                  ) : (
                    <table>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>College</th>
                          <th>Team Name</th>
                          <th>Transaction ID</th>
                          <th>Screenshot</th>
                          <th>Registration Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {hackathon.map((r, i) => (
                          <tr key={r.id}>
                            <td style={{ color: "#94a3b8", fontSize: 13 }}>{i + 1}</td>
                            <td style={{ fontWeight: 600 }}>{r.name}</td>
                            <td className="cell-email">{r.email}</td>
                            <td className="cell-phone">{r.phone || "—"}</td>
                            <td>{r.college || "—"}</td>
                            <td>
                              {r.team_name ? (
                                <span className="adm-badge-row">{r.team_name}</span>
                              ) : "—"}
                            </td>
                            <td className="cell-txn" title={r.upi_transaction_id}>{r.upi_transaction_id || "—"}</td>
                            <td className="cell-screenshot">
                              {r.payment_screenshot_url ? (
                                <a href={r.payment_screenshot_url} target="_blank" rel="noopener noreferrer">View</a>
                              ) : "—"}
                            </td>
                            <td className="cell-date">{formatDate(r.created_at)}</td>
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
