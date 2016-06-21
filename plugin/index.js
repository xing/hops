/**
 * @file plugin/index
 *
 * @author Daniel Dembach <daniel@dmbch.net>
 * @author Gregor Adams <greg@pixelass.com>
 */

var fs = require('fs');
var path = require('path');
var util = require('util');

var webpack = require('webpack');
var MemoryFS = require('memory-fs');
var ejs = require('ejs');

var helpers = require('../config/helpers');
var pkg = require('../package.json');

/** @ignore */
function evaluate(fileContent, funcName) {
  try {
    Object.keys(require.cache).forEach(function(key) {
      delete require.cache[key];
    });
    // eslint-disable-next-line no-eval
    return eval(util.format(
      '(function () { %s; return %s.default || %s; })()',
      fileContent.toString(), funcName, funcName
    ));
  }
  catch (e) {
    return function () { return Promise.reject(e); };
  }
}

/** @ignore */
function createRenderer(options) {
  return Promise.resolve().then(function () {
    return new Promise(function (resolve, reject) {
      var mfs = new MemoryFS();
      var config = require(options.config);
      var compiler = webpack(config);
      compiler.outputFileSystem = mfs;
      compiler.run(function(compilerError) {
        if (compilerError) { reject(compilerError); }
        else {
          var filePath = path.join(config.output.path, config.output.filename);
          mfs.readFile(filePath, function (readFileError, fileContent) {
            if (readFileError) { reject(readFileError); }
            else { resolve(evaluate(fileContent, config.output.library)); }
          });
        }
      });
    });
  });
}

/** @ignore */
function getAssetPaths(assets, pfx) {
  return function (ext) {
    var regexp = new RegExp(util.format('^(?!(%s)).+\\.%s(?:\\?|$)', pfx, ext));
    return Object.keys(assets).filter(function (key) {
      return key.search(regexp) > -1;
    });
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
function getAssetObject(string) {
  return {
    source: function() { return string; },
    size: function() { return string.length; }
  };
}

/**
 * @description creates hops webpack plugin instance
 *
 * @class
 * @param {?Object}   options
 * @param {?string[]} options.locations
 * @param {?string}   options.template
 * @param {?string}   options.config
 * @param {?string}   options.chunkPrefix
 */
function Plugin(options) { this.options = options; }

/**
 * @description augments compilation options with global and instance defaults
 *
 * @private
 *
 * @param {?Object}   options
 * @param {?string[]} options.locations
 * @param {?string}   options.template
 * @param {?string}   options.config
 * @param {?string}   options.chunkPrefix
 * @param {?string}   options.dllPath
 * @param {?string}   options.dllFile
 * @param {?string[]} options.css
 * @param {?string[]} options.js
 * @return {Object}
 */
Plugin.prototype.getOptions = function (options) {
  return Object.assign(
    {
      locations: ['/'],
      template: path.resolve(__dirname, './template.ejs'),
      config: helpers.resolve('webpack.node.js'),
      chunkPrefix: 'chunk-',
      css: [],
      js: []
    },
    this.options,
    options
  );
};

/**
 * @description hooks into webpack compiler lifecycle and produce html
 *
 * @private
 *
 * @param {!Object} compiler
 * @return {undefined}
 */
Plugin.prototype.apply = function(compiler) {
  var getOptions = this.getOptions.bind(this);
  compiler.plugin('emit', function(compilation, callback) {
    var options = getOptions(compilation.options.hops);
    var renderEJS = ejs.compile(fs.readFileSync(options.template, 'utf-8'));
    var getPaths = getAssetPaths(compilation.assets, options.chunkPrefix);
    createRenderer(options)
    .then(function (renderReact) {
      return Promise.all(options.locations.map(function (location) {
        return renderReact(location, options)
        .then(function (result) {
          var html = renderEJS(Object.assign({}, options, result, {
            js: options.js.concat(getPaths('js').filter(function (jsPath) {
              return jsPath !== options.dllPath;
            })),
            css: options.css.concat(getPaths('css'))
          }));
          compilation.assets[getFileName(location)] = getAssetObject(html);
        });
      }));
    }) // eslint-disable-next-line no-console
    .catch(console.log.bind(console, '[HOPS PLUGIN ERROR]:'))
    .then(function () { callback(); });
  });
};

/** @ignore */
Plugin.getAssetPaths = getAssetPaths;

/** @ignore */
Plugin.getFileName = getFileName;

module.exports = Plugin;
