"use client"

import { useMemo, useRef } from "react"
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react"
import { ArrowRight } from "lucide-react"

const LINES = [
  {
    text: "We don't just write code.",
    className: "text-4xl text-foreground sm:text-6xl",
  },
  {
    text: "We don't just run ads.",
    className: "text-4xl text-primary sm:text-6xl",
  },
  {
    text: "We build the whole growth engine — marketing, software, AI, and content, working as one.",
    className: "max-w-4xl text-2xl leading-snug text-indigo-700 sm:text-4xl lg:text-5xl",
  },
  {
    text: "Ready to put yours to work?",
    className: "text-4xl text-[#facc15] sm:text-6xl",
  },
] as const

/** Scroll progress windows for each line (must sum/cover 0→1) */
const LINE_WINDOWS: [number, number, number, number][] = [
  // [fadeInStart, fullyVisible, fadeOutStart, fadeOutEnd]
  [0.0, 0.06, 0.18, 0.24],
  [0.22, 0.28, 0.4, 0.46],
  [0.44, 0.5, 0.64, 0.7],
  [0.68, 0.76, 0.95, 1.0],
]

function splitWords(text: string) {
  return text.split(/(\s+)/).filter((part) => part.length > 0)
}

function ScrollWord({
  children,
  progress,
  appearAt,
  isFinal,
  reducedMotion,
}: {
  children: string
  progress: MotionValue<number>
  appearAt: number
  isFinal?: boolean
  reducedMotion: boolean
}) {
  const appearEnd = Math.min(appearAt + 0.035, 0.99)
  const popStart = Math.min(appearEnd + 0.01, 0.995)
  const popMid = Math.min(popStart + 0.015, 0.998)

  const opacity = useTransform(
    progress,
    reducedMotion
      ? [appearAt, appearEnd]
      : [appearAt, appearEnd],
    [0, 1],
  )
  const y = useTransform(progress, [appearAt, appearEnd], reducedMotion ? [0, 0] : [28, 0])
  const scale = useTransform(
    progress,
    isFinal && !reducedMotion
      ? [appearAt, appearEnd, popStart, popMid, 1]
      : [appearAt, appearEnd],
    isFinal && !reducedMotion ? [0.92, 1, 1, 1.06, 1] : reducedMotion ? [1, 1] : [0.92, 1],
  )
  const blur = useTransform(
    progress,
    [appearAt, appearEnd],
    reducedMotion ? ["blur(0px)", "blur(0px)"] : ["blur(8px)", "blur(0px)"],
  )

  return (
    <motion.span
      style={{ opacity, y, scale, filter: blur }}
      className="inline-block will-change-transform"
    >
      {children}
    </motion.span>
  )
}

function ScrollLine({
  text,
  className,
  progress,
  window: win,
  isLast,
  reducedMotion,
}: {
  text: string
  className: string
  progress: MotionValue<number>
  window: [number, number, number, number]
  isLast: boolean
  reducedMotion: boolean
}) {
  const [inStart, inEnd, outStart, outEnd] = win
  const parts = useMemo(() => splitWords(text), [text])
  const contentWords = useMemo(() => parts.filter((p) => !/^\s+$/.test(p)), [parts])

  const lineOpacity = useTransform(
    progress,
    [inStart, inEnd, outStart, outEnd],
    isLast ? [0, 1, 1, 1] : [0, 1, 1, 0],
  )

  // Words reveal across the in→outStart span of this line
  const wordSpanStart = inStart
  const wordSpanEnd = Math.max(inEnd + 0.08, outStart - 0.04)
  const wordStep = (wordSpanEnd - wordSpanStart) / Math.max(contentWords.length, 1)

  let wordIndex = 0

  return (
    <motion.p
      style={{ opacity: lineOpacity }}
      className={`absolute max-w-5xl px-6 text-center font-extrabold tracking-tight ${className}`}
    >
      {parts.map((part, i) => {
        if (/^\s+$/.test(part)) {
          return <span key={`s-${i}`}>{part}</span>
        }
        const idx = wordIndex
        wordIndex += 1
        const appearAt = wordSpanStart + idx * wordStep
        const isFinal = isLast && idx === contentWords.length - 1

        return (
          <ScrollWord
            key={`${part}-${i}`}
            progress={progress}
            appearAt={appearAt}
            isFinal={isFinal}
            reducedMotion={reducedMotion}
          >
            {part}
          </ScrollWord>
        )
      })}
    </motion.p>
  )
}

export function ScrollyCta() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion() ?? false

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  })

  return (
    <>
      {/* Scroll-driven word-by-word buildup */}
      <section ref={sectionRef} className="relative h-[400vh] bg-background">
        <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
          {LINES.map((line, index) => (
            <ScrollLine
              key={line.text}
              text={line.text}
              className={line.className}
              progress={scrollYProgress}
              window={LINE_WINDOWS[index]}
              isLast={index === LINES.length - 1}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>
      </section>

      {/* Full-bleed video CTA — left-aligned coffee tone */}
      <section id="contact" className="relative w-full overflow-hidden">
        <div className="relative flex min-h-[560px] w-full items-center py-24 sm:min-h-[600px]">
          <video
            aria-hidden
            className="absolute inset-0 size-full object-cover object-center"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          >
            <source src="/videos/cta-cinemagraph.mp4" type="video/mp4" />
          </video>

          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-r from-[rgba(10,15,40,0.72)] via-[rgba(10,15,40,0.45)] to-[rgba(10,15,40,0.2)]"
          />

          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative z-10 flex w-full max-w-7xl flex-col items-center gap-6 px-6 text-center text-white sm:items-start sm:gap-8 sm:px-10 sm:text-left lg:px-16"
          >
            <h2 className="max-w-xl text-balance text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Let&apos;s grab a coffee ☕
            </h2>
            <p className="max-w-md text-pretty text-base leading-relaxed text-white/85 sm:text-lg">
              No pitch decks — just a real conversation about turning your marketing, software, and content into one
              system that compounds.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-3 rounded-full bg-white px-10 py-5 text-base font-bold text-primary shadow-lg transition-transform hover:scale-105 sm:text-lg"
            >
              Book a Coffee Chat
              <ArrowRight className="size-5" />
            </a>
          </motion.div>
        </div>
      </section>
    </>
  )
}
