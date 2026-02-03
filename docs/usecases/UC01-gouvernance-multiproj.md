# UC01 — Gouvernance multi-projets

## Objectif
Piloter le portefeuille, arbitrer capacité/budget, tracer décisions.


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
Initiative, Projet, Capacité, Budget, Décision, Comité.

## Règles métier
Priorisation valeur/risque/effort; historique d'arbitrage.

## Epics / Stories / Actions
### Epic 1 — Portefeuille & scoring
- Story: créer initiative → Actions: formulaire, scoring auto, validation PMO
- Story: matrice WSJF → Actions: calcul, classement, export comité

### Epic 2 — Capacités & allocation
- Story: plan de charge → Actions: capacité par équipe, simulation
- Story: arbitrage budget → Actions: alerte dépassement, validation

### Epic 3 — Gouvernance & décisions
- Story: comité mensuel → Actions: agenda, décisions tracées
- Story: suivi jalons → Actions: statut, alertes
