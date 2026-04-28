"use client"

interface JobingenLogoProps {
  height?: number
  className?: string
  style?: React.CSSProperties
}

export function JobingenLogo({ height = 36, className = "", style }: JobingenLogoProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/jobingen-logo.png"
      alt="Jobingen Logo"
      className={className}
      style={{ height, width: "auto", display: "block", ...style }}
    />
  )
}
