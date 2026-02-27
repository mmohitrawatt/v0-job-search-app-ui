"use client"

import React, { createContext, useContext, useState, useCallback } from "react"
import { Job, Resume, DEFAULT_RESUMES, Application, JobAlert, MOCK_APPLICATIONS, MOCK_ALERTS } from "@/lib/mock-data"

export type Screen =
  | "dashboard"
  | "resume"
  | "jobs"
  | "preparation"
  | "profile"
  | "job-detail"
  | "smart-apply"
  | "resume-form"
  | "resume-preview"
  | "resume-optimize"
  | "prep-detail"
  | "ai-interview"
  | "salary-intel"
  | "job-alerts"
  | "resume-tailor"

export type Tab = "dashboard" | "resume" | "jobs" | "preparation" | "profile"

export type Toast = {
  id: string
  message: string
  type?: "success" | "info" | "error"
}

export type WorkExperience = {
  id: string
  role: string
  company: string
  location: string
  duration: string
  current: boolean
  points: string[]
}

export type Education = {
  id: string
  degree: string
  institution: string
  location: string
  year: string
  cgpa: string
}

export type Certification = {
  id: string
  name: string
  issuer: string
  year: string
}

export type ProfileData = {
  name: string
  headline: string
  location: string
  email: string
  phone: string
  linkedIn: string
  github: string
  about: string
  skills: string[]
  experience: WorkExperience[]
  education: Education[]
  certifications: Certification[]
  languages: string[]
  isPro: boolean
}

type AppContextType = {
  activeTab: Tab
  setActiveTab: (tab: Tab) => void
  screen: Screen
  navigate: (screen: Screen) => void
  goBack: () => void
  selectedJob: Job | null
  setSelectedJob: (job: Job | null) => void
  bookmarks: Set<string>
  toggleBookmark: (jobId: string) => void
  resumes: Resume[]
  addResume: (resume: Resume) => void
  savedJobIds: string[]
  toggleSavedJob: (jobId: string) => void
  toasts: Toast[]
  showToast: (message: string, type?: Toast["type"]) => void
  prepJobId: string | null
  setPrepJobId: (id: string | null) => void
  profileName: string
  setProfileName: (name: string) => void
  skills: string[]
  setSkills: (skills: string[]) => void
  profile: ProfileData
  setProfile: (data: ProfileData) => void
  applications: Application[]
  updateApplicationStatus: (id: string, status: import("@/lib/mock-data").ApplicationStatus) => void
  alerts: JobAlert[]
  addAlert: (alert: Omit<JobAlert, "id">) => void
  toggleAlert: (id: string) => void
  deleteAlert: (id: string) => void
  notificationCount: number
  salaryRole: string | null
  setSalaryRole: (role: string | null) => void
  isPro: boolean
  setIsPro: (v: boolean) => void
}

const DEFAULT_PROFILE: ProfileData = {
  name: "Arjun Sharma",
  headline: "SDE II — AI/ML | IIT Delhi '22",
  location: "Bengaluru, Karnataka",
  email: "arjun.sharma@gmail.com",
  phone: "+91 98765 43210",
  linkedIn: "linkedin.com/in/arjunsharma",
  github: "github.com/arjun-sharma",
  about:
    "Passionate ML Engineer with 3+ years of experience building production AI systems. Specialised in LLMs, recommendation engines, and scalable data pipelines. Previously built demand forecasting at Swiggy and worked on NLP products at a Series B startup. Love solving real-world problems with data.",
  skills: ["Python", "PyTorch", "LLMs", "FastAPI", "SQL", "React", "Node.js", "AWS", "Kubernetes", "A/B Testing"],
  experience: [
    {
      id: "e1",
      role: "SDE II — Machine Learning",
      company: "Swiggy",
      location: "Bengaluru, KA",
      duration: "Aug 2023 – Present",
      current: true,
      points: [
        "Built real-time demand forecasting model reducing inventory waste by 23% across 500+ dark stores",
        "Led migration of legacy batch ML pipeline to streaming architecture using Kafka + Flink (latency: 15min → 30sec)",
        "Shipped LLM-powered dish description generator used by 2L+ restaurant partners",
      ],
    },
    {
      id: "e2",
      role: "Data Scientist",
      company: "Meesho",
      location: "Bengaluru, KA",
      duration: "Jun 2022 – Jul 2023",
      current: false,
      points: [
        "Developed product ranking model boosting GMV by ₹8Cr/month using XGBoost + deep feature engineering",
        "Built A/B experimentation framework from scratch, enabling 40+ simultaneous product experiments",
        "Reduced customer churn by 18% with propensity model deployed on SageMaker",
      ],
    },
    {
      id: "e3",
      role: "ML Intern",
      company: "Ola Electric",
      location: "Bengaluru, KA",
      duration: "Jan 2022 – May 2022",
      current: false,
      points: [
        "Built battery degradation prediction model with 94% accuracy for EV fleet health monitoring",
        "Automated data quality checks saving 20 engineer-hours per week",
      ],
    },
  ],
  education: [
    {
      id: "ed1",
      degree: "B.Tech — Computer Science & Engineering",
      institution: "Indian Institute of Technology, Delhi",
      location: "New Delhi",
      year: "2018 – 2022",
      cgpa: "9.1 / 10",
    },
    {
      id: "ed2",
      degree: "Class XII — PCM",
      institution: "DPS R.K. Puram",
      location: "New Delhi",
      year: "2018",
      cgpa: "96.4%",
    },
  ],
  certifications: [
    { id: "c1", name: "Deep Learning Specialization", issuer: "Coursera / deeplearning.ai", year: "2022" },
    { id: "c2", name: "AWS Certified ML Specialty", issuer: "Amazon Web Services", year: "2023" },
    { id: "c3", name: "Google Cloud Professional Data Engineer", issuer: "Google Cloud", year: "2023" },
  ],
  languages: ["Hindi (Native)", "English (Fluent)", "Kannada (Basic)"],
  isPro: true,
}

