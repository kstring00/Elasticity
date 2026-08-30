import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Your Elasticity Training Fit | Plans & Pricing',
  description: 'See the training structure suggested by your fit-check answers and compare Elasticity launch pricing before checkout.',
}

export default function PlanLayout({ children }: { children: React.ReactNode }) { return children }
