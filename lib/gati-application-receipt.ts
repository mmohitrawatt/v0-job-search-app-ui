import { createHmac, timingSafeEqual } from "node:crypto"

const tokenPattern = /^([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\.([0-9a-f]{64})$/i

function signatureFor(id: string) {
  const secret = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!secret) throw new Error("Supabase service role key is required for application receipts")
  return createHmac("sha256", secret).update(`gati-application-receipt:v1:${id}`).digest("hex")
}

export function signGatiApplicationId(id: string) {
  return `${id}.${signatureFor(id)}`
}

export function verifyGatiApplicationToken(token: string) {
  const match = tokenPattern.exec(token)
  if (!match) return null
  const id = match[1].toLowerCase()
  const received = Buffer.from(match[2], "hex")
  const expected = Buffer.from(signatureFor(id), "hex")
  return timingSafeEqual(received, expected) ? id : null
}
