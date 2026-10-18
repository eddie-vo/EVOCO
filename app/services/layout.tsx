import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Digital marketing, AI automation, Next.js web development, 3D web experiences, and custom software from Eddie Vo Company.',
  alternates: { canonical: '/services' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
