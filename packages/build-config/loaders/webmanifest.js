// taken from https://github.com/markdalgleish/web-app-manifest-loader
// because https://github.com/markdalgleish/web-app-manifest-loader/pull/2

var path = require('path');
var joinUrl = require('url-join');
var steed = require('steed');
var loaderUtils = require('loader-utils');

function resolveImageSrc(loaderContext, image, callback) {
  if (typeof image.src !== 'string') {
    return callback(
      new Error('Missing image "src" property in Web App Manifest')
    );
  }

  var dirname = path.dirname(loaderContext.resourcePath);
  var query = loaderUtils.getOptions(loaderContext) || {};
  var outputOptions = loaderContext._compilation
    ? loaderContext._compilation.outputOptions // webpack 4
    : loaderContext.options.output; // webpack 3
  var publicPath = query.publicPath || outputOptions.publicPath || '';

  // Resolve the image filename relative to the manifest file
  loaderContext.resolve(dirname, image.src, function(err, filename) {
    if (err) {
      return callback(err);
    }

    // Ensure Webpack knows that the image is a dependency of the manifest
    loaderContext.addDependency(filename);

    // Asynchronously pass the image through the loader pipeline
    loaderContext.loadModule(filename, function(err, source, map, module) {
      if (err) {
        return callback(err);
      }

      // Update the image src property to match the generated filename
      // Is it always the first key in the assets object?
      // module.buildInfo = webpack 4; module.assets = webpack 3
      var assets = module.buildInfo.assets || module.assets;
      image.src = joinUrl(publicPath, Object.keys(assets)[0]);

      callback(null);
    });
  });
}

function resolveImages(loaderContext, manifest, key, callback) {
  if (!Array.isArray(manifest[key])) {
    return callback(null);
  }

  steed.map(manifest[key], resolveImageSrc.bind(null, loaderContext), function(
    err
  ) {
    if (err) {
      return callback(err);
    }

    callback(null);
  });
}

module.exports = function(source) {
  var loaderContext = this;
  var callback = loaderContext.async();

  try {
    var manifest = JSON.parse(source);
  } catch (err) {
    return callback(new Error('Invalid JSON in Web App Manifest'));
  }

  steed.parallel(
    [
      resolveImages.bind(null, loaderContext, manifest, 'splash_screens'),
      resolveImages.bind(null, loaderContext, manifest, 'icons'),
    ],
    function(err) {
      if (err) {
        return callback(err);
      }

      callback(null, JSON.stringify(manifest, null, 2));
    }
  );
};
