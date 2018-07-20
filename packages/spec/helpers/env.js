const NodeEnvironment = require('jest-environment-node');
const {
  launchPuppeteer,
  startServer,
  build,
  createWorkingDir,
} = require('./test-helpers');

function getProperty(property, selector) {
  return this.$(selector)
    .then(h => h.getProperty(property))
    .then(h => h.jsonValue());
}

async function getElementByText(rawText) {
  const text = rawText.toLowerCase();
  const handle = await this.$x(
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
}

class FixtureEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);

    this.config = config;
  }
  async setup() {
    await super.setup();
    const { cwd, removeWorkingDir } = await createWorkingDir(
      this.config.rootDir
    );
    this.cwd = cwd;
    this.removeWorkingDir = removeWorkingDir;
    const { browser, teardown: closeBrowser } = await launchPuppeteer();
    this.closeBrowser = closeBrowser;
    this.global.browser = browser;
    this.global.cwd = cwd;

    this.global.createPage = async () => {
      const page = await browser.newPage();
      page.on('error', error => {
        throw error;
      });
      page.on('pageerror', error => {
        throw error;
      });
      return {
        page,
        getProperty: getProperty.bind(page),
        getInnerText: getProperty.bind(page, 'innerText'),
        getElementByText: getElementByText.bind(page),
      };
    };

    const that = this;
    this.global.HopsCLI = {
      async develop() {
        if (that.killServer) {
          throw new Error(
            'Another long running task is already running (hops build or serve). You can only start one task per file.'
          );
        }
        const { url, teardown } = await startServer({
          cwd: that.cwd,
          command: 'develop',
        });
        that.killServer = teardown;
        return url;
      },
      build(...argv) {
        if (argv.length && argv.includes('-p')) {
          throw new Error(
            'Warning you are trying to execute a production build - at the moment this causes jest to start many node processes which never end. This seems to be related to uglifyjs parallel builds'
          );
        }
        return build({ cwd: that.cwd, argv });
      },
      async serve() {
        if (that.killServer) {
          throw new Error(
            'Another long running task is already running (hops build or serve). You can only start one task per file.'
          );
        }
        const { url, teardown } = await startServer({
          cwd: that.cwd,
          command: 'serve',
        });
        that.killServer = teardown;
        return url;
      },
    };
  }

  async teardown() {
    await super.teardown();
    await this.removeWorkingDir();
    await this.closeBrowser();
    if (this.killServer) {
      await this.killServer();
    }
  }
}

module.exports = FixtureEnvironment;
