/**
 * JobEngine · small server-side DB helpers shared across API routes.
 * Every route uses the service-role client (createServerClient) — same as the
 * rest of the app.
 */
import type { SupabaseClient } from "@supabase/supabase-js"

export const emailOk = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)

/** Look up an existing JobEngine user id by email (null if they've never matched). */
export async function findUserId(
  supabase: SupabaseClient,
  email: string,
): Promise<string | null> {
  const { data } = await supabase
    .from("jobengine_users")
    .select("id")
    .eq("email", email)
    .maybeSingle()
  return data?.id ?? null
}

/** The user's current stored resume text (null if none). */
export async function getResumeText(
  supabase: SupabaseClient,
  userId: string,
): Promise<string | null> {
  const { data } = await supabase
    .from("jobengine_resumes")
    .select("resume_text")
    .eq("user_id", userId)
    .maybeSingle()
  return data?.resume_text ?? null
}
