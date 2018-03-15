/* eslint-env node, mocha */

var path = require('path');
var assert = require('assert');

var originalDir = process.cwd();

function clearRequireCache() {
  Object.keys(require.cache).forEach(function(key) {
    delete require.cache[key];
  });
}

describe('config', function() {
  beforeEach(clearRequireCache);

  afterEach(function() {
    process.chdir(originalDir);
  });

  it('should return the default configuration', function() {
    var hopsConfig = require('hops-config');
    assert.deepEqual(hopsConfig, {
      https: false,
      host: '0.0.0.0',
      port: 8080,
      locations: [],
      basePath: '',
      assetPath: '',
      browsers: '> 1%, last 2 versions, Firefox ESR',
      node: 'current',
      envVars: { HOPS_MODE: 'dynamic' },
      moduleDirs: [],
      appDir: process.cwd(),
      buildDir: path.resolve('build'),
      cacheDir: path.resolve('node_modules', '.cache', 'hops'),
      workerFile: null,
      enableServerTimings: true,
      workerPath: '/sw.js',
    });
  });

  it('should override defaults with config from package.json', function() {
    process.chdir(path.join(__dirname, 'mock', 'config', 'package-json'));
    var hopsConfig = require('hops-config');
    assert.equal(hopsConfig.port, 1337);
  });

  it('should override defaults with config from .hopsrc.json', function() {
    process.chdir(path.join(__dirname, 'mock', 'config', 'rc-file'));
    var hopsConfig = require('hops-config');
    assert.equal(hopsConfig.port, 3000);
  });

  it('should overwrite base config with config defined in extension', function() {
    process.chdir(path.join(__dirname, 'mock', 'config', 'simple-extends'));
    var hopsConfig = require('hops-config');
    assert.equal(hopsConfig.https, true);
  });

  it('should ensure that user config takes precedence over extenion / base config', function() {
    process.chdir(path.join(__dirname, 'mock', 'config', 'simple-extends'));
    var hopsConfig = require('hops-config');
    assert.equal(hopsConfig.port, 8082);
  });

  it('should allow nested extends', function() {
    process.chdir(path.join(__dirname, 'mock', 'config', 'nested-extends'));
    var hopsConfig = require('hops-config');
    assert.deepEqual(hopsConfig.locations, ['/foo']);
    assert.equal(hopsConfig.node, '8.0.0');
  });

  it('should use deep-merge strategy for objects', function() {
    process.chdir(path.join(__dirname, 'mock', 'config', 'deep-merge'));
    var hopsConfig = require('hops-config');
    assert.deepEqual(hopsConfig.aws, {
      stageName: 'foo',
      memorySize: 100,
      groups: ['g3'],
    });
    assert.deepEqual(hopsConfig.locations, ['/counter']);
    assert.deepEqual(hopsConfig.objects, [{ number: 3 }]);
  });

  it('should overwrite values via env config', function() {
    process.chdir(path.join(__dirname, 'mock', 'config', 'env'));
    process.env.HOPS_ENV = 'test-1';
    var hopsConfig = require('hops-config');
    assert.deepEqual(hopsConfig.aws, {
      stageName: 'test1',
      memorySize: 256,
    });
  });

  it('should replace placeholders in config values', function() {
    process.chdir(path.join(__dirname, 'mock', 'config', 'placeholders'));
    var hopsConfig = require('hops-config');
    assert.equal(hopsConfig.fonts, hopsConfig.assetPath + '/foo');
  });
});
