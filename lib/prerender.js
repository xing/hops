
var path = require('path');
var fs = require('fs');

var mkdirp = require('mkdirp');

var config = require('../lib/config');

require('babel-register')({
  ignore: config.noBabel
});

require('css-modules-require-hook')({
  generateScopedName: config.cssName
});

var renderUrl = require(config.appRoot);
if (renderUrl.__esModule) { // eslint-disable-line no-underscore-dangle
  renderUrl = renderUrl.default;
}
if (typeof renderUrl !== 'function') {
  renderUrl = function () {
    return Promise.reject(new Error('invalid render function'));
  };
}

function getFileName(url, distDir) {
  var segments = url.split('/').filter(function(segment) {
    return segment.length;
  });
  if (!segments.length || segments[segments.length - 1].indexOf('.') === -1) {
    segments.push('index.html');
  }
  segments.unshift(distDir);
  return path.join.apply(path, segments);
}

function renderShells() {
  config.shells.forEach(function(url) {
    var fileName = getFileName(url, config.distDir);
    renderUrl(url).then(function(body) {
      mkdirp(path.dirname(fileName), function(err) {
        if (err) { throw err; }
        else {
          fs.writeFile(fileName, body);
        }
      });
    })
    .catch(function(err) {
       /* eslint-disable no-console */
      console.error(err);
      console.trace();
      /* eslint-enable no-console */
    });
  });
}

module.exports.renderUrl = renderUrl;
module.exports.renderShells = renderShells;

if (require.main === module) {
  renderShells();
}
