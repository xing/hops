
var test = require('tape');

var browser = require('../lib/browser');
var server = require('../lib/node');

var store = require('../lib/store');
var network = require('../lib/network');

test('browser exports', function (t) {
  t.plan(7);

  t.equal(typeof browser.render, 'function', 'render is a function');

  t.equal(browser.createAction, store.createAction, 'createAction is correct');
  t.equal(browser.createReducer, store.createReducer, 'createReducer is correct');
  t.equal(browser.createSelector, store.createSelector, 'createSelector is correct');
  t.equal(browser.createStore, store.createStore, 'createSelector is correct');

  t.equal(browser.createFetchAction, network.createFetchAction, 'createFetchAction is correct');
  t.equal(browser.mockFetch, network.mockFetch, 'mockFetch is correct');
});

test('server exports', function (t) {
  t.plan(7);

  t.equal(typeof server.render, 'function', 'render is a function');

  t.equal(server.createAction, store.createAction, 'createAction is correct');
  t.equal(server.createReducer, store.createReducer, 'createReducer is correct');
  t.equal(server.createSelector, store.createSelector, 'createSelector is correct');
  t.equal(server.createStore, store.createStore, 'createSelector is correct');

  t.equal(server.createFetchAction, network.createFetchAction, 'createFetchAction is correct');
  t.equal(server.mockFetch, network.mockFetch, 'mockFetch is correct');
});

test('reexports', function (t) {
  t.plan(6);

  t.equal(typeof store.createAction, 'function', 'createAction is a function');
  t.equal(typeof store.createReducer, 'function', 'createReducer is a function');
  t.equal(typeof store.createSelector, 'function', 'createSelector is a function');
  t.equal(typeof store.createStore, 'function', 'createSelector is a function');

  t.equal(typeof network.createFetchAction, 'function', 'createFetchAction is a function');
  t.equal(typeof network.mockFetch, 'function', 'mockFetch is a function');
});
