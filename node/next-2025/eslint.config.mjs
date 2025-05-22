import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.config({
    extends: ['next/core-web-vitals', 'next/typescript'],
    rules: {
      '@next/next/no-img-element': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      'no-unused-vars': 'off',
      'semi': ['error', 'never'],
      'react-hooks/exhaustive-deps': 'off',
      'jsx-quotes': ['error', 'prefer-double'],
      'quotes': ['error', 'single'],
      'arrow-parens': ['error', 'always'],
      'prefer-template': 'error',
      'prefer-arrow-callback': 'error',
    },
  }),
]

export default eslintConfig
