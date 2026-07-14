"use client"

import { useState, useMemo, useRef, useEffect } from "react"
import Link from "next/link"
import type { Job } from "./page"
import { parseResume, buildProfile, scoreJob, type ResumeProfile } from "./resume-match"

/* ─────────────────────────────────────────────────────────────────────────────
   BRAND COLOURS + LOGOS
───────────────────────────────────────────────────────────────────────────── */
const COMPANY_COLORS: Record<string, string> = {
  "Google": "#4285F4", "Microsoft": "#00A4EF", "Amazon": "#FF9900", "Meta": "#0866FF",
  "Netflix": "#E50914", "Apple": "#374151", "Flipkart": "#2874F0", "Zomato": "#E23744",
  "Swiggy": "#FC8019", "CRED": "#111827", "Razorpay": "#2563EB", "Zepto": "#8B31F5",
  "Meesho": "#9B51E0", "PhonePe": "#5F259F", "Ola": "#111827", "Groww": "#5367FF",
  "BrowserStack": "#F1692F", "Trippyway": "#0F766E", "Tapwave": "#2563EB",
  "Kendriya Vidyalaya": "#1D3A8F", "Top Institute of India": "#1D3A8F",
  "Paytm": "#00BAF2", "InMobi": "#E11D48", "Freshworks": "#0EA5E9", "Uber": "#111827",
  "Postman": "#FF6C37", "Zoho": "#E42527", "Atlassian": "#0052CC", "Adobe": "#ED1C24",
  "Nvidia": "#5C8C00", "Dream11": "#D3202A", "ShareChat": "#EA2C6D", "Urban Company": "#6D28D9",
  "Nykaa": "#E5308A", "Physics Wallah": "#5A2EA6", "Rapido": "#D99400", "Navi": "#3B5BDB",
  "Fractal Analytics": "#0A82C4", "LatentView Analytics": "#0B6BB2", "Mu Sigma": "#EF4130",
  "ZS Associates": "#1A5DAD", "Chargebee": "#FF5A5F", "Hasura": "#1499C9", "Sprinto": "#6C5CE7",
  "Salesforce": "#0D9DDA", "Intuit": "#365EBF", "IBM": "#0F62FE", "Accenture": "#A100FF",
  "Cognizant": "#1A4CA1", "Wipro": "#6D28D9", "Deloitte": "#62A70F", "Pine Labs": "#E8871E",
  "slice": "#7A5CFF", "Darwinbox": "#2B7DE9", "Playpower Labs": "#2563EB", "EarnIn": "#16A34A",
  "TCS": "#0A5EB0", "Infosys": "#007CC3", "HCLTech": "#0F62A6", "Tech Mahindra": "#E31E24",
  "Capgemini": "#0070AD", "Oracle": "#C74634", "SAP": "#008FD3", "Cisco": "#1BA0D7",
  "Intel": "#0068B5", "Qualcomm": "#3253DC", "Samsung": "#1428A0", "Dell": "#007DB8",
  "VMware": "#607078", "Walmart": "#0071CE", "PayPal": "#003087", "Visa": "#1A1F71",
  "Mastercard": "#CF4500", "Goldman Sachs": "#5C7FB0", "JPMorgan Chase": "#005EB8",
  "American Express": "#2E77BC", "Myntra": "#E7305B", "Blinkit": "#E0A400", "BigBasket": "#6DA80F",
  "Cars24": "#0044CC", "Spinny": "#E05A00", "Unacademy": "#08BD80", "upGrad": "#D9002E",
  "Lenskart": "#11B0C7", "Delhivery": "#CC1D2E", "Zerodha": "#387ED1", "Angel One": "#C8102E",
  "Upstox": "#5A2EA6", "Juspay": "#00997A", "Cashfree": "#5A2EE0", "MoEngage": "#DB2828",
  "Whatfix": "#E05A00", "Yellow.ai": "#D99400", "Innovaccer": "#0090C8", "Zeta": "#C8102E",
  "Ather Energy": "#14A79D", "Porter": "#4B2AAD",
  "Airtel": "#E40000", "Jio": "#0A2885", "HDFC Bank": "#C8102E", "ICICI Bank": "#AE282E", "Axis Bank": "#97144D",
  "Kotak Mahindra Bank": "#EF3E42", "BharatPe": "#2B3A67", "MobiKwik": "#E42529", "Jupiter": "#6D28D9",
  "Snapdeal": "#E40046", "FirstCry": "#E8720C", "Purplle": "#7A1FA2", "Mamaearth": "#6DA80F", "boAt": "#E52D27",
  "Gupshup": "#F04E45", "CleverTap": "#E11D48", "Mindtickle": "#6C5CE7", "Vedantu": "#E5405E", "Simplilearn": "#E0710C",
  "Scaler": "#4F46E5", "Coding Ninjas": "#E24E00", "PharmEasy": "#10847E", "Practo": "#0EA5C4", "Cult.fit": "#111827",
  "Udaan": "#2E2E86", "Ninjacart": "#2E9E45", "MPL": "#E52D27", "MakeMyTrip": "#EB2226", "ixigo": "#E05A00", "OYO": "#EE2E24",
}
const COMPANY_LOGOS: Record<string, string> = {
  "Tapwave": "/tapwave.jpeg",
  "Trippyway": "/trippyway-logo.jpg",
  "Kendriya Vidyalaya": "/kendriya-vidyalaya-logo.svg",
}

