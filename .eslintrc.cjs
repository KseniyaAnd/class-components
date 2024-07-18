module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended', // Add React recommendations
    'plugin:prettier/recommended', // Prettier integration
  ],
  ignorePatterns: ['dist', 'node_modules', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: [
    'react-refresh',
    '@typescript-eslint', // TypeScript plugin
    'react', // React plugin
    'react-compiler', // React compiler plugin
    'prettier', // Prettier plugin
  ],
  settings: {
    react: {
      version: 'detect', // Automatically detect the React version
    },
  },
  rules: {
    // React Refresh rule
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    // TypeScript rules
    '@typescript-eslint/no-explicit-any': 'error', // Disallow `any` type
    '@typescript-eslint/explicit-module-boundary-types': 'off', // Optionally adjust this based on your preference
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }], // Handle unused variables

    // React and React Compiler rules
    'react/prop-types': 'off', // Turn off prop-types rule, we use TypeScript for this
    'react/react-in-jsx-scope': 'off', // Not needed for React 17+
    'react-hooks/rules-of-hooks': 'error', // Enforce the Rules of Hooks
    'react-hooks/exhaustive-deps': 'warn', // Verify the list of dependencies for Hooks
    'react-compiler/must-use-import': 'error', // Enforce import usage in JSX
    'react-compiler/must-use-property': 'error', // Enforce property usage in JSX

    // Prettier rule
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: true,
        tabWidth: 2,
        trailingComma: 'es5',
      },
    ],
  },
};
