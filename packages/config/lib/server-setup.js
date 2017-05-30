var createMiddleware = require('hops-middleware');
var hopsConfig = require('..');

module.exports = function setup (watchOptions) {
  return function (app) {
    var webpackConfig = require(hopsConfig.renderConfig);
    var middleware = createMiddleware(webpackConfig, watchOptions);
    if (hopsConfig.locations.length) {
      app.use(function (req, res, next) {
        for (var i = 0; i < hopsConfig.locations.length; i++) {
          var location = hopsConfig.locations[i];
          if (location !== '/' && req.url.indexOf(location) === 0) {
            req.url = location;
            break;
          }
        }
        next();
      });
      hopsConfig.locations.forEach(function (location) {
        app.get(location === '/' ? location : location + '*', middleware);
      });
    } else {
      app.all('*', middleware);
    }
  };
};
