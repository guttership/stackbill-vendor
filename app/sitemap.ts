import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/config'
import { blogPosts, seoLandingPages } from '@/lib/seo/content'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url
  const now = new Date()

  const seoPages: MetadataRoute.Sitemap = seoLandingPages.map((page) => ({
    url: `${baseUrl}/${page.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.85,
  }))

  const blogIndex: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]

  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/docs`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...seoPages,
    ...blogIndex,
    ...blogPages,
  ]
}
