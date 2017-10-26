'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouterDOM = require('react-router-dom');

var hopsConfig = require('hops-config');

var Context = require('./lib/common').Context;

exports.Context = exports.createContext = Context.extend({
  initialize: function (options) {
    this.mountpoint = options.mountpoint || '#main';
  },
  bootstrap: function () {
    return Promise.resolve();
  },
  enhanceElement: function (reactElement) {
    return React.createElement(
      ReactRouterDOM.BrowserRouter,
      { basename: hopsConfig.basePath },
      reactElement
    );
  },
  prepareRender: function (enhancedElement) {
    return Promise.resolve();
  },
  getMountpoint: function () {
    return document.querySelector(this.mountpoint);
  }
});

exports.render = function (reactElement, context) {
  if (!(context instanceof exports.Context)) {
    context = new exports.Context(context);
  }
  return function () {
    var mountpoint = context.getMountpoint();
    if (mountpoint.hasAttribute('data-hopsroot')) {
      ReactDOM.unmountComponentAtNode(mountpoint);
    } else {
      mountpoint.setAttribute('data-hopsroot', '');
    }
    return context.bootstrap().then(function () {
      var enhancedElement = context.enhanceElement(reactElement);
      return context.prepareRender(enhancedElement).then(function () {
        if (ReactDOM.hydrate) {
          ReactDOM.hydrate(enhancedElement, mountpoint);
        } else {
          ReactDOM.render(enhancedElement, mountpoint);
        }
      });
    });
  };
};

Object.assign(exports, require('./lib/components'));
