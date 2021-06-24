import { SetupServerApi } from 'msw/node';
import { graphql as mswGraphQL, rest as mswRest } from 'msw';

declare module 'hops-msw/unit' {
  export const mockServer: SetupServerApi;
  export const rest: typeof mswRest;
  export const graphql: typeof mswGraphQL;
}
