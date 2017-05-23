/* eslint-env node, mocha */

var assert = require('assert');

var Plugin = require('../packages/plugin');

var goodConfig = require('./mock/webpack.good');
var badExportConfig = require('./mock/webpack.bad-export');
var badHandlerConfig = require('./mock/webpack.bad-handler');

function Mockpiler (callback) {
  this.callback = callback;
  this.compilation = { assets: {} };
}

Mockpiler.prototype.plugin = function (_, handle) {
  handle(this.compilation, this.callback);
};

describe('plugin', function () {
  this.timeout(5000);

  it('should export a (constructor) function', function () {
    assert.equal(typeof Plugin, 'function');
  });

  describe('instance', function () {
    it('should produce index.html asset', function (done) {
      var compiler = new Mockpiler(function () {
        var assets = compiler.compilation.assets;
        assert.equal(Object.keys(assets).length, 1);
        assert('index.html' in assets);
        done();
      });
      var plugin = new Plugin(['/'], goodConfig);
      plugin.apply(compiler);
    });

    it('should render expected result', function (done) {
      var compiler = new Mockpiler(function () {
        var assets = compiler.compilation.assets;
        var result = assets['index.html'].source();
        assert.equal(result, 'Hello World!');
        done();
      });
      var plugin = new Plugin(['/'], goodConfig);
      plugin.apply(compiler);
    });

    it('should return error (bad export)', function (done) {
      var compiler = new Mockpiler(function (error) {
        assert(error instanceof Error);
        done();
      });
      var plugin = new Plugin(['/'], badExportConfig);
      plugin.apply(compiler);
    });

    it('should return error (bad handler)', function (done) {
      var compiler = new Mockpiler(function (error) {
        assert(error instanceof Error);
        done();
      });
      var plugin = new Plugin(['/'], badHandlerConfig);
      plugin.apply(compiler);
    });
  });
});
