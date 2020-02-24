import { importComponent } from 'hops';
import * as React from 'react';

import Headline from './headline';

const Content = importComponent(() => import('./content'));

export const Component = () => (
  <>
    <Headline />
    <Content />
  </>
);
