import { cp, mkdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './check.mjs';

// Static staging only. This command never commits, uploads or publishes.
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const output = resolve(root, 'review/site');
await mkdir(output, { recursive: true });
for (const file of ['index.html', 'legacy.html', 'foto.jpg', 'curriculo.pdf', 'v2']) {
  await cp(resolve(root, file), resolve(output, file), { recursive: true });
}
console.log(`PASS: build estático preparado em ${output}`);
