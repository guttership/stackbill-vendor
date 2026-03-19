'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/lib/config'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

type HeaderProps = {
  locale?: string
}

export function Header(_: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header 
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        scrolled 
          ? 'glass border-b border-border/50 shadow-apple-sm' 
          : 'bg-transparent border-b border-transparent'
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
            <Link
              href="/#features"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </Link>
            <Link
              href="/pricing"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/#faq"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              FAQ
            </Link>
            <Link
              href={siteConfig.docsUrl}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Docs
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/pricing">
            <Button size="default">Get {siteConfig.name}</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
