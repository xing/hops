/* eslint-env node, jest */

describe('jest-preset', function () {
  it('should export jest-preset.json', function () {
    expect(require('../jest-preset.js')).toBeDefined();
  });
  it('should export file-mock', function () {
    expect(require('../mocks/file')).toBeDefined();
  });
  it('should export tpl-mock', function () {
    expect(require('../mocks/tpl')).toBeDefined();
  });
  it('should export babel transform', function () {
    expect(require('../transforms/babel')).toBeDefined();
  });
  it('should export graphql transform', function () {
    expect(require('../transforms/graphql')).toBeDefined();
  });
});
