import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Key, Copy, ExternalLink, Plus } from 'lucide-react'
import { getCurrentMessages } from '@/lib/i18n/server'

export default async function LicensesPage() {
  const messages = await getCurrentMessages()

  // TODO: Fetch licenses from database
  // TODO: Implement license activation
  // TODO: Implement instance management
  // TODO: Implement license key copying

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{messages.account.licenses.title}</h1>
          <p className="mt-1 text-sm text-gray-600">
            {messages.account.licenses.subtitle}
          </p>
        </div>
        <Button disabled>
          <Plus className="h-4 w-4 mr-2" />
          {messages.account.licenses.addInstance}
        </Button>
      </div>

      {/* License info card */}
      <Card className="p-6 bg-blue-50 border-blue-200">
        <div className="flex items-start gap-3">
          <Key className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <h3 className="font-medium text-blue-900">{messages.account.licenses.yourLicense}</h3>
            <p className="text-sm text-blue-700 mt-1">
              {messages.account.licenses.yourLicenseText}
            </p>
          </div>
        </div>
      </Card>

      {/* License key card */}
      <Card className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold">{messages.account.licenses.licenseKey}</h2>
            <p className="text-sm text-gray-600 mt-1">
              {messages.account.licenses.licenseKeyText}
            </p>
          </div>
          <Badge variant="default">Active</Badge>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <code className="text-sm font-mono">XXXX-XXXX-XXXX-XXXX</code>
            <Button variant="outline" size="sm" disabled>
              <Copy className="h-4 w-4 mr-2" />
              {messages.account.licenses.copy}
            </Button>
          </div>
        </div>

        <div className="mt-4 text-sm text-gray-600">
          <p>{messages.account.licenses.created}</p>
          <p>{messages.account.licenses.instances}</p>
        </div>
        {/* TODO: Display actual license key from database */}
        {/* TODO: Implement copy to clipboard functionality */}
      </Card>

      {/* Active instances */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">{messages.account.licenses.activeInstances}</h2>
        
        <div className="text-center py-12 text-gray-500">
          <Key className="h-12 w-12 mx-auto mb-3 text-gray-400" />
          <p className="text-sm font-medium">{messages.account.licenses.noInstance}</p>
          <p className="text-xs mt-1">
            {messages.account.licenses.noInstanceText}
          </p>
        </div>
        {/* TODO: Display list of activated instances */}
        {/* TODO: Add instance management actions */}
      </Card>

      {/* How to activate */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-3">{messages.account.licenses.howToActivate}</h2>
        <ol className="space-y-3 text-sm text-gray-700">
          {messages.account.licenses.steps.map((step, index) => (
            <li className="flex gap-3" key={step}>
              <span className="font-semibold text-gray-900">{index + 1}.</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
        <div className="mt-4">
          <Button variant="outline" size="sm" disabled>
            <ExternalLink className="h-4 w-4 mr-2" />
            {messages.account.licenses.viewDocs}
          </Button>
        </div>
      </Card>
    </div>
  )
}
