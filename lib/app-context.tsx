"use client"

import React, { createContext, useContext, useState, useCallback } from "react"
import { Job, Resume, DEFAULT_RESUMES } from "@/lib/mock-data"

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

export type Tab = "dashboard" | "resume" | "jobs" | "preparation" | "profile"

export type Toast = {
  id: string
  message: string
  type?: "success" | "info" | "error"
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
  const [profileName, setProfileName] = useState("Mohit Rawat")
  const [skills, setSkills] = useState(["Python", "PyTorch", "LLMs", "SQL", "React", "Node.js"])

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
