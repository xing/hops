import { ApolloClientOptionsHops } from 'hops-apollo';

declare module 'hops-graphql' {
  export interface HopsGraphqlOptions<TCacheShape = any> {
    graphql?: ApolloClientOptionsHops<TCacheShape>;
  }
}
