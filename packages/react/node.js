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
  renderTemplate: mixinable.override,
});

exports.ReactContext = function(options) {
  if (!options) {
    options = {};
  }
  this.routerOptions = Object.assign(
    {
      location: options.request && options.request.path,
      basename: hopsConfig.basePath,
      context: {},
    },
    options.router
  );
  this.template = options.template || defaultTemplate;
};
exports.ReactContext.prototype = {
  enhanceElement: function(reactElement) {
    return React.createElement(
      ReactRouter.StaticRouter,
      this.routerOptions,
      reactElement
    );
  },
  getTemplateData: function(templateData) {
    return Object.assign({}, templateData, {
      routerContext: this.routerOptions.context,
      assets: hopsConfig.assets,
      manifest: hopsConfig.manifest,
      globals: templateData.globals || [],
    });
  },
  renderTemplate: function(templateData) {
    return this.template(
      Object.assign({ helmet: Helmet.renderStatic() }, templateData)
    );
  },
};

exports.contextDefinition = exports.ReactContext;

exports.createContext = exports.combineContexts(exports.ReactContext);

var cloneContext = mixinable.replicate(function(initialArgs, newArgs) {
  return [Object.assign({}, initialArgs[0], newArgs[0])];
});

exports.render = function(reactElement, _context) {
  return function(req, res, next) {
    var renderContext = cloneContext(_context, { request: req });
    renderContext
      .bootstrap()
      .then(function() {
        return renderContext.enhanceElement(reactElement);
      })
      .then(function(rootElement) {
        return renderContext.getTemplateData({}).then(function(templateData) {
          return { templateData, rootElement };
        });
      })
      .then(function(result) {
        var templateData = result.templateData;
        var rootElement = result.rootElement;
        var markup = renderContext.renderTemplate(
          Object.assign(
            {
              markup: ReactDOM.renderToString(rootElement),
            },
            templateData
          )
        );
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
          res.send(markup);
        }
      })
      .catch(next);
  };
};

Object.assign(exports, require('./lib/components'));
