"use client"

import { FormEvent, useState } from "react"
import { motion } from "motion/react"
import { ArrowRight, CheckCircle2, Mail, MessageSquare, Clock } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { SiteFooter } from "@/components/site-footer"

const ease = [0.22, 1, 0.36, 1] as const

const DETAILS = [
  {
    icon: Mail,
    title: "Email",
    body: "Prefer writing it out? Send a note and we’ll reply within one business day.",
  },
  {
    icon: MessageSquare,
    title: "Coffee chat",
    body: "No pitch decks — a real conversation about where you are and where you want to go.",
  },
  {
    icon: Clock,
    title: "Response time",
    body: "Most inquiries get a thoughtful reply within 24 hours on business days.",
  },
] as const

export default function ContactPage() {
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
              Contact
            </p>
            <h1 className="mt-4 text-balance text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Let&apos;s grab a coffee and talk about{" "}
              <span className="text-[#38bdf8]">what&apos;s next</span>.
            </h1>
            <p className="mt-6 max-w-md text-pretty text-base leading-relaxed text-primary-foreground/80">
              Tell us a bit about your business — we&apos;ll follow up with a clear next step, not a generic sales script.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-background py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, ease }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              How to reach us
            </h2>
            <ul className="space-y-4">
              {DETAILS.map((item) => (
                <li
                  key={item.title}
                  className="flex gap-4 rounded-2xl border border-border bg-muted/50 p-5"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <item.icon className="size-5" />
                  </span>
                  <div>
                    <p className="font-semibold text-foreground">{item.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                  </div>
                </li>
              ))}
            </ul>
            <a
              href="/hire"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:gap-3"
            >
              Looking to hire Eddie Vo Company for a project?
              <ArrowRight className="size-4" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, ease }}
            className="rounded-3xl border border-border bg-muted p-6 shadow-sm sm:p-8"
          >
            {sent ? (
              <div className="flex min-h-[320px] flex-col items-center justify-center text-center">
                <CheckCircle2 className="size-12 text-primary" />
                <h3 className="mt-4 text-2xl font-bold text-foreground">Message received</h3>
                <p className="mt-2 max-w-sm text-muted-foreground">
                  Thanks — we&apos;ll review what you shared and get back within one business day.
                </p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="mt-6 text-sm font-semibold text-primary hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-5">
                <div>
                  <h3 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                    Send a message
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    A few details help us come prepared.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-sm font-medium text-foreground">
                    Name
                    <input
                      required
                      name="name"
                      autoComplete="name"
                      className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                      placeholder="Your name"
                    />
                  </label>
                  <label className="block text-sm font-medium text-foreground">
                    Email
                    <input
                      required
                      type="email"
                      name="email"
                      autoComplete="email"
                      className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                      placeholder="you@company.com"
                    />
                  </label>
                </div>

                <label className="block text-sm font-medium text-foreground">
                  Company
                  <input
                    name="company"
                    autoComplete="organization"
                    className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="Company name"
                  />
                </label>

                <label className="block text-sm font-medium text-foreground">
                  How can we help?
                  <textarea
                    required
                    name="message"
                    rows={5}
                    className="mt-1.5 w-full resize-y rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="Goals, timeline, what you're stuck on…"
                  />
                </label>

                <button
                  type="submit"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#facc15] px-6 py-3.5 text-sm font-bold text-slate-950 transition hover:bg-[#fde047] sm:w-auto"
                >
                  Send message
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
