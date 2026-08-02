"use client"

import { FormEvent, useState } from "react"
import { motion } from "motion/react"
import {
  ArrowRight,
  CheckCircle2,
  Code2,
  Megaphone,
  Sparkles,
  Users,
  Workflow,
  Clapperboard,
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { SiteFooter } from "@/components/site-footer"

const ease = [0.22, 1, 0.36, 1] as const

const CAPABILITIES = [
  { icon: Megaphone, title: "Digital Marketing", body: "Campaigns, funnels, and conversion systems that compound." },
  { icon: Code2, title: "Software Development", body: "Web and product builds that ship clean and scale." },
  { icon: Sparkles, title: "AI Marketing", body: "Targeting, personalization, and AI-assisted creative ops." },
  { icon: Workflow, title: "Automation", body: "Workflows and internal tools that cut busywork." },
  { icon: Clapperboard, title: "AI Video & UGC", body: "Production-speed content without the production tax." },
  { icon: Users, title: "Embedded squad", body: "A cross-functional team that operates like an extension of yours." },
] as const

const MODELS = [
  {
    n: "01",
    title: "Project sprint",
    body: "A focused build — site, campaign system, automation, or product slice — with a clear scope and launch date.",
  },
  {
    n: "02",
    title: "Growth retainer",
    body: "Ongoing marketing, content, and iteration so the engine keeps compounding after launch.",
  },
  {
    n: "03",
    title: "Product partnership",
    body: "Design + engineering embedded with your team to ship and harden production software.",
  },
] as const

export default function HirePage() {
  const [sent, setSent] = useState(false)

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSent(true)
  }

  return (
    <main>
      <Navbar />

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
              Hire Eddie Vo Company
            </p>
            <h1 className="mt-4 text-balance text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Bring on a team that builds the{" "}
              <span className="text-[#38bdf8]">whole growth engine</span>.
            </h1>
            <p className="mt-6 max-w-md text-pretty text-base leading-relaxed text-primary-foreground/80">
              One crew for marketing, software, AI, automation, and content — scoped to your goals, not a menu of
              disconnected vendors.
            </p>
            <a
              href="#brief"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-background px-6 py-3 text-sm font-semibold text-primary shadow-lg transition-transform hover:scale-105"
            >
              Start a brief
              <ArrowRight className="size-4" />
            </a>
          </motion.div>
        </div>
      </section>

      <section className="bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              What you can hire us for
            </h2>
            <p className="mt-4 text-muted-foreground sm:text-lg">
              Engage à la carte or as one connected system — same team either way.
            </p>
          </div>

          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map((item, index) => (
              <motion.li
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, ease, delay: index * 0.04 }}
                className="rounded-2xl border border-border bg-muted/40 p-6"
              >
                <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <item.icon className="size-5" />
                </span>
                <h3 className="mt-4 text-lg font-bold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-y border-border bg-muted py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl">
            <p className="text-[11px] font-semibold tracking-[0.24em] text-primary uppercase">
              Engagement models
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Pick the shape that fits
            </h2>
          </div>

          <ol className="relative mt-12">
            <div
              aria-hidden
              className="absolute top-8 bottom-8 left-5 hidden w-0 border-l-2 border-dashed border-border sm:left-6 md:block"
            />
            {MODELS.map((model, index) => (
              <motion.li
                key={model.n}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.55, ease, delay: index * 0.06 }}
                className="relative grid gap-3 border-b border-border/70 py-10 last:border-b-0 md:grid-cols-[6.5rem_1fr] md:gap-12"
              >
                <div className="relative z-10">
                  <span className="inline-flex size-10 items-center justify-center rounded-full border-2 border-primary bg-muted text-xs font-extrabold tracking-wider text-primary sm:size-12 sm:text-sm">
                    {model.n}
                  </span>
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                    <span className="text-[#38bdf8]">{model.n}</span>
                    <span className="mx-2.5 text-muted-foreground/40">—</span>
                    {model.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                    {model.body}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      <section id="brief" className="bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, ease }}
            className="rounded-3xl border border-border bg-muted p-6 shadow-sm sm:p-10"
          >
            {sent ? (
              <div className="flex min-h-[280px] flex-col items-center justify-center text-center">
                <CheckCircle2 className="size-12 text-primary" />
                <h3 className="mt-4 text-2xl font-bold text-foreground">Brief received</h3>
                <p className="mt-2 max-w-sm text-muted-foreground">
                  We&apos;ll review the scope and follow up with next steps — usually within one business day.
                </p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="mt-6 text-sm font-semibold text-primary hover:underline"
                >
                  Submit another brief
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-5">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                    Start a project brief
                  </h2>
                  <p className="mt-2 text-muted-foreground">
                    Share the shape of what you need — we&apos;ll come back with a clear proposal path.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-sm font-medium text-foreground">
                    Name
                    <input
                      required
                      name="name"
                      className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                      placeholder="Your name"
                    />
                  </label>
                  <label className="block text-sm font-medium text-foreground">
                    Work email
                    <input
                      required
                      type="email"
                      name="email"
                      className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                      placeholder="you@company.com"
                    />
                  </label>
                </div>

                <label className="block text-sm font-medium text-foreground">
                  Company
                  <input
                    required
                    name="company"
                    className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="Company name"
                  />
                </label>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-sm font-medium text-foreground">
                    What do you need?
                    <select
                      required
                      name="need"
                      defaultValue=""
                      className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                    >
                      <option value="" disabled>
                        Select a focus
                      </option>
                      <option>Full growth engine</option>
                      <option>Marketing / campaigns</option>
                      <option>Software / product</option>
                      <option>AI & automation</option>
                      <option>Video & content</option>
                      <option>Not sure yet</option>
                    </select>
                  </label>
                  <label className="block text-sm font-medium text-foreground">
                    Timeline
                    <select
                      name="timeline"
                      defaultValue=""
                      className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                    >
                      <option value="" disabled>
                        Select timing
                      </option>
                      <option>ASAP</option>
                      <option>This quarter</option>
                      <option>Next quarter</option>
                      <option>Exploring</option>
                    </select>
                  </label>
                </div>

                <label className="block text-sm font-medium text-foreground">
                  Project notes
                  <textarea
                    required
                    name="notes"
                    rows={5}
                    className="mt-1.5 w-full resize-y rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="Goals, constraints, success metrics…"
                  />
                </label>

                <button
                  type="submit"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#facc15] px-6 py-3.5 text-sm font-bold text-slate-950 transition hover:bg-[#fde047] sm:w-auto"
                >
                  Submit brief
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </button>
              </form>
            )}
          </motion.div>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Just want a conversation first?{" "}
            <a href="/contact" className="font-semibold text-primary hover:underline">
              Go to contact
            </a>
          </p>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
