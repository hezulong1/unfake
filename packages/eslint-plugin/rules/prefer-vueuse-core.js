const messageId = 'preferVueuseCore';

export default {
  meta: {
    hasSuggestions: true,
    fixable: 'code',
    messages: {
      [messageId]: 'Use `@vueuse/core` instead of.',
    },
  },
  /**
   * @param { import('eslint').Rule.RuleContext } context
   * @return { import('eslint').Rule.RuleListener }
   */
  create(context) {
    const filename = context.filename;
    // 跳过检查 TS 声明文件
    const isDts = filename.endsWith('.d.ts') || filename.endsWith('.d.cts') || filename.endsWith('.d.mts');

    if (isDts) return {};

    function verify(source) {
      if (source?.value !== '@vueuse/shared') return;

      context.report({
        node: source,
        messageId,
        fix: fixer => fixer.replaceTextRange([source.range[0] + 1, source.range[1] - 1], '@vueuse/core'),
      });
    }

    return {
      // import defaultImport from '@vueuse/shared';
      // import { named } from '@vueuse/shared';
      // import { named as alias } from '@vueuse/shared';
      // import * as namespace from '@vueuse/shared';
      // import defaultImport, { named } from '@vueuse/shared';
      // import '@vueuse/shared';
      ImportDeclaration(node) {
        verify(node.source);
      },
      // import('@vueuse/shared');
      // const module = import('@vueuse/shared');
      ImportExpression(node) {
        verify(node.source);
      },
      // export { foo } from '@vueuse/shared';
      ExportNamedDeclaration(node) {
        verify(node.source);
      },
      // export * from '@vueuse/shared';
      ExportAllDeclaration(node) {
        verify(node.source);
      },
      // const shared = require('@vueuse/shared');
      // const { a } = require('@vueuse/shared');
      // require('@vueuse/shared');
      CallExpression(node) {
        if (node.callee.type === 'Identifier' && node.callee.name === 'require') {
          const [arg] = node.arguments;
          if (arg?.type === 'Literal') {
            verify(arg);
          }
        }
      },
    };
  },
};
