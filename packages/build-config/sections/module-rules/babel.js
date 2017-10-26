'use strict';

var hopsConfig = require('hops-config');

function createIdentifier (targets) {
  return JSON.stringify({
    env: process.env.NODE_ENV + ',' + process.env.BABEL_ENV,
    version: require('../../package.json').version,
    targets: targets
  });
}

function getBabelLoader (targets, plugins) {
  return {
    test: /\.m?jsx?$/,
    use: {
      loader: require.resolve('babel-loader'),
      options: {
        cacheDirectory: true,
        cacheIdentifier: createIdentifier(targets),
        presets: [
          [
            'env',
            {
              modules: false,
              useBuiltIns: true,
              targets: targets
            }
          ],
          'react'
        ],
        plugins: [].concat(plugins || [], [
          require.resolve('babel-plugin-flow-react-proptypes'),
          require.resolve('babel-plugin-transform-class-properties'),
          require.resolve('babel-plugin-transform-object-rest-spread')
        ])
      }
    },
    include: require('../../lib/check-esnext')
  };
}

exports.default = getBabelLoader(
  { browsers: hopsConfig.browsers },
  require.resolve('babel-plugin-syntax-dynamic-import')
);

exports.node = getBabelLoader(
  { node: hopsConfig.node },
  require.resolve('babel-plugin-dynamic-import-node')
);
