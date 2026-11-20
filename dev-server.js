/**
 * Local development server.
 *
 * Serves the portfolio statically and mounts the real api/contact.js handler
 * on /api/contact, so the contact form can be exercised end to end locally
 * instead of failing against a static-only preview.
 *
 *   npm run dev          -> http://localhost:8080
 *   PORT=3000 npm run dev
 *
 * SMTP settings are read from .env (gitignored). Nothing is sent anywhere
 * unless the form is actually submitted.
 */

const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

const ROOT = __dirname;
const PORT = Number(process.env.PORT || 8080);

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
  '.pdf': 'application/pdf'
};

// --- .env ------------------------------------------------------------------
// A tiny parser keeps this dependency-free. Values are taken verbatim after
// the first "=", so "Portfolio <someone@gmail.com>" survives intact.
function loadEnv(file) {
  let raw;
  try {
    raw = fs.readFileSync(file, 'utf8');
  } catch {
    return false;
  }

  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const separator = trimmed.indexOf('=');
    if (separator === -1) continue;

    const key = trimmed.slice(0, separator).trim();
    let value = trimmed.slice(separator + 1).trim();

    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    if (key && !(key in process.env)) process.env[key] = value;
  }
  return true;
}

const hasEnv = loadEnv(path.join(ROOT, '.env'));

// --- the contact endpoint --------------------------------------------------
const contactHandler = require(path.join(ROOT, 'api', 'contact.js'));

/** Wraps node's response in the small surface Vercel gives a serverless function. */
function createFunctionResponse(res) {
  const api = {
    statusCode: 200,
    status(code) { api.statusCode = code; return api; },
    json(body) {
      res.writeHead(api.statusCode, { 'content-type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify(body));
      return api;
    },
    send(text) {
      res.writeHead(api.statusCode, { 'content-type': 'text/plain; charset=utf-8' });
      res.end(text);
      return api;
    },
    setHeader(name, value) { res.setHeader(name, value); return api; },
    redirect(code, location) {
      res.writeHead(code, { location });
      res.end();
      return api;
    },
    end() { res.end(); return api; }
  };
  return api;
}

async function handleContact(req, res) {
  let raw = '';
  for await (const chunk of req) raw += chunk;

  let body = {};
  const contentType = req.headers['content-type'] || '';

  try {
    if (contentType.includes('application/json')) {
      body = JSON.parse(raw);
    } else if (contentType.includes('application/x-www-form-urlencoded')) {
      body = Object.fromEntries(new URLSearchParams(raw));
    }
  } catch {
    body = {};
  }

  const request = { method: req.method, headers: req.headers, body };
  await contactHandler(request, createFunctionResponse(res));
}

// --- live reload -----------------------------------------------------------
// The browser polls for a fingerprint of the source files and reloads when
// they change, so editing CSS or HTML still updates the page automatically.
function sourceFingerprint() {
  const hash = crypto.createHash('sha1');
  const folders = ['css', 'js', 'data'];

  for (const folder of folders) {
    const directory = path.join(ROOT, folder);
    if (!fs.existsSync(directory)) continue;
    for (const name of fs.readdirSync(directory).sort()) {
      const file = path.join(directory, name);
      try {
        const stats = fs.statSync(file);
        hash.update(`${name}:${stats.size}:${stats.mtimeMs}`);
      } catch { /* file changed while reading — ignore */ }
    }
  }

  for (const name of ['index.html', 'projects.html']) {
    const file = path.join(ROOT, name);
    try {
      const stats = fs.statSync(file);
      hash.update(`${name}:${stats.size}:${stats.mtimeMs}`);
    } catch { /* ignore */ }
  }

  return hash.digest('hex').slice(0, 12);
}

const RELOAD_SNIPPET = `
<script>
(function () {
  var last = null;
  setInterval(function () {
    fetch('/__dev-check')
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (last && data.hash !== last) { location.reload(); }
        last = data.hash;
      })
      .catch(function () {});
  }, 900);
})();
</script>
`;

function injectReload(html) {
  if (html.includes('</body>')) return html.replace('</body>', `${RELOAD_SNIPPET}</body>`);
  return html + RELOAD_SNIPPET;
}

// --- static files ----------------------------------------------------------
function serveStatic(req, res, pathname) {
  const relative = decodeURIComponent(pathname).replace(/^\/+/, '');
  let filePath = path.join(ROOT, relative);

  // Never serve anything outside the project folder.
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403, { 'content-type': 'text/plain; charset=utf-8' });
    res.end('Forbidden');
    return;
  }

  let stats = null;
  try {
    stats = fs.statSync(filePath);
  } catch {
    stats = null;
  }

  if (stats && stats.isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      res.writeHead(404, { 'content-type': 'text/html; charset=utf-8' });
      res.end(`<!doctype html><meta charset="utf-8"><title>404</title>
        <h1>404 — not found</h1><p><a href="/">Back to the portfolio</a></p>`);
      return;
    }

    const extension = path.extname(filePath).toLowerCase();

    if (extension === '.html') {
      res.writeHead(200, {
        'content-type': MIME['.html'],
        // Always serve the newest file, so a refresh shows the latest edit.
        'cache-control': 'no-store'
      });
      res.end(injectReload(data.toString('utf8')));
      return;
    }

    res.writeHead(200, {
      'content-type': MIME[extension] || 'application/octet-stream',
      'cache-control': 'no-store'
    });
    res.end(data);
  });
}

// --- server ----------------------------------------------------------------
const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');

  if (url.pathname === '/api/contact') {
    try {
      await handleContact(req, res);
    } catch (error) {
      console.error('Contact endpoint error:', error);
      if (!res.headersSent) {
        res.writeHead(500, { 'content-type': 'application/json' });
        res.end(JSON.stringify({ ok: false, message: 'The contact form could not be reached.' }));
      }
    }
    return;
  }

  if (url.pathname === '/__dev-check') {
    res.writeHead(200, { 'content-type': 'application/json', 'cache-control': 'no-store' });
    res.end(JSON.stringify({ hash: sourceFingerprint() }));
    return;
  }

  serveStatic(req, res, url.pathname === '/' ? '/index.html' : url.pathname);
});

server.listen(PORT, () => {
  console.log(`\n  Portfolio running at http://localhost:${PORT}`);
  console.log(`  Contact form: POST http://localhost:${PORT}/api/contact`);
  console.log(`  Health check: GET  http://localhost:${PORT}/api/contact`);
  console.log(hasEnv
    ? '  SMTP settings loaded from .env\n'
    : '  No .env found - the contact form will report that it is not configured.\n');
});
