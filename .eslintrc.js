module.exports = {
  parser: 'vue-eslint-parser',
  parserOptions: { parser: 'babel-eslint' },
  env: { node: true },
  globals: {
    gemini: 'readonly',
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended',
  ],
  rules: {
    'vue/no-confusing-v-for-v-if': 0,
    'vue/no-use-v-if-with-v-for': 0,
    'vue/attribute-hyphenation': ['error', 'always', { 'ignore': ['viewBox'] }],
  },
}
