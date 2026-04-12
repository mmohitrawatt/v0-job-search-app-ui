import Link from "next/link"
import { JobingenLogo } from "@/components/jobingen-logo"

const FOOTER_LINKS = [
  {
    title: "Product",
    links: [
      { label: "Jobs", href: "/jobs" },
      { label: "AI Tools", href: "#ai-tools" },
      { label: "Bootcamps", href: "#bootcamps" },
      { label: "Resources", href: "#how-it-works" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Student Insights", href: "/student-insights" },
      { label: "Interview Experience", href: "/interview-feedback" },
      { label: "Become a Mentor", href: "/become-mentor" },
      { label: "Reviews", href: "/reviews" },
      { label: "Campus Ambassador", href: "/campus-ambassador" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#community" },
      { label: "Register", href: "/register" },
      { label: "Contact", href: "mailto:hello@jobingen.com" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
    ],
  },
]

const SOCIALS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/jobingen",
    useFill: false,
    icon: <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/jobingen.ai/",
    useFill: false,
    icon: <><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1.5" /></>,
  },
  {
    label: "Discord",
    href: "https://discord.com/invite/aVWx54Cp3V",
    useFill: true,
    icon: <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />,
  },
]

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 pt-20 pb-10">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        {/* Top */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-6 sm:gap-10 mb-14">
          {/* Brand */}
          <div className="col-span-2">
            <div className="mb-4">
              <JobingenLogo height={70} style={{ filter: "brightness(0) invert(1)" }} />
            </div>
            <p className="text-[14px] text-slate-500 leading-[1.7] max-w-[280px] mb-5">
              AI-powered career platform for students and professionals. Find jobs, build skills, and get career-ready.
            </p>
            <div className="flex items-center gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-slate-800/60 hover:bg-slate-700 flex items-center justify-center text-slate-500 hover:text-slate-300 transition-all duration-200"
                  aria-label={s.label}
                >
                    <svg width="16" height="16" fill={s.useFill ? "currentColor" : "none"} viewBox="0 0 24 24" stroke={s.useFill ? "none" : "currentColor"} strokeWidth={s.useFill ? 0 : 1.8} strokeLinecap="round" strokeLinejoin="round">
                    {s.icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_LINKS.map((col) => (
            <div key={col.title}>
              <h4 className="text-[12px] font-bold text-slate-500 uppercase tracking-widest mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-[14px] text-slate-500 hover:text-slate-300 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[13px] text-slate-600">
            &copy; {new Date().getFullYear()} Jobingen. All rights reserved.
          </p>
          <p className="text-[12px] text-slate-700">
            Built with care in India
          </p>
        </div>
      </div>
    </footer>
  )
}
