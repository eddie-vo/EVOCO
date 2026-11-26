import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Eddie Vo Company",
  description:
    "Talk with Eddie Vo Company about your business goals, product, marketing, or AI project. Book a coffee chat or send us a note.",
}

export default function ContactLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>
}
