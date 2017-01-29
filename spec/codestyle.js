/* eslint-env node, mocha */

var semistandard = require('mocha-standard/semistandard');

describe('code style', function () {
  this.timeout(5000);

  it('conforms to semistandard', semistandard.files([
    'bin/**/*.js',
    'demo/src/**/*.js',
    'etc/**/*.js',
    'lib/**/*.js',
    'middleware/**/*.js',
    'plugin/**/*.js',
    'renderer/**/*.js',
    'spec/**/*.js',
    'transpiler/**/*.js'
  ]));
});
