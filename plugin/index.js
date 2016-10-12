/**
 * @file plugin/index
 *
 * @author Daniel Dembach <daniel@dmbch.net>
 * @author Gregor Adams <greg@pixelass.com>
 */
'use strict';

var fs = require('fs');
var path = require('path');

var ejs = require('ejs');
var appRoot = require('app-root-path');

var renderer = require('./renderer');

/** @ignore */
function getAssetPaths(assets, ext) {
  return Object.keys(assets).filter(function (key) {
    if (key.indexOf(ext) === (key.length - ext.length)) {
      return !key.match(/^((chunk-)|(.+hot-update)).+$/);
    }
    return false;
  });
}

/** @ignore */
function getAssetObject(string) {
  return {
    source: function() { return string; },
    size: function() { return string.length; }
  };
}

/** @ignore */
function processAssets(options, compilation) {
  var dllAssets = {};
  options.dll.forEach(function(dll) {
    var source = fs.readFileSync(dll.source);
    dllAssets[dll.path] = getAssetObject(source);
  });
  var allAssets = Object.assign(dllAssets, compilation.assets);
  function toPublic(relativePath) {
    return ((compilation.outputOptions.publicPath || '') + relativePath);
  }
  return {
    js: getAssetPaths(allAssets, 'js').map(toPublic),
    css: getAssetPaths(allAssets, 'css').map(toPublic),
    dll: dllAssets
  };
}

/** @ignore */
function getFileName(location) {
  var parts = location.split('/').filter(function (part) {
    return !!part.length;
  });
  if (!parts.length || parts[parts.length - 1].indexOf('.') === -1) {
    parts.push('index.html');
  }
  return path.join.apply(path, parts);
}

/** @ignore */
function getOptions() {
  var options = appRoot.require('./package.json').hops || {};
  if (options.config) {
    options.config = appRoot.resolve(options.config);
  }
  if (options.template) {
    options.template = appRoot.resolve(options.template);
  }
  return options;
}

/**
 * @description creates hops webpack plugin instance
 *
 * @class
 *
 * @param {?Object}   options
 * @param {?string[]} options.locations
 * @param {?string}   options.template
 * @param {?string}   options.config
 * @param {?Object[]} options.dll
 * @param {?string[]} options.css
 * @param {?string[]} options.js
 */
function Plugin(options) {
  this.options = Object.assign(
    {
      locations: ['/'],
      template: path.resolve(__dirname, './template.ejs'),
      config: null,
      dll: [],
      css: [],
      js: []
    },
    getOptions(),
    options
  );
}

/**
 * @description hooks into webpack compiler lifecycle and produce html
 *
 * @private
 *
 * @param {!Object} compiler
 * @return {undefined}
 */
Plugin.prototype.apply = function(compiler) {
  var options = this.options;
  compiler.plugin('emit', function(compilation, callback) {
    var assets = processAssets(options, compilation);
    var renderEJS = ejs.compile(fs.readFileSync(options.template, 'utf-8'));
    Object.assign(compilation.assets, assets.dll);
    renderer.createRenderer(options.config)
    .then(function (renderReact) {
      return Promise.all(options.locations.map(function (location) {
        return renderReact(location, options)
        .then(function (result) {
          var html = renderEJS(Object.assign({}, options, result, assets));
          compilation.assets[getFileName(location)] = getAssetObject(html);
        });
      }));
    })
    .catch(function (error) { // eslint-disable-next-line no-console
      if (error) { console.log('[HOPS PLUGIN ERROR]:', error); }
    })
    .then(function () { callback(); });
  });
};

/** @ignore */
Plugin.getAssetPaths = getAssetPaths;

/** @ignore */
Plugin.getFileName = getFileName;

module.exports = Plugin;
