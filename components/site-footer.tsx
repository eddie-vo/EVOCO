"use client"

import { useEffect, useId, useState } from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "motion/react"
import { X } from "lucide-react"

const LINKS = [
  { label: "About us", href: "#" },
  { label: "Services", href: "#services" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "Blog", href: "#" },
  { label: "How it Works", href: "#" },
  { label: "Hire", href: "#contact" },
] as const

const AWARDS = [
  {
    src: "/awards/davey-gold.png",
    alt: "16th Annual Davey Awards — Gold Winner",
  },
  {
    src: "/awards/netty-winner.png",
    alt: "Official Netty Awards Winner 2024",
  },
  {
    src: "/awards/expertise.png",
    alt: "Expertise.com Best Digital Marketing Agencies in Cambridge 2023",
  },
  {
    src: "/awards/brightlocal.png",
    alt: "BrightLocal Partner",
  },
] as const

type Award = (typeof AWARDS)[number]

export function SiteFooter() {
  const [active, setActive] = useState<Award | null>(null)
  const titleId = useId()

  useEffect(() => {
    if (!active) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null)
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [active])

  return (
    <>
      <footer className="border-t border-border bg-background">
        {/* Recognition — primary visual of the footer */}
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 pt-14 pb-10 sm:px-6 lg:px-8">
          <p className="text-[11px] font-semibold tracking-[0.22em] text-slate-400 uppercase">
            Recognition
          </p>

          <ul
            aria-label="Awards and recognition"
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-5"
          >
            {AWARDS.map((award) => (
              <li key={award.src}>
                <button
                  type="button"
                  onClick={() => setActive(award)}
                  aria-label={`View larger: ${award.alt}`}
                  className="group relative flex size-[4.25rem] cursor-zoom-in items-center justify-center overflow-hidden rounded-2xl bg-white shadow-[0_1px_2px_rgba(15,23,42,0.05),0_10px_24px_rgba(15,23,42,0.06)] ring-1 ring-slate-900/[0.06] transition duration-300 hover:-translate-y-1 hover:shadow-[0_6px_18px_rgba(15,23,42,0.1),0_18px_36px_rgba(15,23,42,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 sm:size-[4.75rem]"
                >
                  <Image
                    src={award.src}
                    alt={award.alt}
                    width={160}
                    height={160}
                    className="size-[86%] object-contain transition duration-300 group-hover:scale-[1.05]"
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Utility — quieter nav + legal */}
        <div className="border-t border-slate-100">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:px-6 md:flex-row lg:px-8">
            <nav aria-label="Footer">
              <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 md:justify-start">
                {LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <p className="text-xs tracking-wide text-slate-400 sm:text-sm">
              © {new Date().getFullYear()} EddieVo. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {active ? (
          <motion.div
            key="award-lightbox"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm sm:p-8"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ type: "spring", stiffness: 380, damping: 28 }}
              className="relative flex max-h-[min(88vh,720px)] w-full max-w-lg flex-col items-center gap-4"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label="Close award preview"
                className="absolute -top-2 -right-2 z-10 flex size-10 items-center justify-center rounded-full bg-white text-slate-700 shadow-lg ring-1 ring-black/5 transition hover:bg-slate-50 sm:-top-3 sm:-right-3"
              >
                <X className="size-5" />
              </button>

              <div className="flex w-full items-center justify-center overflow-hidden rounded-3xl bg-white p-6 shadow-2xl ring-1 ring-white/20 sm:p-10">
                <Image
                  src={active.src}
                  alt={active.alt}
                  width={640}
                  height={640}
                  className="max-h-[min(70vh,560px)] w-auto max-w-full object-contain"
                  priority
                />
              </div>

              <p id={titleId} className="max-w-md text-center text-sm font-medium text-white/90 sm:text-base">
                {active.alt}
              </p>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
