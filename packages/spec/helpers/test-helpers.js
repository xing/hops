const path = require('path');
const { promisify } = require('util');
const rimraf = promisify(require('rimraf'));

const { copy } = require('fs-extra');
const mktemp = require('mktemp').createDir;
const mkdirp = promisify(require('mkdirp'));
const debug = require('debug')('hops-spec:test-helpers');

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
  debug('Starting puppeteer', config);
  const { default: puppeteer } = await import('puppeteer');
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

module.exports.isPuppeteerDisabled = isPuppeteerDisabled;
module.exports.launchPuppeteer = launchPuppeteer;
module.exports.createWorkingDir = createWorkingDir;
