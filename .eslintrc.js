module.exports = {
  extends: [
    'eslint-config-airbnb-base',
  ],
  env: {
    browser: true,
    node: true,
  },
  rules: {
    'linebreak-style': ['error', 'windows'],
    'import/extensions': [2, 'always'],
  },
};
