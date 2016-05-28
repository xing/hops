
var path = require('path');

var shell = require('shelljs');
var escape = require('shell-escape');

function renderLocation(location, options) {
  return new Promise(function (resolve, reject) {
    shell.exec(
      escape(['node', options.entry, location, JSON.stringify(options)]),
      {
        silent: true,
        env: Object.assign({}, process.env, {'BABEL_ENV': 'node'})
      },
      function(code, stdout, stderr) {
        if (code === 0) { resolve(stdout); }
        else { reject(stderr); }
      }
    );
  });
}

var getFileName = function (location) {
  var parts = location.split('/').filter(function (part) {
    return !!part.length;
  });
  var length = parts.length;
  if (!length || parts[length - 1].indexOf('.') === -1) {
    parts.push('index.html');
  }
  return path.join.apply(path, parts);
};

function Plugin(options) {
  this.options = options || { locations: []};
}

Plugin.prototype.apply = function(compiler) {
  var options = this.options;
  compiler.plugin('emit', function(compilation, callback) {
    Promise.all(options.locations.map(function (location) {
      return renderLocation(location, options)
      .then(function (body) {
        compilation.assets[getFileName(location)] = {
          source: function() { return body; },
          size: function() { return body.length; }
        };
      });
    }))
    .then(function () { callback(); })
    .catch(function () {
      shell.echo.apply(shell, arguments);
      callback();
    });
  });
};

module.exports = Plugin;
