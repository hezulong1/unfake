import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import tanstackRouter from '@tanstack/router-plugin/vite';

export default defineConfig({
  publicDir: resolve(__dirname, '../../resources'),
  plugins: [
    tailwindcss(),
    tanstackRouter({
      routesDirectory: './src/pages',
      target: 'react',
      autoCodeSplitting: true,
    }),
    react(),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
});
