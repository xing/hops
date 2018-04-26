const path = require('path');
const fs = require('fs');

let stats;
function getStatsFromFile(buildDir) {
  if (!stats) {
    const statsFilename = path.join(buildDir, 'stats.json');
    if (fs.existsSync(statsFilename)) {
      stats = require(statsFilename);
    }
  }
  return stats || {};
}

exports.createRewriteMiddleware = config => (req, res, next) => {
  if (process.env.HOPS_MODE === 'static' && Array.isArray(config.locations)) {
    const location = config.locations.find(function(location) {
      return (
        location !== config.basePath + '/' && req.url.indexOf(location) === 0
      );
    });
    if (location) {
      req.url = location.replace(/([^\\/])$/, '$1/');
    }
  }
  next();
};

exports.createAssetsMiddleware = config => (req, res, next) => {
  res.locals = res.locals || {};
  res.locals.hops = {
    stats: res.locals.webpackStats
      ? res.locals.webpackStats.toJson()
      : getStatsFromFile(config.buildDir),
  };
  const entrypoints = res.locals.hops.stats.entrypoints || {};
  const assets = Object.keys(entrypoints).reduce(
    (allAssets, name) => allAssets.concat(entrypoints[name].assets || []),
    []
  );

  res.locals.hops.assets = assets.reduce(
    (byType, asset) => {
      if (asset.indexOf('.hot-update.js') > 0) {
        return byType;
      }
      const type = path.extname(asset).slice(1);
      byType[type] = (byType[type] || []).concat('/' + asset);
      return byType;
    },
    { js: [], css: [] }
  );

  next();
};

exports.createTimingsMiddleware = config => {
  if (config.enableServerTimings) {
    return require('server-timings');
  }
  return (req, res, next) => {
    res.locals.timings = { start: () => {}, end: () => {} };
    next();
  };
};

exports.createCompressionMiddleware = config => {
  if (config.compress) {
    return require('compression')(
      typeof config.compress !== 'boolean' ? config.compress : {}
    );
  }
  return (req, res, next) => next();
};
