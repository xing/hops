// @flow

import counter, { type State as CounterState } from './counter/reducer';

const reducer = {
  counter
};

export type ApplicationState = {
  counter: CounterState;
};

export default reducer;
