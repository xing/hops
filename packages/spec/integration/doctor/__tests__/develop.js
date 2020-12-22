/**
 * @jest-hops-puppeteer off
 */

const delay = () => new Promise((resolve) => setTimeout(resolve, 200));

describe('doctor - develop', () => {
  let logs;

  const getFromLogs = (type, message) =>
    logs.find((l) => l.endsWith(`:${type}] ${message}`));

  beforeAll(async () => {
    await HopsCLI.start(
      { HOPS_IGNORE_ERRORS: 'doctor-mixin-a-one' },
      '--fast-dev'
    );
    await delay();
    const stderr = await killServer();
    logs = stderr.split(/\n+/).filter(Boolean);
  });

  it('produces warnings for "develop"-mode', () => {
    const firstWarning = getFromLogs('warning', 'Warn::Mixin-A First');
    const secondWarning = getFromLogs('warning', 'Warn::Mixin-B First');
    const nonExistingWarning = getFromLogs('warning', 'Warn::Mixin-B Second');
    const deferredWarning = getFromLogs('warning', 'Warn::Mixin-A Second');

    expect(firstWarning).toBeTruthy();
    expect(secondWarning).toBeTruthy();
    expect(nonExistingWarning).toBeUndefined();
    expect(deferredWarning).toBeTruthy();
  });

  it('produces errors for "develop"-mode', () => {
    const error = getFromLogs('error', 'Err::Mixin-B First');

    expect(error).toBeTruthy();
  });

  it('outputs the ignord error as warning', () => {
    const ignoredError = getFromLogs('warning', 'Err::Mixin-A First');

    expect(ignoredError).toBeTruthy();
  });
});
