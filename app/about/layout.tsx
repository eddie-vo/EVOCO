import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Eddie Vo',
  description:
    'Meet Eddie Vo and the operators at Eddie Vo Company who build the whole growth system: strategy, software, marketing, and automation.',
  alternates: { canonical: '/about' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
