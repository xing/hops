import { render, importComponent } from 'hops';
import * as React from 'react';

import Headline from './headline';

const Content = importComponent(() => import('./content'));

export default render(
  <>
    <Headline />
    <Content />
  </>
);
