import Image from "next/image"
import { PortableText, type PortableTextComponents } from "@portabletext/react"
import type { PortableTextBlock } from "@portabletext/types"
import { urlFor, type SanityImage } from "@/lib/sanity"

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-6 text-lg font-semibold text-foreground">{children}</h4>
    ),
    normal: ({ children }) => (
      <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mt-6 border-l-4 border-primary/40 pl-5 text-base italic leading-relaxed text-slate-600">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const href = value?.href as string | undefined
      const isExternal = href?.startsWith("http")
      return (
        <a
          href={href}
          className="font-medium text-primary underline-offset-4 transition hover:underline"
          {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {children}
        </a>
      )
    },
    strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    code: ({ children }) => (
      <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-medium text-foreground">
        {children}
      </code>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mt-4 list-disc space-y-2 pl-6 text-base leading-relaxed text-slate-600">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mt-4 list-decimal space-y-2 pl-6 text-base leading-relaxed text-slate-600">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
  types: {
    image: ({ value }) => {
      const image = value as SanityImage & { caption?: string }
      if (!image?.asset) return null
      const src = urlFor(image).width(1400).fit("max").auto("format").url()
      return (
        <figure className="mt-8 overflow-hidden rounded-2xl">
          <div className="relative aspect-[16/10] bg-muted">
            <Image
              src={src}
              alt={image.alt || ""}
              fill
              sizes="(min-width: 768px) 720px, 100vw"
              className="object-cover"
              unoptimized
            />
          </div>
          {image.caption ? (
            <figcaption className="mt-2 text-center text-sm text-muted-foreground">
              {image.caption}
            </figcaption>
          ) : null}
        </figure>
      )
    },
  },
}

export function BlogPortableText({ value }: { value: PortableTextBlock[] }) {
  return <PortableText value={value} components={components} />
}
