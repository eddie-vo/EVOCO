import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Eddie Vo Company",
  description:
    "Meet Eddie Vo Company: a team of strategists, builders, and growth leads connecting marketing, product, AI, and content for founders.",
}

export default function AboutLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>
}
