import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Work With Eddie Vo Company",
  description:
    "Need help building a growth engine? Explore project sprints, growth retainers, and product partnerships with Eddie Vo Company.",
}

export default function HireLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>
}
