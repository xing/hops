'use strict';

var hopsConfig = require('../..');

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
      loader: 'babel-loader',
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
          'flow-react-proptypes',
          'transform-class-properties',
          'transform-object-rest-spread'
        ])
      }
    },
    include: require('../../lib/check-esnext')
  };
}

exports.default = getBabelLoader(
  { browsers: hopsConfig.browsers },
  'syntax-dynamic-import'
);

exports.node = getBabelLoader(
  { node: 'current' },
  'dynamic-import-node'
);
