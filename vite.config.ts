import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

// Zwei Builds (siehe DECISIONS.md D-010):
// - Standard (GitHub Pages): Code-Splitting, jede Sprache ein eigener Chunk → schneller Start.
// - --mode artifact: alles in einer Datei für claude.ai (dist-artifact/index.html).

/** Schreibt die Liste aller erzeugten Dateien in den Service Worker, damit die App vollständig offline läuft. */
function precacheList(): Plugin {
  let files: string[] = [];
  let outDir = 'dist';
  return {
    name: 'polyglot-precache',
    apply: 'build',
    configResolved(c) { outDir = c.build.outDir; },
    generateBundle(_, bundle) { files = Object.keys(bundle); },
    closeBundle() {
      const sw = join(outDir, 'sw.js');
      if (!existsSync(sw)) return;
      const list = ['./', './index.html', './manifest.webmanifest', './icon.svg', './icon-180.png', './icon-192.png', './icon-512.png',
        ...files.filter((f) => f !== 'index.html').map((f) => './' + f)];
      const version = files.filter((f) => f.endsWith('.js')).map((f) => f.replace(/.*-([\w-]+)\.js$/, '$1')).sort().join('').slice(0, 24) || String(Date.now());
      let s = readFileSync(sw, 'utf8');
      s = s.replace(/const CACHE = '[^']*';/, `const CACHE = 'polyglot-${version}';`);
      s = s.replace(/const FILES = \[[^\]]*\];/, `const FILES = ${JSON.stringify(list)};`);
      writeFileSync(sw, s);
    },
  };
}

export default defineConfig(({ mode }) => {
  const artifact = mode === 'artifact';
  return {
    base: './',
    plugins: artifact ? [react(), viteSingleFile()] : [react(), precacheList()],
    build: { target: 'es2019', outDir: artifact ? 'dist-artifact' : 'dist', copyPublicDir: !artifact },
    test: { environment: 'jsdom', include: ['tests/**/*.test.ts'] },
  } as any;
});
