import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '90-second mobility fit check | El^sticity',
  description: 'Answer five quick questions about mobility goals, schedule, experience, setup, and movement readiness before choosing El^sticity support.',
}

export default function FitLayout({ children }: { children: React.ReactNode }) { return children }
