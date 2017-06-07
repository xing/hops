'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouterDOM = require('react-router-dom');

var common = require('./common');
var Context = common.Context;

Object.assign(exports, common);

exports.Context = exports.createContext = Context.extend({
  initialize: function (options) {
    this.mountpoint = options.mountpoint;
  },
  bootstrap: function () {
    return Promise.resolve();
  },
  enhanceElement: function (reactElement) {
    return React.createElement(
      ReactRouterDOM.BrowserRouter,
      {},
      reactElement
    );
  },
  getMountpoint: function () {
    var selector = this.mountpoint || '#main';
    return document.querySelector(selector);
  }
});

exports.render = function (reactElement, context) {
  if (!(context instanceof exports.Context)) {
    context = new exports.Context(context);
  }
  return function () {
    context.bootstrap().then(function () {
      ReactDOM.render(
        context.enhanceElement(reactElement),
        context.getMountpoint()
      );
    });
  };
};
