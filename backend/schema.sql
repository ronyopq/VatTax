-- Backend MVP schema for VAT calculator

create table if not exists users (
  id bigserial primary key,
  email varchar(255) not null unique,
  password_hash text not null,
  role varchar(32) not null check (role in ('admin', 'operator', 'viewer')),
  full_name varchar(120),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists categories (
  id bigserial primary key,
  code varchar(64) not null unique,
  name_en varchar(200) not null,
  name_bn varchar(200) not null,
  vat_rate numeric(5,2) not null check (vat_rate >= 0 and vat_rate <= 100),
  tax_rate numeric(5,2) not null check (tax_rate >= 0 and tax_rate <= 100),
  approved boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists calculations (
  id bigserial primary key,
  user_id bigint references users(id) on delete set null,
  mode varchar(32) not null check (mode in ('gross', 'vendor', 'category')),
  category_id bigint references categories(id) on delete set null,
  input_bill numeric(14,2) not null check (input_bill > 0),
  vat_rate numeric(5,2) not null check (vat_rate >= 0 and vat_rate <= 100),
  tax_rate numeric(5,2) not null check (tax_rate >= 0 and tax_rate <= 100),
  vat_amount numeric(14,2) not null,
  tax_amount numeric(14,2) not null,
  total_deduction numeric(14,2) not null,
  payable_amount numeric(14,2) not null,
  gross_amount numeric(14,2) not null,
  locale varchar(16) not null default 'en',
  source varchar(32) not null default 'web',
  metadata jsonb,
  calculated_at timestamptz not null default now()
);

create index if not exists idx_calculations_user_time on calculations(user_id, calculated_at desc);
create index if not exists idx_calculations_mode_time on calculations(mode, calculated_at desc);

create table if not exists audit_logs (
  id bigserial primary key,
  actor_user_id bigint references users(id) on delete set null,
  action varchar(64) not null,
  entity varchar(64) not null,
  entity_id varchar(64),
  before_data jsonb,
  after_data jsonb,
  ip_address varchar(64),
  user_agent text,
  created_at timestamptz not null default now()
);

create index if not exists idx_audit_logs_action_time on audit_logs(action, created_at desc);
