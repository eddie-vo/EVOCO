import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { SiteFooter } from "@/components/site-footer"
import { BlogPortableText } from "@/components/blog-portable-text"
import { getAllPostSlugs, getPostBySlug, urlFor } from "@/lib/sanity"

type Props = {
  params: Promise<{ slug: string }>
}

/**
 * Next.js 16 + `output: 'export'` treats an empty generateStaticParams()
 * result as "missing". When the CMS has no posts yet, emit a reserved
 * placeholder path so the build succeeds; the page itself 404s.
 */
const EMPTY_SLUG_PLACEHOLDER = "_"

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs()
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

  const post = await getPostBySlug(slug)

  if (!post) {
    return { title: "Post not found — Eddie Vo Company" }
  }

  const ogImage = post.coverImage?.asset
    ? urlFor(post.coverImage).width(1200).height(630).fit("crop").auto("format").url()
    : undefined

  return {
    title: `${post.title} — Eddie Vo Company`,
    description: post.excerpt || undefined,
    openGraph: {
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
  }).format(new Date(value))
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  if (slug === EMPTY_SLUG_PLACEHOLDER) notFound()

  const post = await getPostBySlug(slug)
  if (!post) notFound()

  const coverSrc = post.coverImage?.asset
    ? urlFor(post.coverImage).width(1600).height(900).fit("crop").auto("format").url()
    : null
  const dateLabel = formatDate(post.publishedAt)

  return (
    <main>
      <Navbar tone="light" />

      <article className="bg-background pt-16">
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
          {post.body && post.body.length > 0 ? (
            <BlogPortableText value={post.body} />
          ) : (
            <p className="text-muted-foreground">This post has no content yet.</p>
          )}
        </div>
      </article>

      <SiteFooter />
    </main>
  )
}
