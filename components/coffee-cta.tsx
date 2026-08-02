"use client"

import { motion } from "motion/react"
import { ArrowRight } from "lucide-react"

export function CoffeeCta() {
  return (
    <section id="contact" className="relative w-full overflow-hidden">
      <div className="relative flex min-h-[640px] w-full items-center py-28 sm:min-h-[720px] sm:py-32">
        <video
          aria-hidden
          className="absolute inset-0 size-full scale-105 object-cover object-[70%_center]"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src="/videos/cta-cinemagraph.mp4" type="video/mp4" />
        </video>

        {/* Readability wash — deep on copy side, open to the scene */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(105deg,rgba(12,10,9,0.82)_0%,rgba(28,18,12,0.62)_38%,rgba(28,18,12,0.28)_62%,rgba(28,18,12,0.12)_100%)]"
        />
        {/* Warm window light */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,rgba(250,204,21,0.14),transparent_55%)]"
        />
        {/* Soft floor fade into footer */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background/35 to-transparent"
        />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-16">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
            }}
            className="flex max-w-xl flex-col items-center text-center sm:items-start sm:text-left"
          >
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 16 },
                show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
              }}
              className="mb-5 text-[11px] font-semibold tracking-[0.28em] text-[#facc15] uppercase"
            >
              Next step
            </motion.p>

            <motion.h2
              variants={{
                hidden: { opacity: 0, y: 28 },
                show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
              }}
              className="text-balance text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl"
            >
              Let&apos;s grab{" "}
              <span className="bg-gradient-to-r from-[#fde68a] via-[#facc15] to-[#f59e0b] bg-clip-text text-transparent">
                a coffee
              </span>
            </motion.h2>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
              }}
              className="mt-6 max-w-md text-pretty text-base leading-relaxed text-white/80 sm:text-lg"
            >
              No pitch decks — just a real conversation about turning your marketing, software, and content into one
              system that compounds.
            </motion.p>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 18 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
              }}
              className="mt-10"
            >
              <a
                href="/contact"
                className="group inline-flex items-center gap-3 rounded-2xl bg-[#facc15] px-8 py-4 text-base font-bold text-slate-950 shadow-[0_12px_40px_rgba(250,204,21,0.28)] transition duration-300 hover:bg-[#fde047] hover:shadow-[0_16px_48px_rgba(250,204,21,0.38)] sm:px-10 sm:py-5 sm:text-lg"
              >
                Book a Coffee Chat
                <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
