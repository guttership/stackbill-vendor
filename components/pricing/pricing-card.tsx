'use client'

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckoutButton } from '@/components/checkout/checkout-button'
import { Check } from 'lucide-react'
import type { Plan } from '@/types/plan'
import type { Locale } from '@/lib/i18n/detect-locale'
import { getMessages } from '@/lib/i18n/messages'

interface PricingCardProps {
  plan: Plan
  recommended?: boolean
  locale: Locale
}

export function PricingCard({ plan, recommended = false, locale }: PricingCardProps) {
  const messages = getMessages(locale)

  const formattedPrice = plan.interval === 'month' 
    ? `$${plan.price}/mo` 
    : `$${plan.price}/yr`

  const savings = plan.interval === 'year' ? messages.pricing.savePerYear : null

  return (
    <Card className={recommended ? 'relative scale-[1.02] border-[color:var(--brand-primary)]/30 shadow-apple-lg' : 'relative'}>
      {recommended && (
        <div className="absolute -top-5 left-0 right-0 flex justify-center">
          <Badge className="px-5 py-1.5 shadow-apple bg-[color:var(--brand-primary)] text-[#3f3a3a]">{messages.pricing.bestValue}</Badge>
        </div>
      )}
      
      <CardHeader className="pb-10">
        <CardTitle className="text-2xl" style={{ fontFamily: 'var(--brand-font-heading)' }}>{plan.name}</CardTitle>
        <div className="pt-6">
          <span className="text-5xl font-semibold tracking-tight text-[#3f3a3a]">
            {formattedPrice}
          </span>
        </div>
        {savings && (
          <Badge variant="outline" className="w-fit mt-4 border-[color:var(--brand-primary)]/40 text-[#4f4a4a]">
            Save {savings} per year
          </Badge>
        )}
      </CardHeader>

      <CardContent className="space-y-8">
        <ul className="space-y-4">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-4">
              <div className="mt-0.5">
                <div className="w-5 h-5 rounded-full bg-[color:var(--brand-primary)]/20 flex items-center justify-center">
                  <Check className="h-3.5 w-3.5 text-[#4f4a4a]" />
                </div>
              </div>
              <span className="text-sm text-[#555353] leading-relaxed">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter className="pt-6">
        <CheckoutButton 
          priceId={plan.priceId}
          planName={plan.name}
          locale={locale}
          className="w-full h-12 text-base font-medium"
        />
      </CardFooter>
    </Card>
  )
}
