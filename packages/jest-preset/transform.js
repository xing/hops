var babelJest = require('babel-jest');

var loaderConfig = require('hops-config/loaders/babel').node;

var babelConfig = loaderConfig.use.options;

var presetEnvConfig = babelConfig.presets[0][1];

presetEnvConfig.modules = 'commonjs';

module.exports = babelJest.createTransformer({
  presets: babelConfig.presets,
  plugins: babelConfig.plugins,
  babelrc: false
});
