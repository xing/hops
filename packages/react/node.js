'use strict';

var React = require('react');
var ReactDOM = require('react-dom/server');
var ReactRouter = require('react-router');
var Helmet = require('react-helmet').Helmet;
var minify = require('html-minifier').minify;

var hopsConfig = require('hops-config');

var Context = require('./common').Context;
var defaultTemplate = require('./template');

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
  getTemplateData: function () {
    var templateData = {
      options: this.options,
      helmet: Helmet.renderStatic(),
      globals: []
    };
    if (hopsConfig.manifestUtil) {
      Object.assign(templateData, {
        assets: hopsConfig.manifestUtil.getAssetURLs(),
        manifest: hopsConfig.manifestUtil.getManifestScript()
      });
    }
    return templateData;
  },
  renderTemplate: function (markup) {
    var templateData = Object.assign(
      this.getTemplateData(),
      { markup: markup }
    );
    return minify(this.template(templateData), {
      collapseWhitespace: true,
      removeAttributeQuotes: true
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
      var markup = ReactDOM.renderToString(
        reqContext.enhanceElement(reactElement)
      );
      if (reqContext.miss) {
        next();
      } else {
        if (reqContext.url) {
          res.status(reqContext.status || 301).set('Location', reqContext.url);
        } else {
          res.status(reqContext.status || 200).type('html');
          res.write(reqContext.renderTemplate(markup));
        }
        res.end();
      }
    }).catch(next);
  };
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
