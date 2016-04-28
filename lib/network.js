
var fetch = require('isomorphic-fetch');
var bindActionCreators = require('redux').bindActionCreators;

var createAction = require('./store').createAction;

function normalizeOptions(defaults, overrides) {
  if (typeof defaults === 'string') {
    defaults = { url: defaults };
  }
  if (typeof overrides === 'string') {
    overrides = { url: overrides };
  }
  return Object.assign({}, defaults, overrides);
}

function generateHandlers(actions, dispatch) {
  var defaults = {
    requestWillStart: function () {},
    responseWasReceived: function () {},
    errorWasReceived: function (error) { throw error; }
  };
  var overrides = bindActionCreators(actions, dispatch);
  return Object.assign({}, defaults, overrides);
}

function composeFetchAction(defaults, actions) {
  return function (overrides) {
    var options = normalizeOptions(defaults, overrides);
    return function (dispatch) {
      var handlers = generateHandlers(actions, dispatch);
      handlers.requestWillStart();
      return fetch(options.url, options)
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
      })
      .then(handlers.responseWasReceived)
      .catch(handlers.errorWasReceived);
    };
  };
}

exports.createFetchAction = function (key, defaults) {
  var update = createAction(key);
  var actions = {
    requestWillStart: function () {
      return update({'loading': {'$set': true }});
    },
    responseWasReceived: function (data) {
      return update({'$merge': {
        loading: false,
        error: false,
        data: data
      }});
    },
    errorWasReceived: function (error) {
      return update({'$merge': {
        loading: false,
        error: error.message
      }});
    }
  };
  return composeFetchAction(defaults, actions);
};

exports.composeFetchAction = composeFetchAction;
