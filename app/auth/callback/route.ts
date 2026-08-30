import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const code = url.searchParams.get('code')
  const next = url.searchParams.get('next') || '/portal'
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

  if (!code || !supabaseUrl || !publishableKey) return NextResponse.redirect(new URL('/login', request.url))

  const response = NextResponse.redirect(new URL(next, request.url))
  const supabase = createServerClient(supabaseUrl, publishableKey, {
    cookies: {
      getAll() { return request.cookies.getAll() },
      setAll(cookiesToSet) { cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options)) },
    },
  })

  await supabase.auth.exchangeCodeForSession(code)
  return response
}
