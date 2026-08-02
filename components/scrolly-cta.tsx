"use client"

import { useMemo, useRef } from "react"
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react"
import { CoffeeCta } from "@/components/coffee-cta"

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

      <CoffeeCta />
    </>
  )
}
