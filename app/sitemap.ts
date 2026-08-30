import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://abrielle.vercel.app'
  const now = new Date()
  return [
    { url: base, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/fit`, lastModified: now, changeFrequency: 'monthly', priority: .9 },
    { url: `${base}/plan`, lastModified: now, changeFrequency: 'monthly', priority: .7 },
    { url: `${base}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: .2 },
    { url: `${base}/terms`, lastModified: now, changeFrequency: 'yearly', priority: .2 },
    { url: `${base}/disclaimer`, lastModified: now, changeFrequency: 'yearly', priority: .2 },
  ]
}
