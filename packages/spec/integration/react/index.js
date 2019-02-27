import {
  Header,
  importComponent,
  Miss,
  render,
  ServerDataContext,
  Status,
  ConfigContext,
  withConfig,
} from 'hops';

import React from 'react';
import { Link, Redirect, Route, Switch } from 'react-router-dom';
import FlowText from './flow-text';
const Text = importComponent(() => import('./text'));

const Config = withConfig(({ config: { hoc } }) => <h1>{hoc}</h1>);

export default render(
  <div>
    <Link to="/two">Link to two</Link>
    <ServerDataContext.Consumer>
      {({ method }) => <output>{method}</output>}
    </ServerDataContext.Consumer>
    <Switch>
      <Route path="/" exact render={() => <h1>home</h1>} />
      <Route path="/two" exact render={() => <h1>two</h1>} />
      <Route path="/status" exact render={() => <Status code={418} />} />
      <Route path="/redirect" exact render={() => <Redirect to="/two" />} />
      <Route
        path="/header"
        exact
        render={() => <Header name="X-Foo" value="Bar" />}
      />
      <Route path="/flow" exact render={() => <FlowText text="flow" />} />
      <Route path="/import" exact render={() => <Text text="imported" />} />
      <Route path="/config-hoc" exact render={() => <Config />} />
      <Route
        path="/config-context"
        exact
        render={() => (
          <ConfigContext.Consumer>
            {({ context }) => <h1>{context}</h1>}
          </ConfigContext.Consumer>
        )}
      />
      <Miss />
    </Switch>
  </div>
);
