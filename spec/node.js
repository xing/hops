
var test = require('tape');

var React = require('react');
var ReactRouter = require('react-router');


test('route rendering test', function (t) {
  t.plan(4);

  var Component = React.createClass({
    render: function () { return null; }
  });

  var render = require('../lib/node').render({
    routes: React.createElement(
      ReactRouter.Route,
      { path: '/', component: Component }
    ),
    reducers: {}
  });

  t.equal(typeof render, 'function', 'render returns function');
  t.ok(render('/') instanceof Promise, 'render function returns Promise');

  render('/').then(function (html) {
    t.ok(html.length, 'correct default behavior');
  });

  render('/foo').catch(function () {
    t.ok(true, 'correct error behavior');
  });
});


test('advanced route rendering test', function (t) {
  t.plan(2);

  var Component = React.createClass({
    statics: {
      fetchData: function () {
        t.pass('fetchData is being called');
        return Promise.resolve();
      }
    },
    render: function () { return null; }
  });

  var render = require('../lib/node').render({
    routes: React.createElement(
      ReactRouter.Route,
      { path: '/', component: Component }
    )
  });

  render('/').then(function (html) {
    t.ok(html.length, 'correct default behavior');
  });
});
