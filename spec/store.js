/* eslint-env node, mocha */

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
    assert.equal(typeof context.getReducers, 'function', 'getReducers is a function');
    assert.equal(typeof context.createStore, 'function', 'createStore is a function');
    assert.equal(typeof context.createContext, 'function', 'createContext is a function');
  });
});


describe('store: register/getReducer', function () {
  it('should be able to register custom reducers', function () {
    var context = store.createContext();
    var duck = context.register('foo', function () { return 'bar'; });
    var reducers = context.getReducers();
    assert(duck, 'register returns something truthy');
    assert.equal(typeof duck.select, 'function', 'select is a function');
    assert(reducers, 'getReducers return something truthy');
    assert('foo' in reducers, 'foo namespace exists');
  });
});


describe('store: re-register', function () {
  it('should be capable of re-registering reducers', function () {
    var context = store.createContext();
    context.register('foo', function () { return 'bar'; });
    var actualStore = context.createStore({
      history: require('react-router').createMemoryHistory()
    });
    assert.equal(actualStore.getState().foo, 'bar', 'initial reducer is being used');
    context.register('foo', function () { return 'baz'; });
    actualStore.dispatch({ type: '' });
    assert.equal(actualStore.getState().foo, 'baz', 'new reducer is being used');
  });
});


describe('store: basic autoregister', function () {
  it('should be capable of generating megaducks', function () {
    var context = store.createContext();
    var duck = context.register('foo');
    assert(duck, 'register returns something truthy');
    assert.equal(typeof duck.select, 'function', 'select is a function');
    assert.equal(typeof duck.update, 'function', 'update is a function');
  });
});


describe('store: full autoregister', function () {
  it('should generate a working reducer', function (done) {
    var context = store.createContext();
    var duck = context.register('foo');
    var actualStore = context.createStore({
      history: require('react-router').createMemoryHistory()
    });
    actualStore.dispatch(duck.update({ bar: {'$set': 'baz'}}));
    var state = actualStore.getState();
    var fooState = duck.select(state);
    assert(state.foo, 'global state contains namespace');
    assert.equal(state.foo.bar, 'baz', 'update reducer works');
    assert.deepEqual(fooState, { bar: 'baz'}, 'selector returns correct slice');
    done();
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
