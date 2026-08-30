'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

const SRC = '/coach.jpg'

/*
 * TODO (required before launch): add a real photograph of Abrielle at
 * /public/coach.jpg. That file is not in the repo yet, so today this always
 * falls back to the monogram. The monogram is a fallback, not the launch state.
 */
export default function CoachPortrait() {
  // next/image lazy-loads and swallows the load event, so neither onError nor a
  // ref check on mount reliably reports a missing file. Probe the URL directly.
  const [status, setStatus] = useState<'pending' | 'ok' | 'failed'>('pending')

  useEffect(() => {
    const probe = new window.Image()
    probe.onload = () => setStatus('ok')
    probe.onerror = () => setStatus('failed')
    probe.src = SRC
    return () => {
      probe.onload = null
      probe.onerror = null
    }
  }, [])

  if (status === 'failed') return <div className="about-mark" aria-hidden="true">A</div>

  return (
    <Image
      className="about-portrait"
      src={SRC}
      alt="Abrielle"
      width={320}
      height={380}
      /* Without `unoptimized` the image optimizer throws a 500 on every
         request while the file is missing; this keeps it a plain 404. */
      unoptimized
    />
  )
}
