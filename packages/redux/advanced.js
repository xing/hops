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
    this.actionCreators = options.actionCreators || [];
  },
  bootstrap: function () {
    return this.request ? this.dispatchAll() : Promise.resolve();
  },
  dispatchAll: function () {
    var store = this.getStore();
    var location = this.getLocation();
    var request = this.request;
    return Promise.all(this.actionCreators.map(function (createAction) {
      return store.dispatch(createAction(location, request));
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

exports.render = function (reactElement, context) {
  if (!(context instanceof exports.Context)) {
    context = new exports.Context(context);
  }
  return HopsRedux.render(reactElement, context);
};
