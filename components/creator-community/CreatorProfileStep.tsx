import type { FormData } from "./types"

const FOLLOWER_OPTIONS = [
  { value: "0-1k", label: "0 – 1K" },
  { value: "1k-5k", label: "1K – 5K" },
  { value: "5k-10k", label: "5K – 10K" },
  { value: "10k+", label: "10K+" },
]

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
        <p className="cc-step-desc">Share your social media presence so we can understand your reach.</p>
      </div>

      <div className="cc-fields">
        <div className="cc-field">
          <label className="cc-label">
            <span className="cc-social-icon cc-ig" />
            Instagram Profile URL <span className="cc-req">*</span>
          </label>
          <div className="cc-input-prefix-wrap">
            <span className="cc-input-prefix">instagram.com/</span>
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
          <label className="cc-label">
            <span className="cc-social-icon cc-li" />
            LinkedIn Profile URL <span className="cc-req">*</span>
          </label>
          <div className="cc-input-prefix-wrap">
            <span className="cc-input-prefix">linkedin.com/in/</span>
            <input
              className={`cc-input cc-input-prefixed${errors.linkedin ? " cc-input-error" : ""}`}
              type="text"
              placeholder="yourprofile"
              value={data.linkedin}
              onChange={e => onChange("linkedin", e.target.value)}
            />
          </div>
          {errors.linkedin && <span className="cc-error">{errors.linkedin}</span>}
        </div>

        <div className="cc-field">
          <label className="cc-label">
            <span className="cc-social-icon cc-yt" />
            YouTube Channel
            <span className="cc-optional"> — optional</span>
          </label>
          <input
            className="cc-input"
            type="url"
            placeholder="https://youtube.com/@yourchannel"
            value={data.youtube}
            onChange={e => onChange("youtube", e.target.value)}
          />
        </div>

        <div className="cc-field">
          <label className="cc-label">Total Follower Count (all platforms) <span className="cc-req">*</span></label>
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
