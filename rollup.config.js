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
  'shared': 'src/shared.ts',
  'logic': 'src/logic/index.ts',
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
      { file: `out/${exportName}.esm.js`, format: 'es' },
      { file: `out/${exportName}.cjs.js`, format: 'cjs' },
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
      { file: `out/${exportName}.d.ts` },
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
