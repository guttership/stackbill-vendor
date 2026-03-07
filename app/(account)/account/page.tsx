import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Activity, Key, CreditCard, AlertCircle } from 'lucide-react'
import { getCurrentMessages } from '@/lib/i18n/server'

export default async function AccountPage() {
  const messages = await getCurrentMessages()

  // TODO: Fetch actual user data from database
  // TODO: Fetch subscription status from Stripe
  // TODO: Fetch license information

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{messages.account.overview.title}</h1>
        <p className="mt-1 text-sm text-gray-600">
          {messages.account.overview.subtitle}
        </p>
      </div>

      {/* Subscription status card */}
      <Card className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold mb-2">{messages.account.overview.subStatus}</h2>
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="default">{messages.account.overview.active}</Badge>
              <span className="text-sm text-gray-600">{messages.account.overview.monthlyPlan}</span>
            </div>
            <div className="space-y-1 text-sm text-gray-600">
              <p>{messages.account.overview.nextBilling}</p>
              <p>{messages.account.overview.amount}</p>
            </div>
          </div>
          <CreditCard className="h-8 w-8 text-gray-400" />
        </div>
        {/* TODO: Add manage subscription button */}
        {/* TODO: Add cancel subscription option */}
      </Card>

      {/* Quick stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{messages.account.overview.quickStats.activeLicenses}</p>
              <p className="text-2xl font-bold mt-1">1</p>
              <p className="text-xs text-gray-500 mt-1">{messages.account.overview.quickStats.ofAvailable}</p>
            </div>
            <Key className="h-8 w-8 text-blue-500" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{messages.account.overview.quickStats.activeInstances}</p>
              <p className="text-2xl font-bold mt-1">0</p>
              <p className="text-xs text-gray-500 mt-1">{messages.account.overview.quickStats.instancesRunning}</p>
            </div>
            <Activity className="h-8 w-8 text-green-500" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{messages.account.overview.quickStats.accountStatus}</p>
              <p className="text-2xl font-bold mt-1">{messages.account.overview.quickStats.good}</p>
              <p className="text-xs text-gray-500 mt-1">{messages.account.overview.quickStats.noIssues}</p>
            </div>
            <AlertCircle className="h-8 w-8 text-gray-400" />
          </div>
        </Card>
      </div>

      {/* Recent activity */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">{messages.account.overview.recentActivity}</h2>
        <div className="space-y-4">
          <div className="flex items-start gap-3 text-sm">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
            <div>
              <p className="font-medium">{messages.account.overview.activated}</p>
              <p className="text-gray-600 text-xs">March 7, 2026</p>
            </div>
          </div>
          <div className="flex items-start gap-3 text-sm">
            <div className="w-2 h-2 bg-gray-300 rounded-full mt-1.5"></div>
            <div>
              <p className="font-medium text-gray-500">{messages.account.overview.noActivity}</p>
              <p className="text-gray-500 text-xs">{messages.account.overview.startUsing}</p>
            </div>
          </div>
        </div>
        {/* TODO: Fetch and display actual activity from database */}
      </Card>
    </div>
  )
}
