import type { FormData } from "./types"

const CONTENT_TYPE_LABELS: Record<string, string> = {
  reels:      "Reels / Short Videos",
  career:     "Career Guidance",
  coding:     "Coding / Tech Content",
  placement:  "Placement Preparation",
  motivation: "Motivational Content",
}

const COLLAB_LABELS: Record<string, string> = {
  barter:     "Barter Collaboration",
  ambassador: "Creator Ambassador",
  internship: "Content Internship",
  open:       "Open to Discussion",
}

const POSTS_LABELS: Record<string, string> = {
  "1-2": "1–2 posts/week",
  "3-5": "3–5 posts/week",
  "5+":  "5+ posts/week",
}

interface ReviewRow {
  label: string
  value: string
}

function ReviewSection({ title, rows }: { title: string; rows: ReviewRow[] }) {
  return (
    <div className="cc-review-section">
      <p className="cc-review-section-title">{title}</p>
      <div className="cc-review-rows">
        {rows.map((row, i) => (
          <div key={i} className="cc-review-row">
            <span className="cc-review-key">{row.label}</span>
            <span className="cc-review-val">{row.value || <span className="cc-review-empty">—</span>}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

interface Props {
  data: FormData
  loading: boolean
  error: string
}

export function ReviewSubmit({ data, loading, error }: Props) {
  return (
    <div className="cc-step-body">
      <div className="cc-step-top">
        <div className="cc-step-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" stroke="#1d3a8f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h2 className="cc-step-title">Review Your Application</h2>
        <p className="cc-step-desc">Everything looks good? Hit submit and we&apos;ll be in touch.</p>
      </div>

      <div className="cc-review-card">
        <ReviewSection
          title="Basic Information"
          rows={[
            { label: "Full Name",  value: data.fullName },
            { label: "Email",      value: data.email },
            { label: "Phone",      value: data.phone },
            { label: "City",       value: data.city },
            { label: "Instagram",  value: data.instagram ? `@${data.instagram}` : "" },
            { label: "Followers",  value: data.followerCount },
          ]}
        />

        <ReviewSection
          title="Content & Collaboration"
          rows={[
            {
              label: "Content Types",
              value: data.contentTypes.map(v => CONTENT_TYPE_LABELS[v] || v).join(", "),
            },
            { label: "Collab Model",  value: COLLAB_LABELS[data.collaborationModel] || data.collaborationModel },
            { label: "Availability",  value: POSTS_LABELS[data.postsPerWeek] || data.postsPerWeek },
          ]}
        />
      </div>

      {error && (
        <div className="cc-submit-error">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#dc2626" strokeWidth="2" />
            <path d="M12 8v4M12 16h.01" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" />
          </svg>
          {error}
        </div>
      )}

      <div className="cc-submit-note">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#1d3a8f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Your data is secure. We review every application personally and reach out within 5–7 business days.
      </div>

      <button type="submit" className="cc-submit-btn" disabled={loading}>
        {loading ? (
          <>
            <span className="cc-spinner" />
            Submitting Application…
          </>
        ) : (
          <>
            Join Creator Community
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </>
        )}
      </button>
    </div>
  )
}
