'use strict';

var postcss = require('postcss');
var autoprefixer = require('autoprefixer');
var isSupported = require('caniuse-api').isSupported;
var camelize = require('camelize');

var features = [
  ['css-variables', 'postcss-custom-properties'],
  ['css-image-set', 'postcss-image-set-polyfill'],
  'postcss-nesting',
  'postcss-custom-media',
  'postcss-media-minmax',
  'postcss-custom-selectors',
  ['css-case-insensitive', 'postcss-attribute-case-insensitive'],
  ['css-rebeccapurple', 'postcss-color-rebeccapurple'],
  'postcss-color-hwb',
  'postcss-color-hsl',
  'postcss-color-rgb',
  'postcss-color-gray',
  ['css-rrggbbaa', 'postcss-color-hex-alpha'],
  'postcss-color-function',
  'postcss-font-family-system-ui',
  'postcss-font-variant',
  ['css-all', 'css-initial-value', 'postcss-initial'],
  ['css-matches-pseudo', 'postcss-selector-matches'],
  ['css-not-sel-list', 'postcss-selector-not'],
  'postcss-pseudo-class-any-link',
  ['wordwrap', 'postcss-replace-overflow-wrap']
];

module.exports = postcss.plugin('postcss-necsst', function (options) {
  var processor = postcss();
  features.forEach(function (feature) {
    var conditions = [].concat(feature);
    feature = conditions.pop();
    if (!conditions.length || conditions.find(function (condition) {
      return !isSupported(condition, options.browsers);
    })) {
      processor.use(require(feature)(
        options[camelize(feature.replace(/^postcss-/, ''))]
      ));
    }
  });
  processor.use(
    autoprefixer(Object.assign(
      options.browsers ? { browsers: options.browsers } : {},
      options.autoprefixer
    ))
  );
  return processor;
});
