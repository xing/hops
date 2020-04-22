const babelJest = require('babel-jest');

const babelConfig = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: 'commonjs',
        useBuiltIns: 'usage',
        targets: { node: 'current' },
        corejs: 3,
      },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    require.resolve('../helpers/babel-plugin-rename-corejs'),
    require.resolve('../helpers/babel-plugin-import-component'),
    require.resolve('@babel/plugin-transform-flow-strip-types'),
    require.resolve('@babel/plugin-proposal-class-properties'),
  ],
  babelrc: false,
};

module.exports = babelJest.createTransformer(babelConfig);
module.exports.babelConfig = babelConfig;
