# Decisions (ADR-lite)

## 2026-02-01 — Stack v0
- **Backend**: TypeScript + NestJS (microservices) + OpenAPI
- **Frontend**: Next.js (React) for speed + SSR + component ecosystem
- **DB**: Postgres
- **Cache/Sessions**: Redis
- **Async/events**: NATS (later) or RabbitMQ; start with REST then introduce events for notifications/integrations.

Rationale: fastest path to a clean, typed, testable, enterprise-ready baseline.
