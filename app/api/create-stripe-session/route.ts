import Stripe from "stripe"
import { NextRequest, NextResponse } from "next/server"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-04-30.basil",
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, college, experience } = body

    const baseUrl = process.env.APP_BASE_URL || "http://localhost:3000"

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: "ML Masterclass — 10 May 2026",
              description: "4-hour live session · 7 Core ML Algorithms · Data Pipelines · Model Evaluation · Certificate",
            },
            unit_amount: 2900,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      customer_email: email,
      metadata: { name, phone, college, experience },
      success_url: `${baseUrl}/ml-masterclass?stripe_success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/ml-masterclass`,
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error("Stripe session error:", err)
    return NextResponse.json({ error: "Failed to create payment session." }, { status: 500 })
  }
}
