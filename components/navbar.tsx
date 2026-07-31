"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

const NAV_LINKS = ["About us", "Services", "Case Studies", "Blog", "How it Works", "Hire"]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border/60 bg-background/70 backdrop-blur-xl shadow-sm"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a
          href="#"
          className={cn(
            "relative block shrink-0 overflow-hidden rounded-full transition-all duration-300",
            scrolled ? "h-10 w-10 sm:h-11 sm:w-11" : "h-14 w-14 sm:h-16 sm:w-16",
          )}
        >
          <Image
            src={scrolled ? "/ev-logo.png" : "/ev-logo-white.png"}
            alt="EV"
            fill
            sizes="(min-width: 640px) 64px, 56px"
            priority
            className="object-cover"
          />
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link}>
              <a
                href="#"
                className={cn(
                  "text-sm font-medium transition-colors",
                  scrolled
                    ? "text-muted-foreground hover:text-foreground"
                    : "text-white/90 hover:text-white",
                )}
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="rounded-full bg-[#facc15] px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-sm transition-transform hover:scale-105 hover:bg-[#fde047]"
        >
          Contact Us
        </a>
      </nav>
    </header>
  )
}
