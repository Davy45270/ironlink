# Public exposure via existing Caddy (192.168.1.201)

Caddy is already configured for `*.pingfr.duckdns.org` with DuckDNS DNS-01 TLS.

To expose the MVP API publicly:

## Option 1 (recommended): add a dedicated subdomain
Example: `pm-api.pingfr.duckdns.org` → reverse proxy to dev01 `192.168.1.230:13000`.

Caddyfile snippet:

```caddy
@pmapi host pm-api.pingfr.duckdns.org
handle @pmapi {
  reverse_proxy 192.168.1.230:13000
}
```

## Option 2: expose UI (later)
Example: `pm.pingfr.duckdns.org` → reverse proxy to `apps/web` (Next.js) on dev01.

## Security
- Add BasicAuth or mTLS at Caddy layer (recommended for MVP)
- Add IP allowlist if possible

