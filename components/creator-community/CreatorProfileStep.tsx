import type { FormData } from "./types"

interface Props {
  data: FormData
  onChange: (key: keyof FormData, value: string) => void
  errors: Partial<Record<keyof FormData, string>>
}

export function CreatorProfileStep({ data, onChange, errors }: Props) {
  return (
    <div className="cc-step-body">
      <div className="cc-step-top">
        <div className="cc-step-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="2" width="9" height="9" rx="2" stroke="#1d3a8f" strokeWidth="2" />
            <rect x="13" y="2" width="9" height="9" rx="2" stroke="#1d3a8f" strokeWidth="2" />
            <rect x="2" y="13" width="9" height="9" rx="2" stroke="#1d3a8f" strokeWidth="2" />
            <rect x="13" y="13" width="9" height="9" rx="2" stroke="#1d3a8f" strokeWidth="2" />
          </svg>
        </div>
        <h2 className="cc-step-title">Creator Profile</h2>
        <p className="cc-step-desc">Your Instagram handle — where we&apos;ll check out your content.</p>
      </div>

      <div className="cc-fields">
        <div className="cc-field">
          <label className="cc-label">
            <span className="cc-social-icon cc-ig" />
            Instagram Username <span className="cc-req">*</span>
          </label>
          <div className="cc-input-prefix-wrap">
            <span className="cc-input-prefix">@</span>
            <input
              className={`cc-input cc-input-prefixed${errors.instagram ? " cc-input-error" : ""}`}
              type="text"
              placeholder="yourusername"
              value={data.instagram}
              onChange={e => onChange("instagram", e.target.value)}
            />
          </div>
          {errors.instagram && <span className="cc-error">{errors.instagram}</span>}
        </div>
      </div>
    </div>
  )
}
