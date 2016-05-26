
var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var ReactRedux = require('react-redux');
var ReactHotLoader = require('react-hot-loader');

var defaults = require('./defaults');

exports.render = function (overrides) {
  return function () {
    var options = Object.assign({}, defaults, overrides);
    var store = options.createStore(options);
    var mountPoint = document.querySelector(options.mountPoint);
    ReactDOM.render(
      React.createElement(ReactHotLoader.AppContainer, {},
        React.createElement(ReactRedux.Provider, { store: store },
          React.createElement(ReactRouter.Router, { history: store.history },
            options.routes
          )
        )
      ),
      mountPoint
    );
    return mountPoint;
  };
};

exports.register = require('./store').register;

if (module.hot) {
  module.hot.decline();
}
