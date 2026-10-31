import { copyFile, mkdir } from 'node:fs/promises';
// GitHub Pages serves these real directories on refresh and direct navigation.
for (const route of ['about', 'archive']) {
  await mkdir(`dist/${route}`, { recursive: true });
  await copyFile('dist/index.html', `dist/${route}/index.html`);
}
