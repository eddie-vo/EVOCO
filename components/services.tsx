"use client"

import { motion } from "motion/react"
import { Smartphone, LayoutTemplate, MonitorCheck } from "lucide-react"
import { cn } from "@/lib/utils"
import { FloatingConfetti } from "@/components/floating-confetti"

const SERVICES = [
  {
    icon: Smartphone,
    title: "Mobile App Development",
    body: "We design and ship native and cross-platform apps your users will love, from concept through App Store launch.",
    featured: false,
  },
  {
    icon: LayoutTemplate,
    title: "Web Design & Development",
    body: "Beautiful, high-converting websites and web apps built with modern frameworks and pixel-perfect attention to detail.",
    featured: true,
  },
  {
    icon: MonitorCheck,
    title: "Software Testing Service",
    body: "Rigorous QA and automated testing so you can ship with confidence and keep your product rock solid.",
    featured: false,
  },
]

export function Services() {
  return (
    <section className="relative overflow-hidden bg-muted py-20 lg:py-28">
      <FloatingConfetti />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Services we offer
        </h2>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={cn(
                "rounded-2xl border bg-card p-8 transition-shadow",
                service.featured
                  ? "border-accent shadow-xl md:-translate-y-4 ring-1 ring-accent/20"
                  : "border-border shadow-sm hover:shadow-md",
              )}
            >
              <div
                className={cn(
                  "flex size-12 items-center justify-center rounded-xl",
                  service.featured ? "bg-accent text-accent-foreground" : "bg-primary/10 text-primary",
                )}
              >
                <service.icon className="size-6" />
              </div>
              <h3 className="mt-6 text-lg font-semibold text-card-foreground">{service.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{service.body}</p>
              {service.featured && (
                <span className="mt-6 inline-block text-sm font-semibold text-accent">Learn more →</span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
