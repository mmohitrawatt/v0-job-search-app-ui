"use client"

import Link from "next/link"
import { useState } from "react"
import { JobingenLogo } from "@/components/jobingen-logo"

/* ─── Tools Data ───────────────────────────────────── */

const TOOLS = [
  {
    id: "resume-builder",
    title: "AI Resume Builder",
    tagline: "From JD to resume in seconds",
    desc: "Paste any job description and get a fully tailored, ATS-optimized resume. Our AI understands what recruiters and ATS systems look for — keywords, formatting, structure — and generates a resume that gets you past the screening round.",
    color: "#1d3a8f",
    bg: "#eef1fd",
    icon: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8",
    stat: { value: "92%", label: "Avg ATS Score" },
    features: [
      { title: "Smart JD Parsing", desc: "AI extracts key skills, qualifications, and keywords from any job description automatically." },
      { title: "ATS Optimization", desc: "Resume formatted and worded to pass Applicant Tracking Systems used by 95% of companies." },
      { title: "Multiple Templates", desc: "Choose from Classic LaTeX, Modern Pro, or Minimal — all recruiter-approved formats." },
      { title: "Export Anywhere", desc: "Download as PDF or DOCX. Share a live link or import directly to job portals." },
    ],
    howItWorks: [
      { step: "01", text: "Paste the job description you want to apply for" },
      { step: "02", text: "AI analyzes JD and maps it to your profile" },
      { step: "03", text: "Get a tailored resume with matched keywords" },
      { step: "04", text: "Review, edit if needed, and export" },
    ],
  },
  {
    id: "mock-interview",
    title: "AI Mock Interview",
    tagline: "Practice before the real thing",
    desc: "Our AI interviewer adapts to your target role — SDE, Data Science, Product, or HR rounds. Get real-time scoring on answer quality, communication clarity, and confidence. Walk into your interview already knowing what to expect.",
    color: "#0f766e",
    bg: "#ecfdf5",
    icon: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
    stat: { value: "5x", label: "Better Prepared" },
    features: [
      { title: "Role-Specific Questions", desc: "Behavioral, technical, system design, and HR — tailored to the exact role you are targeting." },
      { title: "Real-Time AI Feedback", desc: "Get scored on answer structure, depth, relevance, and communication after every response." },
      { title: "Confidence Analysis", desc: "AI evaluates your tone, clarity, and assertiveness — the things interviewers notice first." },
      { title: "Performance Report", desc: "Detailed breakdown with tips, weak areas, and recommended practice topics after each session." },
    ],
    howItWorks: [
      { step: "01", text: "Select interview type — Behavioral, Technical, or HR" },
      { step: "02", text: "AI asks role-specific questions one by one" },
      { step: "03", text: "Answer in text — get instant scoring and feedback" },
      { step: "04", text: "Review your full performance report with improvement tips" },
    ],
  },
  {
    id: "career-copilot",
    title: "AI Career Copilot",
    tagline: "Your 24/7 career advisor",
    desc: "Think of it as a senior mentor who is always available. Ask anything — skill gaps, career switches, what to learn next, salary benchmarks, which companies to target. Vibe gives you personalized, no-fluff career advice backed by real market data.",
    color: "#7c3aed",
    bg: "#f5f3ff",
    icon: "M12 2L2 7l10 5 10-5-10-5z M2 17l10 5 10-5 M2 12l10 5 10-5",
    stat: { value: "24/7", label: "Always On" },
    features: [
      { title: "Skill-Gap Analysis", desc: "AI compares your current skills against market demand and tells you exactly what to learn." },
      { title: "Career Roadmaps", desc: "Personalized 3-6-12 month plans based on your target role, experience, and current skills." },
      { title: "Salary Intelligence", desc: "Know what companies pay for your role — by location, experience, and company tier." },
      { title: "Smart Matching", desc: "Get matched to opportunities that fit your profile, not just keyword matches." },
    ],
    howItWorks: [
      { step: "01", text: "Tell Vibe your current role and career goals" },
      { step: "02", text: "AI analyzes your skills against market demand" },
      { step: "03", text: "Get a personalized roadmap with actionable steps" },
      { step: "04", text: "Track progress and get updated recommendations" },
    ],
  },
  {
    id: "auto-apply",
    title: "AI Auto Apply",
    tagline: "Apply to 100+ jobs while you sleep",
    desc: "Set your preferences once — role, location, salary, company size — and let our AI apply to matching jobs across all major portals automatically. Every application is personalized with a tailored cover letter and optimized resume.",
    color: "#dc2626",
    bg: "#fef2f2",
    icon: "M22 2L11 13 M22 2l-7 20-4-9-9-4 20-7z",
    stat: { value: "100+", label: "Jobs/Day" },
    features: [
      { title: "Multi-Portal Reach", desc: "Auto-applies across LinkedIn, Naukri, Instahyre, Wellfound, and more — all from one place." },
      { title: "Personalized Applications", desc: "Each application gets a tailored cover letter and resume matched to the job description." },
      { title: "Smart Filters", desc: "Set salary range, location, company size, role type — only applies to jobs that match your criteria." },
      { title: "Application Tracker", desc: "Track every application status in one dashboard — applied, viewed, shortlisted, rejected." },
    ],
    howItWorks: [
      { step: "01", text: "Set your job preferences and upload your base resume" },
      { step: "02", text: "AI scans portals and finds matching opportunities" },
      { step: "03", text: "Auto-applies with personalized resume + cover letter" },
      { step: "04", text: "Track all applications and responses in one place" },
    ],
  },
  {
    id: "salary-intel",
    title: "Salary Intelligence",
    tagline: "Know your worth before you negotiate",
    desc: "Real salary data from verified offers — not guesswork. Compare packages across roles, companies, locations, and experience levels. Walk into your negotiation knowing exactly what the market pays.",
    color: "#b45309",
    bg: "#fffbeb",
    icon: "M12 1v22 M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
    stat: { value: "500+", label: "Companies" },
    features: [
      { title: "Role-Based Data", desc: "Salary ranges for SDE, Data Science, PM, DevOps, and 20+ roles across experience levels." },
      { title: "Company Benchmarks", desc: "Compare what Zepto, CRED, Razorpay, Flipkart, Google, and others pay for the same role." },
      { title: "Location Insights", desc: "See how salaries differ across Bengaluru, Mumbai, Delhi, Hyderabad, and remote positions." },
      { title: "Negotiation Tips", desc: "AI-powered suggestions on how to negotiate based on your offer, competing offers, and market rate." },
    ],
    howItWorks: [
      { step: "01", text: "Select your target role and experience level" },
      { step: "02", text: "Compare salaries across companies and locations" },
      { step: "03", text: "See min, median, and max ranges with YoY trends" },
      { step: "04", text: "Get AI negotiation tips tailored to your situation" },
    ],
  },
  {
    id: "linkedin-optimizer",
    title: "LinkedIn Profile Optimizer",
    tagline: "Get found by recruiters",
    desc: "AI analyzes your LinkedIn profile and gives you specific, actionable improvements — headline, summary, experience bullets, skills ordering, and keyword density. Optimized profiles get 3x more recruiter views.",
    color: "#0369a1",
    bg: "#e0f2fe",
    icon: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
    stat: { value: "3x", label: "More Views" },
    features: [
      { title: "Headline Optimization", desc: "AI crafts a compelling headline that ranks for the right keywords and attracts recruiters." },
      { title: "Summary Rewrite", desc: "Transform your about section into a powerful personal pitch that tells your career story." },
      { title: "Experience Bullets", desc: "Rewrite work experience with impact-driven language that highlights results, not just tasks." },
      { title: "Keyword Density", desc: "Ensure your profile contains the right keywords that recruiters search for in your domain." },
    ],
    howItWorks: [
      { step: "01", text: "Paste your LinkedIn profile URL or export" },
      { step: "02", text: "AI scans every section and scores your profile" },
      { step: "03", text: "Get section-by-section rewrite suggestions" },
      { step: "04", text: "Apply changes and watch your views increase" },
    ],
  },
]

