/* eslint-env node, jest */

const path = require('path');
const fs = require('fs');
const { promisify } = require('util');
const CoreMixin = require('../mixin.core');

const writeFile = promisify(fs.writeFile);
const unlink = promisify(fs.unlink);

const rootDir = path.join(__dirname, 'fixture');
const tsconfigFile = path.join(rootDir, 'tsconfig.json');

describe('No Typescript available', () => {
  beforeAll(() => {
    jest.mock('typescript', () => {
      throw new Error(
        `ERR Cannot find module 'typescript' from 'mixin.core.js'`
      );
    });
  });

  afterAll(() => {
    jest.unmock('typescript');
  });

  it('should do nothing', () => {
    const mixin = new CoreMixin({ rootDir });

    expect(() => mixin.diagnose()).not.toThrow();
  });
});

describe('Valid tsconfig.json found', () => {
  beforeAll(async () => {
    const config = { extends: 'hops-typescript/tsconfig.json' };

    await writeFile(tsconfigFile, JSON.stringify(config), 'utf8');
  });

  afterAll(async () => {
    await unlink(tsconfigFile);
  });

  it('should not output a warning', () => {
    const mixin = new CoreMixin({ rootDir });

    expect(mixin.diagnose()).toBeUndefined();
  });
});

describe('Valid tsconfig.json with custom compiler options found', () => {
  beforeAll(async () => {
    const config = {
      extends: 'hops-typescript/tsconfig.json',
      compilerOptions: {
        charset: 'utf-8',
      },
    };

    await writeFile(tsconfigFile, JSON.stringify(config), 'utf8');
  });

  afterAll(async () => {
    await unlink(tsconfigFile);
  });

  it('should not output a warning', () => {
    const mixin = new CoreMixin({ rootDir });

    expect(mixin.diagnose()).toBeUndefined();
  });
});

describe.each([
  ['target', 'ES5'],
  ['moduleResolution', 'classic'],
])('Invalid tsconfig.json found', (prop, value) => {
  beforeAll(async () => {
    const config = {
      extends: 'hops-typescript/tsconfig.json',
      compilerOptions: {
        [prop]: value,
      },
    };

    await writeFile(tsconfigFile, JSON.stringify(config), 'utf8');
  });

  afterAll(async () => {
    await unlink(tsconfigFile);
  });

  it('should output a warning', () => {
    const mixin = new CoreMixin({ rootDir });

    expect(mixin.diagnose()).toContain(
      `do not overwrite the value "compilerOptions.${prop}" in your "tsconfig.json"`
    );
  });
});
