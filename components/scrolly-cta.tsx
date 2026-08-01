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

/**
 * Scroll windows — short reveal, long hold so each line is readable while scrolling.
 * Roughly ~20% of the track per line is a pause-to-read zone.
 */
const LINE_WINDOWS: [number, number, number, number][] = [
  // [fadeInStart, fullyVisible, fadeOutStart, fadeOutEnd]
  [0.0, 0.02, 0.22, 0.25],
  [0.24, 0.26, 0.46, 0.49],
  [0.48, 0.52, 0.74, 0.77],
  [0.76, 0.8, 0.98, 1.0],
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
  const appearEnd = Math.min(appearAt + 0.02, 0.99)
  const popStart = Math.min(appearEnd + 0.008, 0.995)
  const popMid = Math.min(popStart + 0.012, 0.998)

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

  // Words finish appearing shortly after the line is fully visible, then hold to read
  const wordSpanStart = inStart
  const wordSpanEnd = Math.min(inEnd + 0.05, outStart - 0.08)
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
      <section ref={sectionRef} className="relative h-[700vh] bg-background">
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

      {/* Full-bleed video CTA — warm coffee atmosphere */}
      <section id="contact" className="relative w-full overflow-hidden">
        <div className="relative flex min-h-[640px] w-full items-center py-28 sm:min-h-[720px] sm:py-32">
          <video
            aria-hidden
            className="absolute inset-0 size-full scale-105 object-cover object-[70%_center]"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          >
            <source src="/videos/cta-cinemagraph.mp4" type="video/mp4" />
          </video>

          {/* Readability wash — deep on copy side, open to the scene */}
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(105deg,rgba(12,10,9,0.82)_0%,rgba(28,18,12,0.62)_38%,rgba(28,18,12,0.28)_62%,rgba(28,18,12,0.12)_100%)]"
          />
          {/* Warm window light */}
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,rgba(250,204,21,0.14),transparent_55%)]"
          />
          {/* Soft floor fade into footer */}
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background/90 to-transparent"
          />

          <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-16">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.35 }}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
              }}
              className="flex max-w-xl flex-col items-center text-center sm:items-start sm:text-left"
            >
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
                }}
                className="mb-5 text-[11px] font-semibold tracking-[0.28em] text-[#facc15] uppercase"
              >
                Next step
              </motion.p>

              <motion.h2
                variants={{
                  hidden: { opacity: 0, y: 28 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
                }}
                className="text-balance text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl"
              >
                Let&apos;s grab{" "}
                <span className="bg-gradient-to-r from-[#fde68a] via-[#facc15] to-[#f59e0b] bg-clip-text text-transparent">
                  a coffee
                </span>
              </motion.h2>

              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
                }}
                className="mt-6 max-w-md text-pretty text-base leading-relaxed text-white/80 sm:text-lg"
              >
                No pitch decks — just a real conversation about turning your marketing, software, and content into one
                system that compounds.
              </motion.p>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 18 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
                }}
                className="mt-10"
              >
                <a
                  href="#"
                  className="group inline-flex items-center gap-3 rounded-2xl bg-[#facc15] px-8 py-4 text-base font-bold text-slate-950 shadow-[0_12px_40px_rgba(250,204,21,0.28)] transition duration-300 hover:bg-[#fde047] hover:shadow-[0_16px_48px_rgba(250,204,21,0.38)] sm:px-10 sm:py-5 sm:text-lg"
                >
                  Book a Coffee Chat
                  <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
