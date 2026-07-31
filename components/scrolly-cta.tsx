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

  // Step 1: "We don't just write code."
  const op1 = useTransform(scrollYProgress, [0, 0.08, 0.28, 0.36], [0, 1, 1, 0])
  const y1 = useTransform(scrollYProgress, [0, 0.08, 0.36], [40, 0, -40])

  // Step 2: "We build digital experiences."
  const op2 = useTransform(scrollYProgress, [0.36, 0.44, 0.62, 0.7], [0, 1, 1, 0])
  const y2 = useTransform(scrollYProgress, [0.36, 0.44, 0.7], [40, 0, -40])

  // Step 3: "Ready to elevate your brand?"
  const op3 = useTransform(scrollYProgress, [0.7, 0.78, 0.95, 1], [0, 1, 1, 0.85])
  const y3 = useTransform(scrollYProgress, [0.7, 0.78, 1], [40, 0, -20])

  return (
    <>
      {/* Pinned scrollytelling text steps */}
      <section ref={sectionRef} className="relative h-[300vh] bg-background">
        <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
          <motion.p
            style={{ opacity: op1, y: y1 }}
            className="absolute px-6 text-center text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl"
          >
            We don&apos;t just write code.
          </motion.p>
          <motion.p
            style={{ opacity: op2, y: y2 }}
            className="absolute px-6 text-center text-4xl font-extrabold tracking-tight text-primary sm:text-6xl"
          >
            We build digital experiences.
          </motion.p>
          <motion.p
            style={{ opacity: op3, y: y3 }}
            className="absolute px-6 text-center text-4xl font-extrabold tracking-tight text-accent sm:text-6xl"
          >
            Ready to elevate your brand?
          </motion.p>
        </div>
      </section>

      {/* Final CTA slides up and stays as the closing view */}
      <section id="contact" className="bg-background px-4 pb-20 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto flex min-h-[70vh] max-w-6xl flex-col items-center justify-center gap-8 rounded-[2.5rem] bg-gradient-to-br from-slate-950 via-primary to-accent px-6 py-20 text-center text-white shadow-2xl"
        >
          <h2 className="text-balance text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">
            Let&apos;s Start Your Next Big Project
          </h2>
          <p className="max-w-xl text-pretty text-base leading-relaxed text-white/80 sm:text-lg">
            Book a call with our team and let&apos;s turn your vision into a product people love.
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-3 rounded-full bg-white px-10 py-5 text-base font-bold text-primary shadow-lg transition-transform hover:scale-105 sm:text-lg"
          >
            Book a Strategy Call
            <ArrowRight className="size-5" />
          </a>
        </motion.div>
      </section>
    </>
  )
}
