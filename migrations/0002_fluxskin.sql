create table if not exists profiles (
  user_id text primary key,
  access_key text not null,
  plan text not null default 'trial',
  plan_until timestamptz,
  stars integer not null default 80,
  keys integer not null default 2,
  created_at timestamptz not null default now()
);

create table if not exists inventory_items (
  id text primary key,
  user_id text not null,
  skin_id text not null,
  wear text not null,
  float_value double precision not null,
  stattrak boolean not null default false,
  stattrak_count integer not null default 0,
  nametag text,
  equipped boolean not null default false,
  source text not null default 'catalog',
  created_at timestamptz not null default now()
);

create index if not exists inventory_items_user_id_idx on inventory_items (user_id);
