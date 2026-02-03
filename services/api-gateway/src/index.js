import http from 'node:http';
import { Client } from 'pg';

const port = process.env.PORT ? Number(process.env.PORT) : 3000;
const databaseUrl = process.env.DATABASE_URL || '';

let pg = null;
async function pgClient() {
  if (!databaseUrl) return null;
  if (pg) return pg;
  pg = new Client({ connectionString: databaseUrl });
  await pg.connect();
  return pg;
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (c) => (body += c));
    req.on('end', () => {
      if (!body) return resolve(null);
      try {
        resolve(JSON.parse(body));
      } catch (e) {
        reject(e);
      }
    });
  });
}

function json(res, status, obj) {
  res.writeHead(status, {
    'content-type': 'application/json',
    'access-control-allow-origin': '*',
    'access-control-allow-headers': 'content-type,x-seed-token,x-role',
    'access-control-allow-methods': 'GET,POST,OPTIONS',
  });
  res.end(JSON.stringify(obj));
}

function id(prefix = 'p') {
  return `${prefix}_${Math.random().toString(16).slice(2)}${Date.now().toString(16)}`;
}

// In-memory fallback (dev only)
const mem = { projects: new Map(), items: new Map(), links: new Map(), project: null, audit: [] };

const permissions = {
  admin: new Set(['projects:read','projects:write','items:read','seed:write','audit:read']),
  po: new Set(['projects:read','projects:write','items:read']),
  pmo: new Set(['projects:read','projects:write','items:read']),
  dev: new Set(['projects:read','items:read']),
  qa: new Set(['projects:read','items:read']),
  rssi: new Set(['projects:read','items:read','audit:read']),
  ops: new Set(['projects:read','items:read','audit:read']),
  user: new Set(['projects:read','items:read'])
};

function getRole(req) {
  const r = String(req.headers['x-role'] || 'user').toLowerCase();
  return permissions[r] ? r : 'user';
}

function can(role, perm) {
  return permissions[role]?.has(perm);
}

function auditLog(action, role, meta = {}) {
  mem.audit.push({
    id: id('audit'),
    action,
    role,
    at: new Date().toISOString(),
    meta,
  });
}

const server = http.createServer(async (req, res) => {
  try {
    if (req.method === 'OPTIONS') {
      res.writeHead(204, {
        'access-control-allow-origin': '*',
        'access-control-allow-headers': 'content-type,x-seed-token,x-role',
        'access-control-allow-methods': 'GET,POST,OPTIONS',
      });
      return res.end();
    }

    if (req.url === '/healthz') return json(res, 200, { ok: true, service: 'api-gateway' });

    // POST /api/seed?dryRun=true|false
    if (req.method === 'POST' && req.url.startsWith('/api/seed')) {
      const role = getRole(req);
      if (!can(role, 'seed:write')) return json(res, 403, { error: 'forbidden' });
      const url = new URL(req.url, 'http://localhost');
      const dryRun = url.searchParams.get('dryRun') === 'true';
      const token = req.headers['x-seed-token'];
      const expectedToken = process.env.SEED_TOKEN || 'temp-seed-20260202';
      if (!token || token !== expectedToken) return json(res, 401, { error: 'unauthorized' });

      const body = (await readJson(req)) || {};
      const project = body.project || null;
      const items = Array.isArray(body.items) ? body.items : [];
      const links = Array.isArray(body.links) ? body.links : [];

      const created = { items: 0, links: 0, project: 0 };
      const updated = { items: 0, links: 0, project: 0 };
      const warnings = [];

      if (!project || !project.id || !project.name) {
        warnings.push('project_missing_or_invalid');
      }

      if (!dryRun) {
        if (project && project.id) {
          if (!mem.project || mem.project.id !== project.id) created.project += 1;
          else updated.project += 1;
          mem.project = { ...project, updatedAt: new Date().toISOString() };
        }

        for (const it of items) {
          if (!it || !it.id) {
            warnings.push('item_missing_id');
            continue;
          }
          if (mem.items.has(it.id)) updated.items += 1;
          else created.items += 1;
          mem.items.set(it.id, { ...it, updatedAt: new Date().toISOString() });
        }

        for (const lk of links) {
          if (!lk || !lk.id) {
            warnings.push('link_missing_id');
            continue;
          }
          if (mem.links.has(lk.id)) updated.links += 1;
          else created.links += 1;
          mem.links.set(lk.id, { ...lk, updatedAt: new Date().toISOString() });
        }

        auditLog('seed:apply', role, { created, updated });
      }

      return json(res, 200, { applied: !dryRun, dryRun, created, updated, warnings });
    }

    // GET /api/items
    if (req.method === 'GET' && req.url === '/api/items') {
      const role = getRole(req);
      if (!can(role, 'items:read')) return json(res, 403, { error: 'forbidden' });
      return json(res, 200, {
        project: mem.project,
        items: Array.from(mem.items.values()),
        links: Array.from(mem.links.values()),
      });
    }

    // GET /api/audit
    if (req.method === 'GET' && req.url === '/api/audit') {
      const role = getRole(req);
      if (!can(role, 'audit:read')) return json(res, 403, { error: 'forbidden' });
      return json(res, 200, { items: mem.audit.slice(-200) });
    }

    // POST /v1/projects
    if (req.method === 'POST' && req.url === '/v1/projects') {
      const role = getRole(req);
      if (!can(role, 'projects:write')) return json(res, 403, { error: 'forbidden' });

      const body = (await readJson(req)) || {};
      const name = typeof body.name === 'string' && body.name.trim() ? body.name.trim() : null;
      if (!name) return json(res, 400, { error: 'invalid_request', message: 'name is required' });

      const project = { id: id('prj'), name, createdAt: new Date().toISOString() };

      const client = await pgClient();
      if (client) {
        await client.query('insert into projects(id, name) values ($1, $2)', [project.id, project.name]);
      } else {
        mem.projects.set(project.id, project);
      }

      auditLog('projects:create', role, { projectId: project.id, name: project.name });
      return json(res, 201, project);
    }

    // GET /v1/projects
    if (req.method === 'GET' && req.url === '/v1/projects') {
      const role = getRole(req);
      if (!can(role, 'projects:read')) return json(res, 403, { error: 'forbidden' });

      const client = await pgClient();
      if (client) {
        const r = await client.query('select id, name, created_at from projects order by created_at desc');
        return json(res, 200, {
          items: r.rows.map((x) => ({ id: x.id, name: x.name, createdAt: x.created_at })),
        });
      }

      return json(res, 200, { items: Array.from(mem.projects.values()) });
    }

    return json(res, 404, { error: 'not_found' });
  } catch (e) {
    return json(res, 500, { error: 'internal_error', message: String(e?.message || e) });
  }
});

server.listen(port, '0.0.0.0', () => {
  console.log(JSON.stringify({ level: 'info', msg: 'listening', port }));
});
