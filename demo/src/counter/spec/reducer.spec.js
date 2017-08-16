// @flow

import counter from '../reducer';
import { increment, decrement } from '../actions';

describe('Counter reducer', () => {
  it('initializes with 0', () => {
    // $FlowExpectError - action must be a union of increment|decrement
    expect(counter(undefined, {})).toBe(0);
  });

  it('increments by 1 when reducing an increment action', () => {
    expect(counter(undefined, increment())).toBe(1);
  });

  it('decrements by 1 when reducing a decrement action', () => {
    expect(counter(undefined, decrement())).toBe(-1);
  });

  it('increments by a custom number when specified in payload', () => {
    expect(counter(undefined, increment(3))).toBe(3);
  });

  it('returns current state on unknown action', () => {
    // $FlowExpectError - action must be a union of increment|decrement
    expect(counter(5, { type: 'FOO' })).toBe(5);
  });
});