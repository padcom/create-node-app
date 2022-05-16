module.exports = {
  'env': {
    'es2021': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module'
  },
  'plugins': [
    '@typescript-eslint'
  ],
  'ignorePatterns': [
    '**/*.js'
  ],
  'rules': {
    '@typescript-eslint/ban-ts-comment': [ 'off' ],
    '@typescript-eslint/no-explicit-any': [ 'off' ],
    '@typescript-eslint/space-before-blocks': [ 'error' ],
    '@typescript-eslint/type-annotation-spacing': [ 'error' ],
    'array-element-newline': [ 'error', 'consistent' ],
    'array-bracket-newline': [ 'error', 'consistent' ],
    'array-bracket-spacing': [ 'error', 'always' ],
    'arrow-spacing': [ 'error', { before: true, after: true } ],
    'block-spacing': [ 'error' ],
    'comma-dangle': [ 'error', 'always-multiline' ],
    'comma-spacing': [ 'error', { before: false, after: true } ],
    'func-call-spacing': [ 'error', 'never' ],
    'indent': [ 'error', 2, { 'SwitchCase': 1 } ],
    'key-spacing': [ 'error', { beforeColon: false, afterColon: true, mode: 'strict' } ],
    'keyword-spacing': [ 'error' ],
    'linebreak-style': [ 'error', 'unix' ],
    'no-constant-condition': [ 'off' ],
    'no-lonely-if': [ 'error' ],
    'no-empty': [ 'warn' ],
    'no-whitespace-before-property': [ 'error' ],
    'object-curly-newline': [ 'error', { consistent: true } ],
    'object-curly-spacing': [ 'error', 'always'],
    'quotes': [ 'error', 'single' ],
    'semi': [ 'error', 'never' ],
    'semi-spacing': [ 'error', { before: false, after: true }],
    'space-before-blocks': [ 'error', { functions: 'always', keywords: 'always', classes: 'always' } ],
    'space-before-function-paren': [ 'error', { anonymous: 'always', named: 'never', asyncArrow: 'always' } ],
    'space-in-parens': [ 'error', 'never' ],
    'space-infix-ops': [ 'error' ],
    'space-unary-ops': [ 'error' ],
    'switch-colon-spacing': [ 'error' ],
  }
}
