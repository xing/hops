/* eslint-env node, jest */

var path = require('path');
var assert = require('assert');

var rimraf = require('rimraf');
var mkdirp = require('mkdirp');
var fetch = require('isomorphic-fetch');

var originalDir = process.cwd();
var appDir = path.resolve(__dirname, 'mock', 'integration');
var buildDir = path.resolve(appDir, 'build');
var cacheDir = path.resolve(appDir, 'node_modules', '.cache', 'hops');

describe('development server', function() {
  jest.setTimeout(100000);

  var app;
  beforeAll(function(done) {
    rimraf.sync(buildDir);
    rimraf.sync(cacheDir);
    mkdirp.sync(cacheDir);
    process.chdir(appDir);
    jest.resetModules();
    require('hops-build').runServer({ clean: true }, function(_, _app) {
      app = _app;
      done();
    });
  });
  afterAll(function() {
    app.close();
    process.chdir(originalDir);
  });

  it('should deliver expected html page', function() {
    return fetch('http://localhost:8080/')
      .then(function(response) {
        assert(response.ok);
        return response.text();
      })
      .then(function(body) {
        assert(body.length);
        assert(body.indexOf('Hello World!') > -1);
      });
  });

  it('should deliver main js file', function() {
    return fetch('http://localhost:8080/main.js')
      .then(function(response) {
        assert(response.ok);
        return response.text();
      })
      .then(function(body) {
        assert(body.length);
        assert(body.indexOf('<!doctype html>') === -1);
        assert(body.indexOf('webpack') > -1);
      });
  });
});
