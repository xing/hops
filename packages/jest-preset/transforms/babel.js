var babelJest = require('babel-jest');

module.exports = babelJest.createTransformer({
  presets: [
    [
      '@babel/preset-env',
      {
        modules: 'commonjs',
        useBuiltIns: 'usage',
        targets: { node: 'current' },
        corejs: 2,
      },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    require.resolve('../helpers/babel-plugin-import-component'),
    require.resolve('@babel/plugin-transform-flow-strip-types'),
    require.resolve('babel-plugin-dynamic-import-node'),
    require.resolve('@babel/plugin-proposal-class-properties'),
    require.resolve('@babel/plugin-proposal-object-rest-spread'),
  ],
  babelrc: false,
});
