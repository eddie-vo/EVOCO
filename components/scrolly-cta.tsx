"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "motion/react"
import { ArrowRight } from "lucide-react"

export function ScrollyCta() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  })

  // Line 1 — navy
  const op1 = useTransform(scrollYProgress, [0, 0.06, 0.2, 0.26], [0, 1, 1, 0])
  const y1 = useTransform(scrollYProgress, [0, 0.06, 0.26], [40, 0, -40])

  // Line 2 — blue
  const op2 = useTransform(scrollYProgress, [0.24, 0.3, 0.44, 0.5], [0, 1, 1, 0])
  const y2 = useTransform(scrollYProgress, [0.24, 0.3, 0.5], [40, 0, -40])

  // Line 3 — light blue (longest line, slightly smaller type)
  const op3 = useTransform(scrollYProgress, [0.48, 0.54, 0.68, 0.74], [0, 1, 1, 0])
  const y3 = useTransform(scrollYProgress, [0.48, 0.54, 0.74], [40, 0, -40])

  // Line 4 — lightest blue (CTA button blue family, stays through end)
  const op4 = useTransform(scrollYProgress, [0.72, 0.78, 0.95, 1], [0, 1, 1, 0.9])
  const y4 = useTransform(scrollYProgress, [0.72, 0.78, 1], [40, 0, -20])

  return (
    <>
      {/* Pinned scrollytelling text steps */}
      <section ref={sectionRef} className="relative h-[400vh] bg-background">
        <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
          <motion.p
            style={{ opacity: op1, y: y1 }}
            className="absolute max-w-5xl px-6 text-center text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl"
          >
            We don&apos;t just write code.
          </motion.p>
          <motion.p
            style={{ opacity: op2, y: y2 }}
            className="absolute max-w-5xl px-6 text-center text-4xl font-extrabold tracking-tight text-primary sm:text-6xl"
          >
            We don&apos;t just run ads.
          </motion.p>
          <motion.p
            style={{ opacity: op3, y: y3 }}
            className="absolute max-w-4xl px-6 text-center text-2xl font-extrabold leading-snug tracking-tight text-[#38bdf8] sm:text-4xl lg:text-5xl"
          >
            We build the whole growth engine — marketing, software, AI, and content, working as one.
          </motion.p>
          <motion.p
            style={{ opacity: op4, y: y4 }}
            className="absolute max-w-5xl px-6 text-center text-4xl font-extrabold tracking-tight text-[#7dd3fc] sm:text-6xl"
          >
            Ready to put yours to work?
          </motion.p>
        </div>
      </section>

      {/* Full-bleed video CTA — left-aligned copy */}
      <section id="contact" className="relative w-full overflow-hidden">
        <div className="relative flex min-h-[560px] w-full items-center py-24 sm:min-h-[600px]">
          <video
            aria-hidden
            className="absolute inset-0 size-full object-cover object-center"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          >
            <source src="/videos/cta-cinemagraph.mp4" type="video/mp4" />
          </video>

          {/* Stronger on the left for text; lighter on the right so the subject stays visible */}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-r from-[rgba(10,15,40,0.72)] via-[rgba(10,15,40,0.45)] to-[rgba(10,15,40,0.2)]"
          />

          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative z-10 flex w-full max-w-7xl flex-col items-center gap-6 px-6 text-center text-white sm:items-start sm:gap-8 sm:px-10 sm:text-left lg:px-16"
          >
            <h2 className="max-w-xl text-balance text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Let&apos;s grab a coffee ☕
            </h2>
            <p className="max-w-md text-pretty text-base leading-relaxed text-white/85 sm:text-lg">
              No pitch decks — just a real conversation about turning your marketing, software, and content into one
              system that compounds.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-3 rounded-full bg-white px-10 py-5 text-base font-bold text-primary shadow-lg transition-transform hover:scale-105 sm:text-lg"
            >
              Book a Coffee Chat
              <ArrowRight className="size-5" />
            </a>
          </motion.div>
        </div>
      </section>
    </>
  )
}
