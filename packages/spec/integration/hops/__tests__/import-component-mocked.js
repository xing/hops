import React from 'react';
import testRenderer from 'react-test-renderer';
import { HopsTest } from 'hops-test';
import { App } from '../';

describe('ImportComponent mocked', () => {
  it('should display the loaded component', () => {
    const app = testRenderer.create(
      <HopsTest>
        <App />
      </HopsTest>
    );

    expect(app).toMatchSnapshot();
  });
});
