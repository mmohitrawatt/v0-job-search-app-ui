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
    icon: <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/jobingen.ai/",
    icon: <><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1.5" /></>,
  },
  {
    label: "Twitter",
    href: "https://twitter.com/jobingen",
    icon: <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />,
  },
]

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-8">
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
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
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
