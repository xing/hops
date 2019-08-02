/**
 * @jest-environment jsdom
 */

import { promisify } from 'util';
import React from 'react';
import testRenderer from 'react-test-renderer';
import { HopsTest } from 'hops-test';

import { App } from '../';
import QUERY from '../query.gql';

const tick = promisify(setImmediate);
const flush = async () => {
  await tick();
  await tick();
};

describe('Hops GraphQL', () => {
  it('should render the App correctly', async () => {
    const mockedProviderProps = {
      mocks: [
        {
          request: { query: QUERY },
          result: {
            data: { hello: 'hello test' },
          },
        },
      ],
    };
    const app = testRenderer.create(
      <HopsTest config={{ mockedProviderProps }}>
        <App />
      </HopsTest>
    );
    await flush();

    expect(app).toMatchSnapshot();
  });
});
