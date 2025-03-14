import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { peerDependencies } from './package.json'

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
  ],
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
