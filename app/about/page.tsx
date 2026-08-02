"use client"

import Image from "next/image"
import { motion, useReducedMotion } from "motion/react"
import { ArrowRight, Compass, Layers, Rocket, Users } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { SiteFooter } from "@/components/site-footer"
import { CoffeeCta } from "@/components/coffee-cta"

const ease = [0.22, 1, 0.36, 1] as const

const PILLARS = [
  { label: "Mission", value: "Outcomes that compound", accent: "bg-[#38bdf8]" },
  { label: "Vision", value: "One engine, not silos", accent: "bg-[#facc15]" },
  { label: "Capability", value: "Build + grow + scale", accent: "bg-primary" },
] as const

const VALUES = [
  {
    n: "01",
    icon: Compass,
    title: "Clarity before craft",
    body: "We map the business outcome first — then design the product, campaigns, and systems that actually move it.",
  },
  {
    n: "02",
    icon: Layers,
    title: "One growth engine",
    body: "Marketing, software, AI, and content aren’t silos. We build them as one compounding system.",
  },
  {
    n: "03",
    icon: Rocket,
    title: "Ship, measure, sharpen",
    body: "Fast iterations with visible progress. Launch isn’t the finish line — it’s where the real learning starts.",
  },
  {
    n: "04",
    icon: Users,
    title: "Partners, not vendors",
    body: "We work shoulder-to-shoulder with founders and operators who care about quality and long-term leverage.",
  },
] as const

const TEAM = [
  {
    name: "Eddie Vo",
    role: "Founder & Principal",
    bio: "Leads strategy across product, growth, and brand — connecting ambitious roadmaps to shipped results.",
    initials: "EV",
    image: "/team/eddie-vo.png",
    featured: true,
  },
  {
    name: "Product Lead",
    role: "Design & Engineering",
    bio: "Interfaces, systems, and the polish users feel — shipping product that holds up in the real world.",
    initials: "PL",
    image: "/team/pl.png",
    featured: false,
  },
  {
    name: "Growth Lead",
    role: "Marketing & Content",
    bio: "Campaigns, creative, and channels that compound — turning attention into durable growth.",
    initials: "GL",
    image: "/team/gl.png",
    featured: false,
  },
] as const

