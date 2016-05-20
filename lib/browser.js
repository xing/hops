
var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var ReactRedux = require('react-redux');

var defaults = require('./defaults');
var createStore = require('./store').createStore;

exports.render = function (overrides) {
  var options = Object.assign({}, defaults, overrides || {});
  var store = options.store || createStore(options);
  var mountPoint = document.querySelector(options.mountPoint);
  ReactDOM.render(
    React.createElement(ReactRedux.Provider, { store: store },
      React.createElement(ReactRouter.Router, { history: store.history },
        options.routes
      )
    ),
    mountPoint
  );
  return mountPoint;
};

exports.register = require('./store').register;