// Real brand logos are pulled from Clearbit's logo CDN by domain.
// Falls back to a coloured monogram if a logo fails to load.
const COMPANY_DOMAINS: Record<string, string> = {
  "Razorpay": "razorpay.com", "CRED": "cred.club", "Zepto": "zepto.com", "Meesho": "meesho.com",
  "PhonePe": "phonepe.com", "Groww": "groww.in", "Swiggy": "swiggy.com", "Zomato": "zomato.com",
  "Flipkart": "flipkart.com", "Uber": "uber.com", "Ola": "olacabs.com", "Paytm": "paytm.com",
  "Freshworks": "freshworks.com", "BrowserStack": "browserstack.com", "Postman": "postman.com",
  "Zoho": "zoho.com", "Atlassian": "atlassian.com", "Adobe": "adobe.com", "Nvidia": "nvidia.com",
  "Nykaa": "nykaa.com", "Dream11": "dream11.com", "ShareChat": "sharechat.com",
  "Urban Company": "urbancompany.com", "Rapido": "rapido.bike", "Navi": "navi.com",
  "Physics Wallah": "pw.live", "Fractal Analytics": "fractal.ai", "LatentView Analytics": "latentview.com",
  "Mu Sigma": "mu-sigma.com", "ZS Associates": "zs.com", "Chargebee": "chargebee.com",
  "Hasura": "hasura.io", "Sprinto": "sprinto.com", "Salesforce": "salesforce.com", "Intuit": "intuit.com",
  "IBM": "ibm.com", "Accenture": "accenture.com", "Cognizant": "cognizant.com", "Wipro": "wipro.com",
  "Deloitte": "deloitte.com", "Pine Labs": "pinelabs.com", "slice": "slice.com", "Darwinbox": "darwinbox.com",
  "Google": "google.com", "Microsoft": "microsoft.com", "Amazon": "amazon.com", "Meta": "meta.com",
  "Apple": "apple.com", "Netflix": "netflix.com", "TCS": "tcs.com", "Infosys": "infosys.com",
  "HCLTech": "hcltech.com", "Tech Mahindra": "techmahindra.com", "Capgemini": "capgemini.com",
  "Oracle": "oracle.com", "SAP": "sap.com", "Cisco": "cisco.com", "Intel": "intel.com",
  "Qualcomm": "qualcomm.com", "Samsung": "samsung.com", "Dell": "dell.com", "VMware": "vmware.com",
  "Walmart": "walmartglobaltech.com", "PayPal": "paypal.com", "Visa": "visa.com", "Mastercard": "mastercard.com",
  "Goldman Sachs": "goldmansachs.com", "JPMorgan Chase": "jpmorganchase.com", "American Express": "americanexpress.com",
  "Myntra": "myntra.com", "Blinkit": "blinkit.com", "BigBasket": "bigbasket.com", "Cars24": "cars24.com",
  "Spinny": "spinny.com", "Unacademy": "unacademy.com", "upGrad": "upgrad.com", "Lenskart": "lenskart.com",
  "Delhivery": "delhivery.com", "Zerodha": "zerodha.com", "Angel One": "angelone.in", "Upstox": "upstox.com",
  "Juspay": "juspay.in", "Cashfree": "cashfree.com", "MoEngage": "moengage.com", "Whatfix": "whatfix.com",
  "Yellow.ai": "yellow.ai", "Innovaccer": "innovaccer.com", "Zeta": "zeta.tech", "Ather Energy": "atherenergy.com",
  "Porter": "porter.in",
  "Airtel": "airtel.in", "Jio": "jio.com", "HDFC Bank": "hdfcbank.com", "ICICI Bank": "icicibank.com",
  "Axis Bank": "axisbank.com", "Kotak Mahindra Bank": "kotak.com", "BharatPe": "bharatpe.com", "MobiKwik": "mobikwik.com",
  "Jupiter": "jupiter.money", "Snapdeal": "snapdeal.com", "FirstCry": "firstcry.com", "Purplle": "purplle.com",
  "Mamaearth": "mamaearth.in", "boAt": "boat-lifestyle.com", "Gupshup": "gupshup.io", "CleverTap": "clevertap.com",
  "Mindtickle": "mindtickle.com", "Vedantu": "vedantu.com", "Simplilearn": "simplilearn.com", "Scaler": "scaler.com",
  "Coding Ninjas": "codingninjas.com", "PharmEasy": "pharmeasy.in", "Practo": "practo.com", "Cult.fit": "cult.fit",
  "Udaan": "udaan.com", "Ninjacart": "ninjacart.in", "MPL": "mpl.live", "MakeMyTrip": "makemytrip.com",
  "ixigo": "ixigo.com", "OYO": "oyorooms.com",
}
// Ordered logo candidates — the avatar tries each until one loads, then falls
// back to a coloured monogram. DuckDuckGo often has crisper marks; Google covers the rest.
// Guess several likely domains from a company name (for live/scraped jobs).
function guessDomains(name: string): string[] {
  const base = name
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/\b(inc|llc|ltd|limited|corp|corporation|gmbh|pvt|private|technologies|technology|solutions|systems|labs|group|holdings|the|co|company)\b/g, " ")
  const words = base.split(/[^a-z0-9]+/).filter(Boolean)
  if (!words.length) return []
  const concat = words.join("")
  const first = words[0]
  const cands = new Set<string>()
  if (concat.length >= 2) { cands.add(`${concat}.com`); cands.add(`${concat}.io`); cands.add(`${concat}.co`) }
  if (first.length >= 3 && first !== concat) cands.add(`${first}.com`)
  return [...cands].slice(0, 4)
}

