
module.exports = {
  extends: require.resolve('./etc/eslint'),
  env: {
    es6: false,
    node: true,
    browser: true
  },
  globals: {
    Promise: true
  }
};
