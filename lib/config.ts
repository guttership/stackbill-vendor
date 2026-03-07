export const plans = {
  monthly: {
    name: 'Monthly',
    price: 9.99,
    interval: 'month',
    priceId: process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID || '',
    features: [
      '2 instances included',
      'Self-hosted',
      'Unlimited quotes & invoices',
      'Custom branding',
      'Clockify integration',
      'Trello integration',
      'Email support',
    ],
  },
  yearly: {
    name: 'Yearly',
    price: 99,
    interval: 'year',
    priceId: process.env.NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID || '',
    features: [
      '2 instances included',
      'Self-hosted',
      'Unlimited quotes & invoices',
      'Custom branding',
      'Clockify integration',
      'Trello integration',
      'Priority email support',
      'Save $20.88 per year',
    ],
  },
} as const

export const siteConfig = {
  name: 'StackBill',
  description: 'Self-hosted invoicing for developers.',
  tagline: 'Create quotes, generate invoices, and keep full control of your data.',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  githubUrl: 'https://github.com/guttership/stackbill',
  docsUrl: 'https://stackbill.tech',
}
