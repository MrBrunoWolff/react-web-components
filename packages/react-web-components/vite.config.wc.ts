import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import { scopedFlexLayoutStyles } from './vite.plugins';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Specific config for building web components
export default defineConfig({
  define: { 'process.env.NODE_ENV': JSON.stringify('production') },
  plugins: [scopedFlexLayoutStyles(), react(), tailwindcss()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  css: {
    // Make sure styles are properly processed and inlined
    modules: {
      scopeBehaviour: 'local',
    },
  },
  build: {
    outDir: 'dist/web-components',
    emptyOutDir: false,
    lib: {
      entry: resolve(__dirname, 'src/styles.js'),
      name: 'ReactWebComponents',
      formats: ['es', 'umd'],
      fileName: (format) =>
        `react-web-components.${format === 'umd' ? 'umd.cjs' : 'es.js'}`,
    },
    cssCodeSplit: false, // Don't split CSS across chunks
  },
});
