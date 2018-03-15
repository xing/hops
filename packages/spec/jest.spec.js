/* eslint-env node, jest */

describe('jest-preset', function() {
  it('should export jest-preset.json', function() {
    expect(require('jest-preset-hops/jest-preset.json')).toBeDefined();
  });
  it('should export file-mock', function() {
    expect(require('jest-preset-hops/mocks/file')).toBeDefined();
  });
  it('should export tpl-mock', function() {
    expect(require('jest-preset-hops/mocks/tpl')).toBeDefined();
  });
  it('should export babel transform', function() {
    expect(require('jest-preset-hops/transforms/babel')).toBeDefined();
  });
  it('should export graphql transform', function() {
    expect(require('jest-preset-hops/transforms/graphql')).toBeDefined();
  });
});
