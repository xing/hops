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

function matchPathSpec (spec, location, isServer) {
  var regExp = /^(?:(\w+?):\/\/)?(.+)$/;
  var result = false;
  if (regExp.test(spec)) {
    var matches = spec.match(regExp);
    var schemaSpec = matches[1] || 'all';
    var pathSpec = matches[2];
    if (
      (schemaSpec === 'all') ||
      (schemaSpec === 'server' && isServer) ||
      (schemaSpec === 'client' && !isServer)
    ) {
      result = ReactRouter.matchPath(location.pathname, {
        path: pathSpec, exact: true, strict: true
      });
    }
  }
  return result;
}

exports.Context = exports.createContext = Context.extend({
  initialize: function (options) {
    Context.prototype.initialize.call(this, options);
    this.actionCreators = Object.assign({}, options.actionCreators);
  },
  bootstrap: function () {
    return this.request ? this.dispatchAll() : Promise.resolve();
  },
  dispatchAll: function () {
    var self = this;
    return Promise.all(Object.keys(self.actionCreators).map(function (key) {
      var location = self.getLocation();
      var match = matchPathSpec(key, location, !!self.request);
      if (!match) {
        return Promise.resolve();
      }
      var store = self.getStore();
      if (Array.isArray(self.actionCreators[key])) {
        var actionCreators = self.actionCreators[key];
        return Promise.all(actionCreators[key].map(function (createAction) {
          return store.dispatch(createAction(match.params, location));
        }));
      } else {
        return store.dispatch(self.actionCreators[key](match.params, location));
      }
    }));
  },
  setLocation: function (location) {
    this.location = location;
  },
  getLocation: function () {
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
