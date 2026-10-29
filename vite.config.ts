import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

export default defineConfig({
  base: './',
  plugins: [react(), viteSingleFile()],
  build: { target: 'es2019', outDir: 'dist' },
  test: { environment: 'jsdom', include: ['tests/**/*.test.ts'] },
} as any);