const AppContext = createContext<AppContextType | null>(null)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTabState] = useState<Tab>("dashboard")
  const [screenStack, setScreenStack] = useState<Screen[]>(["dashboard"])
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set(["1", "3"]))
  const [resumes, setResumes] = useState<Resume[]>(DEFAULT_RESUMES)
  const [savedJobIds, setSavedJobIds] = useState<string[]>(["1", "3", "5"])
  const [toasts, setToasts] = useState<Toast[]>([])
  const [prepJobId, setPrepJobId] = useState<string | null>("1")
  const [profile, setProfile] = useState<ProfileData>(DEFAULT_PROFILE)
  const [applications, setApplications] = useState<Application[]>(MOCK_APPLICATIONS)
  const [alerts, setAlerts] = useState<JobAlert[]>(MOCK_ALERTS)
  const [salaryRole, setSalaryRole] = useState<string | null>(null)
  const [isPro, setIsPro] = useState(true)

  const profileName = profile.name
  const skills = profile.skills
  const setProfileName = useCallback((name: string) => setProfile((p) => ({ ...p, name })), [])
  const setSkills = useCallback((skills: string[]) => setProfile((p) => ({ ...p, skills })), [])

  const screen = screenStack[screenStack.length - 1]

  const navigate = useCallback((s: Screen) => {
    setScreenStack((prev) => [...prev, s])
  }, [])

  const goBack = useCallback(() => {
    setScreenStack((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev))
  }, [])

  const setActiveTab = useCallback((tab: Tab) => {
    setActiveTabState(tab)
    setScreenStack([tab as Screen])
  }, [])

  const toggleBookmark = useCallback((jobId: string) => {
    setBookmarks((prev) => {
      const next = new Set(prev)
      if (next.has(jobId)) {
        next.delete(jobId)
      } else {
        next.add(jobId)
      }
      return next
    })
  }, [])

  const addResume = useCallback((resume: Resume) => {
    setResumes((prev) => [resume, ...prev])
  }, [])

  const toggleSavedJob = useCallback((jobId: string) => {
    setSavedJobIds((prev) =>
      prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]
    )
  }, [])

  const showToast = useCallback((message: string, type: Toast["type"] = "success") => {
    const id = Math.random().toString(36).slice(2)
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3000)
  }, [])

  const updateApplicationStatus = useCallback((id: string, status: import("@/lib/mock-data").ApplicationStatus) => {
    setApplications((prev) => prev.map((a) => a.id === id ? { ...a, status } : a))
  }, [])

  const addAlert = useCallback((alert: Omit<JobAlert, "id">) => {
    const id = Math.random().toString(36).slice(2)
    setAlerts((prev) => [{ ...alert, id }, ...prev])
  }, [])

  const toggleAlert = useCallback((id: string) => {
    setAlerts((prev) => prev.map((a) => a.id === id ? { ...a, active: !a.active } : a))
  }, [])

  const deleteAlert = useCallback((id: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id))
  }, [])

  const notificationCount = alerts.filter((a) => a.active).reduce((sum, a) => sum + a.matchCount, 0)

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        screen,
        navigate,
        goBack,
        selectedJob,
        setSelectedJob,
        bookmarks,
        toggleBookmark,
        resumes,
        addResume,
        savedJobIds,
        toggleSavedJob,
        toasts,
        showToast,
        prepJobId,
        setPrepJobId,
        profileName,
        setProfileName,
        skills,
        setSkills,
        profile,
        setProfile,
        applications,
        updateApplicationStatus,
        alerts,
        addAlert,
        toggleAlert,
        deleteAlert,
        notificationCount,
        salaryRole,
        setSalaryRole,
        isPro,
        setIsPro,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error("useApp must be used within AppProvider")
  return ctx
}
