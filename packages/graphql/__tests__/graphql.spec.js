/* eslint-env node, mocha */

var fs = require('fs');
var path = require('path');
var assert = require('assert');
var fetchMock = require('fetch-mock/es5/server');

function generateFragmentTypes() {
  return require('hops-graphql/lib/fragments')();
}

function getFragmentsFile() {
  return require('hops-graphql/lib/util').getFragmentsFile();
}

function clearRequireCache() {
  Object.keys(require.cache).forEach(function(key) {
    delete require.cache[key];
  });
}

function unlinkSilent(path) {
  try {
    fs.unlinkSync(path);
  } catch (error) {
    /* noop */
  }
}

var originalDir = process.cwd();

var mocksDir = path.join(__dirname, 'mock', 'graphql');

var mockResponse = {
  __schema: {
    types: [
      {
        kind: 'INTERFACE',
        name: 'Character',
        possibleTypes: [{ name: 'Human' }, { name: 'Droid' }],
      },
    ],
  },
};

describe('graphql schema introspection', function() {
  before(function() {
    fetchMock.post('*', { data: mockResponse });
  });

  beforeEach(clearRequireCache);

  afterEach(function() {
    process.chdir(originalDir);
    fetchMock.reset();
  });

  after(function() {
    fetchMock.restore();
  });

  it('should generate introspection result from local schema file', function() {
    process.chdir(path.join(mocksDir, 'local-schema'));
    unlinkSilent(getFragmentsFile());

    return generateFragmentTypes().then(function() {
      fs.accessSync(getFragmentsFile());

      assert.deepEqual(
        require('hops-graphql/lib/util').getIntrospectionResult(),
        mockResponse
      );
    });
  });

  it('should generate introspection result from remote endpoint', function() {
    process.chdir(path.join(mocksDir, 'remote-schema'));
    unlinkSilent(getFragmentsFile());

    return generateFragmentTypes().then(function() {
      fs.accessSync(getFragmentsFile());

      assert.ok(fetchMock.called('*', 'POST'));

      assert.deepEqual(
        require('hops-graphql/lib/util').getIntrospectionResult(),
        mockResponse
      );
    });
  });
});
