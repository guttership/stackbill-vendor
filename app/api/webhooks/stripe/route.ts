import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { getStripeClient } from '@/lib/stripe'
import { createLicense, findLicenseBySubscription, extendLicense, cancelLicense } from '@/lib/license'
import { sendLicenseEmail } from '@/lib/email'
import { logLicenseEvent } from '@/lib/logger'
import Stripe from 'stripe'

/**
 * Stripe Webhook Handler
 * Handles subscription lifecycle events from Stripe
 */
export async function POST(request: NextRequest) {
  const stripe = getStripeClient()
  const body = await request.text()
  const signature = (await headers()).get('stripe-signature')

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 }
    )
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!webhookSecret) {
    console.error('STRIPE_WEBHOOK_SECRET is not set')
    return NextResponse.json(
      { error: 'Webhook secret not configured' },
      { status: 500 }
    )
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (error) {
    console.error('Webhook signature verification failed:', error)
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    )
  }

  logLicenseEvent(null, 'webhook_received', `type=${event.type}, id=${event.id}`)

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(
          event.data.object as Stripe.Checkout.Session,
          stripe
        )
        break

      case 'invoice.paid':
        await handleInvoicePaid(event.data.object as Stripe.Invoice)
        break

      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription)
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Error processing webhook:', error)
    logLicenseEvent(null, 'webhook_error', `type=${event.type}, error=${error instanceof Error ? error.message : String(error)}`)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}

/**
 * checkout.session.completed → Create a new license
 */
async function handleCheckoutSessionCompleted(
  session: Stripe.Checkout.Session,
  stripe: Stripe
) {
  const customerId = session.customer as string
  const subscriptionId = session.subscription as string
  const fallbackCustomerEmail =
    session.customer_details?.email?.trim().toLowerCase() ||
    session.customer_email?.trim().toLowerCase() ||
    null

  console.log(`[DEBUG] Checkout completed - customer: ${customerId}`)

  if (!customerId || !subscriptionId) {
    console.error('Missing customer or subscription in checkout session')
    return
  }

  // Check if license already exists for this subscription
  const existing = await findLicenseBySubscription(subscriptionId)
  if (existing) {
    console.log(`License already exists for subscription ${subscriptionId}: ${existing.license_key}`)
    return
  }

  // Retrieve subscription to get period end
  const subscription = await stripe.subscriptions.retrieve(subscriptionId)
  const expiresAt = new Date(subscription.current_period_end * 1000).toISOString()

  // Get customer email and country from Stripe
  const customer = (await stripe.customers.retrieve(customerId)) as Stripe.Customer
  const customerEmail = customer.email?.trim().toLowerCase() || fallbackCustomerEmail
  const countryCode = (customer.address?.country as string) || undefined

  // Determine plan from price
  const priceId = subscription.items.data[0]?.price.id
  const monthlyPriceId = process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID
  const plan = priceId === monthlyPriceId ? 'monthly' : 'yearly'

  // Import here to avoid circular dependencies
  const { detectLanguage } = await import('@/lib/license')
  const language = detectLanguage(countryCode)

  const license = await createLicense({
    stripeCustomerId: customerId,
    stripeSubscriptionId: subscriptionId,
    email: customerEmail || undefined,
    plan,
    maxInstances: 2,
    expiresAt,
  })

  console.log(`License created: ${license.license_key} for subscription ${subscriptionId}`)

  // Send license email
  if (customerEmail) {
    console.log(`[EMAIL DEBUG] Sending email to ${customerEmail}`)
    try {
      await sendLicenseEmail({
        email: customerEmail,
        licenseKey: license.license_key,
        plan,
        expiresAt,
        language,
      })
      console.log(`[EMAIL] ✅ Email sent successfully to ${customerEmail}`)
    } catch (error) {
      console.error(`[EMAIL] ❌ Failed to send to ${customerEmail}:`, error)
      logLicenseEvent(license.license_key, 'webhook_error', `email_send_failed: ${error instanceof Error ? error.message : String(error)}`)
    }
  } else {
    console.warn(`[EMAIL] ⚠️ No customer email found`)
  }
}

/**
 * invoice.paid → Extend license validity
 */
async function handleInvoicePaid(invoice: Stripe.Invoice) {
  const subscriptionId = invoice.subscription as string
  if (!subscriptionId) return

  // Extend to the end of the new billing period
  const periodEnd = invoice.lines?.data?.[0]?.period?.end
  if (!periodEnd) {
    console.error('No period end found in invoice')
    return
  }

  const newExpiresAt = new Date(periodEnd * 1000).toISOString()
  const updated = await extendLicense(subscriptionId, newExpiresAt)

  if (updated) {
    console.log(`License extended for subscription ${subscriptionId} until ${newExpiresAt}`)
  } else {
    // License may not exist yet (first invoice comes before checkout.session.completed sometimes)
    console.log(`No license found for subscription ${subscriptionId} to extend`)
  }
}

/**
 * customer.subscription.deleted → Cancel license
 */
async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const subscriptionId = subscription.id
  const cancelled = await cancelLicense(subscriptionId)

  if (cancelled) {
    console.log(`License cancelled for subscription ${subscriptionId}`)
  } else {
    console.log(`No license found for subscription ${subscriptionId} to cancel`)
  }
}
