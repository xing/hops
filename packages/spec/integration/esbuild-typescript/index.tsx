import { render, importComponent } from 'hops';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';

import Headline from './headline';

const Content = importComponent(() => import('./content'));

export default render(
  <>
    <Helmet>
      <link rel="icon" href="data:;base64,iVBORw0KGgo=" />
    </Helmet>
    <Headline />
    <Content />
  </>
);
