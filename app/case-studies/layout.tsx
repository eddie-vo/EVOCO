import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Explore Eddie Vo Company projects across product, marketing, and software. See the work, outcomes, and systems built for each client.",
}

export default function CaseStudiesLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>
}
