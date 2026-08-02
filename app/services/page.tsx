"use client"

import { motion } from "motion/react"
import {
  ArrowRight,
  Bot,
  Boxes,
  Cloud,
  Code2,
  Compass,
  Globe2,
  Layers,
  Rocket,
  Sparkles,
  Wand2,
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { SiteFooter } from "@/components/site-footer"
import { CoffeeCta } from "@/components/coffee-cta"

const ease = [0.22, 1, 0.36, 1] as const

const SERVICES = [
  {
    icon: Bot,
    title: "AI Automation & Agents",
    description:
      "Purpose-built agents and workflows that remove busywork, accelerate decisions, and plug into the tools your team already uses.",
    deliverables: [
      "Custom agents for ops, support, and growth",
      "Workflow automation across your stack",
      "Evaluation loops so quality stays measurable",
    ],
  },
  {
    icon: Code2,
    title: "Web Development & High-Performance Next.js Sites",
    description:
      "Marketing and product surfaces that load fast, convert cleanly, and stay maintainable — built on modern Next.js.",
    deliverables: [
      "App Router sites with SEO-ready structure",
      "Conversion-focused landing systems",
      "Performance budgets and Core Web Vitals",
    ],
  },
  {
    icon: Wand2,
    title: "Interactive Scrollytelling & 3D Web Experiences",
    description:
      "Immersive narratives that turn complex products into stories people feel — scroll-driven motion, video, and spatial UI.",
    deliverables: [
      "Scroll-scrubbed video & motion systems",
      "3D / WebGL product storytelling",
      "Accessible motion with reduced-motion paths",
    ],
  },
  {
    icon: Cloud,
    title: "Custom Software Architecture & Edge Deployment",
    description:
      "Reliable backends and edge delivery — APIs, auth, data models, and global deploy so your product scales without drama.",
    deliverables: [
      "API & data architecture blueprints",
      "Edge-ready deploy on Cloudflare / Vercel",
      "Observability, security, and CI pipelines",
    ],
  },
  {
    icon: Rocket,
    title: "Growth Systems & Paid Media",
    description:
      "Campaigns and funnels wired to product truth — creative, tracking, and iteration that compounds instead of resetting monthly.",
    deliverables: [
      "Full-funnel campaign architecture",
      "Creative systems that stay on-brand",
      "Attribution & experimentation cadence",
    ],
  },
  {
    icon: Sparkles,
    title: "Brand, Content & AI Creative Ops",
    description:
      "A content engine that looks premium and ships consistently — brand systems plus AI-assisted production without the generic look.",
    deliverables: [
      "Brand systems & design tokens",
      "Content pipelines with AI assist",
      "Asset kits for web, social, and sales",
    ],
  },
] as const

const STEPS = [
  {
    n: "01",
    title: "Discovery",
    body: "Goals, constraints, users, and success metrics — we align on the outcome before a line of code ships.",
    icon: Compass,
  },
  {
    n: "02",
    title: "Architecture",
    body: "Information architecture, stack choices, and a build plan that balances speed with long-term leverage.",
    icon: Boxes,
  },
  {
    n: "03",
    title: "Build & Animate",
    body: "Interfaces, systems, and motion in tight loops — visible progress every week, not a black-box reveal.",
    icon: Layers,
  },
  {
    n: "04",
    title: "Global Deployment",
    body: "Edge deploy, monitoring, and handoff so the product is fast worldwide and ready to iterate in market.",
    icon: Globe2,
  },
] as const

const TECH = [
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Framer Motion",
  "OpenAI API",
  "Cloudflare Pages",
  "React",
  "Vercel",
  "PostgreSQL",
  "WebGL",
  "Sanity",
  "Stripe",
] as const

export default function ServicesPage() {
  return (
    <main>
      <Navbar />

      {/* Hero */}
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
              Services
            </p>
            <h1 className="mt-4 text-balance text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Full-stack AI engineering &{" "}
              <span className="text-[#38bdf8]">next-gen digital experiences</span>
            </h1>
            <p className="mt-6 max-w-md text-pretty text-base leading-relaxed text-primary-foreground/80">
              From agents and high-performance Next.js sites to scrollytelling and edge architecture — built as one
              growth engine, not a pile of vendors.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#offerings"
                className="inline-flex items-center gap-2 rounded-full bg-background px-6 py-3 text-sm font-semibold text-primary shadow-lg transition-transform hover:scale-105"
              >
                Explore offerings
                <ArrowRight className="size-4" />
              </a>
              <a
                href="/how-it-works"
                className="text-sm font-semibold text-primary-foreground/85 transition hover:text-white"
              >
                See how it works →
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core services */}
      <section id="offerings" className="bg-background py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Core services built to compound
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Six capabilities you can engage à la carte — or as one connected growth engine.
            </p>
          </div>

          <ul className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {SERVICES.map((service, index) => (
              <motion.li
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, ease, delay: index * 0.04 }}
                className="flex h-full flex-col rounded-2xl border border-border bg-background p-6 shadow-sm transition hover:border-primary/25 hover:shadow-md"
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <service.icon className="size-5" />
                </span>
                <h3 className="mt-5 text-lg font-bold tracking-tight text-foreground">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
                <ul className="mt-5 space-y-2 border-t border-border pt-5">
                  {service.deliverables.map((item) => (
                    <li key={item} className="flex gap-2.5 text-sm text-foreground/80">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[#38bdf8]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* Process — same vertical dashed motif as How it Works */}
      <section className="border-y border-border bg-muted py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <p className="text-[11px] font-semibold tracking-[0.24em] text-primary uppercase">
                Delivery
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                A clear 4-step path from brief to live
              </h2>
              <p className="mt-4 text-muted-foreground sm:text-lg">
                Tight loops, visible milestones, and a deployment story that holds up globally.
              </p>
            </div>
            <a
              href="/how-it-works"
              className="inline-flex items-center gap-2 self-start text-sm font-semibold text-primary transition hover:gap-3"
            >
              Full engagement process
              <ArrowRight className="size-4" />
            </a>
          </div>

          <ol className="relative mt-14">
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
                  <span className="inline-flex size-10 items-center justify-center rounded-full border-2 border-primary bg-muted text-xs font-extrabold tracking-wider text-primary sm:size-12 sm:text-sm">
                    {step.n}
                  </span>
                </div>
                <div>
                  <h3 className="flex flex-wrap items-center gap-x-3 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                    <span className="text-[#38bdf8]">{step.n}</span>
                    <span className="text-muted-foreground/40">—</span>
                    {step.title}
                    <step.icon className="size-5 text-primary/70" />
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

      {/* Tech stack */}
      <section className="bg-background py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, ease }}
            className="max-w-xl"
          >
            <p className="text-[11px] font-semibold tracking-[0.24em] text-primary uppercase">Stack</p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Modern tools. Production-grade delivery.
            </h2>
            <p className="mt-3 text-muted-foreground">
              We ship on the stack ambitious teams already trust — fast to build, ready to scale.
            </p>
          </motion.div>

          <ul className="mt-10 flex flex-wrap gap-3">
            {TECH.map((tool, index) => (
              <motion.li
                key={tool}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, ease, delay: index * 0.03 }}
              >
                <span className="inline-flex items-center rounded-full border border-border bg-muted px-4 py-2 text-sm font-medium text-foreground transition hover:border-primary/30 hover:bg-background">
                  {tool}
                </span>
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
