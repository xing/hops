/* eslint-env node, mocha */

var fs = require('fs');
var path = require('path');
var assert = require('assert');
var fetchMock = require('fetch-mock/es5/server');
var React = require('react');
var ReactApollo = require('react-apollo');
var ApolloCache = require('apollo-cache-inmemory');

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
  function generateFragmentTypes() {
    return require('hops-graphql/lib/fragments')();
  }

  function getFragmentsFile() {
    return require('hops-graphql/lib/util').getFragmentsFile();
  }

  function unlinkSilent(path) {
    try {
      fs.unlinkSync(path);
    } catch (error) {
      /* noop */
    }
  }

  before(function() {
    fetchMock.post('*', { data: mockResponse });
  });

  beforeEach(function() {
    Object.keys(require.cache).forEach(function(key) {
      delete require.cache[key];
    });
  });

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

describe('graphql browser extension', function() {
  afterEach(function() {
    var constants = require('hops-graphql/lib/constants');
    global[constants.APOLLO_IQRD] = undefined;
  });

  var hopsGraphql = require('hops-graphql/dom');

  it('should have all the neccessary exports', function() {
    assert.equal(typeof hopsGraphql.GraphQLContext, 'function');
    assert.equal(typeof hopsGraphql.createContext, 'function');
    assert.equal(typeof hopsGraphql.graphqlExtension, 'function');
    assert.equal(hopsGraphql.GraphQLContext, hopsGraphql.contextDefinition);

    var options = {};
    var extension = hopsGraphql.graphqlExtension(options);
    assert.equal(extension.context, hopsGraphql.GraphQLContext);
    assert.equal(extension.config.graphql, options);
  });

  it('should create and configure the apollo client', function() {
    var context = new hopsGraphql.GraphQLContext();
    assert.ok(context.client);
    assert.ok(context.client.link);
    assert.ok(context.client.cache);
  });

  it('should use HeuristicFramentMatcher when no introspection result is available', function() {
    var context = new hopsGraphql.GraphQLContext();
    assert.ok(
      context.client.cache.config.fragmentMatcher instanceof
        ApolloCache.HeuristicFragmentMatcher
    );
  });

  it('should use IntrospectionFragmentMatcher when introspection result is available', function() {
    var constants = require('hops-graphql/lib/constants');
    global[constants.APOLLO_IQRD] = mockResponse;
    var context = new hopsGraphql.GraphQLContext();
    assert.ok(
      context.client.cache.config.fragmentMatcher instanceof
        ApolloCache.IntrospectionFragmentMatcher
    );
  });

  it('should allow to override apollo link through options', function() {
    // since client.link is a wrapper around a link chain, we see no other
    // option to test that the link we passed in will be used, therefore we pass
    // in something truthy which will be used as "link" and will throw an error.
    var mockLink = {};
    assert.throws(function() {
      // eslint-disable-next-line
      new hopsGraphql.GraphQLContext({
        graphql: { link: mockLink },
      });
    });
  });

  it('should allow to override apollo cache through options', function() {
    var mockCache = new ApolloCache.InMemoryCache();
    var context = new hopsGraphql.GraphQLContext({
      graphql: { cache: mockCache },
    });

    assert.equal(context.client.cache, mockCache);
  });

  it('should wrap the application in an <ApolloProvider />', function() {
    var context = new hopsGraphql.GraphQLContext();
    var root = React.createElement('main');

    var enhanced = context.enhanceElement(root);

    assert.equal(enhanced.type, ReactApollo.ApolloProvider);
    assert.equal(enhanced.props.children, root);
    assert.equal(enhanced.props.client, context.client);
  });
});
