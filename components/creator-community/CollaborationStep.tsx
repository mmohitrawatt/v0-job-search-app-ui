import type { FormData } from "./types"

const CONTENT_TYPES = [
  { value: "reels",      label: "🎬 Reels / Short Videos" },
  { value: "career",     label: "🎯 Career Guidance" },
  { value: "coding",     label: "💻 Coding / Tech Content" },
  { value: "placement",  label: "📋 Placement Preparation" },
  { value: "motivation", label: "🔥 Motivational Content" },
]

const COLLAB_OPTIONS = [
  {
    value: "barter",
    label: "Barter Collaboration",
    desc: "Platform perks, bootcamp access & mentorship in exchange for content",
    icon: "🔄",
  },
  {
    value: "ambassador",
    label: "Creator Ambassador",
    desc: "Official Jobingen Creator Ambassador — build your portfolio & credibility",
    icon: "🎖️",
  },
  {
    value: "internship",
    label: "Content Internship",
    desc: "Structured internship with a certificate and real startup experience",
    icon: "💼",
  },
  {
    value: "open",
    label: "Open to Discussion",
    desc: "Let's talk and figure out the best arrangement together",
    icon: "🤝",
  },
]

const POSTS_PER_WEEK = [
  { value: "1-2", label: "1 – 2 posts" },
  { value: "3-5", label: "3 – 5 posts" },
  { value: "5+",  label: "5+ posts" },
]

interface Props {
  data: FormData
  onChange: (key: keyof FormData, value: string | string[]) => void
  errors: Partial<Record<keyof FormData, string>>
}

export function CollaborationStep({ data, onChange, errors }: Props) {
  const toggleType = (value: string) => {
    const next = data.contentTypes.includes(value)
      ? data.contentTypes.filter(v => v !== value)
      : [...data.contentTypes, value]
    onChange("contentTypes", next)
  }

  return (
    <div className="cc-step-body">
      <div className="cc-step-top">
        <div className="cc-step-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="#1d3a8f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h2 className="cc-step-title">Content & Collaboration</h2>
        <p className="cc-step-desc">What you create and how you&apos;d like to work with us.</p>
      </div>

      <div className="cc-fields">
        <div className="cc-field">
          <label className="cc-label">What type of content do you create? <span className="cc-req">*</span></label>
          <p className="cc-field-hint">Select all that apply</p>
          <div className="cc-chip-grid">
            {CONTENT_TYPES.map(ct => (
              <button
                key={ct.value}
                type="button"
                className={`cc-chip${data.contentTypes.includes(ct.value) ? " selected" : ""}`}
                onClick={() => toggleType(ct.value)}
              >
                {data.contentTypes.includes(ct.value) && (
                  <svg width="13" height="13" viewBox="0 0 12 12" fill="none" style={{ marginRight: 6, flexShrink: 0 }}>
                    <path d="M2 6L5 9L10 3" stroke="#1d3a8f" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
                {ct.label}
              </button>
            ))}
          </div>
          {errors.contentTypes && <span className="cc-error">{errors.contentTypes as string}</span>}
        </div>

        <div className="cc-field">
          <label className="cc-label">Preferred Collaboration Model <span className="cc-req">*</span></label>
          <div className="cc-collab-grid">
            {COLLAB_OPTIONS.map(opt => (
              <button
                key={opt.value}
                type="button"
                className={`cc-collab-card${data.collaborationModel === opt.value ? " selected" : ""}`}
                onClick={() => onChange("collaborationModel", opt.value)}
              >
                <div className="cc-collab-card-top">
                  <span className="cc-collab-icon">{opt.icon}</span>
                  {data.collaborationModel === opt.value && (
                    <div className="cc-collab-check">
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}
                </div>
                <p className="cc-collab-title">{opt.label}</p>
                <p className="cc-collab-desc">{opt.desc}</p>
              </button>
            ))}
          </div>
          {errors.collaborationModel && <span className="cc-error">{errors.collaborationModel}</span>}
        </div>

        <div className="cc-field">
          <label className="cc-label">Posts per week you can commit to <span className="cc-req">*</span></label>
          <div className="cc-radio-row">
            {POSTS_PER_WEEK.map(opt => (
              <label
                key={opt.value}
                className={`cc-radio-chip${data.postsPerWeek === opt.value ? " selected" : ""}`}
              >
                <input
                  type="radio"
                  name="postsPerWeek"
                  value={opt.value}
                  checked={data.postsPerWeek === opt.value}
                  onChange={() => onChange("postsPerWeek", opt.value)}
                  style={{ display: "none" }}
                />
                {opt.label}
              </label>
            ))}
          </div>
          {errors.postsPerWeek && <span className="cc-error">{errors.postsPerWeek}</span>}
        </div>
      </div>
    </div>
  )
}
