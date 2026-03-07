import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { getStripeClient } from '@/lib/stripe'
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

  console.log(`Received Stripe event: ${event.type}`)

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(event.data.object as Stripe.Checkout.Session)
        break

      case 'customer.subscription.created':
        await handleSubscriptionCreated(event.data.object as Stripe.Subscription)
        break

      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object as Stripe.Subscription)
        break

      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription)
        break

      case 'invoice.payment_succeeded':
        await handleInvoicePaymentSucceeded(event.data.object as Stripe.Invoice)
        break

      case 'invoice.payment_failed':
        await handleInvoicePaymentFailed(event.data.object as Stripe.Invoice)
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Error processing webhook:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}

/**
 * Handle successful checkout session
 * TODO: Create customer record in database
 * TODO: Send welcome email
 */
async function handleCheckoutSessionCompleted(
  session: Stripe.Checkout.Session
) {
  console.log('Checkout session completed:', session.id)
  console.log('Customer:', session.customer)
  console.log('Subscription:', session.subscription)

  // TODO: Create or update customer in database
  // TODO: Link customer to subscription
  // TODO: Send welcome email with license key
  // TODO: Trigger license generation
}

/**
 * Handle new subscription creation
 * TODO: Create subscription record in database
 * TODO: Generate license key
 */
async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
  console.log('Subscription created:', subscription.id)
  console.log('Customer:', subscription.customer)
  console.log('Status:', subscription.status)
  console.log('Price ID:', subscription.items.data[0]?.price.id)

  // TODO: Save subscription to database
  // TODO: Generate license for subscription
  // TODO: Determine max instances based on plan
  // TODO: Send email with license key and setup instructions
}

/**
 * Handle subscription updates
 * TODO: Update subscription record in database
 * TODO: Handle plan changes
 * TODO: Handle status changes
 */
async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  console.log('Subscription updated:', subscription.id)
  console.log('New status:', subscription.status)
  console.log('Cancel at period end:', subscription.cancel_at_period_end)

  // TODO: Update subscription in database
  // TODO: If plan changed, update license limits
  // TODO: If cancelled, mark license for expiration
  // TODO: If reactivated, reactivate license
  // TODO: Send notification email
}

/**
 * Handle subscription deletion/cancellation
 * TODO: Mark subscription as cancelled in database
 * TODO: Deactivate license
 */
async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  console.log('Subscription deleted:', subscription.id)
  console.log('Cancelled at:', subscription.canceled_at)

  // TODO: Update subscription status in database
  // TODO: Deactivate associated licenses
  // TODO: Revoke instance access
  // TODO: Send cancellation confirmation email
}

/**
 * Handle successful invoice payment
 * TODO: Update payment status in database
 */
async function handleInvoicePaymentSucceeded(invoice: Stripe.Invoice) {
  console.log('Invoice payment succeeded:', invoice.id)
  console.log('Subscription:', invoice.subscription)
  console.log('Amount paid:', invoice.amount_paid)

  // TODO: Record payment in database
  // TODO: Extend subscription/license expiration
  // TODO: Send receipt email
}

/**
 * Handle failed invoice payment
 * TODO: Update payment status in database
 * TODO: Send payment failure notification
 */
async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  console.log('Invoice payment failed:', invoice.id)
  console.log('Subscription:', invoice.subscription)
  console.log('Attempt count:', invoice.attempt_count)

  // TODO: Record failed payment in database
  // TODO: Send payment failure email
  // TODO: If final attempt, suspend license
}
