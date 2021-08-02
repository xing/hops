declare module 'hops-msw/integration' {
  type Data = Record<string, unknown>;

  export interface Mock {
    type: 'graphql' | 'rest';
    method: 'query' | 'mutation' | 'get' | 'post' | 'put' | 'delete';
    identifier: string;
    data: Data;
  }

  export function mockGraphQLQuery(operationName: string, data: Data): Mock;

  export function mockGraphQLMutation(operationName: string, data: Data): Mock;

  export function mockGetRequest(pathName: string, data: Data): Mock;

  export function mockPostRequest(pathName: string, data: Data): Mock;

  export function mockPutRequest(pathName: string, data: Data): Mock;

  export function mockDeleteRequest(pathName: string, data: Data): Mock;
}
