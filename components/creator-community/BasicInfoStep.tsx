import type { FormData } from "./types"

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
        <p className="cc-step-desc">Tell us who you are. This helps us reach out to you directly.</p>
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

        <div className="cc-field">
          <label className="cc-label">Phone Number <span className="cc-req">*</span></label>
          <input
            className={`cc-input${errors.phone ? " cc-input-error" : ""}`}
            type="tel"
            placeholder="e.g. +91 98765 43210"
            value={data.phone}
            onChange={e => onChange("phone", e.target.value)}
          />
          {errors.phone && <span className="cc-error">{errors.phone}</span>}
        </div>

        <div className="cc-field">
          <label className="cc-label">City / Location <span className="cc-req">*</span></label>
          <input
            className={`cc-input${errors.city ? " cc-input-error" : ""}`}
            type="text"
            placeholder="e.g. Bangalore, Delhi, Mumbai"
            value={data.city}
            onChange={e => onChange("city", e.target.value)}
          />
          {errors.city && <span className="cc-error">{errors.city}</span>}
        </div>
      </div>
    </div>
  )
}
