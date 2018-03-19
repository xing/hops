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
      jest.mock('hops-config', function() {
        return { enableServerTimings: true };
      });

      var hopsExpressTimings = require('..').utils.timings;

      hopsExpressTimings(req, res, function() {});

      expect(res.locals.timings.start('foo')).toBeDefined();
    });

    it('uses noop timings middleware when enableServerTimings is false', function() {
      jest.mock('hops-config', function() {
        return { enableServerTimings: false };
      });

      var hopsExpressTimings = require('..').utils.timings;

      hopsExpressTimings(req, res, function() {});

      expect(res.locals.timings.start('foo')).toBeUndefined();
    });
  });
});
