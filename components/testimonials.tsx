"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

const PEOPLE = [
  { name: "Ravindu De Silva", role: "Product Lead", initials: "RS", quote: "The team felt like an extension of our own — thoughtful, fast, and genuinely invested in the outcome." },
  { name: "Kasun Perera", role: "Founder", initials: "KP", quote: "They shipped a polished product ahead of schedule and communicated clearly the entire way." },
  { name: "Iman Khan", role: "Software Engineer", initials: "IK", quote: "Without a doubt I recommend EddieVo as one of the best web design and digital agencies out there. One of the best I've ever had the pleasure of working with." },
  { name: "Amara De Silva", role: "Designer", initials: "AS", quote: "Beautiful design work backed by rock-solid engineering. Our conversion rates jumped after launch." },
  { name: "Nuwan Fernando", role: "CTO", initials: "NF", quote: "Reliable, transparent, and technically excellent. We'll be working with them for years to come." },
]

export function Testimonials() {
  const [active, setActive] = useState(2)
  const person = PEOPLE[active]

  return (
    <section className="relative overflow-hidden bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <span className="mx-auto block h-1 w-12 rounded-full bg-accent" />
        <h2 className="mt-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Why customers love working with us
        </h2>

        <motion.blockquote
          key={active}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mx-auto mt-10 max-w-2xl text-balance text-xl font-medium leading-relaxed text-foreground sm:text-2xl"
        >
          &ldquo;{person.quote}&rdquo;
        </motion.blockquote>

        <div className="relative mx-auto mt-12 max-w-2xl">
          {/* dotted curved connector */}
          <svg
            aria-hidden
            viewBox="0 0 600 90"
            className="absolute inset-x-0 top-8 -z-0 h-24 w-full"
            preserveAspectRatio="none"
          >
            <path
              d="M 20 20 Q 300 130 580 20"
              fill="none"
              stroke="var(--border)"
              strokeWidth="2"
              strokeDasharray="4 8"
              strokeLinecap="round"
            />
          </svg>

          <div className="relative z-10 flex items-end justify-center gap-4 sm:gap-8">
            {PEOPLE.map((p, i) => {
              const isActive = i === active
              return (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Show testimonial from ${p.name}`}
                  className="flex flex-col items-center gap-3 focus:outline-none"
                >
                  <span
                    className={cn(
                      "flex items-center justify-center rounded-full font-semibold transition-all duration-300",
                      isActive
                        ? "size-20 bg-accent text-accent-foreground shadow-xl ring-4 ring-accent/20"
                        : "size-12 bg-secondary text-secondary-foreground opacity-70 hover:opacity-100",
                    )}
                  >
                    {p.initials}
                  </span>
                </button>
              )
            })}
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-5 fill-[#facc15] text-[#facc15]" />
              ))}
            </div>
            <p className="mt-3 font-semibold text-foreground">{person.name}</p>
            <p className="text-sm text-muted-foreground">{person.role}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
