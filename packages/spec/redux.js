/* eslint-env node, mocha */
var assert = require('assert');

var hopsRedux = require('hops-redux');

describe('redux', function () {
  it('allows to set middlewares via option', function () {
    var middleware = function () {};
    var context = new hopsRedux.contextDefinition({
      middlewares: [middleware]
    });
    assert.equal(context.getMiddlewares()[0], middleware);
  });

  it('throws array when middlewares is not an array', function () {
    assert.throws(function () {
      new hopsRedux.contextDefinition({
        middlewares: function () {}
      });
    });
  });
});
