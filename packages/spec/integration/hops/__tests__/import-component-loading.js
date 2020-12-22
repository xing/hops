/**
 * @jest-hops-puppeteer off
 */

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import testRenderer from 'react-test-renderer';
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
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(app).toMatchSnapshot();
  });
});
