'use strict';

var React = require('react');
var ReactDOM = require('react-dom/server');
var ReactRouter = require('react-router');
var Helmet = require('react-helmet').Helmet;
var define = require('mixinable');

var hopsConfig = require('hops-config');

var defaultTemplate = require('./lib/template');

var mixin = define({
  bootstrap: define.parallel,
  enhanceElement: define.pipe,
  getTemplateData: define.pipe,
  renderTemplate: function (functions, data) {
    return this.getTemplateData(data).then(functions.pop());
  }
});

exports.mixin = {
  constructor: function () {
    var args = Array.prototype.slice.call(arguments);
    var options = Object.assign.apply(Object, [{}].concat(args));
    this.template = options.template || defaultTemplate;
    this.request = options.request;
  },
  bootstrap: function () {
    return Promise.resolve();
  },
  enhanceElement: function (reactElement) {
    return Promise.resolve(React.createElement(
      ReactRouter.StaticRouter,
      {
        basename: hopsConfig.basePath,
        location: this.request.path,
        context: this
      },
      reactElement
    ));
  },
  getTemplateData: function (data) {
    return Promise.resolve(Object.assign(
      data,
      {
        options: this.options,
        helmet: Helmet.renderStatic(),
        assets: hopsConfig.assets,
        manifest: hopsConfig.manifest,
        globals: []
      }
    ));
  },
  renderTemplate: function (data) {
    return this.template(data);
  }
};

exports.createContext = mixin(exports.mixin);

exports.render = function (reactElement, _context) {
  return function (req, res, next) {
    var context = _context.clone({ request: req });
    context.bootstrap().then(function () {
      return context.enhanceElement(reactElement).then(
        function (enhancedElement) {
          var data = {
            markup: ReactDOM.renderToString(enhancedElement)
          };
          if (context.miss) {
            next();
          } else if (context.url) {
            res.status(context.status || 301);
            res.set('Location', context.url);
            res.end();
          } else {
            return context.renderTemplate(data).then(function (html) {
              res.status(context.status || 200);
              res.type('html');
              res.send(html);
            });
          }
        }
      );
    }).catch(next);
  };
};

Object.assign(exports, require('./lib/components'));
