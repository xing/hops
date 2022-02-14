const chalk = require('chalk');
const importFrom = require('import-from');
const NodeEnvironment = importFrom.silent(
  require.resolve('jest'),
  'jest-environment-node'
);

const { writeFileSync } = require('fs');

// const { spawnSync } = require('child_process');

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
    console.log('context.docblockPragmas', context.docblockPragmas);
    this.disablePuppeteer = isPuppeteerDisabled(context.docblockPragmas);
  }

  async setup() {
    await super.setup();
    console.log('Creating working directory for:', this.config.rootDir);
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
      writeFileSync(1, '111111111111');
      if (this.disablePuppeteer) {
        writeFileSync(
          1,
          '_____________No browser available; please enable Puppeteer.'
        );
        throw new Error('No browser available; please enable Puppeteer.');
      }

      writeFileSync(1, '2222222222222');

      let page;
      try {
        writeFileSync(1, '2a2a2a2a');

        /*
        const { stdout, stderr } = spawnSync('curl', ['http://localhost:8190']);

        console.log('----------------___AAAA');
        console.log(stdout.toString());
        console.log('___________________B_____________');
        console.log(stderr.toString());
*/
        page = await browser.newPage();
        writeFileSync(1, '2b2b2b2b');

        page.on('console', (msg) => console.log('PAGE LOG:', msg.text()));
      } catch (e) {
        writeFileSync(1, '_____________________BÄM' + e.toString());
      }

      writeFileSync(1, '33333333333333');

      const getProperty = getPropertyFactory(page);
      console.log(44444444444444);

      page.setDefaultNavigationTimeout(2 * 60 * 1000);

      console.log(55555555555555);

      page.on('error', (error) => {
        writeFileSync(1, '_________________ERROR1');

        console.log('_________________ERROR1', error);
        throw error;
      });
      page.on('pageerror', (error) => {
        writeFileSync(1, '_________________ERROR2');

        console.log('_________________ERROR2', error);

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
        const { getUrl, stopServer: killServer } = startServer({
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
        return { getUrl, stopServer };
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
