import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { SiteFooter } from "@/components/site-footer"
import Markdown from "react-markdown"
import { getAllPostSlugs, getPostBySlug, SITE_URL } from "@/lib/blog"

type Props = {
  params: Promise<{ slug: string }>
}

/**
 * Next.js 16 + `output: 'export'` treats an empty generateStaticParams()
 * result as "missing". When there are no published posts yet, emit a reserved
 * placeholder path so the build succeeds; the page itself 404s.
 */
const EMPTY_SLUG_PLACEHOLDER = "_"

export async function generateStaticParams() {
  const slugs = getAllPostSlugs()
  if (slugs.length === 0) {
    return [{ slug: EMPTY_SLUG_PLACEHOLDER }]
  }
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  if (slug === EMPTY_SLUG_PLACEHOLDER) {
    return { title: "Blog — Eddie Vo Company" }
  }

  const post = getPostBySlug(slug)

  if (!post) {
    return { title: "Post not found — Eddie Vo Company" }
  }

  const canonical = `${SITE_URL}/blog/${post.slug}`
  const ogImage = post.coverImage ? SITE_URL + post.coverImage.src : undefined

  return {
    title: `${post.title} — Eddie Vo Company`,
    description: post.excerpt || undefined,
    alternates: { canonical },
    openGraph: {
      url: canonical,
      title: post.title,
      description: post.excerpt || undefined,
      type: "article",
      publishedTime: post.publishedAt || undefined,
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
  }
}

function formatDate(value: string | null) {
  if (!value) return null
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "America/New_York",
  }).format(new Date(value))
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  if (slug === EMPTY_SLUG_PLACEHOLDER) notFound()

  const post = getPostBySlug(slug)
  if (!post) notFound()

  const coverSrc = post.coverImage?.src
  const dateLabel = formatDate(post.publishedAt)
  const canonical = `${SITE_URL}/blog/${post.slug}`
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    author: { "@type": "Person", name: post.author },
    publisher: { "@type": "Organization", name: "Eddie Vo Company", url: SITE_URL },
    mainEntityOfPage: canonical,
    image: coverSrc ? SITE_URL + coverSrc : undefined,
  }

  return (
    <main>
      <Navbar tone="light" />

      <article className="bg-background pt-16">
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }} />
        <header className="border-b border-border">
          <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
            <a
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:gap-3"
            >
              <ArrowLeft className="size-4" />
              Back to blog
            </a>

            <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
              {dateLabel ? <time dateTime={post.publishedAt ?? undefined}>{dateLabel}</time> : null}
              {dateLabel && post.author ? <span aria-hidden>·</span> : null}
              {post.author ? <span>{post.author}</span> : null}
            </div>

            <h1 className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              {post.title}
            </h1>

            {post.excerpt ? (
              <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
                {post.excerpt}
              </p>
            ) : null}

            {post.tags && post.tags.length > 0 ? (
              <ul className="mt-6 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-slate-700"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          {coverSrc ? (
            <div className="mx-auto max-w-5xl px-4 pb-10 sm:px-6 lg:px-8">
              <div className="relative aspect-[16/9] overflow-hidden rounded-3xl bg-muted shadow-sm">
                <Image
                  src={coverSrc}
                  alt={post.coverImage?.alt || post.title}
                  fill
                  sizes="(min-width: 1024px) 1024px, 100vw"
                  className="object-cover"
                  priority
                  unoptimized
                />
              </div>
            </div>
          ) : null}
        </header>

        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="space-y-5 break-words text-muted-foreground [&_a]:text-primary [&_a]:underline [&_blockquote]:border-l-2 [&_blockquote]:pl-4 [&_h2]:pt-4 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-foreground [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-foreground [&_ol]:list-decimal [&_ol]:pl-6 [&_ul]:list-disc [&_ul]:pl-6 [&_pre]:overflow-x-auto">
            <Markdown
              skipHtml
              disallowedElements={["h1"]}
              unwrapDisallowed
              components={{
                img: ({ src, alt }) => typeof src === "string" ? (
                  <Image
                    src={src}
                    alt={alt || ""}
                    width={1024}
                    height={576}
                    loading="lazy"
                    className="my-6 h-auto w-full rounded-2xl"
                  />
                ) : null,
              }}
            >{post.body}</Markdown>
          </div>
        </div>
      </article>

      <SiteFooter />
    </main>
  )
}
