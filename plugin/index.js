
var fs = require('fs');
var path = require('path');

var vm = require('vm');
var util = require('util');

var webpack = require('webpack');
var MemoryFS = require('memory-fs');
var ejs = require('ejs');

function createRenderer(options) {
  return Promise.resolve().then(function () {
    return new Promise(function (resolve, reject) {
      var mfs = new MemoryFS();
      var config = require(options.config);
      var compiler = webpack(config);
      compiler.outputFileSystem = mfs;
      compiler.run(function(compilerError) {
        if (compilerError) {
          reject(compilerError);
        }
        else {
          var filePath = path.join(config.output.path, config.output.filename);
          mfs.readFile(filePath, function (readFileError, fileContent) {
            if (readFileError) {
              reject(readFileError);
            }
            else {
              var script = vm.createScript(util.format(
                '(function () { %s; return %s; })()',
                fileContent.toString(),
                config.output.library
              ));
              resolve(script.runInNewContext({ require: require }));
            }
          });
        }
      });
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

function Plugin(options) {
  this.options = Object.assign(
    {
      locations: ['/'],
      template: path.resolve(__dirname, './template.ejs'),
      config: path.resolve(__dirname, '../etc/webpack.node')
    },
    options
  );
}

Plugin.prototype.apply = function(compiler) {
  var options = this.options;
  var renderHTML = ejs.compile(
    fs.readFileSync(this.options.template, 'utf-8')
  );
  var log = console.log.bind(console); // eslint-disable-line no-console
  compiler.plugin('emit', function(compilation, callback) {
    createRenderer(options)
    .then(function (renderReact) {
      return Promise.all(options.locations.map(function (location) {
        return renderReact(location, options)
        .then(function (result) {
          var html = renderHTML(Object.assign({}, options, result));
          compilation.assets[getFileName(location)] = {
            source: function() { return html; },
            size: function() { return html.length; }
          };
        });
      }));
    })
    .then(function () { callback(); })
    .catch(options.debug ? log : function () {});
  });
};

Plugin.getFileName = getFileName;

module.exports = Plugin;
