import { fileURLToPath } from 'node:url'
import { resolve, dirname } from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Specific config for building web components
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  css: {
    // Make sure styles are properly processed and inlined
    modules: {
      scopeBehaviour: 'local'
    },
  },
  build: {
    outDir: 'dist/web-components',
    lib: {
      entry: resolve(__dirname, 'src/styles.js'),
      name: 'ReactWebComponents',
      formats: ['es', 'umd'],
      fileName: (format) => `react-web-components.${format}.js`,
    },
    cssCodeSplit: false, // Don't split CSS across chunks
    rollupOptions: {
      // Make sure all CSS is included in the bundle
      output: {
        inlineDynamicImports: true,
      }
    },
  },
}) 