'use strict';

var React = require('react');
var ReactDOM = require('react-dom/server');
var ReactRouter = require('react-router');
var Helmet = require('react-helmet').Helmet;
var mixinable = require('mixinable');

var hopsConfig = require('hops-config');

var defaultTemplate = require('./lib/template');

exports.combineContexts = mixinable({
  bootstrap: mixinable.parallel,
  enhanceElement: mixinable.compose,
  getTemplateData: mixinable.pipe,
  renderTemplate: mixinable.override
});

exports.contextDefinition = {
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
  getTemplateData: function (templateData) {
    return Promise.resolve(Object.assign({}, templateData, {
      options: this.options,
      helmet: Helmet.renderStatic(),
      assets: hopsConfig.assets,
      manifest: hopsConfig.manifest,
      globals: (templateData.globals || [])
    }));
  },
  renderTemplate: function (data) {
    return this.template(data);
  }
};

exports.createContext = exports.combineContexts(
  exports.contextDefinition
);

exports.render = function (reactElement, _context) {
  return function (req, res, next) {
    var context = mixinable.clone(_context, { request: req });
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
            return context.getTemplateData(data)
              .then(context.renderTemplate.bind(context))
              .then(function (html) {
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
