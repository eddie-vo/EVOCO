import { existsSync, readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { fileURLToPath } from "node:url"
import { parseBlogPost } from "../lib/blog-post.mjs"

const root = fileURLToPath(new URL("../", import.meta.url))

function writeIfNew(path, bytes) {
  if (existsSync(path)) {
    if (!readFileSync(path).equals(bytes)) throw new Error(`Refusing to overwrite ${path}`)
    return
  }
  writeFileSync(path, bytes, { flag: "wx" })
}

try {
  const [input, cover, ...extra] = process.argv.slice(2)
  if (!input || extra.length) throw new Error("Usage: node scripts/import-vosuite-post.mjs <article.json> [cover-file]")
  const post = parseBlogPost(JSON.parse(readFileSync(input, "utf8")))
  if (Date.parse(post.publishedAt) > Date.now()) {
    throw new Error("Run the import at or after the article's scheduled publication time")
  }
  if (cover && !post.coverImage) throw new Error("The article must declare its cover image")
  const destination = join(root, "content", "blog", `${post.slug}.json`)
  const articleBytes = Buffer.from(JSON.stringify(post, null, 2) + "\n")
  if (existsSync(destination) && !readFileSync(destination).equals(articleBytes)) {
    throw new Error(`An article with slug ${post.slug} already exists`)
  }
  if (post.coverImage) {
    const imagePath = join(root, "public", post.coverImage.src)
    if (cover) writeIfNew(imagePath, readFileSync(cover))
    else if (!existsSync(imagePath)) throw new Error("Supply the declared cover file")
  }
  writeIfNew(destination, articleBytes)
  console.log(`Ready for deployment: /blog/${post.slug}`)
} catch (error) {
  console.error(error.message)
  process.exitCode = 1
}
