import type { Metadata } from 'next'
import { siteConfig } from '@/lib/config'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms that apply to the use of StackBill and related services.',
  alternates: {
    canonical: `${siteConfig.url}/legal/terms`,
  },
}

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <article className="mx-auto max-w-3xl space-y-6">
        <h1 className="page-title">Terms of Service</h1>
        <p className="text-lg leading-relaxed text-[#555353]">
          These terms apply to StackBill, including the website, checkout flow, account portal, and downloadable
          software.
        </p>
        <section className="space-y-3">
          <h2 className="section-title">Use of the service</h2>
          <p className="text-sm leading-relaxed text-[#555353]">
            You may use StackBill for lawful business purposes only. You are responsible for the content you create,
            the data you upload, and the infrastructure you operate when self-hosting.
          </p>
        </section>
        <section className="space-y-3">
          <h2 className="section-title">Licensing and support</h2>
          <p className="text-sm leading-relaxed text-[#555353]">
            Purchases grant access to the selected plan and associated downloads. Support and update rights depend on
            the terms shown at checkout.
          </p>
        </section>
        <section className="space-y-3">
          <h2 className="section-title">Contact</h2>
          <p className="text-sm leading-relaxed text-[#555353]">
            Questions about these terms can be sent through the documentation or the support channels listed on the
            site.
          </p>
        </section>
      </article>
    </div>
  )
}
