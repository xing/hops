/* eslint-env node, mocha */
'use strict';

var assert = require('assert');

var store = require('../lib/store');


describe('store: exports', function () {
  it('should export some functions', function () {
    assert.equal(typeof store.register, 'function', 'register is a function');
    assert.equal(typeof store.createStore, 'function', 'createStore is a function');
    assert.equal(typeof store.createContext, 'function', 'createContext is a function');
  });
});


describe('store: context', function () {
  it('should be able to create a new context', function () {
    var context = store.createContext();
    assert(context, 'new context was created');
    assert.equal(typeof context.register, 'function', 'register is a function');
    assert.equal(typeof context.createStore, 'function', 'createStore is a function');
    assert.equal(typeof context.createContext, 'function', 'createContext is a function');
  });
});


describe('store: register reducer', function () {
  it('should be able to register custom reducers', function () {
    var context = store.createContext();
    var select = context.register('foo', function () { return 'bar'; });
    var actualStore = context.createStore({
      history: require('react-router').createMemoryHistory()
    });
    assert.equal(typeof select, 'function', 'select is a function');
    assert.equal(select(actualStore.getState()), 'bar', 'reducer is being used');
  });
});


describe('store: re-register reducer', function () {
  it('should be capable of re-registering reducers', function () {
    var context = store.createContext();
    var select = context.register('foo', function () { return 'bar'; });
    var actualStore = context.createStore({
      history: require('react-router').createMemoryHistory()
    });
    assert.equal(actualStore.getState().foo, 'bar', 'initial reducer is being used');
    context.register('foo', function () { return 'baz'; });
    actualStore.dispatch({ type: '' });
    assert.equal(select(actualStore.getState()), 'baz', 'new reducer is being used');
  });
});


describe('store: store creation', function () {
  it('should create a store', function (done) {
    var actualStore = store.createContext().createStore({
      history: require('react-router').createMemoryHistory()
    });
    assert(actualStore, 'store was created');
    assert.equal(typeof actualStore.dispatch, 'function', 'store has a dispatch method');
    assert.equal(typeof actualStore.getState, 'function', 'store has a getState method');
    done();
  });
});


describe('store: dev mode', function () {
  it('should use dev tools if present', function (done) {
    global.devToolsExtension = function () {
      delete global.devToolsExtension;
      assert(true, 'dev tool is being used');
      done();
      return function (f) { return f; };
    };
    store.createContext().createStore({
      history: require('react-router').createMemoryHistory()
    });
  });
});
