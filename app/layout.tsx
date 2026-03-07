import type { Metadata } from 'next'
import { Fira_Sans, Geist_Mono } from 'next/font/google'
import './globals.css'
import { siteConfig } from '@/lib/config'
import { getCurrentLocale } from '@/lib/i18n/server'

const firaSans = Fira_Sans({
  variable: '--font-fira-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} - ${siteConfig.description}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.tagline,
  keywords: [
    'invoicing',
    'self-hosted',
    'developers',
    'quotes',
    'billing',
    'open-source',
  ],
  authors: [{ name: 'StackBill' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.tagline,
    siteName: siteConfig.name,
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getCurrentLocale()

  return (
    <html lang={locale}>
      <body className={`${firaSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
