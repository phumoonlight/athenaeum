import { nextJsConfig } from '@repo/eslint-config/next-js'

export default [
  ...nextJsConfig,
  {
    files: ['**/*.ts', '**/*.tsx', '*.js', '*.mjs'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'off',
      'semi': ['error', 'never'],
      'arrow-parens': ['error', 'always'],
      'quotes': ['error', 'single'],
      'react-hooks/exhaustive-deps': 'off'
    },
  },
]
