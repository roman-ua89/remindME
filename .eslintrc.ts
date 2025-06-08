module.exports = {
    // Tells ESLint to stop searching for configuration files in parent directories.
    root: true,
    parser: '@typescript-eslint/parser',
    // An array of pre-configured rule sets. Order is important.
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'next/core-web-vitals', // Or 'next' if you don't need core-web-vitals
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:jsx-a11y/recommended',
        'prettier', // Keep this last to disable formatting rules
    ],
    plugins: ['@typescript-eslint', 'react', 'react-hooks', 'jsx-a11y', 'prettier'],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    rules: {
        // Add or override rules here.  Examples:
        'no-unused-vars': 'warn', // Or 'error'
        'react/prop-types': 'off', // TypeScript handles prop types
        'prettier/prettier': 'error', // Enforce Prettier formatting as an ESLint rule
        'react/react-in-jsx-scope': 'off', // Not needed with Next.js
        'jsx-a11y/anchor-is-valid': 'off', // Often not applicable in Next.js
        '@typescript-eslint/explicit-function-return-type': 'off', // Optional: Can enforce return types on functions
    },
    settings: {
        react: {
            version: 'detect', // Automatically detect React version
        },
    },
};
