/* eslint-env node, mocha */

var assert = require('assert');

describe('jest-preset', function () {
  it('should export jest-preset.json', function () {
    assert(require('jest-preset-hops/jest-preset.json'));
  });
  it('should export file-mock', function () {
    assert(require('jest-preset-hops/file-mock'));
  });
  it('should export tpl-mock', function () {
    assert(require('jest-preset-hops/tpl-mock'));
  });
  it('should export transform', function () {
    assert(require('jest-preset-hops/transform'));
  });
});
