const messageId = 'preferDayjs';

export default {
  meta: {
    hasSuggestions: true,
    fixable: 'code',
    messages: {
      [messageId]: 'Import from \'{{replacement}}\' instead of \'{{identifier}}\'.',
    },
  },
  /**
   * @param { import('eslint').Rule.RuleContext } context
   * @return { import('eslint').Rule.RuleListener }
   */
  create(context) {
    function verify(source) {
      if (!source.value?.startsWith('dayjs/esm')) return;

      const removedToken = '/esm';
      const beginLength = 'dayjs'.length;

      context.report({
        node: source,
        messageId,
        data: {
          replacement: source.value.replace(new RegExp(removedToken, 'g'), ''),
          identifier: source.value,
        },
        fix(fixer) {
          const startIndex = source.range[0] + 1 + beginLength;
          return fixer.replaceTextRange([startIndex, startIndex + removedToken.length], '');
        },
      });
    }

    return {
      ImportDeclaration(node) {
        verify(node.source);
      },
      ExportNamedDeclaration(node) {
        verify(node.source);
      },
      ExportAllDeclaration(node) {
        verify(node.source);
      },
    };
  },
};
