/* eslint-env node, jest */

var path = require('path');

var rimraf = require('rimraf');
var mkdirp = require('mkdirp');
var fetch = require('isomorphic-fetch');

var originalDir = process.cwd();
var appDir = path.join(__dirname, 'mock', 'integration');
var buildDir = path.join(appDir, 'build');
var cacheDir = path.join(appDir, 'node_modules', '.cache', 'hops');

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
        expect(response.ok).toBe(true);
        return response.text();
      })
      .then(function(body) {
        expect(body.length).toBeGreaterThan(0);
        expect(body).toMatch('Hello World!');
      });
  });

  it('should deliver main js file', function() {
    return fetch('http://localhost:8080/main.js')
      .then(function(response) {
        expect(response.ok).toBe(true);
        return response.text();
      })
      .then(function(body) {
        expect(body.length).toBeGreaterThan(0);
        expect(body).not.toMatch('<!doctype html>');
        expect(body).toMatch('webpack');
      });
  });
});
