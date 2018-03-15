/* eslint-env node, jest */

var events = require('events');
var mocks = require('node-mocks-http');

var createMiddleware = require('hops-build').createMiddleware;

var goodConfig = require('./mock/webpack.good');
var badExportConfig = require('./mock/webpack.bad-export');
var badHandlerConfig = require('./mock/webpack.bad-handler');

describe('middleware', function() {
  jest.setTimeout(100000);

  it('should export a function', function() {
    expect(typeof createMiddleware).toBe('function');
  });

  it('should create a middleware function', function() {
    var middleware = createMiddleware(goodConfig);
    expect(typeof middleware).toBe('function');
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
        expect(res.statusCode).toBe(200);
        expect(res._getData()).toBe('Hello World!');
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
        expect(error).toBeDefined();
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
        expect(error).toBeDefined();
        done();
      });
    });
  });
});
