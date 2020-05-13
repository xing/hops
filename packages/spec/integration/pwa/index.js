import installServiceWorker from 'hops-pwa';
import { render } from 'hops';
import React from 'react';
import { Helmet } from 'react-helmet-async';

import manifest from './manifest.webmanifest';

installServiceWorker();

export default render(
  <>
    <Helmet>
      <link rel="icon" href="data:;base64,iVBORw0KGgo=" />
      <link rel="manifest" href={manifest} />
    </Helmet>
    <h1>hello</h1>
  </>
);
