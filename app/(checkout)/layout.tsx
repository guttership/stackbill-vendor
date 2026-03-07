import type { Metadata } from 'next'
import { siteConfig } from '@/lib/config'
import Link from 'next/link'

export const metadata: Metadata = {
  title: `Checkout - ${siteConfig.name}`,
  description: siteConfig.description,
}

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center">
          <Link href="/" className="font-bold text-xl">
            {siteConfig.name}
          </Link>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center">
        {children}
      </main>
    </div>
  )
}
