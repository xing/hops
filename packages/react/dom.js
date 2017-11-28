'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouterDOM = require('react-router-dom');
var mixinable = require('mixinable');

var hopsConfig = require('hops-config');

exports.combineContexts = mixinable({
  bootstrap: mixinable.async.parallel,
  enhanceElement: mixinable.async.compose,
  getMountpoint: mixinable.override,
});

exports.contextDefinition = function(options) {
  if (!options) {
    options = {};
  }
  this.mountpoint = options.mountpoint || '#main';
};

exports.contextDefinition.prototype = {
  enhanceElement: function(reactElement) {
    return React.createElement(
      ReactRouterDOM.BrowserRouter,
      { basename: hopsConfig.basePath },
      reactElement
    );
  },
  getMountpoint: function() {
    return document.querySelector(this.mountpoint);
  },
};

exports.createContext = exports.combineContexts(exports.contextDefinition);

exports.render = function(reactElement, context) {
  return function() {
    var mountpoint = context.getMountpoint();
    var isMounted = mountpoint.hasAttribute('data-hopsroot');
    if (isMounted) {
      ReactDOM.unmountComponentAtNode(mountpoint);
    } else {
      mountpoint.setAttribute('data-hopsroot', '');
    }
    return context.bootstrap().then(function() {
      return context
        .enhanceElement(reactElement)
        .then(function(enhancedElement) {
          if (ReactDOM.hydrate && !isMounted) {
            ReactDOM.hydrate(enhancedElement, mountpoint);
          } else {
            ReactDOM.render(enhancedElement, mountpoint);
          }
        });
    });
  };
};

Object.assign(exports, require('./lib/components'));
