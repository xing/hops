const { getPackages } = require('@commitlint/config-lerna-scopes').utils;

module.exports = {
  extends: [
    '@commitlint/config-conventional',
    '@commitlint/config-lerna-scopes',
  ],
  rules: {
    'scope-enum': (context) =>
      getPackages(context).then((packages) => [
        2,
        'always',
        packages.map((p) => p.replace(/^hops-|-hops$/, '')),
      ]),
  },
};
