/* eslint-env node, jest */

var path = require('path');

var rimraf = require('rimraf');
var mkdirp = require('mkdirp');
var fetch = require('isomorphic-fetch');

var originalDir = process.cwd();
var appDir = path.join(__dirname, 'fixtures', 'integration');
var buildDir = path.join(appDir, 'build');
var cacheDir = path.join(appDir, 'node_modules', '.cache', 'hops');

describe('development server', function() {
  jest.setTimeout(100000);

  var app;
  var port;
  beforeAll(function(done) {
    rimraf.sync(buildDir);
    rimraf.sync(cacheDir);
    mkdirp.sync(cacheDir);
    process.chdir(appDir);
    jest.resetModules();
    require('hops-build').runServer({ clean: true, _: ['develop'] }, function(
      error,
      _app
    ) {
      app = _app;
      port = app.address().port;
      done(error);
    });
  });
  afterAll(function() {
    app.close();
    process.chdir(originalDir);
  });

  it('should deliver expected html page', function() {
    return fetch('http://localhost:' + port + '/')
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
    return fetch('http://localhost:' + port + '/main.js')
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
