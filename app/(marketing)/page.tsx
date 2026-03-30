import type { Metadata } from 'next'
import Link from 'next/link'
import { readdir } from 'node:fs/promises'
import path from 'node:path'
import {
  Server,
  Code2,
  FileText,
  Clock,
  Trello,
  Download,
  ChevronRight,
  Check,
  Play,
  Key,
  Zap,
  Github,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AnimateOnScroll } from '@/components/marketing/animate-on-scroll'
import { HeroSlideshow } from '@/components/marketing/hero-slideshow'
import { siteConfig } from '@/lib/config'
import { getCurrentMessages } from '@/lib/i18n/server'

export const metadata: Metadata = {
  title: 'Self-Hosted Invoicing for Developers and Freelancers',
  description:
    'Self-hosted invoicing for developers and freelancers. Own your data, avoid SaaS lock-in, and deploy billing for clients as recurring revenue.',
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    url: siteConfig.url,
    title: 'Self-Hosted Invoicing for Developers and Freelancers',
    description:
      'Self-hosted invoicing for developers and freelancers. Own your data, avoid SaaS lock-in, and deploy billing for clients as recurring revenue.',
  },
}

export const dynamic = 'force-dynamic'

async function getHeroSlides() {
  try {
    const imagesDir = path.join(process.cwd(), 'public', 'images')
    const fileNames = await readdir(imagesDir)
    const slides = fileNames
      .filter((fileName) => fileName.endsWith('.webp'))
      .filter((fileName) => !fileName.startsWith('logo'))
      .sort((a, b) => a.localeCompare(b))
      .map((fileName) => `/images/${fileName}`)

    if (slides.length > 0) {
      return slides
    }
  } catch {
    // Ignore filesystem errors and use a safe fallback image.
  }

  return ['/images/image.webp']
}

function SoftwareApplicationJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: siteConfig.name,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Linux, macOS, Windows',
    description: siteConfig.tagline,
    url: siteConfig.url,
    license: 'https://opensource.org/licenses/MIT',
    softwareVersion: '1.0',
    author: {
      '@type': 'Organization',
      name: 'StackBill',
      url: siteConfig.url,
    },
    offers: {
      '@type': 'Offer',
      price: '10',
      priceCurrency: 'EUR',
      priceValidUntil: '2027-12-31',
    },
    featureList: [
      'Self-hosted deployment',
      'Invoice and quote generation',
      'PDF export',
      'Clockify integration',
      'Trello integration',
      'Custom branding',
      'Open source',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export default async function HomePage() {
  const messages = await getCurrentMessages()
  const heroSlides = await getHeroSlides()

  const whyIcons = [Server, Code2, FileText]
  const clientDeployIcons = [Server, FileText, Code2]
  const howItWorksIcons = [Play, Key, Zap]
  const integrationIcons = [Clock, Trello]
  const seoLinks = [
    { href: '/invoice-software-for-developers', label: 'Invoice software for developers' },
    { href: '/self-hosted-invoicing-software', label: 'Self-hosted invoicing software' },
    { href: '/white-label-invoicing-software', label: 'White-label invoicing software' },
    { href: '/quickbooks-alternative-for-developers', label: 'QuickBooks alternative for developers' },
    { href: '/self-hosted-invoicing-vs-saas', label: 'Self-hosted invoicing vs SaaS' },
    { href: '/blog', label: 'Developer invoicing blog' },
  ]

  return (
    <>
      <SoftwareApplicationJsonLd />
      <div className="relative z-10 flex flex-col overflow-hidden text-[#463f3f]">

        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="relative overflow-hidden border-b border-black/10">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8 animate-slide-right">
                <div className="space-y-4">
                  <h1 className="page-title">{messages.marketing.heroTitle}</h1>
                  <p className="text-xl max-w-[600px] text-[#555353]">{messages.marketing.heroSubtitle}</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" asChild>
                    <Link href="/pricing">
                      {messages.marketing.heroPrimaryCta}
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="relative animate-slide-left">
                <HeroSlideshow images={heroSlides} />
              </div>
            </div>
          </div>
        </section>

        {/* ── Client deploy (primary value) ─────────────────────── */}
        <section id="features" className="border-b border-black/10 bg-[#fafaf9]">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <AnimateOnScroll animation="slide-up">
              <div className="mx-auto mb-12 max-w-3xl space-y-4 text-center">
                <h2 className="section-title">{messages.marketing.clientDeployTitle}</h2>
                <p className="text-lg leading-relaxed text-[#555353]">{messages.marketing.clientDeployText}</p>
                <div className="pt-2">
                  <Button size="lg" asChild>
                    <Link href="/pricing">
                      {messages.marketing.pricingHighlightPrimaryCta}
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </AnimateOnScroll>

            <div className="grid gap-6 md:grid-cols-3">
              {messages.marketing.clientDeployCards.map((card, index) => {
                const Icon = clientDeployIcons[index]

                return (
                  <AnimateOnScroll key={card.title} animation="slide-up" delay={index * 100}>
                    <Card className="h-full border border-black/5 bg-white/88 hover-lift">
                      <CardHeader className="p-6">
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:var(--brand-accent)]/15 text-[#3f3a3a]">
                          <Icon className="h-6 w-6" />
                        </div>
                        <CardTitle>{card.title}</CardTitle>
                        <CardDescription>{card.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  </AnimateOnScroll>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── SaaS contrast ──────────────────────────────────────── */}
        <section className="border-b border-black/10 bg-[#fafaf9]">
          <div className="container mx-auto px-4 py-16 md:py-20">
            <AnimateOnScroll animation="slide-up">
              <div className="mx-auto max-w-3xl space-y-6 text-center">
                <h2 className="section-title">{messages.marketing.saasContrastTitle}</h2>
                {messages.marketing.saasContrastText.map((text, index) => (
                  <p key={index} className="text-lg leading-relaxed text-[#555353]">{text}</p>
                ))}
              </div>
            </AnimateOnScroll>
          </div>
        </section>

        {/* ── Why cards ──────────────────────────────────────────── */}
        <section className="border-b border-black/10">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <AnimateOnScroll animation="slide-up">
              <div className="mx-auto mb-12 max-w-2xl space-y-4 text-center">
                <h2 className="section-title">{messages.marketing.whyTitle}</h2>
                <p className="text-lg leading-relaxed text-[#555353]">{messages.marketing.whySubtitle}</p>
              </div>
            </AnimateOnScroll>

            <div className="grid gap-6 md:grid-cols-3">
              {messages.marketing.whyCards.map((card, index) => {
                const Icon = whyIcons[index]

                return (
                  <AnimateOnScroll key={card.title} animation="scale-up" delay={index * 100}>
                    <Card className="h-full border border-black/5 bg-white/92 hover-lift">
                      <CardHeader className="p-6">
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:var(--brand-primary)]/15 text-[#3f3a3a]">
                          <Icon className="h-6 w-6" />
                        </div>
                        <CardTitle>{card.title}</CardTitle>
                        <CardDescription>{card.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  </AnimateOnScroll>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── Target audience ────────────────────────────────────── */}
        <section className="border-b border-black/10 bg-[#fafaf9]">
          <div className="container mx-auto px-4 py-16 md:py-20">
            <AnimateOnScroll animation="slide-up">
              <div className="mx-auto max-w-2xl space-y-4 text-center">
                <h2 className="section-title">{messages.marketing.targetAudienceTitle}</h2>
                <p className="text-lg leading-relaxed text-[#555353]">{messages.marketing.targetAudienceText}</p>
              </div>
            </AnimateOnScroll>
          </div>
        </section>

        {/* ── Pricing highlight ──────────────────────────────────── */}
        <section className="border-b border-black/10">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <AnimateOnScroll animation="slide-up">
              <div className="mx-auto mb-12 max-w-3xl space-y-4 text-center">
                <h2 className="section-title">{messages.marketing.pricingHighlightTitle}</h2>
                <p className="text-lg text-[#676060]">{messages.marketing.pricingHighlightSubtitle}</p>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="scale-up">
              <Card className="mx-auto max-w-3xl border border-black/5 bg-white/92 hover-scale">
                <CardHeader className="p-8">
                  <Badge variant="outline" className="w-fit border-black/10 bg-white/85 px-3 py-1 text-[#3f3a3a]">
                    {siteConfig.name}
                  </Badge>
                  <CardTitle className="mt-4 text-[calc(1.6rem*var(--brand-font-heading-scale,1))]">
                    {messages.marketing.pricingHighlightNote}
                  </CardTitle>
                  <CardDescription className="text-base">{messages.marketing.pricingHighlightReassurance}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 p-8 pt-0">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-[1.4rem] border border-black/15 bg-[#7b7373] px-6 py-5 text-center shadow-sm">
                      <p className="text-2xl font-semibold text-white">{messages.marketing.pricingHighlightMonthly}</p>
                    </div>
                    <div className="rounded-[1.4rem] border border-black/15 bg-[#7b7373] px-6 py-5 text-center shadow-sm">
                      <p className="text-2xl font-semibold text-white">{messages.marketing.pricingHighlightYearly}</p>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {messages.marketing.pricingHighlightFeatures.map((feature) => (
                      <div key={feature} className="flex items-start gap-3 text-sm text-[#555353]">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#4f4a4a]" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col gap-4 sm:flex-row">
                    <Button size="lg" asChild>
                      <Link href="/pricing">
                        {messages.marketing.pricingHighlightPrimaryCta}
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild>
                      <Link href={siteConfig.docsUrl} target="_blank" rel="noopener noreferrer">
                        {messages.marketing.pricingHighlightSecondaryCta}
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </AnimateOnScroll>
          </div>
        </section>

        {/* ── Integrations ───────────────────────────────────────── */}
        <section className="border-b border-black/10 bg-[#fafaf9]">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <AnimateOnScroll animation="slide-up">
              <div className="mx-auto mb-12 max-w-3xl space-y-4 text-center">
                <h2 className="section-title">{messages.marketing.integrationsTitle}</h2>
                <p className="text-lg leading-relaxed text-[#555353]">{messages.marketing.integrationsSubtitle}</p>
              </div>
            </AnimateOnScroll>

            <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
              {messages.marketing.integrationsCards.map((card, index) => {
                const Icon = integrationIcons[index]

                return (
                  <AnimateOnScroll key={card.title} animation="scale-up" delay={index * 100}>
                    <Card className="h-full border border-black/5 bg-white/92 hover-lift">
                      <CardHeader className="p-6">
                        <div className="mb-4 flex items-center gap-3">
                          <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${index % 2 === 0 ? 'bg-[color:var(--brand-primary)]/15' : 'bg-[color:var(--brand-accent)]/15'}`}>
                            <Icon className="h-6 w-6 text-[#4f4a4a]" />
                          </div>
                          <Badge variant="outline" className="border-black/10 bg-white/80">{card.badge}</Badge>
                        </div>
                        <CardTitle>{card.title}</CardTitle>
                        <CardDescription>{card.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  </AnimateOnScroll>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── How it works ───────────────────────────────────────── */}
        <section className="border-b border-black/10">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <AnimateOnScroll animation="slide-up">
              <div className="mx-auto mb-12 max-w-3xl space-y-4 text-center">
                <h2 className="section-title">{messages.marketing.howItWorksTitle}</h2>
              </div>
            </AnimateOnScroll>

            <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
              {messages.marketing.howItWorksSteps.map((step, index) => {
                const Icon = howItWorksIcons[index]

                return (
                  <AnimateOnScroll key={step.title} animation="slide-up" delay={index * 100}>
                    <Card className="relative h-full border border-black/5 bg-white/88 hover-lift">
                      <CardHeader className="p-7">
                        <div className="mb-5 flex items-center justify-between gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:var(--brand-accent)]/15 text-[#3f3a3a]">
                            <Icon className="h-6 w-6" />
                          </div>
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[color:var(--brand-primary)]/18 text-sm font-bold text-[#3f3a3a]">
                            {index + 1}
                          </div>
                        </div>
                        <CardTitle>{step.title}</CardTitle>
                        <CardDescription>{step.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  </AnimateOnScroll>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── Open source ────────────────────────────────────────── */}
        <section className="border-b border-black/10 bg-[#fafaf9]">
          <div className="container mx-auto px-4 py-16 md:py-20">
            <AnimateOnScroll animation="scale-up">
              <div className="glass-card mx-auto max-w-3xl space-y-5 p-8 text-center md:p-10">
                <div className="flex items-center justify-center gap-3 text-[#3f3a3a]">
                  <Github className="h-6 w-6" />
                  <Badge variant="outline" className="border-black/10 bg-white/80 px-3 py-1">MIT</Badge>
                </div>
                <h2 className="section-title">{messages.marketing.openSourceTitle}</h2>
                <p className="text-lg leading-relaxed text-[#555353]">{messages.marketing.openSourceText}</p>
                <Button variant="outline" size="lg" asChild>
                  <Link href={siteConfig.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    {messages.marketing.openSourceLink}
                  </Link>
                </Button>
              </div>
            </AnimateOnScroll>
          </div>
        </section>

        {/* ── Installation ───────────────────────────────────────── */}
        <section id="installation" className="border-b border-black/10 bg-[#fafaf9]">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <AnimateOnScroll animation="slide-up">
              <div className="mx-auto mb-12 max-w-3xl space-y-4 text-center">
                <h2 className="section-title">{messages.marketing.installationTitle}</h2>
                <p className="text-lg leading-relaxed text-[#555353]">{messages.marketing.installationText}</p>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="scale-up">
              <div className="mx-auto max-w-4xl">
                <div className="overflow-hidden rounded-[1.4rem] border border-black/10 bg-[#f4f0ea] shadow-sm">
                  <div className="flex items-center gap-2 border-b border-black/10 px-4 py-3">
                    <div className="flex gap-1.5">
                      <div className="h-3 w-3 rounded-full bg-red-500/80" />
                      <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                      <div className="h-3 w-3 rounded-full bg-green-500/80" />
                    </div>
                    <span className="ml-2 text-xs text-[#676060]">{messages.marketing.installTerminalLabel}</span>
                  </div>
                  <pre className="overflow-x-auto px-4 py-5 text-sm font-mono text-[#3f3a3a]">
                    <code>{`git clone https://github.com/guttership/stackbill.git
cd stackbill
npm install
npm run dev`}</code>
                  </pre>
                </div>

                <div className="mt-6 flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-center">
                  <p className="text-sm text-[#676060]">{messages.marketing.installFooter}</p>
                  <Button variant="outline" asChild>
                    <Link href={siteConfig.docsUrl} target="_blank" rel="noopener noreferrer">
                      {messages.marketing.installButton}
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </section>

        {/* ── FAQ ────────────────────────────────────────────────── */}
        <section id="faq" className="border-b border-black/10">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <AnimateOnScroll animation="slide-up">
              <div className="mx-auto mb-12 max-w-3xl space-y-4 text-center">
                <h2 className="section-title">{messages.marketing.faqTitle}</h2>
                <p className="text-lg text-[#676060]">{messages.marketing.faqSubtitle}</p>
              </div>
            </AnimateOnScroll>

            <div className="mx-auto max-w-3xl space-y-4">
              {messages.marketing.faqs.map((item, index) => (
                <AnimateOnScroll key={item.q} animation="slide-up" delay={index * 60}>
                  <Card className="border border-black/5 bg-white/92 hover-lift">
                    <CardHeader className="p-6">
                      <CardTitle className="text-[calc(1.1rem*var(--brand-font-heading-scale,1))]">{item.q}</CardTitle>
                      <CardDescription className="pt-2 text-base">{item.a}</CardDescription>
                    </CardHeader>
                  </Card>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* ── SEO hub links ──────────────────────────────────────── */}
        <section className="border-b border-black/10 bg-[#fafaf9]">
          <div className="container mx-auto px-4 py-16 md:py-20">
            <AnimateOnScroll animation="slide-up">
              <div className="mx-auto mb-10 max-w-3xl space-y-4 text-center">
                <h2 className="section-title">Guides and comparisons</h2>
                <p className="text-lg text-[#676060]">
                  Practical pages for developers evaluating self-hosted invoicing and SaaS alternatives.
                </p>
              </div>
            </AnimateOnScroll>

            <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-2">
              {seoLinks.map((item, index) => (
                <AnimateOnScroll key={item.href} animation="slide-up" delay={index * 50}>
                  <Link
                    href={item.href}
                    className="group flex items-center justify-between rounded-[1rem] border border-black/10 bg-white/85 px-5 py-4 text-sm text-[#4f4a4a] transition-colors hover:border-black/20"
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* ── Final CTA ──────────────────────────────────────────── */}
        <section className="gradient-mesh relative overflow-hidden border-b border-black/10">
          <div className="bg-orb bg-orb-primary left-0 top-20 h-48 w-48 opacity-20" />
          <div className="bg-orb bg-orb-accent bottom-0 right-0 h-52 w-52 opacity-15" />

          <div className="container relative mx-auto px-4 py-16 md:py-24">
            <AnimateOnScroll animation="scale-bounce">
              <div className="mx-auto max-w-4xl space-y-6 text-center">
                <h2 className="section-title">{messages.marketing.finalTitle}</h2>
                <p className="mx-auto max-w-2xl text-xl leading-relaxed text-[#676060]">
                  {messages.marketing.finalText}
                </p>
                <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                  <Button size="lg" asChild>
                    <Link href="/pricing">
                      {messages.marketing.finalPrimaryCta}
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href={siteConfig.docsUrl} target="_blank" rel="noopener noreferrer">
                      {messages.marketing.finalSecondaryCta}
                    </Link>
                  </Button>
                </div>
                <p className="text-sm text-[#676060]">
                  {messages.marketing.questionsLabel}{' '}
                  <a
                    href="mailto:designmoiunmouton@gmail.com"
                    className="underline underline-offset-4 transition-colors hover:text-foreground"
                  >
                    designmoiunmouton@gmail.com
                  </a>
                </p>
              </div>
            </AnimateOnScroll>
          </div>
        </section>

      </div>
    </>
  )
}
