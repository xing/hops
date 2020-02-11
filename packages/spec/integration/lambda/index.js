import { render, withConfig } from 'hops';
import React from 'react';

const App = withConfig(({ config }) => (
  <>
    <Helmet>
      <link rel="icon" href="data:;base64,iVBORw0KGgo=" />
    </Helmet>
    <h1>hello {config.subject}</h1>
  </>
));

export default render(<App />);
