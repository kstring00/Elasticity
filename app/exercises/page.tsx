import { ArrowUpRight, PlayCircle } from 'lucide-react'
import { exerciseSeeds, type ExerciseSeed } from '@/data/exercises'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export default async function ExercisesPage() {
  let exercises: ExerciseSeed[] = exerciseSeeds
  const supabase = await createServerSupabaseClient()

  if (supabase) {
    const { data } = await supabase.from('exercises').select('slug,name,category,primary_muscle,equipment,difficulty,default_prescription,short_note').eq('active', true).order('name')
    if (data?.length) {
      exercises = data.map((item) => ({
        slug: item.slug,
        name: item.name,
        category: item.category || 'Training',
        primaryMuscle: item.primary_muscle || 'Full body',
        equipment: item.equipment || 'Varies',
        difficulty: item.difficulty === 'Beginner' ? 'Beginner' : 'Intermediate',
        prescription: item.default_prescription || undefined,
        note: item.short_note || undefined,
      }))
    }
  }

  const categories = ['All', ...Array.from(new Set(exercises.map((exercise) => exercise.category)))]

  return (
    <main className="library-page">
      <div className="library-head">
        <div>
          <div className="eyebrow">Exercise library</div>
          <h1 className="portal-title">One movement. One trusted reference.</h1>
          <p className="section-copy" style={{ maxWidth: 720 }}>The coach can reuse exercises across programs while changing the sets, reps, rest, tempo, and notes for each individual client. Photos and video links are added to the same exercise record over time.</p>
        </div>
      </div>

      <div className="library-filters" aria-label="Exercise categories">
        {categories.map((category) => <span className="filter-chip" key={category}>{category}</span>)}
      </div>

      <div className="exercise-grid" style={{ marginTop: 22 }}>
        {exercises.map((exercise) => (
          <article className="exercise-card" key={exercise.slug}>
            <div className="exercise-media"><span><PlayCircle size={15} style={{ verticalAlign: 'middle', marginRight: 6 }}/> Demo media slot</span></div>
            <div className="exercise-body">
              <div className="tag">{exercise.category} · {exercise.primaryMuscle}</div>
              <h3>{exercise.name}</h3>
              <p>{exercise.equipment} · {exercise.difficulty}{exercise.prescription ? ` · Example ${exercise.prescription}` : ''}</p>
              {exercise.note && <p>{exercise.note}</p>}
              <span className="exercise-link">View exercise <ArrowUpRight size={13}/></span>
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}
