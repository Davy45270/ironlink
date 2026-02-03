# RBAC — Politique d'accès IronLink

## Rôles standard

| Rôle | Description |
|------|-------------|
| **Admin** | Gestion utilisateurs, config système, tous droits |
| **PO** | Product Owner : backlog, roadmap, priorisation |
| **PMO** | Program Management : multi-projets, KPIs, reporting |
| **Dev** | Développeur : issues, code, CI/CD |
| **QA** | Quality Assurance : tests, validations, signoff |
| **RSSI** | Responsable Sécurité : audits, vulnérabilités, compliance, signoff |
| **Ops** | Opérations : monitoring, incidents, déploiements |
| **User** | Utilisateur standard : lecture seule, commentaires |

## Matrice permissions (modules / actions)

| Module | Admin | PO | PMO | Dev | QA | RSSI | Ops | User |
|--------|-------|----|----|-----|----|----|-----|------|
| **Projets** (CRUD) | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Backlog** (lecture) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Backlog** (écriture) | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Kanban** (déplacer cartes) | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ |
| **Cartes** (créer/éditer) | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ |
| **Commentaires** (ajouter) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Roadmap** (lecture) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Roadmap** (écriture) | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Gantt** (lecture) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Gantt** (écriture) | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **CI/CD** (lecture) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| **CI/CD** (déclencher) | ✅ | ❌ | ❌ | ✅ | ✅ | ❌ | ✅ | ❌ |
| **Vulnérabilités** (lecture) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| **Vulnérabilités** (triage/assign) | ✅ | ✅ | ❌ | ✅ | ❌ | ✅ | ❌ | ❌ |
| **Incidents** (lecture) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| **Incidents** (déclarer/gérer) | ✅ | ❌ | ❌ | ✅ | ❌ | ✅ | ✅ | ❌ |
| **Logs d'audit** (lecture) | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ | ❌ |
| **Exports** (données) | ✅ | ✅ | ✅ | ❌ | ✅ | ✅ | ✅ | ❌ |
| **Rapports conformité** | ✅ | ❌ | ✅ | ❌ | ✅ | ✅ | ❌ | ❌ |
| **Gestion utilisateurs** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Config système** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |

## Règles d'accès UI

- **Écrans conditionnés** : les modules/actions non autorisés sont **cachés** ou **grisés**.
- **Exports tracés** : chaque export génère une ligne dans l'audit (qui, quoi, quand).
- **Validation croisée** :  
  - **QA** doit valider avant passage "Done" (checkbox obligatoire).  
  - **RSSI** doit valider avant passage "Done" (checkbox obligatoire).  
  - Si QA ou RSSI non validé → transition "Done" **bloquée**.

## Audit des droits

- **Logs d'accès** : chaque action sensible est tracée (création/modification/suppression/export).
- **Revue trimestrielle** : Admin + RSSI vérifient les droits (revoke si nécessaire).
- **Traçabilité** : qui a donné quel rôle, à qui, quand.

## Least privilege

- **Attribution minimale** : par défaut, nouvel utilisateur = rôle **User** (lecture seule).
- **Élévation contrôlée** : tout changement de rôle nécessite validation Admin.
- **Rôles temporaires** : possibilité de donner un rôle pour une durée limitée (ex: Ops temporaire).

## Critères d'acceptation (QA + RSSI)

- [ ] Matrice RBAC implémentée (backend + frontend)
- [ ] Écrans conditionnés RBAC (masquage/disable)
- [ ] Exports tracés dans l'audit
- [ ] Validation QA/RSSI obligatoire avant "Done"
- [ ] Logs d'accès activés (immuables, horodatés)
- [ ] Tests RBAC (tentative d'accès non autorisé → refus)
- [ ] Revue des droits trimestrielle planifiée
- [ ] Documentation utilisateur (comment demander un rôle)

## Implémentation technique

- **Backend** : middleware RBAC (vérification rôle + permission avant action).
- **Frontend** : contexte utilisateur (rôle) + conditional rendering.
- **Audit** : table `audit_log` (user_id, action, resource, timestamp, ip).
- **Tests** : scénarios par rôle (Admin/PO/Dev/QA/RSSI/Ops/User).

## Prochaines étapes

1. Implémenter middleware RBAC backend (Node.js/Express ou équivalent)
2. Intégrer contexte utilisateur frontend (React Context ou équivalent)
3. Ajouter table `audit_log` + triggers
4. Créer tests automatisés RBAC (par rôle)
5. Valider avec QA + RSSI
6. Mettre à jour DoD (inclure validation QA/RSSI)
