import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import { peerDependencies } from './package.json'

export default defineConfig({
  root: __dirname,
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  build: {
    lib: {
      entry: ['./index.ts'],
      formats: ['es'],
    },
    rollupOptions: {
      external: Object.keys(peerDependencies),
    },
    minify: false,
  },
});
