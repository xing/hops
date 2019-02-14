import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import testRenderer from 'react-test-renderer';
import App from '../';

jest.mock('hops', () => {
  const { join } = require('path');
  const hops = jest.requireActual('hops');

  hops.importComponent = (path, name = 'default') =>
    function ImportComponent() {
      const Component = require(join('..', path))[name];
      return <Component />;
    };

  return hops;
});

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
