/**
 * JobEngine · lightweight contact extraction from resume text.
 * Cheap regex/heuristics (no LLM) so the Chrome extension can auto-fill apply
 * forms with the candidate's real details. Stored on the resume profile.
 */
export type Contact = {
  name: string
  email: string
  phone: string
  linkedin: string
  github: string
  location: string
}

// Multi-word cities first so "New Delhi" wins over "Delhi", etc.
const CITIES = [
  "New Delhi", "Navi Mumbai", "Bengaluru", "Bangalore", "Mumbai", "Gurugram", "Gurgaon", "Noida",
  "Hyderabad", "Pune", "Chennai", "Kolkata", "Ahmedabad", "Jaipur", "Delhi", "Remote",
]

export function extractContact(text: string): Contact {
  const clean = text.replace(/\r/g, "")
  const firstLines = clean.split("\n").map((l) => l.trim()).filter(Boolean).slice(0, 8)

  const email = (clean.match(/[\w.+-]+@[\w-]+\.[\w.-]+/) || [""])[0].replace(/[.,;]$/, "")

  // Indian mobile (optionally +91), else a generic 10+ digit run.
  const phoneMatch =
    clean.match(/(?:\+?91[\s-]?)?[6-9]\d{9}/) ||
    clean.match(/\+?\d[\d\s-]{8,}\d/)
  const phone = phoneMatch ? phoneMatch[0].replace(/\s+/g, "").trim() : ""

  const linkedin = (clean.match(/(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/[\w-]+/i) || [""])[0]
  const github = (clean.match(/(?:https?:\/\/)?(?:www\.)?github\.com\/[\w-]+/i) || [""])[0]

  // Name: the first line that looks like a person's name — 2-4 words, letters
  // only, not containing an @/digit/URL, not an all-caps section header word.
  let name = ""
  for (const line of firstLines) {
    if (/[@\d]/.test(line) || /https?:|\.com|\.in\b/i.test(line)) continue
    const words = line.split(/\s+/)
    if (words.length < 2 || words.length > 4) continue
    if (!/^[A-Za-z][A-Za-z.'-]*(\s+[A-Za-z][A-Za-z.'-]*){1,3}$/.test(line)) continue
    // Skip lines that are obviously headings.
    if (/^(resume|curriculum|cv|profile|summary|objective)\b/i.test(line)) continue
    name = line.replace(/\s+/g, " ").trim()
    break
  }

  let location = ""
  const lower = clean.toLowerCase()
  for (const city of CITIES) {
    if (lower.includes(city.toLowerCase())) { location = city === "Bangalore" ? "Bengaluru" : city; break }
  }

  return {
    name,
    email,
    phone,
    linkedin: linkedin ? (linkedin.startsWith("http") ? linkedin : "https://" + linkedin) : "",
    github: github ? (github.startsWith("http") ? github : "https://" + github) : "",
    location,
  }
}
