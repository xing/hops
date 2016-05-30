
var test = require('tape');

var React = require('react');
var ReactRouter = require('react-router');


test('node: basic rendering test', function (t) {
  t.plan(3);

  var render = require('../lib/node').render();

  t.equal(typeof render, 'function', 'render returns function');
  t.ok(render('/') instanceof Promise, 'render function returns Promise');

  render('/').catch(function () {
    t.ok(true, 'error handled by rejection');
  });
});


test('node: route rendering test', function (t) {
  t.plan(3);

  var render = require('../lib/node').render({
    routes: React.createElement(
      ReactRouter.Route,
      { path: '/', component: React.createClass({
        render: function () { return null; }
      })}
    ),
    reducers: {}
  });

  render('/').then(function (result) {
    t.ok(result.dom.length, 'some html rendered');
    t.ok(result.state.length, 'some state serialized');
  });

  render('/foo').catch(function () {
    t.ok(true, 'error handled by rejection');
  });
});


test('node: route/reducer rendering test', function (t) {
  t.plan(3);

  var render = require('../lib/node').render({
    routes: React.createElement(
      ReactRouter.Route,
      { path: '/', component: React.createClass({
        statics: {
          fetchData: function () {
            t.pass('fetchData is being called');
            return Promise.resolve();
          }
        },
        render: function () { return null; }
      })}
    )
  });

  render('/').then(function (result) {
    t.ok(result.dom.length, 'some html rendered');
    t.ok(result.state.length, 'some state serialized');
  });
});
