"use client"

import { useState } from "react"

/**
 * JobngenLogo — renders the Jobngen PNG wordmark logo.
 *
 * Falls back to gradient text if /public/jobngen-logo.png is not found.
 *
 * The PNG is a square canvas with the logo centered inside it.
 * CSS overflow-clipping is used to crop out the white space and show
 * only the logo text at the requested height.
 *
 * Tuning: if the image appears cropped or mis-aligned after you save the
 * PNG, adjust the two constants below:
 *   LOGO_HEIGHT_FRACTION  — fraction of image height occupied by logo text (0–1)
 *   LOGO_WIDTH_FRACTION   — fraction of image width occupied by logo text (0–1)
 */

const LOGO_HEIGHT_FRACTION = 0.215  // logo text ≈ 21.5% of image height
const LOGO_WIDTH_FRACTION  = 0.67   // logo text ≈ 67% of image width

interface JobngenLogoProps {
  /** Desired display height in px */
  height?: number
  className?: string
  style?: React.CSSProperties
}

export function JobngenLogo({ height = 24, className = "", style }: JobngenLogoProps) {
  const [imgError, setImgError] = useState(false)

  // Fallback: gradient text when PNG not found
  if (imgError) {
    return (
      <span
        className={className}
        style={{
          fontSize: height,
          fontWeight: 900,
          letterSpacing: "-0.03em",
          lineHeight: 1,
          background: "linear-gradient(90deg, #0d1b45 0%, #1d3a8f 50%, #3b52f0 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          display: "inline-block",
          flexShrink: 0,
          userSelect: "none",
          ...style,
        }}
      >
        jobngen
      </span>
    )
  }

  // Scale the square image so the logo text fills `height` px vertically
  const imgSize    = Math.round(height / LOGO_HEIGHT_FRACTION)
  const containerW = Math.round(imgSize * LOGO_WIDTH_FRACTION)

  return (
    <div
      className={className}
      style={{
        width: containerW,
        height,
        overflow: "hidden",
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        flexShrink: 0,
        ...style,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/jobngen-logo.png"
        alt="jobngen"
        draggable={false}
        onError={() => setImgError(true)}
        style={{
          position: "absolute",
          width: imgSize,
          height: imgSize,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          maxWidth: "none",
          userSelect: "none",
        }}
      />
    </div>
  )
}
