import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: __dirname,
  resolve: {
    alias: {
      '@': resolve(__dirname, '..'),
    },
  },
  optimizeDeps: {
    include: ['lit'],
  },
});
