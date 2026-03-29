import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import Stripe from 'stripe'
import { getStripeClient } from '@/lib/stripe'
import { createLicense, extendLicense, findLicenseBySubscription, cancelLicense } from '@/lib/license'
import { sendLicenseEmail } from '@/lib/email'
import { query } from '@/lib/db'

async function recordWebhookEvent(event: Stripe.Event): Promise<boolean> {
  try {
    await query(
      `INSERT INTO webhook_events (provider, provider_event_id, event_type)
       VALUES ($1, $2, $3)
       ON CONFLICT(provider, provider_event_id) DO NOTHING`,
      ['stripe', event.id, event.type]
    )
    return true
  } catch {
    return false
  }
}

export async function POST(request: NextRequest) {
  const stripe = getStripeClient()
  const body = await request.text()
  const signature = (await headers()).get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 })
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!webhookSecret) {
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const isNewEvent = await recordWebhookEvent(event)
  if (!isNewEvent) {
    return NextResponse.json({ received: true, duplicate: true })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await onCheckoutCompleted(event.data.object as Stripe.Checkout.Session, stripe, event.id)
        break
      case 'invoice.paid':
        await onInvoicePaid(event.data.object as Stripe.Invoice)
        break
      case 'customer.subscription.deleted':
        await onSubscriptionDeleted(event.data.object as Stripe.Subscription)
        break
      default:
        break
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Webhook processing failed' },
      { status: 500 }
    )
  }
}

async function onCheckoutCompleted(
  session: Stripe.Checkout.Session,
  stripe: Stripe,
  providerEventId: string
) {
  const subscriptionId = session.subscription as string | null
  const customerId = session.customer as string | null
  const customerEmail = (session.customer_details?.email || session.customer_email || '').trim().toLowerCase()

  await query(
    `INSERT INTO orders (provider, provider_event_id, provider_checkout_id, email, amount_cents, currency, status)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     ON CONFLICT(provider_event_id) DO NOTHING`,
    [
      'stripe',
      providerEventId,
      session.id,
      customerEmail || 'unknown@example.invalid',
      session.amount_total || 0,
      (session.currency || 'eur').toLowerCase(),
      (session.payment_status || 'paid').toLowerCase(),
    ]
  )

  if (!subscriptionId || !customerId) {
    return
  }

  const subscription = await stripe.subscriptions.retrieve(subscriptionId)
  const expiresAt = new Date(subscription.current_period_end * 1000).toISOString()
  const priceId = subscription.items.data[0]?.price.id
  const monthlyPriceId = process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID
  const plan = priceId === monthlyPriceId ? 'monthly' : 'yearly'

  const existing = await findLicenseBySubscription(subscriptionId)

  if (!existing) {
    const created = await createLicense({
      stripeCustomerId: customerId,
      stripeSubscriptionId: subscriptionId,
      email: customerEmail || undefined,
      tier: 'core',
      plan,
      maxInstances: 2,
      expiresAt,
    })

    if (customerEmail) {
      await sendLicenseEmail({
        email: customerEmail,
        licenseKey: created.license_key,
        plan,
        expiresAt,
        language: 'en',
      })
    }
    return
  }

  await query(
    `UPDATE licenses
     SET email = COALESCE(NULLIF($1, ''), email),
         plan = $2,
         expires_at = $3,
         status = 'active'
     WHERE id = $4`,
    [customerEmail || null, plan, expiresAt, existing.id]
  )
}

async function onInvoicePaid(invoice: Stripe.Invoice) {
  const subscriptionId = invoice.subscription as string | null
  const periodEnd = invoice.lines?.data?.[0]?.period?.end

  if (!subscriptionId || !periodEnd) {
    return
  }

  const newExpiresAt = new Date(periodEnd * 1000).toISOString()
  await extendLicense(subscriptionId, newExpiresAt)
}

async function onSubscriptionDeleted(subscription: Stripe.Subscription) {
  await cancelLicense(subscription.id)
}
