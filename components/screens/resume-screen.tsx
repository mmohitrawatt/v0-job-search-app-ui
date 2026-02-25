"use client"

const resumes = [
  { name: "AI Engineer Resume", edited: "2 days ago", score: 92, scoreColor: "text-emerald-600 bg-emerald-50" },
  { name: "ML Scientist CV", edited: "1 week ago", score: 78, scoreColor: "text-amber-600 bg-amber-50" },
  { name: "Backend Dev Resume", edited: "2 weeks ago", score: 65, scoreColor: "text-orange-600 bg-orange-50" },
  { name: "Full Stack Resume", edited: "1 month ago", score: 71, scoreColor: "text-blue-600 bg-blue-50" },
]

function ResumeIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect x="3" y="2" width="22" height="24" rx="4" fill="currentColor" opacity="0.12" />
      <rect x="3" y="2" width="22" height="24" rx="4" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8.5 9H19.5M8.5 13H16M8.5 17H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function ResumeScreen() {
  return (
    <div className="flex-1 overflow-y-auto bg-background">
      <div className="px-4 pt-14 pb-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Your Resumes</h1>
          <p className="text-sm text-muted-foreground mt-0.5 font-medium">AI-powered resume builder</p>
        </div>

        {/* Primary CTA Card */}
        <div className="bg-primary rounded-[14px] p-5 mb-3 shadow-card card-tap cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-[12px] bg-white/20 flex items-center justify-center text-primary-foreground flex-shrink-0">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L13.8 7.4L19.5 7.9L15.2 11.6L16.6 17.1L12 14.2L7.4 17.1L8.8 11.6L4.5 7.9L10.2 7.4L12 2Z" fill="white" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-base font-bold text-primary-foreground leading-tight">Create Resume with AI</p>
              <p className="text-[12px] text-primary-foreground/70 mt-0.5 font-medium">Generate a tailored resume in seconds</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M5 3L9 7L5 11" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>

        {/* Secondary CTA */}
        <div className="bg-card rounded-[14px] p-4 mb-6 border border-border shadow-card card-tap cursor-pointer">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-[10px] bg-accent flex items-center justify-center text-primary flex-shrink-0">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 3V14M10 14L6.5 10.5M10 14L13.5 10.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M3 17H17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-[14px] font-semibold text-foreground leading-tight">Upload & Improve Existing Resume</p>
              <p className="text-[11px] text-muted-foreground mt-0.5 font-medium">Get AI-powered suggestions</p>
            </div>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-muted-foreground flex-shrink-0">
              <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* My Resumes */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold text-foreground">My Resumes</h2>
          <button className="text-xs text-primary font-semibold">Manage</button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {resumes.map((resume) => (
            <div key={resume.name} className="bg-card rounded-[14px] p-3.5 shadow-card border border-border card-tap">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-[10px] bg-accent flex items-center justify-center text-primary flex-shrink-0">
                  <ResumeIcon />
                </div>
                <button className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M9.5 2L12 4.5L4.5 12H2V9.5L9.5 2Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
              <p className="text-[12px] font-semibold text-foreground leading-tight mb-1 text-balance">{resume.name}</p>
              <p className="text-[10px] text-muted-foreground font-medium mb-2.5">{resume.edited}</p>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${resume.scoreColor}`}>
                ATS {resume.score}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
