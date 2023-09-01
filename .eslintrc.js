module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
  ],
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'import'],
  rules: {
    'react/prop-types': 'off',
    '@typescript-eslint/object-curly-spacing': ['error', 'always'],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        groups: ['builtin', 'external', 'internal'],
      },
    ],
    'import/no-internal-modules': [
      'error',
      {
        allow: [
          '@testing-library/cypress/add-commands',
          'assets/styles/main.scss',
          'react-dom/client',
          'three/examples/jsm/loaders/STLLoader',
          '@mui/icons-material/Error',
          'lodash/*',
        ],
      },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
