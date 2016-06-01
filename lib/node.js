/**
 * @module node
 * @exports render
 * @exports register
 * @author Somebody <somebody@foo.bar>
 */

var React = require('react');
var ReactDOM = require('react-dom/server');
var ReactRouter = require('react-router');
var ReactRedux = require('react-redux');

var defaults = require('./defaults');

/**
 * match options via router
 * @private
 * @param  {Object} options options to match
 * @return {Promise} returns a promise
 */
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

/**
 * fetch options from store
 * @private
 * @param  {Object} options options
 * @return {Promise} returns a promise
 */
function fetch(options) {
  var store = options.createStore(options);
  var dispatch = store.dispatch.bind(store);
  var components = options.renderProps.components;
  return Promise.all(components.map(function (component) {
    return component.fetchData ? component.fetchData(dispatch) : true;
  }))
  .then(function () {
    return Object.assign(options, { store: store });
  });
}

/**
 * server render function
 * @private
 * @param  {Object} options options
 * @return {Object} returns render object
 */
function render(options) {
  return {
    state: JSON.stringify(Object.assign(
      options.store.getState(),
      { routing: {}}
    )),
    dom: ReactDOM.renderToString(
      React.createElement(ReactRedux.Provider, { store: options.store },
        React.createElement(ReactRouter.RouterContext, options.renderProps)
      )
    )
  };
}


exports.render = function (overrides) {
  return function (location, tweaks) {
    var options = Object.assign({}, defaults, overrides, {
      history: ReactRouter.createMemoryHistory(location),
      location: location
    }, tweaks);
    return match(options).then(fetch).then(render);
  };
};

exports.register = require('./store').register;
