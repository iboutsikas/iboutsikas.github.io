import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: '@iboutsikas/covepage',
      fileName: 'coverpage',
      formats: ['es'], // ES modules are best for Hugo
    },
    outDir: 'dist',
  },
});