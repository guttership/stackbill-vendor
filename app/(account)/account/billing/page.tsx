import type { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Billing',
  description: 'Manage subscription and billing settings for StackBill.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function BillingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Billing</h1>
        <p className="mt-1 text-sm text-gray-600">Manage your plan, payment method, and invoices.</p>
      </div>

      <Card className="p-6">
        <CardHeader className="p-0">
          <CardTitle>Billing details</CardTitle>
        </CardHeader>
        <CardContent className="px-0 pb-0 pt-4 text-sm text-gray-600">
          Billing controls will appear here once the account is connected to Stripe customer data.
        </CardContent>
      </Card>
    </div>
  )
}
