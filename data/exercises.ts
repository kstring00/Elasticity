export type ExerciseSeed = {
  slug: string
  name: string
  category: string
  primaryMuscle: string
  equipment: string
  difficulty: 'Beginner' | 'Intermediate'
  prescription?: string
  note?: string
}

export const exerciseSeeds: ExerciseSeed[] = [
  { slug: 'barbell-bench-press', name: 'Barbell Bench Press', category: 'Strength', primaryMuscle: 'Chest', equipment: 'Barbell + Bench', difficulty: 'Intermediate', prescription: '3 × 6–8', note: 'Use controlled reps and stop with good repetitions still available.' },
  { slug: 'incline-dumbbell-press', name: 'Incline Dumbbell Press', category: 'Strength', primaryMuscle: 'Chest', equipment: 'Dumbbells + Bench', difficulty: 'Intermediate', prescription: '3 × 8–10' },
  { slug: 'high-slow-cable-fly', name: 'High Slow Cable Fly', category: 'Accessory', primaryMuscle: 'Chest', equipment: 'Cable', difficulty: 'Intermediate', prescription: '3 × 10–12', note: 'Emphasize a slow 2–3 second return.' },
  { slug: 'lat-pulldown', name: 'Lat Pulldown', category: 'Strength', primaryMuscle: 'Back', equipment: 'Cable Machine', difficulty: 'Beginner', prescription: '3 × 8–10' },
  { slug: 't-bar-row', name: 'T-Bar Row', category: 'Strength', primaryMuscle: 'Back', equipment: 'T-Bar / Landmine', difficulty: 'Intermediate', prescription: '3 × 8–10' },
  { slug: 'half-kneeling-face-pull', name: 'Half-Kneeling Face Pull', category: 'Stability', primaryMuscle: 'Upper Back', equipment: 'Cable', difficulty: 'Intermediate', prescription: '2–3 × 12–15' },
  { slug: 'romanian-deadlift', name: 'Romanian Deadlift', category: 'Strength', primaryMuscle: 'Posterior Chain', equipment: 'Barbell or Dumbbells', difficulty: 'Intermediate', prescription: '3 × 8–10' },
  { slug: 'heel-elevated-goblet-squat', name: 'Heel-Elevated Goblet Squat', category: 'Strength', primaryMuscle: 'Quads', equipment: 'Dumbbell', difficulty: 'Intermediate', prescription: '3 × 8–10' },
  { slug: 'quad-focused-leg-press', name: 'Quad-Focused Leg Press', category: 'Strength', primaryMuscle: 'Quads', equipment: 'Leg Press', difficulty: 'Beginner', prescription: '3 × 10–12', note: 'Use controlled depth without allowing the hips to roll off the pad.' },
  { slug: 'dumbbell-shoulder-press', name: 'Dumbbell Shoulder Press', category: 'Strength', primaryMuscle: 'Shoulders', equipment: 'Dumbbells', difficulty: 'Intermediate', prescription: '3 × 8–10' },
  { slug: 'dumbbell-lateral-raise', name: 'Dumbbell Lateral Raise', category: 'Accessory', primaryMuscle: 'Shoulders', equipment: 'Dumbbells', difficulty: 'Beginner', prescription: '3 × 10–15' },
  { slug: 'ab-roller', name: 'Ab Roller', category: 'Core', primaryMuscle: 'Core', equipment: 'Ab Wheel', difficulty: 'Intermediate', prescription: '2–3 × 6–10' },
  { slug: 'dead-bug', name: 'Dead Bug', category: 'Core', primaryMuscle: 'Core Stability', equipment: 'Bodyweight', difficulty: 'Beginner', prescription: '2 × 8 / side' },
  { slug: 'pallof-press', name: 'Pallof Press', category: 'Core', primaryMuscle: 'Anti-Rotation', equipment: 'Cable or Band', difficulty: 'Beginner', prescription: '3 × 10 / side' },
  { slug: 'farmer-carry', name: 'Farmer Carry', category: 'Athletic', primaryMuscle: 'Grip + Core', equipment: 'Dumbbells', difficulty: 'Beginner', prescription: '3 × 30–45 sec', note: 'Walk under control while maintaining an upright torso.' },
]
