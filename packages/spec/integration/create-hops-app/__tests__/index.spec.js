/**
 * @jest-hops-puppeteer off
 */

const path = require('path');
const { prerelease } = require('semver');
const { existsSync, readFileSync } = require('fs');
const execa = require('execa');
const { version, bin } = require(require.resolve(
  'create-hops-app/package.json'
));

const isPreRelease = prerelease(version) !== null;
const createHopsAppBin = require.resolve('create-hops-app');

describe('create-hops-app', () => {
  const version = isPreRelease ? 'next' : 'latest';
  const template = 'hops-template-react';

  beforeAll(() => {
    process.chdir(cwd);
  });

  it('initializes a Hops app with yarn', async () => {
    const name = 'my-app-yarn';
    const args = [name, `--template ${template}@${version}`];

    const { all: output } = await execa(createHopsAppBin, args, {
      all: true,
    });

    const lockFile = path.join(cwd, name, 'yarn.lock');

    // Leaving the realm of `expect` here in order to be able to
    // print the output of the command in case of failure.
    if (!existsSync(lockFile)) {
      console.log(output);

      throw new Error(`Could not find file ${name}/yarn.lock`);
    }

    expect(readFileSync(lockFile, 'utf-8')).toContain('hops-react');
  });

  it('initializes a Hops app with npm', async () => {
    const name = 'my-app-npm';
    const args = [name, `--template ${template}@${version}`, `--npm`];

    const { all: output } = await execa(createHopsAppBin, args, { all: true });

    const lockFile = path.join(cwd, name, 'package-lock.json');

    // Leaving the realm of `expect` here in order to be able to
    // print the output of the command in case of failure.
    if (!existsSync(lockFile)) {
      console.log(output);

      throw new Error(`Could not find file ${name}/yarn.lock`);
    }

    expect(readFileSync(lockFile, 'utf-8')).toContain('hops-react');
  });

  it(`has the @next-binary if it's a pre-release`, () => {
    const binaries = Object.keys(bin);
    const nextCommand = 'create-hops-app@next';

    if (isPreRelease) {
      expect(binaries).toContain(nextCommand);
    } else {
      expect(binaries).not.toContain(nextCommand);
    }
  });
});
