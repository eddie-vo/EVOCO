"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

const TESTIMONIALS = [
  {
    initials: "NB",
    name: "Nataly Bagdasarian",
    role: "Google Review",
    isNew: true,
    rating: 5,
    pullQuote:
      "Eddie was very professional, attentive, and always willing to answer all my questions — and I saw results in a short time.",
    full: "Excellent experience. Eddie was very professional, attentive, and always willing to answer all my questions. They helped me improve my online presence with clear and effective strategies, and I saw results in a short time. Communication was excellent throughout the entire process, and they genuinely cared about understanding my business needs. I would definitely recommend them to anyone looking for a reliable and committed digital marketing company.",
  },
  {
    initials: "CA",
    name: "Charles Awodu",
    role: "Google Review",
    rating: 5,
    pullQuote:
      "We've been with Eddie Vo Co. for more than 5 years and refer them often. Eddie, the CEO, is kind and dependable.",
    full: "We have been with Eddie Vo Co. for more than 5 years and we have referred many others that enjoy their excellent service delivery. Eddie, the CEO as a person is kind and dependable.",
  },
  {
    initials: "MC",
    name: "Mariama Camara",
    role: "Google Review",
    rating: 5,
    pullQuote:
      "The website he designed for me is not only functional, but it is artistic. I will only work with him on any project.",
    full: "I can never thank Eddie enough for his dedication, creativity, and, most importantly, his patience with me on this project. The website he designed for me is not only functional, but it is artistic. When I met Eddie, all I had was a business idea, but he helped me in so many ways that I wonder what I would have done without him. His suggestions, his advice, I could go on and on. Eddie was not only about the work, but I could also see he was passionate about what he was doing even though the type of project I had was new to him. He listened and understood my vision and goal for my brand and started working. I will only work with him on any project, and I recommend you do the same; he is a fantastic person. Oh, and he was my very first customer to show me some support! Thanks for everything, Eddie; you, indeed, are a blessing.",
  },
  {
    initials: "KR",
    name: "Krisha Rios",
    role: "Google Review",
    rating: 5,
    pullQuote:
      "Eddie Vo Company stands as a beacon of excellence in SEO — their tailored strategies got us to the top in record time.",
    full: "Eddie Vo Company stands as a beacon of excellence in the realm of Search Engine Optimization (SEO), and my experience with them has been nothing short of exceptional. Their tailored strategies, honed by a team of seasoned professionals, propelled our website to the zenith of search engine rankings in record time. What sets Eddie Vo Company apart is their commitment to transparency and communication. Throughout our collaboration, they kept us informed at every step, fostering trust and confidence in their abilities. The results were tangible, with a significant increase in our website's visibility and organic traffic, thanks to their strategic implementation of keywords and optimization techniques.",
  },
  {
    initials: "LB",
    name: "Lorna Brown",
    role: "Google Review",
    rating: 5,
    pullQuote:
      "I like everything about VE Digital! Eddie went above and beyond to capture excellent 360 footage — great quality and service.",
    full: "I like everything about VE Digital! Eddie is fantastic to work with. He was willing to go above and beyond to capture some excellent 360 footage during the pandemic. Great quality, reasonable pricing, and great service. He even produced some additional files for us at no extra cost. I would highly recommend him for your digital needs.",
  },
  {
    initials: "SA",
    name: "Steven Adelson",
    role: "Google Review",
    rating: 5,
    pullQuote:
      "Eddie is an outstanding resource for website development — extremely capable, creative, and easy to work with.",
    full: "Eddie is an outstanding resource for website development. I found him to be extremely capable, creative and easy to work with. He was very responsive to my needs. I highly recommend him.",
  },
] as const

export function Testimonials() {
  const [active, setActive] = useState(0)
  const [expanded, setExpanded] = useState(false)
  const person = TESTIMONIALS[active]

  const select = (index: number) => {
    setActive(index)
    setExpanded(false)
  }

  return (
    <section className="relative overflow-hidden bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <span className="mx-auto block h-1 w-12 rounded-full bg-accent" />
        <h2 className="mt-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Why customers love working with us
        </h2>

        <motion.blockquote
          key={`${active}-${expanded ? "full" : "pull"}`}
          layout
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className={cn(
            "mx-auto mt-10 max-w-2xl text-balance text-xl font-medium leading-relaxed text-foreground sm:text-2xl",
            !expanded && "line-clamp-3",
          )}
        >
          &ldquo;{expanded ? person.full : person.pullQuote}&rdquo;
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

          <div className="relative z-10 flex items-end justify-center gap-3 overflow-x-auto px-1 pb-1 sm:gap-6 md:gap-8">
            {TESTIMONIALS.map((p, i) => {
              const isActive = i === active
              return (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => select(i)}
                  aria-label={`Show testimonial from ${p.name}`}
                  aria-pressed={isActive}
                  className="flex shrink-0 flex-col items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
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
            <div className="flex items-center justify-center gap-1" aria-label={`${person.rating} out of 5 stars`}>
              {Array.from({ length: person.rating }).map((_, i) => (
                <Star key={i} className="size-5 fill-[#facc15] text-[#facc15]" />
              ))}
            </div>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
              <p className="font-semibold text-foreground">{person.name}</p>
              {"isNew" in person && person.isNew && (
                <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent-foreground">
                  New
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{person.role}</p>

            <button
              type="button"
              onClick={() => setExpanded((value) => !value)}
              className="mt-4 text-sm font-semibold text-primary outline-none transition-colors hover:text-brand-blue focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              aria-expanded={expanded}
            >
              {expanded ? "Show less" : "Read full review"}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
