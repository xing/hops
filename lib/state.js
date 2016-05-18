
var Reselect = require('reselect');
var update = require('react-addons-update');

function getType(key) {
  return 'update' + key.charAt(0).toUpperCase() + key.slice(1);
}

function ReducerShape (shape) {
  Object.assign(this, shape);
}
ReducerShape.prototype.add = function (key, reducer) {
  if (key in this) {
    throw new Error('namespace clash: ' + key);
  }
  this[key] = reducer || exports.createReducer(key);
  return this;
};

exports.createReducers = function (shape) {
  return new ReducerShape(shape);
};

exports.createReducer = function (key) {
  var type = getType(key);
  return function (state, action) {
    if (action && action.type === type) {
      return update(state, action.payload);
    }
    return Object.assign({}, state);
  };
};

exports.createAction = function (key) {
  var type = getType(key);
  return function (payload) {
    return { type: type, payload: payload };
  };
};

exports.createSelector = function () {
  var argumentsArray = Array.prototype.slice.call(arguments, 0);
  var selectors = argumentsArray.map(function (selector) {
    return (typeof selector === 'function') ? selector : function (state) {
      return state[selector];
    };
  });
  return Reselect.createSelector.apply(Reselect, selectors);
};
