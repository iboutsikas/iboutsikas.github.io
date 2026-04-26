import path from 'path';
/// <reference types="vitest" />
import { defineConfig, LibraryFormats } from 'vite';

export default defineConfig(() => ({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/packages/@iboutsikas/coverpage',
  plugins: [],
  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },
  build: {
    lib: {
      name: '@iboutsikas/coverpage',
      entry: path.resolve(__dirname, 'src/index.ts'),
      fileName: 'coverpage',
      formats: ['es'] as LibraryFormats[],
    },
    outDir: 'dist',
  },
  test: {
    name: '@iboutsikas/coverpage',
    watch: false,
    globals: true,
    environment: 'jsdom',
    include: ['tests/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
    coverage: {
      reportsDirectory: './test-output/vitest/coverage',
      provider: 'v8' as const,
    },
  },
  server: {
    host: true,
  },
}));
