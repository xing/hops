import {
  render,
  Miss,
  Status,
  Header,
  ServerDataContextConsumer,
} from 'hops-react';
import React from 'react';
import { Route, Switch, Link, Redirect } from 'react-router-dom';
import FlowText from './FlowText';

export default render(
  <div>
    <Link to="/two">Link to two</Link>
    <ServerDataContextConsumer>
      {({ method }) => <output>{method}</output>}
    </ServerDataContextConsumer>
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
      <Miss />
    </Switch>
  </div>
);
