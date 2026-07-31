"use client"

import Image from "next/image"
import { motion } from "motion/react"
import { ArrowRight } from "lucide-react"

const CASES = [
  {
    title: "Fitness App for Pulse Labs",
    image: "/case-study-fitness.png",
    bg: "bg-[#eaf1fe]",
    body: "A performance-focused fitness platform with real-time tracking, personalized plans, and a design system built to scale across every screen size.",
  },
  {
    title: "Website Design for SCFC Canada",
    image: "/case-study-finance.png",
    bg: "bg-[#e6f7ef]",
    body: "Born out of a vision, a single-minded objective that puts service before anything else. Over 20 years of rich and varied experience in the shipping and freight forwarding industry.",
  },
  {
    title: "Social Platform for Bloom",
    image: "/case-study-social.png",
    bg: "bg-[#fdeaf3]",
    body: "A vibrant community app that connects creators with their audience through beautiful feeds, rich profiles, and delightful micro-interactions.",
  },
]

export function CaseStudies() {
  return (
    <section className="bg-muted py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Our recent case studies
        </h2>

        <div className="mt-14 flex flex-col gap-8">
          {CASES.map((item, i) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className={`grid items-center gap-6 overflow-hidden rounded-3xl p-6 sm:p-10 lg:grid-cols-2 ${item.bg}`}
            >
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={`${item.title} mobile app screens`}
                  fill
                  sizes="(max-width: 1024px) 90vw, 45vw"
                  className="object-contain"
                />
              </div>
              <div className="lg:pl-6">
                <h3 className="text-2xl font-bold tracking-tight text-slate-900">{item.title}</h3>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-600">{item.body}</p>
                <a
                  href="#"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-accent"
                >
                  Read more
                  <ArrowRight className="size-4" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-10 flex justify-end">
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-accent"
          >
            Read more case studies
            <ArrowRight className="size-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
