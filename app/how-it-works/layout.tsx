import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "See how Eddie Vo Company takes engagements from discovery and planning through launch, measurement, and ongoing growth.",
}

export default function HowItWorksLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>
}
