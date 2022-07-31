module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/standard'],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'space-before-blocks': 'off',
    'vue/multi-word-component-names': 'off',
    'space-before-function-paren': 'off',
    'lines-between-class-members': 'off',
    'no-unused-vars': 'off'
  }
}
