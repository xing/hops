import { render } from 'hops';
import { Helmet } from 'react-helmet-async';
import { Switch, Route } from 'react-router-dom';
import React from 'react';

import TestQuery from './query';

const App = () => (
  <>
    <Helmet>
      <link rel="icon" href="data:;base64,iVBORw0KGgo=" />
    </Helmet>
    <Switch>
      <Route
        path="/html"
        exact={true}
        render={() => <TestQuery suffix="html" />}
      />
      <Route
        path="/failed"
        exact={true}
        render={() => <TestQuery suffix="failed" />}
      />
      <Route
        path="/blocked"
        exact={true}
        render={() => <TestQuery suffix="blocked" />}
      />
      <Route
        path="/erroneous"
        exact={true}
        render={() => <TestQuery suffix="erroneous" />}
      />
    </Switch>
  </>
);

export default render(<App />);
