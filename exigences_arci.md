
📜 MASTER_SPECS.md : NextGen Project Management Platform
> Statut : APPROVED
> Version : 1.0.0
> Portée : Source de Vérité Unique (SSOT) pour l'Architecture, le Développement et l'Exploitation.
> 
1. 🎯 Vision & Manifeste
Objectif : Construire une alternative souveraine à Jira, "Developer-First", remplaçant la complexité administrative par l'automatisation technique.
Philosophie : L'application est rapide (Backend optimisé), résiliente (Architecture asynchrone) et agnostique (Cloud/On-Premise).
Principes Directeurs
 * L'Intelligence est au Backend : Le client (Front/CLI) est "bête".
 * Zéro Magie : Tout comportement est explicite, documenté et tracé.
 * Exploitable par Design : L'Ops n'est pas une pensée après coup.
 * Qualité Bloquante : Si la qualité baisse, le déploiement s'arrête.
2. 🏗 Architecture Système (Cloud-Native)
2.1 Stack Technologique (Les Choix)
 * Base de Données (La Vérité) : PostgreSQL. Une instance logique par microservice. Utilisation de colonnes JSONB pour l'extensibilité (Champs personnalisés).
 * Cache & Sessions (La Vitesse) : Valkey (Fork Open Source de Redis). Utilisé pour le stockage de session, le cache de requêtes et les verrous distribués.
 * Bus d'Événements (Le Système Nerveux) : NATS JetStream. Assure la communication asynchrone, la résilience (replay) et le découplage des services.
 * Recherche : Moteur d'indexation dédié (ex: Meilisearch ou Elasticsearch) alimenté via NATS.
2.2 Pattern Microservices
 * Séparation des Responsabilités (Bounded Contexts) :
   * Auth-Service (Identité & RBAC)
   * Core-Service (Projets, Tickets, Workflows)
   * Risk-Engine (Analyse proactive & IA légère)
   * Connect-Service (Intégrations GitLab, Harness, Slack)
 * Communication :
   * Synchrone (Performance) : gRPC (Protobuf) pour les appels internes critiques.
   * Asynchrone (Résilience) : NATS JetStream. Implémentation du pattern Dead Letter Queue (DLQ) obligatoire pour gérer les messages en erreur sans bloquer le flux.
2.3 ⛔ Les Interdits (Hard Rules)
 * INTERDIT : Logique métier (Triggers, Procédures) dans PostgreSQL.
 * INTERDIT : État local (Filesystem) sur les conteneurs. Usage de stockage S3 obligatoire pour les fichiers.
 * INTERDIT : Transactions distribuées (Two-Phase Commit). Utiliser le pattern SAGA ou l'Eventual Consistency via NATS.
 * INTERDIT : Exécution Root (UID 0).
3. 🛡 Sécurité & API Management
3.1 Sécurité Applicative
 * Auth : Délégation totale à Keycloak (OIDC). Le Backend ne valide que la signature des JWT (Stateless).
 * Rate Limiting : Protection native sur l'API Gateway (basée sur Valkey) par IP et par User.
 * Secrets : Injection dynamique. Aucun secret en variable d'environnement claire.
3.2 Design API
 * Standard : OpenAPI 3.0. L'IHM est un consommateur comme un autre.
 * Internationalisation (i18n) : L'API renvoie des clés de traduction (error.ticket.not_found) et non du texte brut.
 * Pagination : Curseur ou Offset obligatoire sur toutes les listes. Pas de Select All.
4. ⚡ Performance & Frontend "Thin Client"
4.1 Hygiène Backend -> Frontend
 * Responsabilité : Le Frontend ne fait aucun calcul métier (pas de calcul de dates Gantt, pas de tri complexe). Il affiche le JSON reçu.
 * Optimisation : Le Backend fournit des données pré-formatées pour l'affichage via des DTOs (Data Transfer Objects).
4.2 Métriques de Performance (SLA)
 * API Latency : P95 < 200ms pour les lectures, < 500ms pour les écritures.
 * Search : Résultats de recherche < 100ms.
 * Frontend : First Contentful Paint (FCP) < 1.5s.
5. 🔭 Observabilité & APM (Open Source)
L'application doit être transparente ("Glass Box").
 * Standard : OpenTelemetry partout (Traces, Metrics, Logs).
 * Tracing Distribué : Propagation du Trace-Context (trace_id) à travers HTTP, gRPC et NATS.
 * Stack Cible : Grafana LGTM (Loki, Grafana, Tempo, Mimir).
 * Continuous Profiling : Intégration de Pyroscope pour détecter les fuites mémoires et CPU hogs.
 * Métriques RED : Chaque service expose Rate, Errors, Duration.
6. ⚙️ Exploitabilité & Ops-Ready
6.1 Intégration SI
 * Annuaire : Synchro native LDAP/AD (Groupes -> Rôles).
 * Provisioning : Just-In-Time (JIT) creation des users.
 * CMDB : Endpoint /meta/info exposant version, git-hash et dépendances.
6.2 Maintenance & Disaster Recovery
 * Configuration : Tout le paramétrage est défini dans config.yaml (Hot Reload supporté).
 * Backup : Scripts de sauvegarde automatisés (PostgreSQL + S3).
 * Graceful Shutdown : Les services doivent gérer le SIGTERM pour drainer les requêtes gRPC et fermer les connexions NATS proprement.
7. 🧪 Qualité, Tests & CI/CD
7.1 Pyramide de Tests
 * Unitaires (70%) : Logique métier pure. TDD obligatoire.
 * Intégration (20%) : Tests avec TestContainers (Vrai Postgres, Vrai NATS, Vrai Valkey). Mocks interdits sur la couche infra.
 * E2E (10%) : Scénarios "Golden Paths" (Auth -> Create Ticket -> Git Sync).
7.2 Seuils de Qualité (Quality Gates)
 * Couverture : > 80%.
 * Code Smells : 0 bloquant.
 * Vulnérabilités : 0 High/Critical (Trivy).
 * Documentation : Spec OpenAPI valide (Spectral Linting).
8. ✨ Fonctionnalités "Killer" & Extensibilité
8.1 Risk Radar (Moteur Proactif)
 * Analyse des "Signaux Faibles" via NATS (Tickets stagnants, PRs géantes, Flapping).
 * Notification Push aux développeurs ("Tu sembles bloqué sur le ticket #123").
8.2 Deep Integration
 * Git-Centric : Transition automatique des tickets basée sur les Webhooks GitLab/GitHub reçus via NATS.
 * Documentation-as-Code : Le module "Wiki" est un rendu Markdown d'un repo Git dédié.
8.3 Maintenabilité
 * Feature Flags : Déploiement progressif des fonctionnalités.
 * Outbox Pattern : Utilisation du pattern Transactional Outbox pour garantir la cohérence entre PostgreSQL et NATS.
9. 📝 Documentation & Normes
 * ADR (Architecture Decision Records) : Tout choix technique structurant est documenté dans /docs/adr.
 * Code Comments : Le "Pourquoi", pas le "Comment".
 * PR Template : La PR doit prouver qu'elle a été testée (Screenshot, Logs, Vidéo).
> Approbation Finale : Ce document prévaut sur toute discussion orale. Toute modification nécessite une Pull Request validée par le Lead Architect.
> 
