import "server-only"
import { existsSync, readdirSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { parseBlogPost } from "./blog-post.mjs"

export const SITE_URL = "https://eddievo.co"

export function getAllPosts() {
  const root = process.cwd()
  const directory = join(root, "content", "blog")
  return readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".json"))
    .map(({ name }) => {
      const post = parseBlogPost(JSON.parse(readFileSync(join(directory, name), "utf8")))
      if (name !== `${post.slug}.json`) throw new Error(`Invalid blog filename: ${name}`)
      if (post.coverImage && !existsSync(join(root, "public", post.coverImage.src))) {
        throw new Error(`Missing blog cover: ${post.coverImage.src}`)
      }
      return post
    })
    .filter((post) => Date.parse(post.publishedAt) <= Date.now())
    .sort((first, second) => Date.parse(second.publishedAt) - Date.parse(first.publishedAt) ||
      first.slug.localeCompare(second.slug))
}

export function getPostBySlug(slug: string) {
  return getAllPosts().find((post) => post.slug === slug)
}

export function getAllPostSlugs() {
  return getAllPosts().map((post) => post.slug)
}
