/* eslint-env node, mocha */

var assert = require('assert');
var events = require('events');

var mocks = require('node-mocks-http');

var createMiddleware = require('../middleware');

var goodConfig = {
  renderConfig: require.resolve('./mock/webpack.good')
};
var badExportConfig = {
  renderConfig: require.resolve('./mock/webpack.bad-export')
};
var badHandlerConfig = {
  renderConfig: require.resolve('./mock/webpack.bad-handler')
};

describe('middleware', function () {
  it('should export a function', function () {
    assert.equal(typeof createMiddleware, 'function');
  });

  it('should create a middleware function', function () {
    var middleware = createMiddleware(goodConfig);
    assert.equal(typeof middleware, 'function');
  });

  describe('function', function () {
    it('should send a response', function (done) {
      var req = mocks.createRequest({
        url: '/'
      });
      var res = mocks.createResponse({
        eventEmitter: events.EventEmitter,
        request: req
      });
      res.on('finish', function () {
        assert.equal(res.statusCode, 200);
        assert.equal(res._getData(), 'Hello World!');
        done();
      });
      createMiddleware(goodConfig)(req, res);
    });

    it('should send default error response (bad export)', function (done) {
      var req = mocks.createRequest({
        url: '/'
      });
      var res = mocks.createResponse({
        eventEmitter: events.EventEmitter,
        request: req
      });
      res.on('finish', function () {
        assert.equal(res.statusCode, 500);
        assert.equal(res._getData(), '<h1>Server Error</h1>');
        done();
      });
      createMiddleware(badExportConfig)(req, res);
    });

    it('should send default error response (bad handler)', function (done) {
      var req = mocks.createRequest({
        url: '/'
      });
      var res = mocks.createResponse({
        eventEmitter: events.EventEmitter,
        request: req
      });
      res.on('finish', function () {
        assert.equal(res.statusCode, 500);
        assert.equal(res._getData(), '<h1>Server Error</h1>');
        done();
      });
      createMiddleware(badHandlerConfig)(req, res);
    });

    it('should call custom error handler', function (done) {
      var config = Object.assign({}, badExportConfig, {
        onError: function (req, res) {
          assert(true);
          done();
        }
      });
      var req = mocks.createRequest({
        url: '/'
      });
      var res = mocks.createResponse({
        eventEmitter: events.EventEmitter,
        request: req
      });
      createMiddleware(config)(req, res);
    });
  });
});
