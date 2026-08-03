"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { cn } from "@/lib/utils"

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Blog", href: "/blog" },
  { label: "How it Works", href: "/how-it-works" },
  { label: "Hire", href: "/hire" },
] as const

type NavbarProps = {
  /** Use on light page backgrounds so links/logo stay visible at the top */
  tone?: "dark" | "light"
}

export function Navbar({ tone = "dark" }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const onLight = tone === "light" || scrolled || open

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener("keydown", onKey)
    }
  }, [open])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        onLight
          ? "border-b border-border/60 bg-background/90 backdrop-blur-xl shadow-sm"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <a
          href="/"
          className={cn(
            "relative block shrink-0 overflow-hidden rounded-full transition-all duration-300",
            scrolled || tone === "light" || open
              ? "h-10 w-10 sm:h-11 sm:w-11"
              : "h-12 w-12 sm:h-16 sm:w-16",
          )}
        >
          <Image
            src={onLight ? "/ev-logo.png" : "/ev-logo-white.png"}
            alt="EV"
            fill
            sizes="(min-width: 640px) 64px, 48px"
            priority
            className="object-cover"
          />
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors",
                  onLight
                    ? "text-slate-900 hover:text-primary"
                    : "text-white/90 hover:text-white",
                )}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="/contact"
            className="rounded-full bg-[#facc15] px-3.5 py-2 text-xs font-semibold text-slate-900 shadow-sm transition-transform hover:scale-105 hover:bg-[#fde047] sm:px-5 sm:py-2.5 sm:text-sm"
          >
            Contact Us
          </a>

          <button
            type="button"
            className={cn(
              "inline-flex size-10 items-center justify-center rounded-full border md:hidden",
              onLight
                ? "border-border bg-background text-slate-900"
                : "border-white/25 bg-white/10 text-white",
            )}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-border bg-background md:hidden"
          >
            <ul className="mx-auto flex max-w-7xl flex-col px-4 py-4 sm:px-6">
              {NAV_LINKS.map((link, index) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * index, duration: 0.25 }}
                >
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-border/70 py-3.5 text-base font-semibold text-slate-900 transition hover:text-primary"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <li className="pt-4">
                <a
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="flex w-full items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
