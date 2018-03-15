/* eslint-env node, jest */

var assert = require('assert');

describe('express', function() {
  beforeEach(function() {
    jest.resetModules();
  });

  describe('timings', function() {
    it('uses server-timings middleware when enableServerTimings is true', function() {
      var hopsConfig = require('hops-config');
      hopsConfig.enableServerTimings = true;
      var hopsExpressTimings = require('hops-express').utils.timings;
      var res = { locals: {} };
      var req = {};

      hopsExpressTimings(req, res, function() {});
      assert(typeof res.locals.timings.start('foo') !== 'undefined');
    });

    it('uses noop timings middleware when enableServerTimings is false', function() {
      var hopsConfig = require('hops-config');
      hopsConfig.enableServerTimings = false;
      var hopsExpressTimings = require('hops-express').utils.timings;
      var res = { locals: {} };
      var req = {};

      hopsExpressTimings(req, res, function() {});
      assert(typeof res.locals.timings.start('foo') === 'undefined');
    });
  });
});
