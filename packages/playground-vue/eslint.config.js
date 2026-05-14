import globals from 'globals';
import h21 from 'eslint-config-h21';
import { configs } from 'eslint-plugin-unfake';

export default h21({
  globals: {
    ...globals.node,
    ...globals.es2025,
    ...globals.browser,
  },
  style: {
    overrides: {
      '@stylistic/jsx-one-expression-per-line': [2, { allow: 'non-jsx' }],
    },
  },
  jsx: true,
  ts: true,
  vue: true,
}).append(configs['recommended']);
