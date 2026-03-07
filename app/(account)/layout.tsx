import Link from 'next/link'
import Image from 'next/image'
import { Home, Key, CreditCard, Settings, Menu } from 'lucide-react'
import { siteConfig } from '@/lib/config'
import { getCurrentMessages } from '@/lib/i18n/server'

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const messages = await getCurrentMessages()

  const navigation = [
    {
      name: messages.account.nav.overview,
      href: '/account',
      icon: Home,
    },
    {
      name: messages.account.nav.licenses,
      href: '/account/licenses',
      icon: Key,
    },
    {
      name: messages.account.nav.billing,
      href: '/account/billing',
      icon: CreditCard,
    },
    {
      name: messages.account.nav.settings,
      href: '/account/settings',
      icon: Settings,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 py-4">
            <div className="flex items-center py-2">
              <Link href="/" className="flex items-center">
                <Image
                  src="/images/logo.svg"
                  alt={siteConfig.name}
                  width={300}
                  height={70}
                  className="h-14 w-auto"
                />
              </Link>
            </div>
            <div className="flex items-center gap-4">
              {/* TODO: Add user menu */}
              <button className="p-2 rounded-md hover:bg-gray-100">
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="w-64 flex-shrink-0">
            <nav className="space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <Icon className="h-5 w-5 text-gray-500" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </nav>

            {/* Support section */}
            <div className="mt-8 p-4 bg-white rounded-lg border border-gray-200">
              <h3 className="text-sm font-medium mb-2">{messages.account.helpTitle}</h3>
              <p className="text-xs text-gray-600 mb-3">
                {messages.account.helpText}
              </p>
              <Link
                href="https://stackbill.tech"
                className="text-xs text-blue-600 hover:text-blue-700"
              >
                {messages.account.helpCta}
              </Link>
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1 min-w-0">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
