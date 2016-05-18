
var test = require('tape');

var createStore = require('../lib/store').createStore;

test('createStore test', function (t) {
  t.plan(5);

  t.equal(typeof createStore, 'function', 'createStore is a function');

  var store = createStore({
    reducers: { foo: function (s) { return s || {}; }},
    history: require('react-router').createMemoryHistory()
  });

  t.ok(store, 'store was created');
  t.equal(typeof store.dispatch, 'function', 'store has a dispatch method');
  t.equal(typeof store.getState, 'function', 'store has a getState method');

  global.devToolsExtension = function () {
    return function (f) { return f; };
  };

  var devStore = createStore({
    reducers: { foo: function (s) { return s || {}; }},
    history: require('react-router').createMemoryHistory()
  });

  t.ok(devStore, 'devStore was created');
});
