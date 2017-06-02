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
        props.setLocation(props.location);
        props.dispatchAll();
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
    // only dispatchAll serverside
    return this.request ? this.dispatchAll() : Promise.resolve();
  },
  dispatchAll: function () {
    var keys = Object.keys(this.actionCreators);
    var store = this.getStore();
    var location = this.getLocation();
    function dispatchOne (key) {
      var actionCreators = this.actionCreators[key];
      var match = ReactRouter.matchPath(location.pathname, {
        path: key, exact: true, strict: true
      });
      if (!match) {
        return Promise.resolve();
      }
      if (Array.isArray(actionCreators)) {
        return Promise.all(actionCreators[key].map(function (createAction) {
          return store.dispatch(createAction(match.params));
        }));
      } else {
        return store.dispatch(actionCreators(match.params));
      }
    }
    return Promise.all(keys.map(dispatchOne.bind(this)));
  },
  setLocation: function (location) {
    this.location = location;
  },
  getLocation: function () {
    // location: clientside, request: serverside
    return this.location || createLocation(this.request.path);
  },
  enhanceElement: function (reactElement) {
    return Context.prototype.enhanceElement.call(this, React.createElement(
      Provider,
      {
        dispatchAll: this.dispatchAll.bind(this),
        setLocation: this.setLocation.bind(this)
      },
      reactElement
    ));
  }
});

exports.connect = HopsRedux.connect;
