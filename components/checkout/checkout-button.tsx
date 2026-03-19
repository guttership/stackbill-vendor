'use client'

import { useState } from 'react'
import { Button, type ButtonProps } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import type { Locale } from '@/lib/i18n/detect-locale'
import { getMessages } from '@/lib/i18n/messages'

interface CheckoutButtonProps extends Omit<ButtonProps, 'onClick' | 'disabled'> {
  priceId: string
  planName: string
  locale: Locale
}

export function CheckoutButton({ 
  priceId, 
  planName,
  locale,
  className,
  ...props 
}: CheckoutButtonProps) {
  const messages = getMessages(locale)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleCheckout = async () => {
    if (!priceId) {
      setError(messages.checkout.errors.priceNotConfigured)
      return
    }

    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || messages.checkout.errors.failedSession)
      }

      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error(messages.checkout.errors.noCheckoutUrl)
      }
    } catch (err) {
      console.error('Checkout error:', err)
      setError(err instanceof Error ? err.message : messages.checkout.errors.generic)
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full space-y-2">
      <Button
        onClick={handleCheckout}
        disabled={isLoading}
        className={className}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {messages.checkout.loading}
          </>
        ) : (
          messages.pricing.getStarted
        )}
      </Button>
      
      {error && (
        <p className="text-sm text-red-500 text-center">{error}</p>
      )}
    </div>
  )
}
