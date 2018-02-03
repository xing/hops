var babelJest = require('babel-jest');

var loaderConfig = require('hops-build-config/sections/module-rules/babel');

var babelConfig = loaderConfig.node.options;

var presetEnvConfig = babelConfig.presets[0][1];

presetEnvConfig.modules = 'commonjs';

module.exports = babelJest.createTransformer({
  presets: babelConfig.presets,
  plugins: babelConfig.plugins,
  babelrc: false,
});
