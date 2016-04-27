
import React from 'react';
import test from 'tape';
import { shallow } from 'enzyme';

import { Home as HomeContainer } from './main';

const Home = HomeContainer.WrappedComponent;

test('<Home />', (t) => {
  t.plan(2);

  var wrapper = shallow(<Home />);

  t.equal(wrapper.find('h1').length, 1, 'contains an h1');
  t.true(wrapper.props().className.match(/style-headline/), 'has class');
});
