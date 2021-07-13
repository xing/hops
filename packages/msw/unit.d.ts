import { SetupServerApi } from 'msw/node';

declare module 'hops-msw/unit' {
  export const getMockServer: () => SetupServerApi;
}
