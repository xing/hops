'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouterDOM = require('react-router-dom');
var define = require('mixinable');

var hopsConfig = require('hops-config');

var mixin = define({
  bootstrap: define.parallel,
  enhanceElement: define.pipe,
  getMountpoint: function (functions) {
    return functions.pop()();
  }
});

exports.mixin = {
  constructor: function (options) {
    if (!options) { options = {}; }
    this.mountpoint = options.mountpoint || '#main';
  },
  bootstrap: function () {
    return Promise.resolve();
  },
  enhanceElement: function (reactElement) {
    return Promise.resolve(React.createElement(
      ReactRouterDOM.BrowserRouter,
      { basename: hopsConfig.basePath },
      reactElement
    ));
  },
  getMountpoint: function () {
    return document.querySelector(this.mountpoint);
  }
};

exports.createContext = mixin(exports.mixin);

exports.render = function (reactElement, context) {
  return function () {
    var mountpoint = context.getMountpoint();
    if (mountpoint.hasAttribute('data-hopsroot')) {
      ReactDOM.unmountComponentAtNode(mountpoint);
    } else {
      mountpoint.setAttribute('data-hopsroot', '');
    }
    return context.bootstrap().then(function () {
      return context.enhanceElement(reactElement).then(
        function (enhancedElement) {
          if (ReactDOM.hydrate) {
            ReactDOM.hydrate(enhancedElement, mountpoint);
          } else {
            ReactDOM.render(enhancedElement, mountpoint);
          }
        }
      );
    });
  };
};

Object.assign(exports, require('./lib/components'));
