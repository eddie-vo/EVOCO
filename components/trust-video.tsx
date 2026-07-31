"use client"

import Image from "next/image"
import { motion } from "motion/react"
import { ArrowRight, Play } from "lucide-react"

export function TrustVideo() {
  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="block h-1 w-12 rounded-full bg-accent" />
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Leading companies trust us to develop software
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
            We are a custom software development company that guarantees the successful delivery of
            your project. Our teams are distributed across the whole product lifecycle so nothing
            falls through the cracks.
          </p>
          <a
            href="#"
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-accent"
          >
            See more information
            <ArrowRight className="size-4" />
          </a>
        </motion.div>

        <motion.div
          className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-xl"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <Image
            src="/team-collaboration.png"
            alt="Software development team collaborating around a laptop"
            fill
            sizes="(max-width: 1024px) 90vw, 45vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-primary/40" />
          <button
            type="button"
            aria-label="Play video"
            className="group absolute inset-0 flex items-center justify-center"
          >
            <span className="flex size-16 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg transition-transform group-hover:scale-110">
              <Play className="size-6 translate-x-0.5 fill-current" />
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  )
}
