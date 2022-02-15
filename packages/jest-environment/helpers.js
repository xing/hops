const { spawn } = require('child_process');
const path = require('path');
const { promisify } = require('util');
const rimraf = promisify(require('rimraf'));
const EProm = require('eprom');
const { copy } = require('fs-extra');
const mktemp = require('mktemp').createDir;
const mkdirp = require('mkdirp');
const debug = require('hops-debug')('jest-env-hops:helpers');
const resolveFrom = require('resolve-from');

const getHopsCommandModifications = (args) => {
  const [maybeEnv, ...rest] = args;
  const env =
    typeof maybeEnv === 'object' && maybeEnv !== null ? maybeEnv : undefined;
  return {
    argv: env ? rest : args,
    env,
  };
};

const build = ({ cwd, env = {}, argv = [] }) =>
  new Promise((resolve, reject) => {
    const hopsBin = resolveFrom(cwd, 'hops/bin');
    const args = [hopsBin, 'build', ...argv];
    debug('Building Hops', args, env);

    const buildProcess = spawn(process.argv[0], args, { env, cwd });

    let stdout = '';
    buildProcess.stdout.on('data', (data) => {
      stdout += data.toString('utf-8');
    });

    let stderr = '';
    buildProcess.stderr.on('data', (data) => {
      console.log('_________BOOOOOOOOOOM', data.toString('utf-8'));
      stderr += data.toString('utf-8');
    });

    buildProcess.on('close', (code) => resolve({ stdout, stderr, code }));
    buildProcess.on('error', (error) => {
      console.log('_____________________BUID ERROR ');

      reject(error);
    });
    process.on('exit', () => {
      console.log('_____________________BUID EXIT ');
      buildProcess.kill();
    });
  });

const startServer = ({ cwd, command, env = {}, argv = [] }) => {
  const teardownPromise = new EProm();
  const urlPromise = new EProm();
  const startedPromise = new EProm();

  let stdout = '';
  let stderr = '';
  const success1 = "bundling 'develop' finished";
  const success2 = "bundling 'node' finished";

  const hopsBin = resolveFrom(cwd, 'hops/bin');
  const args = [hopsBin, command].concat(argv);
  debug('Spawning server', args.join(' '), { env });
  const started = spawn(process.argv[0], args, {
    env,
    cwd,
  });
  let stopServer = () => {
    started.kill();
    teardownPromise.resolve({ stderr, stdout });
    return teardownPromise;
  };

  started.stdout.on('data', (data) => {
    const line = data.toString('utf-8');
    console.log('stdout >', line);
    stdout += line;

    const [, url] = line.match(/listening at (.*)/i) || [];
    if (url) {
      console.log('found match:', url);
      urlPromise.resolve(url);
    }

    console.log(stdout.includes(success1), stdout.includes(success2));
    if (stdout.includes(success1) && stdout.includes(success2)) {
      startedPromise.resolve();
    }
  });

  started.stderr.on('data', (data) => {
    const line = data.toString('utf-8');
    console.log('stderr >', line);
    stderr += line;
  });

  started.on('close', (code) => {
    console.log('Server stopped. exitcode:', code);
    urlPromise.reject('server closed');
    stopServer = () => {};
  });

  started.on('error', (error) => {
    console.log('-__________________', error);
    teardownPromise.reject(error);
  });

  process.on('exit', () => {
    console.log('__________________EXIT');
    stopServer();
  });

  return {
    getUrl: () => urlPromise,
    stopServer,
    started: () => startedPromise,
  };
};

const isPuppeteerDisabled = (pragmas) => {
  if (pragmas['jest-hops-puppeteer'] === 'off') {
    return true;
  }
  return false;
};

const launchPuppeteer = async (disablePuppeteer) => {
  if (disablePuppeteer) {
    return {};
  }

  const isDebug = process.env.DEBUG_PUPPETEER === 'true';
  const config = {
    executablePath: process.env.CHROMIUM_PATH,
    headless: !isDebug,
    slowMo: isDebug ? 250 : 0,
    devtools: isDebug,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  };
  console.log('>>>> Starting puppeteer', config);
  // eslint-disable-next-line node/no-unsupported-features/es-syntax
  const { default: puppeteer } = await import('puppeteer');
  let browser;

  try {
    browser = await puppeteer.launch(config);
  } catch (e) {
    console.log('________________________BOOOM', e);
  }

  return {
    browser,
    teardown: async () => await browser.close(),
  };
};

const createWorkingDir = async (srcDir) => {
  const cwdRootPath = path.resolve(srcDir, '..', '..', '.tmp');
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

module.exports = {
  getHopsCommandModifications,
  startServer,
  build,
  isPuppeteerDisabled,
  launchPuppeteer,
  createWorkingDir,
};
