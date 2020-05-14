import {
  Header,
  importComponent,
  Miss,
  render,
  withServerData,
  useServerData,
  Status,
  withConfig,
  useConfig,
} from 'hops';

import React from 'react';
import { Link, Redirect, Route, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import FlowText from './flow-text';

const Text = importComponent(() =>
  import(/* webpackPrefetch: true */ './text')
);
const BoldText = importComponent(() =>
  import(
    // webpackPreload: true
    './bold-text'
  )
);

const ServerDataHoC = withServerData(({ serverData }) => (
  <output>{serverData.method}</output>
));

const ServerDataHook = () => {
  const serverData = useServerData();

  return <output>{serverData.method}</output>;
};

const ConfigHoC = withConfig(({ config: { hoc } }) => <h1>{hoc}</h1>);

const ConfigHook = () => {
  const config = useConfig();

  return <h1>{config.hook}</h1>;
};

const RichText = () => (
  <>
    <Text text="imported" />
    <br />
    <BoldText subject="text" />
  </>
);

export default render(
  <>
    <Helmet>
      <link rel="icon" href="data:;base64,iVBORw0KGgo=" />
    </Helmet>
    <div>
      <Link to="/two">Link to two</Link>
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
        <Route path="/import" exact render={RichText} />
        <Route path="/server-data-hoc" exact component={ServerDataHoC} />
        <Route path="/server-data-hook" exact component={ServerDataHook} />
        <Route path="/config-hoc" exact component={ConfigHoC} />
        <Route path="/config-hook" exact component={ConfigHook} />
        <Miss />
      </Switch>
    </div>
  </>
);
