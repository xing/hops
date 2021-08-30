# `hops-msw`

[![npm](https://img.shields.io/npm/v/hops-msw.svg)](https://www.npmjs.com/package/hops-msw)

**Please see the [main Hops Readme](https://github.com/xing/hops#docs) for general information and a Getting Started Guide.**

This is a [preset for Hops](../../DOCUMENTATION.md#presets) that can be used to set up a [Mock Service Worker](https://www.npmjs.com/package/msw) for your Hops app. It allows to mock REST and GraphQL APIs in unit and integration tests.

This package (together with `jest-preset-hops`) takes care of setting up the MSW mock server already, so if you use it for unit-testing, you do not need to do this yourself.

### Installation

Add this preset to your existing Hops React project:

```bash
npm install --save hops-msw
```

In order to use it for unit-testing, you also need to install the [`jest-preset-hops`](../jest-preset-hops/README.md) package.

### Usage

Set the environment variable `ENABLE_MSW` to `true` when running your unit tests.

**Example:**

```javascript
import { render, waitFor } from '@testing-library/react';
import { getMockServer } from 'hops-msw/unit';
import { graphql } from 'hops-msw';
import { withApolloTestProvider } from 'hops-react-apollo';

it('loads graphql data', async () => {
  getMockServer().use(
    graphql.query('search', (req, res, ctx) => {
      return res(
        ctx.data({
          __typename: 'Query',
          user: {
            __typename: 'User',
            name: 'Something',
          },
        })
      );
    })
  );

  const { getByText } = render(withApolloTestProvider(<HomeWithData />));

  await waitFor(() => getByText('Something'));
});
```

Read the [MSW documentation](https://mswjs.io/) for more information on how to write mocks.

See [here](../spec/integration/redux/__tests__/mocked.js) an example of how to write an integration test using puppeteer.

### Configuration

#### Preset Options

| Name | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| mockServiceWorkerHandlersFile | `String` | `''` | _no_ | The path to your mock handlers file (which will be used during development) |
| mockServiceWorkerUri | `String` | `<basePath>/sw.js` | _no_ | The path on which the mock service worker will be served from |

##### `mockServiceWorkerHandlersFile`

Use this option to register an [array of handlers](https://mswjs.io/docs/getting-started/mocks/graphql-api). These will be used during development if `ENABLE_MSW=true` is set. See [here](../template-graphql) for an example.

**Note:** Unfortunately the handlers must be written in ES5 (no import/export) until we can drop Node.js 12 support.

```json
"hops": {
  "mockServiceWorkerHandlersFile": "<rootDir>/mocks.js"
}
```

##### `mockServiceWorkerUri`

Usually this doesn't need to be changed.
