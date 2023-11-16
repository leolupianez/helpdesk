-- STAFF
create type staff_role_enum as enum('admin', 'support', 'manager');

create table
  staff (
    id uuid references auth.users on delete cascade not null primary key,
    username text not null unique,
    staff_role staff_role_enum default 'support'::staff_role_enum,
    constraint username_length check (char_length(username) >= 3)
  );

alter table staff enable row level security;

create policy "Public staff profile are viewable by everyone." on staff for select using (true);
create policy "Can view own user data." on staff for select using (auth.uid() = id);
create policy "Can update own user data." on staff for update using (auth.uid() = id);

create function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.staff (id, username, staff_role)
  values (
    new.id,
    new.raw_user_meta_data->>'username',
    CAST(NEW.raw_user_meta_data->>'staff_role' AS public.staff_role_enum)
  );
  return new;
end;
$$ language plpgsql security definer;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- TICKET
create type ticket_status_type as enum('new', 'in progress', 'done');

create table
  ticket (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name text not null,
    email text not null,
    description text not null,
    status ticket_status_type default 'new'::ticket_status_type,
    created_at timestamp with time zone default timezone ('utc'::text, now()) not null
  );

-- REPLY
create table
  reply (
    id uuid primary key,
    text text not null,
    userId uuid not null,
    ticketId int not null,
    created_at timestamp with time zone default timezone ('utc'::text, now()) not null,
    foreign key (userId) references staff (id),
    foreign key (ticketId) references ticket (id)
  );

-- ADD DEFAULT ADMIN ACCOUNT 
-- ADD DEFAULT ADMIN ACCOUNT 
INSERT INTO auth.users (id, instance_id, email, email_confirmed_at, encrypted_password, aud, "role", raw_app_meta_data, raw_user_meta_data, created_at, updated_at, last_sign_in_at, confirmation_token, email_change, email_change_token_new, recovery_token) VALUES 
('1f1903ab-61f4-4836-8dd2-1860d99dae02', '00000000-0000-0000-0000-000000000000', 'admin@example.com', '2023-11-16 16:37:27.777276+00', '$2a$10$gyeuDfpJ8VeGsGe/xeh9PuM6/zyap5oojRfuFa5MXGKnMKmTfI4xy', 'authenticated', 'authenticated', '{"provider":"email","providers":["email"]}', '{"username":"admin", "staff_role": "admin"}', '2023-11-16 16:37:27.772227+00', '2023-11-16 16:40:29.926747+00', '2023-11-16 16:40:29.924947+00', '', '', '', '');

INSERT INTO auth.identities (id, user_id, "provider", identity_data, created_at, updated_at, last_sign_in_at) VALUES 
('1f1903ab-61f4-4836-8dd2-1860d99dae02', '1f1903ab-61f4-4836-8dd2-1860d99dae02', 'email', '{"sub":"1f1903ab-61f4-4836-8dd2-1860d99dae02","email":"admin@example.com","email_verified":false,"phone_verified":false}', '2023-11-16 16:37:27.775871+00', '2023-11-16 16:37:27.775871+00', '2023-11-16 16:37:27.775826+00');