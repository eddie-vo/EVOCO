"use client"

import { motion } from "motion/react"
import { ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-primary pt-16 text-primary-foreground">
      {/* Full-bleed looping hero video */}
      <div aria-hidden className="absolute inset-0">
        <video
          className="absolute inset-0 size-full object-cover object-[72%_center] sm:object-center"
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
        {/* Stronger wash on mobile for legibility; lighter on desktop */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/85 via-primary/70 to-primary/80 sm:hidden" />
        <div className="absolute inset-0 hidden bg-gradient-to-r from-primary from-0% via-primary/50 via-28% to-transparent to-50% sm:block" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-36">
        <motion.div
          className="max-w-xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="text-balance text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            We build the <span className="text-[#38bdf8]">growth engine</span>
            <br className="hidden sm:block" /> behind{" "}
            <span className="text-[#38bdf8]">great companies</span>
          </h1>
          <p className="mt-5 max-w-md text-pretty text-sm leading-relaxed text-primary-foreground/85 sm:mt-6 sm:text-base">
            We help companies grow with digital marketing, custom software, AI marketing, automation, and AI-assisted
            video production — from strategy to execution to the content that sells it.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-4 sm:mt-8">
            <a
              href="/contact"
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
