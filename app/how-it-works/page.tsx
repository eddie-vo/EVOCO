"use client"

import { motion } from "motion/react"
import {
  ArrowRight,
  Clapperboard,
  Code2,
  Megaphone,
  Sparkles,
  Workflow,
  type LucideIcon,
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { SiteFooter } from "@/components/site-footer"
import { CoffeeCta } from "@/components/coffee-cta"

const ease = [0.22, 1, 0.36, 1] as const

const STEPS = [
  {
    n: "01",
    title: "Grab a Coffee",
    body: "We start with a real conversation, not a pitch deck. We want to understand your business, your goals, and where you're actually stuck before we talk about solutions.",
  },
  {
    n: "02",
    title: "Build the Plan",
    body: "We map out exactly which pieces you need — marketing, software, AI, automation, video — and build a roadmap that ties them together, instead of treating them like separate vendors.",
  },
  {
    n: "03",
    title: "Build & Launch",
    body: "Our team executes: campaigns go live, software ships, automations get wired up, and content gets produced — all pointed in the same direction, on the same timeline.",
  },
  {
    n: "04",
    title: "Measure & Grow",
    body: "We track what's working, cut what isn't, and keep iterating. Growth isn't a one-time project handed off and forgotten — it's ongoing.",
  },
] as const

const SERVICE_AREAS: { icon: LucideIcon; title: string }[] = [
  { icon: Megaphone, title: "Digital Marketing" },
  { icon: Code2, title: "Software Development" },
  { icon: Sparkles, title: "AI Marketing" },
  { icon: Workflow, title: "Automation" },
  { icon: Clapperboard, title: "AI Video & UGC" },
]

export default function HowItWorksPage() {
  return (
    <main>
      <Navbar />

      {/* Hero — homepage type scale, shorter secondary-page treatment */}
      <section className="relative overflow-hidden bg-primary pt-16 text-primary-foreground">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(56,189,248,0.22),transparent_50%),radial-gradient(ellipse_at_90%_40%,rgba(250,204,21,0.12),transparent_45%)]"
        />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className="text-[11px] font-semibold tracking-[0.28em] text-[#facc15] uppercase">
              How it works
            </p>
            <h1 className="mt-4 text-balance text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              One team. One{" "}
              <span className="text-[#38bdf8]">growth engine</span>. Here&apos;s how it comes together.
            </h1>
            <p className="mt-6 max-w-md text-pretty text-base leading-relaxed text-primary-foreground/80">
              From first coffee chat to compounding growth — here&apos;s what working with us actually looks like.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Process steps */}
      <section className="bg-background py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Four steps from conversation to compounding growth
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              No mystery black boxes — a clear path from coffee chat to shipped momentum.
            </p>
          </div>

          <ol className="relative mt-14">
            {/* Vertical dashed connector — mirrors testimonials dotted motif */}
            <div
              aria-hidden
              className="absolute top-8 bottom-8 left-5 hidden w-0 border-l-2 border-dashed border-border sm:left-6 md:block"
            />

            {STEPS.map((step, index) => (
              <motion.li
                key={step.n}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.55, ease, delay: index * 0.06 }}
                className="relative grid gap-3 border-b border-border/70 py-10 last:border-b-0 md:grid-cols-[6.5rem_1fr] md:gap-12"
              >
                <div className="relative z-10">
                  <span className="inline-flex size-10 items-center justify-center rounded-full border-2 border-primary bg-background text-xs font-extrabold tracking-wider text-primary sm:size-12 sm:text-sm">
                    {step.n}
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                    <span className="text-[#38bdf8]">{step.n}</span>
                    <span className="mx-2.5 text-muted-foreground/40">—</span>
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                    {step.body}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* Services tie-in */}
      <section className="border-y border-border bg-muted py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, ease }}
            className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
          >
            <div className="max-w-xl">
              <p className="text-[11px] font-semibold tracking-[0.24em] text-primary uppercase">
                Step 03 covers
              </p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                What &ldquo;Build &amp; Launch&rdquo; actually includes
              </h2>
              <p className="mt-3 text-muted-foreground">
                Five capabilities under one roof — so everything points the same direction.
              </p>
            </div>
            <a
              href="/#services"
              className="inline-flex items-center gap-2 self-start text-sm font-semibold text-primary transition hover:gap-3"
            >
              See our full services
              <ArrowRight className="size-4" />
            </a>
          </motion.div>

          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {SERVICE_AREAS.map((area, index) => (
              <motion.li
                key={area.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, ease, delay: index * 0.05 }}
                className="flex items-center gap-3 rounded-2xl border border-border bg-background px-4 py-4 shadow-sm"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <area.icon className="size-5" />
                </span>
                <span className="text-sm font-semibold text-foreground">{area.title}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      <CoffeeCta />
      <SiteFooter />
    </main>
  )
}
