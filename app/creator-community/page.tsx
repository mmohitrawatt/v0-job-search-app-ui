"use client"

import { useState, useRef, useEffect } from "react"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import { StepIndicator } from "@/components/creator-community/StepIndicator"
import { BasicInfoStep } from "@/components/creator-community/BasicInfoStep"
import { CollaborationStep } from "@/components/creator-community/CollaborationStep"
import { ReviewSubmit } from "@/components/creator-community/ReviewSubmit"
import { INITIAL_FORM_DATA, STEPS } from "@/components/creator-community/types"
import type { FormData } from "@/components/creator-community/types"

function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("cc-vis"); obs.unobserve(el) } },
      { threshold: 0.07 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useReveal()
  return <div ref={ref} className="cc-reveal" style={{ transitionDelay: `${delay}ms` }}>{children}</div>
}

const BENEFITS = [
  { icon: "🔄", title: "Barter Collaboration", desc: "Get Jobingen premium access, bootcamp seats, mentorship sessions, and platform perks in exchange for your content.", color: "#1d3a8f", bg: "#eef2ff" },
  { icon: "🚀", title: "Build Your Personal Brand", desc: "Get co-branded posts, a verified Creator badge, and featured placement across Jobingen's channels.", color: "#0369a1", bg: "#e0f2fe" },
  { icon: "⚡", title: "Work With a Fast-Growing Startup", desc: "Real startup experience, a portfolio-worthy collaboration, and direct access to the Jobingen founding team.", color: "#0f766e", bg: "#f0fdf4" },
  { icon: "🎯", title: "Early Access to Opportunities", desc: "Creators get first access to job listings, bootcamp launches, and platform events before they go public.", color: "#b45309", bg: "#fffbeb" },
  { icon: "🤝", title: "Join a Real Creator Network", desc: "Be part of a private community of career content creators. Collaborate, grow, and learn together.", color: "#7c3aed", bg: "#f5f3ff" },
]

function validateStep(step: number, data: FormData): Partial<Record<keyof FormData, string>> {
  const e: Partial<Record<keyof FormData, string>> = {}
  if (step === 1) {
    if (!data.fullName.trim()) e.fullName = "Full name is required"
    if (!data.email.trim()) e.email = "Email is required"
    else if (!/^\S+@\S+\.\S+$/.test(data.email)) e.email = "Enter a valid email"
    if (!data.phone.trim()) e.phone = "Phone number is required"
    if (!data.city.trim()) e.city = "City is required"
    if (!data.instagram.trim()) e.instagram = "Instagram username is required"
    if (!data.followerCount) e.followerCount = "Please select your follower count"
  } else if (step === 2) {
    if (!data.contentTypes.length) e.contentTypes = "Select at least one content type"
    if (!data.collaborationModel) e.collaborationModel = "Select a collaboration model"
    if (!data.postsPerWeek) e.postsPerWeek = "Select your weekly availability"
  }
  return e
}

