import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AnimateOnScroll } from '@/components/marketing/animate-on-scroll'
import { getSeoLandingBySlug, seoLandingPages } from '@/lib/seo/content'
import { siteConfig } from '@/lib/config'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return seoLandingPages.map((page) => ({ slug: page.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const page = getSeoLandingBySlug(slug)

  if (!page) {
    return {
      title: 'Not found',
    }
  }

  const canonicalUrl = `${siteConfig.url}/${page.slug}`

  return {
    title: page.seoTitle,
    description: page.metaDescription,
    keywords: [page.mainKeyword, 'self hosted invoicing', 'developer invoicing'],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: page.seoTitle,
      description: page.metaDescription,
      url: canonicalUrl,
    },
  }
}

export default async function SeoLandingPage({ params }: Props) {
  const { slug } = await params
  const page = getSeoLandingBySlug(slug)

  if (!page) {
    notFound()
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: page.h1,
    description: page.metaDescription,
    url: `${siteConfig.url}/${page.slug}`,
    inLanguage: 'en',
    isPartOf: {
      '@type': 'WebSite',
      name: siteConfig.name,
      url: siteConfig.url,
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative overflow-hidden border-b border-black/10">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-4xl space-y-6 text-center">
            <Badge variant="outline" className="border-black/10 bg-white/85 px-3 py-1 text-[#3f3a3a]">
              {page.mainKeyword}
            </Badge>
            <h1 className="page-title">{page.h1}</h1>
            <p className="text-lg leading-relaxed text-[#555353]">{page.intro}</p>
            <div className="mx-auto grid max-w-4xl gap-4 text-left md:grid-cols-3">
              <Card className="border border-black/5 bg-white/92">
                <CardHeader className="p-5">
                  <CardTitle className="text-base">Best for</CardTitle>
                </CardHeader>
                <CardContent className="px-5 pb-5 pt-0">
                  <p className="text-sm leading-relaxed text-[#555353]">{page.persona}</p>
                </CardContent>
              </Card>
              <Card className="border border-black/5 bg-white/92">
                <CardHeader className="p-5">
                  <CardTitle className="text-base">Why switch</CardTitle>
                </CardHeader>
                <CardContent className="px-5 pb-5 pt-0">
                  <p className="text-sm leading-relaxed text-[#555353]">{page.conversionAngle}</p>
                </CardContent>
              </Card>
              <Card className="border border-black/5 bg-white/92">
                <CardHeader className="p-5">
                  <CardTitle className="text-base">Common objection</CardTitle>
                </CardHeader>
                <CardContent className="px-5 pb-5 pt-0">
                  <p className="text-sm leading-relaxed text-[#555353]">{page.primaryObjection}</p>
                </CardContent>
              </Card>
            </div>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              {page.ctas.map((cta) => (
                <Button key={cta.label} size="lg" asChild>
                  <Link href={cta.href}>
                    {cta.label}
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 bg-[#fafaf9]">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
            {page.outline.map((section) => (
              <AnimateOnScroll key={section.h2} animation="scale-up">
                <Card className="h-full border border-black/5 bg-white/92 hover-lift">
                  <CardHeader className="p-6">
                    <CardTitle>{section.h2}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 px-6 pb-6 pt-0">
                    {section.h3.map((item) => (
                      <p key={item} className="text-sm leading-relaxed text-[#555353]">
                        {item}
                      </p>
                    ))}
                  </CardContent>
                </Card>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {(page.painPoints?.length || page.whyNow?.length || page.proofPoints?.length) && (
        <section className="border-b border-black/10">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
              {page.painPoints?.length ? (
                <Card className="h-full border border-black/5 bg-white/92 hover-lift">
                  <CardHeader className="p-6">
                    <CardTitle>Pain points</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 px-6 pb-6 pt-0">
                    {page.painPoints.map((item) => (
                      <p key={item} className="text-sm leading-relaxed text-[#555353]">
                        {item}
                      </p>
                    ))}
                  </CardContent>
                </Card>
              ) : null}

              {page.whyNow?.length ? (
                <Card className="h-full border border-black/5 bg-white/92 hover-lift">
                  <CardHeader className="p-6">
                    <CardTitle>Why switch now</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 px-6 pb-6 pt-0">
                    {page.whyNow.map((item) => (
                      <p key={item} className="text-sm leading-relaxed text-[#555353]">
                        {item}
                      </p>
                    ))}
                  </CardContent>
                </Card>
              ) : null}

              {page.proofPoints?.length ? (
                <Card className="h-full border border-black/5 bg-white/92 hover-lift">
                  <CardHeader className="p-6">
                    <CardTitle>Proof</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 px-6 pb-6 pt-0">
                    {page.proofPoints.map((item) => (
                      <p key={item} className="text-sm leading-relaxed text-[#555353]">
                        {item}
                      </p>
                    ))}
                  </CardContent>
                </Card>
              ) : null}
            </div>
          </div>
        </section>
      )}

      <section className="border-b border-black/10">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="mx-auto max-w-3xl space-y-6 text-center">
            <h2 className="section-title">Use this page as a buying checklist</h2>
            <p className="text-lg leading-relaxed text-[#555353]">
              If your invoicing tool limits your process, the real cost is not the monthly fee. The real cost is
              lost control over your operations.
            </p>
            <Button size="lg" asChild>
              <Link href="/pricing">
                See pricing options
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
