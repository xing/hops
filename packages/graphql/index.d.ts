import { ApolloClientOptions } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { ApolloCache } from 'apollo-cache';
import { Omit } from 'hops';

declare module 'hops-graphql' {
  interface ApolloClientOptionsHops<TCacheShape>
    extends Omit<Omit<ApolloClientOptions<TCacheShape>, 'link'>, 'cache'> {
    link?: ApolloLink;
    cache?: ApolloCache<TCacheShape>;
  }

  export interface HopsGraphqlOptions<TCacheShape = any> {
    graphql?: ApolloClientOptionsHops<TCacheShape>;
  }
}
