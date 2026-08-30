-- Elasticity initial platform schema
-- Auth + deep intake + program builder + exercise library + check-ins + owner notifications + Stripe order ledger.

create type public.app_role as enum ('client', 'coach', 'admin');
create type public.intake_status as enum ('draft', 'submitted', 'reviewed');
create type public.program_status as enum ('draft', 'assigned', 'active', 'completed', 'archived');
create type public.checkin_status as enum ('draft', 'submitted', 'reviewed');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  phone text,
  avatar_url text,
  role public.app_role not null default 'client',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description text,
  price_cents integer not null check (price_cents >= 0),
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references public.profiles(id) on delete set null,
  client_email text,
  product_slug text not null,
  amount_cents integer not null default 0,
  status text not null default 'pending',
  stripe_session_id text unique,
  stripe_customer_id text,
  stripe_payment_intent_id text,
  paid_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.intakes (
  id uuid primary key default gen_random_uuid(),
  client_id uuid unique not null references public.profiles(id) on delete cascade,
  status public.intake_status not null default 'draft',
  current_step integer not null default 1 check (current_step between 1 and 7),
  responses jsonb not null default '{}'::jsonb,
  coach_summary text,
  ai_brief text,
  ai_flags jsonb not null default '[]'::jsonb,
  ai_generated_at timestamptz,
  consent_to_training_terms boolean not null default false,
  submitted_at timestamptz,
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.exercises (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  category text,
  primary_muscle text,
  equipment text,
  difficulty text,
  image_url text,
  video_url text,
  default_prescription text,
  short_note text,
  setup_cues text[] not null default '{}',
  execution_cues text[] not null default '{}',
  common_mistakes text[] not null default '{}',
  active boolean not null default true,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.programs (
  id uuid primary key default gen_random_uuid(),
  coach_id uuid references public.profiles(id) on delete set null,
  client_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  goal text,
  weeks integer not null default 4 check (weeks between 1 and 12),
  current_week integer not null default 1 check (current_week between 1 and 12),
  status public.program_status not null default 'draft',
  coach_note text,
  pdf_url text,
  starts_on date,
  ends_on date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.program_days (
  id uuid primary key default gen_random_uuid(),
  program_id uuid not null references public.programs(id) on delete cascade,
  week_number integer not null check (week_number > 0),
  day_number integer not null check (day_number between 1 and 7),
  day_name text not null,
  focus text,
  instructions text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  unique(program_id, week_number, day_number)
);

create table public.program_exercises (
  id uuid primary key default gen_random_uuid(),
  program_day_id uuid not null references public.program_days(id) on delete cascade,
  exercise_id uuid not null references public.exercises(id) on delete restrict,
  sets text,
  reps text,
  rest_seconds integer,
  tempo text,
  coach_note text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table public.check_ins (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.profiles(id) on delete cascade,
  program_id uuid references public.programs(id) on delete set null,
  week_number integer not null check (week_number > 0),
  adherence integer check (adherence between 0 and 100),
  energy integer check (energy between 1 and 10),
  difficulty integer check (difficulty between 1 and 10),
  recovery integer check (recovery between 1 and 10),
  wins text,
  challenges text,
  pain_or_discomfort text,
  notes text,
  coach_response text,
  status public.checkin_status not null default 'draft',
  submitted_at timestamptz,
  reviewed_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.progress_photos (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.profiles(id) on delete cascade,
  phase text not null check (phase in ('before','checkin','after')),
  storage_path text not null,
  taken_at date,
  marketing_consent boolean not null default false,
  marketing_consent_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.transformations (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references public.profiles(id) on delete set null,
  before_photo_url text not null,
  after_photo_url text not null,
  label text not null default '4 WEEK TRANSFORMATION',
  testimonial text,
  explicit_marketing_consent boolean not null default false,
  published boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  constraint publish_requires_consent check (published = false or explicit_marketing_consent = true)
);

create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  recipient_id uuid not null references public.profiles(id) on delete cascade,
  type text not null,
  title text not null,
  body text,
  entity_type text,
  entity_id uuid,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create index orders_client_idx on public.orders(client_id, created_at desc);
create index intakes_status_idx on public.intakes(status, submitted_at desc);
create index programs_client_idx on public.programs(client_id, status, created_at desc);
create index program_days_program_idx on public.program_days(program_id, week_number, sort_order);
create index program_exercises_day_idx on public.program_exercises(program_day_id, sort_order);
create index checkins_client_idx on public.check_ins(client_id, submitted_at desc);
create index notifications_recipient_idx on public.notifications(recipient_id, read_at, created_at desc);

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_updated_at before update on public.profiles for each row execute function public.set_updated_at();
create trigger intakes_updated_at before update on public.intakes for each row execute function public.set_updated_at();
create trigger exercises_updated_at before update on public.exercises for each row execute function public.set_updated_at();
create trigger programs_updated_at before update on public.programs for each row execute function public.set_updated_at();

create or replace function public.is_staff()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role in ('coach','admin')
  );
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data ->> 'full_name', ''))
  on conflict (id) do nothing;

  update public.orders
     set client_id = new.id
   where client_id is null
     and client_email is not null
     and lower(client_email) = lower(new.email)
     and status = 'paid';

  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

create or replace function public.prevent_role_escalation()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if new.role is distinct from old.role and auth.uid() = old.id and not public.is_staff() then
    raise exception 'Role changes require staff access';
  end if;
  return new;
end;
$$;

create trigger profiles_protect_role
before update on public.profiles
for each row execute function public.prevent_role_escalation();

create or replace function public.notify_staff_on_intake()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  client_name text;
begin
  if new.status = 'submitted' and (old.status is distinct from 'submitted') then
    select coalesce(full_name, email, 'A client') into client_name from public.profiles where id = new.client_id;
    insert into public.notifications (recipient_id, type, title, body, entity_type, entity_id)
    select id, 'intake_submitted', 'New intake ready for review', client_name || ' submitted onboarding.', 'intake', new.id
    from public.profiles where role in ('coach','admin');
  end if;
  return new;
end;
$$;

create trigger notify_staff_after_intake
before update on public.intakes
for each row execute function public.notify_staff_on_intake();

create or replace function public.notify_staff_on_checkin()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  client_name text;
begin
  if new.status = 'submitted' and (tg_op = 'INSERT' or old.status is distinct from 'submitted') then
    select coalesce(full_name, email, 'A client') into client_name from public.profiles where id = new.client_id;
    insert into public.notifications (recipient_id, type, title, body, entity_type, entity_id)
    select id, 'checkin_submitted', 'Weekly check-in ready for review', client_name || ' submitted the Week ' || new.week_number || ' check-in.', 'check_in', new.id
    from public.profiles where role in ('coach','admin');
  end if;
  return new;
end;
$$;

create trigger notify_staff_after_checkin
after insert or update on public.check_ins
for each row execute function public.notify_staff_on_checkin();

alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.intakes enable row level security;
alter table public.exercises enable row level security;
alter table public.programs enable row level security;
alter table public.program_days enable row level security;
alter table public.program_exercises enable row level security;
alter table public.check_ins enable row level security;
alter table public.progress_photos enable row level security;
alter table public.transformations enable row level security;
alter table public.notifications enable row level security;

create policy "profiles read own or staff" on public.profiles for select to authenticated using (id = auth.uid() or public.is_staff());
create policy "profiles update own or staff" on public.profiles for update to authenticated using (id = auth.uid() or public.is_staff()) with check (id = auth.uid() or public.is_staff());

create policy "active products public" on public.products for select to anon, authenticated using (is_active or public.is_staff());
create policy "staff manages products" on public.products for all to authenticated using (public.is_staff()) with check (public.is_staff());

create policy "orders read own or staff" on public.orders for select to authenticated using (
  public.is_staff() or client_id = auth.uid() or (client_id is null and lower(client_email) = lower(auth.jwt() ->> 'email'))
);
create policy "staff manages orders" on public.orders for all to authenticated using (public.is_staff()) with check (public.is_staff());

create policy "clients read own intake" on public.intakes for select to authenticated using (client_id = auth.uid() or public.is_staff());
create policy "clients create own intake" on public.intakes for insert to authenticated with check (client_id = auth.uid());
create policy "clients update own intake" on public.intakes for update to authenticated using (client_id = auth.uid() or public.is_staff()) with check (client_id = auth.uid() or public.is_staff());
create policy "staff deletes intakes" on public.intakes for delete to authenticated using (public.is_staff());

create policy "active exercises readable" on public.exercises for select to anon, authenticated using (active or public.is_staff());
create policy "staff manages exercises" on public.exercises for all to authenticated using (public.is_staff()) with check (public.is_staff());

create policy "programs visible to client or staff" on public.programs for select to authenticated using (client_id = auth.uid() or public.is_staff());
create policy "staff manages programs" on public.programs for all to authenticated using (public.is_staff()) with check (public.is_staff());

create policy "program days follow program access" on public.program_days for select to authenticated using (
  exists (select 1 from public.programs p where p.id = program_id and (p.client_id = auth.uid() or public.is_staff()))
);
create policy "staff manages program days" on public.program_days for all to authenticated using (public.is_staff()) with check (public.is_staff());

create policy "program exercises follow program access" on public.program_exercises for select to authenticated using (
  exists (
    select 1 from public.program_days d join public.programs p on p.id = d.program_id
    where d.id = program_day_id and (p.client_id = auth.uid() or public.is_staff())
  )
);
create policy "staff manages program exercises" on public.program_exercises for all to authenticated using (public.is_staff()) with check (public.is_staff());

create policy "clients read own checkins" on public.check_ins for select to authenticated using (client_id = auth.uid() or public.is_staff());
create policy "clients submit own checkins" on public.check_ins for insert to authenticated with check (client_id = auth.uid());
create policy "clients update own checkins" on public.check_ins for update to authenticated using (client_id = auth.uid() or public.is_staff()) with check (client_id = auth.uid() or public.is_staff());
create policy "staff deletes checkins" on public.check_ins for delete to authenticated using (public.is_staff());

create policy "clients read own progress photos" on public.progress_photos for select to authenticated using (client_id = auth.uid() or public.is_staff());
create policy "clients add own progress photos" on public.progress_photos for insert to authenticated with check (client_id = auth.uid());
create policy "clients update own progress photos" on public.progress_photos for update to authenticated using (client_id = auth.uid() or public.is_staff()) with check (client_id = auth.uid() or public.is_staff());
create policy "clients delete own progress photos" on public.progress_photos for delete to authenticated using (client_id = auth.uid() or public.is_staff());

create policy "published transformations public" on public.transformations for select to anon, authenticated using (published or public.is_staff());
create policy "staff manages transformations" on public.transformations for all to authenticated using (public.is_staff()) with check (public.is_staff());

create policy "notifications visible to recipient" on public.notifications for select to authenticated using (recipient_id = auth.uid());
create policy "notifications recipient can mark read" on public.notifications for update to authenticated using (recipient_id = auth.uid()) with check (recipient_id = auth.uid());
create policy "staff can create notifications" on public.notifications for insert to authenticated with check (public.is_staff());

insert into public.products (slug, name, description, price_cents) values
  ('custom', 'Custom 4-Week Plan', 'Personalized four-week training program and client portal access.', 12900),
  ('guided', 'Plan + Weekly Check-Ins', 'Personalized four-week program with structured weekly coach check-ins.', 17900)
on conflict (slug) do update set name = excluded.name, description = excluded.description, price_cents = excluded.price_cents;

insert into public.exercises (slug, name, category, primary_muscle, equipment, difficulty, default_prescription, short_note) values
  ('barbell-bench-press','Barbell Bench Press','Strength','Chest','Barbell + Bench','Intermediate','3 × 6–8','Use controlled repetitions and preserve good form.'),
  ('incline-dumbbell-press','Incline Dumbbell Press','Strength','Chest','Dumbbells + Bench','Intermediate','3 × 8–10',null),
  ('high-slow-cable-fly','High Slow Cable Fly','Accessory','Chest','Cable','Intermediate','3 × 10–12','Emphasize a slow 2–3 second return.'),
  ('lat-pulldown','Lat Pulldown','Strength','Back','Cable Machine','Beginner','3 × 8–10',null),
  ('t-bar-row','T-Bar Row','Strength','Back','T-Bar / Landmine','Intermediate','3 × 8–10',null),
  ('half-kneeling-face-pull','Half-Kneeling Face Pull','Stability','Upper Back','Cable','Intermediate','2–3 × 12–15',null),
  ('romanian-deadlift','Romanian Deadlift','Strength','Posterior Chain','Barbell or Dumbbells','Intermediate','3 × 8–10',null),
  ('heel-elevated-goblet-squat','Heel-Elevated Goblet Squat','Strength','Quads','Dumbbell','Intermediate','3 × 8–10',null),
  ('quad-focused-leg-press','Quad-Focused Leg Press','Strength','Quads','Leg Press','Beginner','3 × 10–12','Use controlled depth without allowing the hips to roll off the pad.'),
  ('dumbbell-shoulder-press','Dumbbell Shoulder Press','Strength','Shoulders','Dumbbells','Intermediate','3 × 8–10',null),
  ('dumbbell-lateral-raise','Dumbbell Lateral Raise','Accessory','Shoulders','Dumbbells','Beginner','3 × 10–15',null),
  ('ab-roller','Ab Roller','Core','Core','Ab Wheel','Intermediate','2–3 × 6–10',null),
  ('dead-bug','Dead Bug','Core','Core Stability','Bodyweight','Beginner','2 × 8 / side',null),
  ('pallof-press','Pallof Press','Core','Anti-Rotation','Cable or Band','Beginner','3 × 10 / side','Resist rotation and maintain trunk stability.'),
  ('farmer-carry','Farmer Carry','Athletic','Grip + Core','Dumbbells','Beginner','3 × 30–45 sec','Walk under control with an upright torso.')
on conflict (slug) do nothing;

insert into storage.buckets (id, name, public) values
  ('exercise-media', 'exercise-media', true),
  ('progress-photos', 'progress-photos', false),
  ('program-files', 'program-files', false)
on conflict (id) do nothing;

create policy "staff uploads exercise media" on storage.objects for insert to authenticated with check (bucket_id = 'exercise-media' and public.is_staff());
create policy "staff updates exercise media" on storage.objects for update to authenticated using (bucket_id = 'exercise-media' and public.is_staff()) with check (bucket_id = 'exercise-media' and public.is_staff());
create policy "staff deletes exercise media" on storage.objects for delete to authenticated using (bucket_id = 'exercise-media' and public.is_staff());

create policy "clients upload own progress photos" on storage.objects for insert to authenticated with check (bucket_id = 'progress-photos' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "clients read own progress photos" on storage.objects for select to authenticated using (bucket_id = 'progress-photos' and ((storage.foldername(name))[1] = auth.uid()::text or public.is_staff()));
create policy "clients update own progress photos" on storage.objects for update to authenticated using (bucket_id = 'progress-photos' and ((storage.foldername(name))[1] = auth.uid()::text or public.is_staff())) with check (bucket_id = 'progress-photos' and ((storage.foldername(name))[1] = auth.uid()::text or public.is_staff()));
create policy "clients delete own progress photos" on storage.objects for delete to authenticated using (bucket_id = 'progress-photos' and ((storage.foldername(name))[1] = auth.uid()::text or public.is_staff()));

create policy "program files readable by client or staff" on storage.objects for select to authenticated using (bucket_id = 'program-files' and ((storage.foldername(name))[1] = auth.uid()::text or public.is_staff()));
create policy "staff uploads program files" on storage.objects for insert to authenticated with check (bucket_id = 'program-files' and public.is_staff());
create policy "staff updates program files" on storage.objects for update to authenticated using (bucket_id = 'program-files' and public.is_staff()) with check (bucket_id = 'program-files' and public.is_staff());
create policy "staff deletes program files" on storage.objects for delete to authenticated using (bucket_id = 'program-files' and public.is_staff());
