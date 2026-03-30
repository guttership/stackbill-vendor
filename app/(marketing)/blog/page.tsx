import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AnimateOnScroll } from '@/components/marketing/animate-on-scroll'
import { blogPosts } from '@/lib/seo/content'
import { siteConfig } from '@/lib/config'

export const metadata: Metadata = {
  title: 'Developer Invoicing Blog and Comparisons',
  description:
    'Opinionated blog about self-hosted invoicing, SaaS lock-in, workflow automation, and alternatives for developers.',
  alternates: {
    canonical: `${siteConfig.url}/blog`,
  },
}

export default function BlogIndexPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-black/10">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-3xl space-y-6 text-center">
            <Badge variant="outline" className="border-black/10 bg-white/85 px-3 py-1 text-[#3f3a3a]">
              Blog
            </Badge>
            <h1 className="page-title">Developer invoicing insights, comparisons, and hard truths</h1>
            <p className="text-lg leading-relaxed text-[#555353]">
              Practical articles for freelancers, indie hackers, and small dev teams who want control instead of
              invoicing lock-in.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 bg-[#fafaf9]">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
            {blogPosts.map((post, index) => (
              <AnimateOnScroll key={post.slug} animation="slide-up" delay={index * 40}>
                <Card className="h-full border border-black/5 bg-white/92 hover-lift">
                  <CardHeader className="p-6">
                    <Badge variant="outline" className="w-fit border-black/10 bg-white/80 text-[#4f4a4a]">
                      {post.searchIntent}
                    </Badge>
                    <CardTitle className="mt-3 text-[1.25rem] leading-tight">{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 px-6 pb-6 pt-0">
                    <p className="text-sm text-[#555353]">Keyword: {post.targetKeyword}</p>
                    <p className="text-sm leading-relaxed text-[#555353]">{post.intro}</p>
                    <Link href={`/blog/${post.slug}`} className="inline-flex items-center text-sm font-medium text-[#3f3a3a]">
                      Read article
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
