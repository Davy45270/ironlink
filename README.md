# IronLink — DevSecOps Excellence Platform ("Jira competitor")

Status: **bootstrapping** (2026-02-01)

## Exigences globales (obligatoires)
- Modules **autonomes** ou **intégrables sans friction**
- **Validation QA obligatoire** avant livraison
- **Validation RSSI obligatoire** avant livraison

## Goals (from EB)
- API-first, microservices, cloud-native
- Keycloak SSO (OIDC/SAML) + LDAP/AD
- Dual configuration (YAML boot + hot changes via Admin UI)
- Kanban + Gantt + Table (bulk edit)
- Import/Export (CSV/JSON, Jira/Trello ideal)
- GitLab integration + CI/CD webhooks
- Dev quality gates: linting, tests, OpenAPI, structured logs

## Proposed Architecture (v0)
- `gateway-api` (BFF/API gateway): REST, OpenAPI, auth propagation
- `auth-service`: integrates Keycloak, local break-glass admin
- `projects-service`: orgs/projects/boards/sprints
- `issues-service`: issues, workflows, comments, attachments metadata
- `planning-service`: gantt deps, critical path, scheduling
- `integration-service`: GitLab sync, webhooks, pipeline status
- `notifications-service`: email/webhook/in-app (event driven)

Infra:
- Postgres for core data
- Redis for sessions/cache/rate-limits
- NATS or RabbitMQ for async events
- OpenTelemetry for tracing/logs

Repo will contain:
- `docker-compose.yml` (dev)
- `helm/` charts (k8s-ready)
- `services/*` + `ui/*`

Next step: scaffold repo + pick tech stack (likely: TypeScript + NestJS for services, Next.js/React for UI).

## Docs
- Architecture: docs/ARCHITECTURE.md
- API: docs/API.md
- Data: docs/DATA.md
- Infra & ressources: docs/INFRA.md
- Kanban modèle & workflows: docs/KANBAN.md
- IHM Kanban: docs/UI-KANBAN.md
- Personas: docs/PERSONAS.md
- Ops Persona: docs/PERSONAS-OPS.md
- Auth & rôles: docs/AUTH.md
- Backlog: docs/BACKLOG.md
- Docker Compose (dev): docs/DOCKER-COMPOSE.md
