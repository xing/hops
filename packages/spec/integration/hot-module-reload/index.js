import { render } from 'hops';
import React from 'react';
import { Helmet } from 'react-helmet-async';

export default render(
  <>
    <Helmet>
      <link rel="icon" href="data:;base64,iVBORw0KGgo=" />
    </Helmet>
    <h1 id="one">hello</h1>
  </>
);
