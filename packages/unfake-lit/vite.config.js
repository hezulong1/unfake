import { defineConfig } from 'vite';
import { peerDependencies } from './package.json';

export default defineConfig({
  root: __dirname,
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
