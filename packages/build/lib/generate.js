'use strict';

var fs = require('fs');
var path = require('path');

var index = require('directory-index');
var filesize = require('filesize');
var mkdirp = require('mkdirp');

var hopsConfig = require('hops-config');

var createRenderer = require('./renderer');

function getFileName(location) {
  return path.join.apply(
    path,
    [hopsConfig.buildDir].concat(index(location).split(path.sep))
  );
}

function writeFile(location, html) {
  return new Promise(function(resolve, reject) {
    var filename = getFileName(location);
    console.log(
      filename.replace(hopsConfig.buildDir, ''),
      filesize(Buffer.byteLength(html))
    );
    mkdirp(path.dirname(filename), function(err) {
      if (err) {
        reject(err);
      } else {
        fs.writeFile(filename, html, function(err) {
          err ? reject(err) : resolve();
        });
      }
    });
  });
}

module.exports = function(webpackConfig) {
  var render = createRenderer(webpackConfig);
  return Promise.all(
    (hopsConfig.locations || []).map(function(location) {
      return render(location).then(function(html) {
        if (html) {
          return writeFile(location, html);
        }
      });
    })
  ).then(function() {
    console.log(/* empty line */);
  });
};
