import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import testRenderer from 'react-test-renderer';
import App from '../';

describe('ImportComponent', () => {
  it('should include the default mock result', () => {
    const app = testRenderer.create(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(app).toMatchSnapshot();
  });
});
