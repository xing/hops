/* eslint-env node, mocha */

var assert = require('assert');
var events = require('events');

var transpile = require('hops-transpiler');

var goodConfig = require('./mock/webpack.good');
var badExportConfig = require('./mock/webpack.bad-export');
var badHandlerConfig = require('./mock/webpack.bad-handler');

describe('transpiler', function () {
  this.timeout(5000);

  it('should export a function', function () {
    assert.equal(typeof transpile, 'function');
  });

  it('should create a transpilation', function () {
    var transpiler = transpile(goodConfig);
    assert(transpiler instanceof events.EventEmitter);
    assert.equal(typeof transpiler.close, 'undefined');
  });

  describe('instance', function () {
    it('should emit a success event', function (done) {
      transpile(goodConfig)
      .on('success', function () {
        assert(true);
        done();
      });
    });

    it('should provide a function on success', function (done) {
      transpile(goodConfig)
      .on('success', function (result) {
        assert.equal(typeof result, 'object');
        assert.equal(typeof result.default, 'function');
        done();
      });
    });

    it('should emit an error event (bad export)', function (done) {
      transpile(badExportConfig)
      .on('error', function (error) {
        assert(error instanceof Error);
        done();
      });
    });

    it('should not emit an error event (bad handler)', function (done) {
      transpile(badHandlerConfig)
      .on('error', function () {
        assert(false);
        done();
      })
      .on('success', function (result) {
        assert.equal(typeof result, 'object');
        assert.equal(typeof result.default, 'function');
        done();
      });
    });
  });
});
