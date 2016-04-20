
var React = require('react');
var ReactDOM = require('react-dom/server');
var ReactRouter = require('react-router');
var ReactRedux = require('react-redux');

var config = require('./config');
var defaults = require('./defaults');

function match(options) {
  return new Promise(function(resolve, reject) {
    ReactRouter.match(
      {
        routes: options.routes,
        history: options.history,
        location: options.location
      },
      function(error, redirect, renderProps) {
        if (renderProps) {
          resolve(Object.assign(options, { renderProps: renderProps }));
        }
        else {
          reject(error, redirect);
        }
      }
    );
  });
}

function fetch(options) {
  var store = options.createStore(options.reducers, 0, 0, options.history);
  var dispatch = store.dispatch.bind(store);
  var components = options.renderProps.components;
  return Promise.all(components.map(function (component) {
    return component.fetchData ? component.fetchData(dispatch) : true;
  }))
  .then(function () {
    return Object.assign(options, { store: store });
  });
}

function render(options) {
  return config.render(Object.assign({}, options, {
    css: config.isProd ? config.bundleName : null,
    js: config.bundleName,
    sw: config.isProd ? config.workerName : null,
    state: options.store.getState(),
    body: ReactDOM.renderToString(
      React.createElement(ReactRedux.Provider, { store: options.store },
        React.createElement(ReactRouter.RouterContext, options.renderProps)
      )
    )
  }));
}

exports.render = function (overrides) {
  return function (location) {
    var options = Object.assign({}, defaults, overrides || {}, {
      history: ReactRouter.createMemoryHistory(location),
      location: location
    });
    return match(options).then(fetch).then(render);
  };
};

exports.middleware = function (req, res, next) {
  require('./render')(req.url)
  .then(function (html) { res.send(html); })
  .catch(function (error, redirect) {
    if (redirect) { res.redirect(redirect); }
    else { next(error); }
  });
};

Object.assign(exports, require('./components'), require('./store'));
