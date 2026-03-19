import type { Metadata } from 'next'
import { plans, siteConfig } from '@/lib/config'
import { PricingCard } from '@/components/pricing/pricing-card'
import { Check } from 'lucide-react'
import { getCurrentLocale, getCurrentMessages } from '@/lib/i18n/server'

export const dynamic = 'force-dynamic'
import { AnimateOnScroll } from '@/components/marketing/animate-on-scroll'

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Simple, transparent pricing for StackBill. Start with a monthly or yearly license. Self-hosted, no recurring SaaS fees — pay once and own your data.',
  alternates: {
    canonical: `${siteConfig.url}/pricing`,
  },
  openGraph: {
    url: `${siteConfig.url}/pricing`,
    title: `Pricing | ${siteConfig.name}`,
    description:
      'Simple, transparent pricing for StackBill. Start with a monthly or yearly license. Self-hosted, no recurring SaaS fees — pay once and own your data.',
  },
}

export default async function PricingPage() {
  const locale = await getCurrentLocale()
  const messages = await getCurrentMessages()

  const monthlyFeatures =
    locale === 'fr'
      ? [
          '2 instances incluses',
          'Mises à jour incluses',
          'Déploiement self-hosted',
          'Intégration Clockify',
          'Intégration Trello',
        ]
      : [
          '2 instances included',
          'Updates included',
          'Self-hosted deployment',
          'Clockify integration',
          'Trello integration',
        ]

  const yearlyFeatures =
    locale === 'fr'
      ? [
          '2 instances incluses',
          'Mises à jour incluses',
          'Déploiement self-hosted',
          'Intégration Clockify',
          'Intégration Trello',
          messages.pricing.savePerYear,
        ]
      : [
          '2 instances included',
          'Updates included',
          'Self-hosted deployment',
          'Clockify integration',
          'Trello integration',
          messages.pricing.savePerYear,
        ]

  const monthlyPlan = {
    ...plans.monthly,
    name: locale === 'fr' ? 'Mensuel' : 'Monthly',
    features: monthlyFeatures,
  }

  const yearlyPlan = {
    ...plans.yearly,
    name: locale === 'fr' ? 'Annuel' : 'Yearly',
    features: yearlyFeatures,
  }

  return (
    <div className="relative z-10 flex flex-col min-h-screen text-[#463f3f]">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh opacity-70"></div>
        <div className="container relative mx-auto px-6 md:px-8 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <AnimateOnScroll animation="slide-up">
              <h1 className="page-title">{messages.pricing.title}</h1>
            </AnimateOnScroll>
            <AnimateOnScroll animation="slide-up" delay={100}>
              <p className="text-xl md:text-2xl text-[#676060] max-w-2xl mx-auto leading-relaxed">
                {messages.pricing.subtitle}
              </p>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
            <AnimateOnScroll animation="scale-up">
              <PricingCard plan={monthlyPlan} recommended={false} locale={locale} />
            </AnimateOnScroll>
            <AnimateOnScroll animation="scale-up" delay={100}>
              <PricingCard plan={yearlyPlan} recommended={true} locale={locale} />
            </AnimateOnScroll>
          </div>

          <div className="mt-24 max-w-4xl mx-auto">
            <AnimateOnScroll animation="slide-up">
              <h2 className="section-title text-center mb-12">{messages.pricing.includedTitle}</h2>
            </AnimateOnScroll>
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
              {messages.pricing.includedFeatures.map((feature, index) => (
                <AnimateOnScroll key={feature} animation="slide-up" delay={index * 50}>
                  <div className="flex items-start gap-4">
                    <div className="mt-1">
                      <div className="w-5 h-5 rounded-full bg-[color:var(--brand-primary)]/20 flex items-center justify-center">
                        <Check className="h-3.5 w-3.5 text-[#4f4a4a]" />
                      </div>
                    </div>
                    <span className="text-base text-[#555353] leading-relaxed">{feature}</span>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
