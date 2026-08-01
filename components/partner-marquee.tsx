"use client"

import Image from "next/image"
import { motion } from "motion/react"

const LOGOS = [
  { src: "/partners/areaa.png", name: "AREAA", alt: "Asian Real Estate Association of America" },
  { src: "/partners/arts-emerson.png", name: "Arts Emerson", alt: "Arts Emerson" },
  { src: "/partners/families-first.png", name: "Families First", alt: "Families First" },
  { src: "/partners/asimom.png", name: "asimom", alt: "asimom" },
  { src: "/partners/huafa.png", name: "Huafa Group", alt: "Huafa Group" },
  { src: "/partners/tufts.png", name: "Tufts University", alt: "Tufts University" },
  { src: "/partners/zubedas.png", name: "Zubeda's Spa & Salon", alt: "Zubeda's Spa & Salon" },
  { src: "/partners/keller-williams.png", name: "Keller Williams Realty Success", alt: "Keller Williams Realty Success LLC" },
  { src: "/partners/tufts-confucius.png", name: "Tufts Confucius Institute", alt: "Tufts University Confucius Institute" },
  { src: "/partners/takeda.png", name: "Takeda", alt: "Takeda" },
  { src: "/partners/partners-healthcare.png", name: "Partners Healthcare", alt: "Partners Healthcare" },
  { src: "/partners/wellsense.png", name: "WellSense Health Plan", alt: "WellSense Health Plan" },
] as const

const ROW_A = LOGOS.filter((_, i) => i % 2 === 0)
const ROW_B = LOGOS.filter((_, i) => i % 2 === 1)

function LogoChip({
  logo,
}: {
  logo: (typeof LOGOS)[number]
}) {
  return (
    <div
      title={logo.name}
      className="flex h-[4.5rem] w-[11.5rem] shrink-0 items-center justify-center rounded-2xl bg-white/80 px-5 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_10px_28px_rgba(15,23,42,0.05)] ring-1 ring-slate-900/[0.05] backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_8px_24px_rgba(15,23,42,0.08)] sm:h-[5rem] sm:w-[13rem]"
    >
      <Image
        src={logo.src}
        alt={logo.alt}
        width={200}
        height={72}
        className="max-h-10 w-auto max-w-[85%] object-contain opacity-80 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 sm:max-h-11"
      />
    </div>
  )
}

function MarqueeRow({
  logos,
  reverse = false,
  duration = "42s",
}: {
  logos: readonly (typeof LOGOS)[number][]
  reverse?: boolean
  duration?: string
}) {
  const items = [...logos, ...logos]

  return (
    <div className="group/row relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div
        className={`flex w-max items-center gap-4 pr-4 sm:gap-5 sm:pr-5 ${
          reverse ? "animate-[marquee-reverse_var(--marquee-duration)_linear_infinite]" : "animate-[marquee_var(--marquee-duration)_linear_infinite]"
        } group-hover/row:[animation-play-state:paused]`}
        style={{ ["--marquee-duration" as string]: duration }}
      >
        {items.map((logo, i) => (
          <LogoChip key={`${logo.name}-${i}`} logo={logo} />
        ))}
      </div>
    </div>
  )
}

export function PartnerMarquee() {
  return (
    <section className="relative overflow-hidden border-y border-border py-20 sm:py-24">
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(180deg,#f8fafc_0%,#eef2ff_48%,#f8fafc_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(250,204,21,0.12),transparent_55%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.35] [background-image:radial-gradient(rgba(15,23,42,0.07)_1px,transparent_1px)] [background-size:22px_22px]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-[11px] font-semibold tracking-[0.24em] text-primary uppercase">
            Clients
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Clients we&apos;ve worked with
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
            From universities and healthcare to real estate and consumer brands — teams that trust us to build and grow.
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="relative mt-12 flex flex-col gap-4 sm:mt-14 sm:gap-5"
      >
        <MarqueeRow logos={ROW_A} duration="38s" />
        <MarqueeRow logos={ROW_B} reverse duration="44s" />
      </motion.div>
    </section>
  )
}
