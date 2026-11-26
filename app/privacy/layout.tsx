import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read Eddie Vo Company's privacy policy to learn what information we collect, how we use it, and how to contact us with questions.",
}

export default function PrivacyLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>
}
