"use client"

import { motion } from "motion/react"
import { ArrowRight } from "lucide-react"

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
            Leading companies trust us to build and grow
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
            We&apos;re a full-stack growth partner — marketing, software, AI, and content, working from one team. From
            strategy to launch, our specialists cover the whole lifecycle, so nothing falls through the cracks.
          </p>
          <a
            href="#"
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-brand-blue"
          >
            See more information
            <ArrowRight className="size-4" />
          </a>
        </motion.div>

        <motion.div
          className="relative mx-auto aspect-square w-full max-w-lg overflow-hidden rounded-2xl shadow-xl lg:max-w-none"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <video
            className="absolute inset-0 size-full object-contain"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-label="Team collaboration video"
          >
            <source src="/section-3.mp4" type="video/mp4" />
          </video>
        </motion.div>
      </div>
    </section>
  )
}
