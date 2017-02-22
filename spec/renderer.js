/* eslint-env node, mocha */

var assert = require('assert');

var createRenderer = require('../renderer');

var goodConfig = require('./mock/webpack.good');
var badExportConfig = require('./mock/webpack.bad-export');
var badHandlerConfig = require('./mock/webpack.bad-handler');

describe('renderer', function () {
  this.timeout(5000);

  it('should export a function', function () {
    assert.equal(typeof createRenderer, 'function');
  });

  it('should create a renderer function', function () {
    var render = createRenderer(goodConfig);
    assert.equal(typeof render, 'function');
  });

  describe('function', function () {
    it('should return a promise', function () {
      var render = createRenderer(goodConfig);
      var promise = render('/');
      assert(promise instanceof Promise);
    });

    it('should render expected result', function (done) {
      var render = createRenderer(goodConfig);
      render('/')
      .then(function (result) {
        assert.equal(typeof result, 'string');
        assert.equal(result, 'Hello World!');
        done();
      });
    });

    it('should reject promise (bad export)', function (done) {
      var render = createRenderer(badExportConfig);
      render('/')
      .catch(function () {
        assert(true);
        done();
      });
    });

    it('should reject promise (bad handler)', function (done) {
      var render = createRenderer(badHandlerConfig);
      render('/')
      .catch(function () {
        assert(true);
        done();
      });
    });
  });
});
