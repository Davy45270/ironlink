# Data & Statelessness

We keep **Postgres** as the source of truth.

Stateless rules:
- App containers keep **no durable state** locally.
- No local session storage. If sessions are needed: use Redis.
- Any persistent state lives in external services: Postgres/Redis/Object storage.

## Postgres (core)
- projects
- boards
- columns
- issues
- issue_rank / ordering

## Redis (later)
- session cache (if any)
- rate limiting
- locks / debouncing for move operations

## NATS
- event bus (async)
- not the source of truth in v0
