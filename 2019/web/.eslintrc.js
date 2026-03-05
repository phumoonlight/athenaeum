module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: "airbnb",
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: "module"
  },
  plugins: ["react"],
  rules: {
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/anchor-is-valid": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "semi": "off",
    "no-underscore-dangle": "off",
  }
};