export default function CreatorCommunityPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA)
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [loading, setLoading] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const formRef = useRef<HTMLDivElement>(null)

  const updateField = (key: keyof FormData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [key]: value }))
    if (errors[key]) setErrors(prev => ({ ...prev, [key]: undefined }))
  }
  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  const handleNext = () => {
    const errs = validateStep(step, formData)
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({}); setStep(s => s + 1); setTimeout(scrollToForm, 80)
  }
  const handleBack = () => { setErrors({}); setStep(s => s - 1); setTimeout(scrollToForm, 80) }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setSubmitError("")
    try {
      const res = await fetch("/api/creator-community", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Submission failed")
      setSubmitted(true); window.scrollTo({ top: 0, behavior: "smooth" })
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong. Please try again.")
    } finally { setLoading(false) }
  }

  return (
    <>
      <style>{`
        /* BASE */
        .cc * { box-sizing:border-box; margin:0; padding:0; }
        .cc { font-family:-apple-system,BlinkMacSystemFont,'Inter','Segoe UI',sans-serif; -webkit-font-smoothing:antialiased; color:#0f172a; overflow-x:hidden; }

        /* ANIMATIONS */
        @keyframes cc-fade-up  { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:none} }
        @keyframes cc-pulse    { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.3;transform:scale(.6)} }
        @keyframes cc-spin     { to{transform:rotate(360deg)} }
        @keyframes cc-slide-in { from{opacity:0;transform:translateX(16px)} to{opacity:1;transform:none} }
        @keyframes cc-marquee  { from{transform:translateX(0)} to{transform:translateX(-50%)} }

        .cc-reveal { opacity:0; transform:translateY(20px); transition:opacity .65s cubic-bezier(.16,1,.3,1), transform .65s cubic-bezier(.16,1,.3,1); }
        .cc-vis    { opacity:1 !important; transform:none !important; }

        /* ══════════════════════════════════════
           HERO — LIGHT (Jobingen style)
        ══════════════════════════════════════ */
        .cc-hero {
          position:relative; overflow:hidden; text-align:center;
          background:linear-gradient(180deg, #f0f4ff 0%, #e8edff 60%, #f8faff 100%);
          padding:164px 24px 96px;
        }
        .cc-hero-blob1 { position:absolute; top:-8%;  right:4%;  width:460px; height:460px; border-radius:50%; background:radial-gradient(circle,rgba(29,58,143,.07) 0%,transparent 70%); pointer-events:none; }
        .cc-hero-blob2 { position:absolute; bottom:-6%; left:2%; width:340px; height:340px; border-radius:50%; background:radial-gradient(circle,rgba(59,91,219,.05) 0%,transparent 70%); pointer-events:none; }

        .cc-hero-badge {
          display:inline-flex; align-items:center; gap:7px;
          padding:6px 18px; background:#fff; border:1.5px solid #dde5ff;
          border-radius:99px; margin-bottom:28px;
          box-shadow:0 2px 12px rgba(29,58,143,.08);
          animation:cc-fade-up .6s cubic-bezier(.16,1,.3,1) both;
        }
        .cc-hero-dot { width:7px; height:7px; background:#16a34a; border-radius:50%; box-shadow:0 0 6px rgba(22,163,74,.5); animation:cc-pulse 2s infinite; flex-shrink:0; }
        .cc-hero-badge-text { font-size:11px; font-weight:800; color:#1d3a8f; letter-spacing:.07em; text-transform:uppercase; }

        .cc-hero-h1 {
          font-size:clamp(36px,5.5vw,64px); font-weight:900; color:#0f172a;
          letter-spacing:-0.04em; line-height:1.06; margin-bottom:20px;
          animation:cc-fade-up .7s cubic-bezier(.16,1,.3,1) .06s both;
        }
        .cc-hero-grad {
          background:linear-gradient(135deg,#1d3a8f,#3b5bdb);
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
        }
        .cc-hero-sub {
          font-size:17px; color:#475569; line-height:1.75; max-width:560px; margin:0 auto 14px;
          animation:cc-fade-up .8s cubic-bezier(.16,1,.3,1) .12s both;
        }
        .cc-hero-highlight {
          display:inline-flex; align-items:center; gap:7px;
          font-size:13px; font-weight:700; color:#1d3a8f;
          background:#eef2ff; border:1px solid #dde5ff; border-radius:8px;
          padding:6px 14px; margin-bottom:38px;
          animation:cc-fade-up .85s cubic-bezier(.16,1,.3,1) .16s both;
        }
        .cc-hero-actions {
          display:flex; align-items:center; justify-content:center; gap:12px; flex-wrap:wrap;
          animation:cc-fade-up .9s cubic-bezier(.16,1,.3,1) .2s both;
        }
        .cc-btn-primary {
          display:inline-flex; align-items:center; gap:9px; border:none; cursor:pointer; font-family:inherit;
          background:linear-gradient(135deg,#1d3a8f,#3b5bdb);
          color:#fff; padding:14px 32px; border-radius:12px;
          font-size:15px; font-weight:700;
          box-shadow:0 4px 20px rgba(29,58,143,.28);
          transition:all .25s cubic-bezier(.16,1,.3,1);
        }
        .cc-btn-primary:hover { transform:translateY(-2px); box-shadow:0 8px 28px rgba(29,58,143,.38); }
        .cc-btn-secondary {
          display:inline-flex; align-items:center; gap:7px; font-family:inherit;
          background:#fff; color:#1d3a8f; padding:14px 28px; border-radius:12px;
          font-size:14px; font-weight:700; text-decoration:none;
          border:1.5px solid #dde5ff; box-shadow:0 2px 8px rgba(29,58,143,.06);
          transition:all .25s;
        }
        .cc-btn-secondary:hover { border-color:#1d3a8f; background:#f0f4ff; }


        /* ══════════════════════════════════════
           TICKER
        ══════════════════════════════════════ */
        .cc-ticker { background:#fff; border-top:1px solid #f1f5f9; border-bottom:1px solid #f1f5f9; padding:13px 0; overflow:hidden; }
        .cc-ticker-track { display:flex; width:max-content; animation:cc-marquee 28s linear infinite; }
        .cc-ticker-item { display:inline-flex; align-items:center; gap:8px; padding:0 28px; font-size:12px; font-weight:700; color:#334155; white-space:nowrap; }
        .cc-ticker-dot  { width:4px; height:4px; border-radius:50%; background:#dde5ff; flex-shrink:0; }

        /* ══════════════════════════════════════
           WHO CAN JOIN
        ══════════════════════════════════════ */
        .cc-who { padding:88px 24px; background:linear-gradient(180deg,#f0f4ff 0%,#e8edff 100%); }
        .cc-who-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:16px; margin-top:48px; }
        @media(max-width:640px){ .cc-who-grid{ grid-template-columns:1fr; } }
        .cc-who-card {
          background:#fff; border-radius:18px; border:1.5px solid #e0e7ff;
          padding:24px 24px 22px; display:flex; align-items:flex-start; gap:14px;
          box-shadow:0 2px 12px rgba(29,58,143,.06);
          transition:box-shadow .2s, transform .2s;
        }
        .cc-who-card:hover { box-shadow:0 8px 24px rgba(29,58,143,.1); transform:translateY(-2px); }
        .cc-who-card-icon { font-size:24px; width:44px; height:44px; border-radius:12px; background:#eef2ff; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
        .cc-who-card-title { font-size:15px; font-weight:800; color:#0f172a; margin-bottom:6px; letter-spacing:-0.02em; }
        .cc-who-card-desc  { font-size:13px; color:#64748b; line-height:1.65; }

        /* ══════════════════════════════════════
           WHY JOIN
        ══════════════════════════════════════ */
        .cc-why    { padding:88px 24px; background:#fafafa; }
        .cc-inner  { max-width:1100px; margin:0 auto; }

        .cc-eyebrow {
          display:inline-flex; align-items:center; gap:8px; margin-bottom:14px;
          font-size:11px; font-weight:800; color:#1d3a8f; letter-spacing:.08em; text-transform:uppercase;
        }
        .cc-eyebrow-line { display:inline-block; width:20px; height:2px; background:#1d3a8f; border-radius:2px; }
        .cc-sec-title { font-size:clamp(26px,3.5vw,42px); font-weight:900; color:#0f172a; letter-spacing:-0.035em; line-height:1.1; margin-bottom:12px; }
        .cc-sec-sub   { font-size:16px; color:#64748b; line-height:1.75; max-width:520px; }

        .cc-benefits-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:18px; margin-top:52px; }
        @media(max-width:900px){ .cc-benefits-grid{ grid-template-columns:repeat(2,1fr) } }
        @media(max-width:560px){ .cc-benefits-grid{ grid-template-columns:1fr } }

        .cc-benefit-card {
          background:#fff; border-radius:20px; border:1.5px solid #eaecf4;
          padding:28px 26px 24px;
          box-shadow:0 2px 12px rgba(0,0,0,.04);
          transition:box-shadow .2s, transform .2s, border-color .2s;
        }
        .cc-benefit-card:hover { box-shadow:0 8px 28px rgba(29,58,143,.1); transform:translateY(-3px); border-color:#dde5ff; }
        .cc-benefit-icon { font-size:28px; width:52px; height:52px; border-radius:14px; display:flex; align-items:center; justify-content:center; margin-bottom:18px; }
        .cc-benefit-title { font-size:16px; font-weight:800; color:#0f172a; margin-bottom:8px; letter-spacing:-0.02em; }
        .cc-benefit-desc  { font-size:13.5px; color:#64748b; line-height:1.7; }

        /* ══════════════════════════════════════
           HOW IT WORKS
        ══════════════════════════════════════ */
        .cc-how { padding:88px 24px; background:#fff; }
        .cc-how-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:32px; margin-top:52px; }
        @media(max-width:700px){ .cc-how-grid{ grid-template-columns:1fr; gap:20px; } }

        .cc-how-step { display:flex; flex-direction:column; align-items:flex-start; }
        .cc-how-num {
          width:40px; height:40px; border-radius:12px;
          background:linear-gradient(135deg,#eef2ff,#e0e7ff);
          border:1.5px solid #dde5ff;
          display:flex; align-items:center; justify-content:center;
          font-size:15px; font-weight:900; color:#1d3a8f; margin-bottom:16px;
        }
        .cc-how-title { font-size:16px; font-weight:800; color:#0f172a; margin-bottom:8px; letter-spacing:-0.02em; }
        .cc-how-desc  { font-size:13.5px; color:#64748b; line-height:1.7; }

        /* connector line between steps (desktop) */
        .cc-how-grid { position:relative; }
        @media(min-width:700px){
          .cc-how-step { position:relative; }
          .cc-how-step:not(:last-child)::after {
            content:''; position:absolute; top:20px; left:calc(100% + 6px); width:calc(100% - 40px);
            height:1.5px; background:linear-gradient(90deg,#dde5ff,transparent);
          }
        }

        /* ══════════════════════════════════════
           FORM SECTION
        ══════════════════════════════════════ */
        .cc-form-section { padding:88px 24px 108px; background:#f0f4f8; }
        .cc-form-wrap    { max-width:680px; margin:0 auto; }
        .cc-form-header  { text-align:center; margin-bottom:48px; }
        .cc-form-header-title { font-size:clamp(26px,3vw,38px); font-weight:900; color:#0f172a; letter-spacing:-0.04em; margin-bottom:10px; }
        .cc-form-header-sub   { font-size:15px; color:#64748b; line-height:1.7; max-width:400px; margin:0 auto; }

        .cc-form-card {
          background:#fff; border-radius:24px;
          border:1.5px solid #e2e8f0;
          box-shadow:0 4px 6px rgba(0,0,0,.04), 0 16px 48px rgba(29,58,143,.07);
          overflow:hidden;
        }
        .cc-card-top { height:4px; background:linear-gradient(90deg,#1d3a8f,#3b5bdb,#6366f1); }
        .cc-form-body { padding:40px 40px 32px; }
        @media(max-width:560px){ .cc-form-body{ padding:28px 22px 24px; } }

        /* STEP INDICATOR */
        .cc-step-ind { margin-bottom:36px; }
        .cc-step-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:10px; }
        .cc-step-badge {
          font-size:11px; font-weight:800; color:#1d3a8f; letter-spacing:.07em; text-transform:uppercase;
          background:#eef2ff; border:1px solid #dde5ff; padding:4px 12px; border-radius:99px;
        }
        .cc-step-name { font-size:13px; font-weight:600; color:#64748b; }

        .cc-progress-track { height:4px; background:#f1f5f9; border-radius:99px; overflow:hidden; margin-bottom:20px; }
        .cc-progress-fill  { height:100%; background:linear-gradient(90deg,#1d3a8f,#3b5bdb); border-radius:99px; transition:width .45s cubic-bezier(.16,1,.3,1); }

        .cc-step-dots  { display:flex; align-items:flex-start; justify-content:space-between; }
        .cc-dot-wrap   { display:flex; flex-direction:column; align-items:center; gap:6px; flex:1; }
        .cc-dot {
          width:30px; height:30px; border-radius:50%; flex-shrink:0;
          display:flex; align-items:center; justify-content:center;
          font-size:11px; font-weight:800; transition:all .3s cubic-bezier(.16,1,.3,1);
          background:#f1f5f9; color:#94a3b8; border:2px solid #f1f5f9;
        }
        .cc-dot-wrap.done .cc-dot { background:linear-gradient(135deg,#1d3a8f,#3b5bdb); color:#fff; border-color:transparent; }
        .cc-dot-wrap.curr .cc-dot { background:#fff; color:#1d3a8f; border-color:#1d3a8f; box-shadow:0 0 0 4px rgba(29,58,143,.12); }
        .cc-dot-label  { font-size:10px; font-weight:600; color:#cbd5e1; white-space:nowrap; text-align:center; }
        .cc-dot-wrap.done .cc-dot-label { color:#94a3b8; }
        .cc-dot-wrap.curr .cc-dot-label { color:#1d3a8f; font-weight:800; }

        /* STEP BODY */
        .cc-step-body  { animation:cc-slide-in .3s cubic-bezier(.16,1,.3,1) both; }
        .cc-step-top   { margin-bottom:28px; }
        .cc-step-icon  {
          width:44px; height:44px; border-radius:12px; background:#eef2ff;
          display:flex; align-items:center; justify-content:center;
          margin-bottom:16px; box-shadow:0 2px 8px rgba(29,58,143,.1);
        }
        .cc-step-title { font-size:21px; font-weight:900; color:#0f172a; letter-spacing:-0.03em; margin-bottom:7px; }
        .cc-step-desc  { font-size:14px; color:#64748b; line-height:1.65; }

        /* FIELDS */
        .cc-fields  { display:flex; flex-direction:column; gap:20px; }
        .cc-fields-row { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
        @media(max-width:480px){ .cc-fields-row{ grid-template-columns:1fr; } }
        .cc-field   { display:flex; flex-direction:column; gap:6px; }
        .cc-label   { font-size:13px; font-weight:700; color:#374151; display:flex; align-items:center; gap:6px; }
        .cc-req     { color:#1d3a8f; }
        .cc-optional{ font-size:11px; font-weight:600; color:#9ca3af; }
        .cc-field-hint { font-size:12px; color:#94a3b8; line-height:1.55; }
        .cc-char-hint  { font-size:11px; color:#94a3b8; margin-top:4px; }
        .cc-error   { font-size:12px; font-weight:600; color:#dc2626; }

        .cc-input {
          width:100%; height:48px; padding:0 16px;
          border:1.5px solid #e5e7eb; border-radius:11px;
          font-size:14.5px; color:#0f172a; background:#fafafa;
          outline:none; transition:all .2s; font-family:inherit;
        }
        .cc-input:focus { border-color:#1d3a8f; background:#fff; box-shadow:0 0 0 3px rgba(29,58,143,.09); }
        .cc-input::placeholder { color:#94a3b8; }
        .cc-input-error { border-color:#dc2626 !important; }

        .cc-textarea {
          width:100%; padding:13px 16px;
          border:1.5px solid #e5e7eb; border-radius:11px;
          font-size:14.5px; color:#0f172a; background:#fafafa;
          outline:none; transition:all .2s; resize:vertical; font-family:inherit; line-height:1.65;
        }
        .cc-textarea:focus { border-color:#1d3a8f; background:#fff; box-shadow:0 0 0 3px rgba(29,58,143,.09); }
        .cc-textarea::placeholder { color:#94a3b8; }
        .cc-textarea-sm { min-height:80px; }
        .cc-textarea-lg { min-height:140px; }

        .cc-input-prefix-wrap {
          display:flex; align-items:stretch;
          border:1.5px solid #e5e7eb; border-radius:11px; overflow:hidden; background:#fafafa; transition:all .2s;
        }
        .cc-input-prefix-wrap:focus-within { border-color:#1d3a8f; background:#fff; box-shadow:0 0 0 3px rgba(29,58,143,.09); }
        .cc-input-prefix { display:flex; align-items:center; padding:0 13px; font-size:13px; font-weight:600; color:#9ca3af; background:#f4f6f8; border-right:1.5px solid #e5e7eb; white-space:nowrap; }
        .cc-input-prefixed { border:none !important; border-radius:0 !important; background:transparent !important; box-shadow:none !important; flex:1; height:48px; }

        /* CHIPS */
        .cc-radio-row  { display:flex; flex-wrap:wrap; gap:9px; }
        .cc-radio-chip {
          display:inline-flex; align-items:center; padding:8px 18px; border-radius:99px;
          border:1.5px solid #e5e7eb; background:#fff;
          font-size:13px; font-weight:600; color:#475569; cursor:pointer; transition:all .18s; user-select:none;
        }
        .cc-radio-chip:hover    { border-color:#93c5fd; color:#1d3a8f; background:#eef2ff; }
        .cc-radio-chip.selected { border-color:#1d3a8f; background:#eef2ff; color:#1d3a8f; box-shadow:0 0 0 3px rgba(29,58,143,.1); font-weight:800; }

        .cc-chip-grid { display:flex; flex-wrap:wrap; gap:9px; margin-top:4px; }
        .cc-chip {
          display:inline-flex; align-items:center; padding:10px 18px; border-radius:11px;
          border:1.5px solid #e5e7eb; background:#fff;
          font-size:13.5px; font-weight:600; color:#475569; cursor:pointer; transition:all .18s; user-select:none;
        }
        .cc-chip:hover    { border-color:#93c5fd; color:#1d3a8f; background:#eef2ff; }
        .cc-chip.selected { border-color:#1d3a8f; background:#eef2ff; color:#1d3a8f; box-shadow:0 0 0 3px rgba(29,58,143,.1); font-weight:800; }

        /* IDEA CALLOUT */
        .cc-idea-callout {
          display:flex; gap:12px; padding:16px 18px; margin-bottom:22px;
          background:linear-gradient(135deg,#eef2ff,#e0e7ff);
          border:1.5px solid #c7d2fe; border-radius:14px;
        }
        .cc-idea-callout-icon  { font-size:18px; flex-shrink:0; margin-top:1px; }
        .cc-idea-callout-title { font-size:13px; font-weight:800; color:#1e3a8a; margin-bottom:4px; }
        .cc-idea-callout-body  { font-size:12.5px; color:#3b5bdb; line-height:1.65; }

        /* COLLAB CARDS */
        .cc-collab-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:11px; }
        @media(max-width:480px){ .cc-collab-grid{ grid-template-columns:1fr } }
        .cc-collab-card {
          padding:18px; border-radius:14px; border:1.5px solid #e5e7eb;
          background:#fff; text-align:left; cursor:pointer; transition:all .18s;
        }
        .cc-collab-card:hover    { border-color:#93c5fd; background:#f8faff; }
        .cc-collab-card.selected { border-color:#1d3a8f; background:#eef2ff; box-shadow:0 0 0 3px rgba(29,58,143,.1); }
        .cc-collab-card-top  { display:flex; align-items:center; justify-content:space-between; margin-bottom:9px; }
        .cc-collab-icon  { font-size:22px; }
        .cc-collab-check { width:20px; height:20px; border-radius:50%; background:linear-gradient(135deg,#1d3a8f,#3b5bdb); display:flex; align-items:center; justify-content:center; }
        .cc-collab-title { font-size:14px; font-weight:800; color:#0f172a; margin-bottom:3px; letter-spacing:-0.01em; }
        .cc-collab-desc  { font-size:12px; color:#64748b; line-height:1.5; }

        /* REVIEW */
        .cc-review-card { border:1.5px solid #e0e7ff; border-radius:16px; overflow:hidden; margin-bottom:20px; }
        .cc-review-section { border-bottom:1px solid #f1f5f9; }
        .cc-review-section:last-child { border-bottom:none; }
        .cc-review-section-title { font-size:10px; font-weight:800; color:#1d3a8f; letter-spacing:.09em; text-transform:uppercase; padding:12px 18px 9px; background:#f0f4ff; border-bottom:1px solid #e0e7ff; }
        .cc-review-rows { display:flex; flex-direction:column; }
        .cc-review-row { display:flex; gap:14px; padding:10px 18px; border-bottom:1px solid #f8fafc; align-items:flex-start; }
        .cc-review-row:last-child { border-bottom:none; }
        .cc-review-key { font-size:11px; font-weight:700; color:#94a3b8; min-width:96px; flex-shrink:0; text-transform:uppercase; letter-spacing:.04em; padding-top:2px; }
        .cc-review-val { font-size:13px; color:#0f172a; line-height:1.6; word-break:break-word; }
        .cc-review-empty { color:#cbd5e1; font-style:italic; }

        /* SUBMIT */
        .cc-submit-note {
          display:flex; align-items:center; gap:8px;
          font-size:12.5px; color:#64748b; margin-bottom:18px; padding:12px 16px;
          background:#f8fafc; border-radius:11px; border:1px solid #e2e8f0;
        }
        .cc-submit-error {
          display:flex; align-items:center; gap:8px;
          font-size:13px; color:#dc2626; padding:11px 14px; margin-bottom:12px;
          background:#fef2f2; border:1px solid #fecaca; border-radius:10px;
        }
        .cc-submit-btn {
          width:100%; height:52px; border-radius:12px; border:none; cursor:pointer;
          background:linear-gradient(135deg,#1d3a8f,#3b5bdb);
          color:#fff; font-size:15px; font-weight:800; font-family:inherit;
          display:flex; align-items:center; justify-content:center; gap:9px;
          box-shadow:0 4px 20px rgba(29,58,143,.28); transition:all .25s cubic-bezier(.16,1,.3,1);
        }
        .cc-submit-btn:hover:not(:disabled) { transform:translateY(-2px); box-shadow:0 8px 28px rgba(29,58,143,.38); }
        .cc-submit-btn:disabled { opacity:.7; cursor:not-allowed; }
        .cc-spinner { width:17px; height:17px; border:2.5px solid rgba(255,255,255,.3); border-top-color:#fff; border-radius:50%; animation:cc-spin .8s linear infinite; }

        /* STEP NAV */
        .cc-step-nav { display:flex; align-items:center; justify-content:space-between; margin-top:28px; gap:10px; }
        .cc-nav-back {
          display:inline-flex; align-items:center; gap:7px;
          height:44px; padding:0 20px; border-radius:11px; border:1.5px solid #e5e7eb;
          background:#fff; color:#475569; font-size:13.5px; font-weight:700; cursor:pointer; font-family:inherit; transition:all .2s;
        }
        .cc-nav-back:hover { border-color:#93c5fd; color:#1d3a8f; background:#eef2ff; }
        .cc-nav-next {
          display:inline-flex; align-items:center; gap:7px;
          height:44px; padding:0 26px; border-radius:11px; border:none;
          background:linear-gradient(135deg,#1d3a8f,#3b5bdb);
          color:#fff; font-size:14px; font-weight:800; font-family:inherit;
          cursor:pointer; transition:all .25s cubic-bezier(.16,1,.3,1);
          box-shadow:0 4px 14px rgba(29,58,143,.28); margin-left:auto;
        }
        .cc-nav-next:hover { transform:translateY(-2px); box-shadow:0 7px 20px rgba(29,58,143,.38); }

        /* TRUST ROW */
        .cc-trust { display:flex; align-items:center; justify-content:center; gap:24px; flex-wrap:wrap; margin-top:22px; }
        .cc-trust-item { display:inline-flex; align-items:center; gap:6px; font-size:12.5px; font-weight:600; color:#94a3b8; }

        /* SOCIAL ICON DOTS */
        .cc-social-icon { display:inline-block; width:14px; height:14px; border-radius:3px; flex-shrink:0; }
        .cc-ig { background:linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888); }
        .cc-li { background:#0077b5; }
        .cc-yt { background:#ff0000; }

        /* ══════════════════════════════════════
           SUCCESS STATE
        ══════════════════════════════════════ */
        .cc-success {
          min-height:100vh; display:flex; flex-direction:column; align-items:center;
          justify-content:center; padding:128px 24px 80px; text-align:center;
          background:linear-gradient(180deg,#f0f4ff 0%,#e8edff 60%,#f8faff 100%);
        }
        .cc-success-icon {
          width:72px; height:72px; border-radius:50%;
          background:linear-gradient(135deg,#1d3a8f,#3b5bdb);
          display:flex; align-items:center; justify-content:center; margin:0 auto 24px;
          box-shadow:0 8px 32px rgba(29,58,143,.28);
          animation:cc-fade-up .5s cubic-bezier(.16,1,.3,1) both;
        }
        .cc-success-h2 {
          font-size:clamp(26px,4vw,42px); font-weight:900; color:#0f172a;
          letter-spacing:-0.04em; margin-bottom:14px;
          animation:cc-fade-up .6s cubic-bezier(.16,1,.3,1) .08s both;
        }
        .cc-success-p {
          font-size:16px; color:#475569; line-height:1.75; max-width:460px; margin:0 auto 36px;
          animation:cc-fade-up .7s cubic-bezier(.16,1,.3,1) .14s both;
        }
        .cc-success-card {
          background:#fff; border:1.5px solid #e0e7ff; border-radius:20px;
          padding:28px 32px; max-width:400px; margin:0 auto;
          box-shadow:0 4px 24px rgba(29,58,143,.1);
          animation:cc-fade-up .8s cubic-bezier(.16,1,.3,1) .2s both;
        }
        .cc-success-label { font-size:11px; font-weight:800; color:#1d3a8f; letter-spacing:.08em; text-transform:uppercase; margin-bottom:18px; }
        .cc-success-steps { display:flex; flex-direction:column; gap:13px; text-align:left; }
        .cc-success-step  { display:flex; align-items:center; gap:12px; font-size:14px; color:#475569; font-weight:500; line-height:1.4; }
        .cc-success-num   {
          width:26px; height:26px; border-radius:50%; flex-shrink:0;
          background:linear-gradient(135deg,#1d3a8f,#3b5bdb); color:#fff;
          font-size:11px; font-weight:800; display:flex; align-items:center; justify-content:center;
        }

        /* ══════════════════════════════════════
           MOBILE RESPONSIVE
        ══════════════════════════════════════ */
        @media(max-width:768px){
          .cc-hero { padding:104px 20px 72px; }
          .cc-who, .cc-why, .cc-how { padding:64px 20px; }
          .cc-form-section { padding:64px 20px 80px; }
          .cc-sec-sub { font-size:15px; }
          .cc-benefit-card { padding:24px 20px 20px; }
          .cc-how-grid { gap:24px; }
          .cc-form-header { margin-bottom:36px; }
        }

        @media(max-width:480px){
          .cc-hero { padding:110px 16px 60px; }
          .cc-hero-h1 { letter-spacing:-0.03em; }
          .cc-hero-sub { font-size:15px; }
          .cc-hero-badge-text { font-size:10px; letter-spacing:.04em; }
          .cc-hero-highlight { font-size:12px; padding:5px 12px; }
          .cc-hero-actions { flex-direction:column; align-items:stretch; gap:10px; }
          .cc-btn-primary, .cc-btn-secondary { width:100%; justify-content:center; }

          .cc-who, .cc-why, .cc-how { padding:52px 16px; }
          .cc-form-section { padding:52px 16px 68px; }

          .cc-form-card { border-radius:16px; }
          .cc-form-body { padding:24px 16px 20px; }
          .cc-form-header-sub { font-size:13.5px; }

          .cc-step-count { font-size:12px; }
          .cc-step-name { font-size:11px; }
          .cc-dot { width:26px; height:26px; font-size:10px; }
          .cc-dot-wrap { gap:4px; }
          .cc-dot-label { display:none; }

          .cc-step-title { font-size:18px; }
          .cc-step-desc { font-size:13px; }

          .cc-who-card { padding:16px 14px; gap:12px; }
          .cc-who-card-icon { width:38px; height:38px; font-size:20px; }
          .cc-benefit-card { padding:20px 16px 16px; }
          .cc-benefit-icon { width:44px; height:44px; font-size:24px; margin-bottom:14px; }

          .cc-nav-back { padding:0 14px; font-size:13px; height:42px; }
          .cc-nav-next { padding:0 18px; font-size:13px; height:42px; }

          .cc-review-key { min-width:76px; font-size:10px; }
          .cc-review-val { font-size:12.5px; }

          .cc-success { padding:100px 20px 64px; }
          .cc-success-card { padding:22px 20px; }
        }

        @media(max-width:360px){
          .cc-hero { padding:106px 14px 56px; }
          .cc-hero-badge { padding:5px 12px; gap:5px; }
          .cc-hero-badge-text { font-size:9px; }
          .cc-step-dots { gap:0; }
          .cc-dot { width:22px; height:22px; font-size:9px; }
          .cc-nav-back { padding:0 10px; font-size:12px; }
          .cc-nav-next { padding:0 14px; font-size:12px; }
        }
      `}</style>

      <Navbar />

      <div className="cc">

        {/* SUCCESS STATE */}
        {submitted ? (
          <section className="cc-success">
            <div className="cc-success-icon">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                <path d="M5 12l5 5L20 7" stroke="white" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 className="cc-success-h2">Application Submitted!</h2>
            <p className="cc-success-p">
              You&apos;re one step closer to joining the Jobingen Creator Community.
              Our team will review your profile and reach out soon.
            </p>
            <div className="cc-success-card">
              <p className="cc-success-label">What happens next</p>
              <div className="cc-success-steps">
                {[
                  "Our team reviews your profile within 5–7 business days",
                  "Shortlisted creators receive a personal onboarding call",
                  "You receive your first content brief and get started",
                ].map((txt, i) => (
                  <div key={i} className="cc-success-step">
                    <div className="cc-success-num">{i + 1}</div>
                    {txt}
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : (
          <>
            {/* ══════════════════════════════════════
                HERO
            ══════════════════════════════════════ */}
            <section className="cc-hero">
              <div className="cc-hero-blob1" />
              <div className="cc-hero-blob2" />

              <div className="cc-hero-badge">
                <span className="cc-hero-dot" />
                <span className="cc-hero-badge-text">Now accepting applications — Limited spots</span>
              </div>

              <h1 className="cc-hero-h1">
                Join the Jobingen<br />
                <span className="cc-hero-grad">Creator Community</span>
              </h1>

              <p className="cc-hero-sub">
                Collaborate with Jobingen, create impactful career content, and help
                thousands of students and job seekers find their path.
              </p>

              <div style={{ display:"flex", justifyContent:"center", marginBottom:38 }}>
                <span className="cc-hero-highlight">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="#1d3a8f" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Work with a fast-growing career platform
                </span>
              </div>

              <div className="cc-hero-actions">
                <button className="cc-btn-primary" onClick={scrollToForm}>
                  Apply Now
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <a href="#why-join" className="cc-btn-secondary">
                  Learn More
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M12 5v14M5 12l7 7 7-7" stroke="#1d3a8f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>

            </section>

            {/* TICKER */}
            {(() => {
              const items = ["🎬 Reels & Short Videos", "🎯 Career Guidance", "💻 Coding & Tech Content", "📋 Placement Preparation", "🔥 Motivational Content", "📈 LinkedIn Growth", "🏫 Campus Life", "🤖 AI & Emerging Tech"]
              const doubled = [...items, ...items]
              return (
                <div className="cc-ticker">
                  <div className="cc-ticker-track">
                    {doubled.map((item, i) => (
                      <span key={i} className="cc-ticker-item">
                        {item}
                        <span className="cc-ticker-dot" />
                      </span>
                    ))}
                  </div>
                </div>
              )
            })()}

            {/* ══════════════════════════════════════
                WHO CAN JOIN
            ══════════════════════════════════════ */}
            <section className="cc-who">
              <div className="cc-inner">
                <Reveal>
                  <div className="cc-eyebrow">
                    <span className="cc-eyebrow-line" />
                    Who This Is For
                  </div>
                  <h2 className="cc-sec-title">We&apos;re looking for creators who are serious.</h2>
                  <p className="cc-sec-sub">Not just follower count — we care about quality, consistency, and genuine audience connection.</p>
                </Reveal>
                <div className="cc-who-grid">
                  {[
                    { icon:"🎓", title:"College Students & Freshers",      desc:"Creating content around placements, college life, learning to code, or cracking interviews." },
                    { icon:"💼", title:"Working Professionals",             desc:"Sharing real career experiences, job switch stories, skill-building journeys, or industry insights." },
                    { icon:"📱", title:"Consistent Content Creators",       desc:"Regularly posting on Instagram, LinkedIn, or YouTube — even with a small but engaged following." },
                    { icon:"🧠", title:"Educators & Mentors",               desc:"Teaching coding, resume writing, DSA, aptitude, or any career-relevant skill to students." },
                  ].map((c, i) => (
                    <Reveal key={c.title} delay={i * 70}>
                      <div className="cc-who-card">
                        <div className="cc-who-card-icon">{c.icon}</div>
                        <div>
                          <p className="cc-who-card-title">{c.title}</p>
                          <p className="cc-who-card-desc">{c.desc}</p>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </section>

            {/* ══════════════════════════════════════
                WHY JOIN
            ══════════════════════════════════════ */}
            <section className="cc-why" id="why-join">
              <div className="cc-inner">
                <Reveal>
                  <div className="cc-eyebrow">
                    <span className="cc-eyebrow-line" />
                    Why Join
                  </div>
                  <h2 className="cc-sec-title">More than a collab.<br />A real creative partnership.</h2>
                  <p className="cc-sec-sub">
                    We don&apos;t just send you a brief and disappear. You&apos;re part of how Jobingen grows — and you grow with us.
                  </p>
                </Reveal>

                <div className="cc-benefits-grid">
                  {BENEFITS.map((b, i) => (
                    <Reveal key={b.title} delay={i * 70}>
                      <div className="cc-benefit-card">
                        <div className="cc-benefit-icon" style={{ background: b.bg }}>{b.icon}</div>
                        <p className="cc-benefit-title">{b.title}</p>
                        <p className="cc-benefit-desc">{b.desc}</p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </section>

            {/* ══════════════════════════════════════
                HOW IT WORKS
            ══════════════════════════════════════ */}
            <section className="cc-how">
              <div className="cc-inner">
                <Reveal>
                  <div className="cc-eyebrow">
                    <span className="cc-eyebrow-line" />
                    How It Works
                  </div>
                  <h2 className="cc-sec-title">Simple 3-step process</h2>
                  <p className="cc-sec-sub">Apply once, our team reviews personally, and we onboard the best fit.</p>
                </Reveal>

                <div className="cc-how-grid">
                  {[
                    { n:"01", title:"Submit Your Application", desc:"Fill out our quick 4-step application — takes under 5 minutes. Tell us who you are, what you create, and how you'd like to collaborate." },
                    { n:"02", title:"We Review & Reach Out",   desc:"Our team personally reviews every application within 5–7 business days. Shortlisted creators get a direct message from us." },
                    { n:"03", title:"Get Your First Brief",    desc:"Once onboarded, you receive a content brief, a collaboration agreement, and access to the private Creator Community group." },
                  ].map((s, i) => (
                    <Reveal key={s.n} delay={i * 90}>
                      <div className="cc-how-step">
                        <div className="cc-how-num">{s.n}</div>
                        <p className="cc-how-title">{s.title}</p>
                        <p className="cc-how-desc">{s.desc}</p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </section>

            {/* ══════════════════════════════════════
                MULTI-STEP FORM
            ══════════════════════════════════════ */}
            <section className="cc-form-section" id="apply" ref={formRef}>
              <div className="cc-form-wrap">
                <Reveal>
                  <div className="cc-form-header">
                    <div className="cc-eyebrow" style={{ justifyContent:"center" }}>
                      <span className="cc-eyebrow-line" />
                      Creator Application
                      <span className="cc-eyebrow-line" />
                    </div>
                    <h2 className="cc-form-header-title">Apply in 3 steps</h2>
                    <p className="cc-form-header-sub">
                      We review every application personally. Take your time.
                    </p>
                  </div>
                </Reveal>

                <div className="cc-form-card">
                  <div className="cc-card-top" />
                  <div className="cc-form-body">
                    <StepIndicator currentStep={step} steps={STEPS} />

                    <form onSubmit={handleSubmit}>
                      {step === 1 && <BasicInfoStep data={formData} onChange={(k,v) => updateField(k, v as string)} errors={errors} />}
                      {step === 2 && <CollaborationStep data={formData} onChange={(k,v) => updateField(k, v)} errors={errors} />}
                      {step === 3 && <ReviewSubmit data={formData} loading={loading} error={submitError} />}

                      <div className="cc-step-nav">
                        {step > 1 && (
                          <button type="button" className="cc-nav-back" onClick={handleBack}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                              <path d="M19 12H5M12 5l-7 7 7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Back
                          </button>
                        )}
                        {step < STEPS.length && (
                          <button type="button" className="cc-nav-next" onClick={handleNext}>
                            Continue
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                              <path d="M5 12h14M12 5l7 7-7 7" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </form>
                  </div>
                </div>

                <div className="cc-trust">
                  {["No spam, ever", "Reviewed by humans", "India-first platform", "Response in 5–7 days"].map(item => (
                    <span key={item} className="cc-trust-item">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12l5 5L20 7" stroke="#1d3a8f" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

      </div>

      <Footer />
    </>
  )
}
