/* eslint-env node, jest */

var ApolloCache = require('apollo-cache-inmemory');

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

describe.skip('graphql browser extension', function() {
  afterEach(function() {
    var constants = require('../lib/constants');
    global[constants.APOLLO_IQRD] = undefined;
  });

  var hopsGraphql = require('../dom');

  it('should use HeuristicFramentMatcher when no introspection result is available', function() {
    var context = new hopsGraphql.GraphQLContext();
    expect(context.client.cache.config.fragmentMatcher).toBeInstanceOf(
      ApolloCache.HeuristicFragmentMatcher
    );
  });

  it('should use IntrospectionFragmentMatcher when introspection result is available', function() {
    var constants = require('../lib/constants');
    global[constants.APOLLO_IQRD] = mockResponse;
    var context = new hopsGraphql.GraphQLContext();
    expect(context.client.cache.config.fragmentMatcher).toBeInstanceOf(
      ApolloCache.IntrospectionFragmentMatcher
    );
  });
});
