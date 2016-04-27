
var fetch = require('isomorphic-fetch');

var createAction = require('./store').createAction;

exports.createFetchAction = function (key, url, defaults) {
  var update = createAction(key);
  return function (overrides) {
    var options = Object.assign({}, defaults, overrides);
    return function (dispatch) {
      dispatch(update({'loading': {'$set': true }}));
      return fetch(url, options)
      .then(function (response) {
        if (response.status >= 200 && response.status <= 304) {
          return response.json();
        }
        else {
          throw new Error(response.statusText);
        }
      })
      .then(function (data) {
        dispatch(update({'$merge': {
          loading: false,
          error: false,
          data: data
        }}));
      })
      .catch(function (error) {
        dispatch(update({'$merge': {
          loading: false,
          error: error
        }}));
      });
    };
  };
};
