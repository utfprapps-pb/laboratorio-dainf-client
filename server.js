//Install express server
const express = require('express');
const path = require('path');
const fs = require('fs');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

const rawApiUrl = (process.env.API_URL || 'http://localhost:8080').trim();
let apiOrigin;
try {
  apiOrigin = new URL(rawApiUrl).origin;
} catch {
  apiOrigin = null;
}
const connectSrc = ["'self'", ...(apiOrigin ? [apiOrigin] : [])];

const app = express();
const port = process.env.PORT || 4200;

const appName = process.env.APP_NAME || 'tcc-client';
const distRoot = path.join(__dirname, 'dist');
const candidatePaths = [
  process.env.OUTPUT_PATH,
  path.join(distRoot, appName, 'browser'),
  path.join(distRoot, appName),
  path.join(distRoot, 'browser'),
  distRoot
].filter(Boolean);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  limit: 100, // limita request por IP
  standardHeaders: true, // Retorna info do rate limit no header `RateLimit-*`
  legacyHeaders: false, // Desabilita o header `X-RateLimit-*`
});

const outputPath = candidatePaths.find(p =>
  fs.existsSync(p) && fs.existsSync(path.join(p, 'index.html'))
);

if (!outputPath) {
  console.error(
    '❌ ERRO: Não foi possível localizar o diretório de build com um index.html válido.');
  console.error('Caminhos verificados:', candidatePaths);
  process.exit(1);
}
console.log(`✅ Serving files from: ${outputPath}`);

app.set('trust proxy', 1);
app.use(compression());
app.disable('x-powered-by');
console.log('✅ CSP connect-src is being set to:', connectSrc);
app.use(helmet({
  contentSecurityPolicy: {
    'useDefaults': true,
    directives: {
      "frameAncestors": ["'none'"],
      "connectSrc": connectSrc,
      "imgSrc": ["'self'", "blob:", "data:", "https://minio.app.pb.utfpr.edu.br"],
      "mediaSrc": ["'self'", "blob:", "https://minio.app.pb.utfpr.edu.br"],
    },
  },
}));

app.use(express.static(outputPath,
  {index: false, maxAge: '1y', immutable: true, etag: true}));
app.get('/*', limiter, function (req, res) {
  res.set('Cache-Control', 'no-store');
  res.sendFile(path.join(outputPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`✅ Server listening on ${port} | static: ${outputPath}`);
});

