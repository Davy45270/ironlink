-- v0 schema (kanban-first)

create table if not exists projects (
  id text primary key,
  name text not null,
  created_at timestamptz not null default now()
);
