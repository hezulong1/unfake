import fs from 'node:fs';

import noNativePrivate from './rules/no-native-private.js';
import preferDayjs from './rules/prefer-dayjs.js';
import preferVueuseCore from './rules/prefer-vueuse-core.js';

const pkg = JSON.parse(
  fs.readFileSync(new URL('./package.json', import.meta.url)),
);

const rules = {
  'no-native-private': noNativePrivate,
  'prefer-dayjs': preferDayjs,
  'prefer-vueuse-core': preferVueuseCore,
};

export const NAMESPACE = pkg.name.slice(/* 'eslint-plugin-'.length */ 14);

export const plugin = {
  meta: {
    name: pkg.name,
    version: pkg.version,
    namespace: NAMESPACE,
  },
  rules,
  configs: {},
};

export const configs = {
  recommended: [
    {
      plugins: {
        unfake: plugin,
      },
      rules: Object.fromEntries(
        Object.entries(rules).map(([key]) => [`unfake/${ key }`, 1]),
      ),
    },
  ],
};

Object.assign(plugin.configs, configs);
