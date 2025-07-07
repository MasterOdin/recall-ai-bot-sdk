import importPlugin from 'eslint-plugin-import';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierPlugin from 'eslint-plugin-prettier/recommended';

export default tseslint.config(
  eslint.configs.recommended,
  importPlugin.flatConfigs.recommended,
  tseslint.configs.recommended,
  prettierPlugin,
  {
    rules: {
      'import/enforce-node-protocol-usage': ["error", "always"],
      'import/no-unresolved': 'off',
      'import/order': [
        'error',
        {
          alphabetize: { caseInsensitive: true, order: 'asc' },
          groups: [
            ['builtin', 'external'],
            'parent',
            'sibling',
            'index',
            'object',
          ],
          'newlines-between': 'always',
        },
      ],
      'sort-imports': [
        'error',
        { ignoreCase: true, ignoreDeclarationSort: true },
      ],
    },
  }
);
