"use client"

import { useEffect, useState, type CSSProperties } from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

interface FloatingConfettiProps {
  count?: number
  colors?: string[]
  className?: string
}

type ParticleShape = "circle" | "square" | "pill"

interface Particle {
  id: number
  left: string
  top: string
  scale: number
  rotation: number
  opacity: number
  color: string
  shape: ParticleShape
  duration: number
  delay: number
  size: number
}

const DEFAULT_COLORS = ["#1D4ED8", "#6D28D9", "#38BDF8", "#F59E0B", "#EC4899"]
const SHAPES: ParticleShape[] = ["circle", "square", "pill"]

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min)
}

function createParticles(count: number, colors: string[]): Particle[] {
  return Array.from({ length: count }, (_, id) => {
    const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)]
    return {
      id,
      left: `${randomBetween(2, 98)}%`,
      top: `${randomBetween(2, 98)}%`,
      scale: randomBetween(0.5, 1.3),
      rotation: randomBetween(0, 360),
      opacity: randomBetween(0.3, 0.8),
      color: colors[Math.floor(Math.random() * colors.length)],
      shape,
      duration: randomBetween(4, 8),
      delay: randomBetween(0, 3),
      size: randomBetween(6, 12),
    }
  })
}

function shapeClass(shape: ParticleShape) {
  switch (shape) {
    case "circle":
      return "rounded-full"
    case "square":
      return "rounded-[1px]"
    case "pill":
      return "rounded-full"
  }
}

function shapeSize(shape: ParticleShape, size: number): CSSProperties {
  if (shape === "pill") {
    return { width: size * 2.4, height: size * 0.55 }
  }
  return { width: size, height: size }
}

export function FloatingConfetti({
  count = 30,
  colors = DEFAULT_COLORS,
  className,
}: FloatingConfettiProps) {
  // Empty on SSR + first client paint so hydration markup matches, then spawn particles.
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    setParticles(createParticles(count, colors))
  }, [count, colors])

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 z-0 overflow-hidden",
        className,
      )}
    >
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className={cn("absolute block will-change-transform", shapeClass(particle.shape))}
          style={{
            left: particle.left,
            top: particle.top,
            backgroundColor: particle.color,
            opacity: particle.opacity,
            scale: particle.scale,
            rotate: particle.rotation,
            ...shapeSize(particle.shape, particle.size),
          }}
          animate={{
            y: [-20, 20],
            x: [-15, 15],
            rotate: [particle.rotation, particle.rotation + 180, particle.rotation + 360],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}
