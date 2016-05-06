
var test = require('tape');

var createAction = require('../lib/store').createAction;
var createReducer = require('../lib/store').createReducer;
var createSelector = require('../lib/store').createSelector;
var createStore = require('../lib/store').createStore;

test('createAction test', function (t) {
  t.plan(4);

  t.equal(typeof createAction, 'function', 'createAction is a function');

  var key = 'foo';
  var type = 'updateFoo';
  var payload = 'bar';

  var action = createAction(key);
  t.equal(typeof action, 'function', 'createAction returns a function');

  var result = action(payload);
  t.equal(result.type, type, 'result has the expected type');
  t.equal(result.payload, payload, 'result has the expected payload');
});


test('createReducer test', function (t) {
  t.plan(7);

  t.equal(typeof createReducer, 'function', 'createReducer is a function');

  var key = 'foo';

  var reducer = createReducer(key);
  t.equal(typeof reducer, 'function', 'createReducer returns a function');

  t.deepEqual(reducer(), {}, 'reducer returns default object');
  t.deepEqual(reducer({ bar: 1 }), { bar: 1 }, 'reducer returns given object');
  t.notEqual(reducer({}), {}, 'reducer clones passed in object');

  var action = createAction(key)({'bar': {'$set': 1 }});
  t.deepEqual(reducer({}, action), { bar: 1 }, 'reducer applies action');
  t.deepEqual(reducer({}, 'baz'), {}, 'reducer does not apply unknown action');
});


test('createSelector test', function (t) {
  t.plan(5);

  t.equal(typeof createSelector, 'function', 'createSelector is a function');

  var input = { foo: 1, bar: 2, baz: 'qux' };

  var selector = createSelector(
    'foo',
    function (state) {
      return state.bar;
    },
    function (foo, bar) {
      t.equal(foo, input.foo, 'input selector is generated from string');
      t.equal(bar, input.bar, 'conventional input selector is working');
      return foo + bar;
    }
  );
  t.equal(typeof selector, 'function', 'createSelector returns a function');

  var output = selector(input);
  t.equal(output, 3, 'selector processes state appropriately');
});


test('createStore test', function (t) {
  t.plan(5);

  t.equal(typeof createStore, 'function', 'createStore is a function');

  var store = createStore(
    { foo: function (s) { return s || {}; }},
    null,
    null,
    require('react-router').createMemoryHistory()
  );

  t.ok(store, 'store was created');
  t.equal(typeof store.dispatch, 'function', 'store has a dispatch method');
  t.equal(typeof store.getState, 'function', 'store has a getState method');

  global.devToolsExtension = function () {
    return function (f) { return f; };
  };

  var devStore = createStore(
    { foo: function (s) { return s || {}; }},
    null,
    null,
    require('react-router').createMemoryHistory()
  );

  t.ok(devStore, 'devStore was created');
});
