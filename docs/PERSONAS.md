# PERSONAS — Équipe produit & delivery (high‑security)

> Contexte : environnement à haute exigence de sécurité (SecNumCloud, HDS, ISO 27001/2). Rigueur et traçabilité sont non‑négociables.

## 1) Product Owner (PO) & Proxy PO (PPO)
### PO — Le Visionnaire
- **Persona** : orienté business & ROI, proche du marché et des clients.
- **Rôle** : maximiser la valeur produit, porter la vision long terme.
- **Livrables** : Product Roadmap, KPIs, priorisation du Backlog.

### Proxy PO — Le Traducteur
- **Persona** : rigoureux, analytique, excellent communicant.
- **Rôle** : présence quotidienne avec les devs, grooming, clarification des besoins.
- **Livrables** : User Stories détaillées, critères d’acceptation, backlog de sprint propre.

## 2) Scrum Master — Le Coach
- **Persona** : empathique, diplomate, ferme sur l’Agile (servant leader).
- **Rôle** : lever les obstacles, faciliter les rituels, protéger l’équipe.
- **Livrables** : indicateurs de vélocité (burndown), plans d’amélioration.

## 3) Équipe de Développement — Le Moteur Technique
### Développeurs (Front/Back/Fullstack)
- **Persona** : pragmatique, curieux, discipliné ; pense sécurité + dette technique.
- **Rôle** : concevoir et coder les fonctionnalités définies par PO/PPO.
- **Exigences clés** : Security by Design (OWASP), code review systématique.
- **Livrables** :
  - Code propre & documenté
  - Tests unitaires (couverture élevée exigée par le RSSI)
  - Documentation technique (Swagger/OpenAPI)
  - Scripts de déploiement (IaC)

### DevOps (si présent)
- **Persona** : automation‑first, fiabilité & disponibilité.
- **Rôle** : CI/CD, IaC, observabilité, déploiements sûrs.
- **Livrables** : pipelines CI/CD, Terraform/Ansible, runbooks.

## 4) Testeurs / QA — Les Gardiens de la Fiabilité
- **Persona** : sceptique professionnel, critique, patient ; aime « casser » pour solidifier.
- **Rôle** : vérifier conformité vs User Stories, anticiper cas limites, valider la gestion des droits (HDS/SecNumCloud).
- **Livrables** :
  - Cahier / plan de tests
  - Rapports d’anomalies précis & reproductibles
  - Automates de tests (non‑régression)
  - PV de recette

## 5) RSSI — Le Gardien du Temple
- **Persona** : méticuleux, méfiant par métier, tolérance zéro pour la négligence.
- **Rôle** : garantir conformité SecNumCloud/HDS/ISO 27001/2.
- **Livrables** : EBIOS RM, PAS, matrice de conformité, rapports de scans.

## 6) CTO — L’Arbitre Suprême
- **Persona** : visionnaire technique, pédagogue, pragmatique.
- **Rôle** : définir la stack, valider l’architecture, arbitrer les conflits.
- **Livrables** : schémas d’architecture cible, décisions d’arbitrage critiques.

## 7) UX/UI Designer — L’Accélérateur d’Adoption
- **Persona** : centré utilisateur, orienté simplicité et clarté.
- **Rôle** : garantir l’expérience utilisateur malgré les contraintes sécurité.
- **Livrables** : maquettes, prototypes, guidelines UI.

---

## Interactions critiques (contexte sécurité)
- **Dev vs RSSI** : nouvelle lib JS refusée pour vulnérabilité → alternative ou patch.
- **QA vs Proxy PO** : crash sur caractère spécial → critères d’acceptation renforcés.
- **DevSecOps** : scans SAST/DAST intégrés à la chaîne pour concilier vitesse + sécurité.

---

## Tableau récapitulatif — Rôle / Objectif / Livrable / Conflit

| Rôle | Objectif principal | Livrable clé | Conflit / interaction typique |
|---|---|---|---|
| PO / Proxy PO | Valeur métier & priorisation | Backlog & User Stories | « On doit sortir cette feature pour le salon pro, quitte à documenter plus tard. » |
| Développeur | Qualité de code & robustesse | Code source & tests unitaires | « Le RSSI bloque mon accès SSH, je ne peux pas débugger l’environnement de dev. » |
| Testeur (QA) | Fiabilité & non‑régression | Cahier de tests & rapports de bugs | « Le dev dit que c’est fini, mais l’appli plante dès qu’on dépasse 100 utilisateurs. » |
| RSSI | Sécurité & conformité | Plan d’Assurance Sécurité (PAS) | « Interdiction d’utiliser cette API tierce, elle n’est pas certifiée HDS. » |
| CTO | Vision technique & arbitrage | Schéma d’architecture cible | « On accepte le risque sur ce point mineur pour tenir la prod, mais on le fixe au prochain sprint. » |
| UX/UI Designer | Adoption & UX | Maquettes & prototypes | « L’authentification à 3 facteurs imposée par le RSSI tue l’expérience utilisateur. » |
| DevOps | Automatisation & disponibilité | CI/CD & IaC | « Les tests automatisés du QA ralentissent trop le déploiement en continu. » |
| Scrum Master | Fluidité & rythme | Velocity chart & plan d’action | « Le RSSI surcharge les dévs avec des audits, on ne tiendra jamais l’engagement du sprint. » |

