import { Mixin } from 'hops-mixin';
import fetch from 'cross-fetch';
import { HttpLink } from 'apollo-link-http';

const customFetch = (serverAddress) => (uri, options) => {
  const urlSuffix =
    typeof Headers !== 'undefined' && options.headers instanceof Headers
      ? options.headers.get('x-url-suffix')
      : options.headers['x-url-suffix'];
  const newUri = urlSuffix ? `${serverAddress}/graphql/${urlSuffix}` : uri;

  return fetch(newUri, options);
};

export default class GraphQlMixin extends Mixin {
  bootstrap(_, res) {
    this.serverAddress = res ? res.locals.serverAddress : '';
  }

  getApolloLink() {
    return new HttpLink({
      uri: this.config.graphqlUri,
      fetch: customFetch(this.serverAddress),
    });
  }
}
