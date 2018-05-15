var babelJest = require('babel-jest');

module.exports = babelJest.createTransformer({
  presets: [
    [
      'env',
      {
        modules: 'commonjs',
        useBuiltIns: true,
        targets: { node: 'current' },
      },
    ],
    'react',
  ],
  plugins: [
    require.resolve('babel-plugin-dynamic-import-node'),
    require.resolve('babel-plugin-transform-class-properties'),
    require.resolve('babel-plugin-transform-object-rest-spread'),
  ],
  babelrc: false,
});
