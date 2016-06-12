/* eslint-env node, mocha */

var assert = require('assert');

var React = require('react');
var ReactRouter = require('react-router');


describe('node: basic rendering', function () {
  it('should return a function returning a promise', function (done) {
    var render = require('../lib/node').render();
    assert.equal(typeof render, 'function', 'render returns function');
    var promise = render('/');
    assert(promise instanceof Promise, 'render function returns Promise');
    promise.catch(function () {
      assert(true, 'correct default behavior');
      done();
    });
  });
});


describe('node: route rendering', function () {
  it('returns html and state', function (done) {
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
      assert(result.dom.length, 'some html rendered');
      assert(result.state.length, 'some state serialized');
      done();
    });
  });
});


describe('node: route/reducer rendering', function () {
  it('returns html and state', function (done) {
    var render = require('../lib/node').render({
      routes: React.createElement(
        ReactRouter.Route,
        { path: '/', component: React.createClass({
          statics: {
            fetchData: function () {
              assert(true, 'fetchData is being called');
              return Promise.resolve();
            }
          },
          render: function () { return null; }
        })}
      )
    });
    render('/').then(function (result) {
      assert(result.dom.length, 'some html rendered');
      assert(result.state.length, 'some state serialized');
      done();
    });
  });
});
