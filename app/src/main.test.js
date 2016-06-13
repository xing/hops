/* eslint-env node, mocha */

import React from 'react';
import assert from 'assert';
import { shallow } from 'enzyme';

import { Home as HomeContainer } from './main';

const Home = HomeContainer.WrappedComponent;

describe('<Home />', () => {
  var home = shallow(<Home />);
  it('should contain an h1', () => {
    assert.equal(home.find('h1').length, 1);
  });
  it('should have class', () => {
    assert.ok(home.props().className.match(/style-headline/));
  });
});
