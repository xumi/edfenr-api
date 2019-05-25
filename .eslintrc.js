module.exports = {
  root: true,
  env:  {
    commonjs: true,
    es6:      true,
    node:     true,
  },
  extends: [
    'eslint:recommended',
  ],
  parser:        'babel-eslint',
  parserOptions: {
    ecmaVersion:                 2018,
    sourceType:                  'module',
    allowImportExportEverywhere: false,
    codeFrame:                   false,
    ecmaFeatures:                {
      impliedStrict: true,
      globalReturn:  false,
    },
  },
  plugins: [
    'babel',
  ],
  rules: {
    /* General
    -------------------------------------------------- */
    'no-console': 0,
    strict:       0, /* babel-eslint */

    /* Possible Errors
    -------------------------------------------------- */
    'valid-jsdoc': 0,

    /* Stylistic
    -------------------------------------------------- */
    'array-bracket-spacing':         [ 1, 'always' ],
    'block-spacing':                 1,
    'brace-style':                   1,
    'comma-dangle':                  [ 1, 'always-multiline' ],
    'comma-spacing':                 1,
    'comma-style':                   1,
    'computed-property-spacing':     [ 1, 'always' ],
    'eol-last':                      1,
    'func-call-spacing':             1,
    indent:                          [ 1, 2, { SwitchCase: 1, VariableDeclarator: { var: 2, let: 2, const: 3 } } ],
    'jsx-quotes':                    [ 1, 'prefer-single' ],
    'key-spacing':                   [ 1, { align: 'value' } ],
    'keyword-spacing':               1,
    'linebreak-style':               1,
    // 'lines-between-class-members:':       1,
    // 'multiline-comment-style':          [ 1, 'starred-block' ],
    'new-parens':                    1,
    'newline-before-return':         1,
    'no-lonely-if':                  1,
    'no-multi-assign':               1,
    'no-multiple-empty-lines':       [ 1, { max: 2, maxBOF: 1, maxEOF: 0 } ],
    'no-tabs':                       2,
    'no-trailing-spaces':            1,
    'no-unneeded-ternary':           1,
    'no-whitespace-before-property': 1,
    // 'object-curly-newline':             [ 1, { 'multiline': true } ],
    'object-property-newline':       [ 1, { allowAllPropertiesOnSameLine: true } ],
    'one-var':                       [ 1, 'never' ],
    'one-var-declaration-per-line':  [ 1, 'always' ],
    'operator-assignment':           1,
    'padded-blocks':                 [ 1, 'never' ],
    'quote-props':                   [ 1, 'as-needed' ],
    quotes:                          [ 1, 'single' ],
    // 'quotes':                           [ 1, 'single', { 'allowTemplateLiterals': true } ],
    'semi-spacing':                  1,
    'semi-style':                    1,
    'space-before-blocks':           1,
    'space-before-function-paren':   [ 1, 'never' ],
    'space-in-parens':               [ 1, 'always' ],
    'space-infix-ops':               1,
    'space-unary-ops':               1,
    'spaced-comment':                [ 1, 'always', { block: { balanced: true } } ],
    'switch-colon-spacing':          1,
    'template-tag-spacing':          1,
    'wrap-regex':                    1,

    /* Best Practices
    -------------------------------------------------- */
    curly:                          1,
    'dot-location':                 [ 1, 'property' ],
    'no-else-return':               1,
    'no-extra-bind':                1,
    'no-floating-decimal':          1,
    'no-useless-return':            1,
    'prefer-promise-reject-errors': 2,
    // 'no-multi-spaces':                  [ 1, { 'ignoreEOLComments': true, 'exceptions': { 'Property': true, 'VariableDeclarator': true, 'ImportDeclaration': true, } } ],
    yoda:                           1,

    /* Variables
    -------------------------------------------------- */
    'no-undef-init':  1,
    'no-unused-vars': 2,

    /* ECMAScript 6
    -------------------------------------------------- */
    'arrow-body-style':        1,
    'arrow-parens':            1,
    'arrow-spacing':           1,
    'generator-star-spacing':  1,
    'no-await-in-loop':        1,
    'no-useless-computed-key': 1,
    'no-useless-rename':       1,
    'no-var':                  1,
    'object-shorthand':        0, /* Needs to be investigated... */
    'prefer-arrow-callback':   [ 1, { allowNamedFunctions: true } ], /* Needs to be investigated... */
    'prefer-const':            1,
    'prefer-destructuring':    [ 1, { AssignmentExpression: { array: false, object: true }, VariableDeclarator: { array: false, object: true } } ],
    'prefer-numeric-literals': 1,
    'prefer-object-spread':    1,
    'prefer-rest-params':      1,
    'prefer-spread':           1,
    'prefer-template':         1,
    'rest-spread-spacing':     1,
    'template-curly-spacing':  [ 1, 'always' ],
    'yield-star-spacing':      1,

    /* Disable Corresponding Rules For Babel Versions Below */
    'new-cap':              0,
    'no-invalid-this':      0,
    'object-curly-spacing': 0,
    semi:                   0,

    /* Babel
    -------------------------------------------------- */
    'babel/new-cap':              1,
    'babel/no-invalid-this':      0,
    'babel/object-curly-spacing': [ 1, 'always', { arraysInObjects: true, objectsInObjects: true } ],
    'babel/semi':                 1,
  },
};
