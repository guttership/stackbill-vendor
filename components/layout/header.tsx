'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/lib/config'
import { useEffect, useState, useCallback, useMemo } from 'react'
import { cn } from '@/lib/utils'
import { getMessages } from '@/lib/i18n/messages'
import type { Locale } from '@/lib/i18n/detect-locale'

type HeaderProps = {
  locale?: Locale
}

function readCookieLocale(): Locale | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(/(?:^|;\s*)NEXT_LOCALE=([^;]+)/)
  if (!match) return null
  const v = match[1].toLowerCase().trim()
  if (v === 'fr') return 'fr'
  if (v === 'en') return 'en'
  return null
}

export function Header({ locale = 'en' }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const [currentLocale, setCurrentLocale] = useState<Locale>(locale)

  // Sync client state with cookie on mount (cookie may differ from server-rendered locale)
  useEffect(() => {
    const cookieLocale = readCookieLocale()
    if (cookieLocale && cookieLocale !== currentLocale) {
      setCurrentLocale(cookieLocale)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const messages = useMemo(() => getMessages(currentLocale), [currentLocale])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const switchLocale = useCallback((next: Locale) => {
    document.cookie = `NEXT_LOCALE=${next};path=/;max-age=31536000;SameSite=Lax`
    setCurrentLocale(next)
    // Force a full reload so all server components re-render with the new cookie
    window.location.reload()
  }, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300 topnav-glass',
        scrolled && 'shadow-apple-sm'
      )}
    >
      <div className="container flex h-24 items-center justify-between px-6 md:px-8 py-4">
        <div className="flex gap-12 items-center">
          <Link href="/" className="flex items-center py-2">
            <Image
              src="/images/logo.svg"
              alt={siteConfig.name}
              width={360}
              height={80}
              className="h-16 w-auto transition-opacity group-hover:opacity-80"
              priority
            />
          </Link>
          <nav className="hidden md:flex gap-8">
            <Link href="/#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              {messages.header.features}
            </Link>
            <Link href="/pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              {messages.header.pricing}
            </Link>
            <Link href="/#faq" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              {messages.header.faq}
            </Link>
            <Link href={siteConfig.docsUrl} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              {messages.header.docs}
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
            <button
              onClick={() => switchLocale('fr')}
              className={cn('px-2 py-1 rounded transition-colors hover:text-foreground', currentLocale === 'fr' && 'text-foreground font-semibold')}
              aria-label="Passer en francais"
            >
              FR
            </button>
            <span className="opacity-30">|</span>
            <button
              onClick={() => switchLocale('en')}
              className={cn('px-2 py-1 rounded transition-colors hover:text-foreground', currentLocale === 'en' && 'text-foreground font-semibold')}
              aria-label="Switch to English"
            >
              EN
            </button>
          </div>
          <Link href="/pricing">
            <Button size="default">{messages.header.cta}</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
