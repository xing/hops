/* eslint-env node, jest */

const { resolve, join } = require('path');
const { readFileSync: readFile } = require('fs');
const babel = require('@babel/core');

const fixtureFolder = resolve(__dirname, 'fixture');
const fixture = filename =>
  readFile(join(fixtureFolder, filename), 'utf8').trim();
const tests = [
  ['code-01.txt', 'expected-01.txt'],
  ['code-02.txt', 'expected-02.txt'],
  ['code-03.txt', 'expected-03.txt'],
  ['code-04.txt', 'expected-04.txt'],
].map(([code, expected], i) => [String(++i), fixture(code), fixture(expected)]);

const babelOptions = {
  plugins: [
    require.resolve('../babel-plugin-import-component'),
    require.resolve('@babel/plugin-syntax-dynamic-import'),
  ],
  babelrc: false,
};

describe('babel-plugin-import-component', () => {
  it.each(tests)(
    'should transpile the code correctly (fixture %s)',
    (_, code, expected) => {
      const result = babel.transform(code, babelOptions).code.trim();

      expect(result).toBe(expected);
    }
  );
});
