import installServiceWorker from 'hops-pwa';
import { render } from 'hops';
import React from 'react';

installServiceWorker();

export default render(<h1>hello</h1>);
