/* eslint-env node, mocha */

var assert = require('assert');
var jsdom = require('jsdom');

function setup() {
  global.document = jsdom.jsdom(
    '<html><body><main/></body></html>',
    {
      url: 'http://localhost:8080/'
    }
  );
  global.window = document.defaultView;
  global.navigator = window.navigator;
}
setup();

function render() {
  setup();
  var browser = require('../lib/browser');
  return browser.render.apply(window, arguments)();
}


var React = require('react');
var ReactRouter = require('react-router');

var App = React.createClass({
  render: function () {
    return React.createElement('div');
  }
});


describe('browser: basic rendering', function () {
  it('returns html comment only', function () {
    var actual = render().innerHTML;
    var expected = '<!-- react-empty: 1 -->';
    assert.equal(actual, expected, 'correct default behavior');
  });
});


describe('browser: route rendering', function () {
  it('returns correct html', function () {
    var actual = render({
      routes: React.createElement(
        ReactRouter.Route,
        {
          path: '/',
          component: App
        }
      )
    }).innerHTML;
    var expected = '<div data-reactroot=""></div>';
    assert.equal(actual, expected, 'correct html rendered');
  });
});


describe('browser: route/reducer rendering', function () {
  it('returns correct html', function () {
    var actual = render({
      routes: React.createElement(
        ReactRouter.Route,
        {
          path: '/',
          component: App
        }
      ),
      reducers: {
        foo: function (state) {
          return state || {};
        }
      }
    }).innerHTML;
    var expected = '<div data-reactroot=""></div>';
    assert.equal(actual, expected, 'correct html rendered');
  });
});
