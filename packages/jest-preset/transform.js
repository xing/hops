var babelJest = require('babel-jest');

var hopsBabelConfig = require('hops-config/loaders/babel').node.use.options;

var envConfig = hopsBabelConfig.presets.find(function (preset) {
  return Array.isArray(preset) && preset[0] === 'env' && preset[1];
});

if (envConfig) {
  envConfig[1].modules = 'commonjs';
}

module.exports = babelJest.createTransformer({
  presets: hopsBabelConfig.presets,
  plugins: hopsBabelConfig.plugins,
  babelrc: false
});
