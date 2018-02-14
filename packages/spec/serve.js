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

describe('production server', function() {
  this.timeout(100000);

  var app;
  before(function(done) {
    rimraf.sync(buildDir);
    rimraf.sync(cacheDir);
    mkdirp.sync(cacheDir);
    process.chdir(appDir);
    Object.keys(require.cache).forEach(function(key) {
      delete require.cache[key];
    });
    require('hops-build').runBuild({ clean: true }, function() {
      require('hops-express').runServer({}, function(_, _app) {
        app = _app;
        done();
      });
    });
  });
  after(function() {
    app.close();
    process.chdir(originalDir);
  });

  it('should create server.js', function() {
    var filePath = path.resolve(cacheDir, 'server.js');
    assert(fs.existsSync(filePath));
  });

  it('should create manifest file', function() {
    var filePath = path.join(buildDir, 'stats.json');
    assert(fs.existsSync(filePath));
    var manifest = require(filePath);
    assert('assetsByChunkName' in manifest);
    assert('main' in manifest.assetsByChunkName);
  });

  it('should create build files', function() {
    var fileNames = fs.readdirSync(buildDir);
    assert(
      fileNames.find(function(name) {
        return /^main-.+\.js$/.test(name);
      })
    );
    assert(
      fileNames.find(function(name) {
        return /^vendor-.+\.js$/.test(name);
      })
    );
    assert(
      fileNames.find(function(name) {
        return /^main-[0-9a-f]+\.css$/.test(name);
      })
    );
  });

  it('should deliver expected html page', function() {
    return fetch('http://localhost:8080/')
      .then(function(response) {
        assert(response.ok);
        return response.text();
      })
      .then(function(body) {
        assert(body.length);
        assert.notEqual(body.indexOf('<!doctype html>'), -1);
        assert.notEqual(body.indexOf('Hello World!'), -1);
      });
  });

  it('should deliver all asset files', function() {
    var manifest = require(path.resolve(buildDir, 'stats.json'));
    var assetsByChunkName = manifest.assetsByChunkName;
    assert('main' in assetsByChunkName);
    assert('vendor' in assetsByChunkName);
    return Promise.all(
      assetsByChunkName.main
        .concat(assetsByChunkName.vendor)
        .map(function(filename) {
          return fetch('http://localhost:8080/' + filename)
            .then(function(response) {
              assert(response.ok);
              return response.text();
            })
            .then(function(body) {
              assert(body.length);
              assert.equal(body.indexOf('<!doctype html>'), -1);
              assert.equal(
                body,
                fs.readFileSync(
                  path.resolve(buildDir, filename.replace(/^\/?/, '')),
                  'utf8'
                )
              );
            });
        })
    );
  });

  it('should deliver 404 when route does not match', function() {
    return fetch('http://localhost:8080/thisdoesnotexist').then(function(
      response
    ) {
      assert(response.status === 404);
    });
  });
});
