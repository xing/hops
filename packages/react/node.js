var React = require('react');
var ReactDOMServer = require('react-dom/server');
var ReactRouter = require('react-router');
var Helmet = require('react-helmet').Helmet;
var minify = require('html-minifier').minify;

var manifestUtil = require('hops-config/util');

var defaultTemplate = require('./template');

var common = require('./common');
var Context = common.Context;

Object.assign(exports, common);

exports.Context = exports.createContext = Context.extend({
  clone: function (request) {
    return new this.constructor(Object.assign(
      {},
      this.options,
      { request: request }
    ));
  },
  initialize: function (options) {
    this.request = options.request || {};
    this.template = options.template || defaultTemplate;
  },
  bootstrap: function () {
    return Promise.resolve();
  },
  enhanceElement: function (reactElement) {
    return React.createElement(
      ReactRouter.StaticRouter,
      { location: this.request.path, context: this },
      reactElement
    );
  },
  getAssetURLs: function () {
    return manifestUtil.getManifestData();
  },
  getTemplateData: function () {
    return {
      options: this.options,
      assets: this.getAssetURLs(),
      helmet: Helmet.renderStatic(),
      manifest: manifestUtil.getManifestScript(),
      globals: []
    };
  },
  renderTemplate: function (markup) {
    var templateData = Object.assign(
      this.getTemplateData(),
      { markup: markup }
    );
    return minify(this.template(templateData), {
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      removeEmptyAttributes: true
    });
  }
});

exports.render = function (reactElement, context) {
  if (!(context instanceof exports.Context)) {
    context = new exports.Context(context);
  }
  return function (req, res, next) {
    var reqContext = context.clone(req);
    reqContext.bootstrap().then(function () {
      var markup = ReactDOMServer.renderToString(
        reqContext.enhanceElement(reactElement)
      );
      if (reqContext.miss) {
        next();
      } else {
        if (reqContext.url) {
          res.writeHead(
            reqContext.status || 301,
            { Location: reqContext.url }
          );
        } else {
          res.writeHead(reqContext.status || 200);
          res.write(reqContext.renderTemplate(markup));
        }
        res.end();
      }
    }).catch(next);
  };
};
