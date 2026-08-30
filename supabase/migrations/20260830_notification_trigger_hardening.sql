-- Keep insert/update notification logic explicit so INSERT never references OLD.

create or replace function public.notify_staff_on_checkin()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  client_name text;
  should_notify boolean := false;
begin
  if new.status = 'submitted' then
    if tg_op = 'INSERT' then
      should_notify := true;
    elsif tg_op = 'UPDATE' and old.status is distinct from 'submitted' then
      should_notify := true;
    end if;
  end if;

  if should_notify then
    select coalesce(full_name, email, 'A client')
      into client_name
      from public.profiles
     where id = new.client_id;

    insert into public.notifications (recipient_id, type, title, body, entity_type, entity_id)
    select id,
           'checkin_submitted',
           'Weekly check-in ready for review',
           client_name || ' submitted the Week ' || new.week_number || ' check-in.',
           'check_in',
           new.id
      from public.profiles
     where role in ('coach','admin');
  end if;

  return new;
end;
$$;
