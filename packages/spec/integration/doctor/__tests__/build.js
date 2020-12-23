/**
 * @jest-hops-puppeteer off
 */
const { HopsCLI } = require('../../../helpers/hops-cli');

describe('doctor - build', () => {
  let logs;

  const getFromLogs = (type, message) =>
    logs.find((l) => l.endsWith(`:${type}] ${message}`));

  const runHopsBuild = () =>
    new Promise((resolve) => {
      HopsCLI.cmd('build')
        .addEnvVar('HOPS_IGNORE_ERRORS', 'doctor-mixin-a-two')
        .addArg('-p')
        .addArg('--parallel-build')
        .run()
        .once('end', ({ stderr }) => resolve(stderr))
        .once('error', () => {}); // Hops Build Error needs handling
    });

  beforeAll(async () => {
    const stderr = await runHopsBuild();
    logs = stderr
      .split(/\n+/)
      .filter(Boolean)
      .filter((l) => l.startsWith('['));
  });

  it('produces a warning for "build"-mode', () => {
    const warning = getFromLogs('warning', 'Warn::Mixin-B Second');
    const nonExistingWarning = getFromLogs('warning', 'Warn::Mixin-B First');

    expect(warning).toBeTruthy();
    expect(nonExistingWarning).toBeUndefined();
  });

  it('produces an error for "build"-mode', () => {
    const error = getFromLogs('error', 'Err::Mixin-B Second');

    expect(error).toBeTruthy();
  });

  it('outputs the ignord error as warning', () => {
    const ignoredError = getFromLogs('warning', 'Err::Mixin-A Second');

    expect(ignoredError).toBeTruthy();
  });
});
