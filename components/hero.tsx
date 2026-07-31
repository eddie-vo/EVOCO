"use client"

import { motion } from "motion/react"
import { ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-primary pt-16 text-primary-foreground">
      {/* Full-bleed looping hero video */}
      <div aria-hidden className="absolute inset-0">
        <video
          className="absolute inset-0 size-full object-cover object-center"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/hero-banner.png"
        >
          <source
            src="https://github.com/eddie-vo/EVOCO/releases/download/v1.0.0/hero.mp4"
            type="video/mp4"
          />
        </video>
        {/* Soft left wash for headline contrast — clears before the person */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary from-0% via-primary/50 via-28% to-transparent to-50%" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-36">
        <motion.div
          className="max-w-xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="text-balance text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Great <span className="[color:#c4b5fd]">Product</span> is
            <br className="hidden sm:block" /> built by great <span className="[color:#c4b5fd]">teams</span>
          </h1>
          <p className="mt-6 max-w-md text-pretty text-base leading-relaxed text-primary-foreground/80">
            We help build and manage a team of world-class developers to bring your vision to life — from first idea to
            production-grade software.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-background px-6 py-3 text-sm font-semibold text-primary shadow-lg transition-transform hover:scale-105"
            >
              Let&apos;s get started
              <ArrowRight className="size-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
