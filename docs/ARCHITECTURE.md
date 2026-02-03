# Architecture — Infra locale & Essaim OpenClaw (dev01/dev2/RPi)

_Date: 2026-02-01_

## 1) Inventaire des nœuds

### dev01 — VM OpenClaw / portail
- IP: **192.168.1.230**
- Rôle: orchestration (OpenClaw), docker-compose, portail Nginx + WAF
- OpenClaw gateway: **127.0.0.1:18789** (loopback)
- Portail: **http://192.168.1.230:8080/**
- WAF (OWASP CRS + BasicAuth):
  - HTTP **:10080** → redirect HTTPS
  - HTTPS **:10443** (self-signed)

### dev2 — VM compute IA (Ollama)
- IP: **192.168.1.231**
- OS: Ubuntu 24.04
- CPU/RAM: **4 vCPU**, **~8 GB RAM**
- Ollama: **active** (0.15.2)
- Modèles:
  - `llama3.2:latest`
  - `qwen2.5-coder:1.5b`
- API Ollama exposée LAN: **http://192.168.1.231:11434/**

### Raspberry Pi — compute + stockage (Ollama)
- IP: **192.168.1.49**
- OS: Debian bookworm (aarch64)
- CPU/RAM: **4 cores**, **~8 GB RAM**
- Stockage: **SSD ~1TB** monté sur `/`
- Ollama: **active** (0.15.2)
- Modèles: (à puller)

### VMs RO
- 192.168.1.210 (media-backend) — bot RO
- 192.168.1.220 (ops-backend) — bot RO

### Serveur 201 (CachyOS)
- 192.168.1.201 — accès david (clé), bot fleet non finalisé

## 2) Accès & identités

### SSH
- Accès automatisé via user **bot** sur:
  - dev2 (231) : FULL (sudo)
  - Raspberry Pi (49) : FULL (sudo + docker + ollama)
  - media/ops (210/220) : RO

### Outils OpenClaw
- Exec tool en mode ouvert sur dev01 (gateway), elevated autorisé via WhatsApp.

## 3) “Local-first” : stratégie de calcul

Objectif: minimiser la dépendance aux quotas cloud, garder la réactivité, réserver les appels cloud aux cas où la qualité/raisonnement est critique.

- **Main agent** : `ollama/llama3.2:latest` (dev2)
- **Agents dev** : `ollama/qwen2.5-coder:1.5b` (dev2)
- **Agents risque (RSSI/DRH)** : local par défaut, avec fallbacks Gemini/Mistral si nécessaire.

### Pourquoi dev2 en primaire
- x86_64 + 8GB : meilleur perf/latence que le Pi pour l’inférence.
- Pi: excellent pour **services persistants**, stockage, tâches batch, et inference légère/backup.

## 4) Comment exploiter le Raspberry Pi au maximum

### Rôles recommandés
1. **Backup inference**: héberger un petit modèle (ex: Llama 3.2 1B/3B) pour continuité si dev2 down.
2. **Tâches batch** (offline): indexations, génération de docs, rendu, cron de maintenance.
3. **Stockage**: artefacts (screenshots, exports, backups) sur SSD.
4. **Observabilité**: collecte logs/metrics (Promtail/Loki ou OpenTelemetry Collector) si on le souhaite.

### Actions à faire (prochain sprint infra)
- `ollama pull qwen2.5-coder:1.5b` sur Pi (ou variante plus petite si nécessaire)
- limiter parallélisme Pi: `OLLAMA_NUM_PARALLEL=1`
- s’assurer que l’API est exposée LAN et protégée (LAN only)

## 5) Sécurité
- WAF devant le portail (OWASP CRS) + BasicAuth.
- Gateway OpenClaw loopback (pas exposé LAN).
- Secrets: à sortir des README et stocker dans un emplacement protégé (et rotation recommandée).

