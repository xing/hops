import React from 'react';
import { importComponent } from 'hops';

const Text = importComponent('./text');

const loader = load =>
  Promise.race([new Promise((_, reject) => setTimeout(reject, 10000)), load()]);

const render = ({ Component, loading, ...props }) => {
  return loading ? <p>Fetching content…</p> : <Component {...props} />;
};

export default function App() {
  return <Text loader={loader} render={render} subject="world" />;
}
