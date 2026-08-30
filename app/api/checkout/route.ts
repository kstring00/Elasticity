import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const plans = {
  custom: { name: 'Elasticity Custom 4-Week Plan', amount: 12900 },
  guided: { name: 'Elasticity Plan + Weekly Check-Ins', amount: 17900 },
} as const

export async function POST(request: NextRequest) {
  const form = await request.formData()
  const planSlug = String(form.get('plan') || 'custom') as keyof typeof plans
  const plan = plans[planSlug]
  const origin = process.env.NEXT_PUBLIC_SITE_URL || request.nextUrl.origin
  const secret = process.env.STRIPE_SECRET_KEY

  if (!plan) return NextResponse.redirect(new URL('/#pricing', origin), 303)
  if (!secret) return NextResponse.redirect(new URL('/?checkout=not-configured#pricing', origin), 303)

  const stripe = new Stripe(secret)
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    customer_creation: 'always',
    allow_promotion_codes: true,
    line_items: [{
      quantity: 1,
      price_data: {
        currency: 'usd',
        unit_amount: plan.amount,
        product_data: {
          name: plan.name,
          description: planSlug === 'guided' ? 'Personalized four-week training program with weekly coach check-ins.' : 'Personalized four-week training program and client portal access.',
        },
      },
    }],
    metadata: { plan_slug: planSlug },
    success_url: `${origin}/login?paid=1&next=/onboarding&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/#pricing`,
  })

  return NextResponse.redirect(session.url!, 303)
}
