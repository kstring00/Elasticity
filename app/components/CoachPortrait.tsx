'use client'

import Image from 'next/image'
import { useState } from 'react'

/*
 * TODO (required before launch): add a real photograph of Abrielle at /public/coach.jpg.
 * That file does not exist in the repo yet, so today this component always falls back to
 * the monogram. The monogram is a fallback only — it is not the launch state.
 */
export default function CoachPortrait() {
  const [failed, setFailed] = useState(false)

  if (failed) return <div className="about-mark" aria-hidden="true">A</div>

  return (
    <Image
      className="about-portrait"
      src="/coach.jpg"
      alt="Abrielle"
      width={320}
      height={380}
      /* /coach.jpg is not in the repo yet. Without `unoptimized` the image
         optimizer throws a 500 on every request for the missing file; this
         way it is a plain 404 and the onError fallback below takes over. */
      unoptimized
      onError={() => setFailed(true)}
    />
  )
}
