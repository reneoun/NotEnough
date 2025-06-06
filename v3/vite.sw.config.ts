// vite.sw.config.ts
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    outDir: 'public',
    emptyOutDir: false,
    rollupOptions: {
      input: 'src/service-worker.ts',
      output: {
        entryFileNames: 'service-worker.js',
        format: 'iife',
      },
    },
    target: 'esnext',
    lib: {
      entry: 'src/service-worker.ts',
      name: 'ServiceWorker',
      formats: ['iife'],
      fileName: () => 'service-worker.js',
    },
  }
})
