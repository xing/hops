
var test = require('tape');
var jsdom = require('jsdom');

var ORIGINAL_ENV = process.env.NODE_ENV;

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
  process.env.NODE_ENV = 'production';
  var result = require('../lib/browser').render.apply(window, arguments);
  process.env.NODE_ENV = ORIGINAL_ENV;
  return result;
}


var React = require('react');
var ReactRouter = require('react-router');

var App = React.createClass({
  render: function () {
    return React.createElement('div');
  }
});


test('basic rendering test', function (t) {
  t.plan(1);

  var actual = render().innerHTML;
  var expected = '<!-- react-empty: 1 -->';

  t.equal(actual, expected, 'correct default behavior');
});


test('route rendering test', function (t) {
  t.plan(1);

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

  t.equal(actual, expected, 'correct html rendered');
});


test('route/reducer rendering test', function (t) {
  t.plan(1);

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

  t.equal(actual, expected, 'correct html rendered');
});
