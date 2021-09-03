const { createElement } = require('react');
const { fetch } = require('cross-fetch');

let client;

const { ApolloClient, HttpLink, ApolloProvider, InMemoryCache } = (() => {
  const { ApolloClient, HttpLink, ApolloProvider } = require('@apollo/client');
  const { InMemoryCache } = require('@apollo/client/cache');

  return { ApolloClient, HttpLink, ApolloProvider, InMemoryCache };
})();

function createTestClient() {
  if (client) {
    return client;
  }

  client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: 'http://dasistegalhier.com',
      fetch,
    }),
    queryDeduplication: false,
  });

  return client;
}

function withApolloTestProvider(App) {
  return createElement(ApolloProvider, { client: createTestClient() }, App);
}

module.exports = {
  createTestClient,
  withApolloTestProvider,
};
