
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

var render = require(config.appRoot);
if (render.__esModule) { // eslint-disable-line no-underscore-dangle
  render = render.default;
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

function copyServiceWorkerToDist() {
  if (config.serviceWorkerFile) {

    const source = path.resolve(config.appRoot, config.serviceWorkerFile);
    const dest = path.resolve(config.distDir, config.serviceWorker);
    mkdirp(path.dirname(dest), function(err) {
      if (err) {
        throw err;
      }
      else {
        fs.createReadStream(source).pipe(fs.createWriteStream(dest));
      }
    });
  }
}

function renderShells() {
  config.shells.forEach(function(url) {
    var fileName = getFileName(url, config.distDir);
    render(url).then(function(body) {
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

function runTask() {
  copyServiceWorkerToDist();
  renderShells();
}

module.exports = runTask;

if (require.main === module) {
  runTask();
}
