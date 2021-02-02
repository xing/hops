/**
 * @jest-hops-puppeteer off
 */

describe('postcss - build', () => {
  let stderr;

  beforeAll(async () => {
    const result = await HopsCLI.build('-p', '--parallel-build');
    stderr = result.stderr;
  });

  it('should not output a @charset warning', () => {
    expect(stderr).not.toContain(
      'postcss-import: @charset must precede all other statements'
    );
  });
});
