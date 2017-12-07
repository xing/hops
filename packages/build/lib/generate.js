'use strict';

var fs = require('fs');
var path = require('path');

var index = require('directory-index');
var mkdirp = require('mkdirp');

var hopsConfig = require('hops-config');
var createRenderer = require('hops-renderer');

function getFileName(location) {
  return path.join.apply(
    path,
    [hopsConfig.buildDir].concat(index(location).split(path.sep))
  );
}

function getKBs(s) {
  return ((encodeURI(s).split(/%..|./).length - 1) / 1024).toFixed(2);
}

function writeFile(location, html) {
  return new Promise(function(resolve, reject) {
    var filename = getFileName(location);
    console.log(filename.replace(hopsConfig.buildDir, ''), getKBs(html), 'kB');
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
    console.log();
  });
};
