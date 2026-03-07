import { plans } from '@/lib/config'
import { PricingCard } from '@/components/pricing/pricing-card'
import { Check } from 'lucide-react'
import { getCurrentLocale, getCurrentMessages } from '@/lib/i18n/server'

export default async function PricingPage() {
  const locale = await getCurrentLocale()
  const messages = await getCurrentMessages()

  const monthlyFeatures =
    locale === 'fr'
      ? [
          '2 instances incluses',
          'Self-hosted',
          'Devis et factures illimites',
          'Branding personnalise',
          'Integration Clockify',
          'Integration Trello',
          'Support email',
        ]
      : [
          '2 instances included',
          'Self-hosted',
          'Unlimited quotes & invoices',
          'Custom branding',
          'Clockify integration',
          'Trello integration',
          'Email support',
        ]

  const yearlyFeatures =
    locale === 'fr'
      ? [
          '2 instances incluses',
          'Self-hosted',
          'Devis et factures illimites',
          'Branding personnalise',
          'Integration Clockify',
          'Integration Trello',
          'Support email prioritaire',
          messages.pricing.savePerYear,
        ]
      : [
          '2 instances included',
          'Self-hosted',
          'Unlimited quotes & invoices',
          'Custom branding',
          'Clockify integration',
          'Trello integration',
          'Priority email support',
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
            <h1 className="page-title">{messages.pricing.title}</h1>
            <p className="text-xl md:text-2xl text-[#676060] max-w-2xl mx-auto leading-relaxed">
              {messages.pricing.subtitle}
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
            <PricingCard plan={monthlyPlan} recommended={false} locale={locale} />
            <PricingCard plan={yearlyPlan} recommended={true} locale={locale} />
          </div>

          <div className="mt-24 max-w-4xl mx-auto">
            <h2 className="section-title text-center mb-12">{messages.pricing.includedTitle}</h2>
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
              {messages.pricing.includedFeatures.map((feature) => (
                <div key={feature} className="flex items-start gap-4">
                  <div className="mt-1">
                    <div className="w-5 h-5 rounded-full bg-[color:var(--brand-primary)]/20 flex items-center justify-center">
                      <Check className="h-3.5 w-3.5 text-[#4f4a4a]" />
                    </div>
                  </div>
                  <span className="text-base text-[#555353] leading-relaxed">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
