import Link from 'next/link'
import Image from 'next/image'
import { siteConfig } from '@/lib/config'
import { getMessages } from '@/lib/i18n/messages'
import type { Locale } from '@/lib/i18n/detect-locale'

export function Footer({ locale }: { locale: Locale }) {
  const messages = getMessages(locale)

  return (
    <footer className="border-t border-black/15 bg-transparent">
      <div className="mx-auto w-full max-w-6xl px-6 md:px-8 py-10 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center mb-4">
              <Image
                src="/images/logo.svg"
                alt={siteConfig.name}
                width={260}
                height={120}
                className="h-[88px] w-auto"
              />
            </Link>
            <p className="text-sm text-[#555353] max-w-[22rem]">
              {siteConfig.description}
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-sm text-[#3f3a3a]">{messages.footer.product}</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/#features"
                  className="text-sm text-[#555353] hover:text-[#2f2b2b] transition-colors"
                >
                  {messages.header.features}
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-sm text-[#555353] hover:text-[#2f2b2b] transition-colors"
                >
                  {messages.header.pricing}
                </Link>
              </li>
              <li>
                <Link
                  href={siteConfig.docsUrl}
                  className="text-sm text-[#555353] hover:text-[#2f2b2b] transition-colors"
                >
                  {messages.footer.documentation}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-sm text-[#3f3a3a]">{messages.footer.resources}</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href={siteConfig.githubUrl}
                  className="text-sm text-[#555353] hover:text-[#2f2b2b] transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </Link>
              </li>
              <li>
                <Link
                  href="/#faq"
                  className="text-sm text-[#555353] hover:text-[#2f2b2b] transition-colors"
                >
                  {messages.header.faq}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-sm text-[#3f3a3a]">{messages.footer.legal}</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/legal/terms"
                  className="text-sm text-[#555353] hover:text-[#2f2b2b] transition-colors"
                >
                  {messages.footer.terms}
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/privacy"
                  className="text-sm text-[#555353] hover:text-[#2f2b2b] transition-colors"
                >
                  {messages.footer.privacy}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-black/15 pt-8">
          <p className="text-sm text-[#676060] text-center">
            &copy; {new Date().getFullYear()} {siteConfig.name}. {messages.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  )
}
