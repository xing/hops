/* eslint-env node, jest */

const { merge } = require('../utils');

describe('merge', () => {
  it('should merge two objects', () => {
    const a = { a: 1 };
    const b = { b: 2 };

    const result = merge(a, b);

    expect(result).toEqual({
      a: 1,
      b: 2,
    });

    expect(a).toEqual({ a: 1 });
    expect(b).toEqual({ b: 2 });
  });

  it('should deep-merge objects', () => {
    const a = { a: { a: 1 } };
    const b = { b: { b: 2 } };
    const c = { a: { c: 3 } };
    const d = { b: { b: 4 } };

    const result = merge(a, b, c, d);

    expect(result).toEqual({
      a: { a: 1, c: 3 },
      b: { b: 4 },
    });

    expect(a).toEqual({ a: { a: 1 } });
    expect(b).toEqual({ b: { b: 2 } });
    expect(c).toEqual({ a: { c: 3 } });
    expect(d).toEqual({ b: { b: 4 } });
  });

  it('should concatenate mixins arrays', () => {
    const a = { mixins: ['a'], other: [1] };
    const b = { mixins: ['b'], other: [2] };

    const result = merge(a, b);

    expect(result).toEqual({
      mixins: ['a', 'b'],
      other: [2],
    });

    expect(a).toEqual({ mixins: ['a'], other: [1] });
    expect(b).toEqual({ mixins: ['b'], other: [2] });
  });

  it('should de-duplicate mixins', () => {
    const a = { mixins: ['a'] };
    const b = { mixins: ['a'] };

    const result = merge(a, b);

    expect(result).toEqual({
      mixins: ['a'],
    });

    expect(a).toEqual({ mixins: ['a'] });
    expect(b).toEqual({ mixins: ['a'] });
  });

  it('should de-duplicate mixins (order by last occurrence)', () => {
    const a = { mixins: ['a', 'b'] };
    const b = { mixins: ['a', 'c'] };

    const result = merge(a, b);

    expect(result).toEqual({
      mixins: ['b', 'a', 'c'],
    });

    expect(a).toEqual({ mixins: ['a', 'b'] });
    expect(b).toEqual({ mixins: ['a', 'c'] });
  });
});
