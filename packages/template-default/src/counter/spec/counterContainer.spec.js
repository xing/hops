// @flow

import React from 'react';
import renderer from 'react-test-renderer';
import CounterContainer, { mapStateToProps } from '../counterContainer';

describe('Counter container', () => {
  let store;

  beforeEach(() => {
    store = {
      subscribe: jest.fn(),
      dispatch: jest.fn(),
      getState: jest.fn(() => ({ counter: 0 })),
    };
  });

  it('should render correctly', () => {
    const tree = renderer.create(
      <CounterContainer store={store} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('selects correct state slice', () => {
    expect(mapStateToProps({ counter: 3 })).toEqual({ count: 3 });
  });
});