# Docker Compose — IronLink (local dev)

## Fichier
- `docker-compose.yml`

## Services
- **postgres**: `postgres:16-alpine`
  - Port host: `15432` → conteneur `5432`
  - DB: `nextgen`
  - User/Pass: `postgres/postgres`
  - Volume: `pgdata`

- **valkey**: `valkey/valkey:7.2-alpine`
  - Port host: `16379` → conteneur `6379`

- **nats**: `nats:2.10-alpine`
  - Ports: `14222` (client), `18222` (monitoring)
  - Options: `-js` (JetStream)

- **api-gateway**: `node:22-alpine`
  - Port host: `13000` → conteneur `3000`
  - Volumes: `./services/api-gateway:/app`
  - Commande: `npm i && npm run migrate && node src/index.js`
  - Env: `PORT=3000`, `DATABASE_URL=postgres://postgres:postgres@postgres:5432/nextgen`

- **auth-service**: `node:22-alpine`
  - Port host: `13001` → conteneur `3001`
  - Volumes: `./services/auth-service:/app`

- **projects-service**: `node:22-alpine`
  - Port host: `13002` → conteneur `3002`
  - Volumes: `./services/projects-service:/app`

- **issues-service**: `node:22-alpine`
  - Port host: `13003` → conteneur `3003`
  - Volumes: `./services/issues-service:/app`

## Lancer
```bash
docker compose up -d
```

## Arrêter
```bash
docker compose down
```

## Notes
- Setup **dev/local** (pas production).
- Les services Node sont montés en volume pour itérer rapidement.
