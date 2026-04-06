
-- Drop the overly permissive policy
drop policy "Anyone can insert page views" on public.page_views;

-- Create a more restrictive insert policy
create policy "Anyone can insert page views"
on public.page_views for insert
to anon, authenticated
with check (
  id = gen_random_uuid() and
  created_at = now()
);
