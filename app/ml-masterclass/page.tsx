"use client"

import { useState, useRef, ChangeEvent } from "react"
import { Footer } from "@/components/landing/footer"
import { Navbar } from "@/components/landing/navbar"

const CSS = `
  :root {
    --ink:    #09090f;
    --ink2:   #3d3d52;
    --ink3:   #8a8aa8;
    --white:  #ffffff;
    --cream:  #f7f7fb;
    --cream2: #f0f0f8;
    --border: rgba(10,10,20,0.08);
    --borderM:rgba(10,10,20,0.16);
    --ind:    #1d3a8f;
    --ind-l:  #e8edfe;
    --vio:    #3b52f0;
    --grn:    #059669;
    --grn-l:  #ecfdf5;
    --amb:    #f59e0b;
    --amb-l:  #fffbeb;
    --rose:   #f43f5e;
    --rose-l: #fff1f2;
    --shadow-sm:  0 2px 8px rgba(10,10,20,0.05);
    --shadow-md:  0 4px 24px rgba(10,10,20,0.08);
    --shadow-lg:  0 12px 48px rgba(10,10,20,0.12);
    --spring: cubic-bezier(.34,1.56,.64,1);
    --ease-out: cubic-bezier(.16,1,.3,1);
  }

  .ml-page * { box-sizing: border-box; }
  .ml-page { font-family: -apple-system, BlinkMacSystemFont, 'Inter', system-ui, sans-serif; background: var(--cream); }

  @keyframes shimmer {
    0%   { background-position: -400% center; }
    100% { background-position: 400% center; }
  }
  @keyframes pulse-dot {
    0%,100% { transform: scale(1); opacity:.9; }
    50%      { transform: scale(1.25); opacity:1; }
  }
  @keyframes fade-up {
    from { opacity:0; transform:translateY(22px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes check-pop {
    0%   { transform: scale(0) rotate(-12deg); opacity:0; }
    60%  { transform: scale(1.22) rotate(4deg); opacity:1; }
    100% { transform: scale(1) rotate(0deg); opacity:1; }
  }
  @keyframes confetti-fall {
    0%   { transform: translateY(-24px) rotate(0deg); opacity:1; }
    100% { transform: translateY(110px) rotate(720deg); opacity:0; }
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  .shimmer {
    background: linear-gradient(135deg, #1d3a8f 0%, #3b52f0 50%, #059669 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .btn {
    display: inline-flex; align-items: center; justify-content: center;
    cursor: pointer; text-decoration: none; border: none; outline: none;
    transition: transform .22s var(--spring), box-shadow .22s ease;
    position: relative; overflow: hidden;
  }
  .btn::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(to bottom, rgba(255,255,255,0.12) 0%, transparent 60%);
    pointer-events: none; border-radius: inherit;
  }
  .btn:hover  { transform: translateY(-2px) scale(1.025); }
  .btn:active { transform: translateY(0) scale(.97); }
  .btn-primary {
    background: linear-gradient(135deg, #1d3a8f 0%, #2548c5 100%);
    box-shadow: 0 6px 28px rgba(29,58,143,.32);
    color: white;
  }
  .btn-primary:hover { box-shadow: 0 12px 40px rgba(29,58,143,.45); }
  .btn-primary:disabled { opacity:.65; cursor:not-allowed; transform:none; }

  .h-field {
    width: 100%;
    padding: 12px 14px;
    border-radius: 12px;
    border: 1.5px solid var(--border);
    background: var(--cream);
    font-size: 14px;
    font-weight: 500;
    color: var(--ink);
    outline: none;
    transition: border-color .18s ease, box-shadow .18s ease, background .18s ease;
    font-family: inherit;
  }
  .h-field:focus {
    border-color: var(--ind);
    background: white;
    box-shadow: 0 0 0 3px rgba(29,58,143,.1);
  }
  .h-field::placeholder { color: var(--ink3); font-weight: 400; }
  .h-field.error { border-color: var(--rose); }

  .upload-area {
    width: 100%;
    padding: 20px;
    border-radius: 14px;
    border: 2px dashed var(--border);
    background: var(--cream);
    text-align: center;
    cursor: pointer;
    transition: all .2s ease;
  }
  .upload-area:hover { border-color: rgba(29,58,143,.35); background: var(--ind-l); }
  .upload-area.has-file { border-color: var(--grn); background: var(--grn-l); border-style: solid; }

  .step-badge {
    width: 28px; height: 28px; border-radius: 50%;
    background: var(--ind); color: white;
    display: flex; align-items: center; justify-content: center;
    font-size: 12px; font-weight: 800; flex-shrink: 0;
  }

  .success-check { animation: check-pop .5s var(--spring) both; }
  .fade-up { animation: fade-up .6s var(--ease-out) both; }
  .spin { animation: spin 1s linear infinite; }

  /* ── SECTION WRAPPER ── */
  .ml-wrap { max-width: 1100px; margin: 0 auto; padding: 0 28px; }

  /* ── HERO ── */
  .ml-hero {
    background: linear-gradient(180deg, #f0f4ff 0%, #e8edff 60%, #f8faff 100%);
    padding: 110px 28px 72px;
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  .ml-hero-blob1 { position:absolute; top:-8%; right:4%; width:400px; height:400px; border-radius:50%; background:radial-gradient(circle,rgba(29,58,143,.07) 0%,transparent 70%); pointer-events:none; }
  .ml-hero-blob2 { position:absolute; bottom:-6%; left:2%; width:300px; height:300px; border-radius:50%; background:radial-gradient(circle,rgba(5,150,105,.05) 0%,transparent 70%); pointer-events:none; }

  /* ── SYLLABUS ── */
  .ml-syllabus { padding: 80px 28px; background: white; }
  .ml-sec-eyebrow { display:inline-flex; align-items:center; gap:8px; margin-bottom:12px; font-size:11px; font-weight:800; color:var(--ind); letter-spacing:.08em; text-transform:uppercase; }
  .ml-sec-eyebrow-line { display:inline-block; width:20px; height:2px; background:var(--ind); border-radius:2px; }
  .ml-sec-title { font-size:clamp(24px,3vw,38px); font-weight:900; color:var(--ink); letter-spacing:-.03em; line-height:1.1; margin-bottom:10px; }
  .ml-sec-sub { font-size:15px; color:var(--ink2); line-height:1.7; max-width:520px; margin-bottom:48px; }

  .ml-syllabus-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:20px; }
  @media(max-width:768px){ .ml-syllabus-grid{ grid-template-columns:1fr; } }

  .ml-hour-card {
    background:white; border-radius:20px; border:1.5px solid var(--border);
    overflow:hidden; box-shadow:var(--shadow-sm);
    transition:box-shadow .2s, transform .2s;
  }
  .ml-hour-card:hover { box-shadow:var(--shadow-md); transform:translateY(-3px); }

  .ml-hour-head {
    padding:16px 20px; display:flex; align-items:center; gap:14px;
    border-bottom:1.5px solid var(--border);
  }
  .ml-hour-icon {
    width:40px; height:40px; border-radius:12px; flex-shrink:0;
    display:flex; align-items:center; justify-content:center; font-size:18px;
  }
  .ml-hour-label { font-size:10px; font-weight:800; letter-spacing:.07em; text-transform:uppercase; margin-bottom:2px; }
  .ml-hour-title { font-size:14px; font-weight:800; color:var(--ink); letter-spacing:-.01em; line-height:1.25; }
  .ml-hour-time { font-size:11px; color:var(--ink3); font-weight:600; margin-left:auto; flex-shrink:0; background:var(--cream); padding:3px 10px; border-radius:99px; }

  .ml-hour-body { padding:16px 20px; display:flex; flex-direction:column; gap:16px; }

  .ml-module {}
  .ml-module-head { display:flex; align-items:center; gap:8px; margin-bottom:7px; }
  .ml-mod-badge { font-size:9px; font-weight:900; padding:2px 8px; border-radius:99px; flex-shrink:0; letter-spacing:.04em; text-transform:uppercase; }
  .ml-module-title { font-size:13px; font-weight:800; color:var(--ink); }
  .ml-bullets { display:flex; flex-direction:column; gap:4px; padding-left:2px; }
  .ml-bullet { display:flex; align-items:flex-start; gap:8px; font-size:12px; color:var(--ink2); line-height:1.5; }
  .ml-bullet-dot { width:5px; height:5px; border-radius:50%; margin-top:5px; flex-shrink:0; }

  .ml-hands-on {
    display:flex; align-items:center; gap:7px; margin-top:6px;
    font-size:11px; font-weight:700; padding:6px 12px; border-radius:8px;
  }

  /* ── MENTOR ── */
  .ml-mentor-section { padding:0 28px 80px; }
  .ml-mentor-card {
    background:white; border-radius:24px; border:1.5px solid var(--border);
    box-shadow:var(--shadow-md); overflow:hidden;
    display:grid; grid-template-columns:280px 1fr;
  }
  @media(max-width:700px){ .ml-mentor-card{ grid-template-columns:1fr; } }
  .ml-mentor-photo-col {
    background:linear-gradient(160deg, #eef2ff 0%, #dde5ff 100%);
    display:flex; flex-direction:column; align-items:center; justify-content:center; padding:40px 32px;
  }
  .ml-mentor-photo {
    width:140px; height:140px; border-radius:50%; object-fit:cover;
    border:4px solid white; box-shadow:0 12px 40px rgba(29,58,143,.22);
    margin-bottom:16px;
  }
  .ml-mentor-photo-name { font-size:16px; font-weight:900; color:var(--ind); letter-spacing:-.02em; text-align:center; margin-bottom:4px; }
  .ml-mentor-photo-role { font-size:12px; font-weight:600; color:var(--ink2); text-align:center; }

  .ml-mentor-info-col { padding:36px 36px; display:flex; flex-direction:column; justify-content:center; gap:20px; }
  @media(max-width:700px){ .ml-mentor-info-col{ padding:24px 20px; } }
  .ml-mentor-quote {
    font-size:16px; font-weight:700; color:var(--ink); line-height:1.6; font-style:italic;
    padding-left:16px; border-left:3px solid var(--ind);
  }
  .ml-mentor-bio { font-size:14px; color:var(--ink2); line-height:1.75; }
  .ml-mentor-tags { display:flex; flex-wrap:wrap; gap:8px; }
  .ml-mentor-tag { font-size:11px; font-weight:700; padding:5px 12px; border-radius:99px; }
  .ml-mentor-stats { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; padding-top:16px; border-top:1px solid var(--border); }
  .ml-stat { display:flex; flex-direction:column; gap:3px; }
  .ml-stat-val { font-size:20px; font-weight:900; color:var(--ind); letter-spacing:-.02em; }
  .ml-stat-lbl { font-size:11px; font-weight:600; color:var(--ink3); }

  /* ── FORM SECTION ── */
  .ml-form-section { padding:0 28px 80px; }
  .ml-form-header { text-align:center; margin-bottom:48px; }

  /* ── RESPONSIVE ── */

  @media (max-width: 1100px) {
    .ml-wrap { padding: 0 24px; }
  }

  @media (max-width: 960px) {
    .page-grid { grid-template-columns: 1fr !important; }
    .sticky-col { position: static !important; }
    .form-2col { grid-template-columns: 1fr 1fr !important; }
    .ml-syllabus { padding: 64px 24px; }
    .ml-mentor-section { padding: 0 24px 64px; }
    .ml-form-section { padding: 0 24px 64px; }
  }

  @media (max-width: 768px) {
    .ml-hero { padding: 96px 20px 56px !important; }
    .ml-wrap { padding: 0 20px; }
    .ml-syllabus { padding: 56px 20px; }
    .ml-syllabus-grid { grid-template-columns: 1fr; }
    .ml-sec-title { font-size: 26px !important; }
    .ml-sec-sub { font-size: 14px !important; margin-bottom: 36px !important; }
    .ml-mentor-section { padding: 0 20px 56px; }
    .ml-form-section { padding: 0 20px 56px; }
    .ml-mentor-stats { gap: 12px; }
    .ml-stat-val { font-size: 18px; }
  }

  @media (max-width: 700px) {
    .ml-mentor-card { grid-template-columns: 1fr; }
    .ml-mentor-photo-col { padding: 32px 24px 24px; }
    .ml-mentor-info-col { padding: 24px 20px !important; }
  }

  @media (max-width: 768px) {
    .ml-wyg-bar { display: none; }
  }

  @media (max-width: 640px) {
    .ml-hero { padding: 88px 16px 48px !important; }
    .ml-wrap { padding: 0 16px !important; }
    .ml-syllabus { padding: 48px 16px !important; }
    .ml-mentor-section { padding: 0 16px 48px !important; }
    .ml-form-section { padding: 0 16px 48px !important; }
    .form-card { padding: 20px 16px !important; }
    .form-2col { grid-template-columns: 1fr !important; }
    .ml-hero-btns { flex-direction: column !important; align-items: stretch !important; }
    .ml-hero-btns > * { width: 100% !important; justify-content: center !important; text-align: center !important; }
    .ml-wyg-strip { gap: 12px !important; }
    .ml-wyg-item { width: calc(50% - 6px) !important; justify-content: flex-start !important; }
    .ml-mentor-tags { gap: 6px; }
    .ml-mentor-stats { gap: 8px; }
    .ml-stat-val { font-size: 16px; }
    .ml-stat-lbl { font-size: 10px; }
  }

  @media (max-width: 480px) {
    .ml-hero { padding: 84px 14px 44px !important; }
    .ml-wrap { padding: 0 14px !important; }
    .ml-hour-head { gap: 10px; }
    .ml-hour-time { margin-left: 0 !important; font-size: 10px !important; }
    .ml-hour-body { padding: 14px 16px !important; }
    .ml-hour-head { padding: 12px 16px !important; }
    .ml-hero-pills { gap: 6px !important; }
    .ml-hero-pill { padding: 5px 10px !important; font-size: 11px !important; }
    .ml-mentor-stats { grid-template-columns: repeat(3, 1fr); gap: 6px; }
    .ml-wyg-item { width: 100% !important; }
  }
`