const ddg = (d: string) => `https://icons.duckduckgo.com/ip3/${d}.ico`
const gfav = (d: string) => `https://www.google.com/s2/favicons?domain=${d}&sz=128`

function logoSources(name: string): string[] {
  if (COMPANY_LOGOS[name]) return [COMPANY_LOGOS[name]]
  const known = COMPANY_DOMAINS[name]
  // Known brands: DuckDuckGo + Google (real domains, Google won't inject a globe).
  if (known) return [ddg(known), gfav(known)]
  // Scraped companies: try several guessed domains via DuckDuckGo, which 404s
  // cleanly on a miss so the avatar cascades to a coloured letter (no stray globes).
  return guessDomains(name).map(ddg)
}
const NAVY = "#1d3a8f"

/* Company avatar — real brand logo or coloured monogram in a white rounded tile */
function CompanyAvatar({ name, size = 46, logo }: { name: string; size?: number; logo?: string }) {
  const [idx, setIdx] = useState(0)
  const color = COMPANY_COLORS[name] || NAVY
  const sources = logo ? [logo, ...logoSources(name)] : logoSources(name)
  const src = sources[idx]
  const letter = name.trim()[0]?.toUpperCase() || "?"
  return (
    <div style={{
      width: size, height: size, borderRadius: 13, flexShrink: 0,
      background: "white", border: "1px solid rgba(17,24,39,0.08)",
      boxShadow: "0 2px 8px rgba(15,23,42,0.06)",
      display: "flex", alignItems: "center", justifyContent: "center",
      overflow: "hidden",
    }}>
      {src
        ? <img src={src} alt={name} onError={() => setIdx(i => i + 1)} style={{ width: "100%", height: "100%", objectFit: "contain", padding: 6 }} />
        : <span style={{ fontSize: size * 0.42, fontWeight: 800, color, letterSpacing: "-0.02em" }}>{letter}</span>}
    </div>
  )
}

