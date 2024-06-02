import esbuild from 'rollup-plugin-esbuild';
import alias from '@rollup/plugin-alias';
import dts from 'rollup-plugin-dts';
import { resolve } from './scripts/helper.js';

const pluginEsbuild = esbuild();
const pluginDts = dts();
const pluginAlias = alias({
  entries: [
    { find: /^@\/(.*)/, replacement: resolve('src/$1.ts') },
  ],
});

const outputs = {
  'index': 'src/browser/index.ts',
  'logic': 'src/common/logic/index.ts',
  'base': 'src/common/base.ts',
  'timer': 'src/common/timer.ts',
  // Framework
  'lit': 'src/lit/index.ts',
  'vue': 'src/vue/index.ts',
};

const externals = [
  '@vueuse/core',
  'vue',
  'lit',
];

const configs = [];

for (const [exportName, dirSrc] of Object.entries(outputs)) {
  configs.push({
    input: resolve(dirSrc),
    output: [
      { file: `dist/${exportName}.esm.js`, format: 'es' },
      { file: `dist/${exportName}.cjs.js`, format: 'cjs' },
    ],
    external: [
      ...externals,
    ],
    plugins: [
      pluginAlias,
      pluginEsbuild,
    ],
  }, {
    input: dirSrc,
    output: [
      { file: `dist/${exportName}.d.ts` },
    ],
    external: [
      ...externals,
    ],
    plugins: [
      pluginAlias,
      pluginDts,
    ],
  });
}

export default configs;
