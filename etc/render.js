'use strict';

module.exports = {
  target: 'node',
  entry: require.resolve('../lib/shim'),
  output: require('./partials/output').render,
  context: require('./partials/context').default,
  resolve: require('./partials/resolve').render,
  externals: [require('webpack-node-externals')()],
  module: {
    rules: [
      require('./partials/babel').default,
      require('./partials/postcss').render,
      require('./partials/json').default,
      require('./partials/file').default,
      require('./partials/url').default
    ]
  },
  devtool: '#inline-source-map'
};
