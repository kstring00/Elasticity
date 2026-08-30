-- Follow-up hardening applied to the live Elasticity Supabase project.

alter function public.set_updated_at() set search_path = '';

-- Trigger-only SECURITY DEFINER functions should not be callable through the Data API.
revoke execute on function public.handle_new_user() from public, anon, authenticated;
revoke execute on function public.notify_staff_on_checkin() from public, anon, authenticated;
revoke execute on function public.notify_staff_on_intake() from public, anon, authenticated;
revoke execute on function public.prevent_role_escalation() from public, anon, authenticated;

-- is_staff is intentionally available only to authenticated users because RLS policies depend on it.
revoke execute on function public.is_staff() from public, anon;
grant execute on function public.is_staff() to authenticated;

-- Cover foreign keys used by common dashboard/client queries.
create index if not exists check_ins_program_id_idx on public.check_ins(program_id);
create index if not exists intakes_order_id_idx on public.intakes(order_id);
create index if not exists orders_product_id_idx on public.orders(product_id);
create index if not exists program_exercises_exercise_id_idx on public.program_exercises(exercise_id);
create index if not exists programs_coach_id_idx on public.programs(coach_id);
create index if not exists programs_order_id_idx on public.programs(order_id);
create index if not exists progress_photos_check_in_id_idx on public.progress_photos(check_in_id);
create index if not exists transformations_client_id_idx on public.transformations(client_id);
