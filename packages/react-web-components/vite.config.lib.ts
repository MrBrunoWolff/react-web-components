import { readdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import { scopedFlexLayoutStyles } from './vite.plugins';

const root = import.meta.dirname;
const manifest = JSON.parse(
  readFileSync(resolve(root, 'package.json'), 'utf8'),
);
const external = Object.keys({
  ...manifest.dependencies,
  ...manifest.peerDependencies,
});
const entries: Record<string, string> = {};
function collect(directory: string, prefix = '') {
  for (const file of readdirSync(directory, { withFileTypes: true })) {
    const name = `${prefix}${file.name}`;
    if (file.isDirectory()) collect(resolve(directory, file.name), `${name}/`);
    else if (
      /\.tsx?$/.test(name) &&
      !/\.(test|spec|d)\.tsx?$/.test(name) &&
      !['main.tsx', 'App.tsx', 'theme-entry.ts', 'TailwindTest.tsx'].includes(
        name,
      )
    ) {
      entries[name.replace(/\.tsx?$/, '')] = resolve(directory, file.name);
    }
  }
}
collect(resolve(root, 'src'));

export default defineConfig(({ mode }) => ({
  plugins: [scopedFlexLayoutStyles(), react(), tailwindcss()],
  resolve: { alias: { '@': resolve(root, 'src') } },
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    lib: {
      entry: entries,
      formats: [mode === 'commonjs' ? 'cjs' : 'es'],
      fileName: (format, name) => `${name}.${format === 'es' ? 'js' : 'cjs'}`,
    },
    rollupOptions: {
      external: (id) =>
        external.some((name) => id === name || id.startsWith(`${name}/`)),
      output: {
        banner: "'use client';",
        chunkFileNames: `chunks/[name]-[hash].${mode === 'commonjs' ? 'cjs' : 'js'}`,
      },
    },
  },
}));