const QR_IMAGE_SRC = "/qr-jobingen.jpeg"
const UPI_ID = "jobingen@upi"

const HOURS = [
  {
    n: "01", label: "Hour 1", time: "0–60 min",
    title: "Foundations & Core Concepts",
    icon: "🧠", color: "#1d3a8f", bg: "#eef2ff", badgeBg: "#dde5ff", badgeColor: "#1d3a8f",
    modules: [
      {
        mod: "M1", title: "The Big Picture",
        bullets: ["AI → ML → Deep Learning hierarchy", "Real-world apps: Netflix, fraud detection, medical diagnosis", "Types of ML: Classification, Regression, Clustering"],
      },
      {
        mod: "M2", title: "Learning Paradigms",
        bullets: ["Supervised Learning — labeled data, predict outcomes", "Unsupervised Learning — find hidden patterns", "Reinforcement Learning — reward-based learning", "When to use which?"],
      },
      {
        mod: "M3", title: "Types of Models & Algorithms",
        bullets: ["Parametric vs Non-parametric models", "Quick visual taxonomy of algorithms"],
      },
    ],
    handson: null,
  },
  {
    n: "02", label: "Hour 2", time: "60–120 min",
    title: "Core Algorithms Deep Dive",
    icon: "⚙️", color: "#059669", bg: "#ecfdf5", badgeBg: "#a7f3d0", badgeColor: "#065f46",
    modules: [
      {
        mod: "M4", title: "Regression Algorithms",
        bullets: ["Linear Regression — line of best fit, cost function, gradient descent", "Logistic Regression — sigmoid function, binary classification", "Polynomial Regression — handling non-linear data"],
      },
      {
        mod: "M5", title: "Tree-Based Models",
        bullets: ["Decision Tree — splitting criteria (Gini, Entropy), pruning", "Random Forest — bagging, ensemble power, feature importance"],
      },
    ],
    handson: "Predict house prices · Classify Iris dataset",
  },
  {
    n: "03", label: "Hour 3", time: "120–180 min",
    title: "Unsupervised + Data Engineering",
    icon: "🔬", color: "#7c3aed", bg: "#f5f3ff", badgeBg: "#ddd6fe", badgeColor: "#5b21b6",
    modules: [
      {
        mod: "M6", title: "Unsupervised Algorithms",
        bullets: ["Clustering — K-Means, Elbow method for choosing K", "Association Rules — Apriori, support / confidence / lift", "Use cases: customer segmentation, market basket analysis"],
      },
      {
        mod: "M7", title: "Data Preprocessing",
        bullets: ["Handling missing values & outliers", "Feature encoding — Label, One-Hot", "Feature scaling — Normalization vs Standardization", "Train / Test / Validation split", "Garbage in, garbage out — why data quality matters"],
      },
    ],
    handson: "Customer segmentation · Market basket analysis",
  },
  {
    n: "04", label: "Hour 4", time: "180–240 min",
    title: "Training, Evaluation & Best Practices",
    icon: "📊", color: "#ea580c", bg: "#fff7ed", badgeBg: "#fed7aa", badgeColor: "#9a3412",
    modules: [
      {
        mod: "M8", title: "Model Training",
        bullets: ["Fitting a model — hyperparameters vs parameters", "Cross-validation — K-Fold"],
      },
      {
        mod: "M9", title: "Evaluation Metrics",
        bullets: ["Confusion Matrix — TP, TN, FP, FN explained visually", "Precision, Recall, F1-Score, Accuracy", "ROC-AUC Curve", "RMSE / MAE for regression"],
      },
      {
        mod: "M10", title: "Overfitting & Underfitting",
        bullets: ["Bias-Variance Tradeoff — the core ML challenge", "Solutions: Regularization (L1/L2), Dropout, More Data", "Learning curves diagnosis", "End-to-end ML pipeline recap + what to learn next"],
      },
    ],
    handson: null,
  },
]

