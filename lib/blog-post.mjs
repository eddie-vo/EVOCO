export const BLOG_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
export const COVER_PATH = /^\/blog\/[a-z0-9]+(?:-[a-z0-9]+)*\.(?:webp|png|jpe?g|avif)$/

/**
 * @typedef {{
 *   slug: string, title: string, excerpt: string, author: string,
 *   publishedAt: string, tags: string[], body: string,
 *   coverImage?: {src: string, alt: string}
 * }} BlogPost
 */

/** @param {unknown} data @returns {BlogPost} */
export function parseBlogPost(data) {
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    throw new Error("Expected a blog post object")
  }
  const post = /** @type {Record<string, unknown>} */ (data)
  const { slug, title, excerpt, author, publishedAt, tags, body, coverImage } = post
  const nonempty = value => typeof value === "string" && value.trim().length > 0
  if (typeof slug !== "string" || !BLOG_SLUG.test(slug)) throw new Error("Invalid slug")
  if (![title, excerpt, author, body].every(nonempty)) throw new Error("Title, excerpt, author and Markdown body are required")
  if (typeof publishedAt !== "string" ||
      !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/.test(publishedAt) ||
      !Number.isFinite(Date.parse(publishedAt)) ||
      new Date(publishedAt).toISOString().slice(0, 19) !== publishedAt.slice(0, 19)) {
    throw new Error("Expected a valid publishedAt timestamp in UTC")
  }
  if (!Array.isArray(tags) || !tags.every(nonempty)) throw new Error("Expected an array of tags")
  if (coverImage !== undefined) {
    const image = /** @type {{src?: unknown, alt?: unknown}|null} */ (coverImage)
    if (!image || typeof image.src !== "string" || !COVER_PATH.test(image.src) ||
        !image.src.startsWith('/blog/'+slug+'.') || !nonempty(image.alt)) {
      throw new Error("Expected a cover image at /blog/<slug>.<extension> and descriptive alt text")
    }
  }
  return /** @type {BlogPost} */ ({
    slug, title, excerpt, author, publishedAt, tags, body,
    ...(coverImage ? { coverImage: { src: coverImage.src, alt: coverImage.alt } } : {}),
  })
}
