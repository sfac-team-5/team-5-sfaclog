module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@next/next/core-web-vitals',
    'plugin:tailwindcss/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'react/react-in-jsx-scope': 'off', //jsx파일에서 React를 import 하지 않아도 됨.
    'no-unused-vars': 'off', //타입스크립트 사용시 interface의 변수명을 eslint가 잡지 않도록 함.
    '@typescript-eslint/no-unused-vars': 'warn', // 대신 사용하지 않는 변수는 @typescript/eslint를 통해 잡아줌.
    'react/require-default-props': 'off',
    'no-underscore-dangle': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@next/next/no-img-element': 'off', // Image가 아닌 img 태그 사용 시 경고
    // '@typescript-eslint/interface-name-prefix': 'off',
    // '@typescript-eslint/explicit-function-return-type': 'off',
    // '@typescript-eslint/explicit-module-boundary-types': 'off',
    'tailwindcss/no-custom-classname': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
