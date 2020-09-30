const { spawn } = require('child_process');
const path = require('path');
const { promisify } = require('util');
const exec = promisify(require('child_process').exec);
const puppeteer = require('puppeteer');
const rimraf = promisify(require('rimraf'));

const { copy } = require('fs-extra');
const mktemp = require('mktemp').createDir;
const mkdirp = promisify(require('mkdirp'));
const debug = require('debug')('hops-spec:test-helpers');
const resolveFrom = require('resolve-from');

const build = async ({ cwd, env = {}, argv = [] }) => {
  const hopsBin = resolveFrom(cwd, 'hops/bin');
  const command = `${hopsBin} build ${argv.join(' ')}`;
  debug('Starting', command);
  await exec(command, { env, cwd });

  return cwd;
};
const startServer = ({ cwd, command, env = {}, argv = [] }) =>
  new Promise((resolve, reject) => {
    let onTeardown;
    const teardownPromise = new Promise((resolve) => (onTeardown = resolve));

    const hopsBin = resolveFrom(cwd, 'hops/bin');

    const args = [hopsBin, command].concat(argv);
    debug('Spawning server', [hopsBin, ...args].join(' '));
    const started = spawn(process.argv[0], args, {
      env,
      cwd,
    });
    const teardown = () => {
      started.kill();
      return teardownPromise;
    };

    started.stdout.on('data', (data) => {
      const line = data.toString('utf-8');
      debug('stdout >', line);
      const match = line.match(/listening at (.*)/i);
      if (match) {
        debug('found match:', match[1]);
        const url = match[1];
        resolve({ url, teardown });
      }
    });

    let stderr = '';
    started.stderr.on('data', (data) => {
      const line = data.toString('utf-8');
      debug('stderr >', line);
      stderr += line;
    });

    started.on('close', (code) => {
      debug('Server stopped. exitcode:', code);
      onTeardown(stderr);
      if (code) {
        reject(stderr);
      }
    });

    started.on('error', (error) => reject(error));
  });

const launchPuppeteer = async () => {
  const isDebug = process.env.DEBUG_PUPPETEER === 'true';
  const config = {
    executablePath: process.env.CHROMIUM_PATH,
    headless: !isDebug,
    slowMo: isDebug ? 250 : 0,
    devtools: isDebug,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  };
  debug('Starting puppeteer', config);
  const browser = await puppeteer.launch(config);
  return {
    browser,
    teardown: async () => await browser.close(),
  };
};

const createWorkingDir = async (srcDir) => {
  const cwdRootPath = path.resolve(__dirname, '..', '.tmp');
  await mkdirp(cwdRootPath);
  const cwdPath = await mktemp(path.resolve(cwdRootPath, 'XXXXX'));

  await copy(srcDir, cwdPath);
  return {
    cwd: cwdPath,
    removeWorkingDir: async () => {
      await rimraf(cwdPath);
    },
  };
};

module.exports.startServer = startServer;
module.exports.build = build;
module.exports.launchPuppeteer = launchPuppeteer;
module.exports.createWorkingDir = createWorkingDir;
