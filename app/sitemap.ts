import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/config'
import { seoLandingPages } from '@/lib/seo/content'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url

  return [
    { url: baseUrl },
    { url: `${baseUrl}/pricing` },
    { url: `${baseUrl}/docs` },
    { url: `${baseUrl}/legal/terms` },
    { url: `${baseUrl}/legal/privacy` },
    { url: `${baseUrl}/blog` },
    ...seoLandingPages.map((page) => ({ url: `${baseUrl}/${page.slug}` })),
  ]
}
