"use client"

import Link from "next/link"
import { Search, ArrowRight, MapPin, TrendingUp } from "lucide-react"

/* ── Real roles shown in the live-feed window ─────────────────────────────── */
const FEED: Array<{ role: string; company: string; domain: string; loc: string; pay: string; ago: string; fresh?: boolean }> = [
  { role: "Backend Engineer",   company: "Razorpay", domain: "razorpay.com", loc: "Bengaluru", pay: "₹18–32 LPA", ago: "just now", fresh: true },
  { role: "Product Designer",   company: "Swiggy",   domain: "swiggy.com",   loc: "Bengaluru", pay: "₹18–30 LPA", ago: "6m ago",   fresh: true },
  { role: "Data Scientist",     company: "Meesho",   domain: "meesho.com",   loc: "Bengaluru", pay: "₹22–38 LPA", ago: "14m ago" },
  { role: "SDE II",             company: "Flipkart", domain: "flipkart.com", loc: "Bengaluru", pay: "₹26–44 LPA", ago: "28m ago" },
  { role: "ML Engineer",        company: "CRED",     domain: "cred.club",    loc: "Bengaluru", pay: "₹24–40 LPA", ago: "41m ago" },
  { role: "Software Engineer",  company: "Google",   domain: "google.com",   loc: "Hyderabad", pay: "₹35–60 LPA", ago: "1h ago" },
  { role: "Android Engineer",   company: "PhonePe",  domain: "phonepe.com",  loc: "Bengaluru", pay: "₹20–34 LPA", ago: "1h ago" },
  { role: "Product Manager",    company: "Groww",    domain: "groww.in",     loc: "Bengaluru", pay: "₹30–48 LPA", ago: "2h ago" },
  { role: "SDE II",             company: "Amazon",   domain: "amazon.com",   loc: "Bengaluru", pay: "₹32–55 LPA", ago: "2h ago" },
  { role: "Data Analyst",       company: "Zomato",   domain: "zomato.com",   loc: "Gurugram",  pay: "₹9–16 LPA",  ago: "3h ago" },
]

/* Real company logos for the trust marquee */
const LOGO_DOMAINS = [
  "google.com", "amazon.com", "microsoft.com", "flipkart.com", "razorpay.com", "swiggy.com",
  "zomato.com", "phonepe.com", "cred.club", "meesho.com", "groww.in", "paytm.com",
  "adobe.com", "atlassian.com", "salesforce.com", "postman.com",
]

