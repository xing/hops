const { defaults } = require('jest-config');

module.exports = {
  moduleNameMapper: {
    '^.+\\.(png|gif|jpe?g|webp|html|svg|((o|t)tf)|woff2?|ico)$': require.resolve(
      './mocks/file.js'
    ),
    '^.+\\.tpl$': require.resolve('./mocks/tpl.js'),
    '^.+\\.css(\\?global)?$': require.resolve('identity-obj-proxy'),
    '^hops$': require.resolve('./mocks/hops.js'),
  },
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  testMatch: [
    ...defaults.testMatch,
    '**/__tests__/**/*.ts?(x)',
    '**/?(*.)+(spec|test).ts?(x)',
  ],
  transform: {
    '^.+\\.(js|jsx|mjs)$': require.resolve('./transforms/babel.js'),
    '^.+\\.(ts|tsx)$': require.resolve('ts-jest'),
    '^.+\\.(gql|graphql)$': require.resolve('./transforms/graphql.js'),
  },
  transformIgnorePatterns: [],
  setupFiles: [require.resolve('regenerator-runtime/runtime')],
  // fixes: https://github.com/facebook/jest/issues/6766
  testURL: 'http://localhost',
};
