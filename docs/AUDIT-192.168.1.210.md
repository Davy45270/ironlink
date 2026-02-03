# Audit rapide — 192.168.1.210 (media-backend)

## Constat
- Hôte Ubuntu 24.04 (media-backend)
- Stack Docker orientée media : komga, qbittorrent, radarr/sonarr/lidarr, bazarr, audiobookshelf, overseerr, flaresolverr, homepage, dozzle, watchtower
- Node exporter présent
- Docker socket proxy exposé : **0.0.0.0:2375**

## Points sensibles
- **Port 2375 exposé** (docker-proxy) → risque critique si accessible depuis le réseau
- Multiples services exposés en clair (8080/8085/5055/7878/8989/9696/25600/13378/8686/6767)

## Recommandations (sans modification)
1) Restreindre l’accès à **2375** (firewall + bind local + auth)
2) Mettre un reverse proxy + auth devant les services media
3) Vérifier mises à jour des images (watchtower) + politique de patching
4) Activer journalisation & sauvegardes
