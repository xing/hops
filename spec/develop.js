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

describe('development server', function () {
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
    require('hops-cli').runDevelop({}, function (_, _app) {
      app = _app;
      done();
    });
  });
  after(function () {
    app.close();
    process.chdir(originalDir);
  });

  it('should deliver expected html page', function () {
    return fetch('http://localhost:8080/')
    .then(function (response) {
      assert(response.ok);
      return response.text();
    })
    .then(function (body) {
      assert(body.length);
      assert(body.indexOf('Hello World!') > -1);
    });
  });

  it('should deliver main js file', function () {
    return fetch('http://localhost:8080/main.js')
    .then(function (response) {
      assert(response.ok);
      return response.text();
    })
    .then(function (body) {
      assert(body.length);
      assert(body.indexOf('<!doctype html>') === -1);
      assert(body.indexOf('webpack') > -1);
    });
  });

  it('should create valid manifest file', function () {
    var filePath = path.resolve(cacheDir, 'manifest.json');
    assert(fs.existsSync(filePath));
    assert.equal(Object.keys(require(filePath)).length, 2);
  });
});
