import type { FormData } from "./types"

const FOLLOWER_OPTIONS = [
  { value: "0-1k",   label: "0 – 1K" },
  { value: "1k-5k",  label: "1K – 5K" },
  { value: "5k-10k", label: "5K – 10K" },
  { value: "10k+",   label: "10K+" },
]

interface Props {
  data: FormData
  onChange: (key: keyof FormData, value: string) => void
  errors: Partial<Record<keyof FormData, string>>
}

export function BasicInfoStep({ data, onChange, errors }: Props) {
  return (
    <div className="cc-step-body">
      <div className="cc-step-top">
        <div className="cc-step-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="8" r="4" stroke="#1d3a8f" strokeWidth="2" />
            <path d="M4 20c0-4 3.582-7 8-7s8 3 8 7" stroke="#1d3a8f" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <h2 className="cc-step-title">Basic Information</h2>
        <p className="cc-step-desc">Tell us who you are so we can reach out to you directly.</p>
      </div>

      <div className="cc-fields">
        <div className="cc-field">
          <label className="cc-label">Full Name <span className="cc-req">*</span></label>
          <input
            className={`cc-input${errors.fullName ? " cc-input-error" : ""}`}
            type="text"
            placeholder="e.g. Arjun Sharma"
            value={data.fullName}
            onChange={e => onChange("fullName", e.target.value)}
          />
          {errors.fullName && <span className="cc-error">{errors.fullName}</span>}
        </div>

        <div className="cc-field">
          <label className="cc-label">Email Address <span className="cc-req">*</span></label>
          <input
            className={`cc-input${errors.email ? " cc-input-error" : ""}`}
            type="email"
            placeholder="e.g. arjun@gmail.com"
            value={data.email}
            onChange={e => onChange("email", e.target.value)}
          />
          {errors.email && <span className="cc-error">{errors.email}</span>}
        </div>

        <div className="cc-fields-row">
          <div className="cc-field">
            <label className="cc-label">Phone <span className="cc-req">*</span></label>
            <input
              className={`cc-input${errors.phone ? " cc-input-error" : ""}`}
              type="tel"
              placeholder="+91 98765 43210"
              value={data.phone}
              onChange={e => onChange("phone", e.target.value)}
            />
            {errors.phone && <span className="cc-error">{errors.phone}</span>}
          </div>

          <div className="cc-field">
            <label className="cc-label">City <span className="cc-req">*</span></label>
            <input
              className={`cc-input${errors.city ? " cc-input-error" : ""}`}
              type="text"
              placeholder="e.g. Bangalore"
              value={data.city}
              onChange={e => onChange("city", e.target.value)}
            />
            {errors.city && <span className="cc-error">{errors.city}</span>}
          </div>
        </div>

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

        <div className="cc-field">
          <label className="cc-label">Instagram Followers <span className="cc-req">*</span></label>
          <div className="cc-radio-row">
            {FOLLOWER_OPTIONS.map(opt => (
              <label
                key={opt.value}
                className={`cc-radio-chip${data.followerCount === opt.value ? " selected" : ""}`}
              >
                <input
                  type="radio"
                  name="followerCount"
                  value={opt.value}
                  checked={data.followerCount === opt.value}
                  onChange={() => onChange("followerCount", opt.value)}
                  style={{ display: "none" }}
                />
                {opt.label}
              </label>
            ))}
          </div>
          {errors.followerCount && <span className="cc-error">{errors.followerCount}</span>}
        </div>
      </div>
    </div>
  )
}
