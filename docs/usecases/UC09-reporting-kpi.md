# UC09 — Reporting & KPI

## Objectif
KPIs standardisés + dashboards.


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

## Epics / Stories / Actions
- Story: définir KPI → Actions: formule, owner
- Story: dashboard → Actions: widgets, filtres
- Story: reporting exec → Actions: scheduling, export
