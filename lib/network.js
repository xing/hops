
var fetch = require('isomorphic-fetch');
var Redux = require('redux');

var createAction = require('./store').createAction;

var customOptions = ['url', 'onStart', 'onSuccess', 'onError'];
var mocks = {};

function isString(object) {
  return (typeof object === 'string');
}

function processOptions(defaults, overrides) {
  return Object.assign(
    {},
    isString(defaults) ? { url: defaults } : defaults,
    isString(overrides) ? { url: overrides } : overrides
  );
}

function filterOptions(options) {
  return Object.keys(options).reduce(function (result, key) {
    if (customOptions.indexOf(key) !== -1) {
      result[key] = options.key;
    }
    return result;
  }, {});
}

function doFetch(options, updates) {
  updates.onStart();
  return Promise.resolve().then(function () {
    if (options.url in mocks) {
      return mocks[options.url](options);
    }
    else {
      return fetch(options.url, filterOptions(options))
      .then(function (response) {
        if (response.status >= 200 && response.status <= 304) {
          return response.json();
        }
        else {
          throw Object.assign(
            new Error(response.statusText),
            { response: response }
          );
        }
      });
    }
  })
  .then(updates.onSuccess)
  .catch(updates.onError);
}

exports.createFetchAction = function (key, defaults) {
  var update = createAction(key);
  return function (overrides) {
    var options = processOptions(defaults, overrides);
    var bindUpdates = Redux.bindActionCreators.bind(Redux, {
      onStart: options.onStart || function () {
        return update({'$merge': {
          loaded: false,
          loading: true
        }});
      },
      onSuccess: options.onSuccess || function (data) {
        return update({'$merge': {
          loaded: true,
          loading: false,
          error: false,
          data: data
        }});
      },
      onError: options.onError || function (error) {
        return update({'$merge': {
          loaded: false,
          loading: false,
          error: error.message
        }});
      }
    });
    return function (dispatch) {
      return doFetch(options, bindUpdates(dispatch));
    };
  };
};

exports.mockFetch = function (url, value) {
  if (typeof value === 'undefined') {
    delete mocks[url];
  }
  else {
    mocks[url] = function (options) {
      if (typeof value === 'function') {
        return value(options);
      }
      else {
        return Promise.resolve(value);
      }
    };
  }
};
