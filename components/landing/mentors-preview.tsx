import Link from "next/link"
import Image from "next/image"

const MENTORS = [
  { name: "Shubham Kaushik", role: "AI Researcher", company: "KPMG", photo: "/mentors/shubham-kaushik.jpg", color: "#b45309", bg: "#fffbeb", desc: "5+ years in AI, ML & full-stack. Research on LLMs & financial AI." },
  { name: "Jitesh Vijaykumar", role: "AI Engineer", company: "KPMG", photo: "/mentors/jitesh-vijaykumar.jpg", color: "#7c3aed", bg: "#f5f3ff", desc: "5+ years building scalable AI solutions for enterprise systems." },
  { name: "Sonic Payeng", role: "Software Engineer 2", company: "Dell Technologies", photo: "/mentors/sonic-payeng.jpg", color: "#16a34a", bg: "#f0fdf4", desc: "AI engineer building automation platforms. M.Tech from MNNIT." },
  { name: "Aditya Dubey", role: "AI Engineer", company: "Cograd", photo: "/mentors/aditya-dubey.jpg", color: "#1d3a8f", bg: "#eef1fd", desc: "Mentored 12,000+ professionals in AI. M.Tech from NIT Allahabad." },
  { name: "Bipin Chaudhary", role: "Full Stack Developer", company: "SAP (Ex-Intern)", photo: "/mentors/bipin-chaudhary.jpg", color: "#0369a1", bg: "#e0f2fe", desc: "2.5+ years in JS, TypeScript, Angular & Node.js. Passionate about teaching." },
  { name: "Tarsh Vaibhav", role: "Embedded SWE & DSA Trainer", company: "Wabtec Corporation", photo: "/mentors/tarsh-vaibhav.jpg", color: "#dc2626", bg: "#fef2f2", desc: "MNNIT grad, trained 500+ students in DSA. Makes concepts interview-ready." },
]

export function MentorsPreview() {
  return (
    <section className="py-20 sm:py-28 bg-white" id="mentors">
      <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[13px] font-semibold text-[#1d3a8f] uppercase tracking-[0.12em] mb-3">Mentors</p>
          <h2 className="text-[clamp(26px,3.5vw,38px)] font-black text-slate-900 tracking-[-0.03em] leading-[1.15] mb-3">
            Learn From Industry Leaders
          </h2>
          <p className="text-[15px] text-slate-500 leading-relaxed max-w-[460px] mx-auto">
            Working professionals from KPMG, Dell, SAP, PhonePe, HCLTech, Zepto & more — guiding the next generation.
          </p>
        </div>

        {/* Mentor cards — compact horizontal layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {MENTORS.map((m, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-slate-200/60 overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
            >
              {/* Top color accent */}
              <div className="h-[3px]" style={{ background: `linear-gradient(90deg, ${m.color}, ${m.color}88)` }} />

              <div className="p-4 sm:p-4">
                {/* Avatar + info row */}
                <div className="flex items-center gap-3 mb-2.5">
                  <div
                    className="w-12 h-12 rounded-xl flex-shrink-0 overflow-hidden"
                    style={{ border: `2px solid ${m.bg}` }}
                  >
                    <Image
                      src={m.photo}
                      alt={m.name}
                      width={48}
                      height={48}
                      className="object-cover object-top w-full h-full"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-[14px] font-extrabold text-slate-900 leading-tight">{m.name}</h3>
                    <p className="text-[11px] font-semibold" style={{ color: m.color }}>{m.role}</p>
                    <span
                      className="inline-block text-[10px] font-bold px-2 py-[2px] rounded mt-1"
                      style={{ background: m.bg, color: m.color }}
                    >
                      {m.company}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-[12px] text-slate-500 leading-[1.6] line-clamp-2">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats bar */}
        <div className="flex items-center justify-center gap-6 mt-8 mb-6">
          {[
            { val: "20+", label: "Mentors" },
            { val: "6+", label: "Companies" },
            { val: "4.6", label: "Avg Rating" },
            { val: "5+", label: "Active Now" },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-[18px] font-black text-[#7c3aed]">{s.val}</div>
              <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/mentors"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-[14px] font-bold text-white shadow-[0_4px_16px_rgba(124,58,237,0.2)] transition-all hover:-translate-y-0.5"
            style={{ background: "linear-gradient(135deg, #7c3aed, #3b5bdb)" }}
          >
            View All Mentors
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
