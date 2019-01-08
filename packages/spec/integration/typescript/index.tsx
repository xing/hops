import { render, importComponent } from 'hops';
import * as React from 'react';

const Content = importComponent('./content');

export default render(
  <>
    <h1>test</h1>
    <Content />
  </>
);
