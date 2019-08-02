/**
 * @jest-environment jsdom
 */

import React from 'react';
import { createStore, combineReducers } from 'redux';
import testRenderer from 'react-test-renderer';
import { HopsTest } from 'hops-test';

import { App } from '../';

describe('Hops Redux', () => {
  it('should render the App correctly', () => {
    const greeting = () => ({ subject: 'test' });
    const store = createStore(combineReducers({ greeting }));
    const reduxProviderProps = { store };
    const app = testRenderer.create(
      <HopsTest config={{ reduxProviderProps }}>
        <App />
      </HopsTest>
    );

    expect(app).toMatchSnapshot();
  });
});
