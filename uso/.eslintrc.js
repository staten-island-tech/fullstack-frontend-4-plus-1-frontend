module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  globals: {
    Howler: false,
    Howl: false,
    createjs: false,
    ProgressBar: false,
    kd: false,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
  },
  extends: ['@nuxtjs', 'plugin:nuxt/recommended', 'prettier'],
  plugins: [],
  // add your custom rules here
  rules: {
    'vue/multi-word-component-names': 'off',
    'no-console': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/multiline-html-element-content-newline': 'off',
  },
  ignorePatterns: ['static/*'],
};
