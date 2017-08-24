module.exports = {
  plugins: ["react"],
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
    mocha: true
  },
  extends: ["eslint:recommended", "plugin:react/all"],
  parserOptions: {
    sourceType: "module"
  },
  rules: {
    "react/jsx-indent": ["warn", 2],
    "react/jsx-no-literals": "off",
    "react/no-set-state": "off",
    "react/jsx-max-props-per-line": ["error", { "maximum": 3 }],
    "react/no-unused-prop-types": "off",
    "react/require-optimization": "off",
    "react/jsx-no-bind": "off",
    "react/jsx-filename-extension": "off",
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"],
    semi: ["error", "never"],
    "no-unused-vars": ["warn"],
    "no-console": 0
  },
  globals: {
    "sinon": true,
    "expect": true,
    "proxyquire": true
  }
};
