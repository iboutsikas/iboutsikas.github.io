import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: '@iboutsikas/router',
      fileName: 'router',
      formats: ['es'],
    },
    outDir: 'dist',
  },
});
