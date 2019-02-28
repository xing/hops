var babelJest = require('babel-jest');

module.exports = babelJest.createTransformer({
  presets: [
    [
      '@babel/preset-env',
      {
        modules: 'commonjs',
        useBuiltIns: 'usage',
        targets: { node: 'current' },
      },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    [
      require.resolve('@untool/react/lib/babel'),
      { module: 'hops', resolveAbsolutePaths: true },
    ],
    require.resolve('@babel/plugin-transform-flow-strip-types'),
    require.resolve('babel-plugin-dynamic-import-node'),
    require.resolve('@babel/plugin-proposal-class-properties'),
    require.resolve('@babel/plugin-proposal-object-rest-spread'),
  ],
  babelrc: false,
});
