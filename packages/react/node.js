'use strict';

var React = require('react');
var ReactDOM = require('react-dom/server');
var ReactRouter = require('react-router');
var Helmet = require('react-helmet').Helmet;
var mixinable = require('mixinable');

var hopsConfig = require('hops-config');

var defaultTemplate = require('./lib/template');

exports.combineContexts = mixinable({
  bootstrap: mixinable.async.parallel,
  enhanceElement: mixinable.async.compose,
  getTemplateData: mixinable.async.pipe,
  renderTemplate: mixinable.override
});

exports.contextDefinition = function () {
  var args = Array.prototype.slice.call(arguments);
  var options = Object.assign.apply(Object, [{}].concat(args));
  this.template = options.template || defaultTemplate;
  this.request = options.request;
  this.routerContext = {};
};

exports.contextDefinition.prototype = {
  enhanceElement: function (reactElement) {
    return React.createElement(
      ReactRouter.StaticRouter,
      {
        basename: hopsConfig.basePath,
        location: this.request.path,
        context: this.routerContext
      },
      reactElement
    );
  },
  getTemplateData: function (templateData) {
    return Object.assign({}, templateData, {
      routerContext: this.routerContext,
      options: this.options,
      helmet: Helmet.renderStatic(),
      assets: hopsConfig.assets,
      manifest: hopsConfig.manifest,
      globals: (templateData.globals || [])
    });
  },
  renderTemplate: function (templateData) {
    return this.template(templateData);
  }
};

exports.createContext = exports.combineContexts(
  exports.contextDefinition
);

exports.render = function (reactElement, _context) {
  return function (req, res, next) {
    var renderContext = mixinable.clone(_context, { request: req });
    renderContext.bootstrap().then(function () {
      return renderContext.enhanceElement(reactElement).then(
        function (enhancedElement) {
          return renderContext.getTemplateData({
            markup: ReactDOM.renderToString(enhancedElement)
          }).then(function (templateData) {
            var routerContext = templateData.routerContext;
            if (routerContext.miss) {
              next();
            } else if (routerContext.url) {
              res.status(routerContext.status || 301);
              res.set('Location', routerContext.url);
              res.end();
            } else {
              res.status(routerContext.status || 200);
              res.type('html');
              res.send(renderContext.renderTemplate(templateData));
            }
          });
        }
      );
    }).catch(next);
  };
};

Object.assign(exports, require('./lib/components'));
