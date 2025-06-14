// vite.sw.config.ts For making a service worker(js) with Vite
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    rollupOptions: {
      input: 'src/service-worker.ts',
      output: {
        entryFileNames: 'service-worker.js',
        format: 'commonjs'
      },
    },
    target: 'esnext',
  }
})
