const { defaults } = require('jest-config');

module.exports = {
  moduleNameMapper: {
    '^.+\\.(png|gif|jpe?g|webp|html|svg|((o|t)tf)|woff2?|ico)$':
      'jest-preset-hops/mocks/file.js',
    '^.+\\.tpl$': 'jest-preset-hops/mocks/tpl.js',
    '^.+\\.css$': 'identity-obj-proxy',
  },
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  transform: {
    '^.+\\.(js|jsx|mjs)$': 'jest-preset-hops/transforms/babel.js',
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.(gql|graphql)$': 'jest-preset-hops/transforms/graphql.js',
  },
  transformIgnorePatterns: [],
  setupFiles: ['regenerator-runtime/runtime'],
  // fixes: https://github.com/facebook/jest/issues/6766
  testURL: 'http://localhost',
};
