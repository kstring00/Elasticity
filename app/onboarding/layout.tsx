import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Client Onboarding | Elasticity',
  description: 'Secure post-purchase onboarding for your Elasticity training program: goals, schedule, training history, equipment, movement needs, recovery, and coaching preferences.',
}

export default function OnboardingLayout({ children }: { children: React.ReactNode }) { return children }
