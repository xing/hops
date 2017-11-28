/* eslint-env node, mocha */
var assert = require('assert');
var React = require('react');

var redux = require('hops-redux');
var hopsReact = require('hops-react');

describe('redux', function () {
  var defaultOptions = {
    someSlice: function () {
      return null;
    }
  };

  function setupContext (options) {
    return hopsReact.combineContexts(redux.contextDefinition)(
      Object.assign({}, defaultOptions, options || {})
    );
  }

  it('allows to set middlewares via option', function () {
    var called = false;
    var context = setupContext({
      middlewares: [
        function () {
          return function () {
            return function () {
              called = true;
            };
          };
        }
      ]
    });

    return context
      .enhanceElement(React.createElement('span'))
      .then(function (element) {
        element.props.store.dispatch({ type: '' });
        assert.ok(called);
      });
  });

  it('throws an error, when middlewares is provided but not an array', function () {
    assert.throws(function () {
      setupContext({
        middlewares: function () {}
      });
    });
  });
});
