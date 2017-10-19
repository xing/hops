require('isomorphic-fetch');

var React = require('react');
var ReactApollo = require('react-apollo');
var Redux = require('redux');
var ReduxThunkMiddleware = require('redux-thunk').default;

var Context = require('hops-redux').Context;

var INITIAL_STATE = 'INITIAL_STATE';

exports.Context = exports.createContext = Context.extend({
  initialize: function (options) {
    Context.prototype.initialize.call(this, options);
    this.client = this.createClient(Object.assign(
      { network: {} },
      options.graphql
    ));
    this.registerReducer('apollo', this.client.reducer())
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
  createStore: function () {
    return Redux.createStore(
      Redux.combineReducers(this.reducers),
      global[INITIAL_STATE],
      (global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || Redux.compose)(
        Redux.applyMiddleware(this.client.middleware()),
        Redux.applyMiddleware(ReduxThunkMiddleware)
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
  }
});
