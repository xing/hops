const chalk = require('chalk');
const importFrom = require('import-from');
const NodeEnvironment = importFrom.silent(
  require.resolve('jest'),
  'jest-environment-node'
);
const [jestMajorVersion] = require('jest/package.json').version.split('.');
const debug = require('hops-debug')('hops-spec:env');
const {
  getHopsCommandModifications,
  isPuppeteerDisabled,
  launchPuppeteer,
  startServer,
  build,
  createWorkingDir,
} = require('./helpers');

if (!NodeEnvironment) {
  throw new Error(
    'Could not initialize jest-environment-hops. The required jest-environment-node is missing.'
  );
}

if (Number(jestMajorVersion) < 26) {
  console.error(
    chalk.red(
      'Error: You are using an unsupported version of Jest! Please upgrade to Jest v26.'
    )
  );
}

const getPropertyFactory = (page) => (property, selector) =>
  page
    .$(selector)
    .then((h) => h.getProperty(property))
    .then((h) => h.jsonValue());

const getElementByTextFactory = (page) => async (rawText) => {
  const text = rawText.toLowerCase();
  const handle = await page.$x(
    `//*[contains(translate(text(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${text}')]`
  );

  if (handle.length === 0) {
    throw new Error(`Can not find element by text: ${text}`);
  } else if (handle.length > 1) {
    console.warn(
      `getElementByText with text: ${text} found more than one element. Using only the first one.`
    );
  }

  return handle[0];
};

class FixtureEnvironment extends NodeEnvironment {
  constructor(config, context) {
    super(config);

    this.config = config;
    this.disablePuppeteer = isPuppeteerDisabled(context.docblockPragmas);
  }

  async setup() {
    await super.setup();
    debug('Creating working directory for:', this.config.rootDir);
    const { cwd, removeWorkingDir } = await createWorkingDir(
      this.config.rootDir
    );
    debug('Working directory created:', cwd);
    this.cwd = cwd;
    this.removeWorkingDir = removeWorkingDir;
    const { browser, teardown: closeBrowser } = await launchPuppeteer(
      this.disablePuppeteer
    );
    this.closeBrowser = closeBrowser;
    this.global.browser = browser;
    this.global.cwd = cwd;

    this.global.createPage = async () => {
      if (this.disablePuppeteer) {
        throw new Error('No browser available; please enable Puppeteer.');
      }

      const page = await browser.newPage();
      const getProperty = getPropertyFactory(page);
      page.setDefaultNavigationTimeout(2 * 60 * 1000);
      page.on('error', (error) => {
        throw error;
      });
      page.on('pageerror', (error) => {
        throw error;
      });

      return {
        page,
        getProperty,
        getInnerText: (selector) => getProperty('innerText', selector),
        getElementByText: getElementByTextFactory(page),
      };
    };

    const that = this;
    this.global.HopsCLI = {
      build(...args) {
        const { env, argv } = getHopsCommandModifications(args);
        return build({ cwd: that.cwd, argv, env });
      },
      start(...args) {
        if (that.killServer) {
          throw new Error(
            'Another long running task ("hops start") is already running. You can only start one task per file.'
          );
        }
        const { env, argv } = getHopsCommandModifications(args);
        const {
          getUrl,
          stopServer: killServer,
          hasFinished,
        } = startServer({
          cwd: that.cwd,
          command: 'start',
          env,
          argv,
        });
        // eslint-disable-next-line require-atomic-updates
        that.killServer = killServer;
        const stopServer = () => {
          delete that.killServer;
          return killServer();
        };
        return { getUrl, stopServer, hasFinished };
      },
    };
  }

  async teardown() {
    await super.teardown();
    if (this.closeBrowser) {
      await this.closeBrowser();
    }
    if (this.killServer) {
      await this.killServer();
    }
    await this.removeWorkingDir();
  }
}

module.exports = FixtureEnvironment;
