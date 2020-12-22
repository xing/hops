/**
 * @jest-hops-puppeteer off
 */

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import testRenderer from 'react-test-renderer';
import { App } from '../';

describe('ImportComponent mocked', () => {
  it('should display the loaded component', () => {
    const app = testRenderer.create(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(app).toMatchSnapshot();
  });
});
