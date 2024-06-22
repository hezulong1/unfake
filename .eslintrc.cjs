const pkg = require('./package.json');

const restricted = [
  {
    name: 'vue',
    importNames: ['MaybeRefOrGetter', 'toValue'],
  },
];

const dependencies = Object.keys(pkg.dependencies || {})
  .filter(pattern => ['vue', 'lit', '@vueuse/core'].includes(pattern))
  .map(pattern => ({ pattern, group: 'external', position: 'after' }));

module.exports = {
  root: true,
  extends: [
    'h21',
    'plugin:lit/recommended',
  ],
  rules: {
    'no-restricted-imports': [2, { paths: restricted }],
    'import/order': [2, {
      groups: ['type', 'builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'],
      pathGroups: [
        { pattern: 'vitest', group: 'builtin', position: 'after' },
        { pattern: 'vue', group: 'external', position: 'before' },
        { pattern: 'lit', group: 'external', position: 'before' },
        { pattern: '@vue/**', group: 'external', position: 'before' },
        { pattern: '@vueuse/**', group: 'external', position: 'before' },
        ...dependencies,
        { pattern: '@/**', group: 'internal', position: 'before' },
      ],
      pathGroupsExcludedImportTypes: ['type'],
    }],
  },
  overrides: [
    {
      files: ['rollup.config.js', 'vitest.config.ts'],
      rules: {
        'no-console': 0,
      },
    },
    {
      files: ['src/common/**/*'],
      rules: {
        'vue/prefer-import-from-vue': 0,
      },
    },
  ],
};
