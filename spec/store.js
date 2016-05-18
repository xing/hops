
var test = require('tape');

var createStore = require('../lib/store').createStore;

test('store: basic test', function (t) {
  t.plan(4);

  t.equal(typeof createStore, 'function', 'createStore is a function');

  var store = createStore({
    reducers: { foo: function (s) { return s || {}; }},
    history: require('react-router').createMemoryHistory()
  });

  t.ok(store, 'store was created');
  t.equal(typeof store.dispatch, 'function', 'store has a dispatch method');
  t.equal(typeof store.getState, 'function', 'store has a getState method');
});


test('store: enhanced test', function (t) {
  t.plan(3);

  var store = createStore({
    enhancer: function (f) { return f; },
    reducer: require('redux').combineReducers({
      foo: function (s) { return s || {}; },
      routing: require('react-router-redux').routerReducer
    }),
    history: require('react-router').createMemoryHistory()
  });

  t.ok(store, 'store was created');
  t.equal(typeof store.dispatch, 'function', 'store has a dispatch method');
  t.equal(typeof store.getState, 'function', 'store has a getState method');
});


test('store: dev test', function (t) {
  t.plan(4);

  global.devToolsExtension = function () {
    t.pass('dev tools are being used');
    return function (f) { return f; };
  };

  var store = createStore({
    reducers: { foo: function (s) { return s || {}; }},
    history: require('react-router').createMemoryHistory()
  });

  t.ok(store, 'store was created');
  t.equal(typeof store.dispatch, 'function', 'store has a dispatch method');
  t.equal(typeof store.getState, 'function', 'store has a getState method');
});
