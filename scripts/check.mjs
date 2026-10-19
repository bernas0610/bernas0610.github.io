import { readFile, access } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const original = {
  'legacy.html': 'c496173315ee6a85d12f94993eb2d2e0a8bf35f418912a4632e88a6590b15ee6',
  'foto.jpg': '70cd09024b26971521cb5569e49c7487de95118a6524d4305ef65bc95a6d25ad',
  'curriculo.pdf': 'b3c8c8fb877adf485ec740e8ec719b980ca9473684c34258732f643b5c1389ca'
};
for (const [file, expected] of Object.entries(original)) {
  const actual = createHash('sha256').update(await readFile(resolve(root, file))).digest('hex');
  if (actual !== expected) throw new Error(`Original alterado: ${file}`);
}
console.log('PASS: HTML, foto e currículo originais preservados (SHA-256).');
for (const page of ['index.html', 'v2/index.html']) {
const html = await readFile(resolve(root, page), 'utf8');
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
if (new Set(ids).size !== ids.length) throw new Error('IDs duplicados');
let local = 0;
for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
  const url = match[1];
  if (/^(https?:|mailto:|data:)/.test(url)) continue;
  if (url.startsWith('#')) {
    if (!ids.includes(url.slice(1))) throw new Error(`Âncora inválida: ${url}`);
  } else {
    await access(resolve(root, dirname(page), url));
  }
  local++;
}
for (const match of html.matchAll(/<img\b[^>]*>/g)) {
  if (!/\balt="[^"]+"/.test(match[0])) throw new Error('Imagem sem texto alternativo');
  if (!/\bwidth=/.test(match[0]) || !/\bheight=/.test(match[0])) throw new Error('Imagem sem dimensões');
}
if ([...html.matchAll(/<h1\b/g)].length !== 1) throw new Error('Esperado um único h1');
console.log(`PASS: ${page}: ${local} referências locais, IDs únicos, imagens com alt/dimensões e h1 único.`);
if (page === 'index.html' && /noindex/.test(html)) throw new Error('Página publicada bloqueada para indexação');
}
for (const file of ['v2/app.js', 'v2/theme.js', 'scripts/check.mjs', 'scripts/build.mjs']) {
  const result = spawnSync(process.execPath, ['--check', resolve(root, file)], { encoding: 'utf8' });
  if (result.status !== 0) throw new Error(result.stderr);
}
console.log('PASS: verificação sintática JavaScript em todos os scripts.');
