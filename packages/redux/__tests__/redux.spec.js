/* eslint-env node, jest */

// var hopsRedux = require('..');

describe.skip('redux', function() {
  it('allows to set middlewares via option', function() {
    var middleware = function() {};
    var context = new hopsRedux.ReduxContext({
      middlewares: [middleware],
    });
    expect(context.getMiddlewares()[0]).toBe(middleware);
  });

  it('throws error when middlewares is not an array', function() {
    expect(function() {
      // eslint-disable-next-line no-new
      new hopsRedux.ReduxContext({
        middlewares: function() {},
      });
    }).toThrow();
  });
});
