import type { Metadata } from 'next'
import { siteConfig } from '@/lib/config'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How StackBill handles account, purchase, and support information.',
  alternates: {
    canonical: `${siteConfig.url}/legal/privacy`,
  },
}

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <article className="mx-auto max-w-3xl space-y-6">
        <h1 className="page-title">Privacy Policy</h1>
        <p className="text-lg leading-relaxed text-[#555353]">
          This policy explains the data we process for checkout, account access, downloads, analytics, and support.
        </p>
        <section className="space-y-3">
          <h2 className="section-title">Data we collect</h2>
          <p className="text-sm leading-relaxed text-[#555353]">
            We may process your email address, purchase details, license information, and limited analytics data
            needed to operate the service and deliver downloads.
          </p>
        </section>
        <section className="space-y-3">
          <h2 className="section-title">How we use it</h2>
          <p className="text-sm leading-relaxed text-[#555353]">
            Data is used to provide access, manage subscriptions or licenses, prevent abuse, and support customers.
          </p>
        </section>
        <section className="space-y-3">
          <h2 className="section-title">Contact</h2>
          <p className="text-sm leading-relaxed text-[#555353]">
            If you have privacy questions, use the support details listed on the documentation page.
          </p>
        </section>
      </article>
    </div>
  )
}
