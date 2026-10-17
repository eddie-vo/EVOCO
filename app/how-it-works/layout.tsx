import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How It Works',
  description:
    'How Eddie Vo works with you: grab a coffee, build the plan, build and launch, then measure and grow.',
  alternates: { canonical: '/how-it-works' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
