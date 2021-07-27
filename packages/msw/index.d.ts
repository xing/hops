import { graphql as mswGraphQL, rest as mswRest } from 'msw';

declare module 'hops-msw' {
  export const rest: typeof mswRest;
  export const graphql: typeof mswGraphQL;
}
