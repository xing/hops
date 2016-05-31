
var path = require('path');

var test = require('tape');

var Plugin = require('../plugin');


function mockCompiler(compilationOptions, callback) {
  var assets = {};
  return {
    plugin: function (_, handle) {
      var compilation = {
        options: Object.assign({
          module: { loaders: [] }
        }, compilationOptions),
        assets: assets
      };
      handle(compilation, callback);
    },
    assets: assets
  };
}

function mockOptions(options) {
  return Object.assign({
    entry: path.resolve(__dirname, '..', 'shims', 'node.js'),
    main: path.resolve(__dirname, '..', 'tmp', 'src', 'main.js')
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


test('plugin: no entry', function (t) {
  t.plan(2);
  var plugin = new Plugin(mockOptions({ entry: '' }));
  var compiler = mockCompiler({}, function () {
    t.pass('callback is being called');
    t.notOk(Object.keys(compiler.assets).length, 'no entries created');
  });
  plugin.apply(compiler);
});


test('plugin: no main', function (t) {
  t.plan(2);
  var plugin = new Plugin(mockOptions({ main: '' }));
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


test('plugin: getBabelIgnore default', function (t) {
  var actual = Plugin.getBabelIgnore({
    module: { loaders: []}
  });
  var expected = /node_modules\//;
  t.equal(actual.source, expected.source, 'default babelIgnore is used');
  t.end();
});


test('plugin: getBabelIgnore extraction', function (t) {
  var actual1 = Plugin.getBabelIgnore({
    module: { loaders: [{ loader: 'babel', exclude: /foo\// }]}
  });
  var expected1 = /foo\//;
  t.equal(actual1.source, expected1.source, 'babelIgnore is extracted');
  var actual2 = Plugin.getBabelIgnore({
    module: { loaders: [{ loaders: ['babel'], exclude: /foo\// }]}
  });
  var expected2 = /foo\//;
  t.equal(actual2.source, expected2.source, 'babelIgnore is extracted (multi)');
  t.end();
});


test('plugin: getLocalIdentName default', function (t) {
  var actual1 = Plugin.getLocalIdentName({
    module: { loaders: []}
  });
  var actual2 = Plugin.getLocalIdentName({
    module: {
      loaders: [{
        loaders: [
          'css?'
        ]
      }]
    }
  });
  var expected = '[path][name]-[local]-[hash:base64:5]';
  t.equal(actual1, expected, 'default localIdentName is used');
  t.equal(actual2, expected, 'default localIdentName is used (no config)');
  t.end();
});


test('plugin: getLocalIdentName extraction', function (t) {
  var actual = Plugin.getLocalIdentName({
    module: {
      loaders: [{
        loaders: [
          'css?modules&localIdentName=foo-[hash:base64:5]'
        ]
      }]
    }
  });
  var expected = 'foo-[hash:base64:5]';
  t.equal(actual, expected, 'localIdentName is extracted');
  t.end();
});
