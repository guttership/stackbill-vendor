import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AnimateOnScroll } from '@/components/marketing/animate-on-scroll'
import { blogPosts, getBlogPostBySlug } from '@/lib/seo/content'
import { siteConfig } from '@/lib/config'
import { breadcrumbSchema } from '@/lib/seo/schema'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    return { title: 'Not found' }
  }

  const canonicalUrl = `${siteConfig.url}/blog/${post.slug}`

  return {
    title: post.title,
    description: post.intro,
    keywords: [post.targetKeyword, 'self hosted invoicing', 'developer workflow'],
    robots: {
      index: false,
      follow: true,
    },
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.title,
      description: post.intro,
      url: canonicalUrl,
      type: 'article',
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const canonicalUrl = `${siteConfig.url}/blog/${post.slug}`
  const breadcrumbJsonLd = breadcrumbSchema([
    { name: 'Home', item: siteConfig.url },
    { name: 'Blog', item: `${siteConfig.url}/blog` },
    { name: post.title, item: canonicalUrl },
  ])
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${canonicalUrl}#article`,
    headline: post.title,
    description: post.intro,
    image: [new URL(siteConfig.ogImage, siteConfig.url).toString()],
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    inLanguage: 'en',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    author: {
      '@id': `${siteConfig.url}/#organization`,
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: new URL('/images/logo.svg', siteConfig.url).toString(),
      },
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative overflow-hidden border-b border-black/10">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-4xl space-y-6">
            <Badge variant="outline" className="border-black/10 bg-white/85 px-3 py-1 text-[#3f3a3a]">
              {post.searchIntent}
            </Badge>
            <h1 className="page-title">{post.title}</h1>
            <p className="text-lg leading-relaxed text-[#555353]">{post.intro}</p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-[#676060]">
              <span>Topic: {post.targetKeyword}</span>
              <span>Published {post.datePublished}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 bg-[#fafaf9]">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto grid max-w-4xl gap-6">
            {post.outline.map((section) => (
              <AnimateOnScroll key={section} animation="slide-up">
                <Card className="border border-black/5 bg-white/92 hover-lift">
                  <CardHeader className="p-6">
                    <CardTitle>{section}</CardTitle>
                  </CardHeader>
                  <CardContent className="px-6 pb-6 pt-0">
                    <p className="text-sm leading-relaxed text-[#555353]">
                      Expand this section with concrete examples, trade-offs, and direct recommendations for developers
                      who want control over billing workflows.
                    </p>
                  </CardContent>
                </Card>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-black/10">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="mx-auto max-w-3xl space-y-6 text-center">
            <h2 className="section-title">Next step</h2>
            <p className="text-lg leading-relaxed text-[#555353]">
              If your invoicing stack limits your operations, switch before it starts hurting your margins.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="/pricing">
                  See pricing
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/blog">
                  Read more articles
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
