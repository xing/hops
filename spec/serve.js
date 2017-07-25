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
  this.timeout(50000);

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

  it('should deliver expected html page', function (done) {
    fetch('http://localhost:8080/')
    .then(function (response) {
      assert(response.ok);
      return response.text();
    })
    .then(function (body) {
      assert(body.length);
      assert(body.indexOf('Hello World!') > -1);
      done();
    });
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
    assert(fileNames.length = 2);
  });
});
