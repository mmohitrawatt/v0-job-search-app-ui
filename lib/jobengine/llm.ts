/**
 * JobEngine · LLM provider abstraction.
 *
 * One `chatJSON()` entry point that returns parsed JSON. Provider is chosen
 * from the environment at call time, in cost/quality order:
 *
 *   1. ANTHROPIC_API_KEY → Claude (best quality; paid)
 *   2. GROQ_API_KEY      → Llama 3.3 70B on Groq (free tier)
 *
 * Adding ANTHROPIC_API_KEY later upgrades every scoring + tailoring call with
 * zero code changes — nothing else references a specific model.
 */

export type LlmProvider = "anthropic" | "groq"

export function activeProvider(): LlmProvider | null {
  if (process.env.ANTHROPIC_API_KEY) return "anthropic"
  if (process.env.GROQ_API_KEY) return "groq"
  return null
}

export function activeModel(): string {
  switch (activeProvider()) {
    case "anthropic":
      return "claude-sonnet-5"
    case "groq":
      return "llama-3.3-70b-versatile"
    default:
      return "none"
  }
}

type ChatOpts = {
  system: string
  user: string
  maxTokens?: number
  /** Hint the model to emit a JSON object. Both providers honour this. */
  json?: boolean
}

async function callAnthropic({ system, user, maxTokens = 1500 }: ChatOpts): Promise<string> {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY!,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: activeModel(),
      max_tokens: maxTokens,
      system,
      messages: [{ role: "user", content: user }],
    }),
  })
  if (!res.ok) throw new Error(`Anthropic HTTP ${res.status}: ${(await res.text()).slice(0, 300)}`)
  const data = await res.json()
  return data?.content?.[0]?.text ?? ""
}

async function callGroq({ system, user, maxTokens = 1500, json }: ChatOpts): Promise<string> {
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${process.env.GROQ_API_KEY!}`,
    },
    body: JSON.stringify({
      model: activeModel(),
      max_tokens: maxTokens,
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      ...(json ? { response_format: { type: "json_object" } } : {}),
    }),
  })
  if (!res.ok) throw new Error(`Groq HTTP ${res.status}: ${(await res.text()).slice(0, 300)}`)
  const data = await res.json()
  return data?.choices?.[0]?.message?.content ?? ""
}

/** Raw text completion routed to whichever provider is configured. */
export async function chat(opts: ChatOpts): Promise<string> {
  switch (activeProvider()) {
    case "anthropic":
      return callAnthropic(opts)
    case "groq":
      return callGroq(opts)
    default:
      throw new Error(
        "No LLM configured. Set GROQ_API_KEY (free) or ANTHROPIC_API_KEY in .env.local.",
      )
  }
}

/**
 * Extract the first JSON value from a model response.
 * Models sometimes wrap JSON in prose or ```json fences even when asked not to,
 * so we locate the outermost object/array rather than JSON.parse() the whole
 * string.
 */
export function extractJson<T = unknown>(raw: string): T {
  const fenced = raw.match(/```(?:json)?\s*([\s\S]*?)```/i)
  const body = fenced ? fenced[1] : raw
  const start = body.search(/[[{]/)
  if (start === -1) throw new Error("No JSON found in model response")
  const open = body[start]
  const close = open === "[" ? "]" : "}"
  const end = body.lastIndexOf(close)
  if (end <= start) throw new Error("Truncated JSON in model response")
  return JSON.parse(body.slice(start, end + 1)) as T
}

/** chat() + extractJson() in one call. */
export async function chatJSON<T = unknown>(opts: ChatOpts): Promise<T> {
  const raw = await chat({ ...opts, json: true })
  return extractJson<T>(raw)
}
