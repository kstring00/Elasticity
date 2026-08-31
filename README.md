# Elasticity

A premium custom-training platform for personalized four-week programs, client onboarding, exercise education, check-ins, progress tracking, and coach operations.

## Product direction

Elasticity is intentionally built as more than a brochure website. The public experience sells the coaching service; the authenticated experience becomes the place clients receive and use their plans; the coach dashboard becomes the operational backend.

### Core flows

- Public marketing site with four-week transformation carousel
- Stripe checkout for personalized training packages
- Deep multi-step client intake and onboarding
- Supabase authentication and role-based access
- Client portal for assigned programs and check-ins
- Reusable exercise library with images/video links
- Coach dashboard for clients, programs, intake review, notifications, and transformations
- In-app notification created when a client submits a check-in

## Stack

- Next.js + TypeScript
- Supabase Auth, Postgres, Storage, and Row Level Security
- Stripe Checkout + webhook
- Vercel-ready deployment

## Local setup

1. Copy `.env.example` to `.env.local`.
2. Add the Supabase URL + publishable key.
3. Add server-only Supabase service-role and Stripe keys.
4. Install dependencies with `npm install`.
5. Run `npm run dev`.

The database migration is in `supabase/migrations/20260830_init_elasticity.sql`.

## Security

Never commit Stripe secrets, Supabase service-role keys, webhook signing secrets, or client data. Public browser access uses the Supabase publishable key and is protected by RLS.


## Hero image

The home hero uses `public/hero-lakeside-{640,1000}.{avif,webp,jpg}`, generated
from the source photograph. The source is 1000px wide, so 1000w is the largest
real step; regenerate all six files if a higher-resolution original arrives.
