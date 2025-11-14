/*
 * Root ESLint configuration for the ZeaZChain monorepo.
 */
module.exports = {
  root: true,
  env: {
    es2022: true,
    node: true,
    jest: true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'jsx-a11y', 'import'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier'
  ],
  settings: {
    react: {
      version: 'detect'
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  },
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always'
      }
    ],
    'react/prop-types': 'off'
  },
  overrides: [
    {
      files: ['apps/miniapp/**/*.{ts,tsx}'],
      env: {
        browser: true
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      rules: {
        'react/react-in-jsx-scope': 'off'
      }
    },
    {
      files: ['**/*.spec.{ts,tsx}'],
      env: {
        jest: true
      }
    }
  ],
  ignorePatterns: [
    'node_modules',
    'dist',
    'build',
    '.expo',
    '.turbo',
    'coverage',
    '**/*.d.ts'
  ]
};
