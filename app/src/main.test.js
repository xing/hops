/* eslint-env jest */

jest.mock('react/lib/ReactDefaultInjection');

import React from 'react';
import renderer from 'react-test-renderer';

import { Home } from './main';

describe('<Home />', () => {
  it('works as expected', () => {
    const component = renderer.create(
      <Home.WrappedComponent update={()=>{}}/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
