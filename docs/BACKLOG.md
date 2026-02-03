# Backlog — Sécurité & Delivery (proposition PO)

## Épic 0 — Fondations techniques (priorité P0)
- **Story (QA)**: Tests API `/api/items`
  - CA: prérequis = endpoint disponible ; exécutable en async ; verdict OK/KO
- **Story (QA)**: Tests CI/CD GitHub Actions
  - CA: prérequis = workflow présent ; exécutable en async ; logs archivés
- **Story (QA)**: Tests DnD + responsive
  - CA: prérequis = UI DnD ; exécutable en async ; check mobile/desktop
- **Story (QA)**: Tests édition cartes + pièces jointes
  - CA: prérequis = drawer + champs ; exécutable en async ; images+fichiers validés
- **Story (QA)**: Tests orchestration Valkey
  - CA: prérequis = producer/consumer ; exécutable en async ; alerte WhatsApp OK

## Épic 0 — Fondations techniques (priorité P0)
- **Story**: Endpoint API `/api/items` (lecture Kanban)
  - CA: endpoint retourne project + items + links ; tests OK ; QA/RSSI validés
- **Story**: CI/CD GitHub Actions (build + tests)
  - CA: workflow CI actif ; tests automatiques passent ; logs disponibles
- **Story**: Tests automatisés API gateway
  - CA: healthz + seed/items couverts ; exécution < 1 min
- **Story**: IHM Kanban DnD (dnd‑kit)
  - CA: drag & drop cross‑colonnes + reorder ; responsive OK
- **Story**: Gestion cartes enrichie (drawer + champs)
  - CA: détails carte visibles ; édition inline (titre, description, priorité, assigné)
- **Story**: Pièces jointes (images + fichiers)
  - CA: ajout/suppression ; preview image ; lien fichier (URL externe)
- **Story**: Connexion IHM ↔ API `/api/items`
  - CA: IHM consomme `/api/items` ; synchro board ; refresh OK
- **Story**: Orchestration logs via Valkey (remplacement n8n)
  - CA: producer/consumer + queue ; alertes WhatsApp 30 min ; logs testés

## Décisions d’exécution (2026-02-03)
- Reporting quotidien 08:00 activé
- Autonomie accordée (exécution sans validation intermédiaire)
- Priorités: CI/CD (GO++), IHM/UX (GO), Modularité/intégration (GO), Tests (priorité faible mais GO)
- Audit/logs : non prioritaire (home lab)
- Infra & secrets : plus tard

## Épic 1 — Gouvernance sécurité & conformité (HDS/SecNumCloud)
- **Story**: Cartographier données & traitements (DPIA, registre)
  - CA: registre validé; DPIA par flux sensible; classification appliquée
- **Story**: Politique d’accès (RBAC/least‑privilege)
  - CA: rôles définis; audit des droits 100% couvert (MFA hors scope pour l’instant)
- **Story**: Journalisation & traçabilité
  - CA: logs immuables; horodatage; rétention conforme HDS
- **Story**: Chiffrement & gestion des secrets
  - CA: chiffrement au repos/en transit; secrets dans coffre; rotation clés

## Épic 2 — Sécurité applicative & DevSecOps
- **Story**: SAST/DAST/Dependency scan CI
  - CA: scans bloquants sur vulnérabilités critiques; rapports stockés
- **Story**: Modèle de menace (STRIDE) + remédiations
  - CA: menaces listées; plan d’actions priorisé; preuves de correction
- **Story**: Gestion vulnérabilités & patching
  - CA: SLA (critique <7j); tableau de bord suivi

## Épic 3 — Exploitabilité HDS/SecNumCloud
- **Story**: Sauvegardes, PRA/PCA
  - CA: RPO/RTO définis; tests PRA trimestriels; preuves
- **Story**: Supervision & alerting
  - CA: métriques clés; alertes 24/7; runbooks validés
- **Story**: Conformité hébergeur (sous‑traitants, contrats)
  - CA: clauses HDS/SNC; registre sous‑traitants à jour

## Épic 4 — Kanban & delivery
- **Story**: Definition of Ready/Done alignée conformité
  - CA: checklist sécurité intégrée; DoD inclut tests & logs
- **Story**: WIP limits + politiques de tirage
  - CA: limites visibles; dépassements alertés
- **Story**: Métriques flux (lead time, throughput)
  - CA: dashboard hebdo; actions d’amélioration tracées

## Épic 5 — IHM & expérience utilisateur sécurisée
- **Story**: Parcours authentification/consentement
  - CA: consentement explicite; RGPD OK (MFA hors scope pour l’instant)
- **Story**: Gestion des erreurs & messages sécurité
  - CA: pas de fuite d’info; messages guidants; journal côté serveur
- **Story**: Accès aux logs/exports par rôle
  - CA: écrans conditionnés RBAC; export tracé & signé

## Épic 6 — Données sensibles & anonymisation
- **Story**: Masquage/anonymisation en non‑prod
  - CA: données prod jamais en non‑prod; preuves de masquage
- **Story**: Minimisation & rétention
  - CA: champs inutiles supprimés; purge automatisée

## Épic 7 — Tests & validation sécurité
- **Story**: Pentest externe annuel
  - CA: rapport reçu; CVEs traitées
- **Story**: Tests d’intrusion internes ciblés
  - CA: scénarios validés; correctifs vérifiés
