import Stripe from 'stripe'

export interface Customer {
  id: string
  stripeCustomerId: string
  email: string
  name: string | null
  createdAt: Date
  updatedAt: Date
}

export interface Subscription {
  id: string
  customerId: string
  stripeSubscriptionId: string
  stripePriceId: string
  status: Stripe.Subscription.Status
  currentPeriodStart: Date
  currentPeriodEnd: Date
  cancelAtPeriodEnd: boolean
  canceledAt: Date | null
  trialStart: Date | null
  trialEnd: Date | null
  createdAt: Date
  updatedAt: Date
}

export interface SubscriptionWithCustomer extends Subscription {
  customer: Customer
}
