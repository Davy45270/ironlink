# Kanban — Modèle & Workflows (v0)

## Modèle de données (minimum)
- **Board**: id, name, projectId, config
- **Column**: id, boardId, name, status, wipLimit, position
- **Swimlane**: id, boardId, name, type (assignee/epic/custom)
- **Issue**: id, projectId, title, description, type, status, assignee, labels, priority
- **IssueRank**: issueId, boardId, columnId, position

## Statuts & transitions
- Statuts de base: **Todo / In Progress / Review / Done**
- Transitions autorisées configurables par board
- Interdiction de transition directe si une règle s’y oppose

## Règles Kanban
- **WIP limits** par colonne (soft/hard)
- **Definition of Done** (texte + checklist) — inclure **validation QA** + **validation RSSI**
- **Swimlane** pour prioriser (ex: Urgent, Bugs, Clients)
- **Exigence transversale** : modules autonomes ou intégrables sans friction

## Mouvement d’issues
- `POST /v1/issues/{issueId}/move`
- Validation :
  - colonne cible autorisée
  - WIP limit respectée (sinon warning ou refus)
  - permissions utilisateur

## Permissions (simplifiées)
- **Admin org**: tout
- **Project admin**: config board, workflow
- **Contributor**: créer/éditer/move issues
- **Viewer**: lecture seule

## Événements (NATS)
- issue.created / issue.updated / issue.moved
- board.updated
- project.created

## Workflows avancés (règles & validations)
- **Gates de transition** (ex: Review → Done exige :
  - checklist DoD complète
  - tests unitaires OK
  - approbation Code Review)
- **Règles par type d’issue** (Bug vs Feature vs Tech Debt)
- **Bloquants** : un issue bloqué ne peut passer que vers **Blocked** ou **Todo**
- **Transitions conditionnelles** (rôle, label, priorité)
- **Auto‑assign / Auto‑label** sur certaines transitions

## Templates de board / workflow
- **Template “Product‑Led”** :
  - Todo → In Progress → Review → Done
  - Swimlanes : **Epic**, **Story**, **Task**
- **Template “Ops/Run”** :
  - Intake → Triage → In Progress → Verification → Done
  - WIP plus strict en “In Progress”
- **Template “Bugfix”** :
  - New → Reproduced → Fixing → QA → Done

## Ageing & SLA
- **Ageing** : temps passé par colonne + total cycle time
- **SLA par type d’issue** (ex: Bugs P1 ≤ 24h, P2 ≤ 72h)
- **Alertes** :
  - Alerte quand 80% du SLA est atteint
  - Blocage / escalade quand SLA dépassé
- **KPIs** : lead time, cycle time, throughput, WIP moyen

## TODO (prochaines itérations)
- Sprints (Scrum/Kanban hybride)
- Automatisation avancée (webhooks, auto‑move)
- Intégration QA (tests non‑régression branchés sur status)
