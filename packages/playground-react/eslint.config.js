import globals from 'globals';
import h21 from 'eslint-config-h21';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { plugin } from 'eslint-plugin-unfake';

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
}).append(
  {
    name: 'unfake/setup',
    plugins: {
      unfake: plugin,
    },
    rules: {
      'unfake/no-native-private': 1,
    },
  },
  {
    name: 'custom/react',
    files: ['**/*.{ts,tsx}'],
    extends: [
      reactHooks.configs.flat.recommended,
    ],
  },
  {
    name: 'custom/react-refresh',
    files: ['**/components/ui/**/*.tsx'],
    extends: [
      reactRefresh.configs.recommended,
    ],
  },
);
