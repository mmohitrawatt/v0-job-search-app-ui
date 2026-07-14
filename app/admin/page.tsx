"use client"

import { useEffect, useState, useMemo, useCallback } from "react"

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
type JobingenClubApplication = {
  id: string; name: string; email: string; phone: string; college: string
  city: string; year: string; branch: string; linkedin?: string; instagram?: string
  campus_role?: string; why_lead: string; created_at: string
}
type QuizAnswer = { question: string; answer: string }
type JobApplication = {
  id: string; name: string; email: string; phone: string
  linkedin?: string; resume_url?: string; job_slug: string; job_title: string; created_at: string
  college?: string; degree?: string; quiz_answers?: QuizAnswer[]
}
type HackathonSubmission = {
  id: string; team_name: string; leader_name: string; email: string
  project_title: string; description: string; tech_stack: string
  github_link: string; demo_link?: string; screenshot_url?: string; created_at: string
}
type StudentInsight = {
  id: string; name?: string; college?: string; email?: string
  current_situation?: string; career_stuck_at?: string
  resume_frustrations?: string[]; job_search_methods?: string[]
  interview_confidence?: number; skill_blockers?: string[]
  open_answer?: string
  problem_categories: string[]; skill_rating: number
  resume_problem: string; student_insight_text: string; created_at: string
}

type InterviewFeedback = {
  id: string; name?: string; email?: string
  user_type: string; domain: string; role_position: string; company_type: string
  interview_types: string[]; difficulty_level: number
  questions_asked: string; interview_process: string; advice?: string
  company_name?: string; interview_location?: string; created_at: string
}

type PatentAnalystFeedback = {
  id: string; full_name: string; college: string; current_status: string
  reached_interview: string; interview_experience: string
  interview_insights?: string; jobingen_support?: string
  candidate_quote?: string; created_at: string
}

type MentorApplication = {
  id: string; role_type?: string; full_name: string; email: string; phone: string; location?: string
  domain: string; job_title: string; experience: string; linkedin?: string
  short_intro?: string; professional_bio?: string
  mentorship_topics: string[]; session_price?: number; session_duration?: string
  pricing_expectation?: string
  mentorship_format: string[]; available_days?: string[]; motivation?: string
  portfolio_url?: string; additional_note?: string; photo_url?: string
  is_published?: boolean; created_at: string
}

type EarlyApply = {
  id: string; name: string; email: string; phone?: string; college: string
  status: string; domain: string; why: string; portfolio?: string; created_at: string
}

type CreatorApplication = {
  id: string; full_name: string; email: string; phone: string; city: string
  instagram: string; linkedin: string; youtube?: string; follower_count: string
  content_types: string[]; best_posts: string; audience_description: string
  content_idea: string; collaboration_model: string; posts_per_week: string
  created_at: string
}

type HiringRequest = {
  id: string; company_name: string; website_url?: string; contact_name: string
  work_email: string; phone: string; talent_type?: string; role_title?: string
  domain?: string; required_skills?: string; num_hires?: number
  work_model?: string; additional_details?: string; created_at: string
}

type CareersApplication = {
  id: string; name: string; email: string; phone: string
  role_id: string; role_title: string; college: string; year: string
  linkedin?: string; portfolio?: string; why?: string; resume_url?: string; created_at: string
}

type BugEntry = {
  page_url: string; feature_area: string; category: string; severity: string
  what_tried: string; steps: [string, string, string]
  expected: string; actual: string; screenshot_note?: string
}

type BugBashReport = {
  id: string; tester_name: string; tester_email?: string; tester_phone?: string; team_name?: string
  bugs: BugEntry[]; created_at: string
}

type CampusAmbassador = {
  id: string; full_name: string; email: string; phone: string; gender?: string; city?: string; state?: string
  linkedin?: string; instagram?: string
  college: string; university?: string; degree?: string; branch?: string; year: string; graduation_year?: string
  clubs: string[]; leadership_experience?: string
  instagram_followers?: string; linkedin_followers?: string; content_creator: string
  student_reach: string; motivation: string
  availability: string; communication: string
  agreed_performance_based: boolean; agreed_communication: boolean
  status: string; submitted_at: string
}

type FlagshipReg = {
  id: string; full_name: string; email: string; phone: string; college: string
  status: string; skill_level: string; motivation?: string
  upi_transaction_id?: string; payment_screenshot_url?: string; created_at: string
}

type TabKey = "flagship" | "ml" | "recursion" | "bootcamp3" | "bootcamp2" | "bootcamp1" | "jobs" | "hackathon" | "ambassadors" | "campus-ambassador" | "early-access" | "insights" | "feedback" | "interview-fb" | "mentors" | "patent-fb" | "creators" | "early-apply" | "hire-talent" | "careers" | "bug-bash"

