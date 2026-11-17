import type { MetadataRoute } from "next"
import { getAllPosts, SITE_URL } from "@/lib/blog"

export const dynamic = "force-static"

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/about", "/blog", "/case-studies", "/contact", "/hire",
    "/how-it-works", "/privacy", "/services", "/terms"]
  return [
    ...pages.map((path) => ({ url: SITE_URL + path })),
    ...getAllPosts().map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post.publishedAt,
    })),
  ]
}
