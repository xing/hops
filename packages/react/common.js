var ReactRouter = require('react-router-dom');

exports.Context = function Context (options) {
  this.options = options || {};
  this.initialize(this.options);
};

exports.Context.extend = function (protoExtension, staticExtension) {
  var parent = this;
  var Context = function (options) {
    if (!(this instanceof Context)) {
      return new Context(options);
    }
    parent.call(this, options);
  };
  return Object.assign(Context, parent, staticExtension, {
    prototype: Object.assign(
      Object.create(parent.prototype),
      protoExtension,
      {
        constructor: Context
      }
    )
  });
};

exports.Miss = ReactRouter.withRouter(function Miss (props) {
  if (props.staticContext) {
    props.staticContext.miss = true;
  }
  return null;
});

exports.Status = ReactRouter.withRouter(function Status (props) {
  if (props.staticContext) {
    props.staticContext.status = props.code || 200;
  }
  return null;
});

exports.Link = ReactRouter.Link;
exports.NavLink = ReactRouter.NavLink;
exports.Prompt = ReactRouter.Prompt;
exports.Redirect = ReactRouter.Redirect;
exports.Route = ReactRouter.Route;
exports.Switch = ReactRouter.Switch;

exports.withRouter = ReactRouter.withRouter;

exports.Head = require('react-helmet').Helmet;

exports.React = require('react');
