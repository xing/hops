/* istanbul ignore if */
if (!global.Object.assign) {
  global.Object.assign = require('babel-runtime/core-js/object/assign').default;
}
/* istanbul ignore if */
if (!global.Promise) {
  global.Promise = require('babel-runtime/core-js/promise').default;
}

var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var ReactRedux = require('react-redux');

var defaults = require('./defaults');

exports.render = function (overrides) {
  function render() {
    var options = Object.assign({}, defaults, overrides);
    var store = options.createStore(options);
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
  }
  return (module.hot) ? render : render();
};

exports.register = require('./store').register;
