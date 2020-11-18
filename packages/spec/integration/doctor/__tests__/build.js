xdescribe('doctor - build', () => {
  let logs;

  const getFromLogs = (type, message) =>
    logs.find((l) => l.endsWith(`:${type}] ${message}`));

  beforeAll(async () => {
    const { stderr } = await HopsCLI.build(
      {
        HOPS_IGNORE_ERRORS: 'doctor-mixin-a-two',
      },
      '-p',
      '--parallel-build'
    );
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
