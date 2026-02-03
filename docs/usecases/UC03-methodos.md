# UC03 — Méthodos Kanban/Scrum/SAFe

## Objectif
Boards configurables par méthodo + métriques.


## Contraintes globales (applicables à tous les use cases)
- **Microservices** (pas de monolithe non justifié)
- **Échanges stateless** entre services
- **SPA** côté UI
- **UI responsive** (desktop + mobile)
- **Composants stables et à jour** uniquement
- **Documentation code obligatoire**
- **Documentation fonctionnelle obligatoire**

### Epic — Conformité aux règles globales
- Story: conformité architecture → Actions: vérifier microservices, stateless, SPA
- Story: conformité UI → Actions: responsive + composants stables/maintenus
- Story: conformité documentation → Actions: doc code + doc fonctionnelle à jour

## Objets
Board, Sprint, PI, WIP, Ritual.

## Epics / Stories / Actions
### Epic 1 — Boards multi-méthodos
- Story: board Scrum → Actions: colonnes, cadence sprint

### Epic 2 — Rituels
- Story: PI planning → Actions: capacité, objectifs

### Epic 3 — Métriques
- Story: lead time → Actions: calcul, dashboard
