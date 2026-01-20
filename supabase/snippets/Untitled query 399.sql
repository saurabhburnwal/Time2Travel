create table destinations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  state text not null,
  budget_min int,
  budget_max int,
  created_at timestamp default now()
);
