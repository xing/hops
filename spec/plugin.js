/* eslint-env node, mocha */

var assert = require('assert');

var Plugin = require('../plugin');

var goodConfig = {
  renderConfig: require.resolve('./mock/webpack.good'),
  locations: ['/']
};

function Mockpiler (callback) {
  this.callback = callback;
  this.compilation = { assets: {} };
}

Mockpiler.prototype.plugin = function (_, handle) {
  handle(this.compilation, this.callback);
};

describe('plugin', function () {
  it('should export a (constructor) function', function () {
    assert.equal(typeof Plugin, 'function');
  });

  describe('instance', function () {
    it('should generally work as expected', function (done) {
      var compiler = new Mockpiler(function () {
        var assets = compiler.compilation.assets;
        assert.equal(Object.keys(assets).length, 1);
        assert('index.html' in assets);
        done();
      });
      var plugin = new Plugin(goodConfig);
      plugin.apply(compiler);
    });

    it('should generally work as expected', function (done) {
      var compiler = new Mockpiler(function () {
        var assets = compiler.compilation.assets;
        assert.equal(Object.keys(assets).length, 1);
        assert('index.html' in assets);
        done();
      });
      var plugin = new Plugin(goodConfig);
      plugin.apply(compiler);
    });
  });
});
