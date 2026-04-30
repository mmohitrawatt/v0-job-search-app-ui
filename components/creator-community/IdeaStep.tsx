import type { FormData } from "./types"

interface Props {
  data: FormData
  onChange: (key: keyof FormData, value: string) => void
  errors: Partial<Record<keyof FormData, string>>
}

export function IdeaStep({ data, onChange, errors }: Props) {
  return (
    <div className="cc-step-body">
      <div className="cc-step-top">
        <div className="cc-step-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M9 18h6M10 22h4M12 2a7 7 0 017 7c0 2.8-1.6 5.2-4 6.4V17a1 1 0 01-1 1H10a1 1 0 01-1-1v-1.6C6.6 14.2 5 11.8 5 9a7 7 0 017-7z" stroke="#1d3a8f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h2 className="cc-step-title">Your Best Idea</h2>
        <p className="cc-step-desc">
          This is the most important question. We want to see how you think — not just what you&apos;ve done.
        </p>
      </div>

      <div className="cc-idea-callout">
        <div className="cc-idea-callout-icon">💡</div>
        <div>
          <p className="cc-idea-callout-title">Think like a creator, not a candidate</p>
          <p className="cc-idea-callout-body">
            Suggest one specific content idea you would create for Jobingen — could be a Reel, a carousel, a challenge, a series. Tell us the concept, the hook, and why it would resonate with students and job seekers.
          </p>
        </div>
      </div>

      <div className="cc-fields">
        <div className="cc-field">
          <label className="cc-label">Your Content Idea for Jobingen <span className="cc-req">*</span></label>
          <textarea
            className={`cc-textarea cc-textarea-lg${errors.contentIdea ? " cc-input-error" : ""}`}
            rows={6}
            placeholder={"e.g. A 30-second Reel series called \"Resume Red Flags\" — each episode shows a common resume mistake with a dramatic reaction, then the fix. Hook: \"Recruiters skip your resume in 6 seconds. Here's why.\" It would perform well because it's relatable, fast-paced, and immediately actionable for placement-prep students."}
            value={data.contentIdea}
            onChange={e => onChange("contentIdea", e.target.value)}
          />
          {errors.contentIdea && <span className="cc-error">{errors.contentIdea}</span>}
          <p className="cc-char-hint">{data.contentIdea.length} characters — aim for at least 100</p>
        </div>
      </div>
    </div>
  )
}
