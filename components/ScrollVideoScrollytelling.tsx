"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "motion/react"

const SCROLLY_VIDEO_SRC = "/videos/scrolly-video.mp4"

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
    tagClass: "text-sky-400",
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

function clamp(n: number, min: number, max: number) {
  return Math.min(Math.max(n, min), max)
}

export function ScrollVideoScrollytelling() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const targetTime = useRef(0)
  const [ready, setReady] = useState(false)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  })

  // Card 1 — left
  const card1X = useTransform(scrollYProgress, [0.06, 0.1, 0.26, 0.32], [-120, 0, 0, -120])
  const card1Opacity = useTransform(scrollYProgress, [0.06, 0.1, 0.26, 0.32], [0, 1, 1, 0])

  // Card 2 — right
  const card2X = useTransform(scrollYProgress, [0.32, 0.38, 0.58, 0.66], [120, 0, 0, 120])
  const card2Opacity = useTransform(scrollYProgress, [0.32, 0.38, 0.58, 0.66], [0, 1, 1, 0])

  // Card 3 — left (stays through end)
  const card3X = useTransform(scrollYProgress, [0.66, 0.72, 0.95, 1], [-120, 0, 0, 0])
  const card3Opacity = useTransform(scrollYProgress, [0.66, 0.72, 0.95, 1], [0, 1, 1, 1])

  const cardMotion = [
    { x: card1X, opacity: card1Opacity },
    { x: card2X, opacity: card2Opacity },
    { x: card3X, opacity: card3Opacity },
  ]

  // Keep muted / inline; never autoplay — we scrub manually
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.pause()
    video.playsInline = true
    video.muted = true
    video.preload = "auto"
  }, [])

  // Mark ready once we have a real duration and enough data to seek
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const markReady = () => {
      const d = video.duration
      if (!Number.isFinite(d) || d <= 0) return
      if (video.readyState < 2) return
      setReady(true)
    }

    markReady()
    video.addEventListener("loadedmetadata", markReady)
    video.addEventListener("loadeddata", markReady)
    video.addEventListener("canplay", markReady)
    video.addEventListener("canplaythrough", markReady)

    return () => {
      video.removeEventListener("loadedmetadata", markReady)
      video.removeEventListener("loadeddata", markReady)
      video.removeEventListener("canplay", markReady)
      video.removeEventListener("canplaythrough", markReady)
    }
  }, [])

  // rAF scrubber: always chase the latest scroll target, never stack seeks
  useEffect(() => {
    if (!ready) return
    const video = videoRef.current
    if (!video) return

    const duration = video.duration
    if (!Number.isFinite(duration) || duration <= 0) return

    const maxTime = Math.max(duration - 0.05, 0)
    targetTime.current = clamp(scrollYProgress.get() * duration, 0, maxTime)

    const unsub = scrollYProgress.on("change", (progress) => {
      targetTime.current = clamp(progress * duration, 0, maxTime)
    })

    let raf = 0
    const tick = () => {
      raf = requestAnimationFrame(tick)

      // Don't issue a new seek while one is in flight
      if (video.seeking || video.readyState < 2) return

      const next = targetTime.current
      if (Math.abs(video.currentTime - next) < 0.05) return

      try {
        video.currentTime = next
      } catch {
        /* ignore InvalidStateError while metadata settles */
      }
    }

    // Seed immediately so we aren't stuck on frame 0 until the next scroll tick
    try {
      video.pause()
      video.currentTime = targetTime.current
    } catch {
      /* ignore */
    }

    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      unsub()
    }
  }, [ready, scrollYProgress])

  return (
    <section
      ref={sectionRef}
      className="relative h-[600vh] bg-slate-950 text-white"
      aria-label="Scroll-driven product journey"
    >
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        <video
          ref={videoRef}
          src={SCROLLY_VIDEO_SRC}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />

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
