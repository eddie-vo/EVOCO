"use client"

import { useEffect, useId, useState } from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "motion/react"
import { X } from "lucide-react"

const EXPLORE_LINKS = [
  { label: "Home", href: "/" },
  { label: "About us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Blog", href: "/blog" },
  { label: "How it Works", href: "/how-it-works" },
  { label: "Hire", href: "/hire" },
] as const

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
] as const

const SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="size-4">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="size-4">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: "X",
    href: "https://x.com/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="size-4">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.227-8.26L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="size-4">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186 31.247 31.247 0 000 12.017a31.247 31.247 0 00.502 5.831 3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136A31.247 31.247 0 0024 12.017a31.247 31.247 0 00-.502-5.831zM9.545 15.568V8.466l6.273 3.551-6.273 3.551z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="size-4">
        <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
      </svg>
    ),
  },
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
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:gap-8 lg:px-8 lg:py-16">
          {/* Brand */}
          <div className="flex flex-col items-start gap-4 sm:col-span-2 lg:col-span-1">
            <a href="/" className="inline-flex items-center gap-3">
              <span className="relative size-10 shrink-0 overflow-hidden rounded-full">
                <Image
                  src="/ev-logo.png"
                  alt=""
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </span>
              <span className="flex flex-col leading-tight">
                <span className="text-sm font-bold tracking-wide text-foreground">
                  Eddie Vo Company
                </span>
                <span className="text-[10px] font-medium tracking-[0.16em] text-primary uppercase">
                  Growth, built as one
                </span>
              </span>
            </a>
            <address className="not-italic text-sm leading-relaxed text-muted-foreground">
              418 Massachusetts Ave, Suite 210
              <br />
              Cambridge, MA 02139
            </address>
            <ul className="flex items-center gap-2" aria-label="Social media">
              {SOCIAL_LINKS.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="inline-flex size-9 items-center justify-center rounded-full text-slate-500 ring-1 ring-slate-200 transition hover:bg-slate-50 hover:text-foreground hover:ring-slate-300"
                  >
                    {social.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore */}
          <div>
            <p className="text-[11px] font-semibold tracking-[0.2em] text-slate-400 uppercase">
              Explore
            </p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {EXPLORE_LINKS.map((link) => (
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
          </div>

          {/* Legal */}
          <div>
            <p className="text-[11px] font-semibold tracking-[0.2em] text-slate-400 uppercase">
              Legal
            </p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {LEGAL_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/contact"
                  className="text-sm font-medium text-primary transition-colors hover:text-brand-blue"
                >
                  Get in touch
                </a>
              </li>
            </ul>
          </div>

          {/* Recognition */}
          <div>
            <p className="text-[11px] font-semibold tracking-[0.2em] text-slate-400 uppercase">
              Recognition
            </p>
            <ul
              aria-label="Awards and recognition"
              className="mt-4 grid grid-cols-2 gap-2.5"
            >
              {AWARDS.map((award) => (
                <li key={award.src}>
                  <button
                    type="button"
                    onClick={() => setActive(award)}
                    aria-label={`View larger: ${award.alt}`}
                    className="group relative flex size-[4.5rem] cursor-zoom-in items-center justify-center overflow-hidden rounded-xl bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_6px_16px_rgba(15,23,42,0.05)] ring-1 ring-slate-900/[0.06] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_6px_18px_rgba(15,23,42,0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 sm:size-20"
                  >
                    <Image
                      src={award.src}
                      alt={award.alt}
                      width={96}
                      height={96}
                      className="size-[78%] object-contain transition duration-300 group-hover:scale-[1.05]"
                    />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-100">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 sm:px-6 md:flex-row lg:px-8">
            <p className="text-xs tracking-wide text-slate-400">
              © {new Date().getFullYear()} Eddie Vo Company. All rights reserved.
            </p>
            <p className="text-xs text-slate-400">Cambridge · Boston · Remote</p>
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