const TABS: { key: TabKey; label: string; icon: string; color: string }[] = [
  { key: "flagship",     label: "Flagship Bootcamp", icon: "M12 2L2 7l10 5 10-5-10-5Z M2 17l10 5 10-5 M2 12l10 5 10-5", color: "#1d3a8f" },
  { key: "ml",           label: "ML Masterclass",    icon: "M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2Z M12 8v4l3 3", color: "#7C3AED" },
  { key: "recursion",    label: "Recursion BC",      icon: "M12 2L2 7l10 5 10-5-10-5Z M2 12l10 5 10-5", color: "#1d3a8f" },
  { key: "bootcamp3",    label: "Frontend MC",       icon: "M16 18l6-6-6-6M8 6l-6 6 6 6", color: "#4f46e5" },
  { key: "bootcamp2",    label: "Vibe Coding MC",    icon: "M4.26 10.15a60.44 60.44 0 0 0-.49 6.33l7.85 4.53L19.47 17a60.2 60.2 0 0 0-.49-6.27L12 14.53Z M2 8.5l10 5.78L22 8.5 12 2.72Z M12 22v-5.72l-7.74-4.47a29 29 0 0 0-.26 4L12 22Z M12 22l7.74-6.19a29 29 0 0 0-.26-4L12 16.28Z", color: "#2563eb" },
  { key: "bootcamp1",    label: "Bootcamp 1",        icon: "M4.26 10.15a60.44 60.44 0 0 0-.49 6.33l7.85 4.53L19.47 17a60.2 60.2 0 0 0-.49-6.27L12 14.53Z M2 8.5l10 5.78L22 8.5 12 2.72Z", color: "#0891b2" },
  { key: "jobs",         label: "Job Applications",  icon: "M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Z M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2", color: "#7c3aed" },
  { key: "hackathon",    label: "Hackathon",         icon: "M12 2L2 7l10 5 10-5-10-5Z M2 17l10 5 10-5 M2 12l10 5 10-5", color: "#ea580c" },
  { key: "ambassadors",  label: "Jobingen Club",     icon: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z M22 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75", color: "#1d3a8f" },
  { key: "campus-ambassador", label: "Campus Ambassador", icon: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z M22 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75", color: "#3b5bdb" },
  { key: "early-access", label: "Early Access",      icon: "M12 2v4 M12 18v4 M4.93 4.93l2.83 2.83 M16.24 16.24l2.83 2.83 M2 12h4 M18 12h4 M4.93 19.07l2.83-2.83 M16.24 7.76l2.83-2.83", color: "#d946ef" },
  { key: "insights",     label: "Student Insights",  icon: "M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2Z M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7Z", color: "#0d9488" },
  { key: "mentors",      label: "Mentors",            icon: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75", color: "#8b5cf6" },
  { key: "interview-fb", label: "Interview Exp",     icon: "M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2 M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2Z", color: "#6366f1" },
  { key: "feedback",     label: "Feedback",          icon: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z", color: "#f59e0b" },
  { key: "patent-fb",   label: "Patent Analyst",    icon: "M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2 M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2Z M9 12h6 M9 16h4", color: "#1d3a8f" },
  { key: "creators",    label: "Creators",           icon: "M15 10l4.553-2.069A1 1 0 0 1 21 8.882v6.236a1 1 0 0 1-1.447.894L15 14M3 8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8Z", color: "#0891b2" },
  { key: "early-apply", label: "Early Apply",        icon: "M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2 M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2Z M9 12h6 M9 16h4", color: "#16a34a" },
  { key: "hire-talent", label: "Hiring Requests",    icon: "M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Z M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2", color: "#0891b2" },
  { key: "careers",     label: "Careers (Intern)",   icon: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z M22 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75", color: "#1d3a8f" },
  { key: "bug-bash",    label: "Bug Bash",           icon: "M14.5 3H9.5a1 1 0 0 0-.9.55L7 6H4a1 1 0 0 0 0 2h1v11a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h1a1 1 0 0 0 0-2h-3l-1.6-2.45A1 1 0 0 0 14.5 3Z", color: "#dc2626" },
]

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
  const [flagshipRegs, setFlagshipRegs] = useState<FlagshipReg[]>([])
  const [earlyAccess, setEarlyAccess] = useState<EarlyAccessUser[]>([])
  const [bootcamp1, setBootcamp1] = useState<HackathonReg[]>([])
  const [bootcamp2, setBootcamp2] = useState<HackathonReg[]>([])
  const [bootcamp3, setBootcamp3] = useState<HackathonReg[]>([])
  const [recursionBootcamp, setRecursionBootcamp] = useState<HackathonReg[]>([])
  const [mlMasterclass, setMlMasterclass] = useState<HackathonReg[]>([])
  const [feedback, setFeedback] = useState<BootcampFeedback[]>([])
  const [ambassadors, setAmbassadors] = useState<JobingenClubApplication[]>([])
  const [jobApplications, setJobApplications] = useState<JobApplication[]>([])
  const [hackathonSubs, setHackathonSubs] = useState<HackathonSubmission[]>([])
  const [studentInsights, setStudentInsights] = useState<StudentInsight[]>([])
  const [interviewFeedback, setInterviewFeedback] = useState<InterviewFeedback[]>([])
  const [mentorApps, setMentorApps] = useState<MentorApplication[]>([])
  const [patentFeedback, setPatentFeedback] = useState<PatentAnalystFeedback[]>([])
  const [creatorApps, setCreatorApps] = useState<CreatorApplication[]>([])
  const [earlyApply, setEarlyApply] = useState<EarlyApply[]>([])
  const [hiringRequests, setHiringRequests] = useState<HiringRequest[]>([])
  const [careersApps, setCareersApps] = useState<CareersApplication[]>([])
  const [aiContentEngineRegs, setAiContentEngineRegs] = useState<HackathonReg[]>([])
  const [bugBashReports, setBugBashReports] = useState<BugBashReport[]>([])
  const [campusAmbassadors, setCampusAmbassadors] = useState<CampusAmbassador[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [search, setSearch] = useState("")
  const [authChecked, setAuthChecked] = useState(false)
  const [activeTab, setActiveTab] = useState<TabKey>("flagship")
  const [deleteModal, setDeleteModal] = useState<{ table: string; id: string; name: string } | null>(null)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const pwd = typeof window !== "undefined" ? sessionStorage.getItem("adm_auth") : null
    if (!pwd) { window.location.href = "/admin-login"; return }
    setAuthChecked(true)
    fetch("/api/admin/data", { headers: { Authorization: `Bearer ${pwd}` } })
      .then(r => { if (r.status === 401) { sessionStorage.removeItem("adm_auth"); window.location.href = "/admin-login" } return r.json() })
      .then(d => { setFlagshipRegs(d.flagshipTraining || []); setEarlyAccess(d.earlyAccess || []); setBootcamp1(d.bootcamp1 || []); setBootcamp2(d.bootcamp2 || []); setBootcamp3(d.bootcamp3 || []); setRecursionBootcamp(d.recursionBootcamp || []); setMlMasterclass(d.mlMasterclass || []); setFeedback(d.feedback || []); setAmbassadors(d.clubApplications || []); setJobApplications(d.jobApplications || []); setHackathonSubs(d.hackathonSubmissions || []); setStudentInsights(d.studentInsights || []); setInterviewFeedback(d.interviewFeedback || []); setMentorApps(d.mentorApplications || []); setPatentFeedback(d.patentAnalystFeedback || []); setCreatorApps(d.creatorApplications || []); setEarlyApply(d.earlyApply || []); setHiringRequests(d.hiringRequests || []); setCareersApps(d.careersApplications || []); setAiContentEngineRegs(d.aiContentEngineHackathon || []); setBugBashReports(d.bugBashReports || []); setCampusAmbassadors(d.campusAmbassadors || []) })
      .catch(() => setError("Failed to load data. Refresh to retry."))
      .finally(() => setLoading(false))
  }, [])

  const handleDelete = useCallback(async () => {
    if (!deleteModal) return
    setDeleting(true)
    try {
      const pwd = sessionStorage.getItem("adm_auth")
      const res = await fetch("/api/admin/delete", {
        method: "DELETE",
        headers: { Authorization: `Bearer ${pwd}`, "Content-Type": "application/json" },
        body: JSON.stringify({ table: deleteModal.table, id: deleteModal.id }),
      })
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}))
        throw new Error(errData.error || `HTTP ${res.status}`)
      }
      // Remove from local state
      const id = deleteModal.id
      const tbl = deleteModal.table
      if (tbl === "early_access") setEarlyAccess(p => p.filter(r => r.id !== id))
      else if (tbl === "hackathon_registrations" && activeTab === "bootcamp1") setBootcamp1(p => p.filter(r => r.id !== id))
      else if (tbl === "hackathon_registrations" && activeTab === "bootcamp2") setBootcamp2(p => p.filter(r => r.id !== id))
      else if (tbl === "hackathon_registrations" && activeTab === "bootcamp3") setBootcamp3(p => p.filter(r => r.id !== id))
      else if (tbl === "hackathon_registrations" && activeTab === "recursion") setRecursionBootcamp(p => p.filter(r => r.id !== id))
      else if (tbl === "flagship_training_registrations") setFlagshipRegs(p => p.filter(r => r.id !== id))
      else if (tbl === "ml_masterclass_registrations") setMlMasterclass(p => p.filter(r => r.id !== id))
      else if (tbl === "bootcamp_feedback") setFeedback(p => p.filter(r => r.id !== id))
      else if (tbl === "jobingen_club_applications") setAmbassadors(p => p.filter(r => r.id !== id))
      else if (tbl === "job_applications") setJobApplications(p => p.filter(r => r.id !== id))
      else if (tbl === "hackathon_submissions") setHackathonSubs(p => p.filter(r => r.id !== id))
      else if (tbl === "student_insights") setStudentInsights(p => p.filter(r => r.id !== id))
      else if (tbl === "interview_feedback") setInterviewFeedback(p => p.filter(r => r.id !== id))
      else if (tbl === "mentor_applications") setMentorApps(p => p.filter(r => r.id !== id))
      else if (tbl === "patent_analyst_feedback") setPatentFeedback(p => p.filter(r => r.id !== id))
      else if (tbl === "creator_community_applications") setCreatorApps(p => p.filter(r => r.id !== id))
      else if (tbl === "early_apply") setEarlyApply(p => p.filter(r => r.id !== id))
      else if (tbl === "hiring_requests") setHiringRequests(p => p.filter(r => r.id !== id))
      else if (tbl === "careers_applications") setCareersApps(p => p.filter(r => r.id !== id))
      else if (tbl === "bug_bash_reports") setBugBashReports(p => p.filter(r => r.id !== id))
      else if (tbl === "campus_ambassadors") setCampusAmbassadors(p => p.filter(r => r.id !== id))
    } catch (err) {
      alert(`Delete failed: ${err instanceof Error ? err.message : "Unknown error"}`)
    } finally {
      setDeleting(false)
      setDeleteModal(null)
    }
  }, [deleteModal, activeTab])

  const handlePublishMentor = useCallback(async (id: string, currentVal: boolean) => {
    const pwd = typeof window !== "undefined" ? sessionStorage.getItem("adm_auth") : null
    if (!pwd) return
    try {
      const res = await fetch("/api/admin/publish-mentor", {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${pwd}` },
        body: JSON.stringify({ id, is_published: !currentVal }),
      })
      if (!res.ok) throw new Error((await res.json()).error)
      setMentorApps(p => p.map(m => m.id === id ? { ...m, is_published: !currentVal } : m))
    } catch (err) {
      alert(`Publish failed: ${err instanceof Error ? err.message : "Unknown error"}`)
    }
  }, [])

  const ftFiltered  = useMemo(() => {
    if (!search.trim()) return flagshipRegs
    const s = search.toLowerCase()
    return flagshipRegs.filter(r => r.full_name.toLowerCase().includes(s) || r.email.toLowerCase().includes(s))
  }, [flagshipRegs, search])
  const eaFiltered  = useMemo(() => filterRows(earlyAccess, search), [earlyAccess, search])
  const b1Filtered  = useMemo(() => filterRows(bootcamp1, search), [bootcamp1, search])
  const b2Filtered  = useMemo(() => filterRows(bootcamp2, search), [bootcamp2, search])
  const b3Filtered  = useMemo(() => filterRows(bootcamp3, search), [bootcamp3, search])
  const recFiltered = useMemo(() => filterRows(recursionBootcamp, search), [recursionBootcamp, search])
  const mlFiltered  = useMemo(() => filterRows(mlMasterclass, search), [mlMasterclass, search])
  const fbFiltered  = useMemo(() => filterRows(feedback, search), [feedback, search])
  const caFiltered  = useMemo(() => filterRows(ambassadors, search), [ambassadors, search])
  const jaFiltered  = useMemo(() => filterRows(jobApplications, search), [jobApplications, search])
  const hsFiltered  = useMemo(() => {
    if (!search.trim()) return hackathonSubs
    const s = search.toLowerCase()
    return hackathonSubs.filter(r => r.leader_name.toLowerCase().includes(s) || r.email.toLowerCase().includes(s) || r.team_name.toLowerCase().includes(s) || r.project_title.toLowerCase().includes(s))
  }, [hackathonSubs, search])
  const eaplyFiltered = useMemo(() => filterRows(earlyApply, search), [earlyApply, search])
  const careersFiltered = useMemo(() => filterRows(careersApps, search), [careersApps, search])

  const ccFiltered = useMemo(() => {
    if (!search.trim()) return creatorApps
    const s = search.toLowerCase()
    return creatorApps.filter(r => r.full_name.toLowerCase().includes(s) || r.email.toLowerCase().includes(s))
  }, [creatorApps, search])

  const hrFiltered = useMemo(() => {
    if (!search.trim()) return hiringRequests
    const s = search.toLowerCase()
    return hiringRequests.filter(r => r.company_name.toLowerCase().includes(s) || r.work_email.toLowerCase().includes(s) || r.contact_name.toLowerCase().includes(s))
  }, [hiringRequests, search])

  const capFiltered = useMemo(() => {
    if (!search.trim()) return campusAmbassadors
    const s = search.toLowerCase()
    return campusAmbassadors.filter(r => r.full_name.toLowerCase().includes(s) || r.email.toLowerCase().includes(s) || r.college.toLowerCase().includes(s))
  }, [campusAmbassadors, search])

  const tabCounts: Record<TabKey, number> = {
    flagship: flagshipRegs.length,
    ml: mlMasterclass.length,
    recursion: recursionBootcamp.length,
    bootcamp3: bootcamp3.length,
    bootcamp2: bootcamp2.length,
    bootcamp1: bootcamp1.length,
    jobs: jobApplications.length,
    hackathon: aiContentEngineRegs.length,
    ambassadors: ambassadors.length,
    "campus-ambassador": campusAmbassadors.length,
    "early-access": earlyAccess.length,
    insights: studentInsights.length,
    mentors: mentorApps.length,
    "interview-fb": interviewFeedback.length,
    feedback: feedback.length,
    "patent-fb": patentFeedback.length,
    creators: creatorApps.length,
    "early-apply": earlyApply.length,
    "hire-talent": hiringRequests.length,
    "careers": careersApps.length,
    "bug-bash": bugBashReports.length,
  }

  const logout = () => { sessionStorage.removeItem("adm_auth"); window.location.href = "/admin-login" }

  const DelBtn = ({ table, id, name }: { table: string; id: string; name: string }) => (
    <button
      className="adm-del-btn"
      title={`Delete ${name}`}
      onClick={(e) => { e.stopPropagation(); setDeleteModal({ table, id, name }) }}
    >
      <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
    </button>
  )

  if (!authChecked) return null

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        body{background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;-webkit-font-smoothing:antialiased}
        .adm{min-height:100vh;background:#f8fafc}

        /* Header */
        .adm-hdr{background:#fff;height:64px;display:flex;align-items:center;justify-content:space-between;padding:0 32px;position:sticky;top:0;z-index:50;border-bottom:1px solid #e2e8f0}
        .adm-hdr-l{display:flex;align-items:center;gap:14px}
        .adm-hdr-logo{width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg,#2563eb,#7c3aed);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:900;font-size:15px}
        .adm-hdr-title{color:#0f172a;font-size:18px;font-weight:800;letter-spacing:-.4px}
        .adm-hdr-sub{color:#94a3b8;font-size:12px;font-weight:500}
        .adm-hdr-r{display:flex;align-items:center;gap:10px}
        .adm-search{background:#f1f5f9;border:1.5px solid #e2e8f0;border-radius:10px;padding:8px 14px 8px 36px;font-size:13px;color:#0f172a;outline:none;width:260px;font-family:inherit;transition:all .2s;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' fill='none' viewBox='0 0 24 24'%3E%3Ccircle cx='11' cy='11' r='8' stroke='%2394a3b8' stroke-width='2'/%3E%3Cpath d='m21 21-4.35-4.35' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:12px center}
        .adm-search:focus{border-color:#3b82f6;background:#fff;box-shadow:0 0 0 3px rgba(59,130,246,.1)}
        .adm-search::placeholder{color:#94a3b8}
        .adm-logout{background:#fff;border:1.5px solid #e2e8f0;color:#64748b;font-size:13px;font-weight:600;padding:8px 16px;border-radius:10px;cursor:pointer;font-family:inherit;transition:all .15s}
        .adm-logout:hover{background:#fef2f2;border-color:#fca5a5;color:#dc2626}
        @media(max-width:768px){.adm-hdr{padding:0 16px;height:56px;gap:8px}.adm-search{width:140px;font-size:12px}.adm-hdr-sub{display:none}.adm-hdr-title{font-size:15px}}

        /* Body layout */
        .adm-body{padding:0 32px 32px;max-width:1440px;margin:0 auto}
        @media(max-width:768px){.adm-body{padding:0 12px 16px}}

        /* Stat strip */
        .adm-strip{display:flex;gap:10px;padding:20px 0;overflow-x:auto;-webkit-overflow-scrolling:touch;scrollbar-width:none}
        .adm-strip::-webkit-scrollbar{display:none}
        .adm-strip-item{flex:0 0 auto;display:flex;align-items:center;gap:10px;background:#fff;border:1.5px solid #e2e8f0;border-radius:12px;padding:12px 18px;cursor:pointer;transition:all .15s;white-space:nowrap;min-width:0}
        .adm-strip-item:hover{border-color:#cbd5e1;box-shadow:0 2px 8px rgba(0,0,0,.04)}
        .adm-strip-item.active{border-color:var(--tab-color);background:color-mix(in srgb, var(--tab-color) 6%, white);box-shadow:0 0 0 3px color-mix(in srgb, var(--tab-color) 10%, transparent)}
        .adm-strip-num{font-size:22px;font-weight:900;line-height:1;color:var(--tab-color)}
        .adm-strip-lbl{font-size:12px;font-weight:600;color:#64748b}
        .adm-strip-item.active .adm-strip-lbl{color:#0f172a}

        /* Tabs - horizontal scrollable */
        .adm-tabs{display:flex;gap:2px;border-bottom:1px solid #e2e8f0;margin-bottom:20px;overflow-x:auto;scrollbar-width:none;-webkit-overflow-scrolling:touch}
        .adm-tabs::-webkit-scrollbar{display:none}
        .adm-tab{flex:0 0 auto;display:flex;align-items:center;gap:7px;padding:12px 18px;font-size:13px;font-weight:600;color:#64748b;cursor:pointer;border-bottom:2.5px solid transparent;transition:all .15s;white-space:nowrap;background:none;border-top:none;border-left:none;border-right:none;font-family:inherit}
        .adm-tab:hover{color:#0f172a;background:#f8fafc}
        .adm-tab.active{color:var(--tab-color);border-bottom-color:var(--tab-color)}
        .adm-tab-count{font-size:11px;font-weight:700;background:#f1f5f9;color:#64748b;padding:1px 7px;border-radius:10px;min-width:22px;text-align:center}
        .adm-tab.active .adm-tab-count{background:color-mix(in srgb, var(--tab-color) 12%, white);color:var(--tab-color)}

        /* Section card */
        .adm-sec{background:#fff;border-radius:14px;border:1px solid #e2e8f0;box-shadow:0 1px 3px rgba(0,0,0,.04);overflow:hidden}
        .adm-sec-head{padding:16px 20px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}
        .adm-sec-hl{display:flex;align-items:center;gap:10px}
        .adm-sec-title{font-size:15px;font-weight:800;color:#0f172a;letter-spacing:-.2px}
        .adm-sec-badge{background:#f1f5f9;color:#475569;font-size:11px;font-weight:700;padding:3px 10px;border-radius:20px}
        .adm-sec-actions{display:flex;align-items:center;gap:8px}
        .adm-csv{display:inline-flex;align-items:center;gap:6px;background:#f8fafc;border:1.5px solid #e2e8f0;color:#475569;font-size:12px;font-weight:600;padding:6px 14px;border-radius:8px;cursor:pointer;font-family:inherit;transition:all .15s;white-space:nowrap}
        .adm-csv:hover{background:#e2e8f0;color:#0f172a}

        /* Error / Loading */
        .adm-err{background:#fff1f2;border:1px solid #fecdd3;border-radius:12px;padding:16px 20px;color:#be123c;font-size:14px;font-weight:600;margin-bottom:20px}
        .adm-load{display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:50vh;gap:16px}
        .adm-spinner{width:36px;height:36px;border:3px solid #e2e8f0;border-top-color:#3b82f6;border-radius:50%;animation:adm-spin .65s linear infinite}
        @keyframes adm-spin{to{transform:rotate(360deg)}}
        .adm-load-txt{color:#64748b;font-size:14px;font-weight:500}

        /* Table */
        .adm-tbl-wrap{overflow-x:auto;-webkit-overflow-scrolling:touch}
        table{width:100%;border-collapse:collapse;min-width:600px}
        thead tr{background:#f8fafc}
        th{padding:10px 16px;text-align:left;font-size:10px;font-weight:800;color:#94a3b8;text-transform:uppercase;letter-spacing:.7px;white-space:nowrap;border-bottom:1px solid #f1f5f9}
        td{padding:12px 16px;font-size:13px;color:#334155;border-bottom:1px solid #f8fafc;vertical-align:middle}
        tr:last-child td{border-bottom:none}
        tbody tr{transition:background .1s}
        tbody tr:hover{background:#f8fafc}

        /* Empty */
        .adm-empty{padding:56px 24px;text-align:center;color:#94a3b8;font-size:14px;font-weight:500}
        .adm-empty-ico{font-size:32px;margin-bottom:12px;opacity:.6}

        /* Cell types */
        .c-num{color:#cbd5e1;font-size:12px;font-weight:600;width:40px}
        .c-name{font-weight:700;color:#0f172a}
        .c-email{color:#2563eb;font-size:12px}
        .c-phone{color:#475569;font-family:'SF Mono',Monaco,monospace;font-size:12px}
        .c-date{color:#94a3b8;font-size:11px;white-space:nowrap}
        .c-txn{font-family:'SF Mono',Monaco,monospace;font-size:11px;color:#475569;max-width:140px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;display:block}
        .c-tag{display:inline-flex;align-items:center;background:#eff6ff;color:#2563eb;font-size:11px;font-weight:700;padding:3px 10px;border-radius:20px;border:1px solid #bfdbfe;white-space:nowrap}
        .c-link{color:#2563eb;font-size:12px;font-weight:600;text-decoration:none}
        .c-link:hover{text-decoration:underline}
        .c-why{max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:12px;color:#64748b;cursor:help;display:block}

        /* Delete button */
        .adm-del-btn{display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:8px;border:1.5px solid transparent;background:transparent;color:#cbd5e1;cursor:pointer;transition:all .15s}
        .adm-del-btn:hover{background:#fef2f2;border-color:#fecdd3;color:#dc2626}

        /* Delete modal */
        .adm-modal-bg{position:fixed;inset:0;background:rgba(0,0,0,.4);backdrop-filter:blur(4px);z-index:100;display:flex;align-items:center;justify-content:center;padding:16px;animation:adm-fade-in .15s ease}
        @keyframes adm-fade-in{from{opacity:0}to{opacity:1}}
        .adm-modal{background:#fff;border-radius:16px;padding:28px;max-width:400px;width:100%;box-shadow:0 20px 60px rgba(0,0,0,.15);animation:adm-slide-up .2s ease}
        @keyframes adm-slide-up{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        .adm-modal-icon{width:48px;height:48px;border-radius:12px;background:#fef2f2;display:flex;align-items:center;justify-content:center;margin-bottom:16px}
        .adm-modal h3{font-size:17px;font-weight:800;color:#0f172a;margin-bottom:8px}
        .adm-modal p{font-size:14px;color:#64748b;line-height:1.5;margin-bottom:24px}
        .adm-modal p strong{color:#0f172a;font-weight:700}
        .adm-modal-btns{display:flex;gap:10px;justify-content:flex-end}
        .adm-modal-cancel{background:#f1f5f9;border:1.5px solid #e2e8f0;color:#475569;font-size:13px;font-weight:700;padding:9px 20px;border-radius:10px;cursor:pointer;font-family:inherit;transition:all .15s}
        .adm-modal-cancel:hover{background:#e2e8f0}
        .adm-modal-confirm{background:#dc2626;border:none;color:#fff;font-size:13px;font-weight:700;padding:9px 20px;border-radius:10px;cursor:pointer;font-family:inherit;transition:all .15s;min-width:90px}
        .adm-modal-confirm:hover{background:#b91c1c}
        .adm-modal-confirm:disabled{opacity:.6;cursor:not-allowed}
      ` }} />

      <div className="adm">
        {/* Header */}
        <header className="adm-hdr">
          <div className="adm-hdr-l">
            <div className="adm-hdr-logo">J</div>
            <div>
              <div className="adm-hdr-title">Admin Panel</div>
              <div className="adm-hdr-sub">Jobingen Dashboard</div>
            </div>
          </div>
          <div className="adm-hdr-r">
            <input
              className="adm-search"
              placeholder="Search by name or email..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <a className="adm-logout" href="/admin/content" style={{ textDecoration: "none", borderColor: "#c7d2fe", color: "#1d3a8f" }}>
              Content & Popup
            </a>
            <button className="adm-logout" onClick={logout}>
              Logout
            </button>
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

              {/* Tab navigation */}
              <div className="adm-tabs">
                {TABS.map(t => (
                  <button
                    key={t.key}
                    className={`adm-tab${activeTab === t.key ? " active" : ""}`}
                    style={{ "--tab-color": t.color } as React.CSSProperties}
                    onClick={() => setActiveTab(t.key)}
                  >
                    {t.label}
                    <span className="adm-tab-count">{tabCounts[t.key]}</span>
                  </button>
                ))}
              </div>

              {/* ── Frontend Engineering Masterclass (Bootcamp 3) ── */}
              {/* ── Flagship Bootcamp Registrations ── */}
              {activeTab === "flagship" && (
                <div className="adm-sec">
                  <div className="adm-sec-head">
                    <div className="adm-sec-hl">
                      <div className="adm-sec-title">Flagship Bootcamp Registrations</div>
                      <div className="adm-sec-badge">{ftFiltered.length} registrations</div>
                    </div>
                    <div className="adm-sec-actions">
                      <button className="adm-csv" onClick={() => exportCSV(ftFiltered as unknown as Record<string, unknown>[], "flagship-bootcamp-registrations.csv")}>
                        <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        Export CSV
                      </button>
                    </div>
                  </div>
                  <div className="adm-tbl-wrap">
                    {ftFiltered.length === 0 ? (
                      <div className="adm-empty"><div className="adm-empty-ico">🚀</div>{search ? `No results for "${search}"` : "No registrations yet"}</div>
                    ) : (
                      <table>
                        <thead><tr><th>#</th><th>Name</th><th>Email</th><th>Phone</th><th>College</th><th>Status</th><th>Skill Level</th><th>Transaction ID</th><th>Screenshot</th><th>Date</th><th></th></tr></thead>
                        <tbody>
                          {ftFiltered.map((r, i) => (
                            <tr key={r.id}>
                              <td className="c-num">{i + 1}</td>
                              <td className="c-name">{r.full_name}</td>
                              <td className="c-email">{r.email}</td>
                              <td className="c-phone">{r.phone || "—"}</td>
                              <td style={{ fontSize: 13 }}>{r.college || "—"}</td>
                              <td><span className="c-tag" style={{ background: "#eff6ff", color: "#2563eb", borderColor: "#bfdbfe" }}>{r.status || "—"}</span></td>
                              <td><span className="c-tag" style={{ background: "#f5f3ff", color: "#7c3aed", borderColor: "#ddd6fe" }}>{r.skill_level || "—"}</span></td>
                              <td><span className="c-txn" title={r.upi_transaction_id}>{r.upi_transaction_id || "—"}</span></td>
                              <td>{r.payment_screenshot_url ? <a className="c-link" href={r.payment_screenshot_url} target="_blank" rel="noopener noreferrer">View</a> : "—"}</td>
                              <td className="c-date">{fmt(r.created_at)}</td>
                              <td><DelBtn table="flagship_training_registrations" id={r.id} name={r.full_name} /></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              )}

              {activeTab === "ml" && (
                <div className="adm-sec">
                  <div className="adm-sec-head">
                    <div className="adm-sec-hl">
                      <div className="adm-sec-title">ML Masterclass Registrations</div>
                      <div className="adm-sec-badge">{mlFiltered.length} registrations</div>
                    </div>
                    <div className="adm-sec-actions">
                      <button className="adm-csv" onClick={() => exportCSV(mlFiltered as unknown as Record<string, unknown>[], "ml-masterclass-registrations.csv")}>
                        <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        Export CSV
                      </button>
                    </div>
                  </div>
                  <div className="adm-tbl-wrap">
                    {mlFiltered.length === 0 ? (
                      <div className="adm-empty"><div className="adm-empty-ico">🤖</div>{search ? `No results for "${search}"` : "No registrations yet"}</div>
                    ) : (
                      <table>
                        <thead><tr><th>#</th><th>Name</th><th>Email</th><th>Phone</th><th>College</th><th>Experience</th><th>Transaction ID</th><th>Screenshot</th><th>Date</th><th></th></tr></thead>
                        <tbody>
                          {mlFiltered.map((r, i) => (
                            <tr key={r.id}>
                              <td className="c-num">{i + 1}</td>
                              <td className="c-name">{r.name}</td>
                              <td className="c-email">{r.email}</td>
                              <td className="c-phone">{r.phone || "—"}</td>
                              <td style={{ fontSize: 13 }}>{r.college || "—"}</td>
                              <td><span className="c-tag" style={{ background: "#f5f3ff", color: "#7c3aed", borderColor: "#ddd6fe" }}>{(r as unknown as { experience?: string }).experience || "—"}</span></td>
                              <td><span className="c-txn" title={r.upi_transaction_id}>{r.upi_transaction_id || "—"}</span></td>
                              <td>{r.payment_screenshot_url ? <a className="c-link" href={r.payment_screenshot_url} target="_blank" rel="noopener noreferrer">View</a> : "—"}</td>
                              <td className="c-date">{fmt(r.created_at)}</td>
                              <td><DelBtn table="ml_masterclass_registrations" id={r.id} name={r.name} /></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              )}

              {activeTab === "recursion" && (
                <div className="adm-sec">
                  <div className="adm-sec-head">
                    <div className="adm-sec-hl">
                      <div className="adm-sec-title">Recursion Deep Dive Registrations</div>
                      <div className="adm-sec-badge">{recFiltered.length} registrations</div>
                    </div>
                    <div className="adm-sec-actions">
                      <button className="adm-csv" onClick={() => exportCSV(recFiltered as unknown as Record<string, unknown>[], "recursion-bootcamp-registrations.csv")}>
                        <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        Export CSV
                      </button>
                    </div>
                  </div>
                  <div className="adm-tbl-wrap">
                    {recFiltered.length === 0 ? (
                      <div className="adm-empty"><div className="adm-empty-ico">📋</div>{search ? `No results for "${search}"` : "No registrations yet"}</div>
                    ) : (
                      <table>
                        <thead><tr><th>#</th><th>Name</th><th>Email</th><th>Phone</th><th>College</th><th>Transaction ID</th><th>Screenshot</th><th>Date</th><th></th></tr></thead>
                        <tbody>
                          {recFiltered.map((r, i) => (
                            <tr key={r.id}>
                              <td className="c-num">{i + 1}</td>
                              <td className="c-name">{r.name}</td>
                              <td className="c-email">{r.email}</td>
                              <td className="c-phone">{r.phone || "—"}</td>
                              <td style={{ fontSize: 13 }}>{r.college || "—"}</td>
                              <td><span className="c-txn" title={r.upi_transaction_id}>{r.upi_transaction_id || "—"}</span></td>
                              <td>{r.payment_screenshot_url ? <a className="c-link" href={r.payment_screenshot_url} target="_blank" rel="noopener noreferrer">View</a> : "—"}</td>
                              <td className="c-date">{fmt(r.created_at)}</td>
                              <td><DelBtn table="hackathon_registrations" id={r.id} name={r.name} /></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              )}

              {activeTab === "bootcamp3" && (
                <div className="adm-sec">
                  <div className="adm-sec-head">
                    <div className="adm-sec-hl">
                      <div className="adm-sec-title">Frontend Masterclass Registrations</div>
                      <div className="adm-sec-badge">{b3Filtered.length} registrations</div>
                    </div>
                    <div className="adm-sec-actions">
                      <button className="adm-csv" onClick={() => exportCSV(b3Filtered as unknown as Record<string, unknown>[], "frontend-masterclass-registrations.csv")}>
                        <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        Export CSV
                      </button>
                    </div>
                  </div>
                  <div className="adm-tbl-wrap">
                    {b3Filtered.length === 0 ? (
                      <div className="adm-empty"><div className="adm-empty-ico">📋</div>{search ? `No results for "${search}"` : "No registrations yet"}</div>
                    ) : (
                      <table>
                        <thead><tr><th>#</th><th>Name</th><th>Email</th><th>Phone</th><th>College</th><th>Transaction ID</th><th>Screenshot</th><th>Date</th><th></th></tr></thead>
                        <tbody>
                          {b3Filtered.map((r, i) => (
                            <tr key={r.id}>
                              <td className="c-num">{i + 1}</td>
                              <td className="c-name">{r.name}</td>
                              <td className="c-email">{r.email}</td>
                              <td className="c-phone">{r.phone || "—"}</td>
                              <td style={{ fontSize: 13 }}>{r.college || "—"}</td>
                              <td><span className="c-txn" title={r.upi_transaction_id}>{r.upi_transaction_id || "—"}</span></td>
                              <td>{r.payment_screenshot_url ? <a className="c-link" href={r.payment_screenshot_url} target="_blank" rel="noopener noreferrer">View</a> : "—"}</td>
                              <td className="c-date">{fmt(r.created_at)}</td>
                              <td><DelBtn table="hackathon_registrations" id={r.id} name={r.name} /></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              )}

              {/* ── Masterclass (Bootcamp 2) ── */}
              {activeTab === "bootcamp2" && (
                <div className="adm-sec">
                  <div className="adm-sec-head">
                    <div className="adm-sec-hl">
                      <div className="adm-sec-title">Masterclass Registrations</div>
                      <div className="adm-sec-badge">{b2Filtered.length} registrations</div>
                    </div>
                    <div className="adm-sec-actions">
                      <button className="adm-csv" onClick={() => exportCSV(b2Filtered as unknown as Record<string, unknown>[], "masterclass-registrations.csv")}>
                        <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        Export CSV
                      </button>
                    </div>
                  </div>
                  <div className="adm-tbl-wrap">
                    {b2Filtered.length === 0 ? (
                      <div className="adm-empty"><div className="adm-empty-ico">📋</div>{search ? `No results for "${search}"` : "No registrations yet"}</div>
                    ) : (
                      <table>
                        <thead><tr><th>#</th><th>Name</th><th>Email</th><th>Phone</th><th>College</th><th>Cluster</th><th>Transaction ID</th><th>Screenshot</th><th>Date</th><th></th></tr></thead>
                        <tbody>
                          {b2Filtered.map((r, i) => (
                            <tr key={r.id}>
                              <td className="c-num">{i + 1}</td>
                              <td className="c-name">{r.name}</td>
                              <td className="c-email">{r.email}</td>
                              <td className="c-phone">{r.phone || "—"}</td>
                              <td style={{ fontSize: 13 }}>{r.college || "—"}</td>
                              <td><span className="c-tag" style={{ background: "#f5f3ff", color: "#7c3aed", borderColor: "#ddd6fe" }}>{r.learning_cluster || "—"}</span></td>
                              <td><span className="c-txn" title={r.upi_transaction_id}>{r.upi_transaction_id || "—"}</span></td>
                              <td>{r.payment_screenshot_url ? <a className="c-link" href={r.payment_screenshot_url} target="_blank" rel="noopener noreferrer">View</a> : "—"}</td>
                              <td className="c-date">{fmt(r.created_at)}</td>
                              <td><DelBtn table="hackathon_registrations" id={r.id} name={r.name} /></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              )}

              {/* ── Bootcamp 1 ── */}
              {activeTab === "bootcamp1" && (
                <div className="adm-sec">
                  <div className="adm-sec-head">
                    <div className="adm-sec-hl">
                      <div className="adm-sec-title">Bootcamp 1 Registrations</div>
                      <div className="adm-sec-badge">{b1Filtered.length} registrations</div>
                    </div>
                    <div className="adm-sec-actions">
                      <button className="adm-csv" onClick={() => exportCSV(b1Filtered as unknown as Record<string, unknown>[], "bootcamp1-registrations.csv")}>
                        <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        Export CSV
                      </button>
                    </div>
                  </div>
                  <div className="adm-tbl-wrap">
                    {b1Filtered.length === 0 ? (
                      <div className="adm-empty"><div className="adm-empty-ico">📋</div>{search ? `No results for "${search}"` : "No registrations yet"}</div>
                    ) : (
                      <table>
                        <thead><tr><th>#</th><th>Name</th><th>Email</th><th>Phone</th><th>College</th><th>Transaction ID</th><th>Screenshot</th><th>Date</th><th></th></tr></thead>
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
                              <td><DelBtn table="hackathon_registrations" id={r.id} name={r.name} /></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              )}

              {/* ── Job Applications ── */}
              {activeTab === "jobs" && (
                <div className="adm-sec">
                  <div className="adm-sec-head">
                    <div className="adm-sec-hl">
                      <div className="adm-sec-title">Job Applications</div>
                      <div className="adm-sec-badge">{jaFiltered.length} applications</div>
                    </div>
                    <div className="adm-sec-actions">
                      <button className="adm-csv" onClick={() => exportCSV(jaFiltered.map(a => ({ ...a, quiz_answers: a.quiz_answers ? JSON.stringify(a.quiz_answers) : "" })) as unknown as Record<string, unknown>[], "job-applications.csv")}>
                        <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        Export CSV
                      </button>
                    </div>
                  </div>
                  <div className="adm-tbl-wrap">
                    {jaFiltered.length === 0 ? (
                      <div className="adm-empty"><div className="adm-empty-ico">📋</div>{search ? `No results for "${search}"` : "No job applications yet"}</div>
                    ) : (
                      <table>
                        <thead>
                          <tr><th>#</th><th>Name</th><th>Email</th><th>Phone</th><th>College</th><th>Degree</th><th>Job Title</th><th>LinkedIn</th><th>Resume</th><th>Quiz</th><th>Date</th><th></th></tr>
                        </thead>
                        <tbody>
                          {jaFiltered.map((a, i) => (
                            <tr key={a.id}>
                              <td className="c-num">{i + 1}</td>
                              <td className="c-name">{a.name}</td>
                              <td className="c-email">{a.email}</td>
                              <td className="c-phone">{a.phone}</td>
                              <td style={{ fontSize: 13 }}>{a.college || "—"}</td>
                              <td style={{ fontSize: 12, color: "#64748b" }}>{a.degree || "—"}</td>
                              <td><span className="c-tag">{a.job_title}</span></td>
                              <td>
                                {a.linkedin
                                  ? <a className="c-link" href={a.linkedin.startsWith("http") ? a.linkedin : `https://${a.linkedin}`} target="_blank" rel="noopener noreferrer">View</a>
                                  : "—"}
                              </td>
                              <td>
                                {a.resume_url
                                  ? <a className="c-link" href={a.resume_url} target="_blank" rel="noopener noreferrer">Download</a>
                                  : "—"}
                              </td>
                              <td>
                                {a.quiz_answers && a.quiz_answers.length > 0
                                  ? <button className="c-link" style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", padding: 0 }} onClick={() => {
                                      const w = window.open("", "_blank", "width=600,height=700")
                                      if (!w) return
                                      w.document.write(`<!DOCTYPE html><html><head><title>Quiz — ${a.name}</title><style>*{box-sizing:border-box;margin:0;padding:0}body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f8fafc;padding:32px 24px}h1{font-size:20px;font-weight:800;color:#0f172a;margin-bottom:6px}p.sub{font-size:14px;color:#64748b;margin-bottom:24px}.q{background:#fff;border:1px solid #e2e8f0;border-radius:14px;padding:18px 20px;margin-bottom:14px}.q-n{font-size:11px;font-weight:800;color:#1d4ed8;text-transform:uppercase;letter-spacing:.5px;margin-bottom:6px}.q-t{font-size:14px;font-weight:700;color:#0f172a;margin-bottom:10px}.q-a{font-size:14px;color:#334155;line-height:1.6;background:#f1f5f9;border-radius:8px;padding:12px 14px}</style></head><body><h1>Quiz Answers</h1><p class="sub">${a.name} — ${a.job_title}</p>${(a.quiz_answers as QuizAnswer[]).map((qa, qi) => `<div class="q"><div class="q-n">Question ${qi + 1}</div><div class="q-t">${qa.question}</div><div class="q-a">${qa.answer}</div></div>`).join("")}</body></html>`)
                                      w.document.close()
                                    }}>View Answers</button>
                                  : "—"}
                              </td>
                              <td className="c-date">{fmt(a.created_at)}</td>
                              <td><DelBtn table="job_applications" id={a.id} name={a.name} /></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              )}

              {/* ── Hackathon Registrations ── */}
              {activeTab === "hackathon" && (
                <div className="adm-sec">
                  <div className="adm-sec-head">
                    <div className="adm-sec-hl">
                      <div className="adm-sec-title">AI Content Engine Hackathon — Registrations</div>
                      <div className="adm-sec-badge">{aiContentEngineRegs.length} registered</div>
                    </div>
                    <div className="adm-sec-actions">
                      <button className="adm-csv" onClick={() => exportCSV(aiContentEngineRegs as unknown as Record<string, unknown>[], "ai-hackathon-registrations.csv")}>
                        <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        Export CSV
                      </button>
                    </div>
                  </div>
                  <div className="adm-tbl-wrap">
                    {aiContentEngineRegs.length === 0 ? (
                      <div className="adm-empty"><div className="adm-empty-ico">🚀</div>{search ? `No results for "${search}"` : "No registrations yet"}</div>
                    ) : (
                      <table>
                        <thead><tr><th>#</th><th>Name</th><th>Email</th><th>Phone</th><th>College</th><th>Year</th><th>Tech Stack</th><th>Team</th><th>GitHub</th><th>Date</th><th></th></tr></thead>
                        <tbody>
                          {aiContentEngineRegs.filter(r => {
                            if (!search.trim()) return true
                            const s = search.toLowerCase()
                            return r.name.toLowerCase().includes(s) || r.email.toLowerCase().includes(s) || (r.college||"").toLowerCase().includes(s)
                          }).map((r, i) => (
                            <tr key={r.id}>
                              <td className="c-num">{i + 1}</td>
                              <td className="c-name">{r.name}</td>
                              <td className="c-email">{r.email}</td>
                              <td style={{ fontSize: 13 }}>{r.phone || "—"}</td>
                              <td style={{ fontSize: 13 }}>{r.college || "—"}</td>
                              <td style={{ fontSize: 12, color: "#64748b" }}>{(r as unknown as Record<string,string>).year_of_study || "—"}</td>
                              <td style={{ fontSize: 12, color: "#64748b" }}>{(r as unknown as Record<string,string>).tech_stack || "—"}</td>
                              <td style={{ fontSize: 13 }}>{r.team_name || "Solo"}</td>
                              <td>{(r as unknown as Record<string,string>).github_url ? <a className="c-link" href={(r as unknown as Record<string,string>).github_url} target="_blank" rel="noopener noreferrer">View</a> : "—"}</td>
                              <td className="c-date">{fmt(r.created_at)}</td>
                              <td><DelBtn table="hackathon_registrations" id={r.id} name={r.name} /></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              )}

              {/* ── Hackathon Submissions ── */}
              {activeTab === "hackathon" && (
                <div className="adm-sec" style={{ marginTop: 32 }}>
                  <div className="adm-sec-head">
                    <div className="adm-sec-hl">
                      <div className="adm-sec-title">AI Content Engine Hackathon — Project Submissions</div>
                      <div className="adm-sec-badge">{hsFiltered.length} submissions</div>
                    </div>
                    <div className="adm-sec-actions">
                      <button className="adm-csv" onClick={() => exportCSV(hsFiltered as unknown as Record<string, unknown>[], "hackathon-submissions.csv")}>
                        <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        Export CSV
                      </button>
                    </div>
                  </div>
                  <div className="adm-tbl-wrap">
                    {hsFiltered.length === 0 ? (
                      <div className="adm-empty"><div className="adm-empty-ico">🏗️</div>{search ? `No results for "${search}"` : "No submissions yet"}</div>
                    ) : (
                      <table>
                        <thead>
                          <tr><th>#</th><th>Team</th><th>Leader</th><th>Email</th><th>Project</th><th>Tech Stack</th><th>GitHub</th><th>Demo</th><th>Screenshot</th><th>Date</th><th></th></tr>
                        </thead>
                        <tbody>
                          {hsFiltered.map((s, i) => (
                            <tr key={s.id}>
                              <td className="c-num">{i + 1}</td>
                              <td className="c-name">{s.team_name}</td>
                              <td style={{ fontSize: 13 }}>{s.leader_name}</td>
                              <td className="c-email">{s.email}</td>
                              <td style={{ fontSize: 13, fontWeight: 600, color: "#0A1F44", maxWidth: 180 }}>{s.project_title}</td>
                              <td style={{ fontSize: 12, color: "#64748b", maxWidth: 160 }}><span title={s.tech_stack}>{s.tech_stack.length > 40 ? s.tech_stack.slice(0, 40) + "…" : s.tech_stack}</span></td>
                              <td>{s.github_link ? <a className="c-link" href={s.github_link.startsWith("http") ? s.github_link : `https://${s.github_link}`} target="_blank" rel="noopener noreferrer">GitHub</a> : "—"}</td>
                              <td>{s.demo_link ? <a className="c-link" href={s.demo_link.startsWith("http") ? s.demo_link : `https://${s.demo_link}`} target="_blank" rel="noopener noreferrer">Demo</a> : "—"}</td>
                              <td>{s.screenshot_url ? <a className="c-link" href={s.screenshot_url} target="_blank" rel="noopener noreferrer">View</a> : "—"}</td>
                              <td className="c-date">{fmt(s.created_at)}</td>
                              <td><DelBtn table="hackathon_submissions" id={s.id} name={s.team_name} /></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              )}

              {/* ── Jobingen Club ── */}
              {activeTab === "ambassadors" && (
                <div className="adm-sec">
                  <div className="adm-sec-head">
                    <div className="adm-sec-hl">
                      <div className="adm-sec-title">Jobingen Club — President Applications</div>
                      <div className="adm-sec-badge">{caFiltered.length} applications</div>
                    </div>
                    <div className="adm-sec-actions">
                      <button className="adm-csv" onClick={() => exportCSV(caFiltered as unknown as Record<string, unknown>[], "jobingen-club-applications.csv")}>
                        <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        Export CSV
                      </button>
                    </div>
                  </div>
                  <div className="adm-tbl-wrap">
                    {caFiltered.length === 0 ? (
                      <div className="adm-empty"><div className="adm-empty-ico">📋</div>{search ? `No results for "${search}"` : "No applications yet"}</div>
                    ) : (
                      <table>
                        <thead>
                          <tr><th>#</th><th>Name</th><th>Email</th><th>Phone</th><th>College</th><th>City</th><th>Year</th><th>Branch</th><th>Current Role</th><th>LinkedIn</th><th>Instagram</th><th>Why Lead</th><th>Date</th><th></th></tr>
                        </thead>
                        <tbody>
                          {caFiltered.map((a, i) => (
                            <tr key={a.id}>
                              <td className="c-num">{i + 1}</td>
                              <td className="c-name">{a.name}</td>
                              <td className="c-email">{a.email}</td>
                              <td className="c-phone">{a.phone}</td>
                              <td style={{ fontSize: 13 }}>{a.college}</td>
                              <td style={{ fontSize: 12, color: "#64748b" }}>{a.city}</td>
                              <td style={{ fontSize: 12, color: "#64748b" }}>{a.year}</td>
                              <td style={{ fontSize: 12, color: "#64748b" }}>{a.branch}</td>
                              <td style={{ fontSize: 12, color: "#64748b" }}>{a.campus_role || "—"}</td>
                              <td>
                                {a.linkedin
                                  ? <a className="c-link" href={a.linkedin.startsWith("http") ? a.linkedin : `https://${a.linkedin}`} target="_blank" rel="noopener noreferrer">View</a>
                                  : "—"}
                              </td>
                              <td style={{ fontSize: 12, color: "#64748b" }}>{a.instagram || "—"}</td>
                              <td><span className="c-why" title={a.why_lead}>{a.why_lead}</span></td>
                              <td className="c-date">{fmt(a.created_at)}</td>
                              <td><DelBtn table="jobingen_club_applications" id={a.id} name={a.name} /></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              )}

              {/* ── Campus Ambassador Program ── */}
              {activeTab === "campus-ambassador" && (
                <div className="adm-sec">
                  <div className="adm-sec-head">
                    <div className="adm-sec-hl">
                      <div className="adm-sec-title">Campus Ambassador Program Applications</div>
                      <div className="adm-sec-badge">{capFiltered.length} applications</div>
                    </div>
                    <div className="adm-sec-actions">
                      <button className="adm-csv" onClick={() => exportCSV(capFiltered as unknown as Record<string, unknown>[], "campus-ambassador-applications.csv")}>
                        <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        Export CSV
                      </button>
                    </div>
                  </div>
                  <div className="adm-tbl-wrap">
                    {capFiltered.length === 0 ? (
                      <div className="adm-empty"><div className="adm-empty-ico">📋</div>{search ? `No results for "${search}"` : "No applications yet"}</div>
                    ) : (
                      <table>
                        <thead>
                          <tr><th>#</th><th>Name</th><th>Email</th><th>Phone</th><th>College</th><th>Year</th><th>Branch</th><th>City</th><th>Clubs</th><th>Reach</th><th>Content Creator</th><th>LinkedIn</th><th>Instagram</th><th>Motivation</th><th>Status</th><th>Date</th><th></th></tr>
                        </thead>
                        <tbody>
                          {capFiltered.map((a, i) => (
                            <tr key={a.id}>
                              <td className="c-num">{i + 1}</td>
                              <td className="c-name">{a.full_name}</td>
                              <td className="c-email">{a.email}</td>
                              <td className="c-phone">{a.phone}</td>
                              <td style={{ fontSize: 13 }}>{a.college}</td>
                              <td style={{ fontSize: 12, color: "#64748b" }}>{a.year}</td>
                              <td style={{ fontSize: 12, color: "#64748b" }}>{a.branch || "—"}</td>
                              <td style={{ fontSize: 12, color: "#64748b" }}>{a.city || "—"}</td>
                              <td style={{ fontSize: 12, color: "#64748b" }}>{a.clubs?.length ? a.clubs.join(", ") : "—"}</td>
                              <td style={{ fontSize: 12, color: "#64748b" }}>{a.student_reach}</td>
                              <td style={{ fontSize: 12, color: "#64748b" }}>{a.content_creator}</td>
                              <td>
                                {a.linkedin
                                  ? <a className="c-link" href={a.linkedin.startsWith("http") ? a.linkedin : `https://${a.linkedin}`} target="_blank" rel="noopener noreferrer">View</a>
                                  : "—"}
                              </td>
                              <td style={{ fontSize: 12, color: "#64748b" }}>{a.instagram || "—"}</td>
                              <td><span className="c-why" title={a.motivation}>{a.motivation}</span></td>
                              <td style={{ fontSize: 12, fontWeight: 700, color: "#1d3a8f" }}>{a.status}</td>
                              <td className="c-date">{fmt(a.submitted_at)}</td>
                              <td><DelBtn table="campus_ambassadors" id={a.id} name={a.full_name} /></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              )}

              {/* ── Early Access ── */}
              {activeTab === "early-access" && (
                <div className="adm-sec">
                  <div className="adm-sec-head">
                    <div className="adm-sec-hl">
                      <div className="adm-sec-title">Early Access Waitlist</div>
                      <div className="adm-sec-badge">{eaFiltered.length} users</div>
                    </div>
                    <div className="adm-sec-actions">
                      <button className="adm-csv" onClick={() => exportCSV(eaFiltered as unknown as Record<string, unknown>[], "early-access.csv")}>
                        <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        Export CSV
                      </button>
                    </div>
                  </div>
                  <div className="adm-tbl-wrap">
                    {eaFiltered.length === 0 ? (
                      <div className="adm-empty"><div className="adm-empty-ico">📋</div>{search ? `No results for "${search}"` : "No signups yet"}</div>
                    ) : (
                      <table>
                        <thead><tr><th>#</th><th>Name</th><th>Email</th><th>Phone</th><th>Date</th><th></th></tr></thead>
                        <tbody>
                          {eaFiltered.map((u, i) => (
                            <tr key={u.id}>
                              <td className="c-num">{i + 1}</td>
                              <td className="c-name">{u.name}</td>
                              <td className="c-email">{u.email}</td>
                              <td className="c-phone">{u.phone || "—"}</td>
                              <td className="c-date">{fmt(u.created_at)}</td>
                              <td><DelBtn table="early_access" id={u.id} name={u.name} /></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              )}

              {/* ── Student Insights ── */}
              {activeTab === "insights" && (
                <div className="adm-sec">
                  <div className="adm-sec-head">
                    <div className="adm-sec-hl">
                      <div className="adm-sec-title">Student Insights Survey</div>
                      <div className="adm-sec-badge">{studentInsights.length} responses</div>
                    </div>
                    <div className="adm-sec-actions">
                      <button className="adm-csv" onClick={() => exportCSV(studentInsights.map(s => ({
                        ...s,
                        problem_categories: (s.problem_categories || []).join(", "),
                        resume_frustrations: (s.resume_frustrations || []).join(", "),
                        job_search_methods: (s.job_search_methods || []).join(", "),
                        skill_blockers: (s.skill_blockers || []).join(", "),
                      })) as unknown as Record<string, unknown>[], "student-insights.csv")}>
                        <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        Export CSV
                      </button>
                    </div>
                  </div>
                  <div className="adm-tbl-wrap">
                    {studentInsights.length === 0 ? (
                      <div className="adm-empty"><div className="adm-empty-ico">📋</div>No student insights yet</div>
                    ) : (
                      <table>
                        <thead>
                          <tr>
                            <th>#</th><th>Name</th><th>College</th><th>Email</th>
                            <th>Current Situation</th><th>Stuck At</th>
                            <th>Resume Issues</th><th>Job Search</th>
                            <th>Interview Confidence</th><th>Skill Blockers</th>
                            <th>Open Answer</th><th>Date</th><th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {studentInsights.map((s, i) => (
                            <tr key={s.id}>
                              <td className="c-num">{i + 1}</td>
                              <td className="c-name">{s.name || "—"}</td>
                              <td style={{ fontSize: 13 }}>{s.college || "—"}</td>
                              <td className="c-email">{s.email || "—"}</td>
                              <td><span className="c-why" title={s.current_situation}>{s.current_situation || "—"}</span></td>
                              <td><span className="c-why" title={s.career_stuck_at}>{s.career_stuck_at || "—"}</span></td>
                              <td style={{ fontSize: 12 }}>
                                {(s.resume_frustrations && s.resume_frustrations.length > 0)
                                  ? s.resume_frustrations.map((r, ri) => (
                                      <span key={ri} className="c-tag" style={{ marginRight: 3, marginBottom: 2, fontSize: 10, padding: "2px 7px", display: "inline-block" }}>{r}</span>
                                    ))
                                  : "—"}
                              </td>
                              <td style={{ fontSize: 12 }}>
                                {(s.job_search_methods && s.job_search_methods.length > 0)
                                  ? s.job_search_methods.map((m, mi) => (
                                      <span key={mi} className="c-tag" style={{ marginRight: 3, marginBottom: 2, fontSize: 10, padding: "2px 7px", background: "#f0fdf4", color: "#16a34a", borderColor: "#bbf7d0", display: "inline-block" }}>{m}</span>
                                    ))
                                  : "—"}
                              </td>
                              <td style={{ textAlign: "center" }}>
                                <span style={{
                                  display: "inline-flex", alignItems: "center", gap: 4,
                                  fontSize: 13, fontWeight: 800,
                                  color: (s.interview_confidence ?? 0) >= 4 ? "#16a34a" : (s.interview_confidence ?? 0) >= 3 ? "#d97706" : "#dc2626",
                                  background: (s.interview_confidence ?? 0) >= 4 ? "#f0fdf4" : (s.interview_confidence ?? 0) >= 3 ? "#fffbeb" : "#fef2f2",
                                  padding: "3px 10px", borderRadius: 20,
                                }}>
                                  {s.interview_confidence ?? s.skill_rating ?? 0}/5
                                </span>
                              </td>
                              <td style={{ fontSize: 12 }}>
                                {(s.skill_blockers && s.skill_blockers.length > 0)
                                  ? s.skill_blockers.map((b, bi) => (
                                      <span key={bi} className="c-tag" style={{ marginRight: 3, marginBottom: 2, fontSize: 10, padding: "2px 7px", background: "#fff7ed", color: "#ea580c", borderColor: "#fed7aa", display: "inline-block" }}>{b}</span>
                                    ))
                                  : "—"}
                              </td>
                              <td><span className="c-why" title={s.open_answer || s.student_insight_text}>{s.open_answer || s.student_insight_text || "—"}</span></td>
                              <td className="c-date">{fmt(s.created_at)}</td>
                              <td><DelBtn table="student_insights" id={s.id} name={s.name || `Insight #${i + 1}`} /></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              )}

              {/* ── Mentor Applications ── */}
              {activeTab === "mentors" && (
                <div className="adm-sec">
                  <div className="adm-sec-head">
                    <div className="adm-sec-hl">
                      <div className="adm-sec-title">Mentor Applications</div>
                      <div className="adm-sec-badge">{mentorApps.length} applications</div>
                    </div>
                    <div className="adm-sec-actions">
                      <button className="adm-csv" onClick={() => exportCSV(mentorApps.map(m => ({ ...m, mentorship_topics: (m.mentorship_topics || []).join(", "), mentorship_format: (m.mentorship_format || []).join(", ") })) as unknown as Record<string, unknown>[], "mentor-applications.csv")}>
                        <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        Export CSV
                      </button>
                    </div>
                  </div>
                  <div className="adm-tbl-wrap">
                    {mentorApps.length === 0 ? (
                      <div className="adm-empty"><div className="adm-empty-ico">📋</div>No mentor applications yet</div>
                    ) : (
                      <table>
                        <thead>
                          <tr>
                            <th>#</th><th>Published</th><th>Type</th><th>Name</th><th>Email</th><th>Phone</th><th>Location</th>
                            <th>Domain</th><th>Role</th><th>Experience</th><th>LinkedIn</th>
                            <th>Topics</th><th>Price</th><th>Duration</th><th>Format</th>
                            <th>Days</th><th>Photo</th><th>Bio</th><th>Date</th><th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {mentorApps.map((m, i) => (
                            <tr key={m.id}>
                              <td className="c-num">{i + 1}</td>
                              <td>
                                <button
                                  onClick={() => handlePublishMentor(m.id, !!m.is_published)}
                                  style={{
                                    fontSize: 11, fontWeight: 700, padding: "4px 11px", borderRadius: 20, border: "1.5px solid", cursor: "pointer", transition: "all .15s",
                                    background: m.is_published ? "#dcfce7" : "#f1f5f9",
                                    color:      m.is_published ? "#15803d" : "#64748b",
                                    borderColor: m.is_published ? "#bbf7d0" : "#e2e8f0",
                                  }}
                                >
                                  {m.is_published ? "✓ Live" : "Publish"}
                                </button>
                              </td>
                              <td><span className="c-tag" style={{ background: m.role_type === "Workshop Lead" ? "#fff7ed" : "#f5f3ff", color: m.role_type === "Workshop Lead" ? "#ea580c" : "#7c3aed", borderColor: m.role_type === "Workshop Lead" ? "#fed7aa" : "#ddd6fe" }}>{m.role_type || "Mentor"}</span></td>
                              <td className="c-name">{m.full_name}</td>
                              <td className="c-email">{m.email}</td>
                              <td className="c-phone">{m.phone}</td>
                              <td style={{ fontSize: 12, color: "#64748b" }}>{m.location || "—"}</td>
                              <td><span className="c-tag" style={{ background: "#f5f3ff", color: "#7c3aed", borderColor: "#ddd6fe" }}>{m.domain}</span></td>
                              <td style={{ fontSize: 13, fontWeight: 600 }}>{m.job_title}</td>
                              <td style={{ fontSize: 12 }}>{m.experience}</td>
                              <td>{m.linkedin ? <a className="c-link" href={m.linkedin.startsWith("http") ? m.linkedin : `https://${m.linkedin}`} target="_blank" rel="noopener noreferrer">View</a> : "—"}</td>
                              <td style={{ fontSize: 12 }}>
                                {(m.mentorship_topics || []).map((t, ti) => (
                                  <span key={ti} className="c-tag" style={{ marginRight: 3, marginBottom: 2, fontSize: 10, padding: "2px 7px", display: "inline-block" }}>{t}</span>
                                ))}
                              </td>
                              <td style={{ fontSize: 13, fontWeight: 700, color: "#16a34a" }}>{m.session_price ? `₹${m.session_price}` : "—"}</td>
                              <td style={{ fontSize: 12, color: "#64748b" }}>{m.session_duration || "—"}</td>
                              <td style={{ fontSize: 12 }}>
                                {(m.mentorship_format || []).map((f, fi) => (
                                  <span key={fi} className="c-tag" style={{ marginRight: 3, marginBottom: 2, fontSize: 10, padding: "2px 7px", background: "#ecfdf5", color: "#0f766e", borderColor: "#a7f3d0", display: "inline-block" }}>{f}</span>
                                ))}
                              </td>
                              <td style={{ fontSize: 12 }}>
                                {(m.available_days || []).map((d, di) => (
                                  <span key={di} className="c-tag" style={{ marginRight: 3, marginBottom: 2, fontSize: 10, padding: "2px 7px", background: "#ecfeff", color: "#0891b2", borderColor: "#a5f3fc", display: "inline-block" }}>{d.slice(0, 3)}</span>
                                ))}
                                {(!m.available_days || m.available_days.length === 0) && "—"}
                              </td>
                              <td>{m.photo_url ? <a className="c-link" href={m.photo_url} target="_blank" rel="noopener noreferrer">View</a> : "—"}</td>
                              <td><span className="c-why" title={m.professional_bio}>{m.professional_bio || "—"}</span></td>
                              <td className="c-date">{fmt(m.created_at)}</td>
                              <td><DelBtn table="mentor_applications" id={m.id} name={m.full_name} /></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              )}

              {/* ── Interview Feedback ── */}
              {activeTab === "interview-fb" && (
                <div className="adm-sec">
                  <div className="adm-sec-head">
                    <div className="adm-sec-hl">
                      <div className="adm-sec-title">Interview Experiences</div>
                      <div className="adm-sec-badge">{interviewFeedback.length} submissions</div>
                    </div>
                    <div className="adm-sec-actions">
                      <button className="adm-csv" onClick={() => exportCSV(interviewFeedback.map(f => ({ ...f, interview_types: (f.interview_types || []).join(", ") })) as unknown as Record<string, unknown>[], "interview-feedback.csv")}>
                        <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        Export CSV
                      </button>
                    </div>
                  </div>
                  <div className="adm-tbl-wrap">
                    {interviewFeedback.length === 0 ? (
                      <div className="adm-empty"><div className="adm-empty-ico">📋</div>No interview feedback yet</div>
                    ) : (
                      <table>
                        <thead>
                          <tr>
                            <th>#</th><th>Name</th><th>Email</th><th>User Type</th><th>Domain</th><th>Role</th><th>Company Type</th>
                            <th>Interview Types</th><th>Difficulty</th><th>Questions</th>
                            <th>Process</th><th>Advice</th><th>Company</th><th>Location</th><th>Date</th><th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {interviewFeedback.map((f, i) => {
                            const diffColors = ["", "#22c55e", "#84cc16", "#f59e0b", "#f97316", "#ef4444"]
                            const diffLabels = ["", "Very Easy", "Easy", "Moderate", "Hard", "Very Hard"]
                            return (
                              <tr key={f.id}>
                                <td className="c-num">{i + 1}</td>
                                <td className="c-name">{f.name || "—"}</td>
                                <td className="c-email">{f.email || "—"}</td>
                                <td><span className="c-tag" style={{ background: "#f5f3ff", color: "#7c3aed", borderColor: "#ddd6fe" }}>{f.user_type}</span></td>
                                <td style={{ fontSize: 13, fontWeight: 600 }}>{f.domain}</td>
                                <td className="c-name">{f.role_position}</td>
                                <td style={{ fontSize: 12, color: "#64748b" }}>{f.company_type}</td>
                                <td style={{ fontSize: 12 }}>
                                  {(f.interview_types || []).map((t, ti) => (
                                    <span key={ti} className="c-tag" style={{ marginRight: 3, marginBottom: 2, fontSize: 10, padding: "2px 7px", display: "inline-block" }}>{t}</span>
                                  ))}
                                </td>
                                <td>
                                  <span style={{
                                    display: "inline-flex", alignItems: "center", fontSize: 12, fontWeight: 800,
                                    color: diffColors[f.difficulty_level] || "#64748b",
                                    background: `${diffColors[f.difficulty_level] || "#64748b"}18`,
                                    padding: "3px 10px", borderRadius: 20, whiteSpace: "nowrap" as const,
                                  }}>
                                    {f.difficulty_level}/5 {diffLabels[f.difficulty_level] || ""}
                                  </span>
                                </td>
                                <td><span className="c-why" title={f.questions_asked}>{f.questions_asked}</span></td>
                                <td><span className="c-why" title={f.interview_process}>{f.interview_process}</span></td>
                                <td><span className="c-why" title={f.advice}>{f.advice || "—"}</span></td>
                                <td style={{ fontSize: 12, fontWeight: 600, color: "#0f172a" }}>{f.company_name || "—"}</td>
                                <td style={{ fontSize: 12, color: "#64748b" }}>{f.interview_location || "—"}</td>
                                <td className="c-date">{fmt(f.created_at)}</td>
                                <td><DelBtn table="interview_feedback" id={f.id} name={`${f.role_position} @ ${f.domain}`} /></td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              )}

              {/* ── Patent Analyst Feedback ── */}
              {activeTab === "patent-fb" && (
                <div className="adm-sec">
                  <div className="adm-sec-head">
                    <div className="adm-sec-hl">
                      <div className="adm-sec-title">Patent Analyst Feedback</div>
                      <div className="adm-sec-badge">{patentFeedback.length} responses</div>
                    </div>
                    <div className="adm-sec-actions">
                      <button className="adm-csv" onClick={() => exportCSV(patentFeedback as unknown as Record<string, unknown>[], "patent-analyst-feedback.csv")}>
                        <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        Export CSV
                      </button>
                    </div>
                  </div>
                  <div className="adm-tbl-wrap">
                    {patentFeedback.length === 0 ? (
                      <div className="adm-empty"><div className="adm-empty-ico">📋</div>No submissions yet</div>
                    ) : (
                      <table>
                        <thead>
                          <tr><th>#</th><th>Name</th><th>College</th><th>Status</th><th>Interview Stage</th><th>Rating</th><th>Jobingen Support</th><th>Insights</th><th>Quote</th><th>Date</th><th></th></tr>
                        </thead>
                        <tbody>
                          {patentFeedback.map((r, i) => (
                            <tr key={r.id}>
                              <td className="c-num">{i + 1}</td>
                              <td className="c-name">{r.full_name}</td>
                              <td style={{ fontSize: 13 }}>{r.college}</td>
                              <td style={{ fontSize: 12, color: "#64748b" }}>{r.current_status}</td>
                              <td style={{ fontSize: 12, fontWeight: 600, color: "#1d3a8f" }}>{r.reached_interview}</td>
                              <td style={{ fontSize: 12, fontWeight: 700, color: r.interview_experience === "Excellent" ? "#16a34a" : r.interview_experience === "Good" ? "#2563eb" : r.interview_experience === "Average" ? "#d97706" : "#dc2626" }}>{r.interview_experience}</td>
                              <td style={{ fontSize: 12, color: "#64748b" }}>{r.jobingen_support || "—"}</td>
                              <td><span className="c-why" title={r.interview_insights}>{r.interview_insights || "—"}</span></td>
                              <td><span className="c-why" title={r.candidate_quote}>{r.candidate_quote || "—"}</span></td>
                              <td className="c-date">{fmt(r.created_at)}</td>
                              <td><DelBtn table="patent_analyst_feedback" id={r.id} name={r.full_name} /></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              )}

              {/* ── Creator Community ── */}
              {activeTab === "creators" && (
                <div className="adm-sec">
                  <div className="adm-sec-head">
                    <div className="adm-sec-hl">
                      <div className="adm-sec-title">Creator Community Applications</div>
                      <div className="adm-sec-badge">{ccFiltered.length} applications</div>
                    </div>
                    <div className="adm-sec-actions">
                      <button className="adm-csv" onClick={() => exportCSV(ccFiltered.map(r => ({ ...r, content_types: (r.content_types || []).join(", ") })) as unknown as Record<string, unknown>[], "creator-community-applications.csv")}>
                        <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        Export CSV
                      </button>
                    </div>
                  </div>
                  <div className="adm-tbl-wrap">
                    {ccFiltered.length === 0 ? (
                      <div className="adm-empty"><div className="adm-empty-ico">🎬</div>{search ? `No results for "${search}"` : "No creator applications yet"}</div>
                    ) : (
                      <table>
                        <thead>
                          <tr>
                            <th>#</th><th>Name</th><th>Email</th><th>Phone</th><th>City</th>
                            <th>Instagram</th><th>LinkedIn</th><th>Followers</th>
                            <th>Content Types</th><th>Collab Model</th><th>Posts/Week</th>
                            <th>Idea</th><th>Date</th><th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {ccFiltered.map((r, i) => (
                            <tr key={r.id}>
                              <td className="c-num">{i + 1}</td>
                              <td className="c-name">{r.full_name}</td>
                              <td className="c-email">{r.email}</td>
                              <td className="c-phone">{r.phone}</td>
                              <td style={{ fontSize: 12, color: "#64748b" }}>{r.city}</td>
                              <td>
                                <a className="c-link" href={`https://instagram.com/${r.instagram.replace("@", "")}`} target="_blank" rel="noopener noreferrer">
                                  @{r.instagram.replace("@", "")}
                                </a>
                              </td>
                              <td>
                                {r.linkedin
                                  ? <a className="c-link" href={r.linkedin.startsWith("http") ? r.linkedin : `https://${r.linkedin}`} target="_blank" rel="noopener noreferrer">View</a>
                                  : "—"}
                              </td>
                              <td>
                                <span className="c-tag" style={{ background: "#ecfeff", color: "#0891b2", borderColor: "#a5f3fc" }}>
                                  {r.follower_count}
                                </span>
                              </td>
                              <td style={{ fontSize: 12 }}>
                                {(r.content_types || []).map((t, ti) => (
                                  <span key={ti} className="c-tag" style={{ marginRight: 3, marginBottom: 2, fontSize: 10, padding: "2px 7px", background: "#eef2ff", color: "#1d3a8f", borderColor: "#dde5ff", display: "inline-block" }}>{t}</span>
                                ))}
                              </td>
                              <td>
                                <span className="c-tag" style={{ background: "#f0fdf4", color: "#16a34a", borderColor: "#bbf7d0" }}>
                                  {r.collaboration_model}
                                </span>
                              </td>
                              <td style={{ fontSize: 12, color: "#64748b", textAlign: "center" }}>{r.posts_per_week}/wk</td>
                              <td><span className="c-why" title={r.content_idea}>{r.content_idea}</span></td>
                              <td className="c-date">{fmt(r.created_at)}</td>
                              <td><DelBtn table="creator_community_applications" id={r.id} name={r.full_name} /></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              )}

              {/* ── Early Apply ── */}
              {activeTab === "early-apply" && (
                <div className="adm-sec">
                  <div className="adm-sec-head">
                    <div className="adm-sec-hl">
                      <div className="adm-sec-title">Early Apply — Summer Training 2026</div>
                      <div className="adm-sec-badge">{eaplyFiltered.length} applications</div>
                    </div>
                    <div className="adm-sec-actions">
                      <button className="adm-csv" onClick={() => exportCSV(eaplyFiltered as unknown as Record<string, unknown>[], "early-apply-applications.csv")}>
                        <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        Export CSV
                      </button>
                    </div>
                  </div>
                  <div className="adm-tbl-wrap">
                    {eaplyFiltered.length === 0 ? (
                      <div className="adm-empty"><div className="adm-empty-ico">📋</div>{search ? `No results for "${search}"` : "No applications yet"}</div>
                    ) : (
                      <table>
                        <thead>
                          <tr>
                            <th>#</th><th>Name</th><th>Email</th><th>Phone</th>
                            <th>College</th><th>Status</th><th>Domain</th>
                            <th>Why</th><th>Portfolio</th><th>Date</th><th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {eaplyFiltered.map((r, i) => (
                            <tr key={r.id}>
                              <td className="c-num">{i + 1}</td>
                              <td className="c-name">{r.name}</td>
                              <td className="c-email">{r.email}</td>
                              <td className="c-phone">{r.phone || "—"}</td>
                              <td style={{ fontSize: 13 }}>{r.college}</td>
                              <td>
                                <span className="c-tag" style={{ background: "#f0fdf4", color: "#16a34a", borderColor: "#bbf7d0" }}>
                                  {r.status}
                                </span>
                              </td>
                              <td>
                                <span className="c-tag" style={{ background: "#eef2ff", color: "#1d3a8f", borderColor: "#dde5ff" }}>
                                  {r.domain}
                                </span>
                              </td>
                              <td><span className="c-why" title={r.why}>{r.why}</span></td>
                              <td>
                                {r.portfolio
                                  ? <a className="c-link" href={r.portfolio.startsWith("http") ? r.portfolio : `https://${r.portfolio}`} target="_blank" rel="noopener noreferrer">View</a>
                                  : "—"}
                              </td>
                              <td className="c-date">{fmt(r.created_at)}</td>
                              <td><DelBtn table="early_apply" id={r.id} name={r.name} /></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              )}

              {/* ── Hiring Requests ── */}
              {activeTab === "hire-talent" && (
                <div className="adm-sec">
                  <div className="adm-sec-head">
                    <div className="adm-sec-hl">
                      <div className="adm-sec-title">Hiring Requests</div>
                      <div className="adm-sec-badge">{hrFiltered.length} requests</div>
                    </div>
                    <div className="adm-sec-actions">
                      <button className="adm-csv" onClick={() => exportCSV(hrFiltered as unknown as Record<string, unknown>[], "hiring-requests.csv")}>
                        <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        Export CSV
                      </button>
                    </div>
                  </div>
                  <div className="adm-tbl-wrap">
                    {hrFiltered.length === 0 ? (
                      <div className="adm-empty"><div className="adm-empty-ico">🏢</div>{search ? `No results for "${search}"` : "No hiring requests yet"}</div>
                    ) : (
                      <table>
                        <thead>
                          <tr>
                            <th>#</th><th>Company</th><th>Contact</th><th>Email</th><th>Phone</th>
                            <th>Talent Type</th><th>Role</th><th>Domain</th>
                            <th>Skills</th><th>Hires</th><th>Work Model</th>
                            <th>Details</th><th>Website</th><th>Date</th><th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {hrFiltered.map((r, i) => (
                            <tr key={r.id}>
                              <td className="c-num">{i + 1}</td>
                              <td className="c-name">{r.company_name}</td>
                              <td style={{ fontSize: 13 }}>{r.contact_name}</td>
                              <td className="c-email">{r.work_email}</td>
                              <td className="c-phone">{r.phone}</td>
                              <td>
                                <span className="c-tag" style={{ background: "#eef2ff", color: "#1d3a8f", borderColor: "#dde5ff" }}>
                                  {r.talent_type || "—"}
                                </span>
                              </td>
                              <td style={{ fontSize: 13, fontWeight: 600 }}>{r.role_title || "—"}</td>
                              <td>
                                <span className="c-tag" style={{ background: "#ecfeff", color: "#0891b2", borderColor: "#a5f3fc" }}>
                                  {r.domain || "—"}
                                </span>
                              </td>
                              <td><span className="c-why" title={r.required_skills}>{r.required_skills || "—"}</span></td>
                              <td style={{ textAlign: "center", fontSize: 13, fontWeight: 700, color: "#0891b2" }}>{r.num_hires ?? "—"}</td>
                              <td>
                                <span className="c-tag" style={{ background: "#f0fdf4", color: "#16a34a", borderColor: "#bbf7d0" }}>
                                  {r.work_model || "—"}
                                </span>
                              </td>
                              <td><span className="c-why" title={r.additional_details}>{r.additional_details || "—"}</span></td>
                              <td>
                                {r.website_url
                                  ? <a className="c-link" href={r.website_url.startsWith("http") ? r.website_url : `https://${r.website_url}`} target="_blank" rel="noopener noreferrer">Visit</a>
                                  : "—"}
                              </td>
                              <td className="c-date">{fmt(r.created_at)}</td>
                              <td><DelBtn table="hiring_requests" id={r.id} name={r.company_name} /></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              )}

              {/* ── Careers Applications ── */}
              {activeTab === "careers" && (
                <div className="adm-sec">
                  <div className="adm-sec-head">
                    <div className="adm-sec-hl">
                      <div className="adm-sec-title">Careers — Internship Applications</div>
                      <div className="adm-sec-badge">{careersFiltered.length} applications</div>
                    </div>
                    <div className="adm-sec-actions">
                      <button className="adm-csv" onClick={() => exportCSV(careersFiltered as unknown as Record<string, unknown>[], "careers-applications.csv")}>
                        <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        Export CSV
                      </button>
                    </div>
                  </div>
                  <div className="adm-tbl-wrap">
                    {careersFiltered.length === 0 ? (
                      <div className="adm-empty"><div className="adm-empty-ico">👤</div>{search ? `No results for "${search}"` : "No internship applications yet"}</div>
                    ) : (
                      <table>
                        <thead>
                          <tr>
                            <th>#</th><th>Name</th><th>Email</th><th>Phone</th>
                            <th>Role</th><th>College</th><th>Year</th>
                            <th>LinkedIn</th><th>Portfolio</th><th>Resume</th>
                            <th>Why</th><th>Date</th><th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {careersFiltered.map((r, i) => (
                            <tr key={r.id}>
                              <td className="c-num">{i + 1}</td>
                              <td className="c-name">{r.name}</td>
                              <td className="c-email">{r.email}</td>
                              <td className="c-phone">{r.phone}</td>
                              <td>
                                <span className="c-tag" style={{ background: "#eef2ff", color: "#1d3a8f", borderColor: "#dde5ff" }}>
                                  {r.role_title}
                                </span>
                              </td>
                              <td style={{ fontSize: 13 }}>{r.college}</td>
                              <td style={{ fontSize: 12, color: "#64748b" }}>{r.year}</td>
                              <td>
                                {r.linkedin
                                  ? <a className="c-link" href={r.linkedin.startsWith("http") ? r.linkedin : `https://${r.linkedin}`} target="_blank" rel="noopener noreferrer">View</a>
                                  : "—"}
                              </td>
                              <td>
                                {r.portfolio
                                  ? <a className="c-link" href={r.portfolio.startsWith("http") ? r.portfolio : `https://${r.portfolio}`} target="_blank" rel="noopener noreferrer">View</a>
                                  : "—"}
                              </td>
                              <td>
                                {r.resume_url
                                  ? <a className="c-link" href={r.resume_url} target="_blank" rel="noopener noreferrer">Download</a>
                                  : "—"}
                              </td>
                              <td><span className="c-why" title={r.why}>{r.why || "—"}</span></td>
                              <td className="c-date">{fmt(r.created_at)}</td>
                              <td><DelBtn table="careers_applications" id={r.id} name={r.name} /></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              )}

              {/* ── Feedback ── */}
              {activeTab === "feedback" && (
                <div className="adm-sec">
                  <div className="adm-sec-head">
                    <div className="adm-sec-hl">
                      <div className="adm-sec-title">Bootcamp Feedback</div>
                      <div className="adm-sec-badge">{fbFiltered.length} responses</div>
                    </div>
                    <div className="adm-sec-actions">
                      <button className="adm-csv" onClick={() => exportCSV(fbFiltered as unknown as Record<string, unknown>[], "bootcamp-feedback.csv")}>
                        <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        Export CSV
                      </button>
                    </div>
                  </div>
                  <div className="adm-tbl-wrap">
                    {fbFiltered.length === 0 ? (
                      <div className="adm-empty"><div className="adm-empty-ico">📋</div>{search ? `No results for "${search}"` : "No feedback yet"}</div>
                    ) : (
                      <table>
                        <thead><tr><th>#</th><th>Name</th><th>Email</th><th>Bootcamp</th><th>Overall</th><th>Content</th><th>Mentor</th><th>Liked</th><th>Improve</th><th>Recommend</th><th>Next Topic</th><th>Date</th><th></th></tr></thead>
                        <tbody>
                          {fbFiltered.map((r, i) => (
                            <tr key={r.id}>
                              <td className="c-num">{i + 1}</td>
                              <td className="c-name">{r.name}</td>
                              <td className="c-email">{r.email || "—"}</td>
                              <td>
                                <span style={{
                                  fontSize: 11, fontWeight: 700, padding: "3px 9px", borderRadius: 99,
                                  background: r.bootcamp === "flagship_2026" ? "#eef1fd" : "#f0fdf4",
                                  color: r.bootcamp === "flagship_2026" ? "#1d3a8f" : "#16a34a",
                                  border: `1px solid ${r.bootcamp === "flagship_2026" ? "rgba(29,58,143,.2)" : "rgba(22,163,74,.2)"}`,
                                  whiteSpace: "nowrap",
                                }}>
                                  {r.bootcamp === "flagship_2026" ? "Flagship 2026" : r.bootcamp || "—"}
                                </span>
                              </td>
                              <td>
                                <span style={{
                                  display: "inline-flex", alignItems: "center", gap: 4,
                                  fontSize: 12, fontWeight: 800,
                                  color: r.overall_rating >= 4 ? "#16a34a" : r.overall_rating >= 3 ? "#d97706" : "#dc2626",
                                  background: r.overall_rating >= 4 ? "#f0fdf4" : r.overall_rating >= 3 ? "#fffbeb" : "#fef2f2",
                                  padding: "3px 10px", borderRadius: 20,
                                }}>
                                  {r.overall_rating}/5
                                </span>
                              </td>
                              <td style={{ fontSize: 12, color: "#64748b" }}>{r.content_rating ? `${r.content_rating}/5` : "—"}</td>
                              <td style={{ fontSize: 12, color: "#64748b" }}>{r.mentor_rating ? `${r.mentor_rating}/5` : "—"}</td>
                              <td><span className="c-why" title={r.liked}>{r.liked}</span></td>
                              <td><span className="c-why" title={r.improve}>{r.improve || "—"}</span></td>
                              <td style={{ fontSize: 12 }}>{r.recommend || "—"}</td>
                              <td style={{ fontSize: 12, color: "#64748b" }}>{r.next_topic || "—"}</td>
                              <td className="c-date">{fmt(r.created_at)}</td>
                              <td><DelBtn table="bootcamp_feedback" id={r.id} name={r.name} /></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              )}
              {/* ── Bug Bash Reports ── */}
              {activeTab === "bug-bash" && (
                <div className="adm-sec">
                  <div className="adm-sec-head">
                    <div className="adm-sec-hl">
                      <div className="adm-sec-title">Bug Bash Reports</div>
                      <div className="adm-sec-badge">{bugBashReports.length} reports</div>
                    </div>
                    <div className="adm-sec-actions">
                      <button className="adm-csv" onClick={() => exportCSV(
                        bugBashReports.map(r => ({
                          id: r.id,
                          tester_name: r.tester_name,
                          tester_email: r.tester_email || "",
                          team_name: r.team_name || "",
                          bug_count: r.bugs?.length ?? 0,
                          bugs_json: JSON.stringify(r.bugs),
                          created_at: r.created_at,
                        })) as unknown as Record<string, unknown>[],
                        "bug-bash-reports.csv"
                      )}>
                        <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        Export CSV
                      </button>
                    </div>
                  </div>
                  <div className="adm-tbl-wrap">
                    {bugBashReports.length === 0 ? (
                      <div className="adm-empty"><div className="adm-empty-ico">🐛</div>No bug reports yet</div>
                    ) : (
                      <table>
                        <thead>
                          <tr><th>#</th><th>Tester</th><th>Email</th><th>Phone</th><th>Team</th><th>Bugs</th><th>Date</th><th>View</th><th></th></tr>
                        </thead>
                        <tbody>
                          {bugBashReports.map((r, i) => (
                            <tr key={r.id}>
                              <td className="c-num">{i + 1}</td>
                              <td className="c-name">{r.tester_name}</td>
                              <td className="c-email">{r.tester_email || "—"}</td>
                              <td className="c-phone">{r.tester_phone || "—"}</td>
                              <td style={{ fontSize: 12, color: "#64748b" }}>{r.team_name || "—"}</td>
                              <td>
                                <span className="c-tag" style={{ background: "#fef2f2", color: "#dc2626", borderColor: "#fecaca" }}>
                                  {r.bugs?.length ?? 0} bug{(r.bugs?.length ?? 0) !== 1 ? "s" : ""}
                                </span>
                              </td>
                              <td className="c-date">{fmt(r.created_at)}</td>
                              <td>
                                <button
                                  className="c-link"
                                  style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", padding: 0 }}
                                  onClick={() => {
                                    const w = window.open("", "_blank", "width=720,height=800")
                                    if (!w) return
                                    const severityColor: Record<string, string> = { Critical: "#dc2626", High: "#ea580c", Medium: "#d97706", Low: "#16a34a" }
                                    const categoryColor = "#1d3a8f"
                                    w.document.write(`<!DOCTYPE html><html><head><title>Bug Report — ${r.tester_name}</title><style>
                                      *{box-sizing:border-box;margin:0;padding:0}
                                      body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f0f2f8;padding:32px 24px}
                                      h1{font-size:22px;font-weight:900;color:#09090f;margin-bottom:4px}
                                      .sub{font-size:14px;color:#64748b;margin-bottom:28px}
                                      .bug{background:#fff;border:1.5px solid #e2e8f0;border-radius:16px;padding:20px 24px;margin-bottom:18px}
                                      .bug-hdr{display:flex;align-items:center;gap:10px;margin-bottom:16px;padding-bottom:14px;border-bottom:1px solid #f1f5f9}
                                      .bug-num{font-size:13px;font-weight:800;color:#1d3a8f}
                                      .badge{display:inline-flex;font-size:11px;font-weight:700;padding:3px 10px;border-radius:99px;border:1px solid}
                                      .row{margin-bottom:12px}
                                      .lbl{font-size:10px;font-weight:800;color:#94a3b8;text-transform:uppercase;letter-spacing:.06em;margin-bottom:4px}
                                      .val{font-size:14px;color:#334155;line-height:1.55;background:#f8fafc;border-radius:8px;padding:10px 14px}
                                      .steps{list-style:none;display:flex;flex-direction:column;gap:6px}
                                      .step{display:flex;gap:10px;align-items:flex-start}
                                      .step-n{min-width:22px;height:22px;border-radius:50%;background:#1d3a8f;color:white;font-size:10px;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px}
                                      .grid2{display:grid;grid-template-columns:1fr 1fr;gap:12px}
                                    </style></head><body>
                                    <h1>Bug Bash Report</h1>
                                    <div class="sub">${r.tester_name}${r.team_name ? ` · ${r.team_name}` : ""}${r.tester_email ? ` · ${r.tester_email}` : ""} · ${new Date(r.created_at).toLocaleString("en-IN")}</div>
                                    ${(r.bugs || []).map((b, bi) => `
                                      <div class="bug">
                                        <div class="bug-hdr">
                                          <span class="bug-num">Bug #${bi + 1}</span>
                                          <span class="badge" style="background:${(severityColor[b.severity] || "#64748b")}18;color:${severityColor[b.severity] || "#64748b"};border-color:${severityColor[b.severity] || "#64748b"}40">${b.severity}</span>
                                          <span class="badge" style="background:#eef2ff;color:${categoryColor};border-color:#dde5ff">${b.category}</span>
                                        </div>
                                        <div class="grid2">
                                          <div class="row"><div class="lbl">Page / URL</div><div class="val">${b.page_url}</div></div>
                                          <div class="row"><div class="lbl">Feature / Area</div><div class="val">${b.feature_area}</div></div>
                                        </div>
                                        <div class="row"><div class="lbl">What You Tried</div><div class="val">${b.what_tried}</div></div>
                                        <div class="row"><div class="lbl">Steps to Reproduce</div><div class="val"><ul class="steps">${b.steps.filter(Boolean).map((s, si) => `<li class="step"><span class="step-n">${si + 1}</span><span>${s}</span></li>`).join("")}</ul></div></div>
                                        <div class="grid2">
                                          <div class="row"><div class="lbl">Expected Result</div><div class="val">${b.expected}</div></div>
                                          <div class="row"><div class="lbl">Actual Result</div><div class="val">${b.actual}</div></div>
                                        </div>
                                        <div class="row"><div class="lbl">Screenshot</div><div class="val">${(() => {
                                          const url = (b.screenshot_note || "").trim()
                                          if (!url) return '<span style="color:#94a3b8;font-size:13px">Not uploaded</span>'
                                          const isImg = /\.(png|jpe?g|gif|webp|svg)(\?|$)/i.test(url)
                                          if (isImg) return `<a href="${url}" target="_blank" rel="noopener noreferrer"><img src="${url}" alt="screenshot" style="max-width:100%;max-height:300px;border-radius:8px;border:1px solid #e2e8f0;display:block;margin-bottom:6px"></a><a href="${url}" target="_blank" rel="noopener noreferrer" style="color:#2563eb;font-size:12px;font-weight:600">Open full size ↗</a>`
                                          if (/^https?:\/\//.test(url)) return `<a href="${url}" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:8px;background:#eff6ff;color:#2563eb;font-weight:700;font-size:13px;padding:10px 16px;border-radius:10px;text-decoration:none;border:1px solid #bfdbfe">📎 View Screenshot / PDF ↗</a>`
                                          return `<span style="font-size:13px;color:#334155">${url}</span>`
                                        })()}</div></div>
                                      </div>
                                    `).join("")}
                                    </body></html>`)
                                    w.document.close()
                                  }}
                                >
                                  View Bugs
                                </button>
                              </td>
                              <td><DelBtn table="bug_bash_reports" id={r.id} name={r.tester_name} /></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Delete confirmation modal */}
      {deleteModal && (
        <div className="adm-modal-bg" onClick={() => !deleting && setDeleteModal(null)}>
          <div className="adm-modal" onClick={e => e.stopPropagation()}>
            <div className="adm-modal-icon">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14Z" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <h3>Delete this entry?</h3>
            <p>You are about to permanently delete <strong>{deleteModal.name}</strong>. This action cannot be undone.</p>
            <div className="adm-modal-btns">
              <button className="adm-modal-cancel" onClick={() => setDeleteModal(null)} disabled={deleting}>Cancel</button>
              <button className="adm-modal-confirm" onClick={handleDelete} disabled={deleting}>
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
