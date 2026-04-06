
-- Create app_role enum
create type public.app_role as enum ('admin', 'user');

-- User roles table
create table public.user_roles (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references auth.users(id) on delete cascade not null,
    role app_role not null,
    unique (user_id, role)
);
alter table public.user_roles enable row level security;

-- Security definer function for role checking
create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = _user_id
      and role = _role
  )
$$;

-- Articles table
create table public.articles (
    id uuid primary key default gen_random_uuid(),
    title text not null,
    subtitle text,
    category text not null,
    category_color text not null default 'bg-primary',
    image_url text,
    author text not null default 'Raimundo Teixeira',
    content text not null,
    tags text[] default '{}',
    featured boolean default false,
    trending boolean default false,
    published boolean default false,
    read_time text default '5 min',
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);
alter table public.articles enable row level security;

create policy "Public can read published articles"
on public.articles for select
using (published = true);

create policy "Admins can select all articles"
on public.articles for select
to authenticated
using (public.has_role(auth.uid(), 'admin'));

create policy "Admins can insert articles"
on public.articles for insert
to authenticated
with check (public.has_role(auth.uid(), 'admin'));

create policy "Admins can update articles"
on public.articles for update
to authenticated
using (public.has_role(auth.uid(), 'admin'))
with check (public.has_role(auth.uid(), 'admin'));

create policy "Admins can delete articles"
on public.articles for delete
to authenticated
using (public.has_role(auth.uid(), 'admin'));

-- Ads table
create table public.ads (
    id uuid primary key default gen_random_uuid(),
    title text not null,
    image_url text,
    link_url text,
    position text not null default 'general',
    active boolean default true,
    created_at timestamptz default now()
);
alter table public.ads enable row level security;

create policy "Public can read active ads"
on public.ads for select
using (active = true);

create policy "Admins can select all ads"
on public.ads for select
to authenticated
using (public.has_role(auth.uid(), 'admin'));

create policy "Admins can insert ads"
on public.ads for insert
to authenticated
with check (public.has_role(auth.uid(), 'admin'));

create policy "Admins can update ads"
on public.ads for update
to authenticated
using (public.has_role(auth.uid(), 'admin'))
with check (public.has_role(auth.uid(), 'admin'));

create policy "Admins can delete ads"
on public.ads for delete
to authenticated
using (public.has_role(auth.uid(), 'admin'));

-- Page views table
create table public.page_views (
    id uuid primary key default gen_random_uuid(),
    page_path text not null,
    article_id uuid references public.articles(id) on delete set null,
    created_at timestamptz default now(),
    user_agent text,
    referrer text
);
alter table public.page_views enable row level security;

create policy "Anyone can insert page views"
on public.page_views for insert
with check (true);

create policy "Admins can read page views"
on public.page_views for select
to authenticated
using (public.has_role(auth.uid(), 'admin'));

-- User roles policies
create policy "Users can read own roles"
on public.user_roles for select
to authenticated
using (user_id = auth.uid());

create policy "Admins can read all roles"
on public.user_roles for select
to authenticated
using (public.has_role(auth.uid(), 'admin'));

-- Function to auto-assign admin role on signup for specific email
create or replace function public.handle_admin_signup()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.email = 'biortv36@gmail.com' then
    insert into public.user_roles (user_id, role)
    values (new.id, 'admin')
    on conflict (user_id, role) do nothing;
  end if;
  return new;
end;
$$;

create trigger on_auth_user_created_admin
after insert on auth.users
for each row execute procedure public.handle_admin_signup();

-- Updated_at trigger function
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql set search_path = public;

create trigger update_articles_updated_at
before update on public.articles
for each row execute function public.update_updated_at_column();
