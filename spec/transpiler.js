/* eslint-env node, mocha */

var assert = require('assert');
var events = require('events');

var transpile = require('../transpiler');

var goodConfig = require('./mock/webpack.good');
var badExportConfig = require('./mock/webpack.bad-export');

describe('transpiler', function () {
  it('should export a function', function () {
    assert.equal(typeof transpile, 'function');
  });

  it('should create a transpilation', function () {
    var emitter = transpile(goodConfig);
    assert(emitter instanceof events.EventEmitter);
    assert.equal(typeof emitter.close, 'undefined');
  });

  it('should create a watching transpilation', function () {
    var emitter = transpile(goodConfig, {});
    assert(emitter instanceof events.EventEmitter);
    assert.equal(typeof emitter.close, 'function');
    emitter.close();
  });

  describe('transpilation', function () {
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

    it('should emit an error event', function (done) {
      transpile(badExportConfig)
      .on('error', function () {
        assert(true);
        done();
      });
    });
  });
});
