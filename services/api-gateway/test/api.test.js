import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import { spawn } from 'node:child_process';

const port = 13100;
const base = `http://127.0.0.1:${port}`;

function request(path, opts = {}) {
  return new Promise((resolve, reject) => {
    const req = http.request(
      `${base}${path}`,
      { method: opts.method || 'GET', headers: opts.headers || {} },
      (res) => {
        let data = '';
        res.on('data', (c) => (data += c));
        res.on('end', () => resolve({ status: res.statusCode, data }));
      }
    );
    req.on('error', reject);
    if (opts.body) req.write(opts.body);
    req.end();
  });
}

test('GET /healthz', async () => {
  const child = spawn('node', ['src/index.js'], { env: { ...process.env, PORT: String(port) } });
  await new Promise((r) => setTimeout(r, 300));

  const res = await request('/healthz');
  assert.equal(res.status, 200);
  const body = JSON.parse(res.data);
  assert.equal(body.ok, true);

  child.kill();
});

test('POST /api/seed + GET /api/items', async () => {
  const child = spawn('node', ['src/index.js'], { env: { ...process.env, PORT: String(port), SEED_TOKEN: 'test-token' } });
  await new Promise((r) => setTimeout(r, 300));

  const seed = {
    project: { id: 'p1', name: 'proj', statuses: ['todo', 'doing', 'done'] },
    items: [{ id: 'i1', type: 'story', title: 'Hello', status: 'todo' }],
    links: [],
  };

  const seedRes = await request('/api/seed?dryRun=false', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-seed-token': 'test-token', 'x-role': 'admin' },
    body: JSON.stringify(seed),
  });

  assert.equal(seedRes.status, 200);

  const itemsRes = await request('/api/items', { headers: { 'x-role': 'qa' } });
  assert.equal(itemsRes.status, 200);
  const items = JSON.parse(itemsRes.data);
  assert.equal(items.items.length, 1);
  assert.equal(items.project.id, 'p1');

  child.kill();
});


test('v1 CRUD items', async () => {
  const base = process.env.API_BASE || 'http://localhost:13000';
  const headers = { 'content-type': 'application/json', 'x-role': 'admin' };

  // create
  let res = await fetch(`${base}/v1/items`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ title: 'Test item', type: 'task', status: 'todo' }),
  });
  assert.equal(res.status, 201);
  const created = await res.json();
  assert.ok(created.id);

  // get
  res = await fetch(`${base}/v1/items/${created.id}`, { headers: { 'x-role': 'admin' } });
  assert.equal(res.status, 200);

  // patch
  res = await fetch(`${base}/v1/items/${created.id}`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({ title: 'Test item updated', priority: 'high' }),
  });
  assert.equal(res.status, 200);

  // delete
  res = await fetch(`${base}/v1/items/${created.id}`, { method: 'DELETE', headers: { 'x-role': 'admin' } });
  assert.equal(res.status, 204);
});
