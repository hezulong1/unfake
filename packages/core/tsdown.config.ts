import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: {
    'index': 'index.ts',
    'logic': 'src/logic/index.ts',
    'browser': 'src/browser/index.ts',
  },
  dts: true,
  format: ['esm'],
  exports: true,
  clean: true,
  deps: {
    skipNodeModulesBundle: true,
  },
});
