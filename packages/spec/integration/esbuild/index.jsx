import React, { useEffect } from 'react';
import { importComponent, render } from 'hops';

const Heading = importComponent(() => import('./text'));

const App = () => {
  useEffect(() => {
    Object.assign(document.querySelector('h1').style, {
      color: 'papayawhip',
      backgroundColor: 'fuchsia',
    });
  }, []);

  return <Heading />;
};

export default render(<App />);
