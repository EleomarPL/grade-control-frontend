module.exports = {
  'rules': {
    'react/jsx-curly-spacing': ['error', { 'when': 'always', 'children': true }],
    'react/jsx-equals-spacing': ['error', 'never'],
    'react/jsx-indent': [2, 2, {'indentLogicalExpressions': true}],
    'react/jsx-props-no-multi-spaces': 'error',
    'react/jsx-max-props-per-line': ['error', { 'maximum': 2 }],
    'react/jsx-tag-spacing': ['error', { 'beforeSelfClosing': 'always' }],
     
    'react/button-has-type': 'error',
    'indent': ['error', 2],
    'linebreak-style': ['error', 'windows'],
    'quotes': ['error', 'single'],
    'camelcase': 'error',
    'no-unused-vars': 'warn',
    'no-extra-parens': 'error',
    'space-before-function-paren': ['error', 'never'],
    'keyword-spacing': 'error',
    'eqeqeq': 'error',
    'space-infix-ops': 'error',
    'comma-spacing': 'error',
    'brace-style': 'error',
    'handle-callback-err': 'error',
    'comma-dangle': 'error',
    'comma-style': 'error',
    'dot-location': 'error',
    'key-spacing': 'error',
    'no-const-assign': 'error',
    'no-multi-spaces': 'error',
    'no-whitespace-before-property': 'error',
    'no-trailing-spaces': ['error', {'skipBlankLines': true}],
    'space-before-blocks': 'error',
    'arrow-spacing': 'error',
    'block-spacing': 'warn',
    'multiline-ternary': ['error', 'always-multiline'],
    'semi': ['error', 'always']
  },
  'env': {
    'es6': true,
    'browser': true,
    'node': true
  },
  'parserOptions': {
    'ecmaVersion': 2020,
    'sourceType': 'module',
    'ecmaFeatures': {
      'jsx': true
    }
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly'
  },
  'plugins': [
    'react'
  ]
};