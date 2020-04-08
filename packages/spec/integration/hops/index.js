import React from 'react';
import { importComponent, render } from 'hops';
import { Helmet } from 'react-helmet-async';

const Text = importComponent('./text');
const Text1 = importComponent('./text', 'default');
const Text2 = importComponent(() => import('./text'));
const Text3 = importComponent(
  () => import('./text'),
  (exports) => exports.default
);

const loader = (load) =>
  Promise.race([new Promise((_, reject) => setTimeout(reject, 10000)), load()]);

const renderText = ({ Component, loading, ...props }) => {
  return loading ? <p>Fetching content…</p> : <Component {...props} />;
};

export function App() {
  return (
    <>
      <Text loader={loader} render={renderText} subject="world" />
      <Text1 loader={loader} render={renderText} subject="world1" />
      <Text2 loader={loader} render={renderText} subject="world2" />
      <Text3 loader={loader} render={renderText} subject="world3" />
    </>
  );
}

export default render(
  <>
    <Helmet>
      <link rel="icon" href="data:;base64,iVBORw0KGgo=" />
    </Helmet>
    <App />
  </>
);
