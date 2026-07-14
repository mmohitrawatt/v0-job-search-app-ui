import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"
import { PROMO_POPUP } from "@/lib/promo-popup"
import { STATUS_UPDATES } from "@/lib/status-updates"

export const dynamic = "force-dynamic"

// Public: the landing components read popup + statuses from here.
// Falls back to the static defaults if the table is empty / unreachable.
export async function GET() {
  try {
    const supabase = createServerClient()
    const { data, error } = await supabase
      .from("site_content")
      .select("popup, statuses")
      .eq("id", "main")
      .maybeSingle()

    if (error || !data) {
      return NextResponse.json({ popup: PROMO_POPUP, statuses: STATUS_UPDATES })
    }

    const popup =
      data.popup && Object.keys(data.popup).length > 0 ? data.popup : PROMO_POPUP
    const statuses =
      Array.isArray(data.statuses) && data.statuses.length > 0
        ? data.statuses
        : STATUS_UPDATES

    return NextResponse.json({ popup, statuses })
  } catch {
    return NextResponse.json({ popup: PROMO_POPUP, statuses: STATUS_UPDATES })
  }
}
