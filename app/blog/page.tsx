import type { Metadata } from "next"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { SiteFooter } from "@/components/site-footer"
import { getAllPosts, urlFor } from "@/lib/sanity"

export const metadata: Metadata = {
  title: "Blog — Eddie Vo Company",
  description:
    "Notes on growth systems, product, marketing, and building as one team from Eddie Vo Company.",
}

function formatDate(value: string | null) {
  if (!value) return null
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value))
}

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <main>
      <Navbar tone="light" />

      <section className="relative overflow-hidden border-b border-border bg-background pt-16">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_10%_0%,rgba(56,189,248,0.12),transparent_45%),radial-gradient(ellipse_at_90%_20%,rgba(250,204,21,0.1),transparent_40%)]"
        />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
          <div className="inline-flex items-center gap-3">
            <span className="h-px w-8 bg-[#facc15]" />
            <p className="text-[11px] font-semibold tracking-[0.28em] text-primary uppercase">
              Blog
            </p>
          </div>
          <h1 className="mt-5 max-w-3xl text-balance text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Ideas that compound
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            Practical notes on growth systems, product, marketing, and shipping as one team.
          </p>
        </div>
      </section>

      <section className="bg-muted py-16 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="rounded-3xl border border-border bg-background px-8 py-20 text-center shadow-sm">
              <p className="text-lg font-semibold text-foreground sm:text-xl">
                No posts yet — check back soon
              </p>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                We&apos;re getting the first pieces ready. In the meantime, explore our work or say
                hello.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <a
                  href="/case-studies"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-transform hover:scale-105"
                >
                  Case studies
                  <ArrowRight className="size-4" />
                </a>
                <a
                  href="/contact"
                  className="text-sm font-semibold text-primary transition hover:underline"
                >
                  Contact us →
                </a>
              </div>
            </div>
          ) : (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => {
                const coverSrc = post.coverImage?.asset
                  ? urlFor(post.coverImage).width(900).height(600).fit("crop").auto("format").url()
                  : null
                const dateLabel = formatDate(post.publishedAt)

                return (
                  <li key={post._id}>
                    <a
                      href={`/blog/${post.slug}`}
                      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-background shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                    >
                      <div className="relative aspect-[3/2] overflow-hidden bg-slate-100">
                        {coverSrc ? (
                          <Image
                            src={coverSrc}
                            alt={post.coverImage?.alt || post.title}
                            fill
                            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                            className="object-cover transition duration-500 group-hover:scale-[1.04]"
                            unoptimized
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-sky-200/40 to-[#facc15]/30" />
                        )}
                      </div>
                      <div className="flex flex-1 flex-col p-6">
                        {dateLabel ? (
                          <p className="text-[11px] font-semibold tracking-[0.18em] text-slate-400 uppercase">
                            {dateLabel}
                          </p>
                        ) : null}
                        <h2 className="mt-2 text-xl font-extrabold tracking-tight text-foreground transition group-hover:text-primary">
                          {post.title}
                        </h2>
                        {post.excerpt ? (
                          <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                            {post.excerpt}
                          </p>
                        ) : null}
                        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                          Read more
                          <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
                        </span>
                      </div>
                    </a>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