type FormData = {
  name: string; email: string; phone: string
  college: string; experience: string; upi_transaction_id: string
}
const INIT: FormData = { name: "", email: "", phone: "", college: "", experience: "", upi_transaction_id: "" }

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ fontSize: 12, fontWeight: 700, color: "var(--ink2)", letterSpacing: ".01em" }}>{label}</label>
      {children}
      {error && <div style={{ fontSize: 11, color: "var(--rose)", fontWeight: 600 }}>{error}</div>}
    </div>
  )
}

function Spinner() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="spin" style={{ flexShrink: 0 }}>
      <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="2.5" />
      <path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

function SuccessScreen({ name }: { name: string }) {
  const dots = ["#6074f3", "#34d399", "#fb7185", "#fbbf24", "#60a5fa", "#8c9df6", "#f472b6"]
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--cream)", padding: "40px 24px", position: "relative", overflow: "hidden" }}>
      {dots.map((c, i) => (
        <div key={i} style={{ position: "absolute", width: 8, height: 8, borderRadius: "50%", background: c, left: `${12 + i * 11}%`, top: "20%", animation: `confetti-fall ${1.2 + i * 0.15}s ease-out ${i * 0.08}s both` }} />
      ))}
      {dots.map((c, i) => (
        <div key={`b${i}`} style={{ position: "absolute", width: 6, height: 6, borderRadius: 2, background: c, left: `${8 + i * 12}%`, top: "15%", animation: `confetti-fall ${1.4 + i * 0.12}s ease-out ${0.1 + i * 0.07}s both` }} />
      ))}
      <div style={{ maxWidth: 480, width: "100%", textAlign: "center" }} className="fade-up">
        <div className="success-check" style={{ width: 88, height: 88, borderRadius: "50%", background: "linear-gradient(135deg, #1d3a8f, #2548c5)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 28px", boxShadow: "0 16px 48px rgba(29,58,143,0.32)" }}>
          <svg width="40" height="40" fill="none" viewBox="0 0 40 40">
            <path d="M10 21L17 28L30 13" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ind)", marginBottom: 10, textTransform: "uppercase", letterSpacing: ".06em" }}>Registration Received!</div>
        <h1 style={{ fontSize: "clamp(26px,4vw,38px)", fontWeight: 900, letterSpacing: "-.03em", color: "var(--ink)", margin: "0 0 14px", lineHeight: 1.1 }}>
          Welcome, <span className="shimmer">{name.split(" ")[0]}!</span>
        </h1>
        <p style={{ fontSize: 15, color: "var(--ink2)", lineHeight: 1.72, margin: "0 0 32px", maxWidth: 380, marginLeft: "auto", marginRight: "auto" }}>
          Your seat for the ML Masterclass has been reserved. We will verify your payment and send session details to your email.
        </p>
        <div style={{ borderRadius: 20, padding: "20px 24px", background: "white", border: "1.5px solid var(--border)", boxShadow: "var(--shadow-sm)", textAlign: "left", marginBottom: 24 }}>
          <div style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".07em", color: "var(--ink3)", marginBottom: 14 }}>What happens next</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { icon: "🔍", text: "We verify your UPI transaction ID within 24 hours" },
              { icon: "📧", text: "Confirmation email sent once payment is verified" },
              { icon: "💬", text: "Join the WhatsApp group for updates & session link" },
              { icon: "🗓️", text: "Session on 10 May 2026 · 7:00 PM – 11:00 PM (IST)" },
            ].map((s, i) => (
              <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <span style={{ fontSize: 16, lineHeight: 1, marginTop: 1, flexShrink: 0 }}>{s.icon}</span>
                <span style={{ fontSize: 13, color: "var(--ink2)", lineHeight: 1.5 }}>{s.text}</span>
              </div>
            ))}
          </div>
        </div>
        <a
          href="https://chat.whatsapp.com/Eh2RNykgkTbB6F4Qrnx2mO"
          target="_blank" rel="noopener noreferrer"
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, width: "100%", padding: "15px 28px", borderRadius: 14, marginBottom: 12, background: "#25D366", border: "none", fontSize: 15, fontWeight: 800, color: "white", textDecoration: "none", boxShadow: "0 6px 24px rgba(37,211,102,0.35)", transition: "transform .15s, box-shadow .15s" }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
          </svg>
          Join WhatsApp Group
        </a>
        <a href="/" className="btn btn-primary" style={{ display: "block", fontSize: 14, fontWeight: 800, padding: "13px 28px", borderRadius: 14, textDecoration: "none", textAlign: "center" }}>
          Back to Home
        </a>
      </div>
    </div>
  )
}

