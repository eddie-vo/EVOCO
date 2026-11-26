import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "AI, Web & Software Services",
  description:
    "Explore AI agents, web development, software architecture, SEO, and interactive digital experiences from Eddie Vo Company.",
}

export default function ServicesLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>
}
