"use client"

import { useEffect, useRef } from "react"

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  alpha: number
}

const MAX_PARTICLES = 48
const CONNECT_DIST = 120
const MOUSE_RADIUS = 140
const REPEL = 0.045

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const mouse = { x: -9999, y: -9999, active: false }
    let particles: Particle[] = []
    let width = 0
    let height = 0
    let dpr = 1
    let raf = 0
    let running = true

    const particleCount = () => {
      const area = width * height
      const base = Math.round(area / 28000)
      return Math.min(MAX_PARTICLES, Math.max(24, base))
    }

    const spawn = (count: number) => {
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: 1 + Math.random() * 1.6,
        alpha: 0.25 + Math.random() * 0.45,
      }))
    }

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const next = particleCount()
      if (particles.length !== next) spawn(next)
    }

    const onPointerMove = (event: PointerEvent) => {
      mouse.x = event.clientX
      mouse.y = event.clientY
      mouse.active = true
    }

    const onPointerLeave = () => {
      mouse.active = false
      mouse.x = -9999
      mouse.y = -9999
    }

    const onVisibility = () => {
      running = document.visibilityState === "visible"
      if (running && !reducedMotion) raf = requestAnimationFrame(tick)
    }

    const tick = () => {
      if (!running) return
      raf = requestAnimationFrame(tick)

      ctx.clearRect(0, 0, width, height)

      if (reducedMotion) {
        // Static soft field — no animation cost
        for (const p of particles) {
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(148, 163, 184, ${p.alpha * 0.55})`
          ctx.fill()
        }
        running = false
        return
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        if (mouse.active) {
          const dx = p.x - mouse.x
          const dy = p.y - mouse.y
          const dist = Math.hypot(dx, dy) || 1
          if (dist < MOUSE_RADIUS) {
            const force = ((MOUSE_RADIUS - dist) / MOUSE_RADIUS) * REPEL
            p.vx += (dx / dist) * force
            p.vy += (dy / dist) * force
          }
        }

        p.vx *= 0.992
        p.vy *= 0.992
        p.x += p.vx
        p.y += p.vy

        // Soft wrap
        if (p.x < -20) p.x = width + 20
        if (p.x > width + 20) p.x = -20
        if (p.y < -20) p.y = height + 20
        if (p.y > height + 20) p.y = -20

        // Soft cyan/slate particle
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r * 2.2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(34, 211, 238, ${p.alpha * 0.12})`
        ctx.fill()

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(203, 213, 225, ${p.alpha * 0.75})`
        ctx.fill()
      }

      // Connecting lines — O(n²) but n is capped low
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.hypot(dx, dy)
          if (dist > CONNECT_DIST) continue

          const t = 1 - dist / CONNECT_DIST
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.strokeStyle = `rgba(34, 211, 238, ${t * 0.18})`
          ctx.lineWidth = 1
          ctx.stroke()
        }
      }
    }

    resize()
    window.addEventListener("resize", resize, { passive: true })
    window.addEventListener("pointermove", onPointerMove, { passive: true })
    window.addEventListener("pointerleave", onPointerLeave)
    document.addEventListener("visibilitychange", onVisibility)

    raf = requestAnimationFrame(tick)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("pointerleave", onPointerLeave)
      document.removeEventListener("visibilitychange", onVisibility)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
    />
  )
}
