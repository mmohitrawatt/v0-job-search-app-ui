import type { FormData } from "./types"

const CONTENT_TYPES = [
  { value: "reels", label: "🎬 Reels / Short Videos" },
  { value: "career", label: "🎯 Career Guidance" },
  { value: "coding", label: "💻 Coding / Tech Content" },
  { value: "placement", label: "📋 Placement Preparation" },
  { value: "motivation", label: "🔥 Motivational Content" },
]

interface Props {
  data: FormData
  onChange: (key: keyof FormData, value: string | string[]) => void
  errors: Partial<Record<keyof FormData, string>>
}

export function ContentStep({ data, onChange, errors }: Props) {
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
            <path d="M15 10l4.553-2.277A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" stroke="#1d3a8f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h2 className="cc-step-title">Content & Audience</h2>
        <p className="cc-step-desc">Show us what you create and who you create it for.</p>
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
          {errors.contentTypes && <span className="cc-error">{errors.contentTypes}</span>}
        </div>

        <div className="cc-field">
          <label className="cc-label">Your Best 2–3 Posts <span className="cc-req">*</span></label>
          <p className="cc-field-hint">Paste direct links to posts that best represent your work — one per line</p>
          <textarea
            className={`cc-textarea${errors.bestPosts ? " cc-input-error" : ""}`}
            rows={4}
            placeholder={"https://instagram.com/p/ABC123\nhttps://www.linkedin.com/posts/your-post\nhttps://youtube.com/shorts/xyz"}
            value={data.bestPosts}
            onChange={e => onChange("bestPosts", e.target.value)}
          />
          {errors.bestPosts && <span className="cc-error">{errors.bestPosts}</span>}
        </div>

        <div className="cc-field">
          <label className="cc-label">Describe Your Audience <span className="cc-req">*</span></label>
          <p className="cc-field-hint">Who follows you? Be specific — it helps us understand your reach</p>
          <textarea
            className={`cc-textarea cc-textarea-sm${errors.audienceDescription ? " cc-input-error" : ""}`}
            rows={3}
            placeholder="e.g. College students in their 3rd and 4th year preparing for campus placements, beginners learning to code"
            value={data.audienceDescription}
            onChange={e => onChange("audienceDescription", e.target.value)}
          />
          {errors.audienceDescription && <span className="cc-error">{errors.audienceDescription}</span>}
        </div>
      </div>
    </div>
  )
}
