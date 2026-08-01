"use client"

import { useCallback, useEffect, useState } from "react"
import { motion } from "motion/react"
import {
  Megaphone,
  Code2,
  Sparkles,
  Workflow,
  Clapperboard,
  ChevronLeft,
  ChevronRight,
  type LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { FloatingConfetti } from "@/components/floating-confetti"

const SERVICES: {
  icon: LucideIcon
  title: string
  teaser: string
  body: string
}[] = [
  {
    icon: Megaphone,
    title: "Digital Marketing",
    teaser: "Strategy and campaigns that turn attention into customers.",
    body: "We plan and run full-funnel marketing — positioning, paid and organic campaigns, and conversion optimization — so your growth isn't left to guesswork. Includes: campaign strategy, paid media management, SEO/content, conversion rate optimization.",
  },
  {
    icon: Code2,
    title: "Software Development",
    teaser: "Web and mobile products built to scale.",
    body: "We design and ship production-grade web and mobile software, from first prototype to launch, using modern frameworks and clean, maintainable code. Includes: web apps, mobile apps, API integrations, technical architecture.",
  },
  {
    icon: Sparkles,
    title: "AI Marketing",
    teaser: "AI-driven targeting and personalization that outperform manual work.",
    body: "We build AI-powered marketing systems — audience targeting, personalized messaging, and campaign optimization — that learn and improve faster than traditional workflows. Includes: predictive targeting, personalization engines, AI-optimized ad campaigns.",
  },
  {
    icon: Workflow,
    title: "Automation",
    teaser: "Workflows and internal tools that cut busywork.",
    body: "We automate the repetitive parts of running a business — lead routing, reporting, internal ops — so your team spends time on higher-value work. Includes: workflow automation, internal tools, CRM/marketing stack integrations.",
  },
  {
    icon: Clapperboard,
    title: "AI Video & UGC",
    teaser: "AI-assisted video and UGC-style content, produced in days.",
    body: "We produce AI-assisted video ads, UGC-style content, and marketing collateral at a speed and cost traditional production can't match — without sacrificing quality. Includes: AI UGC ads, product videos, social content, marketing collateral.",
  },
]

const VISIBLE = 3

export function Services() {
  const [index, setIndex] = useState(0)
  const count = SERVICES.length
  const maxIndex = Math.max(0, count - VISIBLE)

  const goTo = useCallback(
    (next: number) => {
      setIndex(Math.min(Math.max(next, 0), maxIndex))
    },
    [maxIndex],
  )

  const prev = useCallback(() => goTo(index - 1), [goTo, index])
  const next = useCallback(() => goTo(index + 1), [goTo, index])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") prev()
      if (event.key === "ArrowRight") next()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [prev, next])

  return (
    <section className="relative overflow-hidden bg-muted py-20 lg:py-28">
      <FloatingConfetti />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Services we offer
        </h2>

        <div
          className="relative mt-14 w-full"
          role="region"
          aria-roledescription="carousel"
          aria-label="Services we offer"
        >
          <div className="w-full overflow-hidden">
            <motion.div
              className="flex w-full gap-6"
              animate={{ x: `calc(-${index} * ((100% + 1.5rem) / ${VISIBLE}))` }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
            >
              {SERVICES.map((service, i) => {
                const Icon = service.icon
                const isFeatured = i === index + 1

                return (
                  <article
                    key={service.title}
                    aria-roledescription="slide"
                    aria-label={`${i + 1} of ${count}`}
                    className={cn(
                      "w-[calc((100%-3rem)/3)] shrink-0 rounded-2xl border p-5 backdrop-blur-sm transition-all sm:p-8",
                      isFeatured
                        ? "border-primary/20 bg-card/25 shadow-xl ring-1 ring-primary/10 md:-translate-y-2"
                        : "border-border/40 bg-card/15 shadow-sm",
                    )}
                  >
                    <div
                      className={cn(
                        "flex size-10 items-center justify-center rounded-xl sm:size-12",
                        isFeatured
                          ? "bg-[#facc15] text-slate-900"
                          : "bg-[#facc15]/25 text-[#ca8a04]",
                      )}
                    >
                      <Icon className="size-5 sm:size-6" aria-hidden />
                    </div>
                    <h3 className="mt-5 text-base font-semibold text-card-foreground sm:mt-6 sm:text-lg">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-xs font-medium text-primary sm:text-sm">{service.teaser}</p>
                    <p className="mt-3 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                      {service.body}
                    </p>
                  </article>
                )
              })}
            </motion.div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={prev}
              disabled={index === 0}
              aria-label="Previous services"
              className="flex size-11 items-center justify-center rounded-full border border-border/70 bg-card/50 text-foreground shadow-sm outline-none backdrop-blur-sm transition hover:border-primary hover:text-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-muted disabled:pointer-events-none disabled:opacity-40"
            >
              <ChevronLeft className="size-5" aria-hidden />
            </button>

            <div className="flex items-center gap-2" role="tablist" aria-label="Service pages">
              {Array.from({ length: maxIndex + 1 }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Show services starting at ${i + 1}`}
                  onClick={() => goTo(i)}
                  className={cn(
                    "h-2.5 rounded-full outline-none transition-all focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-muted",
                    i === index ? "w-8 bg-[#facc15]" : "w-2.5 bg-border hover:bg-muted-foreground/40",
                  )}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={next}
              disabled={index === maxIndex}
              aria-label="Next services"
              className="flex size-11 items-center justify-center rounded-full border border-border/70 bg-card/50 text-foreground shadow-sm outline-none backdrop-blur-sm transition hover:border-primary hover:text-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-muted disabled:pointer-events-none disabled:opacity-40"
            >
              <ChevronRight className="size-5" aria-hidden />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
