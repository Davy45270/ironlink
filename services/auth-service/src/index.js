import http from 'node:http';

const port = process.env.PORT ? Number(process.env.PORT) : 3001;

const server = http.createServer((req, res) => {
  if (req.url === '/healthz') {
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ ok: true, service: 'auth-service' }));
    return;
  }

  res.writeHead(404, { 'content-type': 'application/json' });
  res.end(JSON.stringify({ error: 'not_found' }));
});

server.listen(port, '0.0.0.0', () => {
  // JSON structured log
  console.log(JSON.stringify({ level: 'info', msg: 'listening', port }));
});
