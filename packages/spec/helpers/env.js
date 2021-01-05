const NodeEnvironment = require('jest-environment-node');
const debug = require('hops-debug')('hops-spec:env');
const {
  isPuppeteerDisabled,
  launchPuppeteer,
  startServer,
  build,
  createWorkingDir,
} = require('./test-helpers');

function getProperty(property, selector) {
  return this.$(selector)
    .then((h) => h.getProperty(property))
    .then((h) => h.jsonValue());
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

function isReactLifecycleWarning(warning) {
  const reReactLifecycleWarning = new RegExp(
    'Warning: componentWill[^\\s]+ has been renamed, and is not recommended for use. ' +
      'See https://fb.me/react-async-component-lifecycle-hooks for details.'
  );
  return Boolean(warning.match(reReactLifecycleWarning));
}

function isIntolerableWarning(type, text) {
  return type === 'warning' && !isReactLifecycleWarning(text);
}

function getCommandModifications(args) {
  const [maybeEnv, ...rest] = args;
  const env =
    typeof maybeEnv === 'object' && maybeEnv !== null ? maybeEnv : undefined;
  return {
    argv: env ? rest : args,
    env,
  };
}

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
      page.setDefaultNavigationTimeout(2 * 60 * 1000);
      page.on('error', (error) => {
        throw error;
      });
      page.on('pageerror', (error) => {
        throw error;
      });

      page.on('console', (msg) => {
        const type = msg.type();
        const text = msg.text();
        if (type === 'error' || isIntolerableWarning(type, text)) {
          throw new Error(`${type} in browser console: ${text}`);
        }
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
      build(...args) {
        const { env, argv } = getCommandModifications(args);
        return build({ cwd: that.cwd, argv, env });
      },
      async start(...args) {
        if (that.killServer) {
          throw new Error(
            'Another long running task ("hops start") is already running. You can only start one task per file.'
          );
        }
        const { env, argv } = getCommandModifications(args);
        const { url, teardown } = await startServer({
          cwd: that.cwd,
          command: 'start',
          env,
          argv,
        });
        // eslint-disable-next-line require-atomic-updates
        that.killServer = teardown;
        that.global.killServer = () => {
          delete that.killServer;
          return teardown();
        };
        return url;
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
