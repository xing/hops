// @flow

import { INCREMENT, DECREMENT } from './constants';
import type { Action } from './actions';

export type State = number;

export default function counter(state: State = 0, action: Action): State {
  switch (action.type) {
    case INCREMENT:
      return state + action.payload;
    case DECREMENT:
      return state - action.payload;
    default:
      (action: empty);
      return state;
  }
}
