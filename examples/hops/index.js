import React from 'react';
import { importComponent, render } from 'hops';

const Text = importComponent('./text');

const loader = load =>
  Promise.race([new Promise((_, reject) => setTimeout(reject, 10000)), load()]);

/* eslint-disable-next-line react/prop-types */
const renderText = ({ Component, loading, ...props }) => {
  return loading ? <p>Fetching content…</p> : <Component {...props} />;
};

export function App() {
  return <Text loader={loader} render={renderText} subject="world" />;
}

export default render(<App />);
