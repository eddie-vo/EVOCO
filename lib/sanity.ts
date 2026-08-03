import { createClient } from "@sanity/client"
import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url"
import type { PortableTextBlock } from "@portabletext/types"

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-01-01",
  useCdn: true,
})

const builder = createImageUrlBuilder(sanityClient)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

export type SanityImage = {
  _type?: string
  asset?: {
    _ref?: string
    _type?: string
  }
  alt?: string
}

export type BlogPostListItem = {
  _id: string
  title: string
  slug: string
  excerpt: string | null
  coverImage: SanityImage | null
  publishedAt: string | null
}

export type BlogPost = BlogPostListItem & {
  author: string | null
  tags: string[] | null
  body: PortableTextBlock[] | null
}

const postFields = `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  coverImage,
  publishedAt,
  author,
  tags
`

export async function getAllPosts(): Promise<BlogPostListItem[]> {
  try {
    return await sanityClient.fetch(
      `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      coverImage,
      publishedAt
    }`,
    )
  } catch (error) {
    console.error("[sanity] getAllPosts failed:", error)
    return []
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    return await sanityClient.fetch(
      `*[_type == "post" && slug.current == $slug][0] {
      ${postFields},
      body
    }`,
      { slug },
    )
  } catch (error) {
    console.error("[sanity] getPostBySlug failed:", error)
    return null
  }
}

export async function getAllPostSlugs(): Promise<string[]> {
  try {
    const slugs: string[] = await sanityClient.fetch(
      `*[_type == "post" && defined(slug.current)].slug.current`,
    )
    return (slugs || []).filter(Boolean)
  } catch (error) {
    console.error("[sanity] getAllPostSlugs failed:", error)
    return []
  }
}
