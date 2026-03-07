'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/lib/config'
import { usePathname } from 'next/navigation'
import { getMessages } from '@/lib/i18n/messages'
import type { Locale } from '@/lib/i18n/detect-locale'

export function Header({ locale }: { locale: Locale }) {
  const pathname = usePathname()
  const [activeSection, setActiveSection] = useState('')
  const messages = getMessages(locale)

  const navItems = [
    { href: '/#features', label: messages.header.features },
    { href: '/pricing', label: messages.header.pricing },
    { href: '/#faq', label: messages.header.faq },
    { href: siteConfig.docsUrl, label: messages.header.docs },
  ]

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const sectionIds = ['features', 'faq']

    const syncActiveSection = () => {
      if (pathname !== '/') {
        setActiveSection('')
        return
      }

      const hash = window.location.hash.replace('#', '')
      if (sectionIds.includes(hash)) {
        setActiveSection(hash)
        return
      }

      let currentSection = ''
      for (const sectionId of sectionIds) {
        const section = document.getElementById(sectionId)
        if (!section) {
          continue
        }

        const { top } = section.getBoundingClientRect()
        if (top <= 140) {
          currentSection = sectionId
        }
      }

      setActiveSection(currentSection)
    }

    syncActiveSection()
    window.addEventListener('hashchange', syncActiveSection)
    window.addEventListener('scroll', syncActiveSection, { passive: true })

    return () => {
      window.removeEventListener('hashchange', syncActiveSection)
      window.removeEventListener('scroll', syncActiveSection)
    }
  }, [pathname])

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
              const isPricing = item.href === '/pricing'
              const sectionTarget = item.href.startsWith('/#') ? item.href.replace('/#', '') : ''
              const isActive =
                !isExternal &&
                ((isPricing && pathname.startsWith('/pricing')) ||
                  (sectionTarget.length > 0 && pathname === '/' && activeSection === sectionTarget))

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
