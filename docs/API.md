# API v0 (Kanban-first)

Base URL (dev): `http://localhost:13000`

## Auth (v0)
- **Disabled** for MVP (local dev). Will be enforced by gateway later (Keycloak OIDC).

## Projects
- `POST /v1/projects` → create project
- `GET /v1/projects` → list projects
- `GET /v1/projects/{projectId}` → get project

## Boards
- `POST /v1/projects/{projectId}/boards` → create board
- `GET /v1/projects/{projectId}/boards/{boardId}` → get board (columns + swimlanes + wip)
- `PATCH /v1/projects/{projectId}/boards/{boardId}` → update board config

## Issues
- `POST /v1/projects/{projectId}/issues` → create issue
- `GET /v1/projects/{projectId}/issues?boardId=...&status=...` → list issues
- `PATCH /v1/issues/{issueId}` → edit issue (title, desc, assignee)

## Kanban moves
- `POST /v1/issues/{issueId}/move`
  - body: `{ "boardId": "...", "fromColumnId": "...", "toColumnId": "...", "toPosition": 3, "swimlaneId": null }`

## Events (NATS)
Subjects (proposal):
- `nextgen.project.created`
- `nextgen.board.updated`
- `nextgen.issue.created`
- `nextgen.issue.updated`
- `nextgen.issue.moved`

Event payloads are JSON, include `traceId`, `actor`, `occurredAt`.
