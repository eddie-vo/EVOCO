"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence, useReducedMotion } from "motion/react"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { SiteFooter } from "@/components/site-footer"
import { CoffeeCta } from "@/components/coffee-cta"
import { CASE_INDUSTRIES, CASE_STUDIES, type CaseStudy } from "@/lib/case-studies"

const ease = [0.22, 1, 0.36, 1] as const

function CaseCard({
  item,
  index,
  featured = false,
}: {
  item: CaseStudy
  index: number
  featured?: boolean
}) {
  const reducedMotion = useReducedMotion() ?? false

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease, delay: index * 0.06 }}
      whileHover={reducedMotion ? undefined : { y: -6 }}
      className={`group overflow-hidden rounded-3xl border border-border shadow-sm transition duration-300 hover:shadow-2xl ${item.bg} ${
        featured ? "lg:col-span-2" : ""
      }`}
    >
      <div
        className={`grid items-center gap-6 p-6 sm:p-8 lg:gap-10 lg:p-10 ${
          featured ? "lg:grid-cols-2" : ""
        }`}
      >
        <div className={`relative w-full ${featured ? "aspect-[16/11]" : "aspect-[4/3]"}`}>
          <Image
            src={item.image}
            alt={`${item.title} preview`}
            fill
            sizes={featured ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 768px) 50vw, 100vw"}
            className="object-contain transition duration-500 group-hover:scale-[1.03]"
          />
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-white/80 px-3 py-1 text-[11px] font-semibold tracking-wide text-slate-700 uppercase">
              {item.industry}
            </span>
          </div>

          <h2
            className={`mt-4 font-extrabold tracking-tight text-slate-900 ${
              featured ? "text-3xl sm:text-4xl" : "text-2xl sm:text-3xl"
            }`}
          >
            {item.title}
          </h2>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-slate-600 sm:text-base">
            {featured ? item.body : item.summary}
          </p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {item.services.map((service) => (
              <li
                key={service}
                className="rounded-full border border-slate-900/10 bg-white/60 px-3 py-1 text-xs font-medium text-slate-700"
              >
                {service}
              </li>
            ))}
          </ul>

          <a
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:gap-3"
          >
            Discuss a similar project
            <ArrowUpRight className="size-4" />
          </a>
        </div>
      </div>
    </motion.article>
  )
}

export default function CaseStudiesPage() {
  const [filter, setFilter] = useState<(typeof CASE_INDUSTRIES)[number]>("All")
  const reducedMotion = useReducedMotion() ?? false

  const filtered = useMemo(() => {
    if (filter === "All") return CASE_STUDIES
    return CASE_STUDIES.filter((item) => item.industry === filter)
  }, [filter])

  const featured = filtered[0]
  const rest = filtered.slice(1)

  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-primary pt-16 text-primary-foreground">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(56,189,248,0.22),transparent_50%),radial-gradient(ellipse_at_90%_40%,rgba(250,204,21,0.12),transparent_45%)]"
        />
        {!reducedMotion ? (
          <motion.div
            aria-hidden
            className="absolute top-20 right-[15%] size-44 rounded-full bg-[#38bdf8]/20 blur-3xl"
            animate={{ y: [0, -16, 0], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        ) : null}

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <p className="text-[11px] font-semibold tracking-[0.28em] text-[#facc15] uppercase">
              Case studies
            </p>
            <h1 className="mt-4 text-balance text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Work that ships.{" "}
              <span className="text-[#38bdf8]">Results that compound.</span>
            </h1>
            <p className="mt-6 max-w-md text-pretty text-base leading-relaxed text-primary-foreground/80">
              A look at how Eddie Vo Company builds growth engines for fitness, logistics, consumer, and beyond —
              product, marketing, and content moving as one.
            </p>
          </motion.div>

          {/* Floating mini preview strip */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
            className="mt-12 flex gap-3 overflow-x-auto pb-2 lg:mt-16"
          >
            {CASE_STUDIES.map((item, i) => (
              <motion.button
                key={item.slug}
                type="button"
                onClick={() => setFilter(item.industry)}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 + i * 0.08, duration: 0.45 }}
                className={`relative h-28 w-40 shrink-0 overflow-hidden rounded-2xl border border-white/20 ${item.bg} shadow-lg transition hover:-translate-y-1 sm:h-32 sm:w-48`}
              >
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="192px"
                  className="object-contain p-2"
                />
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Filter + grid */}
      <section className="bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Selected work
              </h2>
              <p className="mt-2 text-muted-foreground">
                Filter by industry — or scroll the full set.
              </p>
            </div>

            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter case studies">
              {CASE_INDUSTRIES.map((industry) => {
                const active = filter === industry
                return (
                  <button
                    key={industry}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setFilter(industry)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      active
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "border border-border bg-muted text-foreground hover:border-primary/30"
                    }`}
                  >
                    {industry}
                  </button>
                )
              })}
            </div>
          </div>

          <AnimatePresence mode="popLayout">
            <motion.div layout className="mt-12 grid gap-6 lg:grid-cols-2">
              {featured ? (
                <CaseCard key={`f-${featured.slug}-${filter}`} item={featured} index={0} featured />
              ) : null}
              {rest.map((item, index) => (
                <CaseCard key={`${item.slug}-${filter}`} item={item} index={index + 1} />
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 ? (
            <p className="mt-16 text-center text-muted-foreground">No case studies in this category yet.</p>
          ) : null}

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease }}
            className="mt-16 flex flex-col items-start justify-between gap-6 rounded-3xl border border-border bg-muted p-8 sm:flex-row sm:items-center sm:p-10"
          >
            <div>
              <h3 className="text-xl font-bold text-foreground sm:text-2xl">
                Want results like these?
              </h3>
              <p className="mt-2 max-w-md text-muted-foreground">
                Tell us where you are — we&apos;ll map a path from brief to shipped growth.
              </p>
            </div>
            <a
              href="/hire"
              className="inline-flex items-center gap-2 rounded-full bg-[#facc15] px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-[#fde047]"
            >
              Start a brief
              <ArrowRight className="size-4" />
            </a>
          </motion.div>
        </div>
      </section>

      <CoffeeCta />
      <SiteFooter />
    </main>
  )
}
