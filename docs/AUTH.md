# Auth & Rôles

## Keycloak
- OIDC/SAML
- Groupes configurables avec mapping vers rôles applicatifs
- Sync LDAP/AD optionnel

## Rôles (proposition)
- **org-admin** : gestion org, utilisateurs, projets, templates
- **project-admin** : config board/workflows, permissions du projet
- **contributor** : créer/éditer/move issues
- **viewer** : lecture seule

## Admin local (break-glass)
- Compte local hors SSO
- Accès limité mais suffisant pour rétablir l’accès (reset SSO, rotation secrets)
