const path = require('path');
const { existsSync, readFileSync } = require('fs');
const { execSync } = require('child_process');

const createHopsAppBin = require.resolve('create-hops-app');

describe('create-hops-app', () => {
  const version = '^11';
  const template = 'hops-template-react';

  beforeAll(() => {
    process.chdir(cwd);
  });

  it('initializes a Hops app with yarn', () => {
    const name = 'my-app-yarn';
    const args = [name, `--template ${template}@${version}`].join(' ');

    execSync(`${createHopsAppBin} ${args}`, { stdio: 'ignore' });

    const lockFile = path.join(cwd, name, 'yarn.lock');

    expect(existsSync(lockFile)).toBeTruthy();
    expect(readFileSync(lockFile, 'utf-8')).toContain('@untool');
  });

  it('initializes a Hops app with npm', () => {
    const name = 'my-app-npm';
    const args = [name, `--template ${template}@${version}`, `--npm`].join(' ');

    execSync(`${createHopsAppBin} ${args}`, { stdio: 'ignore' });

    const lockFile = path.join(cwd, name, 'package-lock.json');

    expect(existsSync(lockFile)).toBeTruthy();
    expect(readFileSync(lockFile, 'utf-8')).toContain('@untool');
  });
});
