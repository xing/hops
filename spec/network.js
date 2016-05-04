
var test = require('tape');

var mockFetch = require('../lib/network').mockFetch;
var createFetchAction = require('../lib/network').createFetchAction;


test('network basics test', function (t) {
  t.plan(2);

  t.equal(typeof mockFetch, 'function', 'mockFetch is a function');
  t.equal(typeof createFetchAction, 'function', 'createFetchAction is a function');
});


test('network.createFetchAction simple test', function (t) {
  t.plan(3);

  var url = 'http://example.com/foo';
  var response = { foo: 'bar'};
  mockFetch(url, response);

  var action = createFetchAction('foo', url);

  var expectations = [
    {
      payload: { $merge: { loaded: false, loading: true } },
      type: 'updateFoo'
    },
    {
      payload: { $merge: { data: response, error: false, loaded: true, loading: false } },
      type: 'updateFoo'
    }
  ];
  var counter = 0;
  var dispatch = function (argument) {
    t.deepEqual(argument, expectations[counter], 'action #' + counter + ' is ok');
    counter++;
  };

  var promise = action()(dispatch);
  t.ok(promise instanceof Promise, 'simple action execution produces promise');
});


test('network.createFetchAction complex test', function (t) {
  t.plan(3);

  var url = 'http://example.com/foo';
  var response = { foo: 'bar'};
  mockFetch(url, response);

  var action = createFetchAction('foo', { url: url, method: 'GET'});

  var expectations = [
    {
      payload: { $merge: { loaded: false, loading: true } },
      type: 'updateFoo'
    },
    {
      payload: { $merge: { data: response, error: false, loaded: true, loading: false } },
      type: 'updateFoo'
    }
  ];
  var counter = 0;
  var dispatch = function (argument) {
    t.deepEqual(argument, expectations[counter], 'action #' + counter + ' is ok');
    counter++;
  };

  var promise = action()(dispatch);
  t.ok(promise instanceof Promise, 'complex action execution produces promise');
});
