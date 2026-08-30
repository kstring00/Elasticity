import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '90-Second Training Fit Check | Elasticity',
  description: 'Answer five quick questions about where you train, your schedule, experience, goals, and movement readiness before choosing an Elasticity program.',
}

export default function FitLayout({ children }: { children: React.ReactNode }) { return children }
