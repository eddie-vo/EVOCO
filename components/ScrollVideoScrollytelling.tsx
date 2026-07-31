"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useSpring, useTransform } from "motion/react"

const PHASES = [
  {
    tag: "01 // PHASE ONE",
    tagClass: "text-sky-400",
    title: "Discover the vision",
    body: "We map goals, users, and constraints so every line of code serves a clear product outcome.",
    side: "left" as const,
  },
  {
    tag: "02 // PHASE TWO",
    tagClass: "text-violet-400",
    title: "Design & build",
    body: "Cross-functional squads ship polished interfaces and reliable systems in tight, visible iterations.",
    side: "right" as const,
  },
  {
    tag: "03 // PHASE THREE",
    tagClass: "text-amber-400",
    title: "Launch & scale",
    body: "We harden, measure, and iterate after launch — so the product keeps getting stronger in market.",
    side: "left" as const,
  },
] as const

export function ScrollVideoScrollytelling() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [duration, setDuration] = useState(0)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 28,
    mass: 0.35,
    restDelta: 0.001,
  })

  // Card 1 — left, ~10%–30%
  const card1X = useTransform(smoothProgress, [0.06, 0.1, 0.26, 0.32], [-120, 0, 0, -120])
  const card1Opacity = useTransform(smoothProgress, [0.06, 0.1, 0.26, 0.32], [0, 1, 1, 0])

  // Card 2 — right, ~35%–65%
  const card2X = useTransform(smoothProgress, [0.32, 0.38, 0.58, 0.66], [120, 0, 0, 120])
  const card2Opacity = useTransform(smoothProgress, [0.32, 0.38, 0.58, 0.66], [0, 1, 1, 0])

  // Card 3 — left, ~70%–95% (stays through end)
  const card3X = useTransform(smoothProgress, [0.66, 0.72, 0.95, 1], [-120, 0, 0, 0])
  const card3Opacity = useTransform(smoothProgress, [0.66, 0.72, 0.95, 1], [0, 1, 1, 1])

  const cardMotion = [
    { x: card1X, opacity: card1Opacity },
    { x: card2X, opacity: card2Opacity },
    { x: card3X, opacity: card3Opacity },
  ]

  useEffect(() => {
    if (!duration) return

    let frame = 0
    let targetTime = 0
    let currentTime = 0
    let running = true

    const unsub = smoothProgress.on("change", (progress) => {
      targetTime = Math.min(Math.max(progress * duration, 0), duration)
    })

    const tick = () => {
      if (!running) return
      const video = videoRef.current
      if (video) {
        currentTime += (targetTime - currentTime) * 0.18
        if (Math.abs(targetTime - currentTime) < 0.001) currentTime = targetTime
        if (Math.abs(video.currentTime - currentTime) >= 1 / 60) {
          video.currentTime = currentTime
        }
      }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)

    return () => {
      running = false
      cancelAnimationFrame(frame)
      unsub()
    }
  }, [smoothProgress, duration])

  return (
    <section
      ref={sectionRef}
      className="relative h-[600vh] bg-slate-950 text-white"
      aria-label="Scroll-driven product journey"
    >
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover opacity-50"
          onLoadedMetadata={(event) => {
            const media = event.currentTarget
            if (Number.isFinite(media.duration) && media.duration > 0) {
              setDuration(media.duration)
            }
          }}
        >
          <source src="/scrolly-video.mp4" type="video/mp4" />
        </video>

        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950"
        />

        <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          {PHASES.map((phase, index) => (
            <motion.article
              key={phase.tag}
              style={{
                x: cardMotion[index].x,
                opacity: cardMotion[index].opacity,
              }}
              className={
                phase.side === "left"
                  ? "absolute left-4 max-w-md sm:left-6 lg:left-8"
                  : "absolute right-4 max-w-md sm:right-6 lg:right-8"
              }
            >
              <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-6 shadow-2xl backdrop-blur-md">
                <p className={`text-xs font-semibold tracking-[0.2em] ${phase.tagClass}`}>
                  {phase.tag}
                </p>
                <h3 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  {phase.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">
                  {phase.body}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
