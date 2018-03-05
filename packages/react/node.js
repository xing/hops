'use strict';

var React = require('react');
var ReactDOM = require('react-dom/server');
var ReactRouter = require('react-router');
var Helmet = require('react-helmet').Helmet;
var mixinable = require('mixinable');

var hopsConfig = require('hops-config');

var defaultTemplate = require('./lib/template');

var createCombinedContext = require('./lib/common').createCombinedContext;

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
  this.assets = options.response && options.response.locals.hops.assets;
};
exports.ReactContext.prototype = {
  enhanceElement: function(reactElement) {
    return React.createElement(
      ReactRouter.StaticRouter,
      this.routerOptions,
      reactElement
    );
  },
  getTemplateData: function(templateData, rootElement) {
    return Object.assign({}, templateData, {
      routerContext: this.routerOptions.context,
      manifest: hopsConfig.manifest,
      globals: templateData.globals || [],
      assets: this.assets,
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

var renderWithContext = function(reactElement, _context) {
  return function(req, res, next) {
    var renderContext = cloneContext(_context, { request: req, response: res });

    var timings = res.locals.timings;
    timings.start('hops.react.bootstrap');
    renderContext
      .bootstrap()
      .then(function() {
        timings.end('hops.react.bootstrap');
        timings.start('hops.react.enhanceElement');
        return renderContext.enhanceElement(reactElement);
      })
      .then(function(rootElement) {
        timings.end('hops.react.enhanceElement');
        timings.start('hops.react.getTemplateData');

        return renderContext
          .getTemplateData({}, rootElement)
          .then(function(templateData) {
            timings.end('hops.react.getTemplateData');

            return { templateData: templateData, rootElement: rootElement };
          });
      })
      .then(function(result) {
        timings.start('hops.react.renderTemplate');

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
        timings.end('hops.react.renderTemplate');

        var routerContext = templateData.routerContext;
        if (routerContext.miss) {
          next();
        } else if (routerContext.url) {
          res.status(routerContext.status || 301);
          res.set('Location', routerContext.url);
          routerContext.headers && res.set(routerContext.headers);
          res.end();
        } else {
          res.status(routerContext.status || 200);
          routerContext.headers && res.set(routerContext.headers);
          res.type('html');
          res.send(markup);
        }
      })
      .catch(next);
  };
};

exports.render = function(reactElement, contextOrConfig) {
  var context;
  if (mixinable.isMixinable(contextOrConfig)) {
    context = contextOrConfig;
  } else {
    context = createCombinedContext(
      contextOrConfig,
      exports.ReactContext,
      exports.combineContexts
    );
  }
  return renderWithContext(reactElement, context);
};

Object.assign(exports, require('./lib/components'));
