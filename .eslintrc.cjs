module.exports = {
  root: true,
  extends: 'h21',
  rules: {
    'import/order': [2, {
      groups: ['type', 'builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'],
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
