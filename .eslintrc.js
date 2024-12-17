module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['react-app', 'react-app/jest'],
  plugins: ['simple-import-sort', 'import'],
  //   parserOptions: {
  //     ecmaVersion: "latest",
  //     sourceType: "module",
  //     project: ["./tsconfig.json"],
  //   },
  rules: {
    quotes: ['error', 'single', { allowTemplateLiterals: true, avoidEscape: true }],
    camelcase: ['warn', { properties: 'always' }],
    'simple-import-sort/imports': [
      'warn',
      {
        groups: [
          ['^\\u0000'], // Side effect
          ['^react'], // react packages
          ['^@\\w'], // scoped packages
          ['^'], // other third party packages
          ['^\\.'], // first party packages
        ],
      },
    ],
    'react-hooks/exhaustive-deps': [
      'warn',
      {
        additionalHooks: '(useWarnBeforeWindowClose)',
      },
    ],
  },
}
