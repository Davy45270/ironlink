# Synthèse audits — 192.168.1.201 / 192.168.1.210 / 192.168.1.220

## 192.168.1.201 (cachyos-x8664)
- **Rôle** : reverse proxy public + média (Plex/Immich) + dashboards
- **Services clés** : caddy, homepage, node-exporter, dozzle-agent, watchtower, plex, immich (server/ML/postgres/redis)
- **Point critique** : docker-proxy **2375 exposé**
- **Reco (sans casse)** : restreindre 2375, auth sur dashboards, pinner images, healthchecks, logs + sauvegardes

## 192.168.1.210 (media-backend)
- **Rôle** : stack media
- **Services clés** : komga, qbittorrent, radarr/sonarr/lidarr, bazarr, audiobookshelf, overseerr, flaresolverr, homepage, dozzle, watchtower, node-exporter
- **Point critique** : docker-proxy **2375 exposé** + services admin ouverts
- **Reco (sans casse)** : restreindre 2375, reverse proxy+auth, patching images, logs + sauvegardes

## 192.168.1.220 (ops-backend)
- **Rôle** : ops/CI/monitoring
- **Services clés** : forgejo, woodpecker, guacamole, grafana, prometheus, uptime-kuma, n8n, homepage, dozzle, node-exporter, watchtower
- **Point critique** : docker-proxy **2375 exposé** + interfaces admin exposées
- **Reco (sans casse)** : restreindre 2375, reverse proxy + auth/SSO, durcissement (MFA/RBAC), logs + sauvegardes

---

## Risques transverses
- **Exposition Docker 2375** : accès root Docker si reachable (priorité critique)
- **Surfaces admin** ouvertes sans proxy/auth
- **Patching/versions** non figées

## Actions prioritaires (sans modification intrusive)
1) **Limiter l’accès réseau** à 2375 (firewall + bind local)
2) **Mettre un reverse proxy + auth** devant dashboards/admin
3) **Pinner les images** + healthchecks + rotation logs
4) **Sauvegardes** régulières + tests de restauration
