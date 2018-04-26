/* eslint-env node, jest */

describe('express', function() {
  var res, req;

  beforeEach(function() {
    res = { locals: {} };
    req = {};
  });

  afterEach(jest.resetModules);

  describe('timings', function() {
    it('uses server-timings middleware when enableServerTimings is true', function() {
      const { createTimingsMiddleware } = require('../lib/middlewares');

      createTimingsMiddleware({ enableServerTimings: true })(
        req,
        res,
        function() {}
      );

      expect(res.locals.timings.start('foo')).toBeDefined();
    });

    it('uses noop timings middleware when enableServerTimings is false', function() {
      const { createTimingsMiddleware } = require('../lib/middlewares');

      createTimingsMiddleware({ enableServerTimings: false })(
        req,
        res,
        function() {}
      );

      expect(res.locals.timings.start('foo')).toBeUndefined();
    });
  });
});
