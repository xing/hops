import React from 'react';
import testRenderer from 'react-test-renderer';
import { HopsTest } from 'hops-test';
import { App } from '../';

jest.mock('hops', () => {
  const hops = jest.requireActual('hops');

  hops.importComponent = () =>
    function ImportComponent({ render }) {
      return render({ loading: true });
    };

  return hops;
});

describe('ImportComponent loading', () => {
  it('should display the loading state', () => {
    const app = testRenderer.create(
      <HopsTest>
        <App />
      </HopsTest>
    );

    expect(app).toMatchSnapshot();
  });
});
