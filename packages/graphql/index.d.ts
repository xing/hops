import { ApolloClientOptionsHops } from 'hops-react-apollo';

declare module 'hops-graphql' {
  export interface HopsGraphqlOptions<TCacheShape = any> {
    graphql?: ApolloClientOptionsHops<TCacheShape>;
  }
}
