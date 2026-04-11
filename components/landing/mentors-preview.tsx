import Link from "next/link"
import Image from "next/image"

const MENTORS = [
  { name: "Aditya Dubey", role: "AI Consultant", company: "Cograd", photo: "/mentors/aditya-dubey.jpg", color: "#1d3a8f", bg: "#eef1fd", desc: "Mentored 12,000+ professionals in AI. M.Tech from NIT Allahabad." },
  { name: "Sonic Payeng", role: "Software Engineer 2", company: "Dell Technologies", photo: "/mentors/sonic-payeng.jpg", color: "#16a34a", bg: "#f0fdf4", desc: "AI engineer building automation platforms. M.Tech from MNNIT." },
  { name: "Jitesh Vijaykumar", role: "AI Engineer", company: "KPMG", photo: "/mentors/jitesh-vijaykumar.jpg", color: "#7c3aed", bg: "#f5f3ff", desc: "5+ years building scalable AI solutions for enterprise systems." },
  { name: "Shubham Kaushik", role: "AI Researcher", company: "KPMG", photo: "/mentors/shubham-kaushik.jpg", color: "#b45309", bg: "#fffbeb", desc: "5+ years in AI, ML & full-stack. Research on LLMs & financial AI." },
  { name: "Bipin Chaudhary", role: "Full Stack Developer", company: "SAP (Ex-Intern)", photo: "/mentors/bipin-chaudhary.jpg", color: "#0369a1", bg: "#e0f2fe", desc: "2.5+ years in JS, TypeScript, Angular & Node.js. Passionate about teaching." },
  { name: "Tarsh Vaibhav", role: "Embedded SWE & DSA Trainer", company: "Wabtec Corporation", photo: "/mentors/tarsh-vaibhav.jpg", color: "#dc2626", bg: "#fef2f2", desc: "MNNIT grad, trained 500+ students in DSA. Makes concepts interview-ready." },
]

export function MentorsPreview() {
  return (
    <section className="py-20 bg-[#fafbff]" id="mentors">
      <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 border border-purple-100 mb-4">
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <span className="text-[12px] font-bold text-[#7c3aed]">Our Mentors</span>
          </div>
          <h2 className="text-[clamp(26px,3.5vw,38px)] font-black text-slate-900 tracking-[-0.03em] leading-[1.15] mb-3">
            Learn From Industry Leaders
          </h2>
          <p className="text-[15px] text-slate-500 leading-relaxed max-w-[460px] mx-auto">
            Working professionals from top companies, guiding the next generation on their career journey.
          </p>
        </div>

        {/* Mentor cards */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
          {MENTORS.map((m, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-slate-200/60 overflow-hidden transition-all duration-200 hover:-translate-y-1.5 hover:shadow-[0_16px_48px_rgba(0,0,0,0.1)]"
            >
              {/* Photo */}
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <Image
                  src={m.photo}
                  alt={m.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <span
                  className="absolute bottom-2.5 left-2.5 text-[9px] font-bold px-2 py-0.5 rounded-md text-white backdrop-blur-sm"
                  style={{ background: `${m.color}cc` }}
                >
                  {m.company}
                </span>
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="text-[14px] font-extrabold text-slate-900 leading-tight mb-0.5">{m.name}</h3>
                <p className="text-[11px] font-semibold mb-2.5" style={{ color: m.color }}>{m.role}</p>
                <p className="text-[11.5px] text-slate-500 leading-[1.6]">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
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
