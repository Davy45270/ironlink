# Audit rapide — 192.168.1.201 (cachyos-x8664)

## Constat
- Hôte CachyOS
- Conteneurs actifs :
  - **caddy** (reverse proxy public 80/443)
  - **homepage** (dashboard 8080)
  - **node-exporter** (9100)
  - **dozzle-agent** (7007)
  - **docker-socket-proxy** (2375)
  - **watchtower**
  - **plex** (32400)
  - **immich** (server + machine-learning + postgres + redis)
- 2 stacks compose : `/home/david/docker-compose.yml` et `/home/david/compose.immich.yml`
- Réseaux : `david_default`, `host_proxy`, `immich_default`, `immich_internal` (bridge)

## Points sensibles
- **Port 2375 exposé** (docker-proxy) → risque critique si accessible réseau
- Plusieurs services exposés (plex, immich, homepage)

## Recommandations (sans modification)
1) Restreindre l’accès à **2375** (firewall + bind local + auth)
2) Mettre un reverse proxy + auth/SSO devant services admin (homepage/dozzle)
3) Pinner versions d’images + healthchecks
4) Journalisation & sauvegardes
