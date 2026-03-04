"use client"

interface JobngenLogoProps {
  height?: number
  className?: string
  style?: React.CSSProperties
}

export function JobngenLogo({ height = 36, className = "", style }: JobngenLogoProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/jobngen-logo.png"
      alt="JobnGen Logo"
      className={className}
      style={{ height, width: "auto", display: "block", mixBlendMode: "multiply", ...style }}
    />
  )
}
