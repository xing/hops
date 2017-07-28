/* eslint-env node, mocha */

var semistandard = require('mocha-standard/semistandard');

describe('code style', function () {
  this.timeout(5000);

  it('conforms to semistandard', semistandard.files([
    'packages/**/*.js',
    'demo/src/*.js',
    'spec/**/*.js'
  ]));
});
