import { resolve } from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    lib: {
      entry: resolve(import.meta.dirname, 'src/theme-entry.ts'),
      formats: ['es'],
      fileName: () => 'theme-entry.js',
      cssFileName: 'theme',
    },
  },
});
