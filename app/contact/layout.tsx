import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Eddie Vo',
  description:
    'Get in touch with Eddie Vo for digital marketing, software development, and AI automation projects.',
  alternates: { canonical: '/contact' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
