// @flow

import { INCREMENT, DECREMENT } from '../constants';
import { increment, decrement } from '../actions';

describe('Counter actions', () => {
  describe('increment', () => {
    it('increments by one when no arguments are set', () => {
      expect(increment()).toEqual({
        type: INCREMENT,
        payload: 1,
      });
    });

    it('increments by a custom number when passed via arguments', () => {
      expect(increment(3)).toEqual({
        type: INCREMENT,
        payload: 3,
      });
    });
  });

  describe('decrement', () => {
    it('decrements by one when no arguments are set', () => {
      expect(decrement()).toEqual({
        type: DECREMENT,
        payload: 1,
      });
    });

    it('decrements by a custom number when passed via arguments', () => {
      expect(decrement(3)).toEqual({
        type: DECREMENT,
        payload: 3,
      });
    });
  });
});
