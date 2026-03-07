'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/lib/config'
import { usePathname } from 'next/navigation'
import { getMessages } from '@/lib/i18n/messages'
import type { Locale } from '@/lib/i18n/detect-locale'

export function Header({ locale }: { locale: Locale }) {
  const pathname = usePathname()
  const messages = getMessages(locale)

  const navItems = [
    { href: '/#features', label: messages.header.features },
    { href: '/pricing', label: messages.header.pricing },
    { href: '/#faq', label: messages.header.faq },
    { href: siteConfig.docsUrl, label: messages.header.docs },
  ]

  return (
    <header className="topnav-glass fixed top-0 left-0 right-0 z-50">
      <div className="relative container flex h-28 items-center justify-between px-6 md:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="group flex items-center py-3">
            <Image
              src="/images/logo.svg"
              alt={siteConfig.name}
              width={360}
              height={80}
              className="h-14 w-auto transition-opacity group-hover:opacity-90"
              priority
            />
          </Link>

          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const isExternal = item.href.startsWith('http')
              const isActive = !isExternal && item.href === '/pricing' && pathname.startsWith('/pricing')

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  className="rounded-xl px-4 py-2 text-sm font-medium text-[#555353] transition-all hover:bg-black/5 hover:text-[#3f3a3a]"
                  style={
                    isActive
                      ? {
                          backgroundColor: 'rgba(0,0,0,0.05)',
                          boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.08), inset 0 0 0 1px rgba(0,0,0,0.12)',
                          color: 'var(--brand-accent)',
                        }
                      : undefined
                  }
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/pricing">
            <Button size="sm" className="min-w-[170px]">
              {messages.header.cta}
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
