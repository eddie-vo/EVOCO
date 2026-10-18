import type { MetadataRoute } from 'next'
import { getAllPostSlugs } from '@/lib/sanity'

export const dynamic = 'force-static'

const SITE_URL = 'https://eddievo.co'

const routes = [
  '',
  '/about',
  '/services',
  '/case-studies',
  '/how-it-works',
  '/hire',
  '/blog',
  '/contact',
  '/privacy',
  '/terms',
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getAllPostSlugs()

  return [
    ...routes.map((route) => ({
      url: `${SITE_URL}${route}`,
      lastModified: new Date(),
    })),
    ...slugs.map((slug) => ({
      url: `${SITE_URL}/blog/${slug}`,
      lastModified: new Date(),
    })),
  ]
}
