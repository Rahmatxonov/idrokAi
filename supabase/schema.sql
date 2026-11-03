-- IdrokAI: Supabase SQL Editor da bir marta ishga tushiring. Har bir foydalanuvchi faqat o‘z qatorlarini ko‘radi (RLS).
create table public.profiles(id uuid primary key references auth.users(id) on delete cascade,full_name text,email text,avatar_url text,role text check(role in('student','teacher')),created_at timestamptz default now());
create table public.generations(id uuid primary key default gen_random_uuid(),user_id uuid not null references auth.users(id) on delete cascade,tool int not null,topic text not null,level int,result jsonb,created_at timestamptz default now());
create table public.materials(id uuid primary key default gen_random_uuid(),user_id uuid not null references auth.users(id) on delete cascade,title text not null,content text,created_at timestamptz default now());
alter table public.profiles enable row level security;alter table public.generations enable row level security;alter table public.materials enable row level security;
create policy "profiles_select_own" on public.profiles for select using(id=auth.uid());
create policy "profiles_insert_own" on public.profiles for insert with check(id=auth.uid());
create policy "profiles_update_own" on public.profiles for update using(id=auth.uid()) with check(id=auth.uid());
create policy "gen_select_own" on public.generations for select using(user_id=auth.uid());
create policy "gen_insert_own" on public.generations for insert with check(user_id=auth.uid());
create policy "gen_delete_own" on public.generations for delete using(user_id=auth.uid());
create policy "mat_all_own" on public.materials for all using(user_id=auth.uid()) with check(user_id=auth.uid());
-- Google ma’lumotlari (ism, rasm) haqiqiy OAuth metadata'dan olinadi; soxta qiymat yozilmaydi.
create function public.handle_new_user() returns trigger language plpgsql security definer set search_path='' as $$
begin insert into public.profiles(id,full_name,email,avatar_url) values(new.id,coalesce(new.raw_user_meta_data->>'full_name',new.raw_user_meta_data->>'name'),new.email,coalesce(new.raw_user_meta_data->>'avatar_url',new.raw_user_meta_data->>'picture')) on conflict(id) do nothing; return new; end $$;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();

-- Agar oldingi versiya schema.sql ni allaqachon ishga tushirgan bo‘lsangiz, faqat shuni bajaring:
-- alter table public.profiles add column if not exists email text;
-- (va yuqoridagi handle_new_user funksiyasini `create or replace function` bilan qayta yarating)
