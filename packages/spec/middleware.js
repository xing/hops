/* eslint-env node, mocha */

var assert = require('assert');
var events = require('events');

var mocks = require('node-mocks-http');

var createMiddleware = require('hops-build').createMiddleware;

var goodConfig = require('./mock/webpack.good');
var badExportConfig = require('./mock/webpack.bad-export');
var badHandlerConfig = require('./mock/webpack.bad-handler');

describe('middleware', function() {
  this.timeout(10000);

  it('should export a function', function() {
    assert.equal(typeof createMiddleware, 'function');
  });

  it('should create a middleware function', function() {
    var middleware = createMiddleware(goodConfig);
    assert.equal(typeof middleware, 'function');
  });

  describe('function', function() {
    it('should send a response', function(done) {
      var req = mocks.createRequest({
        url: '/',
      });
      var res = mocks.createResponse({
        eventEmitter: events.EventEmitter,
        request: req,
      });
      res.on('finish', function() {
        assert.equal(res.statusCode, 200);
        assert.equal(res._getData(), 'Hello World!');
        done();
      });
      createMiddleware(goodConfig)(req, res);
    });

    it('should pass errors to next() (bad export)', function(done) {
      var req = mocks.createRequest({
        url: '/',
      });
      var res = mocks.createResponse({
        eventEmitter: events.EventEmitter,
        request: req,
      });
      createMiddleware(badExportConfig)(req, res, function(error) {
        assert(!!error);
        done();
      });
    });

    it('should pass errors to next() (bad handler)', function(done) {
      var req = mocks.createRequest({
        url: '/',
      });
      var res = mocks.createResponse({
        eventEmitter: events.EventEmitter,
        request: req,
      });
      createMiddleware(badHandlerConfig)(req, res, function(error) {
        assert(!!error);
        done();
      });
    });
  });
});
