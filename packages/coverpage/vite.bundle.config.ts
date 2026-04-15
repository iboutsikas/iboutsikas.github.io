import { defineConfig } from 'vite';
import { resolve } from 'path';

/**
 * Vite config for producing self-contained blog-friendly bundles.
 *
 * Outputs two files under dist/bundle/:
 *   - coverpage.esm.js   → <script type="module" src="coverpage.esm.js">
 *   - coverpage.iife.js  → <script src="coverpage.iife.js">
 *
 * Both files bundle lit + rxjs inline so the blog page needs no
 * package manager or build step — just drop in a script tag.
 *
 * Run: npm run build:bundle
 */
export default defineConfig({
  build: {
    outDir: 'dist/bundle',
    emptyOutDir: true,
    minify: 'esbuild',
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'IbCoverpage',   // global name for IIFE build
      formats: ['es', 'iife'],
      fileName: (format) => format === 'es' ? 'coverpage.esm.js' : 'coverpage.iife.js',
    },
    rollupOptions: {
      // No externals — bundle everything so the blog has zero deps.
      external: [],
    },
  },
});
