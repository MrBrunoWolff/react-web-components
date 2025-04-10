import { fileURLToPath } from 'node:url'
import { resolve, dirname } from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
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
  build: {
    lib: {
      // Set entry point for library build
      entry: resolve(__dirname, 'src/components/web-components.ts'),
      name: 'ReactWebComponents',
      // Output file formats
      formats: ['es', 'umd'],
      fileName: (format) => `react-web-components.${format}.js`,
    },
    rollupOptions: {
      // Remove external declarations to bundle React and ReactDOM
      output: {
        // Global variable names are still needed for UMD build
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
})
