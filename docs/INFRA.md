# Infra & Ressources (v0)

## Environnements
- **dev** (docker-compose local)
- **staging** (k8s, données de test anonymisées)
- **prod** (k8s, HA, sauvegardes, RPO/RTO définis)

## Services clés
- **Gateway/API** (BFF + OpenAPI)
- **Auth**: Keycloak (OIDC/SAML), LDAP/AD en option
  - **Groupes configurables** (mapping rôles/app)
  - **Compte admin local** hors SSO (break-glass)
- **Core**: projects, issues, planning, integrations

## Données & stockage
- **Postgres**: source of truth (projects, boards, issues, workflow)
- **Redis**: cache, rate limit, locks
- **Object Storage** (S3-compatible): pièces jointes, exports
- **NATS** (ou RabbitMQ): bus d’événements (async)

## Sécurité & accès
- Secrets via **Vault** ou **KMS** (stage/prod)
- RBAC par **rôles** (Org/Project) via groupes Keycloak
- Audit trail sur les changements critiques

## Observabilité
- **OpenTelemetry** (traces, logs, metrics)
- **Grafana + Prometheus** (dashboards)
- **Loki** (logs)

## Secrets & chiffrement
- **OpenBao** (gestion des secrets, policies, audit)

## Réseau
- Ingress (Caddy/NGINX)
- TLS auto (Let’s Encrypt)
- Limitation IP + WAF (prod)

## CI/CD
- Tests, lint, SAST/Dependency scan
- Build images, push registry, déploiement helm
- Migrations DB automatiques (safe)

## Backup & DR
- Snapshots Postgres (quotidien)
- Object storage versionné
- RPO/RTO à définir
