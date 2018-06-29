const { spawn } = require('child_process');
const exec = require('util').promisify(require('child_process').exec);
const puppeteer = require('puppeteer');

const build = async ({ cwd, argv }) => {
  return await exec(
    `node -e "require('hops').run('${['build', ...argv].join("', '")}')"`,
    { cwd }
  );
};
const startServer = ({ cwd, command }) =>
  new Promise((resolve, reject) => {
    let onTeardown;
    const teardownPromise = new Promise(resolve => (onTeardown = resolve));

    const started = spawn('node', ['-e', `require('hops').run('${command}')`], {
      cwd,
    });
    const teardown = () => {
      started.kill();
      return teardownPromise;
    };

    started.stdout.on('data', data => {
      const line = data.toString('utf-8');
      const match = line.match(/Server listening at (.*)/i);
      if (match) {
        const url = match[1];
        resolve({ url, teardown });
      }
    });

    let stderr = '';
    started.stderr.on('data', data => {
      stderr += data.toString('utf-8');
    });

    started.on('close', code => {
      onTeardown();
      if (code) {
        reject(stderr);
      }
    });

    started.on('error', error => reject(error));
  });

const launchPuppeteer = async () => {
  const isDebug = process.env.DEBUG === 'true';
  const browser = await puppeteer.launch({
    headless: !isDebug,
    slowMo: isDebug ? 250 : 0,
    devtools: isDebug,
    args: ['--no-sandbox', '--disable-setuid-jest'],
  });
  return {
    browser,
    teardown: async () => await browser.close(),
  };
};

module.exports.startServer = startServer;
module.exports.build = build;
module.exports.launchPuppeteer = launchPuppeteer;
