import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hire Eddie Vo',
  description:
    'Hire Eddie Vo and his team for a project sprint, a growth retainer, or an embedded squad.',
  alternates: { canonical: '/hire' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
