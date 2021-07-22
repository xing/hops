# `hops-msw`

[![npm](https://img.shields.io/npm/v/hops-msw.svg)](https://www.npmjs.com/package/hops-msw)

**Please see the [main Hops Readme](https://github.com/xing/hops#docs) for general information and a Getting Started Guide.**

This is a [preset for Hops](../../DOCUMENTATION.md#presets) that can be used to set up a [Mock Service Worker](https://www.npmjs.com/package/msw) for your Hops app. It allows to mock REST and GraphQL APIs in unit and integration tests.

This package (together with `jest-preset-hops`) takes care of setting up the MSW mock server already, so if you use it for unit-testing, you do not need to do this yourself.

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

### Installation

Add this preset to your existing Hops React project:

```bash
npm install --save hops-msw
```

In order to use it for unit-testing, you also need to install the [`jest-preset-hops`](../jest-preset-hops/README.md) package.
