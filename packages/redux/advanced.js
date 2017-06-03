var React = require('react');
var ReactRouter = require('react-router-dom');
var withSideEffect = require('react-side-effect');
var createLocation = require('history/LocationUtils').createLocation;

var HopsRedux = require('./basic');

var Context = HopsRedux.Context;

var Provider = ReactRouter.withRouter(
  withSideEffect(
    function reducePropsToState (propsList) {
      return propsList[propsList.length - 1];
    },
    function handleStateChangeOnClient (props) {
      if (props) {
        props.dispatchAll(props.location);
      }
    },
    function mapStateOnServer (props) {
      return undefined;
    }
  )(function (props) {
    return props.children ? React.Children.only(props.children) : null;
  })
);

exports.Context = exports.createContext = Context.extend({
  initialize: function (options) {
    Context.prototype.initialize.call(this, options);
    this.actionCreators = Object.assign({}, options.actionCreators);
  },
  bootstrap: function () {
    if (this.request) {
      return this.dispatchAll(createLocation(this.request.path));
    }
    return Promise.resolve();
  },
  dispatchAll: function (location) {
    var store = this.getStore();
    var keys = Object.keys(this.actionCreators);
    var actionCreators = this.actionCreators;
    return Promise.all(keys.map(function dispatchOne (key) {
      var match = ReactRouter.matchPath(
        location.pathname,
        { path: key, exact: true, strict: true }
      );
      if (!match) {
        return Promise.resolve();
      }
      if (Array.isArray(actionCreators[key])) {
        return Promise.all(actionCreators[key].map(function (createAction) {
          return store.dispatch(createAction(match.params));
        }));
      } else {
        return store.dispatch(actionCreators[key](match.params));
      }
    }));
  },
  enhanceElement: function (reactElement) {
    return Context.prototype.enhanceElement.call(this, React.createElement(
      Provider,
      { dispatchAll: this.dispatchAll.bind(this) },
      reactElement
    ));
  }
});

exports.connect = HopsRedux.connect;
