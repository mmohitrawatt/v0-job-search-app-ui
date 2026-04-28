"use client"

interface JobingenLogoProps {
  height?: number
  className?: string
  style?: React.CSSProperties
}

export function JobingenLogo({ height = 36, className = "", style }: JobingenLogoProps) {
  const fontSize = height * 0.85
  return (
    <span
      className={className}
      style={{
        fontSize,
        fontWeight: 800,
        letterSpacing: "-0.5px",
        lineHeight: 1,
        display: "block",
        userSelect: "none",
        ...style,
      }}
    >
      <span style={{ color: "#1d3a8f" }}>Job</span>
      <span style={{ color: "#3b52f0" }}>ingen</span>
    </span>
  )
}
