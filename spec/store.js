
var test = require('tape');

var store = require('../lib/store');

test('store: exports test', function (t) {
  t.equal(typeof store.register, 'function', 'register is a function');
  t.equal(typeof store.createStore, 'function', 'createStore is a function');
  t.equal(typeof store.createContext, 'function', 'createContext is a function');

  t.end();
});


test('store: context test', function (t) {
  var context = store.createContext();

  t.ok(context, 'new context was created');

  t.equal(typeof context.register, 'function', 'register is a function');
  t.equal(typeof context.getReducers, 'function', 'getReducers is a function');
  t.equal(typeof context.createStore, 'function', 'createStore is a function');
  t.equal(typeof context.createContext, 'function', 'createContext is a function');

  t.end();
});


test('store: register/getReducer test', function (t) {
  var context = store.createContext();

  var util = context.register('foo', function (s) { return s; });
  t.ok(util, 'register returns something truthy');
  t.equal(typeof util.select, 'function', 'select is a function');

  var reducers = context.getReducers();
  t.ok(reducers, 'getReducers return something truthy');
  t.ok('foo' in reducers, 'foo namespace exists');
  t.ok('routing' in reducers, 'routing namespace exists');

  t.end();
});


test('store: basic autoregister test', function (t) {
  var context = store.createContext();
  var util = context.register('foo');

  t.ok(util, 'register returns something truthy');

  t.equal(typeof util.select, 'function', 'select is a function');
  t.equal(typeof util.update, 'function', 'update is a function');

  t.throws(context.register.bind(context, 'foo'), 'namespace clash is caught');

  t.end();
});


test('store: full autoregister test', function (t) {
  var context = store.createContext();
  var util = context.register('foo');
  var actualStore = context.createStore({
    history: require('react-router').createMemoryHistory()
  });

  actualStore.dispatch(util.update({ bar: {'$set': 'baz'}}));

  var state = actualStore.getState();
  var fooState = util.select(state);

  t.ok(state.foo, 'global state contains namespace');
  t.equal(state.foo.bar, 'baz', 'update reducer works');
  t.deepEqual(fooState, { bar: 'baz'}, 'selector returns correct slice');

  t.end();
});


test('store: store creation test', function (t) {
  t.plan(3);

  var actualStore = store.createContext().createStore({
    history: require('react-router').createMemoryHistory()
  });

  t.ok(actualStore, 'store was created');
  t.equal(typeof actualStore.dispatch, 'function', 'store has a dispatch method');
  t.equal(typeof actualStore.getState, 'function', 'store has a getState method');
});


test('store: dev test', function (t) {
  t.plan(4);

  global.devToolsExtension = function () {
    t.pass('dev tools are being used');
    delete global.devToolsExtension;
    return function (f) { return f; };
  };

  var actualStore = store.createContext().createStore({
    history: require('react-router').createMemoryHistory(),
    middleware: []
  });

  t.ok(actualStore, 'store was created');
  t.equal(typeof actualStore.dispatch, 'function', 'store has a dispatch method');
  t.equal(typeof actualStore.getState, 'function', 'store has a getState method');
});
