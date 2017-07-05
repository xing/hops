'use strict';

var React = require('react');
var ReactRouter = require('react-router-dom');
var createReactClass = require('create-react-class');

var createLocation = require('history/LocationUtils').createLocation;

var Context = require('./basic').Context;

var Dispatcher = ReactRouter.withRouter(
  createReactClass({
    dispatchAll: function() {
      if (this.props) {
        this.props.dispatchAll(this.props.location);
      }
    },
    componentDidMount: function() {
      this.dispatchAll();
    },
    componentDidUpdate: function() {
      this.dispatchAll();
    },
    render: function() {
      return this.props.children
        ? React.Children.only(this.props.children)
        : null;
    }
  })
);

exports.Context = exports.createContext = Context.extend({
  initialize: function(options) {
    Context.prototype.initialize.call(this, options);
    this.actionCreators = Object.assign({}, options.actionCreators);
  },
  bootstrap: function() {
    if (this.request) {
      return this.dispatchAll(createLocation(this.request.path));
    }
    return Promise.resolve();
  },
  dispatchAll: function(location) {
    var store = this.getStore();
    var keys = Object.keys(this.actionCreators);
    var actionCreators = this.actionCreators;
    return Promise.all(
      keys.map(function dispatchOne(key) {
        var match = ReactRouter.matchPath(location.pathname, {
          path: key,
          exact: true,
          strict: true
        });
        if (!match) {
          return Promise.resolve();
        }
        if (Array.isArray(actionCreators[key])) {
          return Promise.all(
            actionCreators[key].map(function(createAction) {
              return store.dispatch(createAction(match.params));
            })
          );
        } else {
          return store.dispatch(actionCreators[key](match.params));
        }
      })
    );
  },
  enhanceElement: function(reactElement) {
    return Context.prototype.enhanceElement.call(
      this,
      React.createElement(
        Dispatcher,
        { dispatchAll: this.dispatchAll.bind(this) },
        reactElement
      )
    );
  }
});
