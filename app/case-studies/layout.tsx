import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Case Studies',
  description:
    'Selected work by Eddie Vo Company: results from digital marketing, software, and AI-driven growth projects.',
  alternates: { canonical: '/case-studies' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
