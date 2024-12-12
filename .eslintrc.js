module.exports = {
  extends: [
    'next',
    'eslint:recommended',
    'plugin:react/recommended',
    // add other config as needed
  ],
  rules: {
    'react/no-unescaped-entities': 'off', // Disables the rule for unescaped entities
    '@typescript-eslint/no-unused-vars': 'off', // Disables unused vars warnings
    '@typescript-eslint/no-explicit-any': 'off', // Disables the explicit `any` type warning
    'react-hooks/exhaustive-deps': 'warn', // Only warn for missing dependencies
  },
};
