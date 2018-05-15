/* eslint-env node, jest */

var React = require('react');

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

describe.skip('graphql node extension', function() {
  var hopsGraphql;
  var constants = require('../lib/constants');

  beforeEach(function() {
    jest.mock('react-apollo', function() {
      return {
        getDataFromTree: jest.fn(function() {
          return Promise.resolve();
        }),
      };
    });
    jest.mock('../lib/util', function() {
      return {
        getIntrospectionResult: jest.fn(function() {
          return mockResponse;
        }),
      };
    });
    hopsGraphql = require('../node');
  });

  it('should set ssrMode', function() {
    var context = new hopsGraphql.GraphQLContext();

    expect(context.client.ssrMode).toBe(true);
  });

  it('should not prefetch in static mode', function() {
    var context = new hopsGraphql.GraphQLContext();
    process.env.HOPS_MODE = 'static';

    var root = React.createElement('div');

    return context.getTemplateData({}, root).then(function(templateData) {
      expect(templateData.globals).toEqual([
        { name: constants.APOLLO_IQRD, value: mockResponse },
        { name: constants.APOLLO_STATE, value: {} },
      ]);
      expect(require('react-apollo').getDataFromTree).not.toHaveBeenCalled();
    });
  });

  it('should prefetch when rendering not in static mode', function() {
    var context = new hopsGraphql.GraphQLContext();
    process.env.HOPS_MODE = 'dynamic';

    var root = React.createElement('div');

    return context.getTemplateData({}, root).then(function() {
      expect(require('react-apollo').getDataFromTree).toHaveBeenCalledWith(
        root
      );
    });
  });
});
