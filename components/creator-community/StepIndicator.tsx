import type { StepConfig } from "./types"

interface Props {
  currentStep: number
  steps: StepConfig[]
}

export function StepIndicator({ currentStep, steps }: Props) {
  const fillPct = Math.round((currentStep / steps.length) * 100)

  return (
    <div className="cc-step-ind">
      <div className="cc-step-header">
        <span className="cc-step-count">Step {currentStep} of {steps.length}</span>
        <span className="cc-step-name">{steps[currentStep - 1]?.label}</span>
      </div>

      <div className="cc-progress-track">
        <div className="cc-progress-fill" style={{ width: `${fillPct}%` }} />
      </div>

      <div className="cc-step-dots">
        {steps.map((step) => {
          const done = currentStep > step.id
          const curr = currentStep === step.id
          return (
            <div key={step.id} className={`cc-dot-wrap${done ? " done" : curr ? " curr" : ""}`}>
              <div className="cc-dot">
                {done ? (
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  step.id
                )}
              </div>
              <span className="cc-dot-label">{step.shortLabel}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
