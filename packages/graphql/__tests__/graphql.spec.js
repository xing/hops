/* eslint-env node, jest */

var fs = require('fs');
var path = require('path');
var fetchMock = require('fetch-mock/es5/server');
var React = require('react');

var originalDir = process.cwd();
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

describe.skip('graphql schema introspection', function() {
  function generateFragmentTypes() {
    var hopsConfig = require('hops-config');
    var options = {
      schemaFile: hopsConfig.graphqlSchemaFile,
      graphqlUri: hopsConfig.graphqlUri,
      headers: [],
    };
    return require('../lib/fragments')(options);
  }

  function getFragmentsFile() {
    return require('../lib/util').getFragmentsFile();
  }

  function unlinkSilent(path) {
    try {
      fs.unlinkSync(path);
    } catch (error) {
      /* noop */
    }
  }

  beforeAll(function() {
    fetchMock.post('*', { data: mockResponse });
  });

  beforeEach(jest.resetModules);

  afterEach(function() {
    process.chdir(originalDir);
    fetchMock.reset();
  });

  afterAll(fetchMock.restore);

  it('should generate introspection result from local schema file', function() {
    process.chdir(path.join(__dirname, 'fixtures', 'local-schema'));
    unlinkSilent(getFragmentsFile());

    return generateFragmentTypes().then(function() {
      fs.accessSync(getFragmentsFile());

      expect(require('../lib/util').getIntrospectionResult()).toEqual(
        mockResponse
      );
    });
  });

  it('should generate introspection result from remote endpoint', function() {
    process.chdir(path.join(__dirname, 'fixtures', 'remote-schema'));
    unlinkSilent(getFragmentsFile());

    return generateFragmentTypes().then(function() {
      fs.accessSync(getFragmentsFile());

      expect(fetchMock.called('*', 'POST')).toBe(true);

      expect(require('../lib/util').getIntrospectionResult()).toEqual(
        mockResponse
      );
    });
  });
});

describe.skip('graphql extension', function() {
  var hopsGraphql;

  beforeAll(function() {
    jest.mock('apollo-client', function() {
      return {
        default: jest.fn(),
      };
    });
    jest.mock('apollo-cache-inmemory');
  });

  beforeEach(function() {
    jest.resetAllMocks();
    hopsGraphql = require('hops-graphql');
  });

  it('should have all the neccessary exports', function() {
    expect(typeof hopsGraphql.GraphQLContext).toBe('function');
    expect(typeof hopsGraphql.createContext).toBe('function');
    expect(typeof hopsGraphql.graphqlExtension).toBe('function');
    expect(hopsGraphql.GraphQLContext).toBe(hopsGraphql.contextDefinition);

    var options = {};
    var extension = hopsGraphql.graphqlExtension(options);
    expect(extension.context).toBe(hopsGraphql.GraphQLContext);
    expect(extension.config.graphql).toBe(options);
  });

  it('should create and configure the apollo client', function() {
    var context = new hopsGraphql.GraphQLContext();
    expect(context.client).toBeDefined();
  });

  it('should allow to override apollo link through options', function() {
    var mockLink = {};
    /* eslint-disable no-new */
    new hopsGraphql.GraphQLContext({
      graphql: { link: mockLink },
    });

    var mockedApolloClient = require('apollo-client').default;
    expect(mockedApolloClient.mock.calls[0][0].link).toEqual(mockLink);
  });

  it('should allow to override apollo cache through options', function() {
    var mockCache = {};
    /* eslint-disable no-new */
    new hopsGraphql.GraphQLContext({
      graphql: { cache: mockCache },
    });

    var mockedApolloClient = require('apollo-client').default;
    expect(mockedApolloClient.mock.calls[0][0].cache).toEqual(mockCache);
  });

  it('should wrap the application in an <ApolloProvider />', function() {
    var context = new hopsGraphql.GraphQLContext();
    var root = React.createElement('main');

    var enhanced = context.enhanceElement(root);

    expect(enhanced).toMatchSnapshot();
  });
});
