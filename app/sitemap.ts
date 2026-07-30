import type { MetadataRoute } from 'next'
import { siteUrl } from '@/lib/site'
import { getAllSlugs } from '@/lib/projects'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...getAllSlugs().map((slug) => ({
      url: `${siteUrl}/projects/${slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]
}
