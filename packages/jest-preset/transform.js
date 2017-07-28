var babelJest = require('babel-jest');

// eslint-disable-next-line import/no-internal-modules
var hopsBabelConfig = require('hops-config/loaders/babel').node.use.options;

// presets look like this
// we try to figure out at which position "env" is and and set modules to "commonjs" to transpile import statements in jest

// presets: [
//   [
//     'env',
//     {
//       modules: false,
//       useBuiltIns: true,
//       targets: targets
//     }
//   ],
//   'react'
// ]

var envConfig = hopsBabelConfig.presets.find(function (preset) {
  return Array.isArray(preset) && preset[0] === 'env' && preset[1]
});

if (envConfig) {
  envConfig[1].modules = 'commonjs';
}

module.exports = babelJest.createTransformer({
  presets: hopsBabelConfig.presets,
  plugins: hopsBabelConfig.plugins,
  babelrc: false
});
