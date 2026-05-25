import type { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Settings',
  description: 'Update account settings and security preferences for StackBill.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="mt-1 text-sm text-gray-600">Update your profile, notifications, and security options.</p>
      </div>

      <Card className="p-6">
        <CardHeader className="p-0">
          <CardTitle>Account settings</CardTitle>
        </CardHeader>
        <CardContent className="px-0 pb-0 pt-4 text-sm text-gray-600">
          Settings controls will appear here once the user management flow is connected.
        </CardContent>
      </Card>
    </div>
  )
}
