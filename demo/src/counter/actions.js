// @flow

import { INCREMENT, DECREMENT } from './constants';

type IncrementAction = {
  type: typeof INCREMENT;
  payload: number;
};

type DecrementAction = {
  type: typeof DECREMENT;
  payload: number;
};

export type Action =
  | IncrementAction
  | DecrementAction;

export function increment(amount: number = 1): IncrementAction {
  return {
    type: INCREMENT,
    payload: amount,
  };
}

export function decrement(amount: number = 1): DecrementAction {
  return {
    type: DECREMENT,
    payload: amount,
  };
}
