'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouterDOM = require('react-router-dom');

var hopsConfig = require('hops-config');

var Context = require('./lib/common').Context;

exports.Context = exports.createContext = Context.mixin({
  initialize: function (options) {
    this.mountpoint = options.mountpoint || '#main';
  },
  enhanceElement: function (reactElement) {
    return React.createElement(
      ReactRouterDOM.BrowserRouter,
      { basename: hopsConfig.basePath },
      reactElement
    );
  },
  getMountpoint: function () {
    return document.querySelector(this.mountpoint);
  }
});

exports.render = function (reactElement, _context) {
  var context = _context;
  if (!(_context instanceof exports.Context)) {
    context = new exports.Context(_context);
  }
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
