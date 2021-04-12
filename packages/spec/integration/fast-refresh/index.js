import React from 'react';
import { render } from 'hops';
import { Helmet } from 'react-helmet-async';

import { Heading } from './heading';

const App = () => {
  const [caption, setCaption] = React.useState('…');

  React.useEffect(() => {
    setCaption('Hello Fast Refresh!');
  }, []);

  return <Heading>{caption}</Heading>;
};

export default render(
  <>
    <Helmet>
      <link rel="icon" href="data:;base64,iVBORw0KGgo=" />
    </Helmet>
    <App />
  </>
);
