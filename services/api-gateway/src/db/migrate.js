import { Client } from 'pg';
import fs from 'node:fs';
import path from 'node:path';

const sqlPath = new URL('./schema.sql', import.meta.url);
const sql = fs.readFileSync(sqlPath, 'utf8');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

await client.connect();
await client.query(sql);
await client.end();
console.log(JSON.stringify({ level: 'info', msg: 'migrations_applied' }));
