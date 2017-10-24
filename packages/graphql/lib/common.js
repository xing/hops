'use strict';
require('isomorphic-fetch');

var React = require('react');
var ReactApollo = require('react-apollo');

var hopsConfig = require('hops-config');

var Context = require('hops-redux').Context;

exports.INTROSPECTION_RESULT = 'INTROSPECTION_RESULT';

exports.Context = exports.createContext = Context.extend({
  initialize: function (options) {
    Context.prototype.initialize.call(this, options);
    this.client = this.createClient(options.graphql || {});
    this.registerReducer('apollo', this.client.reducer());
  },
  createClient: function (options) {
    return new ReactApollo.ApolloClient(
      Object.assign(
        {},
        options,
        {
          networkInterface: options.networkInterface ||
            this.createNetworkInterface(),
          fragmentMatcher: options.fragmentMatcher ||
            this.createFragmentMatcher()
        }
      )
    );
  },
  createNetworkInterface: function () {
    return ReactApollo.createNetworkInterface({
      uri: hopsConfig.graphqlUri
    });
  },
  createFragmentMatcher: function () {
    var result = this.getIntrospectionResult();
    if (result) {
      return new ReactApollo.IntrospectionFragmentMatcher({
        introspectionQueryResultData: this.getIntrospectionResult()
      });
    }
  },
  createProvider: function (reactElement) {
    return React.createElement(
      ReactApollo.ApolloProvider,
      {
        client: this.client,
        store: this.getStore()
      },
      reactElement
    );
  },
  getMiddlewares: function () {
    return Context.prototype.getMiddlewares.call(this)
      .concat(this.client.middleware());
  }
});
