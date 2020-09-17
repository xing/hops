import { render } from 'hops';
import { Switch, Route } from 'react-router-dom';
import React from 'react';

import TestQuery from './query';

const App = () => (
  <>
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
