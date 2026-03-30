import type { Metadata } from 'next'
import { Fira_Sans, Geist_Mono } from 'next/font/google'
import Script from 'next/script'
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

const googleAnalyticsId = 'G-KVSDP1S9XJ'

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.description}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.tagline,
  keywords: siteConfig.keywords,
  authors: [{ name: 'StackBill', url: siteConfig.url }],
  creator: 'StackBill',
  publisher: 'StackBill',
  category: siteConfig.category,
  manifest: '/favicon/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon/favicon.ico', sizes: 'any' },
      { url: '/favicon/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteConfig.url,
    languages: {
      'en-US': `${siteConfig.url}`,
      'fr-FR': `${siteConfig.url}`,
    },
  },
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    alternateLocale: ['fr_FR'],
    url: siteConfig.url,
    title: `${siteConfig.name} — ${siteConfig.description}`,
    description: siteConfig.tagline,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — Self-hosted invoicing for developers`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} — ${siteConfig.description}`,
    description: siteConfig.tagline,
    creator: siteConfig.twitterHandle,
    images: [siteConfig.ogImage],
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
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${googleAnalyticsId}');
          `}
        </Script>
        {children}
      </body>
    </html>
  )
}
