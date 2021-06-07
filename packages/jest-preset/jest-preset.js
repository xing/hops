const colors = require('colors');
const importFrom = require('import-from');
const jestConfig = importFrom.silent(require.resolve('jest'), 'jest-config');
const [jestMajorVersion] = require('jest/package.json').version.split('.');

if (!jestConfig) {
  throw new Error(
    'Could not initialize jest-preset-hops. Jest Config is missing.'
  );
}

if (Number(jestMajorVersion) < 26) {
  console.error(
    colors.red(
      'Error: You are using an unsupported version of Jest! Please upgrade to Jest v26.'
    )
  );
}

const useEsbuild = process.env.USE_EXPERIMENTAL_ESBUILD === 'true';
const jsTransform = useEsbuild
  ? require.resolve('./transforms/esbuild.js')
  : require.resolve('./transforms/babel.js');
const tsTransform = useEsbuild
  ? require.resolve('./transforms/esbuild.js')
  : require.resolve('ts-jest');

module.exports = {
  globals: useEsbuild
    ? {}
    : {
        'ts-jest': {
          babelConfig: require('./transforms/babel.js').babelConfig,
        },
      },
  moduleNameMapper: {
    '^.+\\.(png|gif|jpe?g|webp|html|svg|((o|t)tf)|woff2?|ico)$':
      require.resolve('./mocks/file.js'),
    '^.+\\.tpl$': require.resolve('./mocks/tpl.js'),
    '^.+\\.css(\\?global)?$': require.resolve('identity-obj-proxy'),
    '^hops$': require.resolve('./mocks/hops.js'),
  },
  testMatch: [
    ...jestConfig.defaults.testMatch,
    '**/__tests__/**/*.ts?(x)',
    '**/?(*.)+(spec|test).ts?(x)',
  ],
  transform: {
    '^.+\\.(js|jsx|mjs)$': jsTransform,
    '^.+\\.(ts|tsx)$': tsTransform,
    '^.+\\.(gql|graphql)$': require.resolve('./transforms/graphql.js'),
  },
  transformIgnorePatterns: [],
  setupFiles: useEsbuild
    ? []
    : [require.resolve('regenerator-runtime/runtime')],
  // fixes: https://github.com/facebook/jest/issues/6766
  testURL: 'http://localhost',
  testEnvironment: 'jsdom',
};
