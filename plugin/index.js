
var fs = require('fs');
var path = require('path');
var querystring = require('querystring');

var ejs = require('ejs');
var shell = require('shelljs');
var escape = require('shell-escape');

function renderLocation(location, options) {
  return Promise.resolve()
  .then(function () {
    return new Promise(function (resolve, reject) {
      shell.exec(
        escape(['node', options.entry, location, JSON.stringify(options)]),
        {
          silent: true,
          env: Object.assign({}, process.env, {'BABEL_ENV': 'node'})
        },
        function(code, stdout, stderr) {
          if (code === 0) { resolve(JSON.parse(stdout)); }
          else { reject(stderr); }
        }
      );
    });
  });
}

function getFileName(location) {
  var parts = location.split('/').filter(function (part) {
    return !!part.length;
  });
  if (!parts.length || parts[parts.length - 1].indexOf('.') === -1) {
    parts.push('index.html');
  }
  return path.join.apply(path, parts);
}

function getBabelIgnore(options) {
  var config = options.module.loaders.find(function (conf) {
    return (conf.loader === 'babel' || conf.loaders.indexOf('babel') !== -1);
  });
  if (config && config.exclude) {
    return config.exclude;
  }
  else {
    return /node_modules\//;
  }
}

function getLocalIdentName(options) {
  var indexMemo;
  var config = options.module.loaders.find(function (conf) {
    return (conf.loaders && conf.loaders.find(
      function (loader, index) {
        indexMemo = index;
        return !loader.indexOf('css?');
      }
    ));
  });
  if (config) {
    var query = querystring.parse(
      config.loaders[indexMemo].substr(4)
    );
    if (query && query.localIdentName) {
      return query.localIdentName;
    }
  }
  return '[path][name]-[local]-[hash:base64:5]';
}

function getOpts(options, compilationOptions) {
  var opts = Object.assign(
    {
      babelIgnore: getBabelIgnore(compilationOptions),
      localIdentName: getLocalIdentName(compilationOptions)
    },
    options
  );
  opts.babelIgnore = opts.babelIgnore.toString();
  return opts;
}

function Plugin(options) {
  this.options = Object.assign(
    {
      locations: ['/'],
      template: path.resolve(__dirname, './template.ejs')
    },
    options
  );
  this.render = ejs.compile(
    fs.readFileSync(this.options.template, 'utf-8')
  );
}

Plugin.prototype.apply = function(compiler) {
  var self = this;
  compiler.plugin('emit', function(compilation, callback) {
    var opts = getOpts(self.options, compilation.options);
    Promise.all(opts.locations.map(function (location) {
      return renderLocation(location, opts)
      .then(function (result) {
        var html = self.render(Object.assign({}, opts, result));
        compilation.assets[getFileName(location)] = {
          source: function() { return html; },
          size: function() { return html.length; }
        };
      })
      .catch(self.options.debug ? shell.echo : function () {});
    }))
    .then(function () { callback(); });
  });
};

Plugin.getFileName = getFileName;
Plugin.getBabelIgnore = getBabelIgnore;
Plugin.getLocalIdentName = getLocalIdentName;

module.exports = Plugin;
