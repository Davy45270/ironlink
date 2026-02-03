# Audit rapide — 192.168.1.220 (ops-backend)

## Constat
- Hôte Ubuntu 24.04 (ops-backend)
- Stack Docker Ops/CI : Forgejo, Woodpecker (server/agent), Guacamole, Grafana, Prometheus, Node Exporter, Uptime‑Kuma, n8n, Homepage, Dozzle, Watchtower
- Docker socket proxy exposé : **0.0.0.0:2375**
- Ports exposés : 8000 (woodpecker), 3000 (grafana), 3001 (uptime-kuma), 3002 (forgejo), 8080 (homepage), 8081 (guacamole), 5678 (n8n), 9090 (prometheus), 9100 (node-exporter), 9999 (dozzle), 2222 (ssh forgejo)

## Points sensibles
- **Port 2375 exposé** (docker-proxy) → risque critique si accessible réseau
- Multiples interfaces d’admin exposées en clair

## Recommandations (sans modification)
1) Restreindre l’accès à **2375** (firewall + bind local + auth)
2) Mettre un reverse proxy + auth/SSO devant services admin
3) Vérifier mises à jour images + durcissement (MFA, RBAC)
4) Journalisation & sauvegardes
