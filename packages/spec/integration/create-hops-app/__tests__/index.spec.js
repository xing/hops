const path = require('path');
const { existsSync, readFileSync } = require('fs');
const { execSync } = require('child_process');

const ONE_MINUTE = 60 * 1000;

const createHopsAppBin = require.resolve('create-hops-app');

describe('postcss production build', () => {
  const version = 'next';
  const template = 'hops-template-react';

  beforeAll(() => {
    jest.setTimeout(5 * ONE_MINUTE);
    process.chdir(cwd);
  });

  it('initializes a Hops app with yarn', () => {
    const name = 'my-app-yarn';
    const args = [
      name,
      `--hops-version ${version}`,
      `--template ${template}@${version}`,
    ].join(' ');

    execSync(`${createHopsAppBin} ${args}`);

    const lockFile = path.join(cwd, name, 'yarn.lock');

    expect(existsSync(lockFile)).toBeTruthy();
    expect(readFileSync(lockFile, 'utf-8')).toContain('hops-preset-defaults');
  });

  it('initializes a Hops app with npm', () => {
    const name = 'my-app-npm';
    const args = [
      name,
      `--hops-version ${version}`,
      `--template ${template}@${version}`,
      `--npm`,
    ].join(' ');

    execSync(`${createHopsAppBin} ${args}`);

    const lockFile = path.join(cwd, name, 'package-lock.json');

    expect(existsSync(lockFile)).toBeTruthy();
    expect(readFileSync(lockFile, 'utf-8')).toContain('hops-preset-defaults');
  });
});