/* ─── Page ─────────────────────────────────────────── */

export default function AIToolsPage() {
  const [activeTool, setActiveTool] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-[#fafbff]" style={{ fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif" }}>
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-xl border-b border-slate-200/60">
        <div className="max-w-[1100px] mx-auto px-5 h-[60px] flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <JobingenLogo height={70} />
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/mentors" className="text-[13px] font-semibold text-slate-600 hover:text-slate-900 px-3 py-2 rounded-lg hover:bg-slate-50 transition-all hidden sm:block">
              Mentors
            </Link>
            <Link href="/jobs" className="text-[13px] font-semibold text-white px-5 py-2 rounded-xl shadow-sm" style={{ background: "linear-gradient(135deg, #1d3a8f, #3b5bdb)" }}>
              Browse Jobs
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #0f0a2e, #1e1b4b, #312e81)" }} />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #7c3aed 0%, transparent 50%), radial-gradient(circle at 80% 30%, #3b82f6 0%, transparent 50%)" }} />

        <div className="relative max-w-[1100px] mx-auto px-5 py-16 sm:py-20">
          <div className="max-w-[640px]">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5 mb-5">
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z M2 17l10 5 10-5 M2 12l10 5 10-5" /></svg>
              <span className="text-[11px] font-bold text-white/80 uppercase tracking-wider">AI-Powered Tools</span>
            </div>
            <h1 className="text-[clamp(28px,4.5vw,44px)] font-black text-white tracking-[-0.04em] leading-[1.1] mb-4">
              Your complete AI career toolkit.
            </h1>
            <p className="text-[15px] sm:text-[16px] text-white/50 leading-[1.7] max-w-[520px] mb-8">
              Six powerful AI tools that work together to get you hired faster. From resume building to salary negotiation — everything you need, in one place.
            </p>

            {/* Quick tool pills */}
            <div className="flex flex-wrap gap-2">
              {TOOLS.map(t => (
                <a
                  key={t.id}
                  href={`#${t.id}`}
                  className="text-[11px] sm:text-[12px] font-semibold px-3 py-1.5 rounded-lg border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all"
                >
                  {t.title}
                </a>
              ))}
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 max-w-[600px]">
            {[
              { val: "6", label: "AI Tools" },
              { val: "92%", label: "ATS Score" },
              { val: "24/7", label: "Available" },
              { val: "100+", label: "Jobs/Day" },
            ].map((s, i) => (
              <div key={i} className="text-center bg-white/5 backdrop-blur-sm rounded-xl border border-white/8 px-4 py-3">
                <div className="text-[22px] font-black text-white leading-none">{s.val}</div>
                <div className="text-[10px] font-semibold text-white/40 uppercase tracking-wider mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tools grid */}
      <div className="max-w-[1100px] mx-auto px-5 py-12 sm:py-16">
        <div className="grid grid-cols-1 gap-6">
          {TOOLS.map((tool, idx) => {
            const isOpen = activeTool === tool.id

            return (
              <div
                key={tool.id}
                id={tool.id}
                className="bg-white rounded-2xl border border-slate-200/60 overflow-hidden transition-all duration-200 hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
                style={{ scrollMarginTop: 80 }}
              >
                {/* Color accent */}
                <div className="h-1" style={{ background: `linear-gradient(90deg, ${tool.color}, ${tool.color}66)` }} />

                {/* Main card content */}
                <div className="p-5 sm:p-7">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-5">
                    {/* Icon + badge */}
                    <div className="flex items-center gap-4 sm:flex-col sm:items-start sm:gap-3 shrink-0">
                      <div
                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shadow-sm"
                        style={{ background: `linear-gradient(135deg, ${tool.color}, ${tool.color}cc)` }}
                      >
                        <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={tool.icon} /></svg>
                      </div>
                      <div className="sm:hidden">
                        <h2 className="text-[18px] font-extrabold text-slate-900 tracking-[-0.02em]">{tool.title}</h2>
                        <p className="text-[12px] font-semibold" style={{ color: tool.color }}>{tool.tagline}</p>
                      </div>
                      <div className="hidden sm:block text-center sm:text-left mt-1">
                        <div className="text-[20px] font-black leading-none" style={{ color: tool.color }}>{tool.stat.value}</div>
                        <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mt-1">{tool.stat.label}</div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="hidden sm:block">
                        <div className="flex items-center gap-3 mb-1">
                          <h2 className="text-[20px] sm:text-[22px] font-extrabold text-slate-900 tracking-[-0.02em]">{tool.title}</h2>
                          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full border" style={{ color: tool.color, background: tool.bg, borderColor: `${tool.color}20` }}>
                            Coming Soon
                          </span>
                        </div>
                        <p className="text-[13px] font-semibold mb-3" style={{ color: tool.color }}>{tool.tagline}</p>
                      </div>

                      <p className="text-[13px] text-slate-500 leading-[1.7] mb-4">{tool.desc}</p>

                      {/* Feature chips preview */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {tool.features.map(f => (
                          <span key={f.title} className="text-[11px] font-semibold px-2.5 py-1 rounded-lg border border-slate-200/80 bg-slate-50/50 text-slate-600">
                            {f.title}
                          </span>
                        ))}
                      </div>

                      {/* Expand/Collapse */}
                      <button
                        onClick={() => setActiveTool(isOpen ? null : tool.id)}
                        className="inline-flex items-center gap-1.5 text-[12px] font-bold transition-all cursor-pointer bg-transparent border-none p-0"
                        style={{ color: tool.color }}
                      >
                        {isOpen ? "Show less" : "See how it works"}
                        <svg
                          width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                          className="transition-transform duration-200"
                          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                        >
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </button>
                    </div>

                    {/* Stat badge — mobile */}
                    <div className="sm:hidden flex items-center gap-2">
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full border" style={{ color: tool.color, background: tool.bg, borderColor: `${tool.color}20` }}>
                        Coming Soon
                      </span>
                      <div className="text-right ml-auto">
                        <div className="text-[16px] font-black leading-none" style={{ color: tool.color }}>{tool.stat.value}</div>
                        <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{tool.stat.label}</div>
                      </div>
                    </div>
                  </div>

                  {/* Expanded content */}
                  {isOpen && (
                    <div className="mt-6 pt-6 border-t border-slate-100">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        {/* Features detail */}
                        <div>
                          <h3 className="text-[14px] font-extrabold text-slate-900 mb-4">Key Features</h3>
                          <div className="space-y-3.5">
                            {tool.features.map((f, i) => (
                              <div key={i} className="flex gap-3">
                                <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ background: tool.bg }}>
                                  <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke={tool.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                                </div>
                                <div>
                                  <div className="text-[13px] font-bold text-slate-800 mb-0.5">{f.title}</div>
                                  <div className="text-[12px] text-slate-500 leading-[1.6]">{f.desc}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* How it works */}
                        <div>
                          <h3 className="text-[14px] font-extrabold text-slate-900 mb-4">How It Works</h3>
                          <div className="space-y-4">
                            {tool.howItWorks.map((s, i) => (
                              <div key={i} className="flex gap-3.5 items-start">
                                <div
                                  className="w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-black text-white shrink-0"
                                  style={{ background: `linear-gradient(135deg, ${tool.color}, ${tool.color}cc)` }}
                                >
                                  {s.step}
                                </div>
                                <p className="text-[13px] text-slate-600 leading-[1.6] pt-0.5">{s.text}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-[1100px] mx-auto px-5 pb-16">
        <div className="text-center py-12 px-6 rounded-2xl" style={{ background: "linear-gradient(135deg, #1e1b4b, #312e81)" }}>
          <h3 className="text-[22px] sm:text-[26px] font-black text-white tracking-[-0.03em] mb-3">
            All tools. One platform. Zero confusion.
          </h3>
          <p className="text-[14px] text-white/50 mb-8 max-w-[460px] mx-auto leading-[1.7]">
            We&rsquo;re building the most complete AI-powered career toolkit for India&rsquo;s job market. Join the waitlist to get early access.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/register" className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-[14px] font-bold text-[#1e1b4b] bg-white shadow-lg hover:shadow-xl transition-all" style={{ textDecoration: "none" }}>
              Join Waitlist
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
            <Link href="/" className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-[14px] font-semibold text-white/70 border border-white/15 hover:bg-white/5 transition-all" style={{ textDecoration: "none" }}>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
