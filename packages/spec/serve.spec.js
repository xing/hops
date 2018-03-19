/* eslint-env node, jest */

var fs = require('fs');
var path = require('path');

var rimraf = require('rimraf');
var mkdirp = require('mkdirp');
var fetch = require('isomorphic-fetch');

var originalDir = process.cwd();
var appDir = path.resolve(__dirname, 'fixtures', 'integration');
var buildDir = path.resolve(appDir, 'build');
var cacheDir = path.resolve(appDir, 'node_modules', '.cache', 'hops');

describe('production server', function() {
  jest.setTimeout(100000);

  var app;
  beforeAll(function(done) {
    rimraf.sync(buildDir);
    rimraf.sync(cacheDir);
    mkdirp.sync(cacheDir);
    process.chdir(appDir);
    jest.resetModules();
    require('hops-build').runBuild({ clean: true }, function() {
      require('hops-express').runServer({}, function(error, _app) {
        app = _app;
        done(error);
      });
    });
  });
  afterAll(function() {
    app.close();
    process.chdir(originalDir);
  });

  it('should create server.js', function() {
    var filePath = path.resolve(cacheDir, 'server.js');

    expect(fs.existsSync(filePath)).toBe(true);
  });

  it('should create manifest.js', function() {
    var filePath = path.resolve(cacheDir, 'manifest.js');

    expect(fs.existsSync(filePath)).toBe(true);
  });

  it('should create manifest file', function() {
    var filePath = path.join(buildDir, 'stats.json');

    expect(fs.existsSync(filePath)).toBe(true);
    var manifest = require(filePath);

    expect(manifest).toMatchObject({
      assetsByChunkName: {
        main: expect.any(Array),
      },
    });
  });

  it('should create build files', function() {
    var fileNames = fs.readdirSync(buildDir);

    expect(fileNames).toContainEqual(
      expect.stringMatching(/^main-[0-9a-f]+\.js$/)
    );
    expect(fileNames).toContainEqual(
      expect.stringMatching(/^vendor-[0-9a-f]+\.js$/)
    );
    expect(fileNames).toContainEqual(
      expect.stringMatching(/^main-[0-9a-f]+\.css$/)
    );
  });

  it('should deliver expected html page', function() {
    return fetch('http://localhost:8080/')
      .then(function(response) {
        expect(response.ok).toBe(true);
        return response.text();
      })
      .then(function(body) {
        expect(body.length).toBeGreaterThan(0);
        expect(body).toMatch('<!doctype html>');
        expect(body).toMatch('Hello World!');
      });
  });

  it('should deliver all asset files', function() {
    var manifest = require(path.resolve(buildDir, 'stats.json'));
    var assetsByChunkName = manifest.assetsByChunkName;

    expect(manifest).toMatchObject({
      assetsByChunkName: {
        main: expect.any(Array),
        vendor: expect.any(Array),
      },
    });

    return Promise.all(
      assetsByChunkName.main
        .concat(assetsByChunkName.vendor)
        .map(function(filename) {
          return fetch('http://localhost:8080/' + filename)
            .then(function(response) {
              expect(response.ok).toBe(true);
              return response.text();
            })
            .then(function(body) {
              expect(body.length).toBeGreaterThan(0);
              expect(body).not.toMatch('<!doctype html>');
              expect(body).toBe(
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
    return expect(
      fetch('http://localhost:8080/thisdoesnotexist')
    ).resolves.toMatchObject({
      status: 404,
    });
  });

  it('adds server-timing header', function() {
    return fetch('http://localhost:8080/').then(function(response) {
      expect(response.headers.get('server-timing')).toMatch('desc="Request"');
    });
  });
});
