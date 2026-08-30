import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createSupabaseAdmin } from '@/lib/supabase/admin'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  const stripeSecret = process.env.STRIPE_SECRET_KEY
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!stripeSecret || !webhookSecret) return NextResponse.json({ error: 'Stripe webhook is not configured.' }, { status: 503 })

  const stripe = new Stripe(stripeSecret)
  const signature = request.headers.get('stripe-signature')
  if (!signature) return NextResponse.json({ error: 'Missing signature.' }, { status: 400 })

  let event: Stripe.Event
  try {
    const payload = await request.text()
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret)
  } catch {
    return NextResponse.json({ error: 'Invalid Stripe signature.' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const supabase = createSupabaseAdmin()
    if (!supabase) return NextResponse.json({ error: 'Supabase server client is not configured.' }, { status: 503 })

    const { error } = await supabase.from('orders').upsert({
      stripe_session_id: session.id,
      stripe_customer_id: typeof session.customer === 'string' ? session.customer : null,
      stripe_payment_intent_id: typeof session.payment_intent === 'string' ? session.payment_intent : null,
      client_email: session.customer_details?.email || session.customer_email,
      product_slug: session.metadata?.plan_slug || 'custom',
      amount_cents: session.amount_total || 0,
      status: session.payment_status === 'paid' ? 'paid' : session.payment_status,
      paid_at: session.payment_status === 'paid' ? new Date().toISOString() : null,
    }, { onConflict: 'stripe_session_id' })

    if (error) return NextResponse.json({ error: 'Could not record order.' }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}
