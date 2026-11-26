import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Review the terms governing use of Eddie Vo Company's website and the services described here.",
}

export default function TermsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>
}
