require('isomorphic-fetch');

var React = require('react');
var ReactApollo = require('react-apollo');

var Context = require('hops-redux').Context;

exports.Context = exports.createContext = Context.extend({
  initialize: function (options) {
    Context.prototype.initialize.call(this, options);
    this.client = this.createClient(Object.assign(
      { network: {} },
      options.graphql
    ));
    this.registerReducer('apollo', this.client.reducer());
  },
  createClient: function (options) {
    return new ReactApollo.ApolloClient(
      Object.assign(
        options,
        {
          networkInterface: ReactApollo.createNetworkInterface(options.network)
        }
      )
    );
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
