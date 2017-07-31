var babelJest = require('babel-jest');

var hopsBabelConfig = require('hops-config/loaders/babel').node.use.options;

hopsBabelConfig.presets[0][1].modules = 'commonjs';

module.exports = babelJest.createTransformer({
  presets: hopsBabelConfig.presets,
  plugins: hopsBabelConfig.plugins,
  babelrc: false
});