export default function AboutPage() {
  const reducedMotion = useReducedMotion() ?? false

  return (
    <main>
      <Navbar tone="light" />

      {/* Hero — split editorial, distinct from homepage video “growth engine” hero */}
      <section className="relative overflow-hidden border-b border-border bg-background pt-16">
        <div className="relative mx-auto grid max-w-7xl lg:grid-cols-2">
          <div className="flex flex-col justify-center px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
            <motion.div
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.11, delayChildren: 0.05 } },
              }}
              className="max-w-xl"
            >
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 14 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
                }}
                className="inline-flex items-center gap-3"
              >
                <span className="h-px w-8 bg-[#facc15]" />
                <p className="text-[11px] font-semibold tracking-[0.28em] text-primary uppercase">
                  About us
                </p>
              </motion.div>

              <motion.h1
                variants={{
                  hidden: { opacity: 0, y: 28 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
                }}
                className="mt-5 text-balance text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
              >
                Operators who build the{" "}
                <span className="text-primary">whole system</span> — not another siloed vendor.
              </motion.h1>

              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 18 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
                }}
                className="mt-6 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
              >
                Eddie Vo Company is a tight crew of strategists, builders, and growth leads. We sit on the same side of the table
                as founders — shipping marketing, product, AI, and content as one motion.
              </motion.p>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 14 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
                }}
                className="mt-9 flex flex-wrap items-center gap-4"
              >
                <a
                  href="#team"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-transform hover:scale-105"
                >
                  Meet the people
                  <ArrowRight className="size-4" />
                </a>
                <a
                  href="/how-it-works"
                  className="text-sm font-semibold text-primary transition hover:underline"
                >
                  How engagements run →
                </a>
              </motion.div>

              <motion.dl
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
                }}
                className="mt-12 grid grid-cols-3 gap-4 border-t border-border pt-8"
              >
                {[
                  { k: "Focus", v: "Growth systems" },
                  { k: "Style", v: "Build + ship" },
                  { k: "Model", v: "One team" },
                ].map((stat) => (
                  <div key={stat.k}>
                    <dt className="text-[11px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
                      {stat.k}
                    </dt>
                    <dd className="mt-1 text-sm font-bold text-foreground sm:text-base">{stat.v}</dd>
                  </div>
                ))}
              </motion.dl>
            </motion.div>
          </div>

          <div className="relative min-h-[420px] overflow-hidden bg-primary sm:min-h-[480px] lg:min-h-full">
            <div
              aria-hidden
              className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(56,189,248,0.35),transparent_50%),radial-gradient(ellipse_at_20%_80%,rgba(250,204,21,0.2),transparent_45%)]"
            />
            <motion.p
              aria-hidden
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.12 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="pointer-events-none absolute -right-4 bottom-6 select-none text-[7rem] font-extrabold leading-none tracking-tighter text-white sm:text-[9rem] lg:text-[11rem]"
            >
              EV
            </motion.p>

            <div className="relative flex h-full items-center justify-center px-6 py-16 sm:px-10 lg:px-12">
              <div className="relative mx-auto flex h-[340px] w-full max-w-[420px] items-center justify-center sm:h-[400px]">
                {/* Product Lead — back left */}
                <motion.div
                  initial={{ opacity: 0, y: 36, rotate: -8 }}
                  animate={{ opacity: 1, y: 0, rotate: -7 }}
                  transition={{ duration: 0.75, delay: 0.15, ease }}
                  className="absolute left-0 top-16 z-10 w-[38%] max-w-[150px] overflow-hidden rounded-3xl border-4 border-white/20 shadow-2xl sm:top-20"
                >
                  <div className="relative aspect-[3/4] bg-slate-800">
                    <Image
                      src="/team/pl.png"
                      alt="Product Lead"
                      fill
                      sizes="150px"
                      className="object-cover object-top grayscale"
                      priority
                    />
                  </div>
                </motion.div>

                {/* Growth Lead — back right */}
                <motion.div
                  initial={{ opacity: 0, y: 40, rotate: 8 }}
                  animate={{
                    opacity: 1,
                    y: reducedMotion ? 0 : [0, -6, 0],
                    rotate: 6,
                  }}
                  transition={
                    reducedMotion
                      ? { duration: 0.75, delay: 0.28, ease }
                      : {
                          opacity: { duration: 0.75, delay: 0.28, ease },
                          rotate: { duration: 0.75, delay: 0.28, ease },
                          y: { duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.1 },
                        }
                  }
                  className="absolute right-0 top-8 z-10 w-[38%] max-w-[150px] overflow-hidden rounded-3xl border-4 border-[#facc15]/80 shadow-2xl sm:top-10"
                >
                  <div className="relative aspect-[3/4] bg-slate-800">
                    <Image
                      src="/team/gl.png"
                      alt="Growth Lead"
                      fill
                      sizes="150px"
                      className="object-cover object-top grayscale"
                      priority
                    />
                  </div>
                </motion.div>

                {/* Eddie Vo — front center */}
                <motion.div
                  initial={{ opacity: 0, y: 48, scale: 0.94 }}
                  animate={{
                    opacity: 1,
                    y: reducedMotion ? 0 : [0, -10, 0],
                    scale: 1,
                  }}
                  transition={
                    reducedMotion
                      ? { duration: 0.8, delay: 0.35, ease }
                      : {
                          opacity: { duration: 0.8, delay: 0.35, ease },
                          scale: { duration: 0.8, delay: 0.35, ease },
                          y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.2 },
                        }
                  }
                  className="relative z-20 w-[52%] max-w-[220px] overflow-hidden rounded-3xl border-4 border-[#38bdf8] shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
                >
                  <div className="relative aspect-[3/4] bg-slate-800">
                    <Image
                      src="/team/eddie-vo.png"
                      alt="Eddie Vo"
                      fill
                      sizes="220px"
                      className="object-cover object-top"
                      priority
                    />
                  </div>
                </motion.div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.7, ease }}
              className="absolute right-6 bottom-6 left-6 flex flex-wrap gap-2 sm:right-8 sm:left-8"
            >
              {["Strategy", "Product", "Growth"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="bg-muted py-12 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ul className="grid gap-3 sm:grid-cols-3">
            {PILLARS.map((item, index) => (
              <motion.li
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.45, ease, delay: index * 0.06 }}
                whileHover={reducedMotion ? undefined : { y: -4 }}
                className="rounded-2xl border border-border bg-background px-5 py-5 shadow-sm transition"
              >
                <div className={`mb-3 h-1 w-10 rounded-full ${item.accent}`} />
                <p className="text-[11px] font-semibold tracking-[0.2em] text-primary uppercase">
                  {item.label}
                </p>
                <p className="mt-1 text-lg font-bold tracking-tight text-foreground">{item.value}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* Manifesto band */}
      <section className="bg-background py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.blockquote
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.7, ease }}
            className="mx-auto max-w-4xl text-center"
          >
            <p className="text-3xl font-extrabold tracking-tight text-balance text-foreground sm:text-4xl lg:text-5xl lg:leading-[1.15]">
              Not another vendor stack.{" "}
              <span className="text-[#38bdf8]">One team</span> building the system that makes growth{" "}
              <span className="relative inline-block">
                inevitable
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-1 -z-10 h-3 bg-[#facc15]/50 sm:h-3.5"
                />
              </span>
              .
            </p>
          </motion.blockquote>
        </div>
      </section>

      {/* Values */}
      <section className="border-y border-border bg-muted py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, ease }}
            className="max-w-xl"
          >
            <p className="text-[11px] font-semibold tracking-[0.24em] text-primary uppercase">How we work</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Values that show up in the work
            </h2>
            <p className="mt-4 text-muted-foreground sm:text-lg">
              Four philosophies we bring to every engagement — from first workshop to post-launch iteration.
            </p>
          </motion.div>

          <ul className="mt-12 grid gap-4 sm:grid-cols-2">
            {VALUES.map((value, index) => (
              <motion.li
                key={value.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55, ease, delay: index * 0.07 }}
                whileHover={reducedMotion ? undefined : { y: -6 }}
                className={`group relative overflow-hidden rounded-3xl border border-border bg-background p-7 shadow-sm transition duration-300 hover:border-primary/20 hover:shadow-xl sm:p-8 ${
                  index === 0 ? "sm:col-span-2 sm:flex sm:items-end sm:gap-10 sm:p-10" : ""
                }`}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -top-16 -right-16 size-40 rounded-full bg-[#38bdf8]/0 blur-3xl transition duration-500 group-hover:bg-[#38bdf8]/15"
                />
                <div className={index === 0 ? "sm:max-w-md" : ""}>
                  <div className="flex items-center gap-3">
                    <span className="flex size-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground transition duration-300 group-hover:scale-110 group-hover:bg-[#facc15] group-hover:text-slate-950">
                      <value.icon className="size-5" />
                    </span>
                    <span className="text-sm font-extrabold tracking-wider text-[#38bdf8]">{value.n}</span>
                  </div>
                  <h3 className="mt-5 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                    {value.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground">{value.body}</p>
                </div>
                {index === 0 ? (
                  <p className="mt-6 hidden text-6xl font-extrabold tracking-tighter text-slate-100 select-none sm:mt-0 sm:block sm:text-8xl lg:text-9xl">
                    01
                  </p>
                ) : null}
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="bg-background py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, ease }}
            className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
          >
            <div className="max-w-xl">
              <p className="text-[11px] font-semibold tracking-[0.24em] text-primary uppercase">Leadership</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                The people behind Eddie Vo Company
              </h2>
              <p className="mt-4 text-muted-foreground sm:text-lg">
                Operators and builders. Tight crew. Outcomes that compound.
              </p>
            </div>
            <a
              href="/services"
              className="inline-flex items-center gap-2 self-start text-sm font-semibold text-primary transition hover:gap-3"
            >
              Explore services
              <ArrowRight className="size-4" />
            </a>
          </motion.div>

          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-12 lg:gap-6">
            {TEAM.map((member, index) => (
              <motion.li
                key={member.name}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease, delay: index * 0.08 }}
                whileHover={reducedMotion ? undefined : { y: -8 }}
                className={`group overflow-hidden rounded-3xl border border-border bg-muted shadow-sm transition duration-300 hover:shadow-2xl ${
                  member.featured ? "lg:col-span-6" : "lg:col-span-3"
                } ${index === 1 ? "lg:mt-10" : ""} ${index === 2 ? "lg:mt-4" : ""}`}
              >
                <div
                  className={`relative overflow-hidden bg-slate-200 ${
                    member.featured ? "aspect-[5/4] sm:aspect-[16/11]" : "aspect-[4/5]"
                  }`}
                >
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes={
                        member.featured
                          ? "(min-width: 1024px) 50vw, 100vw"
                          : "(min-width: 1024px) 25vw, 50vw"
                      }
                      className="object-cover object-top grayscale transition duration-500 group-hover:scale-[1.04] group-hover:grayscale-0"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary to-slate-900">
                      <span className="text-5xl font-extrabold tracking-tight text-white/30 sm:text-7xl">
                        {member.initials}
                      </span>
                      <div
                        aria-hidden
                        className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(250,204,21,0.25),transparent_55%)]"
                      />
                    </div>
                  )}
                </div>
                <div className={`p-6 ${member.featured ? "sm:p-8" : ""}`}>
                  <h3
                    className={`font-bold tracking-tight text-foreground ${
                      member.featured ? "text-2xl sm:text-3xl" : "text-xl"
                    }`}
                  >
                    {member.name}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-[#38bdf8]">{member.role}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {member.bio}
                  </p>
                </div>
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
