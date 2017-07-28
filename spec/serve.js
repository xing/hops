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
    require('hops-cli').runServe({}, function (_, _app) {
      app = _app;
      done();
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
    assert(Object.keys(manifest).length);
    return Promise.all(
      Object.keys(manifest).map(function (key) {
        if (key === 'manifest.js') return Promise.resolve();
        return fetch('http://localhost:8080' + manifest[key])
        .then(function (response) {
          assert(response.ok);
          return response.text();
        })
        .then(function (body) {
          assert(body.length);
          assert.equal(body.indexOf('<!doctype html>'), -1);
          assert.equal(body, fs.readFileSync(
            path.resolve(
              buildDir,
              manifest[key].replace(/^\/?/, '')
            ),
            'utf8'
          ));
        });
      })
    );
  });
});
