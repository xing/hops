
var path = require('path');
var test = require('tape');

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
    config: path.resolve(__dirname, '..', 'etc', 'webpack.test')
  }, options);
}


test('plugin: basic operation', function (t) {
  t.plan(8);
  var plugin = new Plugin(mockOptions({ debug: true }));
  var compiler = mockCompiler({}, function () {
    var asset = compiler.assets['index.html'];
    t.pass('callback is being called');
    t.ok(asset, 'index.html entry is created');
    t.ok(asset.source, 'asset.source exists');
    t.ok(asset.size, 'asset.size exists');
    t.equal(asset.source.constructor, Function, 'asset.source is a function');
    t.equal(asset.size.constructor, Function, 'asset.size is a function');
    t.equal(asset.source().constructor, String, 'asset.source returns a string');
    t.equal(asset.size().constructor, Number, 'asset.size returns a number');
  });
  plugin.apply(compiler);
});


test('plugin: one good, one bad location', function (t) {
  t.plan(2);
  var plugin = new Plugin(mockOptions({
    locations: ['/', '/foo/bar']
  }));
  var compiler = mockCompiler({}, function () {
    t.pass('callback is being called');
    t.equal(Object.keys(compiler.assets).length, 1, 'single entry created');
  });
  plugin.apply(compiler);
});


test('plugin: no locations', function (t) {
  t.plan(2);
  var plugin = new Plugin(mockOptions({
    locations: []
  }));
  var compiler = mockCompiler({}, function () {
    t.pass('callback is being called');
    t.notOk(Object.keys(compiler.assets).length, 'no entries created');
  });
  plugin.apply(compiler);
});


test('plugin: getFileName operation', function (t) {
  var getName = Plugin.getFileName;
  t.equal(getName(''), 'index.html', 'correct root dir file');
  t.equal(getName('/'), 'index.html', 'correct root dir file');
  t.equal(getName('//'), 'index.html', 'correct root dir file');
  t.equal(getName('foo'), 'foo/index.html', 'correct subdir file');
  t.equal(getName('/foo'), 'foo/index.html', 'correct subdir file');
  t.equal(getName('foo/bar'), 'foo/bar/index.html', 'correct subdir file');
  t.equal(getName('/foo/bar'), 'foo/bar/index.html', 'correct subdir file');
  t.equal(getName('//foo//bar//'), 'foo/bar/index.html', 'correct subdir file');
  t.equal(getName('foo.gif'), 'foo.gif', 'correct image file');
  t.equal(getName('/foo.gif'), 'foo.gif', 'correct image file');
  t.equal(getName('/foo/bar.gif'), 'foo/bar.gif', 'correct image file');
  t.end();
});