function fav(domain: string) {
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`
}

function FeedRow({ job }: { job: typeof FEED[0] }) {
  return (
    <Link href="/jobs"
      className="group flex items-center gap-3.5 rounded-2xl px-4 py-3.5 transition-all hover:shadow-md"
      style={{ background: "#fff", border: "1px solid #eef1f6" }}>
      <span className="w-11 h-11 rounded-xl grid place-items-center overflow-hidden shrink-0"
        style={{ background: "#fff", border: "1px solid #eef1f6" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={fav(job.domain)} alt={job.company} className="w-6 h-6 object-contain" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2">
          <span className="text-[14px] font-bold truncate" style={{ color: "#0c1a35" }}>{job.role}</span>
          {job.fresh && (
            <span className="shrink-0 text-[9px] font-extrabold uppercase tracking-wide px-1.5 py-0.5 rounded"
              style={{ background: "#dcfce7", color: "#15803d" }}>New</span>
          )}
        </span>
        <span className="flex items-center gap-1.5 text-[12px] font-medium mt-0.5" style={{ color: "#8a97b0" }}>
          <span className="truncate">{job.company}</span>
          <span style={{ color: "#cbd5e1" }}>·</span>
          <MapPin size={11} strokeWidth={2.4} className="shrink-0" />
          <span className="truncate">{job.loc}</span>
        </span>
      </span>
      <span className="shrink-0 flex flex-col items-end gap-1">
        <span className="text-[11.5px] font-bold px-2 py-1 rounded-lg whitespace-nowrap"
          style={{ background: "#eef2ff", color: "#1d3a8f" }}>{job.pay}</span>
        <span className="text-[10.5px] font-medium" style={{ color: "#a3adc2" }}>{job.ago}</span>
      </span>
    </Link>
  )
}

export function JobHubStats() {
  const feedLoop = [...FEED, ...FEED]
  const logoLoop = [...LOGO_DOMAINS, ...LOGO_DOMAINS]

  return (
    <section className="py-16 sm:py-24 overflow-hidden" style={{ background: "#ffffff" }}>
      <style>{`
        @keyframes jhUp { from { transform: translateY(0) } to { transform: translateY(-50%) } }
        @keyframes jhLeft { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        .jh-up { animation: jhUp 24s linear infinite; }
        .jh-win:hover .jh-up { animation-play-state: paused; }
        .jh-left { animation: jhLeft 30s linear infinite; }
        .jh-logos:hover .jh-left { animation-play-state: paused; }
      `}</style>

      <div className="max-w-[1180px] mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* ── LEFT: value + search ─────────────────────────────── */}
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-5">
              <span className="w-6 h-[2px] rounded-full" style={{ background: "#1d3a8f" }} />
              <span className="text-[12px] font-extrabold tracking-[0.16em] uppercase" style={{ color: "#1d3a8f" }}>
                One search · every job
              </span>
            </div>

            <h2 className="mb-5"
              style={{ fontSize: "clamp(27px,6.5vw,52px)", fontWeight: 900, lineHeight: 1.08, letterSpacing: "-0.04em", color: "#0c1a35" }}>
              Access <span style={{ color: "#1d3a8f" }}>India&rsquo;s largest job hub</span> in one place
            </h2>

            <p className="text-[16px] leading-relaxed mb-8 max-w-[440px]" style={{ color: "#475569", fontWeight: 500 }}>
              Every role from LinkedIn, Naukri, Indeed &amp; 40+ sources — deduped, matched and ranked, so you only see the jobs worth your time.
            </p>

            {/* search → jobs hub */}
            <div className="rounded-2xl p-2 flex items-center gap-2 mb-6 max-w-[480px]"
              style={{ background: "#fff", border: "1.5px solid #e4e9f2", boxShadow: "0 10px 32px rgba(29,58,143,0.08)" }}>
              <div className="flex-1 flex items-center gap-2.5 px-3">
                <Search size={17} strokeWidth={2.4} style={{ color: "#94a3b8" }} />
                <input placeholder="Search 50,000+ live jobs…"
                  className="w-full bg-transparent outline-none text-[14.5px] font-medium placeholder:text-slate-400 py-3"
                  style={{ color: "#0c1a35" }} />
              </div>
              <Link href="/jobs"
                className="shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl text-[14.5px] font-bold text-white transition-all hover:brightness-110"
                style={{ background: "#1d3a8f", boxShadow: "0 6px 18px rgba(29,58,143,0.28)" }}>
                Search
              </Link>
            </div>

            {/* inline trust stats */}
            <div className="flex items-center flex-wrap gap-x-5 gap-y-2 mb-9">
              {[
                { n: "50,000+", l: "live jobs" },
                { n: "900+", l: "companies" },
                { n: "Hourly", l: "updates" },
              ].map((s, i) => (
                <div key={s.l} className="flex items-center gap-5">
                  {i > 0 && <span className="w-px h-8" style={{ background: "#dbe3f0" }} />}
                  <div>
                    <div className="text-[19px] font-black tracking-[-0.02em]" style={{ color: "#0c1a35" }}>{s.n}</div>
                    <div className="text-[12px] font-medium" style={{ color: "#8a97b0" }}>{s.l}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* company logo marquee */}
            <div>
              <div className="text-[12px] font-bold uppercase tracking-wider mb-3.5" style={{ color: "#a3adc2" }}>
                Sourcing roles from
              </div>
              <div className="jh-logos relative overflow-hidden"
                style={{ maskImage: "linear-gradient(90deg,transparent,#000 8%,#000 78%,transparent)", WebkitMaskImage: "linear-gradient(90deg,transparent,#000 8%,#000 78%,transparent)" }}>
                <div className="jh-left flex items-center gap-3" style={{ width: "max-content" }}>
                  {logoLoop.map((d, i) => (
                    <span key={`${d}-${i}`} className="w-11 h-11 rounded-xl grid place-items-center shrink-0"
                      style={{ background: "#fff", border: "1px solid #e7ecf4" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={fav(d)} alt="" className="w-6 h-6 object-contain" />
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT: live app window ───────────────────────────── */}
          <div className="relative min-w-0">
            {/* glow */}
            <div className="absolute -inset-4 rounded-[36px] blur-2xl opacity-60 -z-10"
              style={{ background: "radial-gradient(circle at 60% 30%, rgba(29,58,143,0.16), transparent 70%)" }} />

            <div className="rounded-[26px] overflow-hidden"
              style={{ background: "#fff", border: "1px solid #e7ecf4", boxShadow: "0 30px 70px rgba(15,23,42,0.14)" }}>
              {/* window header */}
              <div className="flex items-center gap-3 px-5 py-4" style={{ borderBottom: "1px solid #eef1f6", background: "#fbfcff" }}>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#ff5f57" }} />
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#febc2e" }} />
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#28c840" }} />
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <span className="inline-flex items-center gap-2 text-[12.5px] font-bold" style={{ color: "#0c1a35" }}>
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-70" style={{ background: "#16a34a" }} />
                      <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: "#16a34a" }} />
                    </span>
                    Live job feed
                  </span>
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-md" style={{ background: "#eef2ff", color: "#1d3a8f" }}>
                  <TrendingUp size={12} strokeWidth={2.6} /> 2.4k today
                </span>
              </div>

              {/* scrolling feed */}
              <div className="jh-win relative px-4 overflow-hidden" style={{ height: 336 }}>
                <div className="jh-up flex flex-col gap-3 py-4">
                  {feedLoop.map((job, i) => <FeedRow key={`${job.company}-${i}`} job={job} />)}
                </div>
                {/* top + bottom fades so cards emerge smoothly */}
                <div className="absolute left-0 right-0 top-0 h-8 pointer-events-none"
                  style={{ background: "linear-gradient(180deg,#fff,transparent)" }} />
                <div className="absolute left-0 right-0 bottom-0 h-10 pointer-events-none"
                  style={{ background: "linear-gradient(0deg,#fff,transparent)" }} />
              </div>

              {/* footer CTA — its own bar, no overlap */}
              <div className="px-4 py-4 flex items-center justify-between gap-3" style={{ borderTop: "1px solid #eef1f6", background: "#fbfcff" }}>
                <span className="text-[12.5px] font-medium" style={{ color: "#8a97b0" }}>
                  <span className="font-bold" style={{ color: "#0c1a35" }}>Live</span> · updated hourly
                </span>
                <Link href="/jobs"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-bold text-white transition-all hover:gap-3"
                  style={{ background: "#1d3a8f", boxShadow: "0 8px 22px rgba(29,58,143,0.28)" }}>
                  Browse all jobs <ArrowRight size={14} strokeWidth={2.6} />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