/* Small circular logo for the hero badge stack */
function BadgeLogo({ name, index }: { name: string; index: number }) {
  const [idx, setIdx] = useState(0)
  const color = COMPANY_COLORS[name] || NAVY
  const sources = logoSources(name)
  const src = sources[idx]
  return (
    <div title={name} style={{
      width: 26, height: 26, borderRadius: "50%", overflow: "hidden",
      background: "white", border: "2px solid white",
      boxShadow: "0 1px 3px rgba(15,23,42,0.14)",
      marginLeft: index === 0 ? 0 : -9, zIndex: 10 - index,
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      {src
        ? <img src={src} alt={name} onError={() => setIdx(i => i + 1)} style={{ width: "100%", height: "100%", objectFit: "contain", padding: 3 }} />
        : <span style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: `${color}15`, fontSize: 11, fontWeight: 800, color }}>{name.trim()[0]?.toUpperCase()}</span>}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   PASTEL CARD TINTS — rotating
───────────────────────────────────────────────────────────────────────────── */
const CARD_TINTS: Array<{ bg: string; accent: string; edge: string }> = [
  { bg: "#d9f2e5", accent: "#0f766e", edge: "#b8e6d1" }, // mint
  { bg: "#dae7fb", accent: "#1d4ed8", edge: "#c2d6f5" }, // blue
  { bg: "#d2eff2", accent: "#0e7490", edge: "#b6e4e8" }, // cyan
  { bg: "#fbe6d2", accent: "#c2410c", edge: "#f4d4b8" }, // peach
  { bg: "#e6e1fb", accent: "#6d28d9", edge: "#d4ccf5" }, // lavender
  { bg: "#fbdfeb", accent: "#be185d", edge: "#f4c9dd" }, // pink
]

const TYPE_CHIPS = ["Internship", "Full Time", "Contractual"]
const MODE_CHIPS = ["Remote", "On-site", "Hybrid"]

/* ─────────────────────────────────────────────────────────────────────────────
   JOB CARD — logo header, icon meta, footer button
───────────────────────────────────────────────────────────────────────────── */
function JobCard({ job, index, matchPct }: { job: Job; index: number; matchPct?: number }) {
  const [hov, setHov] = useState(false)
  const [saved, setSaved] = useState(false)
  const tint = CARD_TINTS[index % CARD_TINTS.length]
  const matchColor = matchPct == null ? "" : matchPct >= 80 ? "#16a34a" : matchPct >= 60 ? "#1d3a8f" : "#94a3b8"

  const tags: string[] = []
  if (job.type) tags.push(job.type)
  if (job.mode) tags.push(job.mode)
  if (job.department) tags.push(job.department)
  const visible = tags.slice(0, 3)
  const extra = tags.length - visible.length

  const href = job.applyUrl ?? `/jobs/${job.slug}`
  const external = Boolean(job.applyUrl)

  return (
    <Link
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", flexDirection: "column",
        minWidth: 0, maxWidth: "100%", overflow: "hidden",
        background: tint.bg,
        border: `1px solid ${tint.edge}`,
        borderRadius: 20,
        padding: "20px 20px 18px",
        minHeight: 296,
        textDecoration: "none",
        transform: hov ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hov ? "0 24px 56px rgba(15,23,42,0.14)" : "0 1px 3px rgba(15,23,42,0.04)",
        transition: "transform 0.28s cubic-bezier(0.16,1,0.3,1), box-shadow 0.28s cubic-bezier(0.16,1,0.3,1)",
        animation: `fadeUp 0.4s ease ${Math.min(index, 12) * 0.04}s both`,
        cursor: "pointer", position: "relative",
      }}
    >
      {/* Header: avatar + company + bookmark */}
      <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 16 }}>
        <CompanyAvatar name={job.company} logo={job.logo} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#111827", letterSpacing: "-0.01em", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {job.company}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11.5, color: "#4b5563", fontWeight: 500, marginTop: 1 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#16a34a", display: "inline-block" }} />
            Actively hiring
          </div>
        </div>
        {matchPct != null && (
          <span style={{
            flexShrink: 0, display: "inline-flex", alignItems: "center", gap: 4,
            fontSize: 11.5, fontWeight: 800, color: "white", background: matchColor,
            padding: "4px 9px", borderRadius: 99, letterSpacing: "-0.01em",
          }}>
            {matchPct}% match
          </span>
        )}
        <button
          onClick={e => { e.preventDefault(); setSaved(s => !s) }}
          style={{ border: "none", background: "transparent", cursor: "pointer", padding: 4, color: saved ? NAVY : "rgba(17,24,39,0.35)", flexShrink: 0, transition: "color 0.15s" }}
          aria-label="Save job"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.9"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></svg>
        </button>
      </div>

      {/* Title */}
      <h3 style={{
        fontSize: 19, fontWeight: 700, color: "#111827", margin: "0 0 12px",
        letterSpacing: "-0.02em", lineHeight: 1.25, overflowWrap: "anywhere",
        display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const, overflow: "hidden",
      }}>
        {job.title}
      </h3>

      {/* Meta row: location + experience */}
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "6px 14px", fontSize: 13, color: "#4b5563", fontWeight: 500, marginBottom: 14 }}>
        <span style={{ display: "flex", alignItems: "center", gap: 5, minWidth: 0 }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
          <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{job.location}</span>
        </span>
        {job.experience && (
          <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /></svg>
            {job.experience}
          </span>
        )}
      </div>

      {/* Tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
        {visible.map((t, i) => (
          <span key={i} style={{
            fontSize: 12, fontWeight: 600,
            color: i === 0 ? tint.accent : "#374151",
            background: i === 0 ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.5)",
            padding: "5px 11px", borderRadius: 8, whiteSpace: "nowrap",
            maxWidth: "100%", overflow: "hidden", textOverflow: "ellipsis",
          }}>
            {t}
          </span>
        ))}
        {extra > 0 && <span style={{ fontSize: 12, fontWeight: 600, color: "#6b7280", padding: "5px 4px" }}>+{extra}</span>}
      </div>

      <div style={{ flex: 1 }} />

      {/* Divider */}
      <div style={{ height: 1, background: "rgba(17,24,39,0.08)", margin: "16px 0 14px" }} />

      {/* Footer: salary + view button */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
        <span style={{ flex: "0 1 auto", minWidth: 0, fontSize: 14, fontWeight: 800, color: "#111827", letterSpacing: "-0.01em", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {job.stipend || "Competitive"}
        </span>
        <span style={{
          display: "inline-flex", alignItems: "center", gap: 6, flexShrink: 0,
          padding: "9px 16px", borderRadius: 10,
          background: hov ? NAVY : "rgba(255,255,255,0.7)",
          color: hov ? "white" : "#111827",
          border: `1.5px solid ${hov ? NAVY : "rgba(17,24,39,0.12)"}`,
          fontSize: 13, fontWeight: 700, transition: "all 0.2s ease",
        }}>
          View role
          <svg width="13" height="13" fill="none" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
      </div>
    </Link>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   FILTER PILL
───────────────────────────────────────────────────────────────────────────── */
function Pill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  const [hov, setHov] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: "9px 17px", borderRadius: 10, cursor: "pointer",
        fontSize: 13.5, fontWeight: 600, letterSpacing: "-0.01em",
        border: `1.5px solid ${active || hov ? NAVY : "#e5e7eb"}`,
        background: active ? NAVY : "white",
        color: active ? "white" : hov ? NAVY : "#374151",
        transition: "all 0.15s ease", whiteSpace: "nowrap",
      }}
    >
      {label}
    </button>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN
───────────────────────────────────────────────────────────────────────────── */
export function JobsClient({ jobs }: { jobs: Job[] }) {
  const [search, setSearch]     = useState("")
  const [location, setLocation] = useState("")
  const [types, setTypes]       = useState<string[]>([])
  const [modes, setModes]       = useState<string[]>([])
  const [sort, setSort]         = useState<"newest" | "az">("newest")
  const resultsRef = useRef<HTMLDivElement>(null)

  const toggle = (arr: string[], set: (v: string[]) => void, val: string) =>
    set(arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val])
  const clearAll = () => { setSearch(""); setLocation(""); setTypes([]); setModes([]) }
  const scrollToResults = () => setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 60)

  const filtered = useMemo(() => {
    const q = search.toLowerCase(), loc = location.toLowerCase()
    let r = jobs.filter(j =>
      (!q || j.title.toLowerCase().includes(q) || j.company.toLowerCase().includes(q) || (j.department || "").toLowerCase().includes(q)) &&
      (!loc || j.location.toLowerCase().includes(loc)) &&
      (types.length === 0 || types.includes(j.type || "Full Time")) &&
      (modes.length === 0 || modes.includes(j.mode || "On-site"))
    )
    if (sort === "az") r = [...r].sort((a, b) => a.title.localeCompare(b.title))
    return r
  }, [jobs, search, location, types, modes, sort])

  const activeCount = types.length + modes.length + (search ? 1 : 0) + (location ? 1 : 0)

  const companies = useMemo(() => Array.from(new Set(jobs.map(j => j.company))), [jobs])

  // Resume matching
  const [profile, setProfile] = useState<ResumeProfile | null>(null)
  const [parsing, setParsing] = useState(false)
  const [resumeName, setResumeName] = useState("")
  const [resumeErr, setResumeErr] = useState("")

  async function onResumeFile(file: File) {
    setResumeErr(""); setParsing(true); setResumeName(file.name)
    try {
      const text = await parseResume(file)
      if (!text || text.trim().length < 40) { setResumeErr("Couldn't read enough text — try a PDF resume."); setProfile(null) }
      else { setProfile(buildProfile(text)); scrollToResults() }
    } catch { setResumeErr("Couldn't parse this file. Please try a PDF."); setProfile(null) }
    finally { setParsing(false) }
  }
  const clearResume = () => { setProfile(null); setResumeName(""); setResumeErr("") }

  // Rank by match score when a resume profile exists
  const ranked = useMemo(() => {
    if (!profile) return filtered.map(j => ({ job: j, score: undefined as number | undefined }))
    return filtered
      .map(j => ({ job: j, score: scoreJob(j, profile) }))
      .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
  }, [filtered, profile])

  // Pagination — render in pages so 5,000+ jobs stay fast
  const PAGE = 48
  const [visible, setVisible] = useState(PAGE)
  useEffect(() => { setVisible(PAGE) }, [search, location, types, modes, sort, profile])
  const shown = ranked.slice(0, visible)

  return (
    <>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulseDot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.35;transform:scale(1.6)} }
        .jb-inp{border:none;background:transparent;font-size:15px;color:#111827;width:100%;}
        .jb-inp:focus{outline:none;}
        .jb-inp::placeholder{color:#9ca3af;}
        .jb-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;}
        @media(max-width:1200px){ .jb-grid{grid-template-columns:repeat(3,1fr)} }
        @media(max-width:900px){ .jb-grid{grid-template-columns:repeat(2,1fr)} }
        @media(max-width:600px){
          .jb-grid{grid-template-columns:1fr}
          .jb-hero-h{font-size:38px!important}
          .jb-search{flex-direction:column!important;padding:12px!important;border-radius:20px!important}
          .jb-search-div{display:none!important}
          .jb-search-btn{width:100%!important;justify-content:center!important}
          .jb-search-cell{width:100%!important}
        }
      `}</style>

      <div style={{ background: "#fafafa", minHeight: "100vh", overflowX: "hidden", width: "100%" }}>
        {/* ══════════════════════════════════════════════════════
            HERO
        ══════════════════════════════════════════════════════ */}
        <section style={{ maxWidth: 900, margin: "0 auto", padding: "116px 24px 20px", textAlign: "center" }}>
          {/* Live badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 11, marginBottom: 26, padding: "6px 16px 6px 8px", borderRadius: 99, background: "white", border: "1px solid #e5e7eb", boxShadow: "0 2px 10px rgba(15,23,42,0.05)", animation: "fadeUp 0.5s ease both" }}>
            {/* Overlapping company logos */}
            <div style={{ display: "flex", alignItems: "center" }}>
              {companies.slice(0, 5).map((name, i) => <BadgeLogo key={name} name={name} index={i} />)}
            </div>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#374151", letterSpacing: "-0.01em" }}>
              <span style={{ fontWeight: 800, color: NAVY }}>500+</span> companies hiring now
            </span>
          </div>

          <h1 className="jb-hero-h" style={{
            fontSize: "clamp(38px,6vw,64px)", fontWeight: 800, color: "#0f172a",
            letterSpacing: "-0.04em", lineHeight: 1.05, margin: "0 0 18px",
            animation: "fadeUp 0.5s ease 0.08s both",
          }}>
            Discover roles at India&apos;s<br />
            <span style={{ color: NAVY }}>
              fastest-growing companies.
            </span>
          </h1>
          <p style={{ fontSize: 17, color: "#6b7280", fontWeight: 400, maxWidth: 500, margin: "0 auto 36px", lineHeight: 1.6, letterSpacing: "-0.01em", animation: "fadeUp 0.5s ease 0.16s both" }}>
            Hand-picked jobs &amp; internships from top startups — no noise, only the roles worth your time.
          </p>

          {/* Contained search bar: title + location + button */}
          <div className="jb-search" style={{ display: "flex", alignItems: "center", gap: 6, background: "white", border: "1.5px solid #e5e7eb", borderRadius: 99, padding: "7px 7px 7px 20px", maxWidth: 720, margin: "0 auto 24px", boxShadow: "0 10px 40px rgba(29,58,143,0.08)", animation: "fadeUp 0.5s ease 0.24s both" }}>
            <div className="jb-search-cell" style={{ flex: 1.6, display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
              <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" style={{ flexShrink: 0 }}><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
              <input className="jb-inp" value={search} onChange={e => setSearch(e.target.value)} onKeyDown={e => e.key === "Enter" && scrollToResults()} placeholder="Job title, company, or skill" />
            </div>
            <div className="jb-search-div" style={{ width: 1, height: 26, background: "#e5e7eb" }} />
            <div className="jb-search-cell" style={{ flex: 1, display: "flex", alignItems: "center", gap: 8, minWidth: 0, paddingLeft: 4 }}>
              <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
              <input className="jb-inp" value={location} onChange={e => setLocation(e.target.value)} onKeyDown={e => e.key === "Enter" && scrollToResults()} placeholder="Location" />
            </div>
            <button className="jb-search-btn" onClick={scrollToResults}
              style={{ flexShrink: 0, display: "flex", alignItems: "center", gap: 7, padding: "12px 26px", borderRadius: 99, background: NAVY, color: "white", border: "none", fontSize: 14.5, fontWeight: 700, cursor: "pointer", letterSpacing: "-0.01em", transition: "opacity 0.15s" }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.88")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
              Search
            </button>
          </div>

          {/* Quick filter chips */}
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: 9, animation: "fadeUp 0.5s ease 0.32s both" }}>
            {TYPE_CHIPS.map(t => <Pill key={t} label={t} active={types.includes(t)} onClick={() => { toggle(types, setTypes, t); scrollToResults() }} />)}
            <span style={{ width: 1, height: 20, background: "#e5e7eb", margin: "0 3px" }} />
            {MODE_CHIPS.map(m => <Pill key={m} label={m} active={modes.includes(m)} onClick={() => { toggle(modes, setModes, m); scrollToResults() }} />)}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            RESULTS
        ══════════════════════════════════════════════════════ */}
        <section ref={resultsRef} style={{ maxWidth: 1280, margin: "0 auto", padding: "40px 24px 100px" }}>
          {/* ── RESUME MATCH ─────────────────────────────────────── */}
          <input id="jb-resume" type="file" accept=".pdf,.txt" style={{ display: "none" }}
            onChange={e => { const f = e.target.files?.[0]; if (f) onResumeFile(f); e.currentTarget.value = "" }} />

          {!profile ? (
            <div
              onDragOver={e => e.preventDefault()}
              onDrop={e => { e.preventDefault(); const f = e.dataTransfer.files?.[0]; if (f) onResumeFile(f) }}
              style={{ background: "white", border: "1.5px dashed #c7d2fe", borderRadius: 20, padding: "22px 24px", marginBottom: 28, display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
              <div style={{ width: 52, height: 52, borderRadius: 14, background: "#eef2ff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: NAVY }}>
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M12 18v-6M9 15l3-3 3 3" /></svg>
              </div>
              <div style={{ flex: 1, minWidth: 220 }}>
                <div style={{ fontSize: 16.5, fontWeight: 800, color: "#0f172a", letterSpacing: "-0.02em" }}>Upload your resume — get matched instantly</div>
                <div style={{ fontSize: 13.5, color: "#6b7280", marginTop: 3, lineHeight: 1.5 }}>
                  We&rsquo;ll rank all {jobs.length.toLocaleString("en-IN")} jobs by how well they fit your skills. PDF, processed on-device — nothing leaves your browser.
                </div>
                {resumeErr && <div style={{ fontSize: 12.5, color: "#dc2626", marginTop: 6, fontWeight: 600 }}>{resumeErr}</div>}
              </div>
              <label htmlFor="jb-resume" style={{ flexShrink: 0, display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 26px", borderRadius: 99, background: parsing ? "#94a3b8" : NAVY, color: "white", fontSize: 14.5, fontWeight: 700, cursor: parsing ? "wait" : "pointer", letterSpacing: "-0.01em" }}>
                {parsing ? "Reading resume…" : "Upload resume"}
              </label>
            </div>
          ) : (
            <div style={{ background: "linear-gradient(135deg,#eef4ff,#f6f9ff)", border: "1.5px solid #c7d2fe", borderRadius: 20, padding: "20px 24px", marginBottom: 28, display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 15.5, fontWeight: 800, color: "#0f172a", letterSpacing: "-0.01em", display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 20, height: 20, borderRadius: "50%", background: "#16a34a", color: "white", flexShrink: 0 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                  </span>
                  Matched to your resume — you look like a <span style={{ color: NAVY }}>{profile.role}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap", marginTop: 10 }}>
                  {profile.seniority && (
                    <span style={{ fontSize: 11.5, fontWeight: 700, color: NAVY, background: "white", border: "1px solid #c7d2fe", padding: "4px 10px", borderRadius: 99 }}>{profile.seniority}</span>
                  )}
                  {profile.skills.slice(0, 7).map(s => (
                    <span key={s} style={{ fontSize: 11.5, fontWeight: 600, color: "#374151", background: "white", border: "1px solid #e5e7eb", padding: "4px 10px", borderRadius: 99, textTransform: "capitalize" }}>{s}</span>
                  ))}
                  {profile.skills.length === 0 && <span style={{ fontSize: 12.5, color: "#6b7280" }}>Ranked by role &amp; title relevance</span>}
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                <label htmlFor="jb-resume" style={{ fontSize: 13, fontWeight: 700, color: NAVY, background: "white", border: "1.5px solid #c7d2fe", borderRadius: 10, padding: "9px 14px", cursor: "pointer" }}>Change</label>
                <button onClick={clearResume} style={{ fontSize: 13, fontWeight: 600, color: "#6b7280", background: "transparent", border: "1.5px solid #e5e7eb", borderRadius: 10, padding: "9px 14px", cursor: "pointer" }}>Clear</button>
              </div>
            </div>
          )}

          {/* Header row */}
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 14, marginBottom: 26 }}>
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: "#0f172a", margin: "0 0 4px", letterSpacing: "-0.03em" }}>
                {profile ? "Best matches for you" : activeCount > 0 ? "Matching roles" : "All open roles"}
              </h2>
              <p style={{ fontSize: 14, color: "#6b7280", margin: 0, fontWeight: 500 }}>
                <span style={{ color: NAVY, fontWeight: 700 }}>{filtered.length}</span> {filtered.length === 1 ? "role" : "roles"} · updated daily
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {activeCount > 0 && (
                <button onClick={clearAll} style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 13, fontWeight: 600, color: "#6b7280", background: "white", border: "1.5px solid #e5e7eb", borderRadius: 10, padding: "9px 14px", cursor: "pointer", transition: "all 0.15s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = NAVY; e.currentTarget.style.color = NAVY }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "#e5e7eb"; e.currentTarget.style.color = "#6b7280" }}>
                  Clear all ({activeCount})
                </button>
              )}
              <select value={sort} onChange={e => setSort(e.target.value as "newest" | "az")}
                style={{ padding: "9px 32px 9px 14px", borderRadius: 10, border: "1.5px solid #e5e7eb", background: "white", fontSize: 13, fontWeight: 600, color: "#374151", cursor: "pointer", appearance: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2.5' stroke-linecap='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 10px center" }}>
                <option value="newest">Newest first</option>
                <option value="az">A → Z</option>
              </select>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "90px 24px", animation: "fadeUp 0.35s ease both" }}>
              <div style={{ fontSize: 40, marginBottom: 14 }}>🔍</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: "#111827", marginBottom: 8, letterSpacing: "-0.02em" }}>No roles match your search</div>
              <div style={{ fontSize: 15, color: "#6b7280", marginBottom: 24 }}>Try a different keyword or clear your filters.</div>
              <button onClick={clearAll} style={{ padding: "12px 26px", borderRadius: 12, border: "none", background: NAVY, color: "white", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
                Clear all filters
              </button>
            </div>
          ) : (
            <>
              <div className="jb-grid">
                {shown.map(({ job, score }, i) => <JobCard key={`${job.id}-${i}`} job={job} index={i % PAGE} matchPct={score} />)}
              </div>

              {visible < filtered.length && (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, marginTop: 40 }}>
                  <button onClick={() => setVisible(v => v + PAGE)}
                    style={{ padding: "13px 34px", borderRadius: 99, border: "1.5px solid #1d3a8f", background: "white", color: "#1d3a8f", fontSize: 14.5, fontWeight: 700, cursor: "pointer", transition: "all 0.15s" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "#1d3a8f"; e.currentTarget.style.color = "white" }}
                    onMouseLeave={e => { e.currentTarget.style.background = "white"; e.currentTarget.style.color = "#1d3a8f" }}>
                    Load more jobs
                  </button>
                  <span style={{ fontSize: 13, color: "#8a97b0", fontWeight: 500 }}>
                    Showing {shown.length.toLocaleString("en-IN")} of {filtered.length.toLocaleString("en-IN")} roles
                  </span>
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </>
  )
}
