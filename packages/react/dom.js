'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouterDOM = require('react-router-dom');
var mixinable = require('mixinable');

var hopsConfig = require('hops-config');

var createCombinedContext = require('./lib/common').createCombinedContext;

exports.combineContexts = mixinable({
  bootstrap: mixinable.async.parallel,
  enhanceElement: mixinable.async.compose,
  getMountpoint: mixinable.override,
});

exports.ReactContext = function(options) {
  if (!options) {
    options = {};
  }
  this.routerOptions = Object.assign(
    { basename: hopsConfig.basePath },
    options.router
  );
  this.mountpoint = options.mountpoint || '#main';
};
exports.ReactContext.prototype = {
  enhanceElement: function(reactElement) {
    return React.createElement(
      ReactRouterDOM.BrowserRouter,
      this.routerOptions,
      reactElement
    );
  },
  getMountpoint: function() {
    return document.querySelector(this.mountpoint);
  },
};

exports.contextDefinition = exports.ReactContext;

exports.createContext = exports.combineContexts(exports.ReactContext);

var renderWithContext = function(reactElement, context) {
  return function() {
    var mountpoint = context.getMountpoint();
    var isMounted = mountpoint.hasAttribute('data-hopsroot');
    if (isMounted) {
      ReactDOM.unmountComponentAtNode(mountpoint);
    } else {
      mountpoint.setAttribute('data-hopsroot', '');
    }
    return context
      .bootstrap()
      .then(function() {
        return context.enhanceElement(reactElement);
      })
      .then(function(enhancedElement) {
        if (ReactDOM.hydrate && !isMounted) {
          ReactDOM.hydrate(enhancedElement, mountpoint);
        } else {
          ReactDOM.render(enhancedElement, mountpoint);
        }
      })
      .catch(function(error) {
        console.error('Error while rendering:', error);
      });
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
