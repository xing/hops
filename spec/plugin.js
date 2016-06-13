/* eslint-env node, mocha */

var path = require('path');
var assert = require('assert');

var Plugin = require('../plugin');


function mockCompiler(compilationOptions, callback) {
  var assets = {};
  return {
    plugin: function (_, handle) {
      var compilation = {
        options: compilationOptions,
        plugins: [],
        assets: assets
      };
      handle(compilation, callback);
    },
    assets: assets
  };
}

function mockOptions(options) {
  return Object.assign({
    config: path.resolve(__dirname, '..', 'etc', 'webpack.mock')
  }, options);
}


describe('plugin: basic operation', function () {
  it('should generally work as expected', function (done) {
    var plugin = new Plugin(mockOptions({ debug: true }));
    var compiler = mockCompiler({}, function () {
      var asset = compiler.assets['index.html'];
      assert(asset, 'index.html entry is created');
      assert(asset.source, 'asset.source exists');
      assert(asset.size, 'asset.size exists');
      assert.equal(asset.source.constructor, Function, 'asset.source is a function');
      assert.equal(asset.size.constructor, Function, 'asset.size is a function');
      assert.equal(asset.source().constructor, String, 'asset.source returns a string');
      assert.equal(asset.size().constructor, Number, 'asset.size returns a number');
      done();
    });
    plugin.apply(compiler);
  }).timeout(60000);
});


describe('plugin: one good, one bad location', function () {
  it('should only create a single entry', function (done) {
    var plugin = new Plugin(mockOptions({
      locations: ['/', '/foo/bar']
    }));
    var compiler = mockCompiler({}, function () {
      assert.equal(Object.keys(compiler.assets).length, 1, 'single entry created');
      done();
    });
    plugin.apply(compiler);
  }).timeout(60000);
});


describe('plugin: getFileName operation', function () {
  it('should generally work as expected', function () {
    var getName = Plugin.getFileName;
    assert.equal(getName(''), 'index.html', 'correct root dir file');
    assert.equal(getName('/'), 'index.html', 'correct root dir file');
    assert.equal(getName('//'), 'index.html', 'correct root dir file');
    assert.equal(getName('foo'), 'foo/index.html', 'correct subdir file');
    assert.equal(getName('/foo'), 'foo/index.html', 'correct subdir file');
    assert.equal(getName('foo/bar'), 'foo/bar/index.html', 'correct subdir file');
    assert.equal(getName('/foo/bar'), 'foo/bar/index.html', 'correct subdir file');
    assert.equal(getName('//foo//bar//'), 'foo/bar/index.html', 'correct subdir file');
    assert.equal(getName('foo.gif'), 'foo.gif', 'correct image file');
    assert.equal(getName('/foo.gif'), 'foo.gif', 'correct image file');
    assert.equal(getName('/foo/bar.gif'), 'foo/bar.gif', 'correct image file');
  });
});
