import * as React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import CounterContainer, { mapStateToProps } from '../';

describe('Counter container', () => {
  let mockStore;

  beforeEach(() => {
    mockStore = {
      subscribe: jest.fn(),
      dispatch: jest.fn(),
      getState: jest.fn(() => ({ counter: 0 })),
    };
  });

  it('should render correctly', () => {
    const tree = renderer
      .create(
        <Provider store={mockStore}>
          <CounterContainer />
        </Provider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('selects correct state slice', () => {
    expect(mapStateToProps({ counter: 3 })).toEqual({ count: 3 });
  });
});
