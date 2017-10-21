/* eslint-env node, mocha */

var fs = require('fs');
var path = require('path');
var assert = require('assert');

var rimraf = require('rimraf');
var mkdirp = require('mkdirp');
var fetch = require('isomorphic-fetch');

var originalDir = process.cwd();
var appDir = path.resolve(__dirname, 'mock', 'integration');
var buildDir = path.resolve(appDir, 'build');
var cacheDir = path.resolve(appDir, 'node_modules', '.cache', 'hops');

describe('production server', function () {
  this.timeout(100000);

  var app;
  before(function (done) {
    rimraf.sync(buildDir);
    rimraf.sync(cacheDir);
    mkdirp.sync(cacheDir);
    process.chdir(appDir);
    Object.keys(require.cache).forEach(function (key) {
      delete require.cache[key];
    });
    require('hops-build').runBuild({ clean: true }, function () {
      require('hops-express').runServer({}, function (_, _app) {
        app = _app;
        done();
      });
    });
  });
  after(function () {
    app.close();
    process.chdir(originalDir);
  });

  it('should create manifest.json', function () {
    var filePath = path.resolve(cacheDir, 'manifest.json');
    assert(fs.existsSync(filePath));
  });

  it('should create manifest.js', function () {
    var filePath = path.resolve(cacheDir, 'manifest.js');
    assert(fs.existsSync(filePath));
  });

  it('should create server.js', function () {
    var filePath = path.resolve(cacheDir, 'server.js');
    assert(fs.existsSync(filePath));
  });

  it('should create build files', function () {
    var fileNames = fs.readdirSync(buildDir);
    assert(fileNames.find(function (name) {
      return /^main-[0-9a-f]+\.js$/.test(name);
    }));
    assert(fileNames.find(function (name) {
      return /^vendor-[0-9a-f]+\.js$/.test(name);
    }));
    assert(fileNames.find(function (name) {
      return /^main-[0-9a-f]+\.css$/.test(name);
    }));
  });

  it('should deliver expected html page', function () {
    return fetch('http://localhost:8080/')
      .then(function (response) {
        assert(response.ok);
        return response.text();
      })
      .then(function (body) {
        assert(body.length);
        assert.notEqual(body.indexOf('<!doctype html>'), -1);
        assert.notEqual(body.indexOf('Hello World!'), -1);
      });
  });

  it('should deliver all asset files', function () {
    var manifest = require(path.resolve(cacheDir, 'manifest.json'));
    assert('js' in manifest);
    assert('css' in manifest);
    assert.equal(manifest.js.length, 2);
    assert.equal(manifest.css.length, 1);
    return Promise.all(
      manifest.css.concat(manifest.js).map(function (filename) {
        return fetch('http://localhost:8080' + filename)
          .then(function (response) {
            assert(response.ok);
            return response.text();
          })
          .then(function (body) {
            assert(body.length);
            assert.equal(body.indexOf('<!doctype html>'), -1);
            assert.equal(body, fs.readFileSync(
              path.resolve(buildDir, filename.replace(/^\/?/, '')),
              'utf8'
            ));
          });
      })
    );
  });
});
