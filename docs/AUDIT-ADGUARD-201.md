# Audit AdGuard Home — 192.168.1.201

## Constat
- Service **AdGuardHome** tourne en **local host** (process systemd), ports :
  - **DNS** TCP/UDP **53** (192.168.1.201)
  - **UI** HTTP **8084**
- Version : **v0.107.71**
- Protection DNS : **active**
- DNS principal : **192.168.1.201**

## Observations
- Accès UI via session `/control/login` (compte `david`).
- Cockpit admin accessible sur **9443** (login SSH machine).

## Recommandations (sans casse)
1) **Forcer HTTPS** sur l’UI (reverse proxy ou config AdGuard)
2) **Limiter l’accès UI** (ACL IP, VPN, ou auth forte)
3) **Surveillance** : intégrer métriques/alertes (latence DNS, taux d’erreurs)
4) **Sauvegarde config** (export régulier)

## Intégration supervision (proposée)
- Vérifier **disponibilité DNS** (TCP/UDP 53) + health UI (8084)
- Collecter stats via API `GET /control/stats` et `GET /control/status`
