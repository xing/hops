/* eslint-env node, jest */

const { resolve, join } = require('path');
const { readdirSync: readdir, readFileSync: readFile } = require('fs');
const babel = require('@babel/core');

const fixtureFolder = resolve(__dirname, 'fixture');
const file = (type, count) =>
  readFile(join(fixtureFolder, `${type}-${count}.txt`), 'utf8').trim();
const fixtures = readdir(fixtureFolder).filter(file => file.endsWith('.txt'));
const tests = fixtures
  .filter(file => file.startsWith('code'))
  .map(file =>
    file
      .split('.')
      .shift()
      .split('-')
      .pop()
  )
  .map(count => [count, file('code', count), file('expected', count)]);

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
