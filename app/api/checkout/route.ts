import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const plans = {
  build: {
    name: 'Elasticity — The Build (Founding Client)',
    amount: 9900,
    catalogSlug: 'custom-4-week',
    description: 'Custom four-week training program with one revision window.',
  },
  guided: {
    name: 'Elasticity — The Build + Weekly Check-Ins (Founding Client)',
    amount: 14900,
    catalogSlug: 'custom-4-week-checkins',
    description: 'Custom four-week training program with four structured weekly check-ins and coach feedback.',
  },
  progression: {
    name: 'Elasticity — 12-Week Progression',
    amount: 54900,
    catalogSlug: '12-week-progression',
    description: 'Three consecutive four-week builds with weekly check-ins and progression from prior results.',
  },
} as const

export async function POST(request: NextRequest) {
  const form = await request.formData()
  const planSlug = String(form.get('plan') || 'build') as keyof typeof plans
  const email = String(form.get('email') || '').trim()
  const plan = plans[planSlug]
  const origin = process.env.NEXT_PUBLIC_SITE_URL || request.nextUrl.origin
  const secret = process.env.STRIPE_SECRET_KEY

  if (!plan) return NextResponse.redirect(new URL('/plan', origin), 303)
  if (!secret) return NextResponse.redirect(new URL('/plan?checkout=not-configured', origin), 303)

  const stripe = new Stripe(secret)
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    customer_creation: 'always',
    customer_email: /.+@.+\..+/.test(email) ? email : undefined,
    allow_promotion_codes: true,
    line_items: [{
      quantity: 1,
      price_data: {
        currency: 'usd',
        unit_amount: plan.amount,
        product_data: { name: plan.name, description: plan.description },
      },
    }],
    metadata: { plan_slug: planSlug, catalog_slug: plan.catalogSlug, launch_offer: planSlug === 'progression' ? 'standard' : 'founding-client' },
    success_url: `${origin}/login?paid=1&next=/onboarding&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/plan`,
  })

  return NextResponse.redirect(session.url!, 303)
}
