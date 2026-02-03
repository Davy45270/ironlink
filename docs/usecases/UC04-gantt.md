# UC04 — Gantt & Planning

## Objectif
Planification, dépendances, baselines.


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
Tâche, Dépendance, Jalon, Baseline.

## Epics / Stories / Actions
- Story: plan Gantt → Actions: dépendances, chemin critique
- Story: baseline → Actions: snapshot, verrouillage
- Story: replanification → Actions: impacts, validation