function UpiPaymentCard() {
  const [copied, setCopied] = useState(false)
  const copyUpi = () => { navigator.clipboard.writeText(UPI_ID).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000) }) }
  return (
    <div style={{ borderRadius: 20, border: "1.5px solid var(--border)", boxShadow: "var(--shadow-md)", overflow: "hidden", background: "white" }}>
      <div style={{ background: "linear-gradient(135deg, #1d3a8f 0%, #2548c5 100%)", padding: "18px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(255,255,255,0.18)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>💳</div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: ".07em" }}>Registration Fee</div>
          <div style={{ fontSize: 24, fontWeight: 900, color: "white", lineHeight: 1.1 }}>₹29 <span style={{ fontSize: 13, fontWeight: 500, opacity: .7 }}>only</span></div>
        </div>
      </div>
      <div style={{ padding: "24px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
          {[
            { n: "1", text: "Scan the QR code or copy the UPI ID below" },
            { n: "2", text: "Pay ₹29 using any UPI app" },
            { n: "3", text: "Enter your UPI Transaction ID in the form" },
          ].map((s) => (
            <div key={s.n} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <div className="step-badge">{s.n}</div>
              <span style={{ fontSize: 13, color: "var(--ink2)", lineHeight: 1.5, paddingTop: 4 }}>{s.text}</span>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, padding: "20px", borderRadius: 16, background: "var(--cream)", border: "1.5px solid var(--border)", marginBottom: 16 }}>
          <div style={{ width: 160, height: 160, borderRadius: 12, overflow: "hidden", background: "white", border: "1.5px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", padding: 8 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={QR_IMAGE_SRC} alt="UPI QR Code" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "var(--ink3)", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 6 }}>UPI ID</div>
            <button onClick={copyUpi} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 16px", borderRadius: 10, border: "1.5px solid var(--border)", background: "white", cursor: "pointer", transition: "all .2s", fontFamily: "inherit" }}>
              <span style={{ fontSize: 15, fontWeight: 800, color: "var(--ind)", letterSpacing: ".01em" }}>{UPI_ID}</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: copied ? "var(--grn)" : "var(--ink3)" }}>{copied ? "Copied!" : "Copy"}</span>
            </button>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
          <span style={{ fontSize: 11, color: "var(--ink3)", fontWeight: 600 }}>Pay with:</span>
          {["Paytm", "PhonePe", "Google Pay", "BHIM"].map((app) => (
            <span key={app} style={{ fontSize: 11, fontWeight: 700, color: "var(--ind)", padding: "3px 8px", borderRadius: 6, background: "var(--ind-l)" }}>{app}</span>
          ))}
        </div>
        <div style={{ marginTop: 16, padding: "12px 14px", borderRadius: 10, background: "var(--amb-l)", border: "1px solid rgba(245,158,11,.2)", fontSize: 12, color: "var(--ink2)", lineHeight: 1.55 }}>
          Scan the QR code or send payment using any UPI app. Then enter your transaction ID in the form.
        </div>
      </div>
    </div>
  )
}

export default function MLMasterclassPage() {
  const [form, setForm] = useState<FormData>(INIT)
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [screenshot, setScreenshot] = useState<File | null>(null)
  const [screenshotName, setScreenshotName] = useState("")
  const [screenshotError, setScreenshotError] = useState("")
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLDivElement>(null)

  function set(key: keyof FormData, val: string) {
    setForm((f) => ({ ...f, [key]: val }))
    setErrors((e) => ({ ...e, [key]: "" }))
    setServerError("")
  }

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setScreenshot(file); setScreenshotName(file.name); setScreenshotError("")
  }

  function validate() {
    const e: Partial<Record<keyof FormData, string>> = {}
    if (!form.name.trim()) e.name = "Name is required."
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Valid email required."
    if (!form.phone.trim() || form.phone.replace(/\D/g, "").length < 10) e.phone = "10-digit phone number required."
    if (!form.college.trim()) e.college = "College / Company is required."
    if (!form.experience) e.experience = "Please select your experience level."
    if (!form.upi_transaction_id.trim()) e.upi_transaction_id = "UPI Transaction ID is required."
    return e
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    if (!screenshot) setScreenshotError("Payment screenshot is required.")
    else setScreenshotError("")
    if (Object.keys(errs).length || !screenshot) { setErrors(errs); return }
    setLoading(true); setServerError("")
    try {
      const fd = new FormData()
      fd.append("name", form.name.trim()); fd.append("email", form.email.trim())
      fd.append("phone", form.phone.trim()); fd.append("college", form.college.trim())
      fd.append("experience", form.experience); fd.append("upi_transaction_id", form.upi_transaction_id.trim())
      if (screenshot) fd.append("screenshot", screenshot)
      const res = await fetch("/api/ml-masterclass", { method: "POST", body: fd })
      const data = await res.json()
      if (!res.ok) { setServerError(data.error || "Something went wrong. Please try again."); setLoading(false); return }
      setSubmitted(true)
    } catch {
      setServerError("Network error. Please check your connection and try again.")
      setLoading(false)
    }
  }

  if (submitted) {
    return (<><style dangerouslySetInnerHTML={{ __html: CSS }} /><div className="ml-page"><SuccessScreen name={form.name} /></div></>)
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <Navbar />

      <div className="ml-page">

        {/* ══════════ HERO ══════════ */}
        <section className="ml-hero">
          <div className="ml-hero-blob1" />
          <div className="ml-hero-blob2" />
          <div style={{ maxWidth: 720, margin: "0 auto", position: "relative" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 20, padding: "6px 18px", borderRadius: 99, background: "white", border: "1.5px solid #dde5ff", fontSize: 11, fontWeight: 800, color: "var(--ind)", textTransform: "uppercase", letterSpacing: ".07em", boxShadow: "0 2px 12px rgba(29,58,143,.08)" }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#16a34a", boxShadow: "0 0 6px rgba(22,163,74,.5)", animation: "pulse-dot 2s infinite", flexShrink: 0 }} />
              Live Bootcamp · Seats Limited
            </div>

            <h1 style={{ fontSize: "clamp(32px,5vw,60px)", fontWeight: 900, letterSpacing: "-.04em", color: "var(--ink)", margin: "0 0 16px", lineHeight: 1.06 }}>
              4-Hour<br />
              <span className="shimmer">ML Masterclass</span>
            </h1>

            <p style={{ fontSize: 16, color: "var(--ink2)", lineHeight: 1.75, maxWidth: 520, margin: "0 auto 28px" }}>
              Live session covering core algorithms, data pipelines & model evaluation — from absolute beginner to writing real ML code. ₹29 only.
            </p>

            <div className="ml-hero-pills" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, flexWrap: "wrap", marginBottom: 36 }}>
              {[
                { icon: "📅", text: "10 May 2026" },
                { icon: "🕖", text: "7:00 PM – 11:00 PM IST" },
                { icon: "⏱️", text: "4 Hours Live" },
                { icon: "🐍", text: "Python" },
                { icon: "💰", text: "Only ₹29" },
              ].map((b) => (
                <div key={b.text} className="ml-hero-pill" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 99, background: "white", border: "1.5px solid var(--border)", fontSize: 12, fontWeight: 700, color: "var(--ink2)", boxShadow: "0 2px 6px rgba(0,0,0,.04)" }}>
                  <span>{b.icon}</span>{b.text}
                </div>
              ))}
            </div>

            <div className="ml-hero-btns" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
              <button
                onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                className="btn btn-primary"
                style={{ fontSize: 15, fontWeight: 800, padding: "14px 32px", borderRadius: 14, gap: 9 }}
              >
                Register Now — ₹29
                <svg width="16" height="16" fill="none" viewBox="0 0 18 18"><path d="M3 9h12M11 5l4 4-4 4" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              <a href="#syllabus" style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 14, fontWeight: 700, color: "var(--ind)", padding: "14px 24px", borderRadius: 14, border: "1.5px solid #dde5ff", background: "white", textDecoration: "none", transition: "all .2s" }}>
                View Syllabus
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M12 5v14M5 12l7 7 7-7" stroke="var(--ind)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </a>
            </div>
          </div>
        </section>

        {/* ══════════ WHAT YOU GET STRIP ══════════ */}
        <div className="ml-wyg-bar" style={{ background: "linear-gradient(135deg,#1d3a8f,#2548c5)", padding: "18px 20px" }}>
          <div className="ml-wyg-strip" style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", gap: 20, flexWrap: "wrap" }}>
            {[
              { icon: "🤖", text: "7 Core ML Algorithms" },
              { icon: "🔄", text: "Full ML Pipeline" },
              { icon: "📊", text: "Model Evaluation Metrics" },
              { icon: "🧹", text: "Data Preprocessing" },
              { icon: "📄", text: "Jupyter Notebooks" },
              { icon: "🏆", text: "Certificate" },
            ].map((item) => (
              <div key={item.text} className="ml-wyg-item" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 15, flexShrink: 0 }}>{item.icon}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.9)" }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ══════════ SYLLABUS ══════════ */}
        <section className="ml-syllabus" id="syllabus">
          <div className="ml-wrap">
            <div className="ml-sec-eyebrow">
              <span className="ml-sec-eyebrow-line" />
              Full Syllabus
            </div>
            <h2 className="ml-sec-title">10 Modules · 4 Hours · 1 Breakthrough</h2>
            <p className="ml-sec-sub">Every module is live-coded with real datasets. No slides-only fluff — you leave with working Python notebooks.</p>

            <div className="ml-syllabus-grid">
              {HOURS.map((h) => (
                <div key={h.n} className="ml-hour-card">
                  <div className="ml-hour-head">
                    <div className="ml-hour-icon" style={{ background: h.bg }}>{h.icon}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className="ml-hour-label" style={{ color: h.color }}>{h.label}</div>
                      <div className="ml-hour-title">{h.title}</div>
                    </div>
                    <div className="ml-hour-time">{h.time}</div>
                  </div>
                  <div className="ml-hour-body">
                    {h.modules.map((m) => (
                      <div key={m.mod} className="ml-module">
                        <div className="ml-module-head">
                          <span className="ml-mod-badge" style={{ background: h.badgeBg, color: h.badgeColor }}>{m.mod}</span>
                          <span className="ml-module-title">{m.title}</span>
                        </div>
                        <div className="ml-bullets">
                          {m.bullets.map((b, bi) => (
                            <div key={bi} className="ml-bullet">
                              <div className="ml-bullet-dot" style={{ background: h.color }} />
                              {b}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                    {h.handson && (
                      <div className="ml-hands-on" style={{ background: h.bg, color: h.color }}>
                        <svg width="13" height="13" fill="none" viewBox="0 0 24 24">
                          <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span style={{ fontWeight: 800, fontSize: 11 }}>Hands-on:</span>
                        <span style={{ fontSize: 11, fontWeight: 600 }}>{h.handson}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════ MENTOR ══════════ */}
        <section className="ml-mentor-section">
          <div className="ml-wrap">
            <div className="ml-sec-eyebrow">
              <span className="ml-sec-eyebrow-line" />
              Your Instructor
            </div>
            <h2 className="ml-sec-title" style={{ marginBottom: 32 }}>Learn from someone who&apos;s built it for real.</h2>

            <div className="ml-mentor-card">
              <div className="ml-mentor-photo-col">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/mentors/aditya-dubey.jpg"
                  alt="Aditya Dubey"
                  className="ml-mentor-photo"
                  onError={(e) => {
                    const el = e.currentTarget
                    el.style.display = "none"
                    const fallback = el.nextElementSibling as HTMLElement
                    if (fallback) fallback.style.display = "flex"
                  }}
                />
                <div style={{ display: "none", width: 140, height: 140, borderRadius: "50%", background: "linear-gradient(135deg,#1d3a8f,#3b5bdb)", alignItems: "center", justifyContent: "center", fontSize: 40, fontWeight: 900, color: "white", border: "4px solid white", boxShadow: "0 12px 40px rgba(29,58,143,.22)", marginBottom: 16 }}>
                  AD
                </div>
                <div className="ml-mentor-photo-name">Aditya Dubey</div>
                <div className="ml-mentor-photo-role">ML Engineer & Educator</div>
              </div>

              <div className="ml-mentor-info-col">
                <div className="ml-mentor-quote">
                  &ldquo;ML felt impossible until I stopped reading theory and started breaking models intentionally. That&apos;s what we&apos;ll do in this session.&rdquo;
                </div>

                <div className="ml-mentor-bio">
                  Aditya has built ML systems that process real-world data at scale. He&apos;s passionate about making machine learning accessible — not just the math, but the intuition behind why algorithms work (and when they don&apos;t). This session is everything he wishes he had when starting out.
                </div>

                <div className="ml-mentor-tags">
                  {["Machine Learning", "Python", "Data Science", "Model Evaluation", "Scikit-Learn", "Pandas"].map((tag) => (
                    <span key={tag} className="ml-mentor-tag" style={{ background: "var(--ind-l)", color: "var(--ind)", border: "1px solid #dde5ff" }}>{tag}</span>
                  ))}
                </div>

                <div className="ml-mentor-stats">
                  {[
                    { val: "4+", lbl: "Years in ML" },
                    { val: "10+", lbl: "Modules Covered" },
                    { val: "Live", lbl: "Hands-On Session" },
                  ].map((s) => (
                    <div key={s.lbl} className="ml-stat">
                      <span className="ml-stat-val">{s.val}</span>
                      <span className="ml-stat-lbl">{s.lbl}</span>
                    </div>
                  ))}
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", borderRadius: 12, background: "var(--ind-l)", border: "1px solid #dde5ff" }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {["#6074f3", "#34d399", "#fb7185", "#fbbf24"].map((c, i) => (
                      <div key={i} style={{ width: 26, height: 26, borderRadius: "50%", background: c, border: "2px solid white", marginLeft: i === 0 ? 0 : -8, flexShrink: 0 }} />
                    ))}
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 800, color: "var(--ind)", lineHeight: 1.2 }}>15,000+ Students Mentored</div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: "var(--ink3)" }}>by Aditya Dubey across sessions & workshops</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════ REGISTRATION FORM ══════════ */}
        <section className="ml-form-section" ref={formRef}>
          <div className="ml-wrap">
            <div className="ml-form-header">
              <div className="ml-sec-eyebrow" style={{ justifyContent: "center" }}>
                <span className="ml-sec-eyebrow-line" />
                Register Now
                <span className="ml-sec-eyebrow-line" />
              </div>
              <h2 className="ml-sec-title" style={{ textAlign: "center" }}>Reserve your seat — ₹29 only</h2>
              <p style={{ fontSize: 15, color: "var(--ink2)", textAlign: "center" }}>10 May 2026 · 7:00 PM – 11:00 PM IST · Limited seats</p>
            </div>

            <div className="page-grid" style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 32, alignItems: "start" }}>

              {/* LEFT: Form */}
              <form onSubmit={handleSubmit} noValidate>
                <div className="form-card" style={{ background: "white", borderRadius: 24, border: "1.5px solid var(--border)", boxShadow: "var(--shadow-sm)", padding: "32px", display: "flex", flexDirection: "column", gap: 22 }}>
                  <div style={{ fontSize: 14, fontWeight: 800, color: "var(--ink)", marginBottom: -6 }}>Participant Details</div>

                  <div className="form-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <Field label="Full Name *" error={errors.name}>
                      <input className={`h-field${errors.name ? " error" : ""}`} placeholder="Arjun Sharma" value={form.name} onChange={(e) => set("name", e.target.value)} />
                    </Field>
                    <Field label="Email Address *" error={errors.email}>
                      <input className={`h-field${errors.email ? " error" : ""}`} type="email" placeholder="arjun@gmail.com" value={form.email} onChange={(e) => set("email", e.target.value)} />
                    </Field>
                  </div>

                  <div className="form-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <Field label="Phone Number *" error={errors.phone}>
                      <input className={`h-field${errors.phone ? " error" : ""}`} type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={(e) => set("phone", e.target.value)} />
                    </Field>
                    <Field label="College / Company *" error={errors.college}>
                      <input className={`h-field${errors.college ? " error" : ""}`} placeholder="NIT Allahabad" value={form.college} onChange={(e) => set("college", e.target.value)} />
                    </Field>
                  </div>

                  <Field label="Experience Level *" error={errors.experience}>
                    <select className={`h-field${errors.experience ? " error" : ""}`} value={form.experience} onChange={(e) => set("experience", e.target.value)}>
                      <option value="">Select your background</option>
                      <option value="complete_beginner">Complete Beginner — No ML knowledge</option>
                      <option value="basic_python">Basic Python Knowledge</option>
                      <option value="cs_student">CS Student / Fresher</option>
                      <option value="working_professional">1–2 Year Working Professional</option>
                    </select>
                  </Field>

                  <div style={{ height: 1, background: "var(--border)" }} />

                  <div>
                    <div style={{ fontSize: 14, fontWeight: 800, color: "var(--ink)", marginBottom: 16 }}>Payment Verification</div>
                    <Field label="UPI Transaction ID *" error={errors.upi_transaction_id}>
                      <input className={`h-field${errors.upi_transaction_id ? " error" : ""}`} placeholder="e.g. 123456789012" value={form.upi_transaction_id} onChange={(e) => set("upi_transaction_id", e.target.value)} />
                      <div style={{ fontSize: 11, color: "var(--ink3)", marginTop: 4 }}>Find this in your UPI app under transaction history after payment.</div>
                    </Field>
                    <div style={{ marginTop: 16 }}>
                      <label style={{ fontSize: 12, fontWeight: 700, color: "var(--ink2)", letterSpacing: ".01em", display: "block", marginBottom: 6 }}>
                        Payment Screenshot <span style={{ color: "var(--rose)" }}>*</span>
                      </label>
                      <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleFile} />
                      <div className={`upload-area${screenshotName ? " has-file" : ""}${screenshotError ? " error" : ""}`} onClick={() => fileRef.current?.click()}>
                        {screenshotName ? (
                          <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "center" }}>
                            <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                              <path d="M9 12l2 2 4-4" stroke="var(--grn)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                              <circle cx="12" cy="12" r="10" stroke="var(--grn)" strokeWidth="2" />
                            </svg>
                            <span style={{ fontSize: 13, fontWeight: 600, color: "var(--grn)" }}>{screenshotName}</span>
                          </div>
                        ) : (
                          <div>
                            <svg width="28" height="28" fill="none" viewBox="0 0 24 24" style={{ margin: "0 auto 8px" }}>
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="var(--ink3)" strokeWidth="1.8" strokeLinecap="round" />
                              <polyline points="17 8 12 3 7 8" stroke="var(--ink3)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                              <line x1="12" y1="3" x2="12" y2="15" stroke="var(--ink3)" strokeWidth="1.8" strokeLinecap="round" />
                            </svg>
                            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink3)" }}>Click to upload payment screenshot</div>
                            <div style={{ fontSize: 11, color: "var(--ink3)", marginTop: 4 }}>PNG, JPG up to 5MB</div>
                          </div>
                        )}
                      </div>
                      {screenshotError && <div style={{ fontSize: 11, color: "var(--rose)", marginTop: 4 }}>{screenshotError}</div>}
                    </div>
                  </div>

                  {serverError && (
                    <div style={{ padding: "12px 16px", borderRadius: 10, background: "var(--rose-l)", border: "1px solid rgba(244,63,94,.25)", fontSize: 13, fontWeight: 600, color: "var(--rose)" }}>{serverError}</div>
                  )}

                  <button type="submit" disabled={loading} className="btn btn-primary" style={{ fontSize: 15, fontWeight: 900, padding: "15px 28px", borderRadius: 16, width: "100%", gap: 10 }}>
                    {loading
                      ? <><Spinner /> Submitting registration...</>
                      : <>Submit Registration — ₹29 paid
                          <svg width="16" height="16" fill="none" viewBox="0 0 18 18">
                            <path d="M3 9h12M11 5l4 4-4 4" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </>
                    }
                  </button>

                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 20, flexWrap: "wrap", paddingTop: 4 }}>
                    {["🔒 Secure", "📧 Confirmation email", "✅ Manual verification"].map((t, i) => (
                      <span key={i} style={{ fontSize: 11, color: "var(--ink3)", fontWeight: 600 }}>{t}</span>
                    ))}
                  </div>
                </div>
              </form>

              {/* RIGHT: UPI + What you get */}
              <div className="sticky-col" style={{ position: "sticky", top: 76, display: "flex", flexDirection: "column", gap: 16 }}>
                <UpiPaymentCard />
                <div style={{ borderRadius: 20, border: "1.5px solid var(--border)", boxShadow: "var(--shadow-sm)", overflow: "hidden", background: "white" }}>
                  <div style={{ background: "linear-gradient(135deg, #059669, #10b981)", padding: "16px 20px" }}>
                    <div style={{ fontSize: 11, fontWeight: 800, color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: ".07em" }}>What You Get</div>
                    <div style={{ fontSize: 18, fontWeight: 900, color: "white", marginTop: 4 }}>ML Masterclass</div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.65)", marginTop: 4, fontWeight: 600 }}>📅 10 May 2026 · 7:00 PM – 11:00 PM</div>
                  </div>
                  <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 10 }}>
                    {[
                      { icon: "🤖", text: "10 Modules across 4 Hours" },
                      { icon: "⚙️", text: "7 Core ML Algorithms — Live Coded" },
                      { icon: "🔄", text: "Full ML Pipeline Walkthrough" },
                      { icon: "📊", text: "Confusion Matrix & Model Metrics" },
                      { icon: "🧹", text: "Data Preprocessing Techniques" },
                      { icon: "📄", text: "Session Recording + Jupyter Notebooks" },
                      { icon: "🏆", text: "Completion Certificate" },
                    ].map((item) => (
                      <div key={item.text} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ fontSize: 15, flexShrink: 0 }}>{item.icon}</span>
                        <span style={{ fontSize: 13, fontWeight: 600, color: "var(--ink2)" }}>{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

      </div>

      <Footer />
    </>
  )
}
